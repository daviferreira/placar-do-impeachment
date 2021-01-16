module.exports = {
  siteMetadata: {
    title: "Placar do Impeachment",
    description: "",
    author: "Davi Ferreira",
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-offline",
    "gatsby-plugin-react-svg",
    "gatsby-transformer-json",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "data",
        path: `${__dirname}/src/data/`,
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
