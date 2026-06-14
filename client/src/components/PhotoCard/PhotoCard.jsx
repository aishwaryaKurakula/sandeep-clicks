import './PhotoCard.css'

function PhotoCard({ photo }) {
  return (
    <div className='photo-card'>
      <img src={photo.imageUrl} alt={photo.title} />
      <div className='photo-card-overlay'>
        <div>
          <p className='photo-card-title'>{photo.title}</p>
          <p className='photo-card-category'>{photo.category}</p>
        </div>
      </div>
    </div>
  )
}

export default PhotoCard