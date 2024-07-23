"use client";
import useUser from "@/hooks/useUser";
import { displayMinutes } from "@/lib/utils";
import type { Recipe } from "@/types";
import { AlarmClock, Clock, PencilIcon, PieChart, Timer } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRecipeContext } from "./recipe-provider";

const Info = () => {
  const user = useUser();
  const { recipe } = useRecipeContext();
  const pathName = usePathname();

  const showEdit =
    user && user.id === recipe.created_by && !pathName.includes("edit");

  return (
    <>
      <ul className="flex flex-wrap gap-4 pb-4">
        <li className="flex flex-row items-center gap-1">
          <PieChart className="h-6 w-6" />
          {recipe.yield || 1} {recipe.yield == 1 ? "serving" : "servings"}
        </li>
        <li className="flex flex-row items-center gap-1">
          <Clock className="h-6 w-6" />
          Prep {displayMinutes(recipe.prep_time)}
        </li>
        <li className="flex flex-row items-center gap-1">
          <AlarmClock className="h-6 w-6" />
          Cook {displayMinutes(recipe.cook_time)}
        </li>
        <li className="flex flex-row items-center gap-1">
          <Timer className="h-6 w-6" />
          Total {displayMinutes(recipe.total_time)}
        </li>
        {showEdit && (
          <li>
            <Link
              href={`/recipes/preview/${recipe.recipe_id}/edit`}
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
