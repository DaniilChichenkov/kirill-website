import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import MuxPlayer from "@mux/mux-player-react/lazy";
import { useRef } from "react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { useParams } from "react-router";
import normalizeLanguage from "~/utils/normalizeLanguage";

const sliderContentConfig = [
  // Conference video
  {
    title: {
      et: "Konverentsi kogemus.",
      en: "The conference experience.",
      ru: "Атмосфера конференции.",
    },
    playbackId: "Fge6pr313Dr7MYzNlHS8024cyL2INEC9rD3qQka7swgA",
  },

  // Wedding video
  {
    title: {
      et: "Koos, loomulikult.",
      en: "Together, naturally.",
      ru: "Вместе, как и должно быть.",
    },
    playbackId: "sda50102hlnrK02A8Pmkx02vyGM9M98NDMLu024SUYpxeMXY",
  },

  // Running event video
  {
    title: {
      et: "Iga samm on oluline.",
      en: "Every step counts.",
      ru: "Каждый шаг важен.",
    },

    playbackId: "AFZ3R01jjOwnOOcF6Br01Sv01Vq9MWBM600d2GEPFjpbSPA",
  },

  // Shop promotion
  {
    title: {
      et: "Kõik hubase kodu heaks.",
      en: "Everything for a better home.",
      ru: "Всё для уюта в доме.",
    },
    playbackId: "guhEkL5QnoKQhQlA5KQcSLnCgX5TcLtLFcklVqNGrpU",
  },
];

// const translations = {
//   clientStories: {
//     et: "Klientide lood",
//     en: "Client stories",
//     ru: "Истории клиентов",
//   },

//   kindWords: {
//     et: "Head sõnad.",
//     en: "Kind words.",
//     ru: "Тёплые слова.",
//   },

//   realStories: {
//     et: "Päris lood.",
//     en: "Real stories.",
//     ru: "Настоящие истории.",
//   },

//   testimonialsDescription: {
//     et: "Vaata, milline on minuga koos filmi loomise kogemus.",
//     en: "See what it's like to create a film together.",
//     ru: "Узнайте, как проходит совместная работа над фильмом.",
//   },
// } as const;

const translations = {
  clientStories: {
    et: "Veel videoid",
    en: "More work",
    ru: "Больше работ",
  },

  kindWords: {
    et: "Veel lugusid.",
    en: "More stories.",
    ru: "Больше историй.",
  },

  realStories: {
    et: "Veel hetki.",
    en: "More moments.",
    ru: "Больше моментов.",
  },

  testimonialsDescription: {
    et: "Valik erinevatest projektidest, hetkedest ja lugudest kaamera ees.",
    en: "A selection of projects, moments, and stories captured on film.",
    ru: "Подборка проектов, моментов и историй, запечатлённых на видео.",
  },
} as const;

const Feedback = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  const { lang } = useParams();
  const normalizedLang = normalizeLanguage(lang!);

  const suspendSliderIfPlaying = () => {
    swiperRef.current?.autoplay.pause();
  };

  const releaseSuspense = () => {
    swiperRef.current?.autoplay.resume();
  };

  return (
    <>
      <section className="bg-white lg:grid lg:place-content-center">
        <div className="mx-auto w-screen max-w-7xl px-4 pt-16 sm:px-6 sm:pt-24 lg:px-8">
          <div className="mx-auto max-w-prose text-center">
            <p className="text-xs text-pretty text-gray-700 sm:text-lg/relaxed uppercase tracking-wider">
              {translations.clientStories[normalizedLang]}
            </p>

            <h2 className="text-3xl md:text-4xl font-semibold text-gray-900">
              {translations.kindWords[normalizedLang]}
              <strong className="text-blue-500">
                {" "}
                {translations.realStories[normalizedLang]}{" "}
              </strong>
            </h2>

            <p className="mt-4 text-base text-pretty text-gray-700 sm:text-lg/relaxed">
              {translations.testimonialsDescription[normalizedLang]}
            </p>
          </div>
        </div>
      </section>
      <section>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <div className="w-full">
            <Swiper
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              ref={swiperRef}
              pagination={{
                type: "fraction",
              }}
              navigation
              modules={[Pagination, Navigation, Autoplay]}
              loop={true}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              className="mySwiper aspect-4/3 md:aspect-video lg:aspect-2/1 w-full"
            >
              {sliderContentConfig.map((item) => (
                <SwiperSlide className="h-full" key={item.playbackId}>
                  <MuxPlayer
                    playbackId={item.playbackId}
                    preload="none"
                    loading="viewport"
                    videoTitle={item.title[normalizedLang]}
                    className="block h-full w-full"
                    onPlaying={suspendSliderIfPlaying}
                    onEnded={releaseSuspense}
                    onPause={releaseSuspense}
                    disableCookies={true}
                    disableTracking={true}
                    noVolumePref={true}
                    noMutedPref={true}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>
    </>
  );
};

export default Feedback;
