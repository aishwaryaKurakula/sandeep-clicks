function PhotoCard({ photo }) {
  return (
    <div className='mb-4 overflow-hidden group relative'>
      <img
        src={photo.imageUrl}
        alt={photo.title}
        className='w-full object-cover group-hover:scale-105 transition duration-500'
      />
      <div className='absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition duration-300 flex items-end p-4'>
        <div>
          <p className='text-white font-semibold'>{photo.title}</p>
          <p className='text-rose-400 text-sm uppercase tracking-widest'>{photo.category}</p>
        </div>
      </div>
    </div>
  )
}

export default PhotoCard