import styles from "./filterQuick.module.css";
import ArrowDown from "../../../../public/icons/Arrow_down.svg";
import Icon_x from "../../../../public/icons/Icon_X.svg";

import Image from "next/image";

interface FilterProps {
  property?: "default" | "active";
  onClick: () => void;
  children?: React.ReactNode;
  arrow?: boolean;
}

export default function FilterQuick({ property = "default", onClick, arrow = false, children }: FilterProps) {
  return (
    <div className={`${styles.container} ${styles[property]}`}>
      <button className={`${styles.button} ${styles[property]}`} onClick={onClick}>
        <p className={styles.content}>{children}</p>
        {arrow ? (
          <Image className={styles.arrow} src={ArrowDown} width={16} height={16} alt="ArrowDown" />
        ) : (
          <Image className={styles.arrow} src={Icon_x} width={16} height={16} alt="Icon_x" />
        )}
      </button>
    </div>
  );
}
