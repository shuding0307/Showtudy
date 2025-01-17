import styles from "./quickBtn.module.css";
import { useState } from "react";
import Icon_quick from "../../../../public/icons/studyList/Icon_quick.svg";
import Icon_quickActive from "../../../../public/icons/studyList/Icon_quickActive.svg";
import resetIcon from "../../../../public/icons/studyList/Icon_reset.svg";
import Image from "next/image";
import useSortStore from "../store/useSortStore";

export default function QuickMatchBtn() {
  const { quickMatch, setQuickMatch } = useSortStore();

  const handleQuickMatch = () => {
    setQuickMatch(!quickMatch);
  };

  return (
    <div className={styles.container}>
      {quickMatch && (
        <button className={styles.resetBtn} onClick={() => setQuickMatch(false)}>
          <Image src={resetIcon} width={20} height={20} alt="reset" />
        </button>
      )}
      <button
        className={quickMatch ? `${styles.quickMatchBtn} ${styles.quickMatchBtnActive}` : styles.quickMatchBtn}
        onClick={handleQuickMatch}
      >
        <Image
          className={styles.quickIcon}
          src={quickMatch ? Icon_quickActive : Icon_quick}
          width={20}
          height={20}
          alt="quick"
        />
        빠른매칭
      </button>
    </div>
  );
}
