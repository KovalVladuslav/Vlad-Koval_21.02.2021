import React, { useState } from 'react'

import { setInLocalStorage } from '../lib'

import { IMovie } from '../interface'

import styles from './ButtonStar.module.scss'

interface IButtonStarProps {
  setAllMovies(arg:IMovie[]): void
  active?: boolean
  id?: number
  allMovies: IMovie[]
  position?: string
  modal?: boolean
}

const ButtonStar: React.FC<IButtonStarProps> = ({ setAllMovies, active, id, allMovies, position, modal}) => {
  const [activeModal, setActiveModal] = useState<any>(active)

  const handleFavoriteFilm = (event: React.MouseEvent) => {
    event.stopPropagation()

    if (modal) {
      setActiveModal((prevState:boolean) => setActiveModal(!prevState))
    }

    const updateMovie = allMovies.map(movie => {
      if (movie.id === id) {
        setInLocalStorage(movie.name, !movie.active)
        return {
          ...movie,
          active: !movie.active
        }
      }
      return movie
    })

    setAllMovies(updateMovie)
  }

  return (
    <>
      {modal ? (
        <button
          className={`${styles.star} ${activeModal? styles.star_active : styles.star_inactive} ${position === 'absolute'? styles.star_absolute : ''}`}
          onClick={handleFavoriteFilm}
        />
      ) : (
        <button
          className={`${styles.star} ${active? styles.star_active : styles.star_inactive} ${position === 'absolute'? styles.star_absolute : ''}`}
          onClick={handleFavoriteFilm}
        />
      )}
    </>
  )
}

export default ButtonStar
