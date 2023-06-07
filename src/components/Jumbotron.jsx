import { Link } from "react-router-dom"

export default function Jumbotron() {
    return (
        <div className="jumbotron">
            <h1 className="display-4">Welcome to Auditorium Reservation</h1>
            <p className="lead">
                We offer a wide range of comfortable and affordable Auditoriums for your convenience.
            </p>
            <hr className="my-4" />
            <p>
                Whether you are looking for a Auditorium for a meeting, conference, or any other occasion, we have something to suit your needs.
            </p>
            <Link className="btn btn-primary btn-lg" to="/auditoriums" role="button">View Available Auditoriums</Link>
        </div>
    )
}