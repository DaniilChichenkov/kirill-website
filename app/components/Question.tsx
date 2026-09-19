import {
  ArrowLeft,
  ArrowRight,
  CircleCheck,
  Euro,
  RotateCcw,
} from "lucide-react";
import { useState } from "react";

const ResultEstimate = ({ price }: { price: number }) => {
  return (
    <div className="w-full flex flex-col items-center mt-0 gap-y-3">
      <div className="divider my-0 py-0 pb-3"></div>
      <p className="w-full text-sm text-pretty text-gray-700 uppercase tracking-wider text-left">
        Your estimated price
      </p>
      <p className="w-full text-3xl font-bold text-blue-500 flex items-center gap-x-1">
        {price} <Euro />
      </p>
      <p className="w-full text-left text-bold text-lg text-gray-900">
        An approximate based on your answers.
      </p>
      <p className="text-pretty text-gray-700 text-sm">
        Your final quote depends on filming time, location and editing
        requirement
      </p>
      <button className="w-full mt-2 flex justify-center items-center gap-x-3 border border-blue-500 bg-blue-500 px-5 py-3 mx-auto font-medium text-white shadow-sm transition-colors hover:bg-blue-600">
        Request an exact quote <ArrowRight />
      </button>
      <p className="text-sm text-pretty text-gray-700 mx-auto">
        No commitment. Lets talk through the details.
      </p>
    </div>
  );
};

const questionsMap = new Map([
  [
    0,
    {
      questionText: "What type of video do you need?",
      questionHint: "Choose one to continue",
      answers: [
        { answerText: "Wedding", answerValue: 10 },
        { answerText: "Commercial", answerValue: 20 },
        { answerText: "Add", answerValue: 30 },
      ],
    },
  ],

  [
    1,
    {
      questionText: "Will we record inside our outside?",
      questionHint: "Choose one to continue",
      answers: [
        { answerText: "Outside", answerValue: 20 },
        { answerText: "Inside", answerValue: 10 },
      ],
    },
  ],

  [
    2,
    {
      questionText: "How long should video be?",
      questionHint: "Choose approximate option",
      answers: [
        { answerText: "10 minutes", answerValue: 10 },
        { answerText: "20 minutes", answerValue: 20 },
        { answerText: "30 minutes", answerValue: 30 },
        { answerText: "Longer", answerValue: 50 },
      ],
    },
  ],

  [
    3,
    {
      questionText: "Do you want capture on professional camera?",
      questionHint: "Choose one to continue",
      answers: [
        { answerText: "Yes", answerValue: 30 },
        { answerText: "No", answerValue: 10 },
      ],
    },
  ],

  [
    4,
    {
      questionText: "Do you wish to get source files?",
      questionHint: "Choose one to continue",
      answers: [
        { answerText: "Yes", answerValue: 30 },
        { answerText: "No", answerValue: 10 },
      ],
    },
  ],
]);

const Question = () => {
  const [currentQuestionId, setCurrentQuestionId] = useState(0);
  const currentQuestion = questionsMap.get(currentQuestionId);

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
          answerValue: selectedAnswer.answerValue,
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
      let sum = 0;
      selectedAnswers.forEach((item) => {
        sum += item.answerValue;
      });
      return sum;
    }
  };

  const startQuizAgain = () => {
    setCurrentQuestionId(0);
    setSelectedAnswers([]);
  };

  return (
    <section className="bg-blue-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="md:py-4">
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 sm:text-3xl text-left">
              What are we creating?
            </h2>

            <p className="mt-4 text-pretty text-gray-700">
              A few quick questions to plan your film.
            </p>
          </div>

          <div>
            <div className="card w-full bg-base-100 card-md shadow-sm">
              <div className="card-body">
                <div className="w-full flex justify-between items-start">
                  {showResult ? (
                    <button
                      onClick={startQuizAgain}
                      className="cursor-pointer flex justify-between items-center gap-x-1 text-blue-500 font-semibold"
                    >
                      {" "}
                      <RotateCcw /> start again
                    </button>
                  ) : (
                    <button
                      onClick={handleBackBtnClick}
                      className={`cursor-pointer flex justify-between items-center gap-x-1 text-blue-500 font-semibold ${currentQuestionId === 0 && "invisible"}`}
                    >
                      <ArrowLeft />
                      Back
                    </button>
                  )}

                  {showResult ? (
                    <div className="flex justify-end items-center gap-x-2 text-blue-500">
                      <CircleCheck />
                      <p className="text-right">Estimate ready</p>
                    </div>
                  ) : (
                    <div
                      role="progressbar"
                      aria-valuenow={currentQuestionId}
                      aria-valuemin={0}
                      aria-valuemax={questionsMap.size}
                      aria-label="Progress"
                      className="w-8/12"
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
                      {currentQuestion?.questionText}
                    </h2>
                    <p className="w-full text-left">
                      {currentQuestion?.questionHint}
                    </p>
                  </>
                )}
                <div className="w-full flex flex-col items-start gap-y-3 mt-5">
                  {showResult ? (
                    <ResultEstimate price={calculateResult()!} />
                  ) : (
                    currentQuestion?.answers?.map(
                      (answerOption, answerIndex) => (
                        <button
                          onClick={() => handleAnswerBtnClick(answerIndex)}
                          key={answerOption.answerText}
                          className="btn w-full btn-lg flex justify-between items-center"
                        >
                          {answerOption.answerText}
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
