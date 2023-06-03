import { Input, InputProps } from '@chakra-ui/react';
import { ChangeEvent, Ref, forwardRef } from 'react';
import { CurrencyInput } from 'react-currency-mask';
import { useIsMobile } from '../../hooks/use-is-mobile';

interface CustomCurrencyInputProps {
  onChange: (value: number | string) => void;
  value: string | number;
}

export const CustomCurrencyInput = forwardRef(
  (
    { onChange, value, ...props }: CustomCurrencyInputProps,
    ref: Ref<HTMLInputElement>
  ) => {
    const isMobile = useIsMobile();

    const inputSize: InputProps['size'] = isMobile ? 'lg' : 'md';

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
        InputElement={
          <Input size={inputSize} autoComplete="off" placeholder="R$ Valor" />
        }
        currency="BRL"
      />
    );
  }
);
