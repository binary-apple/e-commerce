import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import type { ProductConfig } from '../../types/product';

export default function ProductCard({ product }: { product: ProductConfig }) {
  return (
    <Card
      sx={{
        maxWidth: 255,
        borderRadius: '36px',
        p: 3,
        position: 'relative',
        flex: '1 1 255px',
      }}
    >
      <CardMedia component="img" height="140" image={product.image} alt={product.name} />
      <CardContent>
        <Typography variant="h3" component="div">
          {product.name}
        </Typography>
        <Typography variant="h6" color="text.secondary">
          {product.price}
        </Typography>
      </CardContent>
    </Card>
  );
}
