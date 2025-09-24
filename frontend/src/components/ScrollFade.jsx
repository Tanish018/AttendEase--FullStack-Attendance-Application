import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ScrollFade = ({
  children,
  scrollContainerRef,
  containerClassName = '',
  animationDuration = 1.2,
  ease = 'power3.out',
  y = 40, // how much it slides upward
  scale = 1.05, // slight zoom-in
  start = 'top 85%', // when it starts animating
  end = 'bottom 70%', // when it completes
  once = true, // animate only once
}) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scroller = scrollContainerRef?.current || window;

    gsap.fromTo(
      el,
      {
        opacity: 0,
        y: y,
        scale: scale,
        willChange: 'opacity, transform',
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: animationDuration,
        ease: ease,
        scrollTrigger: {
          trigger: el,
          scroller,
          start,
          end,
          toggleActions: once ? 'play none none none' : 'play none none reverse',
        },
      }
    );
  }, [scrollContainerRef, animationDuration, ease, y, scale, start, end, once]);

  return (
    <div ref={containerRef} className={`scroll-fade ${containerClassName}`}>
      {children}
    </div>
  );
};

export default ScrollFade;
