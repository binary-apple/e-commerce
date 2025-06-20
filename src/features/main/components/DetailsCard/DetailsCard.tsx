import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import type { DetailsCardProps } from '../WhyWeCareSection/constants';
import CardMedia from '@mui/material/CardMedia';
import classes from './detailsCard.module.scss';

export default function DetailsCard({ title, imgUrl, text, isBg: bgImg }: DetailsCardProps) {
  return (
    <Card
      sx={{ maxWidth: 345, borderRadius: 8, py: 3, px: 1, position: 'relative', flex: '1 1 360px' }}
    >
      {bgImg && <Box className={classes['card-background']}></Box>}
      <CardMedia>
        <Avatar alt={`${title} icon`} src={imgUrl} sx={{ width: 111, height: 111 }} />
      </CardMedia>
      <CardHeader
        sx={{ py: 1 }}
        title={
          <Typography variant="h5" component="div" color="secondary" fontFamily="Josefin Sans">
            {title}
          </Typography>
        }
      />
      <CardContent>
        <Typography variant="body2" color="secondary" fontFamily="Josefin Sans" fontSize={16}>
          {text}
        </Typography>
      </CardContent>
    </Card>
  );
}
