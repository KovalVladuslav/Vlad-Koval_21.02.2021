import React, { useState } from 'react'

import ModalMovieCard from './ModalMovieCard'
import ButtonStar from './ButtonStar'

import { IMovie } from '../interface'

import styles from './MoviesGallery.module.scss'

interface IMoviesGalleryProps  {
  allMovies: IMovie[]
  setAllMovies(arg:IMovie[]): void
  filterGenre: string
  filterMovie: any
}

const MoviesGallery: React.FC<IMoviesGalleryProps> = ({ allMovies , setAllMovies, filterGenre, filterMovie}) => {
  const [isShowModal, setIsShowModal] = useState<boolean>(false)
  const [currentShowMovie, setCurrentShowMovie] = useState<Partial<IMovie>>({})

  const handleOpenModal = (id: number): void => {
    const foundMovieFromId = allMovies.find(movie => movie.id === id) as IMovie

    setCurrentShowMovie(foundMovieFromId)
    setIsShowModal(true)
  }

  return (
    <main className={styles.wrapper}>
      <h2>Movies Gallery</h2>
      <div className={styles.movie_block}>
        {filterMovie(allMovies, filterGenre).map((movie: IMovie) => (
          <div className={styles.movie_card} key={movie.id} role='button' tabIndex={0}
               onClick={() => handleOpenModal(movie.id)}>
            <ButtonStar setAllMovies={setAllMovies} active={movie.active} id={movie.id} allMovies={allMovies} position={'absolute'}/>
            <img src={movie.img} alt={movie.name}/>
            <p>{movie.name}</p>
            <span>{movie.year}</span>
          </div>
        ))}
      </div>
      <ModalMovieCard
        allMovies={allMovies}
        setAllMovies={setAllMovies}
        isShowModal={isShowModal}
        setIsShowModal={setIsShowModal}
        currentShowMovie={currentShowMovie}
      />
    </main>
  )
}

export default MoviesGallery