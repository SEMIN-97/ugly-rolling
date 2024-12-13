import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/sweater/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/sweater/"!</div>
}
