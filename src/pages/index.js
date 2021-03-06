import React, { useMemo } from "react";

import { useStaticQuery, graphql } from "gatsby";
import { useQueryParam, StringParam } from "use-query-params";

import Filter from "../components/Filter";
import Item from "../components/Item";
import SEO from "../components/Seo";
import ShareBar from "../components/ShareBar";
import Spinner from "../components/Spinner";

import { FAVOR, AGAINST, NEUTRAL, PARTIES, STATES } from "../constants";

import { getSorted, getValues } from "../utils";

import "normalize.css";
import styles from "./styles.module.css";

const IndexPage = () => {
  const [party, setParty] = useQueryParam("partido", StringParam);
  const [state, setState] = useQueryParam("uf", StringParam);

  const {
    votes: { edges },
  } = useStaticQuery(graphql`
    query {
      votes: allVotesJson {
        edges {
          node {
            id
            Abbreviation
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

  const sorted = useMemo(
    () => [
      ...getSorted(edges, FAVOR),
      ...getSorted(edges, NEUTRAL),
      ...getSorted(edges, AGAINST),
    ],
    [edges]
  );

  if (typeof window === "undefined") {
    return <Spinner />;
  }

  const partyFilter = PARTIES.includes(party) ? party : "all";
  const stateFilter = STATES.includes(state) ? state : "all";

  const { favor, against, neutral } = getValues(edges, {
    party: partyFilter,
    state: stateFilter,
  });

  return (
    <>
      <SEO />
      <main className={styles.root}>
        <header className={styles.header}>
          <h1 className={styles.title}>
            <span>Placar do Impeachment</span>
            <div className={styles.filters} aria-hidden="true">
              <div className={styles.filter}>
                <Filter
                  label="Filtrar por partido"
                  onChange={setParty}
                  options={PARTIES}
                  value={partyFilter}
                />
              </div>
              <div className={styles.filter}>
                <Filter
                  label="Filtrar por UF"
                  onChange={setState}
                  options={STATES}
                  value={stateFilter}
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
                (partyFilter === "all" || node.Partido === party) &&
                (stateFilter === "all" || node.UF === state)
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
            <br />
            <a
              href="https://github.com/daviferreira/placar-do-impeachment"
              rel="noopener noreferrer"
              target="_blank"
            >
              Desenvolvido
            </a>{" "}
            por{" "}
            <a
              href="https://twitter.com/davitferreira"
              rel="noopener noreferrer"
              target="_blank"
            >
              Davi Ferreira
            </a>
          </p>
          <ShareBar />
        </footer>
      </main>
    </>
  );
};

export default IndexPage;
