import { useEffect, useState } from 'react';
import { Table, Spinner } from 'react-bootstrap';
import { getUsers } from '../services/userService';
const ViewUsers = () => {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await getUsers();
            setUsers(response);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching users:', error);
            setLoading(false);
        }
    }

    return (
        <div className="container">
            <h3>Customers</h3>
            {loading ? (
                <div className="text-center mt-5">
                    <Spinner animation="border" variant="primary" />
                    <p className="mt-2">Loading Customers...</p>
                </div>
            ) : (
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>NIC</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>

                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={Math.random()}>
                                <td>{user.nic}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.phone}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </div>
    )
}
export default ViewUsers;