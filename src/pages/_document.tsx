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