import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/sweaters/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/sweaters/"!</div>;
}
