const languageMap = {
  et: "Est",
  en: "Eng",
  ru: "Rus",
};

export default function userFriendlyLanguage(
  normalizedLang: "et" | "en" | "ru",
) {
  return languageMap[normalizedLang];
}
