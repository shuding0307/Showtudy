import styles from "./alertModal.module.css";
import Button from "@/app/_component/button/Button";
import { useRouter } from "next/navigation";

interface IAlertModal {
  handleCloseModal: () => void;
  children: React.ReactNode;
  studyIdString?: string | null;
}

export default function AlertModal({ handleCloseModal, children, studyIdString }: IAlertModal) {
  const router = useRouter();

  const handleClose = () => {
    handleCloseModal();
    router.push(`./studyInfo?studyId=${studyIdString}`);
  };

  return (
    <div className={styles.AlertModalContainer}>
      <p className={styles.ModalContent}>{children}</p>
      <div className={styles.BtnContainer}>
        <Button size="small" property="default" onClick={handleClose}>
          확인
        </Button>
      </div>
    </div>
  );
}
