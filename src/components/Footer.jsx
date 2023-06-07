import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="bg-dark text-white py-4">
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <p className="m-0">&copy; 2023 Auditorium Reservation</p>
                    </div>
                    <div className="col-md-6 text-md-end">
                        <ul className="list-inline mb-0">
                            <li className="list-inline-item">
                                <Link to='/terms' className="text-white">Terms of Service</Link>
                            </li>
                            <li className="list-inline-item">
                                <Link to='/privacy' className="text-white">Privacy Policy</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}