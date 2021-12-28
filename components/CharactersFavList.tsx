import { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap'
import Link from 'next/link'
import Character from '../components/Character'
import { useFavs } from '../context/FavContext'

import Pagination from '../components/Pagination'


export default function CharactersFavList() {
    const caculePages = () => {
        console.log('calcule', characters)
        return Math.ceil(characters.length / 10) | 0
    }

    const { characters } = useFavs();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pagesCount, setPagesCount] = useState<number>(0);


    useEffect(() => {
        if(currentPage>1)
            if(currentPage > pagesCount){
                setCurrentPage(pagesCount)
            }
    }, [pagesCount])
    useEffect(() => {
        console.log('useEffect characters', characters)
        setPagesCount(caculePages())
    }, [characters])


    if (characters.length == 0) {
        return <p>Aun no cuentas con personajes favoritos. Ve a la seccion <Link href={"/personajes"}><a href="/personajes">Personajes</a></Link> para agregar algunos</p>
    }

    return (
        <>
            <Row>
                {
                    characters.map(((character, index) => {
                        if (index + 1 > (currentPage - 1) * 10 && index < currentPage * 10)
                            return <Col md={12} lg={12} xl={6} key={character.id}>
                                <Character personaje={character} />
                            </Col>
                    }))
                }

            </Row>
            <Pagination
                currentPage={currentPage}
                pagesCount={pagesCount}
                handleChangePage={(page: number) => setCurrentPage(page)}
                disabled={false}
            />

        </>

    )
}
