import { Helmet } from "react-helmet-async";

type HelmetSEOProps = {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  pathName?: string;
};

const HelmetSEO = ({
  title,
  description,
  keywords,
  ogImage,
  pathName,
}: HelmetSEOProps) => {
  const baseUrl = "http://localhost:5173";
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={`${baseUrl}${pathName}`} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={`${baseUrl}${pathName}`} />
    </Helmet>
  );
};

export default HelmetSEO;
