import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import '../CSS/Footer.css'
import quoteContext from '../context/quotes/quoteContext'
const Footer = () => {
  const {loading} = useContext(quoteContext)  
  return (
    <div id="footerMainDiv" style={{display: loading?'none':'block'}}>
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
