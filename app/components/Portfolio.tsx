import { MoveUpRight } from "lucide-react";
import type { CSSProperties } from "react";
import { Link, useParams } from "react-router";

import locale from "~/translations/Client/portfolio";
import normalizeLanguage from "~/utils/normalizeLanguage";

import MuxPlayer from "@mux/mux-player-react/lazy";

const supportedLanguages = ["ru", "et", "en"];

const portfolioItemsConfig = [
  // Wedding video
  {
    playbackId: "sda50102hlnrK02A8Pmkx02vyGM9M98NDMLu024SUYpxeMXY",
    title: {
      et: "Koos, loomulikult.",
      en: "Together, naturally.",
      ru: "Вместе, как и должно быть.",
    },

    category: {
      et: "Pulmafilm",
      en: "Wedding film",
      ru: "Свадебный фильм",
    },
  },

  // Shop promotion
  {
    playbackId: "guhEkL5QnoKQhQlA5KQcSLnCgX5TcLtLFcklVqNGrpU",
    title: {
      et: "Kõik hubase kodu heaks.",
      en: "Everything for a better home.",
      ru: "Всё для уюта в доме.",
    },

    category: {
      et: "Poe reklaamvideo",
      en: "Store promotional film",
      ru: "Рекламное видео магазина",
    },
  },
];

const playerStyle = {
  aspectRatio: "16 / 9",
  "--media-object-fit": "cover",
  "--media-object-position": "center",
} as CSSProperties;

const Portfolio = () => {
  const { lang } = useParams();
  const normalizedLang = normalizeLanguage(lang!);

  const getValidPath = () => {
    if (!lang || !supportedLanguages.includes(lang)) {
      return "/et/works";
    }

    return `/${lang}/works`;
  };

  return (
    <section id="portfolio">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="space-y-4 md:space-y-8">
          {/* Heading */}
          <div className="w-full">
            <p className="text-xs text-pretty text-gray-700 uppercase tracking-wider sm:text-lg/relaxed">
              {locale.portfolioEyebrow[normalizedLang]}
            </p>

            <div className="flex w-full items-center justify-between">
              <h2 className="text-3xl font-semibold text-gray-900 md:text-4xl">
                {locale.portfolioTitle[normalizedLang]}
              </h2>

              <Link
                to={getValidPath()}
                className="hidden cursor-pointer items-center justify-center gap-x-3 px-5 py-3 font-medium text-blue-500 transition-colors hover:text-blue-900 md:flex"
              >
                {locale.viewMoreFilms[normalizedLang]}
                <MoveUpRight />
              </Link>
            </div>
          </div>

          {/* Portfolio cards */}
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
            {portfolioItemsConfig.map((item) => (
              <article className="min-w-0" key={item.playbackId}>
                <div className="flex aspect-video w-full overflow-hidden rounded-lg bg-black">
                  <MuxPlayer
                    playbackId={item.playbackId}
                    preload="none"
                    loading="viewport"
                    videoTitle={item.title[normalizedLang]}
                    className="block h-full w-full"
                    style={playerStyle}
                    disableCookies={true}
                    disableTracking={true}
                    noVolumePref={true}
                    noMutedPref={true}
                  />
                </div>

                <h3 className="mt-4 text-lg font-bold text-gray-900 sm:text-xl">
                  {item.title[normalizedLang]}
                </h3>

                <p className="text-xs text-pretty text-gray-700 uppercase tracking-wider sm:text-lg/relaxed">
                  {item.category[normalizedLang]}
                </p>
              </article>
            ))}

            <Link
              to={getValidPath()}
              className="flex cursor-pointer items-center justify-center gap-x-3 px-5 py-3 font-medium text-blue-500 transition-colors hover:text-blue-900 md:hidden"
            >
              {locale.viewMoreFilms[normalizedLang]}
              <MoveUpRight />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
