import useUser from "@/src/common/hooks/useUser";
import type { Info } from "@db/types";
import { AlarmClock, Clock, PencilIcon, PieChart, Timer } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface InfoProps {
  info: Info;
}

const Info = ({ info }: InfoProps) => {
  const session = useUser();
  const pathName = usePathname();

  const showEdit =
    (session?.user?.id === info?.createdBy ||
      session?.user?.id === info?.lastUpdatedBy) &&
    !pathName.includes("edit");

  return (
    <>
      <ul className="flex flex-wrap gap-4 pb-4">
        <li className="flex flex-row items-center gap-1">
          <PieChart className="h-6 w-6" />
          {info?.serves || 1} {info?.serves == 1 ? "serving" : "servings"}
        </li>
        <li className="flex flex-row items-center gap-1">
          <Clock className="h-6 w-6" />
          Prep {info.prep}
        </li>
        <li className="flex flex-row items-center gap-1">
          <AlarmClock className="h-6 w-6" />
          Cook {info.cook}
        </li>
        <li className="flex flex-row items-center gap-1">
          <Timer className="h-6 w-6" />
          Total {info.total}
        </li>
        {showEdit && (
          <li>
            <Link
              href={`/recipes/preview/${info.recipeId}/edit`}
              className="flex flex-row items-center justify-center rounded-md bg-yellow px-2 py-1 text-step--3 text-black"
            >
              <PencilIcon className="mr-1 h-5 w-5" />
              Edit
            </Link>
          </li>
        )}
      </ul>
    </>
  );
};

export default Info;
