import { useEffect, useState } from 'react';
import { Table, Spinner } from 'react-bootstrap';
import { getBookings } from '../services/bookingService';
const ViewBookings = () => {

    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            setLoading(true);
            const response = await getBookings();
            setBookings(response);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching users:', error);
            setLoading(false);
        }
    }

    return (
        <div className="container">
            <h3>Bookings</h3>
            {loading ? (
                <div className="text-center mt-5">
                    <Spinner animation="border" variant="primary" />
                    <p className="mt-2">Loading Bookings...</p>
                </div>
            ) : (
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>Customer Nic</th>
                            <th>Charger Code</th>
                            <th>Charger Location</th>
                            <th>Booking Date</th>
                            <th>Start time</th>
                            <th>End time</th>
                            <th>Created at</th>
                            <th>Status</th>

                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map(booking => (
                            <tr key={booking.id}>
                                <td>{booking.customerNic}</td>
                                <td>{booking.charger.code}</td>
                                <td>{booking.charger.location}</td>
                                <td>{booking.slot.date}</td>
                                <td>{booking.slot.startTime}</td>
                                <td>{booking.slot.endTime}</td>
                                <td>{booking.createdAt}</td>
                                <td>{booking.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </div>
    )
}
export default ViewBookings;