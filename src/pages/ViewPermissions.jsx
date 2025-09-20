import { useEffect, useState } from 'react';
import { getPermissions } from '../services/permissionService';
import { Table, Modal, Button, Spinner } from 'react-bootstrap';

const ViewPermissions = () => {
    const [permissions, setPermissions] = useState([]);
    useEffect(() => {
        fetchPermissions();
    }, []);
    const fetchPermissions = async () => {
        try {
            const response = await getPermissions();
            setPermissions(response);
        } catch (error) {
            console.error('Error fetching permissions:', error);
        }
    }
    return (
        <div>
            <h1>View Permission</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th >ID</th>
                        <th >Name</th>
                    </tr>
                </thead>
                <tbody>
                    {permissions.map(permission => (
                        <tr key={permission.id}>
                            <td>{permission.id}</td>
                            <td >{permission.name}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}
export default ViewPermissions;