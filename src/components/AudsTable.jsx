import localAuditoriums from '../auditoruims';
import { Link } from 'react-router-dom'
import { Table, Button } from 'react-bootstrap';
import { fetchAuditoriums } from '../services/auditoriums_api';
import { useEffect, useState } from 'react';

export default function AudsTable() {
    const [auditoriums, setAuditoriums] = useState(localAuditoriums);

    useEffect(() => {
        const fetchAuditoriumsData = async () => {
            try {
                const responseData = await fetchAuditoriums();
                const serverAuditoriums = responseData.results;
                const updatedAuditoriums = localAuditoriums.map((localAuditorium) => {
                    const matchingServerAuditorium = serverAuditoriums.find((serverAuditorium) => {
                        return serverAuditorium.id === localAuditorium.id;
                    });
                    if (matchingServerAuditorium) {
                        return {
                            id: matchingServerAuditorium.id,
                            name: localAuditorium.name,
                            capacity: matchingServerAuditorium.seats,
                            location: matchingServerAuditorium.address,
                            description: localAuditorium.description,
                            images: localAuditorium.images
                        };
                    }
                    return localAuditorium;
                });
                setAuditoriums(updatedAuditoriums);
            } catch (error) {
                console.warn(error);
            }
        };

        fetchAuditoriumsData();
    }, []);

    return (
        <Table striped hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Auditorium Name</th>
                    <th>Capacity</th>
                    <th>Location</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                { auditoriums.map((auditorium, index) => (
                    <tr key={ auditorium.id }>
                        <td>{ index + 1 }</td>
                        <td>{ auditorium.name }</td>
                        <td>{ auditorium.capacity }</td>
                        <td>{ auditorium.location }</td>
                        <td>
                            <Link to={ `/auditorium/${index + 1}` }>
                                <Button
                                    variant="primary"
                                >
                                    Book Now
                                </Button>
                            </Link>
                        </td>
                    </tr>
                )) }
            </tbody>
        </Table>
    )
}
