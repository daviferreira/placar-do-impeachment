import React from "react";

import classnames from "classnames";
import PropTypes from "prop-types";

import { Menu, MenuList, MenuButton, MenuItem } from "@reach/menu-button";

import Arrow from "./arrow.svg";
import Clear from "./clear-circle.svg";

import "@reach/menu-button/styles.css";
import styles from "./styles.module.css";

const Filter = ({ label, onChange, options, value }) => {
  return (
    <div className={styles.filter}>
      {value !== "all" && (
        <span
          className={styles.clear}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onChange();
          }}
        >
          <Clear />
        </span>
      )}
      <Menu>
        {({ isExpanded }) => (
          <>
            <MenuButton className={styles.button}>
              <span>{value === "all" ? label : value}</span>
              <span aria-hidden>
                <Arrow
                  className={classnames(styles.arrow, {
                    [styles.expanded]: isExpanded,
                  })}
                />
              </span>
            </MenuButton>
            <MenuList className={styles.menu}>
              {options.map((key) => (
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
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  value: PropTypes.string,
};

export default Filter;
