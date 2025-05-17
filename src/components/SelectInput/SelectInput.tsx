import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  type SelectProps,
} from '@mui/material';
import { forwardRef } from 'react';

type SelectInputProps = {
  id: string;
  label: string;
  options: { value: string; label: string }[];
  fullWidth?: boolean;
  error?: boolean;
  helperText?: React.ReactNode;
} & Omit<SelectProps, 'native' | 'label' | 'children'>;

const SelectInput = forwardRef<HTMLSelectElement, SelectInputProps>(
  (
    {
      id,
      label,
      options,
      fullWidth = true,
      error = false,
      helperText = ' ',
      value,
      onChange,
      ...rest
    },
    reference,
  ) => {
    const labelId = `${id}-label`;

    return (
      <FormControl fullWidth={fullWidth} size="small" variant="outlined" error={error}>
        <InputLabel id={labelId} shrink required>
          {label}
        </InputLabel>
        <Select
          labelId={labelId}
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          inputRef={reference}
          label={label}
          notched
          {...rest}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>{helperText}</FormHelperText>
      </FormControl>
    );
  },
);

SelectInput.displayName = 'SelectInput';
export { SelectInput };
