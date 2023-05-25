import { Input } from '@chakra-ui/react';
import { ChangeEvent, Ref, forwardRef } from 'react';
import { CurrencyInput } from 'react-currency-mask';

interface CustomCurrencyInputProps {
  onChange: (value: number | string) => void;
  value: string | number;
}

export const CustomCurrencyInput = forwardRef(
  (
    { onChange, value, ...props }: CustomCurrencyInputProps,
    ref: Ref<HTMLInputElement>
  ) => {
    return (
      <CurrencyInput
        {...props}
        ref={ref}
        onChangeValue={(
          event: ChangeEvent<HTMLInputElement>,
          originalValue: string | number,
          maskedValue: string | number
        ) => {
          onChange(originalValue);
        }}
        value={value}
        InputElement={<Input placeholder="R$ Valor" />}
        currency="BRL"
      />
    );
  }
);
