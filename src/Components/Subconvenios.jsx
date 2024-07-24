import React, { useState, useEffect } from 'react';
import { Card, Container } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';

function Subconvenios() {
    const { convenioId } = useParams();
    const [subconvenios, setSubconvenios] = useState([]);

    useEffect(() => {
        // Fetch subconvenios data from WordPress API
        fetch(`/wp-json/wp/v2/subconvenios?parent=${convenioId}`)
            .then(response => response.json())
            .then(data => setSubconvenios(data))
            .catch(error => console.error('Error fetching subconvenios:', error));
    }, [convenioId]);

    return (
        <Container>
            <h1>Subconvênios</h1>
            {subconvenios.map(subconvenio => (
                <Card key={subconvenio.id} className="my-3">
                    <Card.Body>
                        <Card.Title>{subconvenio.title.rendered}</Card.Title>
                        <Card.Text>{subconvenio.content.rendered}</Card.Text>
                        <Link to={`/detalhes/${subconvenio.id}`}>Ver Detalhes</Link>
                    </Card.Body>
                </Card>
            ))}
        </Container>
    );
}

export default Subconvenios;
