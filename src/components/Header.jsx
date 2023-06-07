import { useContext } from 'react';
import { Link, useLocation, useNavigate, } from 'react-router-dom';
import { Navbar, Container, Nav, NavDropdown, Image, Button } from 'react-bootstrap';

import { AuthContext } from '../store/AuthContext';

function Header() {
    const { state, logout } = useContext(AuthContext);
    const navigate = useNavigate();


    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const handleProfile = () => {
        navigate(`/profile/${state.id}`)
    }

    const mockData = {
        avatar: 'https://th.bing.com/th/id/OIP.udIfmXkDTzwuDF4YKPHBPgHaHk?pid=ImgDet&rs=1',
    }

    const location = useLocation();

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand as={ Link } to="/">Auditorium Reservation</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar-nav" />
                <Navbar.Collapse id="navbar-nav" className="justify-content-end">
                    <Nav className="mr-auto">
                        <Nav.Link as={ Link } to="/" active={ location.pathname === '/' }>Home</Nav.Link>
                        <Nav.Link as={ Link } to="/auditoriums" active={ location.pathname === '/auditoriums' }>Auditoriums</Nav.Link>
                    </Nav>
                    { state?.email ?
                        <NavDropdown title={
                            <>
                                <Image src={ state.avatar || mockData.avatar } roundedCircle width="30" height="30" className="me-2" />
                                <span id="userEmail">{ state.email }</span>
                            </>
                        } id="user-dropdown">
                            <NavDropdown.Item onClick={ handleProfile }>
                                Profile
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={ handleLogout }>Logout</NavDropdown.Item>
                        </NavDropdown>
                        :
                        <>
                            <Button as={ Link } to="/login" variant="outline-primary" className="me-2">Login</Button>
                            <Button as={ Link } to="/register" variant="primary">Register</Button>
                        </>
                    }
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;
