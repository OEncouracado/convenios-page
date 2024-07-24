import React, { useState, useEffect } from 'react';
import { Card, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Convenios() {
    const [convenios, setConvenios] = useState([]);

    useEffect(() => {
        // Fetch convenios data from WordPress API
        fetch('/wp-json/wp/v2/convenios')
            .then(response => response.json())
            .then(data => setConvenios(data))
            .catch(error => console.error('Error fetching convenios:', error));
    }, []);

    return (
        <Container>
            <h1>Convênios</h1>
            {convenios.map(convenio => (
                <Card key={convenio.id} className="my-3">
                    <Card.Body>
                        <Card.Title>{convenio.title.rendered}</Card.Title>
                        <Card.Text>{convenio.content.rendered}</Card.Text>
                        <Link to={`/subconvenios/${convenio.id}`}>Ver Subconvênios</Link>
                    </Card.Body>
                </Card>
            ))}
        </Container>
    );
}

export default Convenios;
