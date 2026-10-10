import { ArrowRight } from "lucide-react";
import MuxPlayer from "@mux/mux-player-react/lazy";

const PLAYBACK_ID = "Fge6pr313Dr7MYzNlHS8024cyL2INEC9rD3qQka7swgA";

import locale from "~/translations/Client/hero";
import { useParams } from "react-router";
import normalizeLanguage from "~/utils/normalizeLanguage";

const Hero = () => {
  const { lang } = useParams();
  const normalizedLang = normalizeLanguage(lang!);

  return (
    <>
      <section className="bg-white lg:grid lg:place-content-center">
        <div className="mx-auto w-screen max-w-7xl px-4 pt-16 sm:px-6 sm:pt-24 pb-16 sm:pb-24 lg:px-8">
          <div className="mx-auto max-w-prose text-center">
            <p className="text-xs text-pretty text-gray-700 sm:text-lg/relaxed uppercase tracking-wider">
              {locale.heroEyebrow[normalizedLang]}
            </p>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 sm:text-5xl mt-4 md:mt-5">
              {locale.heroTitleStart[normalizedLang]}
              <strong className="text-blue-500">
                {" "}
                {locale.heroTitleHighlight[normalizedLang]}{" "}
              </strong>{" "}
              {locale.heroTitleEnd[normalizedLang]}
            </h1>

            <p className="mt-4 text-base text-pretty text-gray-700 sm:text-lg/relaxed">
              {locale.heroDescription[normalizedLang]}
            </p>
          </div>

          {/* Showreel */}
          <div className="block mt-10">
            <MuxPlayer
              playbackId={PLAYBACK_ID}
              className="aspect-video w-full rounded-lg"
              preload="none"
              disableCookies={true}
              disableTracking={true}
              noVolumePref={true}
              noMutedPref={true}
            />
          </div>

          <div className="w-full grid grid-cols-1 lg:grid-cols-3 lg:items-center lg:mt-5">
            <div className="lg:col-span-2">
              <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mt-5 lg:w-11/12">
                {locale.storyTitle[normalizedLang]}
              </h2>
              <p className="mt-4 text-base text-pretty text-gray-700 sm:text-lg/relaxed lg:w-11/12">
                {locale.storyDescription[normalizedLang]}
              </p>
            </div>
            <div className="">
              <button
                onClick={() => {
                  document
                    .querySelector("#quiz")
                    ?.scrollIntoView({ behavior: "smooth", block: "center" });
                }}
                className="cursor-pointer flex items-center justify-center gap-2 mt-5 border border-blue-500 bg-blue-500 px-5 py-3 font-medium text-white shadow-sm transition-colors hover:bg-blue-600"
              >
                {locale.startProject[normalizedLang]} <ArrowRight />
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
