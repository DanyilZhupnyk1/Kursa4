import { useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { AuthContext } from '../store/AuthContext';
import UpdateUserForm from '../components/UpdateUserForm';
import UserBookings from '../components/UserBookings';


function UserProfile() {
	const navigate = useNavigate();
	const { id } = useParams();

	const { state: user } = useContext(AuthContext);


	useEffect(() => {
		if (parseInt(id) !== parseInt(user.id)) {
			navigate('/');
		}
	}, [id]);



	return (
		<Container>
			<Row>
				<Col md={ 4 } className="text-center">
					<Image
						src="https://th.bing.com/th/id/OIP.udIfmXkDTzwuDF4YKPHBPgHaHk?pid=ImgDet&rs=1"
						roundedCircle
						style={ { width: '150px', height: '150px', objectFit: 'cover' } }
					/>
				</Col>
				<Col md={ 8 }>
					<UpdateUserForm />
					<UserBookings />
				</Col>
			</Row>

		</Container>
	);

}

export default UserProfile;
