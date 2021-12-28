import { useEffect, useState } from "react"
import { Row, Col } from 'react-bootstrap'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
type Props = {
    epidodes: number
}


export default function EpisodeListLoading({ epidodes }: Props) {
    const [epidosesCards, setEpidoseCards] = useState<number[]>([])

    useEffect(() => {
        let array = []
        for (let index = 0; index < epidodes; index++) {
            array.push(index)
        }
        setEpidoseCards(array)
    }, [])


    return (
        <Row>
            {
                epidosesCards && epidosesCards.map(epidosesCard => {
                    return <Col md={6} key={epidosesCard} className="pr-5 pb-4">
                            <Skeleton height={30}/>
                        </Col>
                    
                })
            }
        </Row>
    )
}
