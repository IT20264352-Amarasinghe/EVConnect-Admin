import { Button } from 'react-bootstrap';

const SubmitButton = ({ label = 'Save', ...props }) => {
    return (
        <Button type="submit" variant="primary" className="px-4" {...props}>
            {label}
        </Button>
    );
};

export default SubmitButton;