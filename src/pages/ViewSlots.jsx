import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Table, Spinner } from 'react-bootstrap';
import axiosInstance from '../services/axiosInstance';

const ViewSlots = () => {
    const { chargerId } = useParams();
    const location = useLocation();
    const charger = location.state?.charger; // passed from navigate
    const [slots, setSlots] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchSlots();
    }, [chargerId]);

    const fetchSlots = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get(`/api/slots/${chargerId}`);
            setSlots(response.data);
        } catch (error) {
            console.error('Error fetching slots:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <h2>Charger: {charger?.code} - {charger?.location}</h2>
            {loading ? (
                <div className="text-center mt-5">
                    <Spinner animation="border" variant="primary" />
                    <p>Loading Slots...</p>
                </div>
            ) : (
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Start Time</th>
                            <th>End Time</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {slots.map(slot => (
                            <tr key={slot.id}>
                                <td>{new Date(slot.date).toLocaleDateString()}</td>
                                <td>{slot.startTime}</td>
                                <td>{slot.endTime}</td>
                                <td>{slot.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </div>
    );
};

export default ViewSlots;
