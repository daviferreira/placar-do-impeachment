import * as React from "react";

import classnames from "classnames";
import { useStaticQuery, graphql } from "gatsby";

import "normalize.css";
import styles from "./styles.module.css";

const A_FAVOR = "A favor do impeachment";
const CONTRA = "Contra o impeachment";

function getValues(data) {
  const items = [
    {
      name: "A favor",
      value: 0,
    },
    {
      name: "Contra",
      value: 0,
    },
    {
      name: "Não se posicionou",
      value: 0,
    },
  ];

  data.forEach(({ node: { Posi__o } }) => {
    if (Posi__o === A_FAVOR) {
      items[0].value++;
    } else if (Posi__o === CONTRA) {
      items[1].value++;
    } else {
      items[2].value++;
    }
  });

  return items;
}

// markup
const IndexPage = () => {
  const {
    votes: { edges },
  } = useStaticQuery(graphql`
    query {
      votes: allVotesJson(sort: { fields: [Posi__o], order: ASC }) {
        edges {
          node {
            id
            Email
            Link
            Nome_Parlamentar
            Partido
            Posi__o
            Telefone
            Titular_Suplente_Efetivado
            Twitter
            UF
          }
        }
      }
    }
  `);

  return (
    <main className={styles.root}>
      <div className={styles.items}>
        {edges.map(({ node: { id, Posi__o } }) => {
          const stance =
            Posi__o === A_FAVOR
              ? "favor"
              : Posi__o === CONTRA
              ? "against"
              : "neutral";

          return (
            <div
              className={classnames(styles.item, {
                [styles[stance]]: stance,
              })}
              key={id}
            >
              <span />
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default IndexPage;
