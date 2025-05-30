import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import type { ChangeEvent } from 'react';

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
    <FormControl variant="outlined" fullWidth>
      <InputLabel htmlFor="search">Search</InputLabel>
      <OutlinedInput
        id="search"
        type="search"
        value={searchValue}
        onChange={handleChange}
        sx={{
          '& input:-webkit-autofill': {
            WebkitBoxShadow: '0 0 0 100px #ebe3cc inset',
          },
        }}
        endAdornment={
          <InputAdornment position="end">
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        }
        label="search"
      />
    </FormControl>
  );
}
