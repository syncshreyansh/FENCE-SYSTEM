import Navbar from '../components/layout/Navbar'
import HomeSection from '../components/home/HomeSection'
import ProblemSection from '../components/home/ProblemSection'
import SolutionSection from '../components/home/SolutionSection'

export default function Home() {
  return (
    <>
      <Navbar />

      <HomeSection />
      <ProblemSection />
      <SolutionSection />
    </>
  )
}
