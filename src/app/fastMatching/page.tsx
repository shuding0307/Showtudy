"use client";

import styles from "./fastmatching.module.css";
import Navigation from "../_component/navigation/page";
import { useState, useEffect } from "react";
import Button from "../_component/button/Button";
import FastCalendar from "./_component/FastCalendar";
import FastDuration from "./_component/FastDuration";
import FastField from "./_component/FastField";
import SecondPage from "./_component/SecondPage";
import LastFast from "./_component/LastFast";
import { useModal } from "@/hooks/useModal";
import ModalPortal from "../_component/ModalPortal";
import CreateModalContainer from "../_component/createModalContainer";
import { getFormattedDuration } from "./utils/getFormatDuration";
import useFastStore from "./store/FastStore";
import useAuth from "@/hooks/useAuth";
import { useRouter, useSearchParams } from "next/navigation";
import moment from "moment";
import GetQuickFiler from "../api/quickFilter";
import { fetchType } from "./type/fastType";
import useFromStore from "@/utils/from";

export default function FastMatching() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const stepParam = searchParams.get("step");
  const [step, setStep] = useState<number>(stepParam ? Number(stepParam) : 1);
  const [progress, setProgress] = useState<number>(0);
  const [pick, setPick] = useState<string>("");
  const [buttonProperty, setButtonProperty] = useState<"disabled" | "confirm">("disabled");
  const [data, setData] = useState<fetchType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { openModal, handleCloseModal, handleOpenModal } = useModal();
  const { selectedDate, selectedDuration, selectedField } = useFastStore();
  const { setSelectedDate, setSelectedDuration, setSelectedField, setRecruitArr, setTendency, setSave } =
    useFastStore();
  const { accessToken } = useAuth();
  const { from } = useFromStore();

  const formattedDate = selectedDate ? moment(selectedDate).format("YY.MM.DD") : "시작 날짜 선택하기";
  const formattedDuration = selectedDuration ? getFormattedDuration(selectedDuration) : "학습 기간 선택하기";
  const formattedField = selectedField ? selectedField : "학습 분야 선택하기";

  useEffect(() => {
    if (selectedDate && selectedDuration && selectedField) setButtonProperty("confirm");
    else setButtonProperty("disabled");
  }, [selectedDate, selectedDuration, selectedField]);

  useEffect(() => {
    setStep(1);
    console.log(selectedDuration);
  }, []);

  // 초기 데이터 불러오기

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postData = await GetQuickFiler(accessToken);
        setData(postData);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(true);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (data) {
      setSave(true);
      setSelectedDate(data.start_date);
      setSelectedDuration(data.duration === "" ? "미정" : data.duration);
      setSelectedField(data.category);
      setRecruitArr((prevArr) => [...prevArr, ...data.mem_scope]);
      setTendency((prevArr) => [...prevArr, ...data.tendency]);
    } else {
      setSave(false);
      setSelectedDate(null);
      setSelectedDuration(null);
      setSelectedField(null);
      setRecruitArr(() => []);
      setTendency(() => []);
    }
  }, [data]);

  // Step변경
  useEffect(() => {
    if (stepParam) {
      setStep(Number(stepParam));
    }
  }, [stepParam]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(50);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleCalendar = () => {
    setPick("calendar");
    handleOpenModal();
  };

  const handleDuration = () => {
    setPick("duration");
    handleOpenModal();
  };

  const handleField = () => {
    setPick("field");
    handleOpenModal();
  };

  const goNext = () => {
    router.push("./fastMatching?step=2");
  };

  return (
    <>
      {isLoading ? (
        <div className={styles.FastContainer}>
          {step === 1 && (
            <>
              <Navigation
                dark={false}
                isBack={true}
                onClick={() => {
                  router.push(`./${from}`);
                }}
              >
                빠른 매칭
              </Navigation>
              <div className={styles.seperator}>
                <div className={styles.progressBar} style={{ width: `${progress}%` }}></div>
              </div>
              <div className={styles.ContentContainer}>
                <div className={styles.Header}>
                  <p>간단한 조건 설정으로</p>
                  <p>빠르게 스터디를 찾아보세요!</p>
                </div>
                <div className={styles.ChoiceHeader}>
                  <p>학습 분야와 기간을 선택해 주세요</p>
                </div>
                <div className={styles.ChoiceContainer}>
                  <div className={styles.ChoiceBox}>
                    <div
                      className={`${styles.Choice} ${selectedField ? styles.selectedDate : ""}`}
                      onClick={handleField}
                    >
                      {formattedField}
                    </div>
                    <div className={styles.ChoiceComment}>분야로</div>
                  </div>
                  <div className={styles.ChoiceBox}>
                    <div
                      className={`${styles.Choice} ${selectedDate ? styles.selectedDate : ""}`}
                      onClick={handleCalendar}
                    >
                      {formattedDate}
                    </div>
                    <div className={styles.ChoiceComment}>부터</div>
                  </div>
                  <div className={styles.ChoiceBox}>
                    <div
                      className={`${styles.Choice} ${selectedDuration ? styles.selectedDate : ""}`}
                      onClick={handleDuration}
                    >
                      {formattedDuration}
                    </div>
                    <div className={styles.ChoiceComment}>까지 공부할래요</div>
                  </div>
                </div>
                <div className={styles.ButtonContainer}>
                  <Button size="large_main" onClick={goNext} property={buttonProperty}>
                    Step 2로 가기
                  </Button>
                </div>
                {openModal && (
                  <ModalPortal>
                    <CreateModalContainer handleCloseModal={handleCloseModal}>
                      {pick === "calendar" ? (
                        <FastCalendar handleCloseModal={handleCloseModal} />
                      ) : pick === "duration" ? (
                        <FastDuration handleCloseModal={handleCloseModal} />
                      ) : pick === "field" ? (
                        <FastField handleCloseModal={handleCloseModal} />
                      ) : null}
                    </CreateModalContainer>
                  </ModalPortal>
                )}
              </div>
            </>
          )}
          {step === 2 && <SecondPage />}
          {step === 3 && <LastFast />}
        </div>
      ) : null}
    </>
  );
}
