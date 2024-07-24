import React, { useState, useEffect } from 'react';
import { Card, Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

function Detalhes() {
  const { subconvenioId } = useParams();
  const [detalhes, setDetalhes] = useState({});

  useEffect(() => {
    // Fetch detalhes data from WordPress API
    fetch(`/wp-json/wp/v2/detalhes?subconvenio=${subconvenioId}`)
      .then(response => response.json())
      .then(data => setDetalhes(data[0]))
      .catch(error => console.error('Error fetching detalhes:', error));
  }, [subconvenioId]);

  return (
    <Container>
      <h1>Detalhes do Convênio</h1>
      <Card className="my-3">
        <Card.Body>
          <Card.Title>{detalhes.title?.rendered}</Card.Title>
          <Card.Text>{detalhes.content?.rendered}</Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Detalhes;
