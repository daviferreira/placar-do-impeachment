import React from "react";

import classnames from "classnames";
import PropTypes from "prop-types";

import { Menu, MenuList, MenuButton, MenuItem } from "@reach/menu-button";

import Arrow from "./arrow.svg";

import "@reach/menu-button/styles.css";
import styles from "./styles.module.css";

const Filter = ({ onChange, options, value }) => {
  return (
    <div className={styles.filter}>
      <Menu>
        {({ isExpanded }) => (
          <>
            <MenuButton className={styles.button}>
              <span>{value === "all" ? "Filtrar por partido" : value}</span>
              <span aria-hidden>
                <Arrow
                  className={classnames(styles.arrow, {
                    [styles.expanded]: isExpanded,
                  })}
                />
              </span>
            </MenuButton>
            <MenuList className={styles.menu}>
              {value !== "all" && (
                <MenuItem
                  className={styles.item}
                  key="all"
                  onSelect={() => onChange("all")}
                >
                  <span>Todos os partidos</span>
                </MenuItem>
              )}
              {options
                .filter((key) => key !== value)
                .map((key) => (
                  <MenuItem
                    className={styles.item}
                    key={key}
                    onSelect={() => onChange(key)}
                  >
                    {key}
                  </MenuItem>
                ))}
            </MenuList>
          </>
        )}
      </Menu>
    </div>
  );
};

Filter.propTypes = {
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  value: PropTypes.string,
};

export default Filter;
