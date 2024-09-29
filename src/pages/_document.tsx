import Document, { Head, Html, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favico.ico" />
          <meta name="description" content="Your site description here" />
          <meta property="og:title" content="Your site title here" />
          <meta property="og:description" content="Your site description here" />
          <meta property="og:image" content="/thumbnail.jpg" />

          {/* hreflang tags for SEO */}
          <link rel="alternate" hrefLang="no" href="https://fotballdb.no" />
          <link rel="alternate" hrefLang="en" href="https://en.fotballdb.no" />
          
          {/* Weglot script for translation */}
          <script src="https://cdn.weglot.com/weglot.min.js" async></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                Weglot.initialize({
                  api_key: 'wg_637608e12b26daef9cf89edc1fc07fa27'
                });
              `,
            }}
            async
          />

          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=AW-16715509548"
          ></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'AW-16715509548');
              `,
            }}
          />
          {/* Legg til flere ressurser eller meta-tags her */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument