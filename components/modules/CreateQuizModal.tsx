'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useQuizStore } from '@/store/quiz';
import { QuestionType, Question } from '@/types/quiz';
import { toast } from 'sonner';
import { QuestionEditor } from './QuestionEditor';

export function CreateQuizModal({
  open,
  onOpenChange,
  moduleCode,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  moduleCode: string;
}) {
  const [selectedTab, setSelectedTab] = useState<'manual' | 'ai'>('manual');
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const addQuestion = useQuizStore((state) => state.addQuestion);
  const saveQuizDraft = useQuizStore((state) => state.saveQuizDraft);
  const setQuizTitle = useQuizStore((state) => state.setQuizTitle);
  const currentQuiz = useQuizStore((state) => state.currentQuiz);
  const clearCurrentQuiz = useQuizStore((state) => state.clearCurrentQuiz);

  // Initialize a new quiz when the modal opens
  useEffect(() => {
    if (open) {
      setQuizTitle('New Quiz');
    } else {
      // Clear the quiz when modal closes
      clearCurrentQuiz();
    }
  }, [open, setQuizTitle, clearCurrentQuiz]);

  const handleManualQuestionAdd = () => {
    if (!currentQuiz?.title) {
      setQuizTitle('New Quiz');
    }
    addQuestion({
      type: QuestionType.MULTIPLE_CHOICE,
      question: '',
      options: ['', ''],
      correctAnswer: '',
      moduleCode,
    });
  };

  const handleAIGeneration = async () => {
    if (!pdfFile) return;
    
    setIsLoading(true);
    const toastId = toast.loading('Generating questions from PDF...');
    
    try {
      const formData = new FormData();
      formData.append('file', pdfFile);

      const response = await fetch('/api/quiz/generate', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate questions');
      }

      // Set a default title based on the PDF name
      setQuizTitle(pdfFile.name.replace('.pdf', ''));
      
      // Add each generated question to the store
      data.forEach((question: Question) => addQuestion(question));
      
      // Switch to manual tab to review questions
      setSelectedTab('manual');
      
      toast.success('Questions Generated', {
        id: toastId,
        description: 'AI has generated questions based on your PDF. You can now review and edit them.',
      });
    } catch (error: any) {
      console.error('Error generating questions:', error);
      toast.error('Generation Failed', {
        id: toastId,
        description: error.message || 'Failed to generate questions. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveDraft = () => {
    if (!currentQuiz?.title) {
      toast.error('Please enter a quiz title');
      return;
    }
    if (!currentQuiz?.questions?.length) {
      toast.error('Please add at least one question');
      return;
    }
    saveQuizDraft(moduleCode);
    toast.success('Quiz saved as draft');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Quiz</DialogTitle>
        </DialogHeader>

        <Tabs value={selectedTab} onValueChange={(value) => setSelectedTab(value as 'manual' | 'ai')}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="manual">Manual Creation</TabsTrigger>
            <TabsTrigger value="ai">AI Assisted</TabsTrigger>
          </TabsList>

          <TabsContent value="manual" className="space-y-4">
            <div className="space-y-4">
              <div>
                <Label>Quiz Title</Label>
                <Input 
                  placeholder="Enter quiz title" 
                  value={currentQuiz?.title || ''}
                  onChange={(e) => setQuizTitle(e.target.value)}
                />
              </div>
              
              {currentQuiz?.questions?.map((question, index) => (
                <QuestionEditor
                  key={index}
                  questionIndex={index}
                  question={question}
                />
              ))}

              <div className="flex justify-between">
                <Button onClick={handleManualQuestionAdd}>
                  Add Question
                </Button>

                <Button 
                  variant="outline" 
                  onClick={handleSaveDraft}
                  disabled={!currentQuiz?.questions?.length}
                >
                  Save as Draft
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="ai" className="space-y-4">
            <div className="space-y-4">
              <div>
                <Label>Upload Study Material (PDF)</Label>
                <Input 
                  type="file" 
                  accept=".pdf"
                  onChange={(e) => setPdfFile(e.target.files?.[0] || null)}
                />
              </div>

              <Button 
                onClick={handleAIGeneration}
                disabled={!pdfFile || isLoading}
              >
                {isLoading ? 'Generating...' : 'Generate Questions'}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
} 