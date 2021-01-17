import React from "react";
import { TwitterTweetEmbed } from "react-twitter-embed";

import classnames from "classnames";
import PropTypes from "prop-types";

import { FAVOR, AGAINST } from "../../constants";

import styles from "./styles.module.css";

const TYPES = {
  T: "Titular",
  S: "Suplente",
  E: "Efetivado",
};

const Tooltip = ({
  node: {
    Email,
    Facebook,
    Instagram,
    Link,
    Nome_Parlamentar, // eslint-disable-line camelcase
    Partido,
    Posicao,
    Telefone,
    Titular_Suplente_Efetivado, // eslint-disable-line camelcase
    Twitter,
    UF,
  },
}) => {
  const stance =
    Posicao === FAVOR ? "favor" : Posicao === AGAINST ? "against" : "neutral";

  const tweetId =
    Link && Link.includes("twitter.com") && Link.split("?")[0].split("/").pop();

  return (
    <div
      className={classnames(styles.root, {
        [styles[stance]]: stance,
      })}
    >
      <div className={styles.header}>
        <h3>{Nome_Parlamentar}</h3> {/* eslint-disable-line camelcase */}
        {stance !== "favor" &&
          (Twitter ? (
            <a
              className={styles.button}
              href={`https://twitter.com/intent/tweet?text=Oi @${Twitter}, é hora de se posicionar a favor do impeachment!&hashtags=PlacarDoImpeachment&url=https://impeachmentbolsonarourgente.com/`}
            >
              Pressione!
            </a>
          ) : (
            Email && (
              <a className={styles.button} href={`mailto:${Email}`}>
                Pressione!
              </a>
            )
          ))}
      </div>
      <div className={styles.content}>
        <ul>
          <li>
            <strong>Partido:</strong> {Partido}
          </li>
          <li>
            <strong>UF:</strong> {UF}
          </li>
          <li>
            <strong>Mandato:</strong> {TYPES[Titular_Suplente_Efetivado]}
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
          {Instagram && (
            <li>
              <strong>Instagram:</strong>{" "}
              <a
                href={`https://instagram.com/${Instagram}`}
                rel="noopener noreferrer"
                target="_blank"
              >
                @{Instagram}
              </a>
            </li>
          )}
          {Facebook && (
            <li>
              <strong>Facebook:</strong>{" "}
              <a
                href={`https://facebook.com/${Facebook}`}
                rel="noopener noreferrer"
                target="_blank"
              >
                @{Facebook}
              </a>
            </li>
          )}
        </ul>
        {tweetId && (
          <div className={styles.tweet}>
            <TwitterTweetEmbed
              tweetId={tweetId}
              placeholder={
                <div className={styles.loader}>Carregando tweet...</div>
              }
            />
          </div>
        )}
      </div>
    </div>
  );
};

Tooltip.propTypes = {
  node: PropTypes.object.isRequired,
};

export default Tooltip;
