import { useEffect, useState } from 'react';
import { Table, Modal, Button, Spinner } from 'react-bootstrap';
import { getUsers, deleteUser } from '../services/userService';
import { toast } from 'react-toastify';
import { FaTrash } from 'react-icons/fa';
const ViewUsers = () => {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);

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

    const handleDeleteConfirm = async () => {
        try {
            await deleteUser(userToDelete.id);
            setUsers(users.filter(u => u.id !== userToDelete.id));
            toast.success(`User ${userToDelete.username} deleted successfully!`);
        } catch (err) {
            console.error('Delete failed', err);
            toast.error(`Failed to delete user: ${err.message || 'Unknown error'}`);
        } finally {
            setShowModal(false);
            setUserToDelete(null);
        }
    };

    const handleDeleteClick = (user) => {
        setUserToDelete(user);
        setShowModal(true);
    };

    return (
        <div className="container">
            <h1>Users</h1>
            {loading ? (
                <div className="text-center mt-5">
                    <Spinner animation="border" variant="primary" />
                    <p className="mt-2">Loading Users...</p>
                </div>
            ) : (
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Username</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.username}</td>
                                <td>
                                    <FaTrash
                                        style={{ cursor: 'pointer', color: 'red' }}
                                        onClick={() => handleDeleteClick(user)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
            {/* Delete Confirmation Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete{' '}
                    <strong>{userToDelete?.username}</strong>?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleDeleteConfirm}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
export default ViewUsers;