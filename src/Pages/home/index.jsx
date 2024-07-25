import React, { useEffect, useState } from "react";
import axios from "axios";
import { Col, Container, Row, Alert, Form, Table } from "react-bootstrap";
import './Homepage.css'; // Importe o arquivo CSS para os estilos personalizados

function Homepage() {
  const [convenios, setConvenios] = useState([]);
  const [planos, setPlanos] = useState([]);
  const [selectedConvenio, setSelectedConvenio] = useState(null);
  const [filteredPlanos, setFilteredPlanos] = useState([]);
  const [selectedPlano, setSelectedPlano] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const conveniosResponse = await axios.get("/wp-json/wp/v2/convenios", {
          params: {
            limit: 100, // Ajuste conforme necessário
            page: 1
          }
        });
        console.log('convenios :>> ', conveniosResponse.data);
        setConvenios(conveniosResponse.data);

        const planosResponse = await axios.get("/wp-json/wp/v2/planos");
        setPlanos(planosResponse.data);
      } catch (error) {
        setError(`Failed to fetch data: ${error.message}`);
      }
    };

    fetchData();
  }, []);

  const handleConvenioChange = (e) => {
    const selectedId = e.target.value;
    setSelectedConvenio(selectedId);

    const filtered = planos.filter((plano) => {
      return plano.acf.convenio && plano.acf.convenio.includes(parseInt(selectedId));
    });

    setFilteredPlanos(filtered);
  };

  const handlePlanoChange = (e) => {
    const selectedId = e.target.value;
    const selected = planos.find((plano) => plano.id === parseInt(selectedId));
    setSelectedPlano(selected || null);
  };

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
          <Col md className="my-2">
            <Form.Group>
              <Form.Label>Escolha o Convênio</Form.Label>
              <Form.Select
                aria-label="convenios"
                onChange={handleConvenioChange}
                value={selectedConvenio || ""}
              >
                <option value="">Selecione um convênio</option>
                {convenios.map((convenio) => (
                  <option key={convenio.id} value={convenio.id}>
                    {convenio.title.rendered}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md className="my-2">
            <Form.Group>
              <Form.Label>Escolha o Plano</Form.Label>
              <Form.Select
                aria-label="planos"
                onChange={handlePlanoChange}
                value={selectedPlano ? selectedPlano.id : ""}
              >
                <option value="">Selecione um plano</option>
                {filteredPlanos.map((plano) => (
                  <option key={plano.id} value={plano.id}>
                    {plano.title.rendered}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
      </Container>
      {selectedPlano && (
        <Container className="my-5">
          <h4>Cobertura - {selectedPlano.title.rendered}</h4>
          <Container>
            <h5>Ambulatório</h5>
            <Table striped bordered hover className="ambulatorio-table">
              <thead>
                <tr>
                  <th>Categoria</th>
                  <th>Detalhes</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td rowSpan="3">Consulta Especialidades</td>
                  <td className={`text-white ${selectedPlano.acf.cobertura.ambulatorio.consulta_especialidades.angiologia ? "bg-success" : "bg-danger"}`}>
                    <p className="m-0 p-0 ">Angiologia</p>
                  </td>
                </tr>
                <tr>
                  <td className={`text-white ${selectedPlano.acf.cobertura.ambulatorio.consulta_especialidades.cardiologia ? "bg-success" : "bg-danger"}`}>
                    <p className="m-0 p-0 ">Cardiologia</p>
                  </td>
                </tr>
                <tr>
                  <td className={`text-white ${selectedPlano.acf.cobertura.ambulatorio.consulta_especialidades.nutricionista ? "bg-success" : "bg-danger"}`}>
                    <p className="m-0 p-0 ">Nutricionista</p>
                  </td>
                </tr>
                <tr>
                  <td rowSpan="4">Exames</td>
                  <td className={`text-white ${selectedPlano.acf.cobertura.ambulatorio.exames.eletrocardiograma ? "bg-success" : "bg-danger"}`}>
                    <p className="m-0 p-0 ">Eletrocardiograma</p>
                  </td>
                </tr>
                <tr>
                  <td className={`text-white ${selectedPlano.acf.cobertura.ambulatorio.exames.holter ? "bg-success" : "bg-danger"}`}>
                    <p className="m-0 p-0 ">Holter</p>
                  </td>
                </tr>
                <tr>
                  <td className={`text-white ${selectedPlano.acf.cobertura.ambulatorio.exames.mapa ? "bg-success" : "bg-danger"}`}>
                    <p className="m-0 p-0 ">MAPA</p>
                  </td>
                </tr>
                <tr>
                  <td className={`text-white ${selectedPlano.acf.cobertura.ambulatorio.exames.teste_ergometrico ? "bg-success" : "bg-danger"}`}>
                    <p className="m-0 p-0 ">Teste Ergométrico</p>
                  </td>
                </tr>
              </tbody>
            </Table>

            <h5>Pronto Socorro</h5>
            <Table striped bordered hover className="pronto-socorro-table">
              <thead>
                <tr>
                  <th>Categoria</th>
                  <th>Detalhes</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td rowSpan="5">Pronto Socorro</td>
                  <td className={`text-white ${selectedPlano.acf.cobertura.pronto_socorro.consulta ? "bg-success" : "bg-danger"}`}>
                    <p className="m-0 p-0 ">Consulta</p>
                  </td>
                </tr>
                <tr>
                  <td className={`text-white ${selectedPlano.acf.cobertura.pronto_socorro.exames_de_imagem ? "bg-success" : "bg-danger"}`}>
                    <p className="m-0 p-0 ">Exames de Imagem</p>
                  </td>
                </tr>
                <tr>
                  <td className={`text-white ${selectedPlano.acf.cobertura.pronto_socorro.exames_laboratoriais ? "bg-success" : "bg-danger"}`}>
                    <p className="m-0 p-0 ">Exames Laboratoriais</p>
                  </td>
                </tr>
                <tr>
                  <td className={`text-white ${selectedPlano.acf.cobertura.pronto_socorro.internacao ? "bg-success" : "bg-danger"}`}>
                    <p className="m-0 p-0 ">Internação</p>
                  </td>
                </tr>
                <tr>
                  <td className={`text-white ${selectedPlano.acf.cobertura.pronto_socorro.medicacao ? "bg-success" : "bg-danger"}`}>
                    <p className="m-0 p-0 ">Medicação</p>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Container>
        </Container>
      )}
      <Container className="mt-5">
        <footer>
          <Alert variant="info">
            Para maiores detalhes favor acionar a nossa Central de Atendimento no (21) 3759-8901 ou pelo
            e-mail:{" "}
            <a href="mailto:atendimento@hospitalemcor.com.br">
              {" "}
              atendimento@hospitalemcor.com.br
            </a>
            .
          </Alert>
        </footer>
      </Container>
    </Container>
  );
}

export default Homepage;
