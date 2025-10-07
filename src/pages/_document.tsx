import Document, { Head, Html, Main, NextScript } from 'next/document'import Document, { Head, Html, Main, NextScript } from 'next/document'import Document, { Head, Html, Main, NextScript } from 'next/document'



class MyDocument extends Document {mport Document, { Head, Html, Main, NextScript } from 'next/document'

  render() {

    return (class MyDocument extends Document {mport Document, { Head, Html, Main, NextScript } from 'next/document'

      <Html lang="en">

        <Head>  render() {

          <link rel="icon" href="/favicon.ico" />

          <meta name="description" content="Norges beste fotballdraktbutikk - kvalitetsdrakter til konkurransedyktige priser" />    return (class MyDocument extends Document {

          <meta property="og:title" content="Fotballdraktbutikken - Norges beste fotballdrakter" />

          <meta property="og:description" content="Norges største utvalg av fotballdrakter fra Premier League, Bundesliga, Serie A og mer" />      <Html lang="en">

          <meta property="og:image" content="/thumbnail.jpg" />

                  <Head>  render() {

          {/* hreflang tags for SEO */}

          <link rel="alternate" hrefLang="no" href="https://fotballdb.no" />          <link rel="icon" href="/favicon.ico" />

          <link rel="alternate" hrefLang="en" href="https://en.fotballdb.no" />

                    <meta name="description" content="Norges beste fotballdraktbutikk - kvalitetsdrakter til konkurransedyktige priser" />    return (class MyDocument extends Document {class MyDocument extends Document {

          {/* Weglot initialization */}

          <script          <meta property="og:title" content="Fotballdraktbutikken - Norges beste fotballdrakter" />

            dangerouslySetInnerHTML={{

              __html: `          <meta property="og:description" content="Norges største utvalg av fotballdrakter fra Premier League, Bundesliga, Serie A og mer" />      <Html lang="en">

                window.Weglot = window.Weglot || {};

                Weglot.initialize({          <meta property="og:image" content="/thumbnail.jpg" />

                  api_key: 'wg_637608e12b26daef9cf89edc1fc07fa27'

                });                  <Head>  render() {  render() {

              `,

            }}          {/* hreflang tags for SEO */}

          />

                    <link rel="alternate" hrefLang="no" href="https://fotballdb.no" />          <link rel="icon" href="/favico.ico" />

          {/* Google Analytics */}

          <script          <link rel="alternate" hrefLang="en" href="https://en.fotballdb.no" />

            async

            src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"                    <meta name="description" content="Your site description here" />    return (    return (

          ></script>

          <script          {/* Weglot initialization */}

            dangerouslySetInnerHTML={{

              __html: `          <script          <meta property="og:title" content="Your site title here" />

                window.dataLayer = window.dataLayer || [];

                function gtag(){dataLayer.push(arguments);}            dangerouslySetInnerHTML={{

                gtag('js', new Date());

                gtag('config', 'G-XXXXXXXXXX');              __html: `          <meta property="og:description" content="Your site description here" />      <Html lang="en">      <Html lang="en">

              `,

            }}                window.Weglot = window.Weglot || {};

          />

                          Weglot.initialize({          <meta property="og:image" content="/thumbnail.jpg" />

          {/* Custom styles for loading animation */}

          <style                  api_key: 'wg_637608e12b26daef9cf89edc1fc07fa27'

            dangerouslySetInnerHTML={{

              __html: `                });        <Head>        <Head>

                .loading-spinner {

                  position: fixed;              `,

                  top: 20px;

                  right: 20px;            }}          {/* hreflang tags for SEO */}

                  z-index: 1000;

                  background: #10b981;          />

                  border-radius: 50%;

                  width: 60px;                    <link rel="alternate" hrefLang="no" href="https://fotballdb.no" />          <link rel="icon" href="/favico.ico" />          <link rel="icon" href="/favico.ico" />

                  height: 60px;

                  animation: spin 2s linear infinite;          {/* Google Analytics */}

                }

                @keyframes spin {          <script          <link rel="alternate" hrefLang="en" href="https://en.fotballdb.no" />

                  0% { transform: rotate(0deg); }

                  100% { transform: rotate(360deg); }            async

                }

              `,            src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"                    <meta name="description" content="Your site description here" />          <meta name="description" content="Your site description here" />

            }}

          />          ></script>

        </Head>

        <body>          <script          {/* Weglot script for translation */}

          <Main />

          <NextScript />            dangerouslySetInnerHTML={{

        </body>

      </Html>              __html: `          <script src="https://cdn.weglot.com/weglot.min.js" async></script>          <meta property="og:title" content="Your site title here" />          <meta property="og:title" content="Your site title here" />

    )

  }                window.dataLayer = window.dataLayer || [];

}

                function gtag(){dataLayer.push(arguments);}          <script

export default MyDocument
                gtag('js', new Date());

                gtag('config', 'G-XXXXXXXXXX');            dangerouslySetInnerHTML={{          <meta property="og:description" content="Your site description here" />          <meta property="og:description" content="Your site description here" />

              `,

            }}              __html: `

          />

                          Weglot.initialize({          <meta property="og:image" content="/thumbnail.jpg" />          <meta property="og:image" content="/thumbnail.jpg" />

          {/* Custom styles for loading animation */}

          <style                  api_key: 'wg_637608e12b26daef9cf89edc1fc07fa27'

            dangerouslySetInnerHTML={{

              __html: `                });

                .loading-spinner {

                  position: fixed;              `,

                  top: 20px;

                  right: 20px;            }}          {/* hreflang tags for SEO */}          {/* hreflang tags for SEO */}

                  z-index: 1000;

                  background: #10b981;            async

                  border-radius: 50%;

                  width: 60px;          />          <link rel="alternate" hrefLang="no" href="https://fotballdb.no" />          <link rel="alternate" hrefLang="no" href="https://fotballdb.no" />

                  height: 60px;

                  animation: spin 2s linear infinite;

                }

                @keyframes spin {          {/* CSS for web components */}          <link rel="alternate" hrefLang="en" href="https://en.fotballdb.no" />          <link rel="alternate" hrefLang="en" href="https://en.fotballdb.no" />

                  0% { transform: rotate(0deg); }

                  100% { transform: rotate(360deg); }          <style

                }

              `,            dangerouslySetInnerHTML={{                    

            }}

          />              __html: `

        </Head>

        <body>                .ws-translate-button {          {/* Weglot script for translation */}          {/* Weglot script for translation */}

          <Main />

          <NextScript />                  position: fixed;

        </body>

      </Html>                  bottom: 20px;          <script src="https://cdn.weglot.com/weglot.min.js" async></script>          <script src="https://cdn.weglot.com/weglot.min.js" async></script>

    )

  }                  right: 20px;

}

                  z-index: 1000;          <script          <script

export default MyDocument
                  background: #007bff;

                  color: white;            dangerouslySetInnerHTML={{            dangerouslySetInnerHTML={{

                  border: none;

                  border-radius: 50%;              __html: `              __html: `

                  width: 60px;

                  height: 60px;                Weglot.initialize({                Weglot.initialize({

                  cursor: pointer;

                  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);                  api_key: 'wg_637608e12b26daef9cf89edc1fc07fa27'                  api_key: 'wg_637608e12b26daef9cf89edc1fc07fa27'

                }

              `,                });                });

            }}

          />              `,              `,

        </Head>

        <body>            }}            }}

          <Main />

          <NextScript />            async            async

        </body>

      </Html>          />          />

    )

  }

}

          {/* CSS for web components */}          <script

export default MyDocument
          <style            async

            dangerouslySetInnerHTML={{            src="https://www.googletagmanager.com/gtag/js?id=AW-16715509548"

              __html: `          ></script>

                .ws-translate-button {          <script

                  position: fixed;            dangerouslySetInnerHTML={{

                  bottom: 20px;              __html: `

                  right: 20px;                window.dataLayer = window.dataLayer || [];

                  z-index: 1000;                function gtag(){dataLayer.push(arguments);}

                  background: #007bff;                gtag('js', new Date());

                  color: white;                gtag('config', 'AW-16715509548');

                  border: none;              `,

                  border-radius: 50%;            }}

                  width: 60px;          />

                  height: 60px;          {/* Legg til flere ressurser eller meta-tags her */}

                  cursor: pointer;        </Head>

                  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);        <body>

                }          <Main />

              `,          <NextScript />

            }}        </body>

          />      </Html>

        </Head>    )

        <body>  }

          <Main />}

          <NextScript />

        </body>export default MyDocument
      </Html>
    )
  }
}

export default MyDocument