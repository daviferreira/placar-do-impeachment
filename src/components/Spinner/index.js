import React from "react";

import styles from "./styles.module.css";

const Spinner = () => (
  <div className={styles.root}>
    <div className={styles.loader}>Carregando...</div>
  </div>
);

export default Spinner;
