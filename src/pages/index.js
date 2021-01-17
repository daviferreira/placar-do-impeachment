import React, { useMemo, useState } from "react";

import classnames from "classnames";
import { useStaticQuery, graphql } from "gatsby";
import Tippy from "@tippyjs/react";
import { hideAll } from "tippy.js";

import Filter from "../components/Filter";
import SEO from "../components/Seo";
import ShareBar from "../components/ShareBar";
import Tooltip from "../components/Tooltip";

import { FAVOR, AGAINST, NEUTRAL, PARTIES } from "../constants";

import "normalize.css";
import "tippy.js/dist/tippy.css"; // optional
import "tippy.js/themes/light.css";
import "tippy.js/animations/shift-away.css";

import styles from "./styles.module.css";

function getSorted(edges, stance) {
  return edges
    .filter(({ node: { Posicao } }) => Posicao === stance)
    .sort((a, b) =>
      a.node.Nome_Parlamentar.localeCompare(b.node.Nome_Parlamentar)
    );
}

function getAbbreviation(name) {
  const nameArray = name.split(" ");
  const firstName = nameArray[0];
  const lastName = nameArray.pop();

  return `${firstName ? firstName[0] : ""}${lastName ? lastName[0] : ""}`;
}

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

const Item = ({ active, node }) => {
  const { id, Posicao, Nome_Parlamentar } = node;

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
          [styles.inactive]: !active,
          [styles[stance]]: stance,
        })}
        key={id}
      >
        <span>{getAbbreviation(Nome_Parlamentar)}</span>
      </div>
    </Tippy>
  );
};

// markup
const IndexPage = () => {
  const [party, setParty] = useState("all");

  const {
    votes: { edges },
  } = useStaticQuery(graphql`
    query {
      votes: allVotesJson {
        edges {
          node {
            id
            Email
            Instagram
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

  const sorted = useMemo(
    () => [
      ...getSorted(edges, FAVOR),
      ...getSorted(edges, AGAINST),
      ...getSorted(edges, NEUTRAL),
    ],
    [edges]
  );

  return (
    <>
      <SEO />
      <main className={styles.root}>
        <header className={styles.header}>
          <h1 className={styles.title}>
            <span>Placar do Impeachment</span>
            <div className={styles.filter} aria-hidden="true">
              <Filter onChange={setParty} options={PARTIES} value={party} />
            </div>
          </h1>
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
          {sorted.map(({ node }, index) => (
            <Item
              active={party === "all" || node.Partido === party}
              key={node.id}
              node={node}
              index={index}
            />
          ))}
        </section>
        <footer className={styles.footer}>
          <p>
            <a
              href="https://docs.google.com/spreadsheets/u/1/d/1eXXnTiPr8I-KuRyV82p5rKXo8EVaoCybuuVuR9wp4A0"
              rel="noopener noreferrer"
              target="_blank"
            >
              Planilha com todos os dados
            </a>{" "}
            via{" "}
            <a
              href="https://twitter.com/sos_impeachment"
              rel="noopener noreferrer"
              target="_blank"
            >
              @sos_impeachment
            </a>
          </p>
          <ShareBar />
        </footer>
      </main>
    </>
  );
};

export default IndexPage;
