import {useState, useEffect } from 'react'
import styled from 'styled-components'
import Character from '../Interfaces/ICharacter'
import { useFavs } from '../context/FavContext'
import IEpisode from '../Interfaces/IEpisode'
import ILocation from '../Interfaces/ILocation'

type Props = {
    item?: Character | IEpisode | ILocation
    type: "characters" | "episodes" | "locations"
}

const LikedIconI = styled.i`
    cursor:pointer;
`

export default function({item, type}:Props) {
    const { toggleItemFav, itemInArray  } = useFavs();
    const [liked, setLiked] = useState(false)
    const clickHandler = () =>{
        if(item)
            setLiked(toggleItemFav(item,type))
    }
    
    useEffect(() => {
        if(item)
            setLiked(itemInArray(item.id, type)? true : false)
    }, [item])

    return (
        <LikedIconI className="fa fa-heart" style={{'color': liked?'red':""}} onClick={clickHandler}>
        </LikedIconI>
    )
}
