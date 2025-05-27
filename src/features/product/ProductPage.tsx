import { useParams } from 'react-router';
import { useGetProductByKeyQuery } from '../../api/productsApi';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

export default function ProductPage() {
  const { key } = useParams();
  const { data, isLoading, isError, error } = useGetProductByKeyQuery(
    { key: key! },
    { skip: !key },
  );
  if (isLoading) {
    return <CircularProgress size="3rem" />;
  }
  if (isError) {
    return <Box>Error {JSON.stringify(error)}</Box>;
  }
  console.log(data);
  // TODO: render detailed page
  return <div>Product {key}</div>;
}
