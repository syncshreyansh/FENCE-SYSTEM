import './App.css'
import Navbar from './components/layout/Navbar'

function App() {
  return (
    <>
      <Navbar />

      {/* Spacer so content isn't hidden behind the fixed navbar */}
      <div className="pt-20" />

      <section id="home" className="min-h-screen flex items-center justify-center">
        <h1 className="text-white text-4xl">Home Section</h1>
      </section>

      <section id="problem" className="min-h-screen flex items-center justify-center">
        <h1 className="text-white text-4xl">Problem Section</h1>
      </section>

      <section id="solution" className="min-h-screen flex items-center justify-center">
        <h1 className="text-white text-4xl">Solution Section</h1>
      </section>
    </>
  )
}

export default App
