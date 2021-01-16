import React from "react";
import { Helmet } from "react-helmet";

import { useStaticQuery, graphql } from "gatsby";
import PropTypes from "prop-types";

function SEO({ description = "", lang = "pt-BR", meta = [] }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
  );

  const metaDescription = description || site.siteMetadata.description;

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={site.siteMetadata.title}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: site.siteMetadata.title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.author,
        },
        {
          name: `twitter:title`,
          content: site.siteMetadata.title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
        {
          property: `og:image`,
          content: `https://www.impeachmentbolsonarourgente.com/images/fb.jpg`,
        },
        {
          property: `og:image:width`,
          content: 1200,
        },
        {
          property: `og:image:height`,
          content: 675,
        },
        {
          property: `og:url`,
          content: `https://www.impeachmentbolsonarourgente.com`,
        },
        ...meta,
      ]}
    />
  );
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string,
};

export default SEO;
