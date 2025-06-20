import { IconButton, InputAdornment } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import type { Dispatch, SetStateAction } from 'react';

type PasswordAdornmentProps = {
  showPassword: boolean;
  setShowPassword: Dispatch<SetStateAction<boolean>>;
};

const handleMouseDown = (event: React.MouseEvent<HTMLButtonElement>) => {
  event.preventDefault();
};

export function PasswordAction({ showPassword, setShowPassword }: PasswordAdornmentProps) {
  const handleClick = () => setShowPassword((show) => !show);

  return (
    <InputAdornment position="end">
      <IconButton
        aria-label="toggle visibility"
        onClick={handleClick}
        onMouseDown={handleMouseDown}
        edge="end"
      >
        {showPassword ? <VisibilityOff /> : <Visibility />}
      </IconButton>
    </InputAdornment>
  );
}
