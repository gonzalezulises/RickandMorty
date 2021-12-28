import { useState, useEffect, ChangeEvent } from 'react'
import styled from 'styled-components'
import { Row, Col, Form, InputGroup } from 'react-bootstrap'
import Layout from "../components/Layout/Layout";
import Pagination from '../components/Pagination'
import IEpisode from '../Interfaces/IEpisode'
import EpisodiosService from '../services/EpisodiosService'
import Episode from '../components/Episode';
import EpisodeListLoading from '../components/loadings/EpisodeListLoading';

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

export default function Episodios() {
    const [episodios, setEpisodios] = useState<IEpisode[]>([])
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pagesCount, setPagesCount] = useState<number>(3);
    const [loading, setLoading] = useState<boolean>(false);
    const [filters, setFilters] = useState({
        name: "",
        episode: ""
    });

    useEffect(() => {
        getEpisodios();
    }, [currentPage, filters])

    const getEpisodios = async () => {
        setLoading(true)
        const resp = await EpisodiosService.getAll(currentPage, filters);
        const pages = resp.info ? resp.info.pages : 1;
        if (pages < currentPage)
            setCurrentPage(pages);
        setEpisodios(resp.results || []);
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
            <h3 className='mb-4'>Episodios</h3>
            <div className="px-5 mb-3">
                <Row  >
                    <Col xl={6} lg={6} className='mb-2'>
                        <Label>Episodio</Label>
                        <Form.Control type="text" className="form-control" placeholder=' &#xF002; Escriba aqui para filtrar por número de episodio' name="episode" onChange={(e: any) => handleFilterInput(e)} />
                    </Col>
                    <Col xl={6} lg={12} className='mb-2'>
                        <Label>Nombre</Label>
                        <Form.Control type="text" className="form-control" placeholder=' &#xF002; Escriba aqui para filtrar por nombre' name="name" onChange={(e: any) => handleFilterInput(e)} />
                    </Col>
                </Row>
            </div>
            {
                loading ? <div className="ml-4 py-4">
                    <EpisodeListLoading epidodes={20} />
                </div>
                    :
                    <Row className="px-5 py-4">
                        <Col md={6}>
                            {
                                episodios.map((personaje, index) => {
                                    if (index < 10)
                                        return (
                                            <Col md={12} key={personaje.id}>
                                                <Episode episode={personaje} />
                                            </Col>
                                        )

                                })
                            }
                        </Col>
                        <Col md={6}>
                            {
                                episodios.map((personaje, index) => {
                                    if (index >= 10)
                                        return (
                                            <Col md={12} key={personaje.id}>
                                                <Episode episode={personaje} />
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
