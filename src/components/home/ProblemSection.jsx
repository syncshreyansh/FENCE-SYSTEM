import { Highlighter } from '../highlighter'
import ScrollFloat from '../ScrollFloat'
import ProblemStatement from './ProblemStatement'

export default function ProblemSection() {
  return (
    <div className="relative w-full bg-[#0a0a0b]">
      <div className="absolute top-32 left-0 w-full flex justify-center z-10 pointer-events-none">
        <h1 className="text-white text-6xl md:text-8xl tracking-wider uppercase opacity-20 lg:opacity-100" style={{ fontFamily: '"Bebas Neue", sans-serif' }}>
          <ScrollFloat>WHERE IT </ScrollFloat>
          <Highlighter action="highlight" color="#B6E232" animationDuration={1000}>
            <span className="text-black"><ScrollFloat>BREAKS</ScrollFloat></span>
          </Highlighter>
        </h1>
      </div>
      <ProblemStatement />
    </div>
  )
}
