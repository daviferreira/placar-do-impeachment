import React from "react";

import classnames from "classnames";
import PropTypes from "prop-types";
import Tippy from "@tippyjs/react";
import { hideAll } from "tippy.js";

import Tooltip from "../Tooltip";

import { FAVOR, AGAINST } from "../../constants";

import "tippy.js/dist/tippy.css"; // optional
import "tippy.js/themes/light.css";
import "tippy.js/animations/shift-away.css";
import styles from "./styles.module.css";

const Item = ({ active, node }) => {
  // eslint-disable-next-line camelcase
  const { id, Posicao, Abbreviation } = node;

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
      placement="top-start"
      theme="light"
    >
      <div
        className={classnames(styles.item, {
          [styles.inactive]: !active,
          [styles[stance]]: stance,
        })}
        key={id}
      >
        <span>{Abbreviation}</span>
      </div>
    </Tippy>
  );
};

Item.propTypes = {
  active: PropTypes.bool,
  node: PropTypes.object.isRequired,
};

export default Item;
