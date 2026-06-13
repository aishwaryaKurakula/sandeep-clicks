const adminAuth = (req, res, next) => {
  const password = req.headers['admin-password']

  if (!password || password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ message: 'Unauthorised' })
  }

  next()
}

module.exports = adminAuth