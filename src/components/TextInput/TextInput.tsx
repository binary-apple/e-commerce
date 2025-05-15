import { TextField, InputAdornment, type TextFieldProps } from '@mui/material';
import { forwardRef, useState } from 'react';
import { PasswordAction } from './PasswordAction';
import type { FieldType } from '../../types/form';

type TextInputProps = {
  id: string;
  label: string;
  type?: FieldType;
  fullWidth?: boolean;
} & Omit<TextFieldProps, 'type'>;

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ id, label, type = 'text', fullWidth = true, error, helperText = ' ', ...rest }, reference) => {
    const [showPassword, setShowPassword] = useState(false);

    const isPassword = type === 'password';
    const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

    return (
      <TextField
        id={id}
        label={label}
        type={inputType}
        fullWidth={fullWidth}
        inputRef={reference}
        slotProps={{
          input: {
            endAdornment: isPassword ? (
              <InputAdornment position="end">
                <PasswordAction showPassword={showPassword} setShowPassword={setShowPassword} />
              </InputAdornment>
            ) : undefined,
          },
          inputLabel: {
            shrink: true,
            required: rest.required,
          },
        }}
        variant="outlined"
        size="small"
        sx={{
          paddingBottom: '8px',
          '& input:-webkit-autofill': {
            WebkitBoxShadow: '0 0 0 100px #FBF2DA inset',
          },
        }}
        error={error}
        helperText={helperText}
        {...rest}
      />
    );
  },
);

TextInput.displayName = 'TextInput';
export { TextInput };
