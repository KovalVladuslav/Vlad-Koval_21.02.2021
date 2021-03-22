import React from 'react'

import { IMovie } from '../interface'
import { setInLocalStorage } from '../lib'

import styles from './FavoriteListComponent.module.scss'

type FavoriteListComponentProps = {
  allMovies: IMovie[]
  setAllMovies(arg: IMovie[]): void
}

const FavoriteListComponent: React.FC<FavoriteListComponentProps> = ({ allMovies , setAllMovies}) => {
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
      {allMovies.map((item:IMovie) => (
        item.active && (
          <div className={styles.favorite_item} key={`${item.name}_favorite-list`}>
            <p>{item.name}</p>
            <button className={styles.favorite_item_delete} onClick={(event => handleDeleteFavoriteFilm(event, item.id))}/>
          </div>
        )
      ))}
    </aside>
  )
}

export default FavoriteListComponent
