import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import SliderPkg from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import heroData from "../../data/heroSlides.json";
import { assetPath } from "../../utils/assetPath";
import "./HeroCarousel.css";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Slider = ((SliderPkg as any).default ?? SliderPkg) as typeof SliderPkg;

interface SlideLink {
  label: string;
  href: string;
}

interface Slide {
  id: string;
  title: string;
  tagline: string;
  mainContent: string;
  imagePath: string;
  link: SlideLink;
}

interface ArrowProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

function PrevArrow({ onClick }: ArrowProps) {
  return (
    <button
      type="button"
      className="hero-arrow hero-arrow--prev"
      onClick={onClick}
      aria-label="Previous slide"
    >
      &#8592;
    </button>
  );
}

function NextArrow({ onClick }: ArrowProps) {
  return (
    <button
      type="button"
      className="hero-arrow hero-arrow--next"
      onClick={onClick}
      aria-label="Next slide"
    >
      &#8594;
    </button>
  );
}

function HeroCarousel() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sliderRef = useRef<any>(null);
  const slides = heroData.slides as Slide[];
  const [isPlaying, setIsPlaying] = useState(true);

  // Refs for pause/resume timing
  const currentSlideRef = useRef(0);
  const slideStartedAtRef = useRef<number>(0);
  const pausedSlideRef = useRef<number | null>(null);
  const pausedElapsedRef = useRef<number>(0);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    slideStartedAtRef.current = Date.now();
    return () => {
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    };
  }, []);

  function handleTogglePlay() {
    if (isPlaying) {
      // PAUSE — freeze the slider and record how far into the current slide we are
      if (resumeTimerRef.current) {
        clearTimeout(resumeTimerRef.current);
        resumeTimerRef.current = null;
      }
      sliderRef.current?.slickPause();
      pausedSlideRef.current = currentSlideRef.current;
      pausedElapsedRef.current = Date.now() - slideStartedAtRef.current;
      setIsPlaying(false);
    } else {
      // RESUME
      const sameSlide = currentSlideRef.current === pausedSlideRef.current;
      setIsPlaying(true);

      if (sameSlide) {
        // Same slide: restore effective start time so the bar animation position is correct,
        // then fire slickNext after the remaining time rather than waiting a full interval.
        slideStartedAtRef.current = Date.now() - pausedElapsedRef.current;
        const remaining = Math.max(
          heroData.autoplaySpeed - pausedElapsedRef.current,
          100,
        );
        resumeTimerRef.current = setTimeout(() => {
          resumeTimerRef.current = null;
          sliderRef.current?.slickNext();
          sliderRef.current?.slickPlay();
        }, remaining);
      } else {
        // Different slide: start the bar and slider timer fresh from 0.
        slideStartedAtRef.current = Date.now();
        sliderRef.current?.slickPlay();
      }

      pausedSlideRef.current = null;
      pausedElapsedRef.current = 0;
    }
  }

  const settings = {
    dots: true,
    infinite: true,
    fade: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: heroData.autoplaySpeed,
    pauseOnHover: true,
    afterChange: (index: number) => {
      currentSlideRef.current = index;
      slideStartedAtRef.current = Date.now();
    },
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    dotsClass: "slick-dots hero-dots",
    rtl: false,
  };

  return (
    <div
      className={`hero-carousel-wrap${!isPlaying ? " hero-carousel-wrap--paused" : ""}`}
    >
      <Slider ref={sliderRef} {...settings}>
        {slides.map((slide) => (
          <div key={slide.id} className="hero-slide">
            {/* Row 1: Title + Tagline */}
            <div className="hero-slide-header">
              <h2 className="hero-slide-title">{slide.title}</h2>
              {slide.tagline ? (
                <p className="hero-slide-tagline">{slide.tagline}</p>
              ) : null}
            </div>

            {/* Row 2: Image background with content overlay */}
            <div
              className="hero-slide-body"
              style={{ backgroundImage: `url(${assetPath(slide.imagePath)})` }}
            >
              <div className="hero-slide-overlay">
                <p className="hero-slide-content">{slide.mainContent}</p>
                <Link to={slide.link.href} className="hero-slide-cta">
                  {slide.link.label}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      {/* Single autoplay toggle — one element, positioned over the image row */}
      <button
        type="button"
        className={`hero-autoplay-toggle${isPlaying ? " hero-autoplay-toggle--on" : ""}`}
        onClick={handleTogglePlay}
        aria-label={isPlaying ? "Pause auto-scroll" : "Resume auto-scroll"}
        aria-pressed={isPlaying}
      >
        <span className="hero-toggle-track">
          <span className="hero-toggle-thumb" />
        </span>
        <span className="hero-toggle-label">
          {isPlaying ? "AUTO" : "PAUSED"}
        </span>
      </button>
    </div>
  );
}

export default HeroCarousel;
