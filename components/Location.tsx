import styled from 'styled-components'
import {Row, Col } from 'react-bootstrap'
import Link from 'next/link'
import ILocation from '../Interfaces/ILocation'
import LikedIcon from './LikedIcon'
import Atribute from './Atribute';

type Props = {
    location: ILocation
};

const LocationName = styled.a`
    font-weight:bold;
    line-height:1;
    margin:0px 5px;
    font-size:1.5em;
    color:#000;
    display:inline-block;
`

const LocationCard = styled.div`
`

export default function Location({ location }: Props) {
    const unknowText = "Desconocido";
    return (
        <LocationCard className='d-flex mb-3'>
            <div className='d-flex justify-content-between py-2 px-3'>
                <LikedIcon item={location} type="locations"/>
                <div>
                    <Link href={`/lugar/${location.id}`}>
                        <LocationName href="#">{location.type} {location.name}</LocationName>
                    </Link>
                    <p>{location.dimension ==='unknown' ? 'Unknown Dimension' : location.dimension}</p>
                </div>
                
            </div>

        </LocationCard>
    )
}
