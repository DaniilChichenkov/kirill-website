import {
  ArrowLeft,
  ArrowRight,
  Check,
  CircleCheck,
  Euro,
  Plus,
  RotateCcw,
  X,
} from "lucide-react";
import { useRef, useState } from "react";
import { Link, useFetcher, useParams } from "react-router";
import normalizeLanguage from "~/utils/normalizeLanguage";

import locale from "~/translations/Client/question";

const ResultEstimate = ({
  price,
  answers,
}: {
  price: { sumMin: number; sumMax: number; canBeHigher: boolean };
  answers: any[];
}) => {
  const modalRef = useRef<HTMLDialogElement | null>(null);
  const openModal = () => {
    modalRef.current?.showModal();
  };

  const fetcher = useFetcher();

  const closeModal = () => {
    modalRef.current?.close();
    fetcher.reset();
  };
  const answersForSever = answers.map((item) => {
    return {
      question: item.question["en"],
      answer: item.answer["en"],
    };
  });
  const { lang } = useParams();
  const normalizedLang = normalizeLanguage(lang!);

  const handleEnqSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    formData.append("answers", JSON.stringify(answersForSever));

    fetcher.submit(formData, {
      method: "POST",
      action: `/${lang}/enquiry`,
      defaultShouldRevalidate: false,
    });
  };

  return (
    <>
      <div className="w-full flex flex-col items-center mt-0 gap-y-3">
        <div className="divider my-0 py-0 pb-3"></div>
        <p className="w-full text-sm text-pretty text-gray-700 uppercase tracking-wider text-left">
          {locale.estimatedPrice[normalizedLang]}
        </p>
        <p className="w-full text-xl md:text-3xl font-bold text-blue-500 flex items-center gap-x-1">
          <Euro />
          {price.sumMin} -
          <Euro />
          {price.sumMax}
          {price.canBeHigher && <Plus />}
        </p>
        <p className="w-full text-left text-bold text-lg text-gray-900">
          {locale.estimateDisclaimer[normalizedLang]}
        </p>
        <p className="text-pretty text-gray-700 text-sm w-full text-left">
          {locale.estimateDetails[normalizedLang]}
        </p>
        <button
          onClick={openModal}
          className="cursor-pointer w-full mt-2 flex justify-center items-center gap-x-3 border border-blue-500 bg-blue-500 px-5 py-3 mx-auto font-medium text-white shadow-sm transition-colors hover:bg-blue-600"
        >
          {locale.contactMeToday[normalizedLang]} <ArrowRight />
        </button>
        <p className="text-sm text-pretty text-gray-700 mx-auto w-full text-left">
          {locale.noCommitment[normalizedLang]}
        </p>
      </div>

      {/* Form modal */}
      <dialog ref={modalRef} className="modal">
        <div className="modal-box">
          <>
            {fetcher.state === "idle" ? (
              !fetcher.data ? (
                <>
                  <div className="w-full flex justify-between items-center">
                    <p className="text-xs text-pretty text-blue-500 uppercase tracking-wider">
                      {locale.startProject[normalizedLang]}
                    </p>
                    <button className="cursor-pointer" onClick={closeModal}>
                      <X />
                    </button>
                  </div>
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mt-5">
                    {locale.planYourFilmStart[normalizedLang]}
                    <span className="text-blue-500">
                      {" "}
                      {locale.planYourFilmHighlight[normalizedLang]}{" "}
                    </span>
                  </h2>
                  <p className="mt-2 text-base text-pretty text-gray-700">
                    {locale.contactDescription[normalizedLang]}
                  </p>
                  <fetcher.Form
                    method="POST"
                    className="w-full mt-5 flex flex-col items-start wrap-anywhere"
                    onSubmit={handleEnqSubmit}
                  >
                    <fieldset className="fieldset w-full">
                      <legend className="fieldset-legend">
                        {locale.name[normalizedLang]}
                      </legend>
                      <input
                        type="text"
                        className="input w-full"
                        placeholder={locale.fullNamePlaceholder[normalizedLang]}
                        required
                        name="name"
                      />
                      {/* <p className="label">Optional</p> */}
                    </fieldset>

                    <fieldset className="fieldset w-full">
                      <legend className="fieldset-legend">
                        {locale.email[normalizedLang]}
                      </legend>
                      <input
                        type="email"
                        className="input w-full"
                        placeholder="you@example.com"
                        required
                        name="email"
                      />
                      {/* <p className="label">Optional</p> */}
                    </fieldset>

                    <fieldset className="fieldset w-full">
                      <legend className="fieldset-legend">
                        {locale.phoneNumber[normalizedLang]}
                      </legend>
                      <input
                        type="tel"
                        className="input w-full"
                        placeholder={
                          locale.phoneNumberPlaceholder[normalizedLang]
                        }
                        required
                        name="tel"
                      />
                      {/* <p className="label">Optional</p> */}
                    </fieldset>

                    <label className="mt-3 flex w-full items-start gap-3 text-gray-700">
                      <input
                        type="checkbox"
                        required
                        className="checkbox shrink-0"
                      />

                      <span className="min-w-0 wrap-anywhere">
                        {locale.agreeToTerms[normalizedLang]}{" "}
                        <Link
                          to={`/${normalizedLang}/privacy-policy`}
                          className="text-blue-500 underline"
                        >
                          {locale.termsAndConditions[normalizedLang]}
                        </Link>
                      </span>
                    </label>

                    <button className="w-full cursor-pointer mt-5 flex justify-center items-center gap-x-3 border border-blue-500 bg-blue-500 px-5 py-3 mx-auto font-medium text-white shadow-sm transition-colors hover:bg-blue-600">
                      {locale.sendEnquiry[normalizedLang]} <ArrowRight />
                    </button>

                    <Link
                      to={`/${normalizedLang}/privacy-policy`}
                      className="mx-auto mt-5 underline text-gray-700"
                    >
                      {locale.privacyPolicy[normalizedLang]}
                    </Link>
                  </fetcher.Form>
                </>
              ) : fetcher.data && fetcher.data.success ? (
                <>
                  <div className="w-full flex justify-end">
                    <button className="cursor-pointer" onClick={closeModal}>
                      <X />
                    </button>
                  </div>
                  <div className="w-20 h-20 bg-blue-100 rounded-full mx-auto flex justify-center items-center text-blue-500 mt-5">
                    <Check size={40} />
                  </div>
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mt-5 w-full text-center">
                    {locale.enquiry[normalizedLang]}
                    <span className="text-blue-500">
                      {" "}
                      {locale.sent[normalizedLang]}{" "}
                    </span>
                  </h2>
                  <p className="mt-2 text-base text-pretty text-gray-700 w-full text-center">
                    {locale.enquirySentMessage[normalizedLang]}
                  </p>
                  <button
                    onClick={closeModal}
                    className="w-full cursor-pointer mt-5 flex justify-center items-center gap-x-3 border border-blue-500 bg-blue-500 px-5 py-3 mx-auto font-medium text-white shadow-sm transition-colors hover:bg-blue-600"
                  >
                    {locale.backToWebsite[normalizedLang]} <ArrowRight />
                  </button>
                </>
              ) : null
            ) : (
              <div className="w-full py-5 flex justify-center items-center">
                <span className="loading loading-spinner loading-xl"></span>
              </div>
            )}
          </>
        </div>
        <form
          onSubmit={() => fetcher.reset()}
          method="dialog"
          className="modal-backdrop"
        >
          <button>close</button>
        </form>
      </dialog>
    </>
  );
};

const questionsMap = new Map([
  [
    0,
    {
      questionText: {
        et: "Millise projektiga vajad abi?",
        en: "What type of project do you need help with?",
        ru: "С каким проектом вам нужна помощь?",
      },

      questionHint: {
        et: "Jätkamiseks vali üks variant",
        en: "Choose one to continue",
        ru: "Выберите один вариант, чтобы продолжить",
      },

      answers: [
        {
          answerText: {
            et: "Persoonibrändi / sotsiaalmeedia sisu",
            en: "Personal Brand / Social Media Content",
            ru: "Личный бренд / контент для социальных сетей",
          },
        },

        {
          answerText: {
            et: "Reklaam- / promovideo ettevõttele",
            en: "Commercial Business / Promo Video",
            ru: "Коммерческое / промовидео для бизнеса",
          },
        },

        {
          answerText: {
            et: "Ürituse jäädvustamine (konverents, festival, pulm)",
            en: "Event Coverage (Conference, Festival, Wedding)",
            ru: "Съёмка мероприятия (конференция, фестиваль, свадьба)",
          },
        },
      ],
    },
  ],

  [
    1,
    {
      questionText: {
        et: "Milline on projekti eeldatav maht või ajakava?",
        en: "What is your estimated timeline or scale?",
        ru: "Каковы предполагаемые сроки или масштаб проекта?",
      },

      questionHint: {
        et: "Jätkamiseks vali üks variant",
        en: "Choose one to continue",
        ru: "Выберите один вариант, чтобы продолжить",
      },

      answers: [
        {
          answerText: {
            et: "Poolepäevane võte / kiire valmimine",
            en: "Half-day shoot / Quick turnaround",
            ru: "Съёмка на полдня / быстрый результат",
          },
          answerValueMinimum: 250,
          answerValueMaximum: 600,
        },

        {
          answerText: {
            et: "Terve päeva produktsioon / mitu valmis materjali",
            en: "Full-day production / Multiple deliverables",
            ru: "Съёмка на полный день / несколько готовых материалов",
          },
          answerValueMinimum: 500,
          answerValueMaximum: 1200,
        },

        {
          answerText: {
            et: "Mitmepäevane põhjalik jäädvustamine",
            en: "Multi-day comprehensive coverage",
            ru: "Комплексная съёмка в течение нескольких дней",
          },
          answerValueMinimum: 1200,
          answerValueMaximum: 2200,
          canBeHigher: true,
        },
      ],
    },
  ],
]);

const Question = ({
  headerText,
  subHeaderText,
}: {
  headerText: string;
  subHeaderText: string;
}) => {
  const [currentQuestionId, setCurrentQuestionId] = useState(0);
  const currentQuestion = questionsMap.get(currentQuestionId);

  const { lang } = useParams();
  const normalizedLang = normalizeLanguage(lang!);

  const [selectedAnswers, setSelectedAnswers] = useState([]);

  const showResult = currentQuestionId === questionsMap.size;

  const handleAnswerBtnClick = (answerId: number) => {
    const selectedAnswer = currentQuestion?.answers[answerId];

    if (selectedAnswer) {
      setSelectedAnswers((prev) => [
        ...prev,
        {
          question: currentQuestion.questionText,
          answer: selectedAnswer.answerText,
          answerValueMinimum: selectedAnswer.answerValueMinimum ?? 0,
          answerValueMaximum: selectedAnswer.answerValueMaximum ?? 0,
          canBeHigher: selectedAnswer.canBeHigher ?? false,
        },
      ]);
      setCurrentQuestionId((prev) => prev + 1);
    }
  };

  const handleBackBtnClick = () => {
    setSelectedAnswers((prev) => prev.slice(0, currentQuestionId - 1));
    setCurrentQuestionId((prev) => prev - 1);
  };

  const calculateResult = () => {
    if (selectedAnswers.length) {
      let sumMin = 0;
      let sumMax = 0;
      let canBeHigher = false;

      selectedAnswers.forEach((item) => {
        sumMin += item.answerValueMinimum ?? 0;
        sumMax += item.answerValueMaximum ?? 0;
        canBeHigher = item.canBeHigher ?? false;
      });

      return {
        sumMin,
        sumMax,
        canBeHigher,
      };
    }
  };

  const startQuizAgain = () => {
    setCurrentQuestionId(0);
    setSelectedAnswers([]);
  };

  return (
    <section className="bg-blue-50" id="quiz">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="md:py-4">
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 sm:text-3xl text-left">
              {headerText}
            </h2>

            <p className="mt-4 text-pretty text-gray-700">{subHeaderText}</p>
          </div>

          <div>
            <div className="card w-full bg-base-100 card-md shadow-sm">
              <div className="card-body">
                <div className="w-full grid grid-cols-2 md:grid-cols-4">
                  {showResult ? (
                    <button
                      onClick={startQuizAgain}
                      className="cursor-pointer flex justify-start items-center text-blue-500 font-semibold text-left gap-x-2 md:col-span-2"
                    >
                      {" "}
                      <RotateCcw /> {locale.startAgain[normalizedLang]}
                    </button>
                  ) : (
                    <button
                      onClick={handleBackBtnClick}
                      className={`cursor-pointer flex justify-start md:col-span-2 items-center gap-x-2 text-blue-500 font-semibold ${currentQuestionId === 0 && "invisible"}`}
                    >
                      <ArrowLeft />
                      {locale.back[normalizedLang]}
                    </button>
                  )}

                  {showResult ? (
                    <div className="flex justify-end items-center gap-x-2 text-blue-500 md:col-start-3 md:col-span-2 min-w-0 ml-auto">
                      <CircleCheck className="shrink-0" />
                      <p className="text-left">
                        {locale.estimateReady[normalizedLang]}
                      </p>
                    </div>
                  ) : (
                    <div
                      role="progressbar"
                      aria-valuenow={currentQuestionId}
                      aria-valuemin={0}
                      aria-valuemax={questionsMap.size}
                      aria-label="Progress"
                      className="w-full md:col-start-3 md:col-span-2"
                    >
                      <p className="text-sm font-medium text-blue-500">
                        {(currentQuestionId / questionsMap.size) * 100}%
                      </p>

                      <div className="mt-2 h-2 w-full rounded-full bg-gray-200">
                        <div
                          className="h-full rounded-full bg-blue-600"
                          style={{
                            width: `${(currentQuestionId / questionsMap.size) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>

                {!showResult && (
                  <>
                    <h2 className="card-title py-0 mt-5 w-full text-left text-xl font-bold">
                      {currentQuestion?.questionText[normalizedLang]}
                    </h2>
                    <p className="w-full text-left">
                      {currentQuestion?.questionHint[normalizedLang]}
                    </p>
                  </>
                )}
                <div className="w-full flex flex-col items-start gap-y-3 mt-5">
                  {showResult ? (
                    <ResultEstimate
                      price={calculateResult()!}
                      answers={selectedAnswers}
                    />
                  ) : (
                    currentQuestion?.answers?.map(
                      (answerOption, answerIndex) => (
                        <button
                          onClick={() => handleAnswerBtnClick(answerIndex)}
                          key={answerOption.answerText[normalizedLang]}
                          className="btn w-full btn-lg flex justify-between items-center py-14 lg:py-8 text-left"
                        >
                          {answerOption.answerText[normalizedLang]}
                          <ArrowRight color="oklch(62.3% 0.214 259.815)" />
                        </button>
                      ),
                    )
                  )}
                </div>
                <div className="justify-between items-center card-actions"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Question;
