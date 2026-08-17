import AccordionGallery from './AccordionGallery'
import SpecularButton from '../common/SpecularButton'
import ForestBackground from './ForestBackground'
import { Highlighter } from '../highlighter'

export default function HomeSection() {
  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center py-20 overflow-hidden">
      
      {/* Forest-themed animated background */}
      <ForestBackground />

      <div className="relative z-10 flex flex-col items-start gap-10 w-full max-w-7xl px-6 lg:px-8 mx-auto mt-20">
        <h1 className="text-white text-6xl md:text-8xl tracking-wider uppercase leading-none" style={{ fontFamily: '"Bebas Neue", sans-serif' }}>
          In the <br />
          <Highlighter action="highlight" color="#108730" animationDuration={1000}>
            <span className="text-black">Headlines</span>
          </Highlighter>
        </h1>

        <div className="w-full">
          <AccordionGallery height={440} />
        </div>

        <SpecularButton
          size="sm"
          radius={999}
          baseColor="#525252"
          lineColor="#ffffff"
        >
          Read More &nbsp;→
        </SpecularButton>
      </div>
    </section>
  )
}
