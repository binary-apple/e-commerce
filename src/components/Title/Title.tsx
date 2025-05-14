import type { ElementType } from 'react';
import { theme } from '../../theme';
import { type TypographyVariant, Typography } from '@mui/material';

type TitleProps = {
  title: string;
  component?: ElementType;
  variant?: TypographyVariant;
  color?: string;
};

export default function Title({
  title,
  component = 'h2',
  variant = 'h2',
  color = theme.palette.text.primary,
}: TitleProps) {
  return (
    <Typography component={component} variant={variant} color={color}>
      {title}
    </Typography>
  );
}
