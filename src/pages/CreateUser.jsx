import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Form, Container, Row, Col } from 'react-bootstrap';
import { createUser } from '../services/userService';
import SubmitButton from '../components/SubmitButton';

const CreateUser = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log("Submitted data:", data);
        reset(); // Reset the form after submission
        // Add your logic here
    };

    return (
        <Container className="py-4">
            <Row >
                <h1>Create User</h1>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    {/* 1️⃣ Two‑column layout starting at md (≥768 px) */}
                    <Row className="g-3">
                        <Col xs={12} md={6}>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Name"
                                {...register("name", { required: "Name is required" })}
                                isInvalid={!!errors.name}
                            />
                            {errors.name && <div className="text-danger">{errors.name.message}</div>}
                        </Col>

                        <Col xs={12} md={6}>
                            <Form.Group controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Email"
                                    {...register("email", { required: "Email is required" })}
                                    isInvalid={!!errors.email}
                                    required
                                />
                                {errors.email && <div className="text-danger">{errors.email.message}</div>}
                            </Form.Group>
                        </Col>
                    </Row>

                    <div className="mt-4">
                        <SubmitButton />
                    </div>
                </Form>
            </Row>
        </Container>
    );
};

export default CreateUser;
