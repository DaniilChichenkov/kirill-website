import { useCallback, useEffect, useRef, useState } from "react";

import { AnimatePresence, motion } from "motion/react";

// -------------------------------------------
// 1. Configuration
// -------------------------------------------

import Wedding from "~/src/wedding-example.jpg";
import Car from "~/src/car.jpg";
import Nature from "~/src/nature.jpg";

import Video from "~/src/video.mp4";

const AUTO_PLAY_DELAY = 3500;

const slides = [
  {
    id: 1,
    image: Wedding,
    video: Video,
    title: "Wedding",
  },
  {
    id: 2,
    image: Car,
    video: Video,
    title: "Vehicle review",
  },
  {
    id: 3,
    image: Nature,
    video: Video,
    title: "Beautiful nature",
  },
  {
    id: 4,
    image: Wedding,
    video: Video,
    title: "Events",
  },
];

// -------------------------------------------
// 2. Types
// -------------------------------------------

type Slot = -1 | 0 | 1;
type Direction = -1 | 1;

type SlideCustom = {
  slot: Slot;
  direction: Direction;
  isMobile: boolean;
};

// -------------------------------------------
// 3. Animation configuration
// -------------------------------------------

const desktopPositions: Record<Slot, { left: string; width: string }> = {
  [-1]: {
    left: "0%",
    width: "25%",
  },
  [0]: {
    left: "25%",
    width: "50%",
  },
  [1]: {
    left: "75%",
    width: "25%",
  },
};

const slideVariants = {
  // New slide enters the viewport.
  enter: ({ direction, isMobile }: SlideCustom) => ({
    left: direction === 1 ? "100%" : isMobile ? "-100%" : "-25%",

    width: isMobile ? "100%" : "25%",
  }),

  // Existing slide moves to its new position.
  visible: ({ slot, isMobile }: SlideCustom) =>
    isMobile
      ? {
          left: "0%",
          width: "100%",
        }
      : desktopPositions[slot],

  // Outgoing slide leaves the viewport.
  exit: ({ direction, isMobile }: SlideCustom) => ({
    left: direction === 1 ? (isMobile ? "-100%" : "-25%") : "100%",

    width: isMobile ? "100%" : "25%",
  }),
};

const transition = {
  duration: 0.6,
  ease: [0.22, 1, 0.36, 1] as const,
};

// -------------------------------------------
// 4. Component
// -------------------------------------------

export default function Showreel() {
  // Carousel state.
  const [activeIndex, setActiveIndex] = useState(0);

  const [direction, setDirection] = useState<Direction>(1);

  const [isAnimating, setIsAnimating] = useState(false);

  // Responsive state.
  const [isMobile, setIsMobile] = useState(false);

  // Autoplay state.
  const [isHovered, setIsHovered] = useState(false);

  const [isPageVisible, setIsPageVisible] = useState(true);

  // Video modal state.
  const [playingId, setPlayingId] = useState<number | null>(null);

  const dialogRef = useRef<HTMLDialogElement>(null);

  const videoRef = useRef<HTMLVideoElement>(null);

  const total = slides.length;

  // -------------------------------------------
  // 5. Responsive breakpoint
  // -------------------------------------------

  useEffect(() => {
    const media = window.matchMedia("(max-width: 639px)");

    const update = () => {
      setIsMobile(media.matches);
    };

    update();

    media.addEventListener("change", update);

    return () => {
      media.removeEventListener("change", update);
    };
  }, []);

  // -------------------------------------------
  // 6. Track browser tab visibility
  // -------------------------------------------

  useEffect(() => {
    const updateVisibility = () => {
      setIsPageVisible(document.visibilityState === "visible");
    };

    updateVisibility();

    document.addEventListener("visibilitychange", updateVisibility);

    return () => {
      document.removeEventListener("visibilitychange", updateVisibility);
    };
  }, []);

  // -------------------------------------------
  // 7. Slide indexes
  // -------------------------------------------

  const previousIndex = (activeIndex - 1 + total) % total;

  const nextIndex = (activeIndex + 1) % total;

  // Mobile: active slide only.
  // Desktop: previous + active + next.
  const visibleSlides: {
    index: number;
    slot: Slot;
  }[] = isMobile
    ? [
        {
          index: activeIndex,
          slot: 0,
        },
      ]
    : [
        {
          index: previousIndex,
          slot: -1,
        },
        {
          index: activeIndex,
          slot: 0,
        },
        {
          index: nextIndex,
          slot: 1,
        },
      ];

  // -------------------------------------------
  // 8. Video controls
  // -------------------------------------------

  const selectedSlide = slides.find((slide) => slide.id === playingId) ?? null;

  const openVideo = (id: number) => {
    if (isAnimating) return;

    setPlayingId(id);
  };

  const closeVideo = () => {
    setPlayingId(null);
  };

  // -------------------------------------------
  // 9. Full-screen modal lifecycle
  // -------------------------------------------

  useEffect(() => {
    if (playingId === null) return;

    const dialog = dialogRef.current;
    const video = videoRef.current;

    if (!dialog) return;

    const previousOverflow = document.body.style.overflow;

    // Open the native modal.
    if (!dialog.open) {
      dialog.showModal();
    }

    // Lock background scrolling.
    document.body.style.overflow = "hidden";

    // Start the selected video.
    // If autoplay is blocked, native controls
    // allow the visitor to start it manually.
    if (video) {
      void video.play().catch(() => {});
    }

    return () => {
      // Stop playback when closing.
      video?.pause();

      if (dialog.open) {
        dialog.close();
      }

      document.body.style.overflow = previousOverflow;
    };
  }, [playingId]);

  // -------------------------------------------
  // 10. Manual and automatic navigation
  // -------------------------------------------

  const navigate = useCallback(
    (newDirection: Direction) => {
      // Prevent overlapping animations and
      // navigation while a video is open.
      if (isAnimating || playingId !== null) return;

      setIsAnimating(true);
      setDirection(newDirection);

      setActiveIndex((current) => (current + newDirection + total) % total);
    },
    [isAnimating, playingId, total],
  );

  // -------------------------------------------
  // 11. Automatic slide advancement
  // -------------------------------------------

  useEffect(() => {
    // Pause autoplay during animations,
    // while hovering, while watching a video,
    // or when the browser tab is hidden.
    if (isAnimating || playingId !== null || isHovered || !isPageVisible) {
      return;
    }

    const timer = window.setTimeout(() => {
      navigate(1);
    }, AUTO_PLAY_DELAY);

    return () => {
      window.clearTimeout(timer);
    };
  }, [activeIndex, isAnimating, playingId, isHovered, isPageVisible, navigate]);

  // -------------------------------------------
  // 12. Render
  // -------------------------------------------

  return (
    <>
      <section className="w-full">
        {/* Carousel viewport */}
        <div
          onPointerEnter={(event) => {
            // Pause only for a mouse, not for
            // simulated hover on touch screens.
            if (event.pointerType === "mouse") {
              setIsHovered(true);
            }
          }}
          onPointerLeave={() => {
            setIsHovered(false);
          }}
          className="
            relative w-full overflow-hidden
            h-[260px]
            sm:h-[260px]
            lg:h-[340px]
          "
        >
          {/* Animated slides */}
          <AnimatePresence
            initial={false}
            custom={{ direction, isMobile }}
            onExitComplete={() => {
              setIsAnimating(false);
            }}
          >
            {visibleSlides.map(({ index, slot }) => {
              const slide = slides[index];

              const isActive = slot === 0;

              return (
                <motion.div
                  key={slide.id}
                  custom={{
                    slot,
                    direction,
                    isMobile,
                  }}
                  variants={slideVariants}
                  initial="enter"
                  animate="visible"
                  exit="exit"
                  transition={transition}
                  className="absolute top-0 h-full p-1.5"
                >
                  {/* Slide container */}
                  <div
                    className="
                      relative h-full w-full
                      overflow-hidden rounded-2xl
                    "
                  >
                    {/* Thumbnail */}
                    <img
                      src={slide.image}
                      alt={slide.title}
                      draggable={false}
                      className="
                        h-full w-full object-cover
                      "
                    />

                    {/* Gradient and title */}
                    <motion.div
                      initial={false}
                      animate={{
                        opacity: isActive ? 1 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                      className="
                        pointer-events-none
                        absolute inset-0
                        flex items-end
                        bg-gradient-to-t
                        from-black/60
                        via-transparent
                        to-transparent
                        p-4 text-white
                        sm:p-6
                      "
                    >
                      <h3
                        className="
                          text-lg font-semibold
                          sm:text-2xl
                        "
                      >
                        {slide.title}
                      </h3>
                    </motion.div>

                    {/* Play button */}
                    {isActive && (
                      <button
                        type="button"
                        aria-label={`Play ${slide.title}`}
                        disabled={isAnimating}
                        onClick={() => {
                          openVideo(slide.id);
                        }}
                        className="
                          absolute left-1/2 top-1/2 z-10
                          flex h-12 w-12
                          -translate-x-1/2
                          -translate-y-1/2
                          items-center justify-center
                          rounded-full
                          border border-white/40
                          bg-white/20 text-white
                          backdrop-blur-md
                          transition-transform duration-200
                          hover:scale-110
                          hover:bg-white/30
                          disabled:cursor-not-allowed
                          sm:h-16 sm:w-16
                        "
                      >
                        {/* Play icon */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          aria-hidden="true"
                          className="
                            h-6 w-6
                            sm:h-8 sm:w-8
                          "
                        >
                          <path d="M8 5.14v13.72a1 1 0 0 0 1.52.85l10.29-6.86a1 1 0 0 0 0-1.7L9.52 4.29A1 1 0 0 0 8 5.14Z" />
                        </svg>
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* ----------------------------------
              Responsive navigation
             ---------------------------------- */}

          <div
            className="
              pointer-events-none
              absolute inset-0 z-10
              flex items-center justify-between
              px-3
              sm:grid sm:grid-cols-4 sm:px-0
            "
          >
            {/* Previous */}
            <div
              className="
                flex items-center justify-center
                sm:col-span-1
              "
            >
              <button
                type="button"
                aria-label="Previous slide"
                disabled={isAnimating}
                onClick={() => navigate(-1)}
                className="
                  btn btn-circle btn-sm
                  pointer-events-auto
                  sm:btn-md
                "
              >
                ❮
              </button>
            </div>

            {/* Center space */}
            <div
              className="
                hidden
                sm:col-span-2 sm:block
              "
            />

            {/* Next */}
            <div
              className="
                flex items-center justify-center
                sm:col-span-1
              "
            >
              <button
                type="button"
                aria-label="Next slide"
                disabled={isAnimating}
                onClick={() => navigate(1)}
                className="
                  btn btn-circle btn-sm
                  pointer-events-auto
                  sm:btn-md
                "
              >
                ❯
              </button>
            </div>
          </div>
        </div>

        {/* Slide counter */}
        <div
          className="
            mt-4 text-center text-sm opacity-60
          "
        >
          {activeIndex + 1} / {total}
        </div>
      </section>

      {/* ----------------------------------
          Full-screen video modal
         ---------------------------------- */}

      {selectedSlide && (
        <dialog
          ref={dialogRef}
          aria-label={`${selectedSlide.title} video player`}
          onCancel={(event) => {
            event.preventDefault();
            closeVideo();
          }}
          className="
            fixed inset-0 m-0
            h-dvh w-screen
            max-h-none max-w-none
            border-0 bg-black p-0
            text-white
            backdrop:bg-black/85
          "
        >
          {/* Video player */}
          <video
            ref={videoRef}
            key={selectedSlide.id}
            src={selectedSlide.video}
            controls
            playsInline
            preload="metadata"
            onEnded={closeVideo}
            className="
              h-full w-full object-contain
            "
          />

          {/* Close modal */}
          <button
            type="button"
            aria-label="Close video"
            onClick={closeVideo}
            className="
              btn btn-circle
              absolute right-4 top-4 z-10
              border-white/30
              bg-black/60 text-white
              hover:bg-black/80
            "
          >
            ✕
          </button>
        </dialog>
      )}
    </>
  );
}
