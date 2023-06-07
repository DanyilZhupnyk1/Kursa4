import { useState } from 'react';
import { loginUser } from '../services/user_api';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../store/AuthContext';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const [passwordVisible, setPasswordVisible] = useState(false);

    const { login } = useContext(AuthContext);

    const navigate = useNavigate();



    const handleTogglePassword = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await loginUser(email, password);

            login(Object.assign(response, { password }));

            navigate('/');
        } catch (error) {
            setErrorMessage('Incorrect email or password.');
        }
    };

    return (
        <main className="flex-grow-1 container my-3">
            <div className="row justify-content-center align-items-center bg-light py-5 rounded">
                <div className="col-md-6">
                    <h2 className="mb-4">Login to Auditorium Reservation</h2>
                    { errorMessage && (
                        <div className="alert alert-danger" role="alert">
                            { errorMessage }
                        </div>
                    ) }
                    <form onSubmit={ handleLogin }>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">
                                Email
                            </label>
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
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">
                                Password
                            </label>
                            <div className="input-group">
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
                            Login
                        </button>
                        <div className="mt-3 text-center">
                            Don`t have an account?
                            <Link to="/register">Register here</Link>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
}

export default Login;
