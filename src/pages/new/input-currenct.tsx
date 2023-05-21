import { Input } from '@chakra-ui/react';
import { ChangeEvent, Ref, forwardRef } from 'react';
import { CurrencyInput } from 'react-currency-mask';

interface CustomCurrencyInputProps {
  onChange: (value: number | string) => void;
}

export const CustomCurrencyInput = forwardRef(
  (
    { onChange, ...props }: CustomCurrencyInputProps,
    ref: Ref<HTMLInputElement>
  ) => {
    return (
      <CurrencyInput
        {...props}
        ref={ref}
        defaultValue={0}
        onChangeValue={(
          event: ChangeEvent<HTMLInputElement>,
          originalValue: string | number,
          maskedValue: string | number
        ) => {
          onChange(originalValue);
        }}
        InputElement={<Input placeholder="R$ Valor" />}
        currency="BRL"
      />
    );
  }
);
