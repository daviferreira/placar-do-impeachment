import * as React from "react";
import { Link } from "gatsby";

import SEO from "../components/Seo";

// styles
const pageStyles = {
  padding: "96px",
};

const headingStyles = {
  marginTop: 0,
  marginBottom: 64,
};

const paragraphStyles = {
  marginBottom: 48,
};

// markup
const NotFoundPage = () => {
  return (
    <>
      <SEO title="Página não encontrada" />
      <main style={pageStyles}>
        <h1 style={headingStyles}>Página não encontrada</h1>
        <p style={paragraphStyles}>
          <Link to="/" style={{ color: "#fff" }}>
            Ir para a home home
          </Link>
          .
        </p>
      </main>
    </>
  );
};

export default NotFoundPage;
