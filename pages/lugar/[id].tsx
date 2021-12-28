import { useState, useEffect } from 'react'
import Layout from "../../components/Layout/Layout";
import { useRouter } from 'next/router'
import styled from 'styled-components'
import LugaresService from '../../services/LugaresService'
import ILocation from '../../Interfaces/ILocation'
import { Col, Row } from 'react-bootstrap';
import Atribute from '../../components/Atribute';
import Character from '../../components/Character';
import LikedIcon from '../../components/LikedIcon';

const Sutitle = styled.p`
    padding:0px 5px;
    font-weight:bold;
    color:#000;
    text-align:center;
    margin-top:1em;
    margin-bottom:0;
`

export default function Lugar() {
    const [lugar, setLugar] = useState<ILocation>()
    const router = useRouter()

    useEffect(() => {
        const { id } = router.query;
        if (id) {
            getLugar(id);
        }
    }, [router.query.id])

    const getLugar = async (id: any) => {
        const resp = await LugaresService.get(id);
        setLugar(resp);
    }

    return (
        <Layout>
            <p>Lugar {'>'} {lugar?.type} - {lugar?.name }</p>
            <h1 className='text-center mb-4'>
                <span style={{color:'gray', fontSize:"0.7em", verticalAlign:'middle'}}>
                    <LikedIcon item={lugar} type="locations"/> 
                </span>
            {lugar?.type} - {lugar?.name}</h1>
            {
                lugar && <>
                        <div className="text-center">
                            <Atribute name='Tipo' value={lugar.type}/>
                        </div>
                        <div className="text-center">
                            <Atribute name='Dimensión' value={lugar.dimension}/>
                        </div>
                    <Sutitle>Personajes Residentes</Sutitle>
                    <Row className="px-xl-5 mx-xl-5">
                            {
                                lugar.residents.map(resident=>{
                                    return <>
                                        <Col xl={4} lg={6} className="mt-md-3 mt-3" key={resident}>
                                            <Character personaje={ parseInt(resident.replace('https://rickandmortyapi.com/api/character/',''))}/>
                                        </Col>
                                    </>
                                })
                            }
                    </Row>
                </>
            }
        </Layout>
    )
}
