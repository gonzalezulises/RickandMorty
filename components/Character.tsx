import { useState, useEffect } from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import Link from 'next/link'
import ICharacter from '../Interfaces/ICharacter'
import LikedIcon from './LikedIcon'
import PersonajesService from '../services/PersonajesService'
import CharacterCardLoading from './loadings/CharacterCardLoading'

type Props = {
    personaje: ICharacter | number
};

const CharacterName = styled.p`
    font-weight:bold;
    line-height:1;
    margin-bottom:0px;
    font-size:1.5em;
    color:#000;
`

const CharacterCard = styled.div`
`

export default function Character({ personaje }: Props) {
    const [character, setCharacter] = useState<ICharacter>()

    const unknowText = "Desconocido";

    useEffect(() => {

        if (typeof personaje == 'number') {
            getPersonaje(personaje);
        } else if (personaje) {
            setCharacter(personaje);
        }
    }, [personaje]);

    const getPersonaje = async (personajeId: number) => {
        const resp = await PersonajesService.get(personajeId);
        setCharacter(resp);
    }

    return (<>
        {
            (
                character &&
                <CharacterCard className='d-flex mb-3'>
                    <Image
                        src={character.image}
                        width={150}
                        height={150}
                    />
                    <div className='flex-grow-1 py-2 px-3'>
                        <CharacterName>{character.name}</CharacterName>
                        <p className='mb-3'>{character.species} {character.type ? `| ${character.type}` : ''}</p>
                        <Link href={`/personaje/${character.id}`}><a className='btn btn-outline-primary mb-2'>Ver detalle</a></Link><br />
                        <LikedIcon item={character} type="characters"></LikedIcon>
                    </div>

                </CharacterCard>
            ) 
            ||
            <>
              <CharacterCardLoading></CharacterCardLoading>
            </>
        }

    </>)
}
