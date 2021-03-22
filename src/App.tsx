import React, { useEffect, useState } from 'react'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'

import MoviesGallery from './components/MoviesGallery'
import FavoriteListComponent from './components/FavoriteListComponent'
import HeaderFavoriteList from './components/HeaderFavoriteList'

import { IMovie, ILocalStorageFavorite } from './interface'

import { mergeMovies, getAllGenres } from './lib'

import './App.scss'

const App: React.FC = () => {
  const [allMovies, setAllMovies] = useState<IMovie[]>([])
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [genres, setGenres] = useState<any>([])
  const [filterGenre, setFilterGenre] = useState<string>('')

  useEffect(()=> {
    const url = 'https://my-json-server.typicode.com/moviedb-tech/movies/list'
    const saved = JSON.parse(localStorage.getItem('favoriteList') || '{}') as ILocalStorageFavorite

    const emptySaved = !(Object.keys(saved).length)

    fetch(url)
      .then(res => res.json())
      .then(data => {
        const foundGenres = getAllGenres(data)
        setGenres(foundGenres)

        if (!emptySaved) {
          const processingData = mergeMovies(data, saved)
          setAllMovies(processingData)
        } else {
          setAllMovies(data)
        }
      })
      .catch(() => setErrorMessage('Something went wrong'))
  }, [])

  const filterMovie = (movie:IMovie[], genre:string) => {
    if (!genre) {
      return movie
    } else {
      return movie.filter(movie => movie.genres.find(item => item === genre))
    }
  }

  return (
    <Container className='position-relative'>
      <Row>
        <HeaderFavoriteList allMovies={allMovies} setAllMovies={setAllMovies}/>
        <Col lg={9} xl={10}>
          {!!allMovies.length ? (
            <>
              <DropdownButton
                variant="outline-light"
                title={`${filterGenre ? filterGenre : 'Select genres'}`}
                className='mb-3 mt-3'
                size="lg"
              >
                {filterGenre && (
                  <Dropdown.Item onClick={()=>setFilterGenre('')}>All genres</Dropdown.Item>
                )}
                {genres.map((genre:string) => (
                  <Dropdown.Item onClick={()=>setFilterGenre(genre)} key={genre}>{genre}</Dropdown.Item>
                ))}
              </DropdownButton>

              <MoviesGallery allMovies={allMovies} setAllMovies={setAllMovies} filterGenre={filterGenre} filterMovie={filterMovie}/>
            </>
          ) : (
            <p className='text-center'>Loading...</p>
          )}
        </Col>
        <Col lg={3} xl={2} className='position-static'>
          <FavoriteListComponent allMovies={allMovies} filterMovie={filterMovie} filterGenre={filterGenre} setAllMovies={setAllMovies}/>
        </Col>
      </Row>
    </Container>
  );
};

export default App
