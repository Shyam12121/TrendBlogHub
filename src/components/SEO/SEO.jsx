import { Helmet } from "react-helmet-async";

const SITE_URL = "https://trendbloghub.com";
const SITE_NAME = "TrendBlogHub";
const DEFAULT_IMAGE = `${SITE_URL}/logo.png`;

export default function SEO({
  title,
  description,
  keywords,
  url = "/",
  image,
  type = "website",
  schema,
  noindex = false,
}) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
  const fullUrl = url.startsWith("http") ? url : `${SITE_URL}${url}`;
  const fullImage = image || DEFAULT_IMAGE;

  return (
    <Helmet>
      {/* Basic */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={fullUrl} />

      {/* ✅ Robots — dono cases handle karein */}
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
      )}

      {/* Favicon */}
      <link rel="icon" type="image/png" href={`${SITE_URL}/favicon.png`} />
      <link rel="apple-touch-icon" href={`${SITE_URL}/favicon.png`} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:site_name" content={SITE_NAME} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />

      {/* Schema */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
}