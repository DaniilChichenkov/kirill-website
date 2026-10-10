import isLangShouldBeNormalized from "~/utils/isLangShouldBeNormalized";
import type { Route } from "./+types/privacy";
import normalizeLanguage from "~/utils/normalizeLanguage";
import { Link, redirect, useParams } from "react-router";
import { UserRound, MessageCircle, Send, ArrowLeft, Mail } from "lucide-react";

const supportedLanguages = ["et", "en", "ru"] as const;

type SupportedLanguage = (typeof supportedLanguages)[number];

const BASE_URL = "https://yourdomain.com";
const PRIVACY_PATH = "privacy-policy";

const seo = {
  et: {
    title: "Privaatsuspoliitika | Kirill Bagrin",
    description:
      "Loe, kuidas Kirill Bagrin töötleb selle veebisaidi kaudu esitatud isikuandmeid ning kuidas kasutatakse Telegrami ja Muxi teenuseid.",
    ogLocale: "et_EE",
    pageName: "Privaatsuspoliitika",
  },

  en: {
    title: "Privacy Policy | Kirill Bagrin",
    description:
      "Learn how Kirill Bagrin handles personal data submitted through this website, including contact form enquiries and the use of Telegram and Mux.",
    ogLocale: "en_GB",
    pageName: "Privacy Policy",
  },

  ru: {
    title: "Политика конфиденциальности | Кирилл Багрин",
    description:
      "Узнайте, как Кирилл Багрин обрабатывает персональные данные, отправленные через этот сайт, включая запросы через форму и использование Telegram и Mux.",
    ogLocale: "ru_RU",
    pageName: "Политика конфиденциальности",
  },
} as const;

export function meta({ params }: Route.MetaArgs) {
  const lang = getLanguage(params.lang);

  const { title, description, ogLocale } = seo[lang];

  const url = `${BASE_URL}/${lang}/${PRIVACY_PATH}`;
  const image = `${BASE_URL}/og-image.jpg`;

  return [
    {
      title,
    },

    {
      name: "description",
      content: description,
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

const featuresConfig = [
  {
    icon: <UserRound />,
    text: {
      et: "Mida sa jagad",
      en: "What you share",
      ru: "Какие данные вы предоставляете",
    },
    desc: {
      et: "Täisnimi, e-posti aadress ja telefoninumber",
      en: "Full name, email, phone number",
      ru: "Полное имя, электронная почта и номер телефона",
    },
  },
  {
    icon: <MessageCircle />,
    text: {
      et: "Miks neid vaja on",
      en: "Why it's needed",
      ru: "Зачем нужны эти данные",
    },
    desc: {
      et: "Sinu päringule vastamiseks",
      en: "To respond to your enquiry",
      ru: "Чтобы ответить на ваш запрос",
    },
  },
  {
    icon: <Send />,
    text: {
      et: "Kuidas andmed minuni jõuavad",
      en: "How it reaches me",
      ru: "Как данные поступают ко мне",
    },
    desc: {
      et: "Telegrami boti kaudu",
      en: "Via a Telegram bot",
      ru: "Через Telegram-бота",
    },
  },
];

const stepsConfig = [
  {
    header: {
      et: "Kes vastutab sinu andmete eest",
      en: "Who is responsible for your data",
      ru: "Кто отвечает за ваши данные",
    },
    paragraphs: [
      {
        content: {
          et: "Minu nimi on Kirill Bagrin. Olen sõltumatu vabakutseline videograaf ning vastutan selle veebisaidi kaudu esitatud isikuandmete töötlemise eest. Kui sul on küsimusi oma andmete kasutamise kohta, saad minuga ühendust võtta allolevate kontaktide kaudu.",
          en: "My name is Kirill Bagrin. I am an independent freelance videographer and the data controller responsible for processing personal information submitted through this website. If you have questions about how your information is handled, you can contact me using the details below.",
          ru: "Меня зовут Кирилл Багрин. Я независимый видеограф, работающий на фрилансе, и отвечаю за обработку персональных данных, отправленных через этот сайт. Если у вас есть вопросы об использовании ваших данных, вы можете связаться со мной по указанным ниже контактам.",
        },
      },
      {
        content: {
          et: "E-post: bagrinkir@gmail.com",
          en: "Email: bagrinkir@gmail.com",
          ru: "Электронная почта: bagrinkir@gmail.com",
        },
      },
      {
        content: {
          et: "Telefon: +372 5745 0047",
          en: "Phone: +372 5745 0047",
          ru: "Телефон: +372 5745 0047",
        },
      },
      {
        content: {
          et: "LinkedIn: https://www.linkedin.com/in/bagrinportfolio/",
          en: "LinkedIn: https://www.linkedin.com/in/bagrinportfolio/",
          ru: "LinkedIn: https://www.linkedin.com/in/bagrinportfolio/",
        },
      },
    ],
  },
  {
    header: {
      et: "Milliseid andmeid ma kogun",
      en: "What information I collect",
      ru: "Какие данные я собираю",
    },
    paragraphs: [
      {
        content: {
          et: "Kui saadad selle veebisaidi kontaktivormi kaudu päringu, kogun sinu täisnime, e-posti aadressi ja telefoninumbri. Neid andmeid on vaja sinu päringu tuvastamiseks ja sinuga ühenduse võtmiseks.",
          en: "When you submit an enquiry through the contact form on this website, I collect your full name, email address, and phone number. This information is needed to identify your enquiry and get in touch with you.",
          ru: "При отправке запроса через контактную форму на этом сайте я собираю ваше полное имя, адрес электронной почты и номер телефона. Эти данные необходимы для обработки вашего запроса и связи с вами.",
        },
      },
      {
        content: {
          et: "Andmete esitamine on vabatahtlik, kuid ilma vajalike kontaktandmeteta ei pruugi mul olla võimalik sinu päringule vastata.",
          en: "Providing this information is voluntary, but without the necessary contact details, I may not be able to respond to your enquiry.",
          ru: "Предоставление этих данных является добровольным, однако без необходимых контактных данных я могу не иметь возможности ответить на ваш запрос.",
        },
      },
    ],
  },
  {
    header: {
      et: "Kuidas ma sinu andmeid kasutan",
      en: "How I use your information",
      ru: "Как я использую ваши данные",
    },
    paragraphs: [
      {
        content: {
          et: "Kasutan sinu kontaktandmeid ainult päringule vastamiseks, soovitud videograafiateenuse arutamiseks ja võimaliku koostöö korraldamiseks. Ma ei kasuta neid andmeid reklaami ega soovimatute turundussõnumite saatmiseks.",
          en: "I use your contact details only to respond to your enquiry, discuss the videography services you are interested in, and arrange potential work together. I do not use this information for advertising or unsolicited marketing messages.",
          ru: "Я использую ваши контактные данные только для ответа на запрос, обсуждения интересующих вас услуг видеосъёмки и организации возможного сотрудничества. Я не использую эти данные для рекламы или отправки нежелательных маркетинговых сообщений.",
        },
      },
      {
        content: {
          et: "Isikuandmete töötlemise õiguslik alus on sinu taotlusel lepingueelsete toimingute tegemine vastavalt isikuandmete kaitse üldmääruse (GDPR) artikli 6 lõike 1 punktile b.",
          en: "The legal basis for processing your enquiry is taking steps at your request before entering into a potential contract, under Article 6(1)(b) of the General Data Protection Regulation (GDPR).",
          ru: "Правовым основанием для обработки вашего запроса является принятие мер по вашему запросу до возможного заключения договора в соответствии со статьёй 6(1)(b) Общего регламента по защите данных (GDPR).",
        },
      },
    ],
  },
  {
    header: {
      et: "Päringute edastamine Telegrami kaudu",
      en: "Enquiry processing through Telegram",
      ru: "Обработка запросов через Telegram",
    },
    paragraphs: [
      {
        content: {
          et: "Kui saadad kontaktivormi kaudu päringu, edastatakse sinu nimi, e-posti aadress ja telefoninumber mulle Telegrami boti kaudu. See võimaldab mul sinu päringu kätte saada ja sellele vastata.",
          en: "When you submit the contact form, your name, email address, and phone number are forwarded to me through a Telegram bot. This allows me to receive your enquiry and respond to it.",
          ru: "При отправке контактной формы ваше имя, адрес электронной почты и номер телефона передаются мне через Telegram-бота. Это позволяет мне получать ваши запросы и отвечать на них.",
        },
      },
      {
        content: {
          et: "Telegram on kolmanda osapoole sõnumiteenus, mis töötleb ja salvestab edastatud sõnumeid oma pilvepõhises infrastruktuuris. Andmete töötlemine võib toimuda erinevates riikides vastavalt Telegrami privaatsuspoliitikale.",
          en: "Telegram is a third-party messaging service that processes and stores the resulting messages using its cloud infrastructure. Data processing may involve different countries, as described in Telegram's privacy policy.",
          ru: "Telegram — сторонний сервис обмена сообщениями, который обрабатывает и хранит полученные сообщения в своей облачной инфраструктуре. Обработка данных может осуществляться в разных странах в соответствии с политикой конфиденциальности Telegram.",
        },
      },
      {
        content: {
          et: "Telegrami privaatsuspoliitika: https://telegram.org/privacy",
          en: "Telegram privacy policy: https://telegram.org/privacy",
          ru: "Политика конфиденциальности Telegram: https://telegram.org/privacy",
        },
      },
    ],
  },
  {
    header: {
      et: "Kui kaua ma andmeid säilitan",
      en: "How long I keep your information",
      ru: "Как долго я храню ваши данные",
    },
    paragraphs: [
      {
        content: {
          et: "Säilitan päringute kontaktandmeid ja nendega seotud Telegrami sõnumeid ainult seni, kuni see on vajalik sinu päringu käsitlemiseks ja sellega seotud suhtluseks. Kui andmeid enam ei vajata, kustutan need, välja arvatud juhul, kui seadus nõuab pikemat säilitamist.",
          en: "I keep enquiry contact details and related Telegram messages only for as long as necessary to handle your request and any related communication. When the information is no longer needed, I delete it unless a longer retention period is required by law.",
          ru: "Я храню контактные данные из запросов и связанные с ними сообщения Telegram только в течение времени, необходимого для обработки запроса и последующего общения. Когда данные больше не нужны, я удаляю их, если законодательство не требует более длительного хранения.",
        },
      },
    ],
  },
  {
    header: {
      et: "Sinu õigused",
      en: "Your rights",
      ru: "Ваши права",
    },
    paragraphs: [
      {
        content: {
          et: "Sul on õigus taotleda juurdepääsu oma isikuandmetele, nende parandamist või kustutamist. Asjakohastel juhtudel on sul ka õigus andmete töötlemise piiramisele, töötlemisele vastuväidete esitamisele ja andmete ülekandmisele.",
          en: "You have the right to request access to your personal data, have it corrected, or ask for its deletion. Where applicable, you may also request restriction of processing, object to processing, or request data portability.",
          ru: "Вы имеете право запросить доступ к своим персональным данным, их исправление или удаление. В предусмотренных законом случаях вы также можете потребовать ограничения обработки, возразить против обработки или запросить перенос данных.",
        },
      },
      {
        content: {
          et: "Oma õiguste kasutamiseks või privaatsusega seotud küsimuste esitamiseks kirjuta mulle aadressil bagrinkir@gmail.com. Samuti on sul õigus esitada kaebus pädevale andmekaitse järelevalveasutusele.",
          en: "To exercise your rights or ask any privacy-related questions, please contact me at bagrinkir@gmail.com. You also have the right to lodge a complaint with the relevant data protection supervisory authority.",
          ru: "Чтобы воспользоваться своими правами или задать вопросы о конфиденциальности, напишите мне на адрес bagrinkir@gmail.com. Вы также имеете право подать жалобу в соответствующий надзорный орган по защите персональных данных.",
        },
      },
    ],
  },
  {
    header: {
      et: "Videote esitamine (Mux)",
      en: "Video playback (Mux)",
      ru: "Воспроизведение видео (Mux)",
    },
    paragraphs: [
      {
        content: {
          et: "Kasutan sellel veebisaidil videote majutamiseks ja esitamiseks Muxi teenust. Video laadimisel või esitamisel loob sinu brauser ühenduse Muxi serveritega.",
          en: "I use Mux to host and display videos on this website. When a video loads or plays, your browser connects to Mux servers.",
          ru: "Для хранения и воспроизведения видео на этом сайте я использую сервис Mux. При загрузке или воспроизведении видео ваш браузер подключается к серверам Mux.",
        },
      },
      {
        content: {
          et: "Mux võib videote edastamiseks töödelda tehnilisi andmeid, sealhulgas sinu IP-aadressi ja brauseri teavet. Need andmed on vajalikud videote laadimiseks ja esitamiseks.",
          en: "Mux may process technical information, including your IP address and browser details, to deliver video content and enable playback.",
          ru: "Mux может обрабатывать техническую информацию, включая ваш IP-адрес и данные браузера, для загрузки и воспроизведения видеоконтента.",
        },
      },
      {
        content: {
          et: "Muxi videopleieris on Mux Data jälgimine ja küpsised keelatud. Samuti ei salvestata helitugevuse ega vaigistamise eelistusi brauseri kohalikku salvestusruumi.",
          en: "Mux Data tracking and cookies are disabled in the video player. Volume and mute preferences are also not saved in your browser's local storage.",
          ru: "В видеоплеере отключены отслеживание Mux Data и файлы cookie. Настройки громкости и отключения звука также не сохраняются в локальном хранилище браузера.",
        },
      },
      {
        content: {
          et: "Muxi privaatsuspoliitika: https://www.mux.com/privacy",
          en: "Mux privacy policy: https://www.mux.com/privacy",
          ru: "Политика конфиденциальности Mux: https://www.mux.com/privacy",
        },
      },
    ],
  },
];

const translations = {
  enquiryAtGlance: {
    et: "Sinu päring lühidalt",
    en: "Your enquiry at a glance",
    ru: "Ваш запрос вкратце",
  },
  backToHome: {
    et: "Tagasi avalehele",
    en: "Back to home",
    ru: "На главную",
  },

  privacyEyebrow: {
    et: "Sinu andmed, selgelt ja arusaadavalt",
    en: "Your information, clearly",
    ru: "Ваши данные — просто и понятно",
  },

  privacyTitleStart: {
    et: "Privaatsus",
    en: "Privacy",
    ru: "Политика",
  },

  privacyTitleHighlight: {
    et: "poliitika.",
    en: "Policy.",
    ru: "конфиденциальности.",
  },

  privacyDescription: {
    et: "Kuidas sinu andmeid kasutatakse, kui võtad minuga ühendust.",
    en: "How your details are used when you get in touch.",
    ru: "Как используются ваши данные, когда вы связываетесь со мной.",
  },

  privacyQuestionsTitle: {
    et: "Kas sul on privaatsuse kohta küsimusi?",
    en: "Questions about your privacy?",
    ru: "Есть вопросы о конфиденциальности?",
  },

  privacyQuestionsDescription: {
    et: "Võta ühendust, kui midagi jääb ebaselgeks.",
    en: "Get in touch if anything is unclear.",
    ru: "Свяжитесь со мной, если что-то осталось непонятным.",
  },
} as const;

const Privacy = () => {
  const { lang } = useParams();

  const normalizedLang = normalizeLanguage(lang!);
  const currentLang = getLanguage(normalizedLang);

  const { title, description, pageName } = seo[currentLang];

  const url = `${BASE_URL}/${currentLang}/${PRIVACY_PATH}`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",

    "@id": `${url}#webpage`,

    url,

    name: pageName,

    headline: title,

    description,

    inLanguage: currentLang,

    about: {
      "@id": `${BASE_URL}/#organization`,
    },
  };

  const getValidPath = () => {
    return `/${currentLang}`;
  };

  return (
    <>
      {/* Canonical */}
      <link
        rel="canonical"
        href={`${BASE_URL}/${currentLang}/${PRIVACY_PATH}`}
      />

      {/* Language alternatives */}
      <link
        rel="alternate"
        hrefLang="et"
        href={`${BASE_URL}/et/${PRIVACY_PATH}`}
      />

      <link
        rel="alternate"
        hrefLang="en"
        href={`${BASE_URL}/en/${PRIVACY_PATH}`}
      />

      <link
        rel="alternate"
        hrefLang="ru"
        href={`${BASE_URL}/ru/${PRIVACY_PATH}`}
      />

      <link
        rel="alternate"
        hrefLang="x-default"
        href={`${BASE_URL}/en/${PRIVACY_PATH}`}
      />

      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <main className="wrap-break-word">
        {/* Header */}
        <section className="bg-blue-50 pt-10 pb-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Link
              to={getValidPath()}
              className="flex items-center justify-start gap-x-2 text-blue-500"
            >
              <ArrowLeft />
              {translations.backToHome[normalizedLang]}
            </Link>
          </div>
          <div className="lg:grid lg:place-content-center">
            <div className="mx-auto w-screen max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-prose text-center">
                <p className="text-xs text-pretty text-gray-700 sm:text-lg/relaxed uppercase tracking-wider mt-10">
                  {/* {translations.portfolioEyebrow[normalizedLang]} */}
                  {translations.privacyEyebrow[normalizedLang]}
                </p>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mt-4 md:mt-5 hyphens-auto">
                  {translations.privacyTitleStart[normalizedLang]}
                  <strong className="text-blue-500">
                    {" "}
                    {translations.privacyTitleHighlight[normalizedLang]}
                  </strong>
                </h1>

                <p className="mt-4 text-base text-pretty text-gray-700 sm:text-lg/relaxed">
                  {translations.privacyDescription[normalizedLang]}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Enquiry at glance */}
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 mt-10">
          <div className="bg-blue-50 p-4 md:p-8 rounded-lg">
            <div className="mx-auto max-w-lg text-center">
              <h2 className="text-3xl/tight font-bold text-gray-900 sm:text-4xl">
                {translations.enquiryAtGlance[normalizedLang]}
              </h2>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3">
              {featuresConfig.map((item) => (
                <div
                  key={item.text[normalizedLang]}
                  className="rounded-lg border border-blue-200 p-6"
                >
                  <div className="inline-flex rounded-lg bg-blue-50 p-3 text-blue-500">
                    {item.icon}
                  </div>

                  <h3 className="mt-4 text-lg font-semibold text-gray-900">
                    {item.text[normalizedLang]}
                  </h3>

                  <p className="mt-2 text-pretty text-gray-700">
                    {item.desc[normalizedLang]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Policy */}
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 flex flex-col gap-y-5 mt-10">
          {stepsConfig.map((item, i, arr) => (
            <div className="w-full" key={item.header[normalizedLang]}>
              <div
                key={item.header[normalizedLang]}
                className="w-full flex justify-start items-start gap-x-4 md:gap-x-10"
              >
                <div>
                  <p className="font-bold text-blue-500 text-xl">0{i + 1}</p>
                </div>

                <div className="flex-1 overflow-auto wrap-break-word">
                  <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
                    {item.header[normalizedLang]}
                  </p>
                  {item.paragraphs.map((par) => (
                    <p
                      key={par.content[normalizedLang]}
                      className="mt-4 text-base text-pretty text-gray-700 sm:text-lg/relaxed"
                    >
                      {par.content[normalizedLang]}
                    </p>
                  ))}
                </div>
              </div>
              {i < arr.length - 1 && <div className="divider p-0 mt-5"></div>}
            </div>
          ))}
        </div>

        {/* Contact email */}
        <div className="bg-blue-50 border-b border-gray-200">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="max-w-prose">
              <div className="flex justify-start items-start gap-x-4 md:gap-x-10">
                <div className="text-blue-500">
                  <Mail size={40} />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-semibold text-gray-900 sm:text-3xl hyphens-auto">
                    {translations.privacyQuestionsTitle[normalizedLang]}
                  </h2>

                  <p className="mt-4 text-pretty text-gray-700 wrap-break-word">
                    {translations.privacyQuestionsDescription[normalizedLang]}
                  </p>

                  <p className="mt-4 text-pretty text-blue-500 font-bold">
                    bagrinkir@gmail.com
                  </p>
                </div>
              </div>
            </div>
            {/* 
          <form
            action="#"
            className="mt-6 flex max-w-xl flex-col gap-4 sm:flex-row sm:items-center"
          >
            <label for="Email" className="flex-1">
              <span className="sr-only"> Email </span>

              <input
                type="email"
                id="Email"
                placeholder="Enter your email"
                className="h-12 w-full rounded border-gray-300 shadow-sm"
              />
            </label>

            <button
              type="submit"
              className="h-12 rounded-sm border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600"
            >
              Sign Up
            </button>
          </form> */}
          </div>
        </div>
      </main>
    </>
  );
};

export default Privacy;
