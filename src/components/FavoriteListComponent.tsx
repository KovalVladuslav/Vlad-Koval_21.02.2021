import React from 'react'

import { IMovie } from '../interface'
import { setInLocalStorage } from '../lib'

import styles from './FavoriteListComponent.module.scss'

type FavoriteListComponentProps = {
  allMovies: IMovie[]
  setAllMovies(arg: IMovie[]): void
  filterGenre: string
  filterMovie: any
}

const FavoriteListComponent: React.FC<FavoriteListComponentProps> = ({ allMovies , setAllMovies, filterGenre, filterMovie}) => {
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
    <aside className={`${styles.wrapper} d-none d-lg-block`}>
      <h3>Favorite List</h3>
      {filterMovie(allMovies, filterGenre).map((item:IMovie) => (
        item.active && (
          <div className={styles.favorite_item}>
            <p key={`${item.name}_favorite-list`}>{item.name}</p>
            <button className={styles.favorite_item_delete} onClick={(event => handleDeleteFavoriteFilm(event, item.id))}/>
          </div>
        )
      ))}
    </aside>
  )
}

export default FavoriteListComponent
