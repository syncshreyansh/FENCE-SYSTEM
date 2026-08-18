import { forwardRef } from 'react'

const NewspaperCard = forwardRef(function NewspaperCard(
  {
    article,
    isCenter,
    onClick,
    className = '',
  },
  ref
) {
  // Publication Masthead styling matching REF.png and updated articles
  const renderMasthead = () => {
    switch (article.source) {
      case 'DownToEarth':
        return (
          <span
            className="text-sm sm:text-base md:text-lg lg:text-xl 3xl:text-2xl 4xl:text-3xl font-black tracking-tight text-black whitespace-nowrap"
            style={{ fontFamily: '"Merriweather", Georgia, serif', color: '#111111' }}
          >
            DownToEarth
          </span>
        )
      case 'GULF NEWS':
        return (
          <span
            className="text-xs sm:text-sm md:text-base 3xl:text-lg 4xl:text-xl font-black tracking-widest text-black uppercase whitespace-nowrap"
            style={{ fontFamily: '"Merriweather", Georgia, serif', color: '#111111' }}
          >
            GULF NEWS
          </span>
        )
      case 'THE HINDU':
        return (
          <span
            className="text-xs sm:text-sm md:text-base 3xl:text-lg 4xl:text-xl font-black tracking-wider text-black uppercase whitespace-nowrap"
            style={{ fontFamily: '"Merriweather", Georgia, serif', color: '#111111' }}
          >
            THE HINDU
          </span>
        )
      case 'The Telegraph':
        return (
          <span
            className="text-xs sm:text-sm md:text-base 3xl:text-lg 4xl:text-xl font-bold italic text-black whitespace-nowrap"
            style={{ fontFamily: '"Merriweather", Georgia, serif', color: '#111111' }}
          >
            The Telegraph
          </span>
        )
      case 'THE TIMES OF INDIA':
        return (
          <span
            className="text-[10px] sm:text-xs md:text-[13px] 3xl:text-[15px] 4xl:text-[17px] font-black tracking-tight text-black uppercase whitespace-nowrap"
            style={{ fontFamily: '"Merriweather", Georgia, serif', color: '#111111' }}
          >
            THE TIMES OF INDIA
          </span>
        )
      case 'The Assam Tribune':
        return (
          <span
            className="text-[10px] sm:text-xs md:text-[13px] 3xl:text-[15px] 4xl:text-[17px] font-black tracking-tight text-black whitespace-nowrap"
            style={{ fontFamily: '"Merriweather", Georgia, serif', color: '#111111' }}
          >
            The Assam Tribune
          </span>
        )
      default:
        return (
          <span
            className="text-xs sm:text-sm 3xl:text-base 4xl:text-lg font-bold text-black whitespace-nowrap"
            style={{ fontFamily: '"Merriweather", Georgia, serif', color: '#111111' }}
          >
            {article.source}
          </span>
        )
    }
  }

  return (
    <article
      ref={ref}
      onClick={onClick}
      className={`newspaper-card-item absolute inset-y-0 cursor-pointer select-none flex flex-col will-change-transform ${className}`}
      style={{
        left: '50%',
        width: '100%',
        maxWidth: 'clamp(320px, 21vw, 560px)',
        transformOrigin: '50% 100%',
      }}
    >
      {/* Physical tactile newspaper paper surface */}
      <div
        className={`w-full h-full bg-[#F2EFE7] text-[#111111] p-3 sm:p-3.5 md:p-4 lg:p-4.5 3xl:p-6 4xl:p-8 rounded-none border border-[#D5CFC2] flex flex-col justify-between transition-shadow duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          isCenter
            ? 'shadow-[0_30px_65px_-15px_rgba(0,0,0,0.92),0_0_0_1px_rgba(0,0,0,0.14)]'
            : 'shadow-[0_18px_40px_-10px_rgba(0,0,0,0.65)]'
        }`}
      >
        <div className="flex flex-col flex-grow">
          {/* Header Row: Masthead + Date */}
          <div className="flex justify-between items-baseline pb-1 sm:pb-1.5 3xl:pb-2.5 border-b border-black gap-1.5 sm:gap-2">
            <div className="shrink-0">{renderMasthead()}</div>
            <span
              className="text-[9px] sm:text-[10px] md:text-[11px] 3xl:text-xs 4xl:text-sm text-[#555555] font-semibold tracking-wider uppercase whitespace-nowrap shrink-0"
              style={{ fontFamily: '"JetBrains Mono", monospace' }}
            >
              {article.date}
            </span>
          </div>

          {/* Thin Horizontal Rule */}
          <div className="my-1 sm:my-1.5 3xl:my-2 border-t border-black/80 h-px" />

          {/* Big Bold Article Headline */}
          <h2
            className={`font-black leading-[1.12] my-1 sm:my-1.5 3xl:my-2.5 tracking-tight !text-black ${
              isCenter
                ? 'text-base sm:text-lg md:text-[22px] lg:text-[25px] xl:text-[28px] 3xl:text-[34px] 4xl:text-[40px] line-clamp-3 sm:line-clamp-4'
                : 'text-sm sm:text-base md:text-[18px] lg:text-[20px] xl:text-[22px] 3xl:text-[26px] 4xl:text-[32px] line-clamp-2 sm:line-clamp-3'
            }`}
            style={{ 
              fontFamily: '"Merriweather", Georgia, serif', 
              color: '#000000', 
              fontWeight: 900,
              letterSpacing: '-0.02em'
            }}
          >
            {article.headline}
          </h2>

          {/* Editorial Photograph with Soft Crossfade */}
          <div
            className={`w-full relative overflow-hidden border border-black/25 bg-[#e2ded5] mt-0.5 sm:mt-1 3xl:mt-2 mb-1 sm:mb-1.5 3xl:mb-2.5 transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${
              isCenter
                ? 'h-[135px] sm:h-[160px] md:h-[190px] lg:h-[210px] 3xl:h-[270px] 4xl:h-[340px]'
                : 'h-[110px] sm:h-[130px] md:h-[150px] lg:h-[165px] 3xl:h-[215px] 4xl:h-[270px]'
            }`}
          >
            {/* Base Monochrome Layer */}
            <img
              src={article.image}
              alt=""
              className="absolute inset-0 w-full h-full object-cover grayscale contrast-125 brightness-[0.88] select-none pointer-events-none"
              loading="eager"
              draggable="false"
            />

            {/* Top Color Layer with smooth opacity crossfade */}
            <img
              src={article.image}
              alt={article.headline}
              className={`absolute inset-0 w-full h-full object-cover contrast-[1.08] brightness-[0.98] select-none pointer-events-none transition-opacity duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                isCenter ? 'opacity-100' : 'opacity-0'
              }`}
              loading="eager"
              draggable="false"
            />
          </div>

          {/* Photo caption */}
          {article.photoCaption && (
            <p
              className="text-[8px] sm:text-[9px] md:text-[10px] 3xl:text-xs 4xl:text-sm italic text-[#666666] mb-0.5 sm:mb-1 line-clamp-1"
              style={{ fontFamily: '"Merriweather", Georgia, serif' }}
            >
              {article.photoCaption}
            </p>
          )}

          {/* Excerpt / Summary */}
          {article.caption && (
            <p
              className={`leading-relaxed text-[#333333] font-serif mb-0.5 sm:mb-1 ${
                isCenter
                  ? 'text-[10px] sm:text-xs md:text-[13px] 3xl:text-[15px] 4xl:text-[18px] line-clamp-2 sm:line-clamp-3 3xl:line-clamp-4'
                  : 'text-[9px] sm:text-[10px] md:text-[11px] 3xl:text-[13px] 4xl:text-[15px] line-clamp-2 sm:line-clamp-3 text-[#444444]'
              }`}
              style={{ fontFamily: '"Merriweather", Georgia, serif' }}
            >
              {article.caption}
            </p>
          )}
        </div>

        {/* Footer: Read Story Interaction */}
        <div className="flex justify-end items-center pt-1.5 sm:pt-2 3xl:pt-3.5 border-t border-black/10 mt-auto">
          <span
            className="group/link inline-flex items-center gap-1.5 3xl:gap-2 text-[10px] sm:text-[11px] md:text-xs 3xl:text-sm 4xl:text-base font-black tracking-widest text-[#111111] hover:text-[#84cc16] transition-colors uppercase"
            style={{ fontFamily: '"DM Sans", system-ui, sans-serif' }}
          >
            {isCenter ? article.activeButtonText : article.buttonText}
            <svg
              className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 3xl:w-5 3xl:h-5 transition-transform duration-300 group-hover/link:translate-x-1"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </span>
        </div>
      </div>
    </article>
  )
})

export default NewspaperCard
