import React from 'react'
import Footer from './component/footer/Footer'
import MainContent from './component/content/MainContent'
import Info from './component/Info'
import Header from './component/header/Header'

const  App = () => {
  return (
    <div>
      <Header/>
      <MainContent/>
      <Info/>
      <Footer/>
    </div>
  )
}

export default App