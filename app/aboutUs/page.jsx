// AboutUs.js

import React from "react";
import styles from "../constant/style";
import { CardDeal } from "../components";
import Logo from "../components/common/logo";

const AboutUs = () => {
  return (
    <div className="bg-primary w-full overflow-hidden">
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Logo />
        </div>
      </div>

      
    </div>
  );
};

export default AboutUs;
