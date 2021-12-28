import { useEffect, useState } from "react"
import { Row, Col } from 'react-bootstrap'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
type Props = {
    places: number
}

export default function PlaceListLoading({ places }: Props) {
    const [placesCards, setPlaceCards] = useState<number[]>([])

    useEffect(() => {
        let array = []
        for (let index = 0; index < places; index++) {
            array.push(index)
        }
        setPlaceCards(array)
    }, [])


    return (
        <Row>
            {
                placesCards && placesCards.map(placesCard => {
                    return <Col md={6} key={placesCard} className="pr-5 pb-4 pl-5">
                            <Skeleton height={30} width={"70%"}/>
                            <Skeleton height={20} width={"30%"}/>
                        </Col>
                    
                })
            }
        </Row>
    )
}
