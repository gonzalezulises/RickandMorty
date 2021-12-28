import { useState, useEffect } from 'react'
import Layout from "../../components/Layout/Layout";
import { useRouter } from 'next/router'
import Image from 'next/image'
import styled from 'styled-components'
import PersonajesService from '../../services/PersonajesService'
import ICharacter from '../../Interfaces/ICharacter'
import { Col, Row } from 'react-bootstrap';
import Atribute from '../../components/Atribute';
import LikedIcon from '../../components/LikedIcon';
import Episode from '../../components/Episode';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'


const Sutitle = styled.p`
    padding:0px 5px;
    font-weight:bold;
    color:#000;
    text-align:center;
    margin-top:1em;
    margin-bottom:0;
`



export default function Personaje() {
    const [personaje, setPersonaje] = useState<ICharacter>()
    const router = useRouter()

    useEffect(() => {
        const { id } = router.query;
        if (id) {
            getPersonaje(id);
        }
    }, [router.query.id])

    const getPersonaje = async (id: any) => {
        const resp = await PersonajesService.get(id);
        setPersonaje(resp);
    }

    return (
        <Layout>
            <p>Personaje {'>'} {personaje?.name}</p>


            <h1 className='text-center mb-4'>
                {
                    (
                        personaje && <>
                            <span style={{ color: 'gray', fontSize: "0.7em", verticalAlign: 'middle' }}><LikedIcon item={personaje} type="characters" /> </span>
                            {personaje.name}
                        </>
                    )
                    || 
                    <Skeleton width={350} height={35}></Skeleton>

                }
            </h1>
            <Row className="justify-content-md-center">
                <Col md="auto">
                    <div style={{ width: 300, height: 300, position: 'relative' }}>
                        {
                            (
                                personaje &&
                                <Image src={personaje.image}
                                    objectFit="cover"
                                    layout="fill"
                                    alt={`${personaje.name}_image`}
                                />




                            ) ||
                            <Skeleton width={"100%"} height={"100%"}></Skeleton>
                        }
                    </div>
                </Col>
                <Col md={3} className="mt-md-3 mt-3">
                    {
                        (
                            personaje && <>

                                <Atribute name='Estatus' value={personaje.status} />
                                <Atribute name='Genero' value={personaje.gender} />
                                <Atribute name='Tipo' value={personaje.type} />
                                <Atribute name='Created' value={personaje.created} />
                                <Atribute name='origen' value={personaje.origin.name} />
                                <Atribute name='Visto por ultima vez en' value={personaje.location.name} />
                            </>
                        )
                        ||
                        <>
                            <Skeleton width={"30%"}></Skeleton><Skeleton className='mb-4' width={"20%"}></Skeleton>
                            <Skeleton width={"30%"}></Skeleton><Skeleton className='mb-4' width={"20%"}></Skeleton>
                            <Skeleton width={"30%"}></Skeleton><Skeleton className='mb-4' width={"20%"}></Skeleton>
                            <Skeleton width={"30%"}></Skeleton><Skeleton className='mb-4' width={"20%"}></Skeleton>
                            <Skeleton width={"30%"}></Skeleton><Skeleton className='mb-4' width={"20%"}></Skeleton>
                        </>
                    }
                </Col>
            </Row>


            {
                personaje && <>
                    <Sutitle>Episodios donde aparece</Sutitle>
                    <Row>
                        {
                            personaje.episode.map(episode => {
                                return <Col md={{ span: 5, offset: 1 }} key={episode}>
                                    <Episode episode={parseInt(episode.replace('https://rickandmortyapi.com/api/episode/', ''))}></Episode>
                                </Col>
                            })
                        }
                    </Row>
                </>
            }
        </Layout>
    )
}
