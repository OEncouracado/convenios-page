import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Form, Spinner, Alert } from 'react-bootstrap';

const PlanosPage = () => {
    const [planos, setPlanos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [editedPlanos, setEditedPlanos] = useState({});
    const [newConvenio, setNewConvenio] = useState('');

    // Função para obter o token JWT
    const getJwtToken = async () => {
        const response = await axios.post('/wp-json/jwt-auth/v1/token', {
            username: 'emcor',
            password: 'Emcor@@2024'
        });
        return response.data.token;
    };

    // Adicione um interceptor para incluir o token JWT em todas as requisições
    axios.interceptors.request.use(async config => {
        const token = localStorage.getItem('jwtToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }, error => {
        return Promise.reject(error);
    });

    // Quando iniciar a aplicação, obtenha e armazene o token JWT
    useEffect(() => {
        const initialize = async () => {
            const token = await getJwtToken();
            localStorage.setItem('jwtToken', token);
        };
        initialize();
    }, []);

    useEffect(() => {
        const fetchAllData = async (endpoint, setter) => {
            let page = 1;
            let allData = [];
            let fetchData;
            do {
                fetchData = await axios.get(`/wp-json/wp/v2/${endpoint}?per_page=100&page=${page}`);
                allData = [...allData, ...fetchData.data];
                page++;
            } while (fetchData.data.length === 100);
            setter(allData);
        };

        const fetchData = async () => {
            try {
                await fetchAllData('planos', setPlanos);
            } catch (error) {
                setError(`Failed to fetch data: ${error.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleEditChange = (id, field, value) => {
        setEditedPlanos(prev => ({
            ...prev,
            [id]: {
                ...prev[id],
                [field]: value
            }
        }));
    };

    const handleSaveChanges = async () => {
        try {
            await Promise.all(Object.keys(editedPlanos).map(id =>
                axios.post(`/wp-json/wp/v2/planos/${id}`, editedPlanos[id], {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
                    }
                })
            ));
            setPlanos(prev => prev.map(plan =>
                editedPlanos[plan.id] ? { ...plan, ...editedPlanos[plan.id] } : plan
            ));
            setEditMode(false);
            setEditedPlanos({});
        } catch (error) {
            setError(`Failed to save changes: ${error.message}`);
        }
    };

    const handleBulkConvenioChange = (e) => {
        const value = e.target.value;
        setNewConvenio(value);
        setEditedPlanos(prev => {
            const updatedPlanos = {};
            planos.forEach(plan => {
                updatedPlanos[plan.id] = {
                    ...prev[plan.id],
                    acf: {
                        ...plan.acf,
                        convenio: value
                    }
                };
            });
            return updatedPlanos;
        });
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/wp-json/wp/v2/planos/${id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
                }
            });
            setPlanos(prev => prev.filter(plan => plan.id !== id));
        } catch (error) {
            setError(`Failed to delete plan: ${error.message}`);
        }
    };

    const renderBooleanField = (id, field, value) => (
        <Form.Check
            type="checkbox"
            checked={value}
            onChange={e => handleEditChange(id, field, e.target.checked)}
        />
    );

    return (
        <div className="container mt-4">
            {loading ? (
                <Spinner animation="border" />
            ) : error ? (
                <Alert variant="danger">{error}</Alert>
            ) : (
                <>
                    <Button
                        variant="primary"
                        onClick={() => setEditMode(!editMode)}
                        className="mb-3"
                    >
                        {editMode ? 'Cancel' : 'Edit'}
                    </Button>
                    {editMode && (
                        <Button
                            variant="success"
                            onClick={handleSaveChanges}
                            className="mb-3"
                        >
                            Save Changes
                        </Button>
                    )}
                    {editMode && (
                        <Form.Group className="mb-3">
                            <Form.Label>Update Convenio for All</Form.Label>
                            <Form.Control
                                type="text"
                                value={newConvenio}
                                onChange={handleBulkConvenioChange}
                                placeholder="Enter new convenio"
                            />
                        </Form.Group>
                    )}
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Slug</th>
                                <th>Link</th>
                                <th>Content</th>
                                <th>Ambulatorio Consultas</th>
                                <th>Ambulatorio Exames</th>
                                <th>Pronto Socorro</th>
                                <th>Convenio</th>
                                {editMode && <th>Actions</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {planos.map(plan => (
                                <tr key={plan.id}>
                                    <td>
                                        {editMode ? (
                                            <Form.Control
                                                type="text"
                                                value={editedPlanos[plan.id]?.title || plan.title.rendered}
                                                onChange={e => handleEditChange(plan.id, 'title', e.target.value)}
                                            />
                                        ) : (
                                            plan.title.rendered
                                        )}
                                    </td>
                                    <td>
                                        {editMode ? (
                                            <Form.Control
                                                type="text"
                                                value={editedPlanos[plan.id]?.slug || plan.slug}
                                                onChange={e => handleEditChange(plan.id, 'slug', e.target.value)}
                                            />
                                        ) : (
                                            plan.slug
                                        )}
                                    </td>
                                    <td>
                                        <a href={plan.link} target="_blank" rel="noopener noreferrer">
                                            {plan.link}
                                        </a>
                                    </td>
                                    <td>
                                        {editMode ? (
                                            <Form.Control
                                                as="textarea"
                                                value={editedPlanos[plan.id]?.content || plan.content.rendered}
                                                onChange={e => handleEditChange(plan.id, 'content', e.target.value)}
                                            />
                                        ) : (
                                            plan.content.rendered
                                        )}
                                    </td>
                                    <td>
                                      {renderBooleanField(plan.id, 'acf.ambulatorio_consultas', plan.acf.ambulatorio.consultas)}
                                  </td>
                                  <td>
                                      {renderBooleanField(plan.id, 'acf.ambulatorio_exames', plan.acf.ambulatorio.exames)}
                                  </td>
                                  <td>
                                      {renderBooleanField(plan.id, 'acf.pronto_socorro', plan.acf.pronto_socorro)}
                                  </td>
                                  <td>
                                      {editMode ? (
                                          <Form.Control
                                              type="text"
                                              value={editedPlanos[plan.id]?.acf?.convenio || plan.acf.convenio}
                                              onChange={e => handleEditChange(plan.id, 'acf.convenio', e.target.value)}
                                          />
                                      ) : (
                                          plan.acf.convenio
                                      )}
                                  </td>
                                  {editMode && (
                                      <td>
                                          <Button variant="danger" onClick={() => handleDelete(plan.id)}>
                                              Delete
                                          </Button>
                                      </td>
                                  )}
                              </tr>
                          ))}
                        </tbody>
                    </Table>
                </>
            )}
        </div>
    );
};

export default PlanosPage;
