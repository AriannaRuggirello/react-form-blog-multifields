import { useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Hero from './components/Hero'


import CreatePost from './components/CreatePost'




function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Header/>
    <Hero/>
    <main className='min-h-screen'>
    <CreatePost/>

    </main>

    <Footer/>
    </>
  )
}

export default App
