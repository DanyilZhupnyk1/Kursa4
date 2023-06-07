import { useState, useContext } from 'react';
import { createUser } from '../services/user_api';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../store/AuthContext';

function Register() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const { state, login } = useContext(AuthContext);

    const navigate = useNavigate();

    const [passwordVisible, setPasswordVisible] = useState(false);

    const handleTogglePassword = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const newUser = await createUser({
                name: firstName,
                surname: lastName,
                email,
                password,
            });

            login(Object.assign(newUser, { password }));

            navigate('/');
        } catch (error) {
            setErrorMessage('Failed to create user.');
        }
    };

    return (
        <main className="container flex-grow-1">
            <div className="row justify-content-center align-items-center py-5 my-3 rounded bg-light">
                <div className="col-md-6">
                    <h2 className="mb-4">Register for Auditorium Reservation</h2>
                    { errorMessage && (
                        <div className="alert alert-danger" role="alert">
                            { errorMessage }
                        </div>
                    ) }
                    <form onSubmit={ handleRegister }>
                        <div className="form-group">
                            <label htmlFor="firstname">First Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="firstname"
                                name="firstname"
                                required
                                value={ firstName }
                                onChange={ (e) => setFirstName(e.target.value) }
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="secondname">Last Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="secondname"
                                name="secondname"
                                required
                                value={ lastName }
                                onChange={ (e) => setLastName(e.target.value) }
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                required
                                value={ email }
                                onChange={ (e) => setEmail(e.target.value) }
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <div className="input-group mb-3">
                                <input
                                    type={ passwordVisible ? 'text' : 'password' }
                                    className="form-control"
                                    id="password"
                                    name="password"
                                    required
                                    value={ password }
                                    onChange={ (e) => setPassword(e.target.value) }
                                />
                                <button
                                    className="btn btn-outline-secondary"
                                    type="button"
                                    id="togglePassword"
                                    onClick={ handleTogglePassword }
                                >
                                    <i
                                        className={
                                            passwordVisible ? 'fa fa-eye' : 'fa fa-eye-slash'
                                        }
                                        aria-hidden="true"
                                    ></i>
                                </button>
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary btn-block w-100"
                        >
                            Register
                        </button>
                        <p className="text-center mt-3">
                            Already have an account?
                            <Link to="/login">Login</Link>
                        </p>
                    </form>
                </div>
            </div>
        </main>
    )
}
export default Register;