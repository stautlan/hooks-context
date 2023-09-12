import { useEffect, useState } from 'react'
import users from '../../data/users.json' //'../data/users.json'

const List = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [userDetails, setUserDetails] = useState<UserDetails | null>(null);

    useEffect(() => {
      const fetchUsers = async () => {
        try {
          const response = await fetch("../data/users.json", {headers: {'content-type':'application/json'}});
          const data = await response.json();
          setUsers(data);
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      };

        fetchUsers();
    }, []);

    useEffect(() => {
      // Загрузка выбранного пользователя
      const fetchUserDetails = async (userId: number) => {
        setLoading(true);

        try {
          const response = await fetch(`../data/${userId}.json`);
          const data = await response.json();
          console.log(data)
          setUserDetails(data);
          setLoading(false);

        } catch (error) {
            console.error(`Error fetching user details for user ID: ${userId}`, error);
        }
      }

      if (selectedUser) {
        fetchUserDetails(selectedUser.id)
      }
    }, [selectedUser]);

    const handleUserClick = (user: User) => {
      setSelectedUser(user);
    };

  return (
    <div className='main'>
      <div className='div-left'>
        <h2>Список </h2>
        {users.map((user) => (
          <div key={user.id} onClick={() => handleUserClick(user)}>
            {user.name}
          </div>
        ))}
      </div>

      <div className='div-right'>
        <h2>О пользователе</h2>
        {loading && <div>Loading...</div>}
        {userDetails && (
          <div>
            <img src={userDetails.avatar} alt="<User Avatar>" />
            <p>Name: {userDetails.name}</p>
            <p>City: {userDetails.details.city}</p>
            <p>Company: {userDetails.details.company}</p>
            <p>Position: {userDetails.details.position}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default List;