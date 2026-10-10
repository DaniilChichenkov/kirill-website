import MuxPlayer from "@mux/mux-player-react/lazy";
import { useParams } from "react-router";

import normalizeLanguage from "~/utils/normalizeLanguage";
import { videosConfig } from "~/config/videos";

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
                    videoTitle={item.title[normalizedLang]}
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
