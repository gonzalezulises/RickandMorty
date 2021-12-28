import { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap'
import Link from 'next/link'
import Location from '../components/Location'
import { useFavs } from '../context/FavContext'
import Pagination from '../components/Pagination'


export default function LocationsFavList() {
    const caculePages = () => {
        return Math.ceil(locations.length / 10) | 0
    }

    const { locations } = useFavs();
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
    }, [locations])


    if (locations.length == 0) {
        return <p>Aun no cuentas con lugares favoritos. Ve a la seccion <Link href={"/lugares"}><a href="/lugares">Lugares</a></Link> para agregar algunos</p>
    }
  
    return (
        <>
            <Row>
                {
                    locations.map(((location, index) => {
                        if (index + 1 > (currentPage - 1) * 10 && index < currentPage * 10)
                            return <Col md={12} lg={6} key={location.id}>
                                <Location location={location}/>
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
