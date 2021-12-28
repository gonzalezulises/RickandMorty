import type { NextPage } from 'next'
import { Row, Col } from 'react-bootstrap'
import CharactersFavList from '../components/CharactersFavList'
import EpisodesFavList from '../components/EpisodesFavList'
import Layout from '../components/Layout/Layout'
import LocationsFavList from '../components/LocationsFavList'
import styled from 'styled-components'

const FavTitle = styled.h4`
    background-color:#866EC7;
    color:white;
    display:inline-block;
    padding-left:0.75em;
    padding-right:0.75em;
    
`


const Home: NextPage = () => {

  return (
    <Layout>
      <h3 className='mb-5'>Bienvenido a la wiki de Rick {"&"} Morty</h3>


      <Row>
        <Col md={6}>
          <FavTitle className='mb-4'>Personajes favoritos</FavTitle>
          <CharactersFavList />
        </Col>
        <Col md={6}>
          <FavTitle className='mb-4'>Episodios favoritos</FavTitle>
            <EpisodesFavList/>
          <FavTitle className='mb-4'>Lugres favoritos</FavTitle>
            <LocationsFavList/>
        </Col>
      </Row>

    </Layout>
  )
}

export default Home
