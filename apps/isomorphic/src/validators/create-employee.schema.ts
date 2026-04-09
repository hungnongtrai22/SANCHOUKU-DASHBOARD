import { z } from 'zod';
import { messages } from '@/config/messages';
import { fileSchema } from './common-rules';

// form zod validation schema
export const employeeFormSchema = z.object({
  // name: z.string().min(1, { message: messages.catNameIsRequired }),
  // slug: z.string().min(1, { message: messages.slugIsRequired }),
  // type: z.string().optional(),
  // parentCategory: z.string().optional(),
  // description: z.string().optional(),
  name: z.string(),
  nameJP: z.string(),
  position: z.string(),
  positionJP: z.string(),
  image: z.any(),
  facebook: z.string(),
  line: z.string(),
  youtube: z.string(),
  instagram: z.string()
});

// generate form types from zod validation schema
export type EmployeeFormInput = z.infer<typeof employeeFormSchema>;
