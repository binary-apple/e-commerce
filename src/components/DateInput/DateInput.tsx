import { forwardRef } from 'react';
import type { TextFieldProps } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

type DateInputProps = {
  label: string;
  value: string;
  onChange: (date: Date | null) => void;
  error?: boolean;
  helperText?: string;
} & Omit<TextFieldProps, 'value' | 'onChange'>;

const DateInput = forwardRef<HTMLInputElement, DateInputProps>(
  ({ label, value, onChange, error, helperText = ' ', ...rest }, reference) => {
    const dateValue = typeof value === 'string' ? (value ? new Date(value) : null) : value;

    return (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label={label}
          value={dateValue}
          onChange={onChange}
          format="dd/MM/yyyy"
          slotProps={{
            textField: {
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
