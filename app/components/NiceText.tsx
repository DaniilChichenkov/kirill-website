import { useParams } from "react-router";
import locale from "~/translations/Client/whyMe";
import normalizeLanguage from "~/utils/normalizeLanguage";

const NiceText = () => {
  const { lang } = useParams();
  const normalizedLang = normalizeLanguage(lang!);

  return (
    <section id="whyMe" className="bg-blue-50 wrap-break-word">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 bg-blue-50">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:items-start md:gap-8">
          <div>
            <div className="max-w-prose md:max-w-none">
              <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 sm:text-3xl text-left">
                {locale.whyWorkWithMe[normalizedLang]}
              </h2>

              <p className="mt-4 text-base text-pretty text-gray-700 sm:text-lg/relaxed">
                {locale.whyWorkWithMeSubtitle[normalizedLang]}
              </p>
            </div>
          </div>

          <div className="mt-5 md:mt-0">
            <div className="flex items-start gap-8">
              <p className="text-blue-700 text-xl">01</p>

              <div>
                <h3 className="font-medium text-gray-900 sm:text-lg">
                  {locale.maximumOutputTitle[normalizedLang]}
                </h3>

                <p className="mt-0.5 text-gray-700">
                  {locale.maximumOutputDescription[normalizedLang]}
                </p>
              </div>
            </div>
            <div className="divider"></div>
            <div className="flex items-start gap-8">
              <p className="text-blue-700 text-xl">02</p>

              <div>
                <h3 className="font-medium text-gray-900 sm:text-lg">
                  {locale.modernSocialMediaTitle[normalizedLang]}
                </h3>

                <p className="mt-0.5 text-gray-700">
                  {locale.modernSocialMediaDescription[normalizedLang]}
                </p>
              </div>
            </div>
            <div className="divider"></div>
            <div className="flex items-start gap-8">
              <p className="text-blue-700 text-xl">03</p>

              <div>
                <h3 className="font-medium text-gray-900 sm:text-lg">
                  {locale.clearCommunicationTitle[normalizedLang]}
                </h3>

                <p className="mt-0.5 text-gray-700">
                  {locale.clearCommunicationDescription[normalizedLang]}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NiceText;
