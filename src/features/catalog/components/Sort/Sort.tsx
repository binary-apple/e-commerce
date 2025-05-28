import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import type { SelectChangeEvent } from '@mui/material/Select';
import { Select } from '@mui/material';
import { useState } from 'react';
import { SortOptions } from './constants';

export default function Sort() {
  const [sortValue, setSortValue] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setSortValue(event.target.value);
  };

  return (
    <FormControl sx={{ width: '120px' }}>
      <InputLabel id="sort-label">Sort</InputLabel>
      <Select labelId="sort" id="sort" value={sortValue} label="Sort" onChange={handleChange}>
        {SortOptions.map(({ value, label }) => (
          <MenuItem value={value}>{label}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
