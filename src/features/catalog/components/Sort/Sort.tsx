import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { Select, type SelectChangeEvent } from '@mui/material';
import { SortOptions } from './constants';
import { isSortValues, type SortValues } from '../../types/sort';
import { useCallback } from 'react';

type SortProps = {
  sortValue: SortValues;
  onChange: (value: SortValues) => void;
};

export default function Sort({ sortValue, onChange }: SortProps) {
  const handleChange = useCallback(
    (event: SelectChangeEvent) => {
      const value = event.target.value;
      onChange(isSortValues(value) ? value : '');
    },
    [onChange],
  );

  return (
    <FormControl size="small" sx={{ minWidth: '120px' }}>
      <InputLabel id="sort-label">Sort</InputLabel>
      <Select labelId="sort" id="sort" value={sortValue} label="Sort" onChange={handleChange}>
        {SortOptions.map(({ value, label }, id) => (
          <MenuItem key={id} value={value}>
            {label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
