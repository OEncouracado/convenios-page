import React from 'react'
import { Col, Container, Row, Alert, Form } from 'react-bootstrap'

function Homepage() {
    return (
        <Container>
            <Container className='mb-5'>
                <header>
                    <h3>Convênios</h3>
                    <Alert variant='info'>O EMCOR, a fim de oferecer um atendimento de qualidade a todos os pacientes que precisam, dispõe de uma ampla lista de convênios. Cada um dos seguros abaixo listados possui características próprias conforme o tipo de plano escolhido.</Alert>
                </header>
            </Container>
            <Container className='my-5'>
                <Row>
                    <Col md className='my-3'>
                        <Form.Group>
                            <Form.Label>Escolha o Convênio</Form.Label>
                            <Form.Select aria-label="convenios">
                                <option>Open this select menu</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col md className='my-3'>
                        <Form.Group>
                            <Form.Label>Escolha o Plano</Form.Label>
                            <Form.Select aria-label="planos">
                                <option>Open this select menu</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>
            </Container>
            <Container className='mt-5'>
                <footer>
                    <p>Para maiores detalhes quanto a informação de “Cobertura Restrita”, acionar a nossa Central de Atendimento no (21) 3759-8901 ou pelo e-mail: <strong><a href="mailto:atendimento@hospitalemcor.com.br"> atendimento@hospitalemcor.com.br</a></strong>.</p>
                </footer>
            </Container>

        </Container>
    )
}

export default Homepage
