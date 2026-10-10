import { Link, useParams } from "react-router";
import type { Route } from "./+types/works";

import { ArrowLeft } from "lucide-react";

import { WorksHeader, WorksVideosList } from "~/components/works";
import Question from "~/components/Question";
import { videosConfig } from "~/config/videos";

const supportedLanguages = ["ru", "et", "en"] as const;

type SupportedLanguage = (typeof supportedLanguages)[number];

const BASE_URL = "https://yourdomain.com";

const seo = {
  et: {
    title: "Videograafi portfoolio | Pulmad, brändid ja üritused",

    description:
      "Vaata valikut videoprojektidest: pulmafilmid, brändivideod, üritused ja sotsiaalmeedia sisu. Professionaalne videograafia üle Euroopa.",

    keywords:
      "videograafi portfoolio, videograaf, pulmafilm, brändivideo, ürituste videograaf, videoproduktsioon, videosisu",

    ogLocale: "et_EE",

    pageName: "Videograafi portfoolio",
  },

  en: {
    title: "Videography Portfolio | Weddings, Brands & Events",

    description:
      "Explore selected video work across weddings, brands, events, and social media. Professional videography and video production across Europe.",

    keywords:
      "videography portfolio, videographer, wedding film, brand video, event videographer, video production, social media video",

    ogLocale: "en_GB",

    pageName: "Videography Portfolio",
  },

  ru: {
    title: "Портфолио видеографа | Свадьбы, бренды и мероприятия",

    description:
      "Примеры видеоработ: свадебные фильмы, проекты для брендов, мероприятия и видео для социальных сетей. Профессиональная видеосъёмка по всей Европе.",

    keywords:
      "портфолио видеографа, видеограф, свадебный фильм, видео для брендов, съёмка мероприятий, видеопродакшн, видео для соцсетей",

    ogLocale: "ru_RU",

    pageName: "Портфолио видеографа",
  },
} as const;

function getLanguage(lang: string | undefined): SupportedLanguage {
  if (lang === "et" || lang === "en" || lang === "ru") {
    return lang;
  }

  return "et";
}

export const loader = async ({}: Route.LoaderArgs) => {
  console.log("Works route intercepted");

  return null;
};

export function meta({ params }: Route.MetaArgs) {
  const lang = getLanguage(params.lang);

  const { title, description, keywords, ogLocale } = seo[lang];

  const url = `${BASE_URL}/${lang}/works`;
  const image = `${BASE_URL}/og-image.jpg`;

  return [
    // Basic SEO
    {
      title,
    },

    {
      name: "description",
      content: description,
    },

    {
      name: "keywords",
      content: keywords,
    },

    // Open Graph
    {
      property: "og:title",
      content: title,
    },

    {
      property: "og:description",
      content: description,
    },

    {
      property: "og:type",
      content: "website",
    },

    {
      property: "og:url",
      content: url,
    },

    {
      property: "og:image",
      content: image,
    },

    {
      property: "og:locale",
      content: ogLocale,
    },

    // Twitter / X
    {
      name: "twitter:card",
      content: "summary_large_image",
    },

    {
      name: "twitter:title",
      content: title,
    },

    {
      name: "twitter:description",
      content: description,
    },

    {
      name: "twitter:image",
      content: image,
    },

    // Search engines
    {
      name: "robots",
      content: "index, follow",
    },
  ];
}

const WorksRoute = () => {
  const { lang } = useParams();

  const currentLang = getLanguage(lang);

  const { title, description, pageName } = seo[currentLang];

  const url = `${BASE_URL}/${currentLang}/works`;

  /*
   * Create a VideoObject for every portfolio video.
   *
   * Mux thumbnail:
   * https://image.mux.com/{PLAYBACK_ID}/thumbnail.jpg
   *
   * Mux HLS stream:
   * https://stream.mux.com/{PLAYBACK_ID}.m3u8
   *
   * Mux embedded player:
   * https://player.mux.com/{PLAYBACK_ID}
   */
  const videoStructuredData = videosConfig.map((video) => ({
    "@type": "VideoObject",

    "@id": `${url}#video-${video.playbackId}`,

    name: video.title[currentLang],

    description: video.description[currentLang],

    thumbnailUrl: [`https://image.mux.com/${video.playbackId}/thumbnail.jpg`],

    uploadDate: video.uploadDate,

    contentUrl: `https://stream.mux.com/${video.playbackId}.m3u8`,

    embedUrl: `https://player.mux.com/${video.playbackId}`,

    inLanguage: currentLang,

    creator: {
      "@type": "Person",
      name: "Kirill Bagrin",
      url: BASE_URL,
    },
  }));

  const structuredData = {
    "@context": "https://schema.org",

    "@graph": [
      /*
       * Portfolio page
       */
      {
        "@type": "CollectionPage",

        "@id": `${url}#webpage`,

        url,

        name: pageName,

        headline: title,

        description,

        inLanguage: currentLang,

        isPartOf: {
          "@id": `${BASE_URL}/#website`,
        },

        about: {
          "@id": `${BASE_URL}/#videography-service`,
        },

        /*
         * Connect the portfolio page with the videos below.
         */
        hasPart: videosConfig.map((video) => ({
          "@id": `${url}#video-${video.playbackId}`,
        })),
      },

      /*
       * Individual videos
       */
      ...videoStructuredData,

      /*
       * Breadcrumbs
       */
      {
        "@type": "BreadcrumbList",

        "@id": `${url}#breadcrumb`,

        itemListElement: [
          {
            "@type": "ListItem",

            position: 1,

            name:
              currentLang === "et"
                ? "Avaleht"
                : currentLang === "ru"
                  ? "Главная"
                  : "Home",

            item: `${BASE_URL}/${currentLang}`,
          },

          {
            "@type": "ListItem",

            position: 2,

            name: pageName,

            item: url,
          },
        ],
      },
    ],
  };

  const getValidPath = () => {
    return `/${currentLang}`;
  };

  return (
    <>
      {/* Canonical */}
      <link rel="canonical" href={`${BASE_URL}/${currentLang}/works`} />

      {/* Language alternatives */}
      <link rel="alternate" hrefLang="et" href={`${BASE_URL}/et/works`} />

      <link rel="alternate" hrefLang="en" href={`${BASE_URL}/en/works`} />

      <link rel="alternate" hrefLang="ru" href={`${BASE_URL}/ru/works`} />

      <link
        rel="alternate"
        hrefLang="x-default"
        href={`${BASE_URL}/en/works`}
      />

      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <main>
        <section>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-5">
            <Link
              to={getValidPath()}
              className="flex items-center justify-start gap-x-2 text-blue-500"
            >
              <ArrowLeft />

              {currentLang === "et"
                ? "Tagasi avalehele"
                : currentLang === "ru"
                  ? "На главную"
                  : "Back to home"}
            </Link>
          </div>
        </section>

        <WorksHeader />

        <WorksVideosList />

        <Question
          headerText="Your story could be next"
          subHeaderText="Tell me what you have in mind. Let's make it a film."
        />
      </main>
    </>
  );
};

export default WorksRoute;
