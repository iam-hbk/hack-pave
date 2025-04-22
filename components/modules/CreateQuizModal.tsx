'use client';

import { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { QuestionType, Quiz, quizSchema } from '@/types/quiz';
import { toast } from 'sonner';
import { QuestionEditor } from './QuestionEditor';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import FileUploader from '@/components/file-upload';
import type { FileWithPreview } from '@/hooks/use-file-upload';
import { useQuizGeneration } from '@/hooks/use-quiz-generation';
import { useQuizSubmission } from '@/hooks/use-quiz-submission';
import { useQuizStore } from '@/store/use-quiz-store';

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
  const [uploadedFiles, setUploadedFiles] = useState<FileWithPreview[]>([]);

  const questions = useQuizStore((state) => state.questions);
  const setQuestions = useQuizStore((state) => state.setQuestions);
  const clearQuestions = useQuizStore((state) => state.clearQuestions);

  const form = useForm<Quiz>({
    resolver: zodResolver(quizSchema),
    defaultValues: {
      title: 'New Quiz',
      questions: [],
      moduleCode,
    },
  });

  const { handleSubmit, watch, setValue, reset } = form;
  const formQuestions = watch('questions');

  // Reset form and store when modal opens/closes
  useEffect(() => {
    if (!open) {
      clearQuestions();
      reset({
        title: 'New Quiz',
        questions: [],
        moduleCode,
      });
    }
  }, [open, clearQuestions, reset, moduleCode]);

  // Update form when questions change in store
  useEffect(() => {
    if (questions.length > 0) {
      setValue('questions', questions);
    }
  }, [questions, setValue]);

  const { mutate: generateQuestions, isPending: isGenerating } = useQuizGeneration();
  const { mutate: submitQuiz, isPending: isSubmitting } = useQuizSubmission();

  const handleManualQuestionAdd = () => {
    const newQuestion = {
      type: QuestionType.MULTIPLE_CHOICE,
      question: '',
      options: ['', ''],
      correctAnswer: '',
      moduleCode,
    };
    const updatedQuestions = [...(formQuestions || []), newQuestion];
    setQuestions(updatedQuestions);
  };

  const handleRemoveQuestion = (index: number) => {
    const updatedQuestions = (formQuestions || []).filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
  };

  const handleAIGeneration = () => {
    const uploadedFile = uploadedFiles[0]?.file;
    if (!uploadedFile || !(uploadedFile instanceof File)) {
      toast.error('Please upload a PDF file first');
      return;
    }

    const toastId = toast.loading('Generating questions from PDF...');
    
    generateQuestions(uploadedFile, {
      onSuccess: (data) => {
        // Set title based on PDF name
        setValue('title', uploadedFile.name.replace('.pdf', ''));
        
        // Update questions in store
        setQuestions(data);
        
        // Switch to manual tab to review questions
        setSelectedTab('manual');
        
        toast.success('Questions Generated', {
          id: toastId,
          description: 'AI has generated questions based on your PDF. You can now review and edit them.',
        });
      },
      onError: () => {
        toast.dismiss(toastId);
      }
    });
  };

  const onSubmit = handleSubmit((data) => {
    // Ensure we have questions
    if (!data.questions?.length) {
      toast.error('Please add at least one question');
      return;
    }

    submitQuiz(data, {
      onSuccess: () => {
        onOpenChange(false);
        clearQuestions();
        reset();
      },
    });
  });

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

          <FormProvider {...form}>
            <form onSubmit={onSubmit} className="space-y-6">
              <TabsContent value="manual" className="space-y-4">
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Quiz Title</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter quiz title" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {questions.length > 0 ? (
                    <div className="space-y-4">
                      {questions.map((_, index) => (
                        <QuestionEditor
                          key={index}
                          questionIndex={index}
                          onRemove={() => handleRemoveQuestion(index)}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      No questions yet. Add questions manually or use AI generation.
                    </div>
                  )}

                  <div className="flex justify-between">
                    <Button type="button" onClick={handleManualQuestionAdd}>
                      Add Question
                    </Button>

                    <Button 
                      type="submit"
                      variant="outline" 
                      disabled={!questions.length || isSubmitting}
                    >
                      {isSubmitting ? 'Saving...' : 'Save Quiz'}
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="ai" className="space-y-4">
                <div className="space-y-4">
                  <div className="flex flex-col gap-2">
                    <Label>Upload Study Material (PDF)</Label>
                    <FileUploader onFileUpload={setUploadedFiles} />
                  </div>

                  <Button 
                    type="button"
                    onClick={handleAIGeneration}
                    disabled={!uploadedFiles.length || isGenerating}
                  >
                    {isGenerating ? 'Generating...' : 'Generate Questions'}
                  </Button>
                </div>
              </TabsContent>
            </form>
          </FormProvider>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
} 