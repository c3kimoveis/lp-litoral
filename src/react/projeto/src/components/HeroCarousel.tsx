
import { useState, useEffect, useCallback } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

// Glob import for images
const heroImages = import.meta.glob("@/assets/hero-carousel/*.{png,jpg,jpeg,webp}", {
  eager: true,
  query: "?url",
  import: "default",
});

const images = Object.values(heroImages) as string[];

interface HeroCarouselProps {
  className?: string;
  interval?: number; // Autoplay interval in ms
}

export function HeroCarousel({ className, interval = 3000 }: HeroCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  // Autoplay logic
  useEffect(() => {
    if (!api) {
      return;
    }

    const play = () => {
      // Check if we are at the end, if so, scroll to start (loop is handled by carousel opts usually, but ensure seamless)
      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        api.scrollTo(0);
      }
    };

    const timer = setInterval(play, interval);

    return () => clearInterval(timer);
  }, [api, interval]);

  // Update current index for pagination dots
  useEffect(() => {
    if (!api) {
      return;
    }

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on("select", onSelect);

    return () => {
        api.off("select", onSelect);
    };
  }, [api]);

    // Custom navigation handlers
    const scrollPrev = useCallback(() => api?.scrollPrev(), [api]);
    const scrollNext = useCallback(() => api?.scrollNext(), [api]);
    const scrollTo = useCallback((index: number) => api?.scrollTo(index), [api]);


  return (
    <div className={cn("relative w-full h-full overflow-hidden", className)}>
        {/* Carousel */}
      <Carousel
        setApi={setApi}
        opts={{
          loop: true,
          align: "start",
          duration: 60,
        }}
        className="w-full h-full [&>.overflow-hidden]:h-full"
      >
        <CarouselContent className="h-full -ml-0"> {/* Override -ml-4 from default theme if needed, check default implementation */}
          {images.map((src, index) => (
            <CarouselItem key={index} className="pl-0 h-full w-full basis-full"> 
              <div 
                className="w-full h-full bg-cover bg-center transition-transform duration-700 ease-in-out" 
                style={{ backgroundImage: `url(${src})` }}
                role="img"
                aria-label={`Slide ${index + 1}`}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Dark Overlay - Critical for text contrast */}
      <div className="absolute inset-0 bg-black/65 z-10 pointer-events-none" />

      {/* Navigation Arrows (Custom positioned) */}
        <button 
            onClick={scrollPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-50 text-white/50 hover:text-white transition-colors bg-black/20 hover:bg-black/40 p-2 rounded-full backdrop-blur-sm hidden md:block"
            aria-label="Previous slide"
        >
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-left"><path d="m15 18-6-6 6-6"/></svg>
        </button>

        <button 
            onClick={scrollNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-50 text-white/50 hover:text-white transition-colors bg-black/20 hover:bg-black/40 p-2 rounded-full backdrop-blur-sm hidden md:block"
             aria-label="Next slide"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>
        </button>

      {/* Pagination Bullets */}
      {/* <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={cn(
              "w-2.5 h-2.5 rounded-full transition-all duration-300",
              current === index ? "bg-white w-8" : "bg-white/40 hover:bg-white/70"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div> */}
    </div>
  );
}
