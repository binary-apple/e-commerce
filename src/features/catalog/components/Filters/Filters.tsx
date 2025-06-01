import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import { useGetProductTypesQuery } from '../../../../api/productsApi';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import { AttributeName } from '../../../../types/productsApi';
import { useState } from 'react';

const resetFilters = () => {};

export default function Filters() {
  const [petType, setPetType] = useState<string[]>([]);
  const { data } = useGetProductTypesQuery();
  const attributes = data?.results[0].attributes;
  if (!attributes) return;
  const petTypesAttribute = attributes.find(
    (attribute) => attribute.name === AttributeName.PetType,
  );
  const handleChange = (event: SelectChangeEvent<typeof petType>) => {
    const {
      target: { value },
    } = event;
    setPetType(typeof value === 'string' ? value.split(', ') : value);
  };

  return (
    <Box component="div" display="flex" justifyContent="space-between" alignItems="center">
      <Box display="flex" gap={2}>
        <FormControl sx={{ width: '150px' }}>
          <InputLabel id="pet-label">Pet</InputLabel>
          <Select
            labelId="pet"
            id="pet"
            multiple
            value={petType}
            onChange={handleChange}
            label="Pet"
            renderValue={(selected) => selected.join(', ')}
          >
            {petTypesAttribute?.type.values.map((attribute) => (
              <MenuItem key={attribute.key} value={attribute.label}>
                <Checkbox checked={petType.includes(attribute.label)} />
                <ListItemText primary={attribute.label} />
              </MenuItem>
            ))}
          </Select>
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
