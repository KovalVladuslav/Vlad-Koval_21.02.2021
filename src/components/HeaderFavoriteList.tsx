import React, { useEffect, useState } from 'react'

import Accordion from 'react-bootstrap/Accordion'
import { useAccordionToggle } from 'react-bootstrap/AccordionToggle'

import styles from './HeaderFavoriteList.module.scss'
import { IMovie } from '../interface'
import { setInLocalStorage } from '../lib'

type HeaderFavoriteListProps = {
  allMovies: IMovie[]
  setAllMovies(arg: IMovie[]): void
}

const HeaderFavoriteList: React.FC<HeaderFavoriteListProps> = ({ allMovies, setAllMovies}) => {
  const [activeFavoriteMovies, setActiveFavoriteMovies] = useState<IMovie[]>([])

  useEffect(()=> {
    const foundActive = allMovies.filter(movie => movie.active)
    setActiveFavoriteMovies(foundActive)
  },[allMovies])

  const handleDeleteFavoriteFilm = (event: React.MouseEvent, id:number ) => {
    const updateMovie = allMovies.map(movie => {
      if (movie.id === id) {
        setInLocalStorage(movie.name, false)
        return {
          ...movie,
          active: false
        }
      }
      return movie
    })

    setAllMovies(updateMovie)
  }

  return (
    <header className={`${styles.header} d-lg-none`}>
      <Accordion className={styles.accordion}>

        <CustomToggle eventKey="0">Favorite List</CustomToggle>

        <Accordion.Collapse eventKey="0">
          <div className={styles.accordion_list_wrapper}>
            {!!activeFavoriteMovies.length ? (
              activeFavoriteMovies.map(item => (
                item.active && (
                  <div className={styles.accordion_list} key={`${item.name}_favorite-list-header`}>
                    <p>{item.name}</p>
                    <button className={styles.accordion_item_delete}
                            onClick={(event => handleDeleteFavoriteFilm(event, item.id))}/>
                  </div>
                )
              ))
            ) : (
              <p>No item</p>
            )}
          </div>
        </Accordion.Collapse>

      </Accordion>
    </header>
  )
}

type CustomToggleProps = {
  children: any
  eventKey: string
}

const CustomToggle: React.FC<CustomToggleProps> = ({ children, eventKey }) => {
  const decoratedOnClick = useAccordionToggle(eventKey);

  return (
    <button
      onClick={decoratedOnClick}
      className={styles.accordion_button}
    >
      {children}
    </button>
  );
}

export default HeaderFavoriteList