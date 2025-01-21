import { validations } from '../schemas/validations';
import { z } from 'zod';

const formSchema = z.object({
  email: validations.email,
  password: validations.password,
  requiredEmail: validations.requiredEmail,
});

export async function validateForm(formData: FormData) {
  const validatedFields = formSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
    requiredEmail: formData.get('requiredEmail'),
  });

  if (!validatedFields.success) {
    return {
      success: false as const,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  return {
    success: true as const,
    data: validatedFields.data,
  };
}
