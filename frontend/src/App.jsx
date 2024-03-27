import { useQuery, gql } from "@apollo/client";
const getTodos = gql`
  query ExampleQuery {
    getAllUser {
      email
      id
      name
      phone
      username
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(getTodos);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div>
      {data.getAllUser.map((user) => (
        <div key={user.id}>
          <span>{user.id}</span>
          <span>{user.name}</span>
          <span>{user.email}</span>
          <span>{user.username}</span>
        </div>
      ))}
    </div>
  );
}

export default App;
