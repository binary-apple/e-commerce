import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';

export default function Search() {
  return (
    <FormControl variant="outlined" fullWidth>
      <InputLabel htmlFor="search">Search</InputLabel>
      <OutlinedInput
        id="search"
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
