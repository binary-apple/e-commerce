import { useParams } from 'react-router';

export default function ProductPage() {
  const { id } = useParams();
  // TODO: fetch data and render detailed page
  return <div>Product {id}</div>;
}
