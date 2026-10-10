import { Link, redirect, useParams } from "react-router";
import type { Route } from "./+types/works";

import { WorksHeader, WorksVideosList } from "~/components/works";
import { ArrowLeft } from "lucide-react";
import Question from "~/components/Question";
import isLangShouldBeNormalized from "~/utils/isLangShouldBeNormalized";
import normalizeLanguage from "~/utils/normalizeLanguage";

const supportedLanguages = ["ru", "et", "en"] as const;

type SupportedLanguage = (typeof supportedLanguages)[number];

const translations = {
  backToHome: {
    et: "Tagasi avalehele",
    en: "Back to home",
    ru: "На главную",
  },
  storyCouldBeNext: {
    et: "Järgmine lugu võiks olla sinu oma",
    en: "Your story could be next",
    ru: "Следующей может стать ваша история",
  },

  tellMeYourIdea: {
    et: "Räägi mulle oma ideest. Teeme sellest filmi.",
    en: "Tell me what you have in mind. Let's make it a film.",
    ru: "Расскажите, что вы задумали. Давайте превратим это в фильм.",
  },
};

const BASE_URL = "https://yourdomain.com";

const seo = {
  et: {
    title: "Videograafi portfoolio | Pulmad, brändid ja üritused",
    description:
      "Vaata valikut videoprojektidest: pulmafilmid, brändivideod, üritused ja sotsiaalmeedia sisu. Professionaalne videograafia üle Euroopa.",
    keywords:
      "videograafi portfoolio, videograaf, pulmafilm, brändivideo, ürituste videograaf, videoproduktsioon, videosisu",
    ogLocale: "et_EE",
  },

  en: {
    title: "Videography Portfolio | Weddings, Brands & Events",
    description:
      "Explore selected video work across weddings, brands, events, and social media. Professional videography and video production across Europe.",
    keywords:
      "videography portfolio, videographer, wedding film, brand video, event videographer, video production, social media video",
    ogLocale: "en_GB",
  },

  ru: {
    title: "Портфолио видеографа | Свадьбы, бренды и мероприятия",
    description:
      "Примеры видеоработ: свадебные фильмы, проекты для брендов, мероприятия и видео для социальных сетей. Профессиональная видеосъёмка по всей Европе.",
    keywords:
      "портфолио видеографа, видеограф, свадебный фильм, видео для брендов, съёмка мероприятий, видеопродакшн, видео для соцсетей",
    ogLocale: "ru_RU",
  },
} as const;

function getLanguage(lang: string | undefined): SupportedLanguage {
  if (lang === "et" || lang === "en" || lang === "ru") {
    return lang;
  }

  return "et";
}

export const loader = async ({ params }: Route.LoaderArgs) => {
  const { lang } = params;

  if (isLangShouldBeNormalized(lang)) {
    const normalizedLang = normalizeLanguage(lang);
    return redirect(`/${normalizedLang}`, { status: 301 });
  }

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
  const normalizedLang = normalizeLanguage(lang!);

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

      <main className="wrap-break-word">
        <section>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-5">
            <Link
              to={getValidPath()}
              className="flex items-center justify-start gap-x-2 text-blue-500"
            >
              <ArrowLeft />
              {translations.backToHome[normalizedLang]}
            </Link>
          </div>
        </section>

        <WorksHeader />

        <WorksVideosList />

        <Question
          headerText={translations.storyCouldBeNext[normalizedLang]}
          subHeaderText={translations.tellMeYourIdea[normalizedLang]}
        />
      </main>
    </>
  );
};

export default WorksRoute;
