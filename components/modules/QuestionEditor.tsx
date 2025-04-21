'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { PlusCircle, Trash2, GripVertical } from 'lucide-react';
import { Question, QuestionType } from '@/types/quiz';
import { useQuizStore } from '@/store/quiz';

interface QuestionEditorProps {
  questionIndex: number;
  question: Question;
}

export function QuestionEditor({ questionIndex, question }: QuestionEditorProps) {
  const updateQuestion = useQuizStore((state) => state.updateQuestion);
  const removeQuestion = useQuizStore((state) => state.removeQuestion);

  const [localQuestion, setLocalQuestion] = useState<Question>(question);

  const handleQuestionChange = (field: keyof Question, value: any) => {
    const updatedQuestion = { ...localQuestion, [field]: value };
    setLocalQuestion(updatedQuestion);
    updateQuestion(questionIndex, updatedQuestion);
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...localQuestion.options];
    newOptions[index] = value;
    handleQuestionChange('options', newOptions);
  };

  const addOption = () => {
    handleQuestionChange('options', [...localQuestion.options, '']);
  };

  const removeOption = (index: number) => {
    const newOptions = localQuestion.options.filter((_, i) => i !== index);
    handleQuestionChange('options', newOptions);
  };

  const handleCorrectAnswerChange = (value: string | string[]) => {
    if (localQuestion.type === QuestionType.SELECT_ALL) {
      // For SELECT_ALL, handle multiple correct answers
      const currentAnswers = Array.isArray(localQuestion.correctAnswer) 
        ? localQuestion.correctAnswer 
        : [localQuestion.correctAnswer];
      
      const newAnswers = currentAnswers.includes(value)
        ? currentAnswers.filter(answer => answer !== value)
        : [...currentAnswers, value];
      
      handleQuestionChange('correctAnswer', newAnswers);
    } else {
      handleQuestionChange('correctAnswer', value);
    }
  };

  return (
    <Card className="mb-4">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Question {questionIndex + 1}</CardTitle>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="cursor-move"
          >
            <GripVertical className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => removeQuestion(questionIndex)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Question Type</Label>
          <Select
            value={localQuestion.type}
            onValueChange={(value) => handleQuestionChange('type', value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={QuestionType.MULTIPLE_CHOICE}>Multiple Choice</SelectItem>
              <SelectItem value={QuestionType.TEXT}>Text Answer</SelectItem>
              <SelectItem value={QuestionType.FILL_IN_BLANK}>Fill in the Blank</SelectItem>
              <SelectItem value={QuestionType.SELECT_ALL}>Select All That Apply</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Question Text</Label>
          <Textarea
            value={localQuestion.question}
            onChange={(e) => handleQuestionChange('question', e.target.value)}
            placeholder="Enter your question here..."
          />
        </div>

        {(localQuestion.type === QuestionType.MULTIPLE_CHOICE || 
          localQuestion.type === QuestionType.SELECT_ALL) && (
          <div className="space-y-2">
            <Label>Options</Label>
            <div className="space-y-2">
              {localQuestion.options.map((option, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    placeholder={`Option ${index + 1}`}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeOption(index)}
                    disabled={localQuestion.options.length <= 2}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    type="button"
                    onClick={() => handleCorrectAnswerChange(option)}
                    className={
                      localQuestion.type === QuestionType.SELECT_ALL
                        ? Array.isArray(localQuestion.correctAnswer) &&
                          localQuestion.correctAnswer.includes(option)
                          ? 'bg-green-100'
                          : ''
                        : localQuestion.correctAnswer === option
                        ? 'bg-green-100'
                        : ''
                    }
                  >
                    ✓
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={addOption}
                className="mt-2"
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Option
              </Button>
            </div>
          </div>
        )}

        {(localQuestion.type === QuestionType.TEXT || 
          localQuestion.type === QuestionType.FILL_IN_BLANK) && (
          <div className="space-y-2">
            <Label>Correct Answer</Label>
            <Input
              value={
                Array.isArray(localQuestion.correctAnswer)
                  ? localQuestion.correctAnswer[0]
                  : localQuestion.correctAnswer
              }
              onChange={(e) => handleQuestionChange('correctAnswer', e.target.value)}
              placeholder="Enter the correct answer"
            />
          </div>
        )}

        <div className="space-y-2">
          <Label>Explanation (Optional)</Label>
          <Textarea
            value={localQuestion.explanation || ''}
            onChange={(e) => handleQuestionChange('explanation', e.target.value)}
            placeholder="Explain why this is the correct answer..."
          />
        </div>
      </CardContent>
    </Card>
  );
} 