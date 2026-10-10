import { useEffect } from "react";
import { redirect, useLocation } from "react-router";

import isLangShouldBeNormalized from "~/utils/isLangShouldBeNormalized";
import normalizeLanguage from "~/utils/normalizeLanguage";

import type { Route } from "./+types/home";

import { Hero, NiceText, Portfolio, Questions, Feedback } from "~/components";

const translations = {
  estimateProjectHeader: {
    et: "Hinda oma projekti maksumust",
    en: "Estimate Your Project",
    ru: "Рассчитайте стоимость вашего проекта",
  },

  estimateProjectSubheader: {
    et: "Vasta mõnele kiirele küsimusele ja saad kohe teada oma videoprojekti hinnangulise hinnavahemiku.",
    en: "Answer a few quick questions below to see an instant estimated price range for your videography needs.",
    ru: "Ответьте на несколько коротких вопросов ниже, чтобы сразу узнать ориентировочный диапазон стоимости вашего видеопроекта.",
  },
} as const;

const supportedLanguages = ["et", "en", "ru"] as const;

type SupportedLanguage = (typeof supportedLanguages)[number];

const BASE_URL = "https://yourdomain.com";

const seo = {
  et: {
    title: "Videograaf ja sisulooja | Videoproduktsioon üle Euroopa",
    description:
      "Professionaalne videograafia ja sisuloome brändidele, üritustele ja sotsiaalmeediale üle Euroopa. Rohkem kvaliteetset videosisu ühest võttepäevast.",
    keywords:
      "videograaf, sisulooja, videoproduktsioon, brändivideo, sotsiaalmeedia video, ürituste videograaf, videosisu, videograaf Euroopas",
    ogLocale: "et_EE",
    serviceName: "Videograafia ja sisuloome",
  },

  en: {
    title: "Videographer & Content Creator | Video Production Across Europe",
    description:
      "Professional videography and content creation for brands, events, and social media across Europe. Get more high-quality video content from every shoot.",
    keywords:
      "videographer, content creator, video production, brand video, social media video, event videographer, video content creator, videographer Europe",
    ogLocale: "en_GB",
    serviceName: "Videography and Content Creation",
  },

  ru: {
    title: "Видеограф | Видеосъёмка по всей Европе",
    description:
      "Профессиональная видеосъёмка для брендов, мероприятий и социальных сетей по всей Европе. Больше качественного видеоконтента с каждого съёмочного дня.",
    keywords:
      "видеограф, видеосъёмка, видеопродакшн, создание контента, видео для брендов, видео для соцсетей, видеограф мероприятий, видеограф в Европе",
    ogLocale: "ru_RU",
    serviceName: "Видеосъёмка и создание контента",
  },
} as const;

function getLanguage(lang: string | undefined): SupportedLanguage {
  if (lang === "et" || lang === "en" || lang === "ru") {
    return lang;
  }

  return "et";
}

export async function loader({ params }: Route.LoaderArgs) {
  const { lang } = params;

  if (isLangShouldBeNormalized(lang)) {
    const normalizedLang = normalizeLanguage(lang);
    return redirect(`/${normalizedLang}`, { status: 301 });
  }

  return null;
}

export function meta({ params }: Route.MetaArgs) {
  const lang = getLanguage(params.lang);

  const { title, description, keywords, ogLocale } = seo[lang];

  const url = `${BASE_URL}/${lang}`;
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

const HomeRoute = ({ params }: Route.ComponentProps) => {
  const location = useLocation();

  const lang = getLanguage(params.lang);
  const normalizedLang = normalizeLanguage(lang!);

  const { description, serviceName } = seo[lang];

  const structuredData = {
    "@context": "https://schema.org",

    "@graph": [
      {
        "@type": "Organization",
        "@id": `${BASE_URL}/#organization`,

        name: "YOUR BUSINESS NAME",

        url: BASE_URL,

        logo: `${BASE_URL}/logo.png`,

        description,

        sameAs: [
          "https://www.instagram.com/YOUR_USERNAME",
          "https://www.tiktok.com/@YOUR_USERNAME",
        ],
      },

      {
        "@type": "Service",
        "@id": `${BASE_URL}/#videography-service`,

        name: serviceName,

        description,

        provider: {
          "@id": `${BASE_URL}/#organization`,
        },

        areaServed: {
          "@type": "Place",
          name: "Europe",
        },

        serviceType: [
          "Videography",
          "Video Production",
          "Brand Video Production",
          "Event Videography",
          "Social Media Content",
        ],
      },
    ],
  };

  useEffect(() => {
    if (location.state?.scrollTo) {
      document.querySelector(location.state.scrollTo)?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [location.key]);

  return (
    <>
      {/* Canonical URL */}
      <link rel="canonical" href={`${BASE_URL}/${lang}`} />

      {/* Language alternatives */}
      <link rel="alternate" hrefLang="et" href={`${BASE_URL}/et`} />

      <link rel="alternate" hrefLang="en" href={`${BASE_URL}/en`} />

      <link rel="alternate" hrefLang="ru" href={`${BASE_URL}/ru`} />

      {/* Default language */}
      <link rel="alternate" hrefLang="x-default" href={`${BASE_URL}/en`} />

      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <main className="wrap-break-word">
        <Hero />

        <Questions
          headerText={translations.estimateProjectHeader[normalizedLang]}
          subHeaderText={translations.estimateProjectSubheader[normalizedLang]}
        />

        <Feedback />

        <NiceText />

        <Portfolio />
      </main>
    </>
  );
};

export default HomeRoute;
