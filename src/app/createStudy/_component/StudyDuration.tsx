import styles from "./calendar.module.css";
import CreateStore from "../store/CreateStore";
import Button from "@/app/_component/button/Button";
import { useEffect, useState } from "react";

interface IStudyDurationProps {
  handleCloseModal: () => void;
}

type ButtonProperty = "disabled" | "confirm" | "default" | "pressed";

export default function StudyDuration({ handleCloseModal }: IStudyDurationProps) {
  const durations = ["미정", "일주일", "한달", "3개월", "6개월"];

  const { setSelectedDuration } = CreateStore();
  const [buttonProperty, setButtonProperty] = useState<ButtonProperty>("disabled");
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const [lastItemIndex, setLastItemIndex] = useState(durations.length - 1);

  useEffect(() => {
    setLastItemIndex(durations.length - 1);
  }, [durations]);

  const handleDurationClick = (duration: string) => {
    setSelectedItem(duration);
  };

  const handleClickBtn = () => {
    setSelectedDuration(selectedItem);
    handleCloseModal();
  };

  useEffect(() => {
    setButtonProperty(selectedItem ? "confirm" : "disabled");
  }, [selectedItem]);

  return (
    <div className={styles.DurationContainer}>
      {durations.map((duration, index) => (
        <div
          key={index}
          className={`${styles.DurationItem} ${index === lastItemIndex ? styles.LastItem : ""} ${duration === selectedItem ? styles.Selected : ""}`}
          onClick={() => handleDurationClick(duration)}
        >
          {duration}
        </div>
      ))}

      <div className={styles.ButtonContainer}>
        <Button size="large_main" onClick={handleClickBtn} property={buttonProperty}>
          {buttonProperty === "confirm" ? `해당 기간으로 선택 완료` : `쇼터디 기간을 선택해 주세요`}
        </Button>
      </div>
    </div>
  );
}
