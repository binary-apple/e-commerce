import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import { useGetProductsQuery, useGetProductTypesQuery } from '../../../../api/productsApi';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import { AttributeName } from '../../../../types/productsApi';
import { type ChangeEvent, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Slider from '@mui/material/Slider';

const CENTS_IN_EURO = 100;

export default function Filters() {
  const { data: priceData } = useGetProductsQuery({
    priceRange: { from: 0 },
    limit: 0,
  });
  const [petType, setPetType] = useState<string[]>([]);
  const range = priceData?.facets?.['variants.price.centAmount'].ranges[0];
  const rangeMin = (range?.min ?? 0) / CENTS_IN_EURO;
  const rangeMax = (range?.max ?? 0) / CENTS_IN_EURO;
  const [priceRange, setPriceRange] = useState<number[]>([rangeMin, rangeMax]);
  useEffect(() => {
    setPriceRange([rangeMin, rangeMax]);
  }, [rangeMax, rangeMin]);
  const { data } = useGetProductTypesQuery();

  const attributes = data?.results[0].attributes;
  if (!attributes) return;
  const petTypesAttribute = attributes.find(
    (attribute) => attribute.name === AttributeName.PetType,
  );
  const handlePetTypeChange = (event: SelectChangeEvent<typeof petType>) => {
    const {
      target: { value },
    } = event;
    setPetType(typeof value === 'string' ? value.split(',') : value);
  };
  const resetPetType = () => {
    setPetType([]);
  };

  const handlePriceRangeChange = (_event: Event, newValue: number[]) => {
    setPriceRange(newValue);
  };
  const handleMinPriceChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = Math.max(+event.target?.value, rangeMin);
    setPriceRange([newValue, priceRange[1]]);
  };
  const handleMaxPriceChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = Math.min(+event.target?.value, rangeMax);
    setPriceRange([priceRange[0], newValue]);
  };

  const resetPriceRange = () => {
    setPriceRange([rangeMin, rangeMax]);
  };

  const resetFilters = () => {
    resetPetType();
    resetPriceRange();
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
            onChange={handlePetTypeChange}
            label="Pet"
            renderValue={(selected) => selected.join(', ')}
          >
            <MenuItem sx={{ padding: '0' }}>
              <Link
                component="button"
                variant="body2"
                width="100%"
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                  event.stopPropagation();
                  resetPetType();
                }}
              >
                Reset
              </Link>
            </MenuItem>
            <MenuItem disabled divider />
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
          <Select
            labelId="price"
            id="price"
            value={priceRange}
            label="Price"
            multiple
            renderValue={() => {
              return `${priceRange[0]} - ${priceRange[1]}EUR`;
            }}
          >
            <MenuItem sx={{ padding: '0' }}>
              <Link
                component="button"
                variant="body2"
                width="100%"
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                  event.stopPropagation();
                  resetPriceRange();
                }}
              >
                Reset
              </Link>
            </MenuItem>
            <MenuItem disabled divider />
            <MenuItem value="value">
              <Box px={1} py={1} sx={{ width: '250px' }}>
                <Box display="flex" gap={1} mb={2}>
                  <TextField
                    size="small"
                    label="Min"
                    type="number"
                    onChange={handleMinPriceChange}
                    value={priceRange[0]}
                    sx={{ width: '50%' }}
                    inputProps={{
                      min: rangeMin,
                      max: priceRange[1],
                      step: '0.1',
                    }}
                  />
                  <TextField
                    size="small"
                    label="Max"
                    type="number"
                    onChange={handleMaxPriceChange}
                    value={priceRange[1]}
                    sx={{ width: '50%' }}
                    inputProps={{
                      min: priceRange[0],
                      max: rangeMax,
                      step: '0.1',
                    }}
                  />
                </Box>
                <Slider
                  getAriaLabel={() => 'Price'}
                  value={priceRange}
                  onChange={handlePriceRangeChange}
                  valueLabelDisplay="auto"
                  min={rangeMin}
                  max={rangeMax}
                  step={0.1}
                />
              </Box>
            </MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Link component="button" variant="body2" onClick={resetFilters}>
        Reset filters
      </Link>
    </Box>
  );
}
