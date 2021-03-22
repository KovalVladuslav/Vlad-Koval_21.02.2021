export interface IMovie {
  id: number
  name: string
  img: string
  description: string
  year: number
  genres: [string]
  director: string
  starring: [string]
  active? :boolean
}

export interface ILocalStorageFavorite {
  [key: string]: boolean | undefined
}
