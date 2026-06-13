const adminLogin = (req, res) => {
  try {
    const { password } = req.body

    if (!password || password !== process.env.ADMIN_PASSWORD) {
      return res.status(401).json({ message: 'Invalid password' })
    }

    res.status(200).json({ 
      message: 'Login successful',
      token: process.env.ADMIN_PASSWORD
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

module.exports = { adminLogin }