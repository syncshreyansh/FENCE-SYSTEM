import NavContext from '../context/NavContext'
import Navbar from '../components/layout/Navbar'
import FullScreenNav from '../components/layout/FullScreenNav'
import HomeSection from '../components/home/HomeSection'
import ProblemSection from '../components/home/ProblemSection'
import SolutionSection from '../components/home/SolutionSection'

export default function Home() {
  return (
    <NavContext>
      <Navbar />
      <FullScreenNav />

      <HomeSection />
      <ProblemSection />
      <SolutionSection />
    </NavContext>
  )
}