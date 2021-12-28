import {useState, useEffect} from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import IEpisode from '../Interfaces/IEpisode'
import LikedIcon from './LikedIcon'
import EpisodiosService from '../services/EpisodiosService'

type Props = {
    episode: IEpisode  | number
};

const EpisodeName = styled.a`
    font-weight:bold;
    line-height:1;
    margin:0px 5px;
    font-size:1.5em;
    color:#000;
    display:inline-block;
`

const EpisodeCard = styled.div`
`

export default function Episode({ episode }: Props) {
    const [episodio, setEpisodio] = useState<IEpisode>()
    const unknowText = "Desconocido";

    useEffect(() => {
        
        if (typeof episode == 'number') {
            getEpisode(episode);
        } else if(episode){
            setEpisodio(episode);
        }
    }, [episode]);

    const getEpisode = async (episodeId: number) => {
        const resp = await EpisodiosService.get(episodeId);
        setEpisodio(resp);
    }

    return (<>
        {
            episodio &&   
                <EpisodeCard className='d-flex mb-3'>
                    <div className='d-flex justify-content-between py-2 px-3'>
                        <LikedIcon item={episodio} type="episodes"/>
                        <Link href={`/episodio/${episodio.id}`}>
                            <EpisodeName href="#">{episodio.episode} - {episodio.name}</EpisodeName>
                        </Link>
                    </div>

                </EpisodeCard>
        }
    </>)
}
