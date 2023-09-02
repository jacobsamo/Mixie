// import React from 'react';
// import { useForm } from 'react-hook-form';
// import { authOptions } from '@/src/db/next-auth-adapter';
// import { getServerSession } from 'next-auth';
// import { db } from '@/src/db';
// import { eq, or } from 'drizzle-orm';
// import { info, users } from '@/src/db/schemas';
// import { Info, User } from '@/src/db/types';
// import Image from 'next/image';
// import { Input } from '@/src/common/components/ui/input';
// import { Textarea } from '@/src/common/components/ui/textarea';
// import { Button } from '@/src/common/components/ui/button';

// interface ProfilePageProps {
//   params: {
//     profile: string;
//   };
// }

// export default async function ProfilePage({ params }: ProfilePageProps) {
//   const session = await getServerSession(authOptions);

//   const user = (await db.query.users.findFirst({
//     where: eq(users.id, params.profile),
//   })) as User;

//   const { register, control, handleSubmit } = useForm({
//     defaultValues: {
//       name: user?.name,
//       userName: user?.userName,
//       bio: user?.bio,
//     },
//   });
//   const onSubmit = async (data: any) => {
//     try {
//       db.update(users)
//         .set({
//           name: data.name,
//           userName: data.userName,
//           bio: data.bio,
//         })
//         .where(eq(users.id, user.id));
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <main className="flex flex-row mx-auto md:w-2/4 w-full mt-2 md:p-4 justify-center gap-4 dark:bg-dark_grey  bg-white shadow-main rounded-md">
//       <form
//         className="flex flex-col items-start p-2"
//         onSubmit={handleSubmit(onSubmit)}
//       >
//         <div className="flex flex-row items-center gap-2">
//           <Image
//             src={user.image || ''}
//             alt={user.name || 'Profile picture'}
//             width={100}
//             height={100}
//             priority
//             className="rounded-full w-24 h-24 lg:w-48 lg:h-48 m-auto"
//           />
//           <div className="flex flex-col gap-2">
//             <Input
//               id="displayName"
//               label="Name"
//               {...register('name', { required: true })}
//             />
//             <Input
//               id="userName"
//               label="User Name"
//               {...register('userName', { required: true })}
//             />
//           </div>
//         </div>
//         <Textarea id="bio" label="Bio" control={control} />
//         {/* <div className="flex flex-col gap-2">
//           <h1 className="text-step--1">Profile Social</h1>
//           <Input
//             id="twitter"
//             name="Twitter"
//             label="Twitter"
//             control={control}
//             defaultValue={user.socials?.Twitter}
//           />
//           <Input
//             id="instagram"
//             name="Instagram"
//             label="Instagram"
//             control={control}
//             defaultValue={user.socials?.Instagram}
//           />
//           <Input
//             id="facebook"
//             name="Facebook"
//             label="Facebook"
//             control={control}
//             defaultValue={user.socials?.Facebook}
//           />
//           <Input
//             id="website"
//             name="Website"
//             label="Website"
//             control={control}
//             defaultValue={user.socials?.Website}
//           />
//         </div> */}
//         <Button
//           variant="secondary"
//           ariaLabel="Save profile changes"
//           type="submit"
//           className="m-auto mt-12"
//         >
//           Save
//         </Button>
//       </form>
//     </main>
//   );
// }


export default function AccountPage() {
  return <div>Coming soon....</div>;
}
