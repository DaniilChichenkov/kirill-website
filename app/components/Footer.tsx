import { Play } from "lucide-react";
import { Link, useParams } from "react-router";

import locale from "~/translations/Client/footer";
import normalizeLanguage from "~/utils/normalizeLanguage";

const Footer = () => {
  const { lang } = useParams();
  const normalizedLang = normalizeLanguage(lang!);

  return (
    <footer>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center md:flex-row sm:flex sm:items-center sm:justify-between">
          <div className="md:flex md:items-center md:gap-12">
            <a className="flex items-center justify-start gap-x-3" href="#">
              <span className="sr-only">Home</span>
              <Play
                fill="oklch(62.3% 0.214 259.815)"
                color="oklch(62.3% 0.214 259.815)"
              />
              <span className="font-bold text-lg uppercase">
                {locale.videographer[normalizedLang]}
              </span>
            </a>
          </div>

          {/* Links */}
          <div className="w-full md:w-auto flex flex-col gap-y-5 md:flex-row justify-start items-center mt-10 gap-x-5 md:mt-0">
            <Link to={`/${normalizedLang}/privacy-policy`}>
              {locale.privacyPolicy[normalizedLang]}
            </Link>
            <a
              href="https://www.instagram.com/kirbagrin/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
            <a
              href="https://www.facebook.com/share/1E2cNTsDFV/?mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook
            </a>
            <a
              href="https://www.linkedin.com/in/bagrinportfolio?utm_source=share_via&utm_content=profile&utm_medium=member_ios"
              target="_blank"
              rel="noopener noreferrer"
            >
              Linkedin
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
