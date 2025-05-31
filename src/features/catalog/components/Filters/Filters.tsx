import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import Select from '@mui/material/Select';

const resetFilters = () => {};

export default function Filters() {
  return (
    <Box component="div" display="flex" justifyContent="space-between" alignItems="center">
      <Box display="flex" gap={2}>
        <FormControl sx={{ width: '150px' }}>
          <InputLabel id="pet-label">Pet</InputLabel>
          <Select labelId="pet" id="pet" value="" label="Pet"></Select>
        </FormControl>
        <FormControl sx={{ width: '150px' }}>
          <InputLabel id="price-label">Price</InputLabel>
          <Select labelId="price" id="price" value="" label="Price"></Select>
        </FormControl>
        <FormControl sx={{ width: '150px' }}>
          <InputLabel id="shelter-label">Shelter</InputLabel>
          <Select labelId="shelter" id="shelter" value="" label="Shelter"></Select>
        </FormControl>
      </Box>
      <Link component="button" variant="body2" onClick={resetFilters}>
        Reset filters
      </Link>
    </Box>
  );
}
