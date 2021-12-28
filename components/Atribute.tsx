import { Row, Col } from "react-bootstrap";
import styled from 'styled-components'

type Props = {
    name: string,
    value: string,
};


const AttributeTitle = styled.p`
    padding:0px 5px;
    font-weight:bold;
    color:#000;
    margin-bottom:0;
`
const AttributeValue = styled.p`
    padding:5px;
    margin-bottom:5px;
`
export default function Atribute({name, value}:Props) {
    /* return (
        <Row>
            <Col xs={6}>
                <AttributeTitle>
                    {name}
                </AttributeTitle>
            </Col>
            <Col xs={6}>
                <AttributeValue>
                    {value || "Desconcido"}
                </AttributeValue>
            </Col>
        </Row>
    )
    */
   return ( 
        <>
            <AttributeTitle>{name}</AttributeTitle>
            <AttributeValue>{value || "Desconocido"}</AttributeValue>
        </>
   )
}
