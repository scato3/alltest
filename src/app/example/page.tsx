import { Form } from '../components/form';
import { validations } from '../schemas/validations';
import { z } from 'zod';

// 모든 필드의 validation schema를 한번에 정의
const formSchema = z.object({
  email: validations.email,
  password: validations.password,
  requiredEmail: validations.requiredEmail,
  // 새로운 필드 추가 시 여기에만 추가하면 됨
  // newField: validations.newField,
});

export default function ExamplePage() {
  async function handleSubmit(formData: FormData) {
    'use server';

    const result = formSchema.safeParse(Object.fromEntries(formData));

    if (!result.success) {
      const fieldErrors = result.error.issues.reduce((acc, issue) => {
        const field = issue.path[0] as string;
        acc[field] = issue.message;
        return acc;
      }, {} as Record<string, string>);

      return { errors: fieldErrors };
    }

    console.log('제출된 데이터:', result.data);
    return { errors: {} };
  }

  return <Form action={handleSubmit} />;
}
