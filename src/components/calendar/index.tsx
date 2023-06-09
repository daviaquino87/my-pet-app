import { CalendarPanel } from "chakra-dayzed-datepicker";
import { endOfDay, format } from "date-fns";
import { forwardRef, useState } from "react";
import { chakraCalendarConfig } from "../../constants/chakra-calendar-condig";

interface Props {
  onChange?: (newDate: string | undefined) => void;
  value?: string;
}

export const Calendar = forwardRef(
  ({ value, onChange, ...rest }: Props & any, ref: any) => {
    const [date, setDate] = useState(() => {
      return (value && new Date(value)) || new Date();
    });

    const handleOnDateSelected = (props: {
      date: Date;
      nextMonth: boolean;
      prevMonth: boolean;
      selectable: boolean;
      selected: boolean;
      today: boolean;
    }) => {
      const { date } = props;
      if (date instanceof Date && !isNaN(date.getTime())) {
        setDate(date);
        onChange?.(format(endOfDay(date), "yyyy-MM-dd'T'HH:mm:ss'Z'"));
      }
    };

    return (
      <CalendarPanel
        {...rest}
        ref={ref}
        dayzedHookProps={{
          selected: date,
          onDateSelected: handleOnDateSelected,
        }}
        configs={chakraCalendarConfig}
      />
    );
  }
);
