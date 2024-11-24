import { createLazyFileRoute } from '@tanstack/react-router'
import { useFetchSweaters } from "../../hooks/useSweaters.ts";

export const Route = createLazyFileRoute('/sweaters/')({
  component: Sweaters,
})

function Sweaters() {
  const { data, isLoading, error } = useFetchSweaters();

  if (isLoading) return <p>Loading..</p>
  if (error) return <p>Error : {error.message}</p>
  if (!data || data.length === 0) return <p>No data available</p>;

  return (
    <ul>
      {data?.map((sweater) => (
        <li key={sweater.id}>
          {sweater.user}: {sweater.description}
        </li>
      ))}
    </ul>
  )
}
