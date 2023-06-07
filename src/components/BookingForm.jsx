import { useEffect } from 'react';
import { createOrder, fetchOrderById, updateOrder } from '../services/order_api';
import { useState } from 'react';
import PropTypes from 'prop-types'
import { Form, Button, ButtonGroup, FormGroup } from 'react-bootstrap';


const BookingForm = ({ userId, audId, email, password, setBookingSuccess, setBookingError }) => {
    const [selectedDate, setSelectedDate] = useState('');
    const [timeStart, setTimeStart] = useState('');
    const [timeEnd, setTimeEnd] = useState('');

    const orderId = localStorage.getItem('orderId');
    const [orderData, setOrderData] = useState(null);

    useEffect(() => {
        if (localStorage.getItem('orderId')) {

            const fetchDefaultData = async () => {
                try {
                    // Fetch the default data using the orderId
                    const orderData = await fetchOrderById(orderId, email, password);
                    setOrderData(orderData);

                    // Set the initial state values with orderData values
                    setSelectedDate(orderData?.reservation_date || '');
                    setTimeStart(orderData?.start_datetime || '');
                    setTimeEnd(orderData?.end_datetime || '');
                } catch (error) {
                    console.error(error);
                }
            };

            fetchDefaultData();
            return () => {
                localStorage.removeItem('orderId');
            }
        }
    }, [orderId, email, password]);

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };

    const handleStartChange = (event) => {
        setTimeStart(`${event.target.value}:00`);
    };

    const handleEndChange = (event) => {
        setTimeEnd(`${event.target.value}:00`);
    };

    const handleBookingSubmit = async (event) => {
        event.preventDefault();

        try {
            const bookingData = {
                user: userId,
                auditorium: audId,
                reservation_date: selectedDate,
                end_datetime: timeStart,
                start_datetime: timeEnd
            };

            if (orderData) {
                await updateOrder(orderId, bookingData, email, password);
                setBookingSuccess(true);
                setBookingError(null);
                console.log('Update');
            }
            else {
                const response = await createOrder(bookingData, email, password);
                setBookingSuccess(true);
                setBookingError(null);
                localStorage.setItem('orderId', response.id)
            }

        } catch (error) {
            console.error('Error creating booking:', error);
            setBookingError(error.message);
            setBookingSuccess(false);
        }
    };

    return (
        <Form onSubmit={ handleBookingSubmit }>
            <FormGroup >
                <label htmlFor="datepicker">Select a date:</label>
                <input
                    type="date"
                    id="datepicker"
                    className="form-control"
                    value={ selectedDate }
                    onChange={ handleDateChange }
                    required
                />
            </FormGroup>
            <FormGroup>
                <label htmlFor="time-start">Select a time:</label>
                <input
                    type="time"
                    id="time-start"
                    className="form-control"
                    value={ timeStart }
                    onChange={ handleStartChange }
                    required
                />
            </FormGroup>
            <FormGroup>
                <label htmlFor="time-end">Select a time:</label>
                <input
                    type="time"
                    id="time-end"
                    className="form-control"
                    value={ timeEnd }
                    onChange={ handleEndChange }
                    required
                />
            </FormGroup>

            <ButtonGroup className='mt-3'>
                { orderData ?
                    <Button type="submit" variant='warning'>
                        Update booking
                    </Button> :
                    <Button type="submit" variant='primary'>
                        Book Now
                    </Button>
                }
            </ButtonGroup>
        </Form>
    )
}

BookingForm.propTypes = {
    userId: PropTypes.number.isRequired,
    audId: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    setBookingSuccess: PropTypes.func.isRequired,
    setBookingError: PropTypes.func.isRequired,
};

export default BookingForm;
