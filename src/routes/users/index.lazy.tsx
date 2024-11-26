import { createLazyFileRoute } from '@tanstack/react-router'
import { useFetchUsers } from '../../hooks/useUsers.ts'

export const Route = createLazyFileRoute('/users/')({
  component: Users,
})

function Users() {
  const { data, isLoading, error } = useFetchUsers()

  if (isLoading) return <p>Loading..</p>
  if (error) return <p>Error : {error.message}</p>
  if (!data || data.length === 0) return <p>No data available</p>

  return (
    <ul>
      {data?.map((user) => (
        <li key={user.id}>
          {user.nickname}: {user.description}
        </li>
      ))}
    </ul>
  )
}
