'use server';

import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

// function to handle sign up action
// using server action
// validate data using userSignUpSchema
export async function signUpAction(formdata: FormData) {
  const rowData = {
    name: formdata.get('name') as string,
    email: formdata.get('email') as string,
    password: formdata.get('password') as string,
  };

  await auth.api.signUpEmail({
    body: rowData,
  });

  redirect('/');
}
// function to handle sign in action
// using server action
// validate data using userSignInSchema
// export async function signInAction(formdata: FormData) {
//   const rowData = {
//     email: formdata.get('email') as string,
//     password: formdata.get('password') as string,
//   };

//   const parseResult = userSignInSchema.safeParse(rowData);

//   if (!parseResult.success) {
//     const error = parseResult.error.flatten().fieldErrors;
//     return {
//       success: false,
//       error,
//     };
//   }

//   const data = parseResult.data;

//   try {
//     await auth.api.signInEmail({
//       body: {
//         email: data.email,
//         password: data.password,
//       },
//     });
//     redirect('/');
//   } catch (error) {
//     console.error(error);
//     return {
//       success: false,
//       message: 'كلمة المرور أو البريد الإلكتروني غير صحيح',
//     };
//   }
// }

export async function signOutAction() {
  try {
    await auth.api.signOut({
      headers: await headers(),
    });
    redirect('/auth/signin');
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'حدث خطأ أثناء تسجيل الخروج',
    };
  }
}
