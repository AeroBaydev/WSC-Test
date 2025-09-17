"use client"

export default function SEOHead() {
  return (
    <>
      {/* Additional SEO Meta Tags */}
      <meta name="application-name" content="World Skill Challenge 2025" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="WSC 2025" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="msapplication-config" content="/browserconfig.xml" />
      <meta name="msapplication-TileColor" content="#ff6b35" />
      <meta name="msapplication-tap-highlight" content="no" />

      {/* Geo Tags */}
      <meta name="geo.region" content="IN" />
      <meta name="geo.country" content="India" />
      <meta name="geo.placename" content="India" />

      {/* Additional Open Graph Tags */}
      <meta property="og:site_name" content="World Skill Challenge 2025" />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="en_IN" />

      <meta property="article:publisher" content="World Skill Challenge" />

      {/* Additional Twitter Tags */}
      <meta name="twitter:domain" content="wsc-test.vercel.app" />
      <meta name="twitter:url" content="https://wsc-test.vercel.app" />
    </>
  )
}
