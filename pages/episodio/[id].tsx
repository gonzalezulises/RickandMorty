import { useState, useEffect } from 'react'
import Layout from "../../components/Layout/Layout";
import { useRouter } from 'next/router'
import styled from 'styled-components'
import EpisodiosService from '../../services/EpisodiosService'
import IEpisode from '../../Interfaces/IEpisode'
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

export default function Episodio() {
    const [episodio, setEpisodio] = useState<IEpisode>()
    const router = useRouter()

    useEffect(() => {
        const { id } = router.query;
        if (id) {
            getEpisodio(id);
        }
    }, [router.query.id])

    const getEpisodio = async (id: any) => {
        const resp = await EpisodiosService.get(id);
        setEpisodio(resp);
    }

    return (
        <Layout>
            <p>Episodio {'>'} {episodio?.episode} - {episodio?.name }</p>
            <h1 className='text-center mb-4'>
                <span style={{color:'gray', fontSize:"0.7em", verticalAlign:'middle'}}>
                    <LikedIcon item={episodio} type="episodes"/>
                </span>
            {episodio?.episode} - {episodio?.name}</h1>
            {
                episodio && <>
                    <Row className="justify-content-md-center">
                        <Col md={'auto'} className="mt-md-3 mt-3">
                            <Atribute name='Fecha de emisión' value={episodio.air_date}/>
                        </Col>
                    </Row>
                    <Sutitle>Personajes</Sutitle>
                    <Row className="px-xl-5 mx-xl-5">
                            {
                                episodio.characters.map(character=>{
                                    return <>
                                        <Col xl={4} lg={6} className="mt-md-3 mt-3" key={character}>
                                            <Character personaje={ parseInt(character.replace('https://rickandmortyapi.com/api/character/',''))}/>
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
