import React from "react";

import classnames from "classnames";
import { useStaticQuery, graphql } from "gatsby";
import Tippy from "@tippyjs/react";
import { hideAll } from "tippy.js";

import SEO from "../components/Seo";
import Tooltip from "../components/Tooltip";

import { FAVOR, AGAINST } from "../constants";

import "normalize.css";
import "tippy.js/dist/tippy.css"; // optional
import "tippy.js/themes/light.css";
import "tippy.js/animations/shift-away.css";
import styles from "./styles.module.css";

function getValues(data) {
  const items = {
    favor: 0,
    against: 0,
    neutral: 0,
  };

  data.forEach(({ node: { Posicao } }) => {
    if (Posicao === FAVOR) {
      items.favor++;
    } else if (Posicao === AGAINST) {
      items.against++;
    } else {
      items.neutral++;
    }
  });

  return items;
}

const Item = ({ node, index }) => {
  const { id, Posicao } = node;

  const stance =
    Posicao === FAVOR ? "favor" : Posicao === AGAINST ? "against" : "neutral";

  return (
    <Tippy
      animation="shift-away"
      content={<Tooltip node={node} />}
      delay={100}
      duration={300}
      interactive
      interactiveBorder={20}
      onShow={() => hideAll({ duration: 0 })}
      placement="bottom-start"
      theme="light"
    >
      <div
        className={classnames(styles.item, {
          [styles[stance]]: stance,
        })}
        key={id}
      >
        <span />
      </div>
    </Tippy>
  );
};

// markup
const IndexPage = () => {
  const {
    votes: { edges },
  } = useStaticQuery(graphql`
    query {
      votes: allVotesJson(sort: { fields: [Posicao], order: ASC }) {
        edges {
          node {
            id
            Email
            Link
            Nome_Parlamentar
            Partido
            Posicao
            Telefone
            Titular_Suplente_Efetivado
            Twitter
            UF
          }
        }
      }
    }
  `);

  const { favor, against, neutral } = getValues(edges);

  return (
    <>
      <SEO />
      <main className={styles.root}>
        <header className={styles.header}>
          <h1 className={styles.title}>Placar do Impeachment</h1>
          <div className={styles.info}>
            <ul>
              <li className={styles.favor}>
                <h2>A favor</h2>
                <div className={styles.count}>
                  <span>&bull;</span>
                  {favor}
                </div>
              </li>
              <li className={styles.against}>
                <h2>Contra</h2>
                <div className={styles.count}>
                  <span>&bull;</span>
                  {against}
                </div>
              </li>
              <li className={styles.neutral}>
                <h2>N&atilde;o se posicionaram</h2>
                <div className={styles.count}>
                  <span>&bull;</span>
                  {neutral}
                </div>
              </li>
            </ul>
          </div>
        </header>
        <section className={styles.items}>
          {edges.map(({ node }, index) => (
            <Item key={node.id} node={node} index={index} />
          ))}
        </section>
      </main>
    </>
  );
};

export default IndexPage;
