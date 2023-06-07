import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { AuthContext } from '../store/AuthContext';
import { fetchUserById, updateUser, deleteUser } from '../services/user_api';

const UpdateUserForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const { state: user, logout, update } = useContext(AuthContext);
    const { email, password } = user;


    const [showPassword, setShowPassword] = useState(true);

    useEffect(() => {
        if (parseInt(id) !== parseInt(user.id)) {
            navigate('/');
        }
    }, [id, user, navigate]);



    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = await fetchUserById(id, email, password);
                update(Object.assign(userData, { password }));

            } catch (error) {
                console.error(error);
            }
        };

        fetchUserData();
    }, [id]);

    const handleUpdateUser = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const formData = new FormData(form);
        const formDataJSON = Object.fromEntries(formData.entries());

        // to change second_name into surname and so on
        const updateBody = {
            email,
            name: formDataJSON.first_name,
            surname: formDataJSON.last_name,
            password: formDataJSON.password || password
        };

        try {
            const updatedUserData = await updateUser(id, updateBody, email, password);
            update(Object.assign(updatedUserData, { password: updateBody.password }))
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async () => {
        try {
            logout();
            navigate('/');
            deleteUser(id, email, password);

        } catch (error) {
            console.error(error);
        }
    };

    return (<>
        <h2>Redact user</h2>
        <h4 className="mb-3">{ user ? user.name : 'User Profile' }</h4>
        <Form onSubmit={ handleUpdateUser }>
            <Form.Group controlId="email">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                    type="email"
                    name="email"
                    defaultValue={ user ? user.email : '' }
                    required
                />
            </Form.Group>

            <Form.Group controlId="first_name">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                    type="text"
                    name="first_name"
                    defaultValue={ user ? user.name : '' }
                    required
                />
            </Form.Group>

            <Form.Group controlId="last_name">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                    type="text"
                    name="last_name"
                    defaultValue={ user ? user.surname : '' }
                    required
                />
            </Form.Group>

            <Form.Group controlId="password">

                <Form.Label>Password</Form.Label>
                <InputGroup>
                    <Form.Control
                        type={ showPassword ? 'text' : 'password' }
                        name="password"
                        placeholder="Leave blank to keep current password"
                    />
                    <Button
                        variant="outline-secondary"
                        onClick={ () => setShowPassword(!showPassword) }
                    >
                        { showPassword ? <i className="fa fa-eye"></i> : <i className="fa fa-eye-slash"></i> }
                    </Button>
                </InputGroup>
            </Form.Group>


            <Button variant="primary" type="submit" className='mt-1'>
                Update
            </Button>
        </Form>

        <Button variant="danger" className="mt-3" onClick={ handleDelete }>
            Delete account
        </Button>
    </>)
}

export default UpdateUserForm;