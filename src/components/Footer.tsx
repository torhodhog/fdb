"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Icons } from "./Icons";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTiktok, faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import PopupNewsletter from "./PopupNewsletter";

const Footer = () => {
  const pathname = usePathname() ?? "";
  const pathsToMinimize = ["/verify-email", "/sign-up", "/sign-in"];

  // Nyhetsbrev state og funksjoner
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubscribe = async () => {
    if (!email) {
      setMessage("Vennligst skriv inn en gyldig e-postadresse.");
      return;
    }

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setMessage("Takk for at du meldte deg på nyhetsbrevet!");
        setEmail(""); // Tøm inputfeltet
  
        // Fjern meldingen etter 5 sekunder
        setTimeout(() => {
          setMessage("");
        }, 5000); // 5000 millisekunder = 5 sekunder
      }else {
        setMessage("Noe gikk galt. Vennligst prøv igjen.");
      }
    } catch (error) {
      setMessage("Noe gikk galt. Vennligst prøv igjen.");
    }
  };

  return (
    <footer className="bg-white flex-grow-0">
      <MaxWidthWrapper>
        <div className="border-t border-gray-200">
          {pathsToMinimize.includes(pathname ?? "") ? null : (
            <div className="pb-8 pt-16">
              <div className="flex justify-center">
                <Icons.logo className="h-12 w-auto" />
              </div>
            </div>
          )}
  
          {pathsToMinimize.includes(pathname) ? null : (
            <div>
              <div className="relative flex items-center px-6 py-6 sm:py-8 lg:mt-0">
                <div className="absolute inset-0 overflow-hidden rounded-lg">
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-br bg-opacity-90"
                  />
                </div>
  
                <div className="text-center relative mx-auto max-w-sm">
                  <h3 className="font-semibold text-gray-900">Følg oss</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    via sosiale medier.
                  </p>
                  <div className="space-x-8 mt-8">
                    <a
                      href="https://www.tiktok.com/@fdb343"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FontAwesomeIcon
                        className="text-black hover:text-rose-600 dark:text-rose-600 dark:hover:text-black"
                        icon={faTiktok}
                        size="2x"
                      />
                    </a>
                    <a
                      href="https://www.facebook.com/fotballdraktbutikken"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FontAwesomeIcon
                        className="text-black hover:text-rose-600 dark:text-rose-600 dark:hover:text-black"
                        icon={faFacebook}
                        size="2x"
                      />
                    </a>
                    <a
                      href="https://www.instagram.com/fdb.343/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FontAwesomeIcon
                        className="text-black hover:text-rose-600 dark:text-rose-600 dark:hover:text-black"
                        icon={faInstagram}
                        size="2x"
                      />
                    </a>
                  </div>
                  <div>
                    <p className="mt-4 text-sm text-muted-foreground">
                      Følg oss for å holde deg oppdatert på nyheter og tilbud.
                    </p>
                  </div>
                  {/* Nyhetsbrev inputfelt */}
                  <div className="mt-8">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Skriv inn e-postadresse"
                      className="p-2 border rounded-md w-full"
                    />
                    <button
                      onClick={handleSubscribe}
                      className="mt-2 bg-yellow-400 text-white py-2 px-4 rounded hover:bg-blue-600"
                    >
                      Meld deg på
                    </button>
                    {message && <p className="mt-2 text-sm text-gray-700">{message}</p>}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
  
        <div className="py-10 md:flex md:items-center md:justify-between">
          <div className="text-center md:text-left">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} All Rights Reserved
            </p>
          </div>
  
          <div className="mt-4 flex items-center justify-center md:mt-0">
            <div className="flex space-x-8">
              <Link
                href="/terms"
                className="text-sm text-muted-foreground hover:text-gray-600"
              >
                Terms
              </Link>
              <Link
                href="#"
                className="text-sm text-muted-foreground hover:text-gray-600"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-sm text-muted-foreground hover:text-gray-600"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
      
      {/* Legg til PopupNewsletter her */}
      <PopupNewsletter />
    </footer>
  );
  
};

export default Footer;
