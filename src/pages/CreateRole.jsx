import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { createRole } from '../services/roleService';
import SubmitButton from '../components/SubmitButton';
import { toast } from 'react-toastify';

const CreateRole = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        try {
            await createRole(data.roleName);
            reset();
            toast.success('Role created successfully!');
        } catch (error) {
            console.error('Error creating role:', error);
            toast.error('Failed to create role. Please try again.');
        }
    }

    return (
        <>
            <h2>Create Role</h2>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3" >
                    <Form.Label>Role Name</Form.Label>
                    <Form.Control
                        type="string"
                        placeholder="role name"
                        {...register("roleName", { required: "Name is required" })}
                    />
                    {errors.roleName &&
                        <div className="text-danger">{errors.roleName.message}</div>}
                </Form.Group>
                <div className="mt-4">
                    <SubmitButton />
                </div>
            </Form>
        </>
    )
}
export default CreateRole;