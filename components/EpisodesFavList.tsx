import { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap'
import Link from 'next/link'
import Episode from '../components/Episode'
import { useFavs } from '../context/FavContext'
import Pagination from '../components/Pagination'


export default function EpisodesFavList() {
    const caculePages = () => {
        console.log('calcule', episodes)
        return Math.ceil(episodes.length / 10) | 0
    }

    const { episodes } = useFavs();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pagesCount, setPagesCount] = useState<number>(0);

    useEffect(() => {
        if(currentPage>1)
            if(currentPage > pagesCount){
                setCurrentPage(pagesCount)
            }
    }, [pagesCount])

    useEffect(() => {
        setPagesCount(caculePages())
    }, [episodes])


    if (episodes.length == 0) {
        return <p>Aun no cuentas con episodios favoritos. Ve a la seccion <Link href={"/episodios"}><a href="/episodios">Episodios</a></Link> para agregar algunos</p>
    }

    return (
        <>
            <Row>
                {
                    episodes.map(((episode, index) => {
                        if (index + 1 > (currentPage - 1) * 10 && index < currentPage * 10)
                            return <Col md={12} lg={6} key={episode.id} className='mb-1'>
                                <Episode episode={episode}/>
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
