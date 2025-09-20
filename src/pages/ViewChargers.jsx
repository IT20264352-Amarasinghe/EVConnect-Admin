import { useEffect, useState } from 'react';
import { Table, Modal, Button, Spinner, Form } from 'react-bootstrap';
import { getChargers } from '../services/chargersService';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ViewChargers = () => {
    const [chargers, setChargers] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // 🔹 Modal state
    const [showModal, setShowModal] = useState(false);
    const [code, setCode] = useState('');
    const [location, setLocation] = useState('');

    useEffect(() => {
        fetchChargers();
    }, []);

    const fetchChargers = async () => {
        try {
            setLoading(true);
            const response = await getChargers();
            setChargers(response);
        } catch (error) {
            console.error('Error fetching chargers:', error);
        } finally {
            setLoading(false);
        }
    };

    // 🔹 Add new charger
    const handleAddCharger = async () => {
        try {
            const newCharger = {
                code,
                location,
            };

            await axios.post('http://localhost:5115/api/chargers', newCharger);

            setShowModal(false);
            setCode('');
            setLocation('');

            // Refresh chargers list
            fetchChargers();
        } catch (error) {
            console.error('Error adding charger:', error);
            alert('Failed to add charger');
        }
    };

    return (
        <div className="container">
            <h1>Chargers</h1>

            <div className="mb-3 text-end">
                <Button variant="success" onClick={() => setShowModal(true)}>
                    Add New Charger
                </Button>
            </div>

            {loading ? (
                <div className="text-center mt-5">
                    <Spinner animation="border" variant="primary" />
                    <p className="mt-2">Loading Chargers...</p>
                </div>
            ) : (
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>Code</th>
                            <th>Location</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {chargers.map((charger) => (
                            <tr key={charger.id}>
                                <td>{charger.code}</td>
                                <td>{charger.location}</td>
                                <td>
                                    <Button
                                        variant="info"
                                        onClick={() => navigate(`/slots/${charger.id}`, { state: { charger } })}
                                    >
                                        View Slots
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}

            {/* 🔹 Add Charger Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Charger</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Code</Form.Label>
                            <Form.Control
                                type="text"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                placeholder="Enter charger code"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Location</Form.Label>
                            <Form.Control
                                type="text"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                placeholder="Enter charger location"
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleAddCharger}>
                        Save Charger
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ViewChargers;
