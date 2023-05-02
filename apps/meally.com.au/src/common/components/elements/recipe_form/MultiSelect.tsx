import React, { useState } from 'react';
import { useFormContext, Controller, RegisterOptions } from 'react-hook-form';
import Select, {
  ClearIndicatorProps,
  DropdownIndicatorProps,
  GroupBase,
  MultiValueRemoveProps,
  OptionsOrGroups,
  components,
} from 'react-select';
import { ChevronDownIcon, XMarkIcon } from '@heroicons/react/24/outline';
import InnerLabel from 'shared/src/components/fields/InnerLabel';

interface SelectComponentProps {
  name: string;
  hint?: string;
  label?: string;
  isMultiple?: true | undefined;
  fieldOptions?: RegisterOptions;
  options: OptionsOrGroups<any, GroupBase<any>> | undefined;
}

const DropdownIndicator = (props: DropdownIndicatorProps) => {
  return (
    <components.DropdownIndicator {...props}>
      <ChevronDownIcon className="w-6 h-6" />
    </components.DropdownIndicator>
  );
};

const ClearIndicator = (props: ClearIndicatorProps) => {
  return (
    <components.ClearIndicator {...props}>
      <XMarkIcon className="w-6 h-6" />
    </components.ClearIndicator>
  );
};

const MultiValueRemove = (props: MultiValueRemoveProps) => {
  return (
    <components.MultiValueRemove {...props}>
      <XMarkIcon className="w-5 h-5" />
    </components.MultiValueRemove>
  );
};

const SelectComponent = ({
  name,
  hint,
  fieldOptions,
  label,
  isMultiple,
  options,
  ...selectOptions
}: SelectComponentProps) => {
  const { control } = useFormContext();
  const [focused, setFocused] = useState(false);
  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);

  const styles =
    'dark:bg-dark_grey dark:shadow-none shadow-main dark:text-white text-black bg-white rounded-md p-1 text-step--2';
  return (
    <Controller
      control={control}
      name={name}
      rules={fieldOptions}
      render={({ field: { onChange, value, ref } }) => (
        <div className="flex flex-col">
          {label && (focused || value) && (
            <InnerLabel label={label} id={name} className="text-step--3" />
          )}
          <Select
            closeMenuOnSelect={false}
            name={name}
            placeholder={focused || value ? '' : label}
            onChange={onChange}
            onBlur={onBlur}
            onFocus={onFocus}
            ref={ref}
            required
            value={value}
            isMulti={isMultiple}
            components={{ DropdownIndicator, ClearIndicator, MultiValueRemove }}
            unstyled
            styles={{
              input: (base) => ({
                ...base,
                'input:focus': {
                  boxShadow: 'none',
                },
              }),
              // On mobile, the label will truncate automatically, so we want to
              // override that behaviour.
              multiValueLabel: (base) => ({
                ...base,
                whiteSpace: 'normal',
                overflow: 'visible',
              }),
              control: (base) => ({
                ...base,
                transition: 'none',
              }),
            }}
            classNames={{
              control: () => styles,
              menu: () => styles,
              valueContainer: () => 'gap-1',
              multiValue: () => 'bg-grey rounded items-center pl-2',
              multiValueRemove: () => 'hover:text-[#E63946] px-1',
            }}
            options={options}
            {...selectOptions}
          />
          {hint ? (
            <p className="text-[0.78rem] font-thin italic">{hint}</p>
          ) : (
            false
          )}
        </div>
      )}
    />
  );
};

export { SelectComponent };
