import React from 'react'
import { Link } from 'react-router-dom'
import '../CSS/Footer.css'
const Footer = () => {
  return (
    <div id="footerMainDiv">
            {'Copyright © '}
      <Link color="inherit" href="/">
        Jigarii
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </div>
  )
}

export default Footer
