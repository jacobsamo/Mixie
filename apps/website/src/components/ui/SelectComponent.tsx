"use client";
import { type ClassValue, clsx } from "clsx";
import { ChevronDownIcon, X } from "lucide-react";
import Select, {
  ClearIndicatorProps,
  DropdownIndicatorProps,
  MultiValueRemoveProps,
  components,
} from "react-select";
import makeAnimated from "react-select/animated";
import CreatableSelect from "react-select/creatable";

const DropdownIndicator = (props: DropdownIndicatorProps) => {
  return (
    <components.DropdownIndicator {...props}>
      <ChevronDownIcon />
    </components.DropdownIndicator>
  );
};

const ClearIndicator = (props: ClearIndicatorProps) => {
  return (
    <components.ClearIndicator {...props}>
      <X />
    </components.ClearIndicator>
  );
};

const MultiValueRemove = (props: MultiValueRemoveProps) => {
  return (
    <components.MultiValueRemove {...props}>
      <X />
    </components.MultiValueRemove>
  );
};

const controlStyles = {
  base: "border border-input rounded-md bg-input-foreground z-50",
  focus: "outline-none ring-2 ring-ring ring-offset-2",
  nonFocus: "border-input",
};
const placeholderStyles = " text-sm ml-1";
const selectInputStyles = "text-foreground text-sm ml-1";
const valueContainerStyles = "text-foreground text-sm";
const singleValueStyles = "ml-1";
const multiValueStyles =
  "ml-1 bg-input-foreground shadow border border-input rounded items-center py-0.5 pl-2 pr-1 gap-1.5";
const multiValueLabelStyles = "leading-6 py-0.5";
const multiValueRemoveStyles =
  "border border-input hover:bg-destructive hover:text-white hover:border-destructive rounded-md bg-input-foreground";
const indicatorsContainerStyles = "p-1 gap-1 bg-input-foreground rounded-lg";
const clearIndicatorStyles = " p-1 rounded-md hover:text-destructive";
const indicatorSeparatorStyles = "bg-muted";
const dropdownIndicatorStyles = "p-1 hover:text-foreground";
const menuStyles =
  "mt-2 p-2 border border-input bg-input-foreground text-sm rounded-lg max-h-[200px]";

const menuList = "min-w-fit h-full overflow-y-auto";
const optionsStyle =
  "bg-input-foreground p-2 border-0 text-base hover:bg-secondary hover:cursor-pointer";
const groupHeadingStyles = "ml-3 mt-2 mb-1  text-sm bg-input-foreground";
const noOptionsMessageStyles = "text-muted-foreground bg-input-foreground";

type SelectComponentProps = {
  options: any[];
  value?: any;
  onChange?: (value: any) => void;
  isMulti?: boolean;
  isDisabled?: boolean;
  isLoading?: boolean;
  createAble?: boolean;
  placeholder?: string;
  clearable?: boolean;
};

export const SelectComponent = ({
  options,
  value,
  onChange,
  isMulti = false,
  isDisabled,
  isLoading,
  createAble = false,
  placeholder,
  clearable = true,
  ...props
}: SelectComponentProps) => {
  const animatedComponents = makeAnimated();
  const Comp = createAble ? CreatableSelect : Select;
  return (
    <>
      <Comp
        unstyled
        isClearable={clearable}
        isSearchable
        value={value}
        isDisabled={isDisabled}
        isMulti={isMulti}
        isLoading={isLoading}
        placeholder={placeholder}
        components={animatedComponents}
        // defaultInputValue={defaultValue}
        defaultValue={value}
        options={options}
        noOptionsMessage={() => "No options found !!"}
        onChange={onChange}
        classNames={{
          control: ({ isFocused }) =>
            clsx(
              isFocused ? controlStyles.focus : controlStyles.nonFocus,
              controlStyles.base
            ),
          placeholder: () => placeholderStyles,
          input: () => selectInputStyles,
          option: () => optionsStyle,
          menu: () => menuStyles,
          menuList: () => menuList,
          valueContainer: () => valueContainerStyles,
          singleValue: () => singleValueStyles,
          multiValue: () => multiValueStyles,
          multiValueLabel: () => multiValueLabelStyles,
          multiValueRemove: () => multiValueRemoveStyles,
          indicatorsContainer: () => indicatorsContainerStyles,
          clearIndicator: () => clearIndicatorStyles,
          indicatorSeparator: () => indicatorSeparatorStyles,
          dropdownIndicator: () => dropdownIndicatorStyles,
          groupHeading: () => groupHeadingStyles,
          noOptionsMessage: () => noOptionsMessageStyles,
        }}
        {...props}
      />
    </>
  );
};
