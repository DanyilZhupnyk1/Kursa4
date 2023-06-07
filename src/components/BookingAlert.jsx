import { useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';
import PropTypes from 'prop-types';

function BookingAlerts({ bookingSuccess, bookingError, onDismissSuccess, onDismissError }) {
    useEffect(() => {
        if (bookingSuccess) {
            const successTimeout = setTimeout(() => {
                onDismissSuccess();
            }, 1000);

            return () => clearTimeout(successTimeout);
        }

        if (bookingError) {
            const errorTimeout = setTimeout(() => {
                onDismissError();
            }, 1000);

            return () => clearTimeout(errorTimeout);
        }
    }, [bookingSuccess, bookingError, onDismissSuccess, onDismissError]);

    return (
        <>
            { bookingSuccess && (
                <Alert variant="success" onClose={ onDismissSuccess } dismissible >
                    <Alert.Heading>Success! Auditorium Booked</Alert.Heading>
                    <p>Your auditorium has been successfully booked. Thank you!</p>
                </Alert>
            ) }
            { bookingError && (
                <Alert variant="danger" onClose={ onDismissError } dismissible >
                    <Alert.Heading>Error</Alert.Heading>
                    <p>{ bookingError }</p>
                </Alert>
            ) }
        </>
    );
}

BookingAlerts.propTypes = {
    bookingSuccess: PropTypes.bool.isRequired,
    bookingError: PropTypes.string,
    onDismissSuccess: PropTypes.func.isRequired,
    onDismissError: PropTypes.func.isRequired,
};

export default BookingAlerts;
