import { Table, Modal, Button, Spinner } from 'react-bootstrap';
import { getRoles } from '../services/roleService';
import { getPermissions } from '../services/permissionService';
import { useEffect, useState, useMemo } from 'react';
import { FaEdit } from 'react-icons/fa';
import Select from 'react-select';
const ViewRoles = () => {

    const [roles, setRoles] = useState([]);
    const [permissions, setPermissions] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedRole, setSelectedRole] = useState(null);
    const [selectedPermissions, setSelectedPermissions] = useState([]);
    const [loading, setLoading] = useState(false);
    const permissionOptions = useMemo(() =>
        permissions.map(p => ({ value: p.id, label: p.name })),
        [permissions]
    );

    useEffect(() => {
        fetchRoles();
        fetchPermissions();
    }, []);

    const fetchRoles = async () => {
        try {
            setLoading(true);
            const response = await getRoles();
            setRoles(response);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching roles:', error);
        }
    };

    const fetchPermissions = async () => {
        try {
            setLoading(true);
            const response = await getPermissions();
            setPermissions(response);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching permissions:', error);
        }
    }

    const handlePermissionsChange = (selectedOptions) => {
        setSelectedPermissions(selectedOptions); // this will be array of { value, label }
    };

    const handleEdit = (role) => {
        console.log('Edit role:', role);
        setSelectedRole(role);
        const selected = role.permissions?.map(pid => {
            const perm = permissions.find(p => p.id === pid.id);
            return { value: perm.id, label: perm.name };
        }) || [];
        setSelectedPermissions(selected);
        setShowModal(true);
    }

    const handleClose = () => {
        setShowModal(false);
        setSelectedRole(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Add your submit logic here
        console.log('Submitting role:', selectedRole);
        handleClose();
    };

    return (
        <>
            {loading ? (
                <div className="text-center mt-5">
                    <Spinner animation="border" variant="primary" />
                    <p className="mt-2">Loading roles and permissions...</p>
                </div>
            ) : (
                <>
                    <h1>View Roles</h1>
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {roles.map((role, index) => (
                                <tr key={role.id}>
                                    <td>{index + 1}</td>
                                    <td>{role.name}</td>
                                    <td><FaEdit
                                        style={{ cursor: 'pointer', color: 'blue' }}
                                        onClick={() => handleEdit(role)}
                                    /></td>
                                </tr>
                            ))}

                        </tbody>
                    </Table>
                    <Modal show={showModal} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Edit Role</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {selectedRole && (
                                <>
                                    <p><strong>Role Name:</strong> {selectedRole.name}</p>
                                    {/* Add your form or inputs here to edit */}
                                    <Select
                                        isMulti
                                        options={permissionOptions}
                                        value={selectedPermissions}
                                        onChange={handlePermissionsChange}
                                        placeholder="Choose permissions..."
                                    />
                                </>
                            )}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Cancel
                            </Button>
                            <Button variant="primary" onClick={handleSubmit}>
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </>
            )}
        </>
    );
}
export default ViewRoles;