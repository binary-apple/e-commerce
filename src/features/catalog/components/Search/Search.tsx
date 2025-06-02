import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import type { ChangeEvent } from 'react';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

type SearchProps = {
  searchValue: string;
  onChange: (value: string) => void;
};

export default function Search({ searchValue, onChange }: SearchProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target?.value;
    onChange(value);
  };

  return (
    <FormControl variant="outlined" fullWidth sx={{ flexGrow: '1' }}>
      <InputLabel htmlFor="search">Search</InputLabel>
      <OutlinedInput
        id="search"
        value={searchValue}
        onChange={handleChange}
        sx={{
          '& input:-webkit-autofill': {
            WebkitBoxShadow: '0 0 0 100px #ebe3cc inset',
          },
        }}
        endAdornment={
          searchValue && (
            <InputAdornment position="end">
              <IconButton type="button" onClick={() => onChange('')}>
                <CloseRoundedIcon />
              </IconButton>
            </InputAdornment>
          )
        }
        label="search"
      />
    </FormControl>
  );
}
