// import { Button } from '@/src/common/components/ui/button';
// import { cva } from 'class-variance-authority';
// import React from 'react';
// import { useForm } from 'react-hook-form';
// import { authOptions } from '@/src/db/next-auth-adapter';
// import { getServerSession } from 'next-auth';
// import { db } from '@/src/db';
// import { eq, or } from 'drizzle-orm';
// import { info, users } from '@/src/db/schemas';
// import { Info, User } from '@/src/db/types';
// import { z } from 'zod';
// import {
//   theme,
//   fonts,
//   diet,
//   allergens,
//   loveCooking,
//   averageTimeToCook,
// } from '@/src/common/lib/services/data';

// import {
//   theme as zTheme,
//   fonts as zFonts,
//   diet as zDiet,
//   allergens as zAllergens,
//   loveCooking as zLoveCooking,
//   averageTimeToCook as zAverageTimeToCook,
// } from '@/src/db/zodEnums';

// interface CustomizationPageProps {
//   params: {
//     profile: string;
//   };
// }

// export default async function CustomizationPage({
//   params,
// }: CustomizationPageProps) {
//   const session = await getServerSession(authOptions);

//   const user = (await db.query.users.findFirst({
//     where: eq(users.id, params.profile),
//   })) as User;

//   const { register, control, handleSubmit, setValue, getValues } =
//     useForm<User>({
//       defaultValues: {
//         theme: user?.theme,
//         font: user?.font,
//         diet: user?.diet,
//         allergens: user?.allergens,
//         loveCooking: user?.loveCooking,
//         averageTimeToCook: user?.averageTimeToCook,
//       },
//     });

//   const styles = cva(
//     'flex items-center gap-2 p-2 max-w-xs dark:outline dark:outline-grey dark:outline-2 dark:bg-dark_grey dark:text-white dark:shadow-none shadow-main bg-white text-black rounded-md',
//     {
//       variants: {
//         size: {
//           sm: 'text-sm',
//           md: 'h-12 w-28 ',
//           lg: 'h-12 w-46',
//         },
//       },
//       defaultVariants: {
//         size: 'md',
//       },
//     }
//   );

//   const onSubmit = async (data: User) => {
//     try {
//       db.update(users)
//         .set({
//           theme: data?.theme,
//           font: data?.font,
//           diet: data?.diet,
//           allergens: data?.allergens,
//           loveCooking: data?.loveCooking,
//           averageTimeToCook: data?.averageTimeToCook,
//         })
//         .where(eq(users.id, user.id));
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleCheckboxChange = (event: any, name: any) => {
//     const diet = event.target.value;
//     const values = getValues(name);

//     // If the checkbox is checked, add the item to the list.
//     if (event.target.checked) {
//       values.push(diet);
//     } else {
//       // If the checkbox is unchecked, remove the item from the list.
//       const index = values.indexOf(diet);
//       if (index > -1) {
//         values.splice(index, 1);
//       }
//     }

//     setValue(name, values);
//   };

//   return (
//     <main className="flex flex-row mx-auto md:w-2/4 w-full mt-2 p-4 justify-center dark:bg-dark_grey  bg-white shadow-main rounded-md">
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <div>
//           <h2 className="text-step0 my-2">Theme</h2>
//           <div className="flex flex-auto flex-wrap gap-2">
//             {theme.map((theme, index) => (
//               <label key={index} className={styles({ size: 'md' })}>
//                 <input
//                   key={theme}
//                   type="radio"
//                   {...register('theme')}
//                   value={theme}
//                   defaultChecked={user?.theme === theme}
//                   onChange={() => {
//                     setValue('theme', theme as z.infer<typeof zTheme>);
//                   }}
//                   className="w-4 h-4"
//                 />
//                 <p className="text-step--2">{theme}</p>
//               </label>
//             ))}
//           </div>
//         </div>
//         <div>
//           <h2 className="text-step0 my-2">Reading Font</h2>
//           <div className="flex flex-auto flex-wrap gap-2">
//             {fonts.map((font, index) => (
//               <label key={index} className={styles({ size: 'lg' })}>
//                 <input
//                   key={font}
//                   type="radio"
//                   {...register('font')}
//                   value={font}
//                   defaultChecked={user?.font === font}
//                   onChange={() => {
//                     setValue('font', font as z.infer<typeof zFonts>);
//                   }}
//                   className="w-4 h-4"
//                 />
//                 <p className="text-step--2">{font}</p>
//               </label>
//             ))}
//           </div>
//         </div>
//         <div>
//           <h2 className="text-step0 my-2">Diet</h2>
//           <div className="flex flex-auto flex-wrap gap-2">
//             {diet.map((diet, index) => (
//               <label key={index} className={styles({ size: 'lg' })}>
//                 <input
//                   key={diet}
//                   type="checkbox"
//                   {...register('diet')}
//                   value={diet}
//                   defaultChecked={user?.diet?.includes(diet)}
//                   onChange={(event) => {
//                     handleCheckboxChange(event, 'diet');
//                   }}
//                   className="w-4 h-4"
//                 />
//                 <p className="text-step--2">{diet}</p>
//               </label>
//             ))}
//           </div>
//           {/*TODO: Create a component that can handle tags do this once recipe page tags have been handled */}
//           <h2 className="text-step0 my-2">Allergies</h2>
//           <div className="flex flex-auto flex-wrap gap-2">
//             {allergens.map((allergies, index) => (
//               <label key={index} className={styles({ size: 'lg' })}>
//                 <input
//                   key={allergies}
//                   type="checkbox"
//                   {...register('allergens')}
//                   value={allergies}
//                   defaultChecked={user?.allergens?.includes(allergies)}
//                   onChange={(event) => {
//                     handleCheckboxChange(event, 'allergens');
//                   }}
//                   className="w-4 h-4"
//                 />
//                 <p className="text-step--2">{allergies}</p>
//               </label>
//             ))}
//           </div>
//         </div>
//         <Button
//           ariaLabel="Save custom preferences"
//           type="submit"
//           variant="secondary"
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
