import styles from "./quickBtn.module.css";
import { useState } from "react";
import Icon_quick from "../../../../public/icons/studyList/Icon_quick.svg";
import Icon_quickActive from "../../../../public/icons/studyList/Icon_quickActive.svg";
import resetIcon from "../../../../public/icons/studyList/Icon_reset.svg";
import Image from "next/image";

export default function QuickMatchBtn() {
    const [ quickMatch, setQuickMatch ] = useState(false);

    const handleQuickMatch = () => {
        if (quickMatch) {
            setQuickMatch(false);
        } else {
            setQuickMatch(true);
        }
    };

    return (
        <div className={styles.container}>
            {quickMatch && (
                <button className={styles.resetBtn}>
                    <Image src={resetIcon} width={20} height={20} alt="reset" />
                </button>
            )}
            <button className={quickMatch ? `${styles.quickMatchBtn} ${styles.quickMatchBtnActive}` : styles.quickMatchBtn}
                    onClick={handleQuickMatch}>
                <Image 
                    className={styles.quickIcon} 
                    src={quickMatch ? Icon_quickActive : Icon_quick} 
                    width={20} 
                    height={20} 
                    alt="quick" />
                빠른매칭
            </button>
        </div>
    );
}