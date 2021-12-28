import { useState, useEffect, ChangeEvent } from 'react'
import styled from 'styled-components'
import { Row, Col, Form, InputGroup } from 'react-bootstrap'
import Layout from "../components/Layout/Layout";
import Pagination from '../components/Pagination'
import ILocation from '../Interfaces/ILocation'
import ILocationFilter from '../Interfaces/ILocationFilter'
import LugaresService from '../services/LugaresService'
import Location from '../components/Location';
import PlaceListLoading from '../components/loadings/PlaceListLoading';

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

export default function Lugares() {
    const [lugares, setLugares] = useState<ILocation[]>([])
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pagesCount, setPagesCount] = useState<number>(3);
    const [loading, setLoading] = useState<boolean>(false);
    const [filters, setFilters] = useState<ILocationFilter>({
        name: "",
        type: "",
        dimension: ""
    });

    useEffect(() => {
        getLugares();

    }, [currentPage, filters])

    const getLugares = async () => {
        setLoading(true)
        const resp = await LugaresService.getAll(currentPage, filters);
        const pages = resp.info ? resp.info.pages : 1;
        if (pages < currentPage)
            setCurrentPage(pages);
        setLugares(resp.results || []);
        setPagesCount(pages);
        setLoading(false)
    }

    const handleFilterInput = (event: React.FormEvent<HTMLInputElement>) => {
        const { value, name } = event.currentTarget;
        if (value === "" || value.length >= 3)
            setFilters({ ...filters, [name]: value });
    }

    return (
        <Layout>
            <h3 className='mb-4'>Lugares</h3>
            <div className="px-5 mb-3">
                <Row  >
                    <Col xl={4} lg={12} className='mb-2'>
                        <Label>Nombre</Label>
                        <Form.Control type="text" className="form-control" placeholder=' &#xF002; Escriba aqui para filtrar por nombre' name="name" onChange={(e: any) => handleFilterInput(e)} />
                    </Col>
                    <Col xl={4} className='mb-2'>
                        <Label>Tipo de lugar</Label>
                        <Form.Control type="text" className="form-control" placeholder=' &#xF002; Escriba aqui para filtrar por tipo de lugar' name="type" onChange={(e: any) => handleFilterInput(e)} />
                    </Col>
                    <Col xl={4} lg={12} className='mb-2'>
                        <Label>Dimensión</Label>
                        <Form.Control type="text" className="form-control" placeholder=' &#xF002; Escriba aqui para filtrar por nomnbre de dimensión' name="dimension" onChange={(e: any) => handleFilterInput(e)} />
                    </Col>
                </Row>
            </div>

            {
                loading ? <div className="ml-4 py-4">
                    <PlaceListLoading places={20} />
                </div>
                    :
                    <Row className="px-5 py-4">
                        <Col md={6}>
                            {
                                lugares.map((locations, index) => {
                                    if (index < 10)
                                        return (
                                            <Col md={12} key={locations.id}>
                                                <Location location={locations} />
                                            </Col>
                                        )

                                })
                            }
                        </Col>
                        <Col md={6}>
                            {
                                lugares.map((locations, index) => {
                                    if (index >= 10)
                                        return (
                                            <Col md={12} key={locations.id}>
                                                <Location location={locations} />
                                            </Col>
                                        )

                                })
                            }
                        </Col>
                    </Row>
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
