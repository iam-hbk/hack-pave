'use client';

import { useFormContext } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { PlusCircle, Trash2, GripVertical } from 'lucide-react';
import { Question, QuestionType, Quiz } from '@/types/quiz';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';

interface QuestionEditorProps {
  questionIndex: number;
  onRemove: () => void;
}

export function QuestionEditor({ questionIndex, onRemove }: QuestionEditorProps) {
  const { control, watch, setValue } = useFormContext<Quiz>();
  const questionType = watch(`questions.${questionIndex}.type`);

  const addOption = () => {
    const currentOptions = watch(`questions.${questionIndex}.options`) || [];
    setValue(`questions.${questionIndex}.options`, [...currentOptions, '']);
  };

  const removeOption = (optionIndex: number) => {
    const options = watch(`questions.${questionIndex}.options`) || [];
    if (options.length <= 2) return;
    setValue(
      `questions.${questionIndex}.options`,
      options.filter((_: string, i: number) => i !== optionIndex)
    );
  };

  return (
    <Card className="mb-4">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Question {questionIndex + 1}</CardTitle>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="cursor-move">
            <GripVertical className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={onRemove}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormField
          control={control}
          name={`questions.${questionIndex}.type`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Question Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={QuestionType.MULTIPLE_CHOICE}>Multiple Choice</SelectItem>
                  <SelectItem value={QuestionType.TEXT}>Text Answer</SelectItem>
                  <SelectItem value={QuestionType.FILL_IN_BLANK}>Fill in the Blank</SelectItem>
                  <SelectItem value={QuestionType.SELECT_ALL}>Select All That Apply</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name={`questions.${questionIndex}.question`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Question Text</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Enter your question here..." />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {(questionType === QuestionType.MULTIPLE_CHOICE || 
          questionType === QuestionType.SELECT_ALL) && (
          <div className="space-y-2">
            <Label>Options</Label>
            {watch(`questions.${questionIndex}.options`)?.map((_, optionIndex) => (
              <FormField
                key={optionIndex}
                control={control}
                name={`questions.${questionIndex}.options.${optionIndex}`}
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center gap-2">
                      <FormControl>
                        <Input {...field} placeholder={`Option ${optionIndex + 1}`} />
                      </FormControl>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeOption(optionIndex)}
                        disabled={watch(`questions.${questionIndex}.options`)?.length <= 2}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        type="button"
                        onClick={() => {
                          const currentAnswer = watch(`questions.${questionIndex}.correctAnswer`);
                          const newAnswer = questionType === QuestionType.SELECT_ALL
                            ? (Array.isArray(currentAnswer)
                              ? currentAnswer.includes(field.value)
                                ? currentAnswer.filter(a => a !== field.value)
                                : [...currentAnswer, field.value]
                              : [field.value])
                            : field.value;
                          setValue(`questions.${questionIndex}.correctAnswer`, newAnswer);
                        }}
                        className={
                          questionType === QuestionType.SELECT_ALL
                            ? Array.isArray(watch(`questions.${questionIndex}.correctAnswer`)) &&
                              watch(`questions.${questionIndex}.correctAnswer`).includes(field.value)
                              ? 'bg-green-100'
                              : ''
                            : watch(`questions.${questionIndex}.correctAnswer`) === field.value
                            ? 'bg-green-100'
                            : ''
                        }
                      >
                        ✓
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            <Button variant="outline" size="sm" onClick={addOption} className="mt-2">
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Option
            </Button>
          </div>
        )}

        {(questionType === QuestionType.TEXT || 
          questionType === QuestionType.FILL_IN_BLANK) && (
          <FormField
            control={control}
            name={`questions.${questionIndex}.correctAnswer`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Correct Answer</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter the correct answer" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={control}
          name={`questions.${questionIndex}.explanation`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Explanation (Optional)</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Explain why this is the correct answer..." />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
} 