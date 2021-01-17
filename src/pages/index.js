import React, { useMemo, useState } from "react";

import { useStaticQuery, graphql } from "gatsby";

import Filter from "../components/Filter";
import Item from "../components/Item";
import SEO from "../components/Seo";
import ShareBar from "../components/ShareBar";

import { FAVOR, AGAINST, NEUTRAL, PARTIES, STATES } from "../constants";

import { getSorted, getValues } from "../utils";

import "normalize.css";
import styles from "./styles.module.css";

// markup
const IndexPage = () => {
  const [party, setParty] = useState("all");
  const [state, setState] = useState("all");

  const {
    votes: { edges },
  } = useStaticQuery(graphql`
    query {
      votes: allVotesJson {
        edges {
          node {
            id
            Email
            Facebook
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

  const { favor, against, neutral } = getValues(edges, { party, state });

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
            <div className={styles.filters} aria-hidden="true">
              <div className={styles.filter}>
                <Filter onChange={setParty} options={PARTIES} value={party} />
              </div>
              <div className={styles.filter}>
                <Filter
                  labels={{
                    all: "Todos os estados",
                    button: "Filtrar por UF",
                  }}
                  onChange={setState}
                  options={STATES}
                  value={state}
                />
              </div>
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
              active={
                (party === "all" || node.Partido === party) &&
                (state === "all" || node.UF === state)
              }
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
