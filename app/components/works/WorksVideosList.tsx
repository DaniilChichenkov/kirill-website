import MuxPlayer from "@mux/mux-player-react/lazy";
import { useParams } from "react-router";
import normalizeLanguage from "~/utils/normalizeLanguage";

const WEDDING_PLAYBACK_ID = "z1gy3FJGudeCTyEeoNSqWvI6tzTYPk01EuHYOxeE1d5g";

const videosConfig = [
  // Conference video
  {
    title: {
      et: "Konverentsi kogemus.",
      en: "The conference experience.",
      ru: "Атмосфера конференции.",
    },
    category: {
      et: "Konverentsivideo",
      en: "Conference film",
      ru: "Видео с конференции",
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
    category: {
      et: "Pulmafilm",
      en: "Wedding film",
      ru: "Свадебный фильм",
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

    category: {
      et: "Jooksuürituse video",
      en: "Running event film",
      ru: "Видео с забега",
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

    category: {
      et: "Poe reklaamvideo",
      en: "Store promotional film",
      ru: "Рекламное видео магазина",
    },
    playbackId: "guhEkL5QnoKQhQlA5KQcSLnCgX5TcLtLFcklVqNGrpU",
  },
];

const WorksVideosList = () => {
  const { lang } = useParams();
  const normalizedLang = normalizeLanguage(lang!);

  return (
    <section className="mt-5">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="space-y-4 md:space-y-8">
          <div className="flex flex-col gap-y-10 lg:grid lg:grid-cols-2 lg:gap-x-10">
            {videosConfig.map((item) => (
              <article className="min-w-0" key={item.playbackId}>
                <div className="flex aspect-video w-full overflow-hidden rounded-lg bg-black">
                  <MuxPlayer
                    playbackId={item.playbackId}
                    preload="none"
                    loading="viewport"
                    videoTitle="Together, naturally."
                    className="block h-full w-full"
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorksVideosList;
