import Jumbotron from "../components/Jumbotron";
import AudsCards from '../components/AudsCards'

export default function MainPage() {
    return (
        <main className="container py-5">
            <Jumbotron />
            <h2 className="my-4">Available Auditoriums</h2>
            <AudsCards />
        </main>
    );
}