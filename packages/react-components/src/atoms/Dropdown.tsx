import React, { ComponentProps } from 'react';
import Select from 'react-select';

import { noop } from '../utils';
import {
  styles,
  validationMessageStyles,
  indicatorPadding,
  lineHeight,
  paddingLeftRight,
  borderWidth,
} from '../form';
import { dropdownChevronIcon } from '../icons';
import { perRem } from '../pixels';
import { ember, steel, mint, pine, tin } from '../colors';

const { ':focus': focusStyles, ...baseStyles } = styles;

const invalidStyles = {
  color: ember.rgb,
  borderColor: ember.rgb,
};

const reactSelectStyles = (
  isInvalid: boolean,
): ComponentProps<typeof Select>['styles'] => ({
  control: (_provided, { isFocused }) => ({
    ...baseStyles,

    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    ...(isFocused ? focusStyles : {}),
    ...(isInvalid ? invalidStyles : {}),
  }),

  valueContainer: (provided) => ({
    ...provided,
    padding: 0,
    paddingRight: `${indicatorPadding / perRem}em`,
  }),
  input: (_provided) => ({}),
  singleValue: (provided, { getValue }) => ({
    ...provided,
    margin: 0,
    color: getValue().some(
      (option: DropdownOption<string>) => option.value !== '',
    )
      ? 'unset'
      : tin.rgb,
  }),

  indicatorSeparator: (_provided) => ({ display: 'none' }),
  indicatorsContainer: (provided) => ({
    ...provided,

    minWidth: `${lineHeight / perRem}em`,
    minHeight: `${lineHeight / perRem}em`,

    justifyContent: 'center',
    alignItems: 'center',
  }),

  menu: (provided) => ({
    ...provided,

    margin: 0,
    paddingTop: `${9 / perRem}em`,
    paddingBottom: `${18 / perRem}em`,

    borderRadius: 0,
    boxShadow: 'none',
  }),
  menuList: (provided) => ({
    ...provided,

    borderStyle: 'solid',
    borderWidth: `${borderWidth / perRem}em`,
    borderColor: steel.rgb,
  }),
  option: (provided, { isFocused }) => ({
    ...provided,

    padding: `${12 / perRem}em ${paddingLeftRight / perRem}em`,

    backgroundColor: isFocused ? mint.rgb : 'unset',
    color: isFocused ? pine.rgb : 'unset',
    ':active': undefined,
  }),
  noOptionsMessage: (_provided) => ({
    padding: `${12 / perRem}em ${paddingLeftRight / perRem}em`,
  }),
});

export interface DropdownOption<V extends string> {
  value: V;
  label: string;
}
export interface DropdownProps<V extends string> {
  readonly customValidationMessage?: string;

  readonly id?: string;
  readonly options: ReadonlyArray<DropdownOption<V>>;

  readonly value: V;
  readonly onChange?: (newValue: V) => void;
}
export default function Dropdown<V extends string>({
  customValidationMessage = '',

  id,
  options,

  value,
  onChange = noop,
}: DropdownProps<V>): ReturnType<React.FC> {
  return (
    <div>
      <Select<DropdownOption<V>>
        options={options.filter((option) => option.value !== '')}
        value={options.find((option) => option.value === value)}
        onChange={(option) => {
          onChange((option as DropdownOption<V>).value);
        }}
        components={{
          DropdownIndicator: () => dropdownChevronIcon,
        }}
        inputId={id}
        styles={reactSelectStyles(!!customValidationMessage)}
      />
      <div css={validationMessageStyles} hidden={!customValidationMessage}>
        {customValidationMessage}
      </div>
    </div>
  );
}