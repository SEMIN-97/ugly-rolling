import { createLazyFileRoute } from '@tanstack/react-router';
import { CommonLayout } from '../layouts/CommonLayout.tsx';

export const Route = createLazyFileRoute('/')({
  component: Index
});

function Index() {
  return (
    <CommonLayout>
      <h1>Index Page</h1>
    </CommonLayout>
  );
}