import React, { useEffect, useRef, useState } from 'react'
import { dummyTestimonials } from '../../assets/assets'

const StarRating = ({ rating }) => (
  <div className='flex items-center gap-0.5 mb-4'>
    {[...Array(5)].map((_, i) => (
      <svg key={i} xmlns="http://www.w3.org/2000/svg"
        className={`h-4 w-4 ${i < rating ? 'text-[#f87171]' : 'text-transparent stroke-[#f87171] stroke-2'}`}
        viewBox="0 0 20 20" fill="currentColor">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
)

const TestimonailsSection = () => {
  const scrollRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let animationId;
    let currentScroll = container.scrollLeft;

    const scroll = () => {
      if (!isHovered) {
        currentScroll += 0.5; // Slow, smooth auto-scroll speed
        
        // When we've scrolled exactly halfway through the duplicated items, seamlessly reset to start
        if (currentScroll >= container.scrollWidth / 2) {
          currentScroll = 0;
        }
        container.scrollLeft = currentScroll;
      } else {
        // Keep tracking the manual scroll position when the user takes control
        currentScroll = container.scrollLeft;
      }
      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationId);
  }, [isHovered]);

  return (
    <div className='w-full bg-[var(--color-bg)] py-20 overflow-hidden'>
      
      {/* Header */}
      <div className='text-center mb-16 px-4'>
        <h2 className='text-3xl md:text-[36px] font-bold text-[var(--color-text-primary)] mb-4 tracking-tight'>Loved by learners worldwide</h2>
        <p className='text-[var(--color-text-secondary)] text-[15px] max-w-2xl mx-auto'>
          Discover how our platform is empowering individuals to build skills, advance their careers, and achieve their professional goals.
        </p>
      </div>

      {/* Interactive Auto-Scroll Container */}
      <div className='relative w-full max-w-[1600px] mx-auto'>
        {/* Fade overlays for smooth entry/exit */}
        <div className='absolute top-0 left-0 w-16 md:w-32 h-full bg-gradient-to-r from-[var(--color-bg)] to-transparent z-10 pointer-events-none'></div>
        <div className='absolute top-0 right-0 w-16 md:w-32 h-full bg-gradient-to-l from-[var(--color-bg)] to-transparent z-10 pointer-events-none'></div>

        <div 
          ref={scrollRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={() => setIsHovered(true)}
          onTouchEnd={() => setIsHovered(false)}
          className='flex w-full overflow-x-auto py-4 hide-scrollbar cursor-grab active:cursor-grabbing'
          style={{ scrollBehavior: 'auto' }}
        >
          {/* Duplicate testimonials 4 times to ensure mathematically perfect infinite scroll loops */}
          {[...dummyTestimonials, ...dummyTestimonials, ...dummyTestimonials, ...dummyTestimonials].map((t, i) => (
            <div
              key={i}
              className='flex-shrink-0 w-[300px] md:w-[320px] bg-[var(--color-surface)] rounded-lg border border-[var(--color-border)] shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden flex flex-col mr-6'
            >
              {/* Profile Header */}
              <div className='bg-[#f3f4f6] px-6 py-5 flex items-center gap-4'>
                <img src={t.image} alt={t.name}
                  className='w-14 h-14 rounded-full object-cover flex-shrink-0'
                />
                <div>
                  <p className='font-medium text-[var(--color-text-primary)] text-base'>{t.name}</p>
                  <p className='text-[var(--color-text-secondary)] text-[13px]'>{t.role}</p>
                </div>
              </div>
              
              {/* Content */}
              <div className='p-6 flex flex-col flex-1 text-left'>
                <StarRating rating={t.rating} />
                <p className='text-[var(--color-text-secondary)] text-[15px] leading-relaxed mb-6 flex-1'>"{t.feedback}"</p>
                <span className='text-[var(--color-primary)] text-sm font-medium hover:underline cursor-pointer mt-auto'>Read more</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </div>
  )
}

export default TestimonailsSection
