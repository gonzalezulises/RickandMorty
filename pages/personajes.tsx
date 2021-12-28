import { useState, useEffect } from 'react'
import styled from 'styled-components'
import Character from '../components/Character';
import Layout from "../components/Layout/Layout";
import PersonajesService from '../services/PersonajesService'
import { Row, Col, Form } from 'react-bootstrap'
import ICharacter from '../Interfaces/ICharacter'
import Pagination from '../components/Pagination'
import CharacterCardListLoading from '../components/loadings/CharacterCardListLoading';

const CardFilter = styled.div`
    background-color:white;
    border-radius:5px;
    padding: 0.5em 1em;
    border: solid 1px #ddd;    
    margin-bottom: 1em;
`

const Label = styled.label`
    margin-bottom:0;
    color: #999;
`

export default function Personajes() {
    const [personajes, setPersonajes] = useState<ICharacter[]>([])
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pagesCount, setPagesCount] = useState<number>(3);
    const [loading, setLoading] = useState<boolean>(false);
    const [filters, setFilters] = useState({
        name: "",
        species: "",
        type: "",
        status: "",
        gender: ""
    });

    useEffect(() => {
        getPersonajes();

        console.log("efect", filters);

    }, [currentPage, filters])

    const getPersonajes = async () => {
        setLoading(true)
        const resp = await PersonajesService.getAll(currentPage, filters);
        const pages = resp.info ? resp.info.pages : 1;
        if (pages < currentPage)
            setCurrentPage(pages);
        setPersonajes(resp.results || []);
        setPagesCount(pages);
        setLoading(false)
    }

    const handleFilterInput = (event: React.FormEvent<HTMLInputElement>) => {
        const { value, name } = event.currentTarget;
        if (value === "" || value.length >= 3)
            setFilters({ ...filters, [name]: value });
    }
    const handleFilterSelect = (event: React.FormEvent<HTMLSelectElement>) => {
        const { value, name } = event.currentTarget;
        setFilters({ ...filters, [name]: value });
    }

    return (
        <Layout>
            <h3 className='mb-4'>Personajes</h3>
            <div className="px-5 mb-3">
                <Row>
                    <Col xl={4} lg={12} className='mb-2'>
                        <Label>Nombre</Label>
                        <Form.Control type="text" className="form-control" placeholder=' &#xF002; Escriba aqui para filtrar por nombre' name="name" onChange={(e: any) => handleFilterInput(e)} />
                    </Col>
                    <Col xl={4} lg={6} className='mb-2'>
                        <Label>Especie</Label>
                        <Form.Control type="text" className="form-control" placeholder=' &#xF002; Escriba aqui para filtrar por especie' name="species" onChange={(e: any) => handleFilterInput(e)} />
                    </Col>
                    <Col xl={4} lg={6} className='mb-2'>
                        <Label>Tipo</Label>
                        <Form.Control type="text" className="form-control" placeholder=' &#xF002; Escriba aqui para filtrar por tipo' name="type" onChange={(e: any) => handleFilterInput(e)} />
                    </Col>
                </Row>
                <Row>
                    <Col xl={4} lg={6} className='mb-2'>
                        <Label>Estado</Label>
                        <Form.Select className='form-control' name="status" onChange={(e) => handleFilterSelect(e)} value={filters.status}>
                            <option value=''>Todos</option>
                            <option value="alive">Vivo/a</option>
                            <option value="dead">Muerto/a</option>
                            <option value="unknown">Desconocido</option>
                        </Form.Select>
                    </Col>
                    <Col xl={4} lg={6} className='mb-2'>
                        <Label>Genero</Label>
                        <Form.Select className='form-control' name="gender" onChange={(e) => handleFilterSelect(e)} value={filters.gender}>
                            <option value=''>Todos</option>
                            <option value="female">Mujer</option>
                            <option value="male">Hombre</option>
                            <option value="genderless">Sin genero</option>
                            <option value="unknown">Desconcido</option>
                        </Form.Select>
                    </Col>
                </Row>
            </div>
            {
                !loading ?
                    <Row className="px-5 py-4">
                        
                        {
                            personajes.map(personaje => {
                                return (
                                    <Col md={6} key={personaje.id}>
                                        <Character personaje={personaje} />
                                    </Col>
                                )

                            })
                        }
                    </Row>
                :
                <div className="px-5 py-4">
                    <CharacterCardListLoading characters={20}/>
                </div>
            }
            <Pagination
                currentPage={currentPage}
                pagesCount={pagesCount}
                handleChangePage={(page: number) => setCurrentPage(page)}
                disabled={loading}
            />
        </Layout>
    )
}
