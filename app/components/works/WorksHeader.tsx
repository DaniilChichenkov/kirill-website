import { useParams } from "react-router";
import normalizeLanguage from "~/utils/normalizeLanguage";

const translations = {
  portfolioEyebrow: {
    et: "Portfoolio",
    en: "The Portfolio",
    ru: "Портфолио",
  },

  portfolioTitleStart: {
    et: "Lood",
    en: "Stories in",
    ru: "Истории",
  },

  portfolioTitleHighlight: {
    et: "liikumises.",
    en: "motion.",
    ru: "в движении.",
  },

  portfolioDescription: {
    et: "Pulmapäevad, julged brändid ja hetked, mida tasub hoida.",
    en: "Wedding days, bold brands, and moments worth keeping.",
    ru: "Свадебные дни, яркие бренды и моменты, которые хочется сохранить.",
  },
} as const;

const WorksHeader = () => {
  const { lang } = useParams();
  const normalizedLang = normalizeLanguage(lang!);

  return (
    <section className="bg-white lg:grid lg:place-content-center">
      <div className="mx-auto w-screen max-w-7xl px-4 pt-5 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-prose text-center">
          <p className="text-xs text-pretty text-gray-700 sm:text-lg/relaxed uppercase tracking-wider mt-10">
            {translations.portfolioEyebrow[normalizedLang]}
          </p>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 sm:text-5xl mt-4 md:mt-5">
            {translations.portfolioTitleStart[normalizedLang]}
            <strong className="text-blue-500">
              {" "}
              {translations.portfolioTitleHighlight[normalizedLang]}{" "}
            </strong>
          </h1>

          <p className="mt-4 text-base text-pretty text-gray-700 sm:text-lg/relaxed">
            {translations.portfolioDescription[normalizedLang]}
          </p>
        </div>
      </div>
    </section>
  );
};

export default WorksHeader;
