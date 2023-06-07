import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import auditoriums from '../auditoruims';
import { fetchAuditoriums } from '../services/auditoriums_api'

function Auditoriums() {
    const [fAuditoriums, setFAuditoriums] = useState(auditoriums);


    useEffect(() => {
        const getAuditoriumsData = async () => {
            try {
                const serverAuditoriums = await fetchAuditoriums();
                const localAuditoriums = auditoriums.map((auditorium) => {
                    const matchingServerAuditorium = serverAuditoriums.results.find((serverAuditorium) => {
                        return serverAuditorium.id === auditorium.id;
                    });
                    if (matchingServerAuditorium) {
                        return {
                            id: matchingServerAuditorium.id,
                            name: auditorium.name,
                            capacity: matchingServerAuditorium.seats,
                            location: matchingServerAuditorium.address,
                            description: auditorium.description,
                            images: auditorium.images
                        };
                    }
                    return auditorium;
                });
                setFAuditoriums(localAuditoriums);
            } catch (error) {
                console.error(error);
            }
        };
        getAuditoriumsData();

    }, []);


    return (
        <div className="row" id="cards_wrapper">
            { fAuditoriums.map((auditorium) => (
                <div key={ auditorium.id } className="col-lg-4 col-md-6 col-sm-12 mb-4" >
                    <div className="card">
                        <img src={ auditorium.images[0] } className="card-img-top" alt={ auditorium.name } />
                        <div className="card-body">
                            <h5 className="card-title">
                                { auditorium.name }
                                <span className="badge bg-primary mx-2">{ auditorium.capacity }</span>
                            </h5>
                            <p className="card-text">{ auditorium.location }</p>
                            <Link to={ `/auditorium/${auditorium.id}` } className="btn btn-primary w-100">
                                Book
                            </Link>
                        </div>
                    </div>
                </div>
            )) }
        </div>
    );
}

export default Auditoriums;
