import { useEffect, useState } from "react";
import { Table, Modal, Button, Spinner, Form } from "react-bootstrap";
import { useParams, useLocation } from "react-router-dom";
import axiosInstance from "../services/axiosInstance";

const ViewSlots = () => {
    const { chargerId } = useParams();
    const location = useLocation();
    const charger = location.state?.charger;

    const [slots, setSlots] = useState([]);
    const [loading, setLoading] = useState(false);

    // 🔹 Modal state
    const [showModal, setShowModal] = useState(false);
    const [date, setDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");

    useEffect(() => {
        fetchSlots();
    }, [chargerId]);

    const fetchSlots = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get(`/api/slots/${chargerId}`);
            setSlots(response.data);
        } catch (error) {
            console.error("Error fetching slots:", error);
        } finally {
            setLoading(false);
        }
    };

    // 🔹 Add new slot
    const handleAddSlot = async () => {
        try {
            // Convert date to ISO-like format with time 00:00:00
            const formattedDate = new Date(date);
            const isoDate = new Date(
                formattedDate.getFullYear(),
                formattedDate.getMonth(),
                formattedDate.getDate()
            ).toISOString().split("T")[0] + "T00:00:00"; // "2025-09-19T00:00:00"

            // Append ":00" to time if not present
            const formatTime = (time) => (time.length === 5 ? time + ":00" : time);

            const newSlot = {
                chargerId: chargerId,
                date: isoDate,
                startTime: formatTime(startTime),
                endTime: formatTime(endTime),
                status: "Available",
            };

            await axiosInstance.post("/api/slots", newSlot);

            setShowModal(false);
            setDate("");
            setStartTime("");
            setEndTime("");

            // Refresh slots
            fetchSlots();
        } catch (error) {
            console.error("Error adding slot:", error);
            alert("Failed to add slot");
        }
    };

    return (
        <div className="container">
            <h2>
                Charger: {charger?.code} - {charger?.location}
            </h2>

            <div className="mb-3 text-end">
                <Button variant="success" onClick={() => setShowModal(true)}>
                    Add New Slot
                </Button>
            </div>

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
                        {slots.map((slot) => (
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

            {/* 🔹 Add Slot Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Slot</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Date</Form.Label>
                            <Form.Control
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Start Time</Form.Label>
                            <Form.Control
                                type="time"
                                value={startTime}
                                onChange={(e) => setStartTime(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>End Time</Form.Label>
                            <Form.Control
                                type="time"
                                value={endTime}
                                onChange={(e) => setEndTime(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleAddSlot}>
                        Save Slot
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ViewSlots;
