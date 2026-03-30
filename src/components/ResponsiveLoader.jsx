import { useEffect, useState } from 'react'
import ipadAirView from '../assets/iPadAir_View.png'
import iphoneView from '../assets/iPhone_View.png'
import laptopView from '../assets/Laptop_View.png'

const slides = [
  {
    id: 'laptop',
    label: 'Laptop View',
    frameClassName: 'responsive-device-laptop',
    shellClassName: 'responsive-shell-laptop',
    screenClassName: 'responsive-screen-laptop',
    image: laptopView,
  },
  {
    id: 'tablet',
    label: 'iPad Air View',
    frameClassName: 'responsive-device-tablet',
    shellClassName: 'responsive-shell-tablet',
    screenClassName: 'responsive-screen-tablet',
    image: ipadAirView,
  },
  {
    id: 'phone',
    label: 'iPhone View',
    frameClassName: 'responsive-device-phone',
    shellClassName: 'responsive-shell-phone',
    screenClassName: 'responsive-screen-phone',
    image: iphoneView,
  },
]

function ResponsiveLoader({ className = '' }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [labelIndex, setLabelIndex] = useState(0)
  const [isLabelVisible, setIsLabelVisible] = useState(true)
  const classes = [
    'responsive-showcase relative h-[360px] w-full max-w-[30rem] sm:h-[420px] lg:h-[460px]',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % slides.length)
    }, 4500)

    return () => window.clearInterval(intervalId)
  }, [])

  useEffect(() => {
    if (activeIndex === labelIndex) {
      setIsLabelVisible(true)
      return undefined
    }

    setIsLabelVisible(false)

    const timeoutId = window.setTimeout(() => {
      setLabelIndex(activeIndex)
      setIsLabelVisible(true)
    }, 180)

    return () => window.clearTimeout(timeoutId)
  }, [activeIndex, labelIndex])

  return (
    <section
      className={classes}
      aria-label="Responsive device carousel"
    >
      <p className="responsive-carousel-label">
        <span
          className={`responsive-carousel-label-text ${
            isLabelVisible ? 'is-visible' : 'is-hidden'
          }`}
        >
          {slides[labelIndex].label}
        </span>
      </p>
      <div className="responsive-carousel-shell">
        <div className="responsive-carousel-track">
          {slides.map((slide, index) => (
            <article
              key={slide.id}
              className={`responsive-carousel-slide ${
                activeIndex === index ? 'is-active' : ''
              }`}
              aria-hidden={activeIndex !== index}
            >
              <div className={`responsive-device ${slide.frameClassName}`}>
                {slide.id === 'laptop' && (
                  <div className={`responsive-shell ${slide.shellClassName}`}>
                    <div className="responsive-shell-topbar">
                      <span className="responsive-shell-camera" />
                    </div>
                    <div className={`responsive-screen ${slide.screenClassName}`}>
                      <img
                        src={slide.image}
                        alt=""
                        className="responsive-device-image"
                        loading="eager"
                        decoding="async"
                      />
                    </div>
                    <div className="responsive-laptop-base">
                      <span className="responsive-laptop-trackpad" />
                    </div>
                  </div>
                )}

                {slide.id === 'tablet' && (
                  <div className={`responsive-shell ${slide.shellClassName}`}>
                    <span className="responsive-side-button responsive-side-button-top" />
                    <span className="responsive-side-button responsive-side-button-bottom" />
                    <div className={`responsive-screen ${slide.screenClassName}`}>
                      <img
                        src={slide.image}
                        alt=""
                        className="responsive-device-image"
                        loading="eager"
                        decoding="async"
                      />
                    </div>
                    <span className="responsive-tablet-camera" />
                  </div>
                )}

                {slide.id === 'phone' && (
                  <div className={`responsive-shell ${slide.shellClassName}`}>
                    <span className="responsive-phone-button" />
                    <div className="responsive-phone-notch" />
                    <div className={`responsive-screen ${slide.screenClassName}`}>
                      <img
                        src={slide.image}
                        alt=""
                        className="responsive-device-image"
                        loading="eager"
                        decoding="async"
                      />
                    </div>
                    <div className="responsive-phone-homebar" />
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ResponsiveLoader
