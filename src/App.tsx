import Button from './components/button/Button';

export default function App() {
  const message: string = 'React + TypeScript + Eslint installed! 🚀';
  return (
    <>
      <div>{message}</div>
      <Button />
    </>
  );
}
