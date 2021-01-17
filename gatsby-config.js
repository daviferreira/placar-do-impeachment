const path = require("path");

module.exports = {
  siteMetadata: {
    title: "Placar do Impeachment",
    description:
      "Saiba como seu deputado votaria se o impeachment de Jair Bolsonaro fosse hoje. Cobre seu representante.",
    author: "Davi Ferreira",
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-offline",
    "gatsby-plugin-react-svg",
    "gatsby-plugin-use-query-params",
    "gatsby-transformer-json",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "data",
        path: path.join(__dirname, `/src/data/`),
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Placar do Impeachment`,
        short_name: `forabozo`,
        start_url: `/`,
        background_color: `#1f4068`,
        theme_color: `#54e346`,
        display: `minimal-ui`,
        icon: `src/images/favicon.png`,
      },
    },
  ],
};
