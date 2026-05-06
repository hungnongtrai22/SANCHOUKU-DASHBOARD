import { z } from 'zod';
import { messages } from '@/config/messages';
import { fileSchema } from './common-rules';

// form zod validation schema
export const diaryFormSchema = z.object({
  // name: z.string().min(1, { message: messages.catNameIsRequired }),
  // slug: z.string().min(1, { message: messages.slugIsRequired }),
  // type: z.string().optional(),
  // parentCategory: z.string().optional(),
  // description: z.string().optional(),
  title: z.string(),
  titleJP: z.string(),
  topic: z.string(),
  topicJP: z.string(),
  date: z.any(),
  detail: z.string(),
  detailJP: z.string(),
  avatar: z.any(),
});

// generate form types from zod validation schema
export type DiaryFormInput = z.infer<typeof diaryFormSchema>;
