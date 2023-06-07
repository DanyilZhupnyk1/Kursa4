import { useState, useEffect, useContext, useRef, useCallback } from 'react';
import { Table, Button, ButtonGroup } from 'react-bootstrap';
import { fetchUserOrders } from '../services/user_api';
import { deleteOrder } from '../services/order_api';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../store/AuthContext';

const UserBookings = () => {
    const { id } = useParams();
    const { state: user } = useContext(AuthContext);
    const { email, password } = user;
    const navigate = useNavigate();
    const offsetRef = useRef(0);

    const [bookings, setBookings] = useState([]);
    const [nextPage, setNextPage] = useState('');
    const [previousPage, setPreviousPage] = useState('');

    const getBookings = useCallback(async () => {
        try {
            const fetchedBookings = await fetchUserOrders(id, email, password, offsetRef.current);
            setBookings(fetchedBookings.results);
            setNextPage(fetchedBookings.next);
            setPreviousPage(fetchedBookings.previous);
        } catch (error) {
            console.error(error);
        }
    }, [id, email, password, offsetRef.current])

    useEffect(() => {
        getBookings();
    }, [getBookings]);

    const handleGoToBooking = (audId, orderId) => {
        localStorage.setItem('orderId', orderId)
        navigate(`/auditorium/${audId}`);
    };

    const handleNextPage = useCallback(async () => {
        offsetRef.current += 9;
        try {
            const fetchedBookings = await fetchUserOrders(id, email, password, offsetRef.current);
            setBookings(fetchedBookings.results);
            setNextPage(fetchedBookings.next);
            setPreviousPage(fetchedBookings.previous);
        } catch (error) {
            console.error(error);
        }
    }, [id, email, password]);

    const handlePreviousPage = useCallback(async () => {
        offsetRef.current -= 9;
        try {
            const fetchedBookings = await fetchUserOrders(id, email, password, offsetRef.current);
            setBookings(fetchedBookings.results);
            setNextPage(fetchedBookings.next);
            setPreviousPage(fetchedBookings.previous);
        } catch (error) {
            console.error(error);
        }
    }, [id, email, password]);

    const handleDeleteOrder = async (orderId) => {
        try {
            await deleteOrder(orderId, email, password)

            getBookings();
            offsetRef.current = 0;
            getBookings();
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <div className='my-4'>
            <h2>User bookings</h2>
            { bookings.length > 0 ? (
                <>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Auditorium</th>
                                <th>Reservation Date</th>
                                <th>Start time</th>
                                <th>End time</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            { bookings.map((booking) => (
                                <tr key={ booking.id }>
                                    <td>{ booking.auditorium }</td>
                                    <td>{ booking.reservation_date }</td>
                                    <td>{ booking.start_datetime }</td>
                                    <td>{ booking.end_datetime }</td>
                                    <td>
                                        <ButtonGroup>

                                            <Button
                                                variant='warning'
                                                onClick={ () => handleGoToBooking(booking.auditorium, booking.id) }
                                            >
                                                Update
                                            </Button>
                                            <Button
                                                variant='danger'
                                                onClick={ () => handleDeleteOrder(booking.id) }
                                            >
                                                Cancel
                                            </Button>
                                        </ButtonGroup>
                                    </td>
                                </tr>
                            )) }
                        </tbody>
                    </Table>
                    <ButtonGroup>

                        { previousPage && (
                            <Button variant='light' onClick={ handlePreviousPage }>
                                Previous
                            </Button>
                        ) }
                        { nextPage && (
                            <Button variant='dark' onClick={ handleNextPage }>
                                Next
                            </Button>
                        ) }
                    </ButtonGroup>
                </>
            ) : (
                <h4>There are no bookings</h4>
            ) }
        </div>
    );
};

export default UserBookings;
