import { Container } from 'react-bootstrap';
import AudsTable from '../components/AudsTable';


function Auditoriums() {

    return (
        <Container className="flex-md-grow-0">
            <h2 className="text-center mb-4">Auditoriums</h2>
            <AudsTable />
        </Container>
    );
}

export default Auditoriums;
