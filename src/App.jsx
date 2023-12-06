import { useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import CreatePost from './components/CreatePost'




function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Header/>

    <main className='min-h-screen'>
    <CreatePost/>

    </main>

    <Footer/>
    </>
  )
}

export default App
