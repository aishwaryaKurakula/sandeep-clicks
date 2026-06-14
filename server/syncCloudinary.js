const https = require('https')
const { MongoClient } = require('mongodb')

const CLOUD_NAME  = 'do2yhfpel'
const API_KEY     = '747619714956878'
const API_SECRET  = 'LxyqSGk3lO_5RpKC7ifcdZu84qg'
const MONGO_URI   = 'mongodb+srv://myAtlasDBUser:aishu123@myatlasclusteredu.qgfkwmd.mongodb.net/?appName=myAtlasClusterEDU'
const DB_NAME     = 'test'
const COLLECTION  = 'galleries'

// These are the public_ids of images that belong to OTHER apps — add any you want to skip
const SKIP_IDS = new Set([])

function cloudinaryFetch(nextCursor = null) {
  return new Promise((resolve, reject) => {
    const auth = Buffer.from(`${API_KEY}:${API_SECRET}`).toString('base64')
    let path = `/v1_1/${CLOUD_NAME}/resources/image?max_results=500&type=upload`
    if (nextCursor) path += `&next_cursor=${nextCursor}`
    const options = {
      hostname: 'api.cloudinary.com',
      path, method: 'GET',
      headers: { Authorization: `Basic ${auth}` }
    }
    const req = https.request(options, res => {
      let data = ''
      res.on('data', chunk => data += chunk)
      res.on('end', () => {
        try { resolve(JSON.parse(data)) }
        catch(e) { console.error('Raw response:', data.slice(0,300)); reject(e) }
      })
    })
    req.on('error', reject)
    req.end()
  })
}

async function getAllCloudinaryImages() {
  let all = [], cursor = null
  do {
    const result = await cloudinaryFetch(cursor)
    if (result.error) { console.error('Cloudinary error:', result.error.message); process.exit(1) }
    all = all.concat(result.resources || [])
    cursor = result.next_cursor || null
    console.log(`Fetched ${all.length} images so far...`)
  } while (cursor)
  return all
}

async function main() {
  console.log('Fetching all images from Cloudinary...')
  const images = await getAllCloudinaryImages()
  console.log(`Total images found: ${images.length}`)

  if (images.length === 0) {
    console.log('No images found. Check your API credentials.')
    process.exit(0)
  }

  const client = new MongoClient(MONGO_URI)
  await client.connect()
  console.log('Connected to MongoDB')

  const col = client.db(DB_NAME).collection(COLLECTION)

  const existing = await col.find({}, { projection: { cloudinaryId: 1 } }).toArray()
  const existingIds = new Set(existing.map(e => e.cloudinaryId))
  console.log(`Existing photos in DB: ${existingIds.size}`)

  const now = new Date()
  const docs = images
    .filter(img => !existingIds.has(img.public_id) && !SKIP_IDS.has(img.public_id))
    .map(img => ({
      title:        img.public_id.split('/').pop().replace(/[_-]/g, ' '),
      category:     'weddings',
      imageUrl:     img.secure_url,
      cloudinaryId: img.public_id,
      createdAt:    new Date(img.created_at),
      updatedAt:    now,
    }))

  if (docs.length === 0) {
    console.log('No new images to insert.')
  } else {
    const result = await col.insertMany(docs)
    console.log(`✓ Inserted ${result.insertedCount} photos into MongoDB!`)
    console.log('Now go to MongoDB Atlas and update category for non-wedding photos.')
  }

  await client.close()
  console.log('Done!')
}

main().catch(err => { console.error(err); process.exit(1) })