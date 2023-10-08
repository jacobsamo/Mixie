// "use client";
// import { Button } from "@/src/common/components/ui/button";
// import { Input } from "@/src/common/components/ui/input";
// import { Textarea } from "@/src/common/components/ui/textarea";
// import { trpc } from "@/src/common/trpc/client";
// import { db } from "@/src/db";
// import { users } from "@/src/db/schemas";
// import { User } from "@/src/db/types";
// import { useQuery } from "@tanstack/react-query";
// import { eq } from "drizzle-orm";
// import Image from "next/image";
// import { useForm } from "react-hook-form";
// import { Request } from "@/src/common/lib/services/apiHandle";

// interface ProfilePageProps {
//   params: {
//     profile: string;
//   };
// }

// export default async function ProfilePage({ params }: ProfilePageProps) {
//   // const session = await getServerSession(authOptions);
//   const { data: user } = useQuery({
//     queryKey: ["user", params.profile],
//     queryFn: async () => {
//       // const user = await Request<User>({
//       //   url: `/api/users/${params.profile}`,
//       //   method: "GET",
//       // });
//       // return user as User;
//       return null;
//     },
//   });

//   if (!user) {
//     return null;
//   }

//   const { register, control, handleSubmit } = useForm({
//     defaultValues: {
//       ...user,
//     },
//   });
//   const onSubmit = async (data: typeof user) => {
//     try {
//       await fetch(`/api/users/${params.profile}`, {
//         method: "PUT",
//         body: JSON.stringify(data),
//       });
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <main className="dark:bg-dark_grey mx-auto mt-2 flex w-full flex-row justify-center gap-4 rounded-md bg-white  shadow-main md:w-2/4 md:p-4">
//       <form
//         className="flex flex-col items-start p-2"
//         onSubmit={handleSubmit(onSubmit)}
//       >
//         <div className="flex flex-row items-center gap-2">
//           <Image
//             src={user.image || ""}
//             alt={user.name || "Profile picture"}
//             width={100}
//             height={100}
//             priority
//             className="m-auto h-24 w-24 rounded-full lg:h-48 lg:w-48"
//           />
//           <div className="flex flex-col gap-2">
//             <Input
//               id="displayName"
//               label="Name"
//               {...register("name", { required: true })}
//             />
//             <Input
//               id="userName"
//               label="User Name"
//               {...register("userName", { required: true })}
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
