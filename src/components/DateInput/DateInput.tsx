import { forwardRef } from 'react';
import type { TextFieldProps } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { parse } from 'date-fns';

type DateInputProps = {
  label: string;
  value: string;
  name?: string;
  onChange: (date: Date | null) => void;
  error?: boolean;
  helperText?: string;
} & Omit<TextFieldProps, 'value' | 'onChange'>;

const DateInput = forwardRef<HTMLInputElement, DateInputProps>(
  ({ label, value, onChange, error, helperText = ' ', name = 'date', ...rest }, reference) => {
    const dateValue = (() => {
      if (!value) return null;
      const parsed = parse(value, 'dd.MM.yyyy', new Date());
      if (!Number.isNaN(parsed.getTime())) return parsed;

      const iso = new Date(value);
      return Number.isNaN(iso.getTime()) ? null : iso;
    })();

    return (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          name={name}
          label={label}
          value={dateValue}
          onChange={onChange}
          format="dd/MM/yyyy"
          slotProps={{
            textField: {
              name,
              inputRef: reference,
              fullWidth: true,
              size: 'small',
              error,
              helperText,
              ...rest,
              InputLabelProps: {
                shrink: true,
              },
              InputProps: {
                notched: true,
              },
            },
          }}
        />
      </LocalizationProvider>
    );
  },
);

DateInput.displayName = 'DateInput';
export { DateInput };
