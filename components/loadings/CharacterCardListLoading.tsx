import { useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import CharacterCardLoading from './CharacterCardLoading'

type Props = {
    characters: number
}

export default function CharacterCardListLoading({ characters }: Props) {
    const [charactersCards, setCharacterCards] = useState<number[]>([])

    useEffect(() => {
        let array = []
        for (let index = 0; index < characters; index++) {
            array.push(index)
        }
        setCharacterCards(array)
    }, [])

    return (
        <Row>
            {
                charactersCards && charactersCards.map(characterCard => {
                    return <Col md={6} key={characterCard}><CharacterCardLoading/></Col>
                })
            }
        </Row>
    )
}
