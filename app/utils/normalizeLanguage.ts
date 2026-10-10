const allowedLangs = ["en", "et", "ru"];

export default function normalizeLanguage(lang: string) {
  let normalizedLang;

  if (!lang || !allowedLangs.includes(lang)) {
    normalizedLang = "et";
  } else {
    normalizedLang = lang;
  }

  return normalizedLang as "et" | "en" | "ru";
}
