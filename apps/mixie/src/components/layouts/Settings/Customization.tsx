import { TFont, TTheme } from "@/server/db/enum-types";
import { User } from "@/server/db/types";
import { cva } from "class-variance-authority";
import { useFormContext } from "react-hook-form";

const styles = cva(
  "flex items-center gap-2 p-2 max-w-xs dark:outline dark:outline-grey dark:outline-2 dark:bg-grey dark:text-white dark:shadow-none shadow-main bg-white text-black rounded-md",
  {
    variants: {
      size: {
        sm: "text-sm",
        md: "h-12 w-28 ",
        lg: "h-12 w-46",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const theme = ["system", "light", "dark"];

const fonts = ["default", "open_dyslexic", "monospace", "serif", "sans_serif"];

const Customization = () => {
  const { getValues, register, setValue, control } = useFormContext<User>();

  const setImages = (image: string) => {
    setValue("image", image);
  };

  const handleCheckboxChange = (event: any, name: any) => {
    const diet = event.target.value;
    const values = getValues(name);

    // If the checkbox is checked, add the item to the list.
    if (event.target.checked) {
      values.push(diet);
    } else {
      // If the checkbox is unchecked, remove the item from the list.
      const index = values.indexOf(diet);
      if (index > -1) {
        values.splice(index, 1);
      }
    }

    setValue(name, values);
  };

  return (
    <div>
      <div>
        <h2 className="my-2 text-step0">Theme</h2>
        <div className="flex flex-auto flex-wrap gap-2">
          {theme.map((theme, index) => (
            <label key={index} className={styles({ size: "md" })}>
              <input
                key={theme}
                type="radio"
                {...register("theme")}
                value={theme}
                defaultChecked={getValues("theme") == theme}
                onChange={() => {
                  setValue("theme", theme as TTheme);
                }}
                className="h-4 w-4"
              />
              <p className="text-step--2">{theme}</p>
            </label>
          ))}
        </div>
      </div>
      <div>
        <h2 className="my-2 text-step0">Reading Font</h2>
        <div className="flex flex-auto flex-wrap gap-2">
          {fonts.map((font, index) => (
            <label key={index} className={styles({ size: "lg" })}>
              <input
                key={font}
                type="radio"
                {...register("font")}
                value={font}
                defaultChecked={getValues("font") == font}
                onChange={() => {
                  setValue("font", font as TFont);
                }}
                className="h-4 w-4"
              />
              <p className="text-step--2">{font}</p>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Customization;
