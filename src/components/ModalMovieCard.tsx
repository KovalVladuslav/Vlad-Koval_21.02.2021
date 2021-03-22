import React from 'react'

import Modal from 'react-bootstrap/Modal'

import { IMovie } from '../interface'

import closeIconPath from '../image/close-icon.svg'
import styles from './ModalMovieCard.module.scss'
import ButtonStar from './ButtonStar'

interface IModalMovieCardProps {
  setIsShowModal(arg: boolean): void
  isShowModal: boolean
  currentShowMovie: Partial<IMovie>
  setAllMovies(arg: IMovie[]): void
  allMovies: IMovie[]
}

const ModalMovieCard: React.FC<IModalMovieCardProps> = ({ setIsShowModal, isShowModal, currentShowMovie, setAllMovies, allMovies}) => {

  const handleCloseModal = ():void => {
    setIsShowModal(false)
  }

  return (
    <Modal show={isShowModal} onHide={handleCloseModal} centered dialogClassName={styles.modal}>
      <section className={styles.modal_wrapper}>
        <img src={closeIconPath} role={'button'} tabIndex={0} alt={'close'} onClick={handleCloseModal}
             className={styles.modal_close}/>
        <img src={currentShowMovie.img} alt={currentShowMovie.name} className={styles.modal_image}/>
        <div>
          <h4>{currentShowMovie.name}</h4>
          <p>{currentShowMovie.description}</p>
        </div>
        <div>
          <div className='d-flex justify-content-between align-items-center'>
            <ButtonStar setAllMovies={setAllMovies} active={currentShowMovie.active} id={currentShowMovie.id} allMovies={allMovies} modal={true}/>
            <span className={styles.modal_year}>{currentShowMovie.year}</span>
          </div>
          <div className={styles.modal_genres}>
            {currentShowMovie.genres && currentShowMovie.genres.map((genre:string, index:number) => (
              <span key={`${genre}-${index}`}>{genre}</span>
            ))}
          </div>
        </div>
        <div className={styles.modal_people}>
          <span>Director: {currentShowMovie.director}</span>
          <div className='mt-3'>
            <span>Starring:&nbsp;</span>
            {currentShowMovie.starring && currentShowMovie.starring.map((actor:string, index:number, array) => (
              array.length === index + 1 ? (
                <span key={`${actor}-${index}`}>{`${actor}`}</span>
              ) : (
                <span key={`${actor}-${index}`}>{`${actor},`}&nbsp;</span>
              )
            ))}
          </div>
        </div>
      </section>
    </Modal>
  )
}

export default ModalMovieCard
