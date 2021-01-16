import React from "react";
import { Tweet } from "react-twitter-widgets";

import classnames from "classnames";
import PropTypes from "prop-types";

import { FAVOR, AGAINST } from "../../constants";

import styles from "./styles.module.css";

const Tooltip = ({
  node: {
    Email,
    Link,
    Nome_Parlamentar,
    Partido,
    Posicao,
    Telefone,
    Titular_Suplente_Efetivado,
    Twitter,
    UF,
  },
}) => {
  const stance =
    Posicao === FAVOR ? "favor" : Posicao === AGAINST ? "against" : "neutral";

  return (
    <div
      className={classnames(styles.root, {
        [styles[stance]]: stance,
      })}
    >
      <h3>{Nome_Parlamentar}</h3>
      <ul>
        <li>
          <strong>Partido:</strong> {Partido}
        </li>
        <li>
          <strong>UF:</strong> {UF}
        </li>
        <li>
          <strong>Tipo:</strong> {Titular_Suplente_Efetivado}
        </li>
        {Email && (
          <li>
            <strong>Email:</strong> <a href={`mailto:${Email}`}>{Email}</a>
          </li>
        )}
        {Telefone && (
          <li>
            <strong>Telefone:</strong>{" "}
            <a href={`tel:+55 61 ${Telefone}`}>{Telefone}</a>
          </li>
        )}
        {Twitter && (
          <li>
            <strong>Twitter:</strong>{" "}
            <a
              href={`https://twitter.com/${Twitter}`}
              rel="noopener noreferrer"
              target="_blank"
            >
              @{Twitter}
            </a>
          </li>
        )}
      </ul>
      {Link && <Tweet tweetId={Link.split("/").pop()} />}
    </div>
  );
};

Tooltip.propTypes = {
  node: PropTypes.object.isRequired,
};

export default Tooltip;
