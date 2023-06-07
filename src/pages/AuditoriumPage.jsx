import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import { fetchAuditoriumById } from '../services/auditoriums_api';
import auditoriums from '../auditoruims';
import { AuthContext } from '../store/AuthContext';
import BookingAlerts from '../components/BookingAlert';
import BookingForm from '../components/BookingForm';

const initialData = {
    name: 'Auditorium',
    description: 'No description available.',
    images: ['/classroom1.jpg', '/classroom5.jpg', '/classroom7.jpg'],
    location: 'No location available.',
    capacity: '0',
    price: 'Not available.',
};

SwiperCore.use([Navigation, Pagination]);

function Auditorium() {
    const { id: audId } = useParams();
    const navigate = useNavigate();

    const { state: user } = useContext(AuthContext);
    const { id: userId, email, password, } = user;


    const [auditorium, setAuditorium] = useState(initialData);
    const localAuditorium = auditoriums.find((auditoriumItem) => auditoriumItem.id === +audId);

    const [bookingError, setBookingError] = useState(null);
    const [bookingSuccess, setBookingSuccess] = useState(false);

    useEffect(() => {
        if (!user.id) {
            navigate('/login');
        }
    }, [user, navigate]);

    useEffect(() => {
        const FetchAndUpdateAuditoriumData = async () => {
            try {
                const responseData = await fetchAuditoriumById(audId, email, password);
                const { seats, address, price_per_hour } = responseData;

                setAuditorium({
                    name: localAuditorium.name || '',
                    description: localAuditorium.description || '',
                    images: localAuditorium.images || [],
                    location: address || localAuditorium.location || '',
                    capacity: seats || localAuditorium.capacity || '',
                    price: price_per_hour || localAuditorium.price || '',
                });
            } catch (error) {
                setBookingError(error.message);
            }
        };

        FetchAndUpdateAuditoriumData();
    }, [audId, localAuditorium, email, password]);

    return (
        <main className="flex-grow-1 container">
            <BookingAlerts
                bookingSuccess={ bookingSuccess }
                bookingError={ bookingError }
                onDismissSuccess={ () => setBookingSuccess(false) }
                onDismissError={ () => setBookingError(null) }
            />

            <h2 className="text-center mb-4">{ auditorium.name }</h2>

            <div className="row">
                <div className="col-lg-6 mb-4">
                    <Swiper pagination={ { clickable: true } } spaceBetween={ 30 } loop>
                        { auditorium.images?.map((image, index) => (
                            <SwiperSlide key={ index }>
                                <img
                                    src={ image }
                                    className="img-fluid rounded mr-2"
                                    alt={ `Auditorium ${index}` }
                                />
                            </SwiperSlide>
                        )) }
                    </Swiper>
                </div>
                <div className="col-lg-6 mb-4">
                    <h4>Description</h4>
                    <p>{ auditorium.description }</p>
                    <h4>Location</h4>
                    <p>{ auditorium.location }</p>
                    <h5>Price per hour: { auditorium.price }</h5>
                    <h4>
                        Capacity:{ ' ' }
                        <span className="badge badge-primary bg-primary">{ auditorium.capacity }</span>
                    </h4>
                    <BookingForm
                        userId={ userId }
                        audId={ audId }
                        email={ email }
                        password={ password }
                        setBookingSuccess={ setBookingSuccess }
                        setBookingError={ setBookingError }
                    />
                </div>
            </div>
        </main>
    );
}

export default Auditorium;
