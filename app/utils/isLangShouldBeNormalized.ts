const allowedLangs = ["en", "et", "ru"];

export default function isLangShouldBeNormalized(lang: string) {
  if (!lang || !allowedLangs.includes(lang)) {
    return true;
  }
  return false;
}
