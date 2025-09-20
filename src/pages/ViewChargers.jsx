import { useEffect, useState } from 'react';
import { Table, Modal, Button, Spinner } from 'react-bootstrap';
import { getChargers } from '../services/chargersService';
import { useNavigate } from 'react-router-dom';
const ViewChargers = () => {

    const [chargers, setChargers] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchChargers();
    }, []);

    const fetchChargers = async () => {
        try {
            setLoading(true);
            const response = await getChargers();
            setChargers(response);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching users:', error);
            setLoading(false);
        }
    }

    return (
        <div className="container">
            <h1>Chargers</h1>
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
                        </tr>
                    </thead>
                    <tbody>
                        {chargers.map(charger => (
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
        </div>
    )
}
export default ViewChargers;