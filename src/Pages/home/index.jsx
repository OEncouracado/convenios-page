import React, { useEffect, useState } from "react";
import { Col, Container, Row, Alert, Form } from "react-bootstrap";
import axios from "axios";

function Homepage() {
  const [convenios, setConvenios] = useState([]);
  const [planos, setPlanos] = useState([]);
  const [selectedConvenio, setSelectedConvenio] = useState(null);
  const [filteredPlanos, setFilteredPlanos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch convenios
    axios
      .get("http://hospitalemcor.com.br/novo/wp-json/wp/v2/convenios")
      .then((response) => {
        console.log("Planos response data:", response.data); // Adicione este log
        setConvenios(response.data);
      })
      .catch((error) => {
        setError(`Failed to fetch convenios: ${error.message}`);
      });

    // Fetch planos
    axios
      .get("http://hospitalemcor.com.br/novo/wp-json/wp/v2/planos")
      .then((response) => {
        setPlanos(response.data);
      })
      .catch((error) => {
        setError(`Failed to fetch planos: ${error.message}`);
      });
  }, []);

  //   const handleConvenioChange = (e) => {
  //     const selectedId = e.target.value;
  //     setSelectedConvenio(selectedId);
  //     const filtered = planos.filter((plano) =>
  //       plano.acf.convenio.some((conv) => conv.ID === selectedId)
  //     );
  //     setFilteredPlanos(filtered);
  //   };

  return (
    <Container>
      <Container className="mb-5">
        <header>
          <h3>Convênios</h3>
          <Alert variant="info">
            O EMCOR, a fim de oferecer um atendimento de qualidade a todos os
            pacientes que precisam, dispõe de uma ampla lista de convênios. Cada
            um dos seguros abaixo listados possui características próprias
            conforme o tipo de plano escolhido.
          </Alert>
        </header>
      </Container>
      <Container className="my-5">
        {error && <Alert variant="danger">{error}</Alert>}
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Escolha o Convênio</Form.Label>
              <Form.Select aria-label="convenios"></Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Escolha o Plano</Form.Label>
              <Form.Select aria-label="planos"></Form.Select>
            </Form.Group>
          </Col>
        </Row>
      </Container>
      <Container className="mt-5">
        <footer>
          <p>
            Para maiores detalhes quanto a informação de “Cobertura Restrita”,
            acionar a nossa Central de Atendimento no (21) 3759-8901 ou pelo
            e-mail:{" "}
            <a href="mailto:atendimento@hospitalemcor.com.br">
              {" "}
              atendimento@hospitalemcor.com.br
            </a>
            .
          </p>
        </footer>
      </Container>
    </Container>
  );
}

export default Homepage;
