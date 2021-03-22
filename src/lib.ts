import { IMovie, ILocalStorageFavorite } from './interface'

export const mergeMovies = (movies:IMovie[], favorite:ILocalStorageFavorite) => {
  return movies.map(movie => (
    {
      ...movie,
      active: favorite[movie.name]
    }
  ))
}

export const setInLocalStorage = (name: string, active: boolean) => {
  const saved = JSON.parse(localStorage.getItem('favoriteList') || '{}')

  const emptySaved = !(Object.keys(saved).length)

  if (emptySaved) {
    localStorage.setItem('favoriteList', JSON.stringify({
      [name]: active
    }))
  } else {
    let changedActive = {...saved}
    if (active) {
      changedActive[name] = active
    } else {
      delete changedActive[name]
    }
    localStorage.setItem('favoriteList', JSON.stringify(changedActive))
  }
}

export const getAllGenres = (movies:IMovie[]) => {
  const genres = new Set()

  movies.forEach(movie => {
    movie.genres.forEach(genre => {
      genres.add(genre)
    })
  })

  return Array.from(genres)
}
