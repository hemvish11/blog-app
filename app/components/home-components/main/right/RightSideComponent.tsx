import React from "react";
import styles from "./RightSideComponent.module.css";

const RightSideComponent: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <h2>Staff Picks</h2>
        <ul>
          <li>
            Jennifer Pahlka - <span>This must be the place</span>
          </li>
          <li>
            Julio Vincent Gambuto -{" "}
            <span>
              Book Excerpt: Introduction to “Please Unsubscribe, Thanks!”
            </span>
          </li>
          <li>
            Elijah Cobb -{" "}
            <span>The Dramatic Shift of the 2024 Paris Olympic Pictograms</span>
          </li>
        </ul>
      </div>
      <div className={styles.section}>
        <h2>Recommended Topics</h2>
        <div className={styles.topics}>
          <span>Spirituality</span>
          <span>Nodejs</span>
          <span>Creativity</span>
          <span>This Happened To Me</span>
          <span>Defi</span>
          <span>UI</span>
          <span>NLP</span>
        </div>
      </div>
    </div>
  );
};

export default RightSideComponent;
