"use client";

import styles from "./studyInfo.module.css";
import GetStudyInfo from "../api/getStudyInfo";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Navigation from "../_component/navigation/page";
import Icon_setting from "../../../public/icons/Icon_setting.svg";
import Image from "next/image";
import QuickMatchBtn from "../search_result/_component/QuickMatchBtn";
import StudySettingCard from "./_component/studySettingCard";
import ButtonFooter from "../_component/footer/ButtonFooter";
import { useSearchParams } from "next/navigation";
import MemberCard from "./_component/MemberCard";
import Category from "./_component/category";
import { useModal } from "@/hooks/useModal";
import ModalContainer from "../_component/ModalContainer";
import ModalPortal from "../_component/ModalPortal";
import MemberModal from "./_component/memberModal";
import GetUserProfile from "../api/getUserProfile";
import useAuth from "@/hooks/useAuth";

interface Imember {
  nickname: string;
  profileImage: string;
  _owner: boolean;
}

export default function StudyInfo() {
  const { openModal, handleOpenModal, handleCloseModal } = useModal();
  const params = useSearchParams();
  const studyIdString = params.get("studyId");
  const studyId: number = studyIdString ? parseInt(studyIdString) : -1;
  const [tendency, setTendency] = useState<string>("");
  const [duration, setDuration] = useState<string>("");
  const [isQuick, setIsQuick] = useState<boolean>(false);
  const [watchMember, setWatchMember] = useState<string>("");
  const { accessToken } = useAuth();

  const { data, isLoading, error } = useQuery({
    queryKey: ["STUDY_INFO", studyId],
    queryFn: async () => GetStudyInfo(studyId),
  });

  useEffect(() => {
    if (data) {
      console.log(studyId, data);
      setTendency(data.tendency);
      setDuration(data.duration);
      if (data.matching_type === "Quick") {
        setIsQuick(true);
      }
    }
    if (error) console.log(error);
  }, []);

  useEffect(() => {
    console.log(watchMember);
    if (watchMember !== "") {
      getUserProfile();
      handleOpenModal();
    }
  }, [watchMember]);

  const getUserProfile = async () => {
    try {
      const res = await GetUserProfile(watchMember, accessToken);
      console.log(res.profile);
    } catch (error) {
      console.log(error);
    }
  };

  const formatTendency = (tendency: string) => {
    switch (tendency) {
      case "Active":
        return "활발한 대화와 동기부여 원해요";
      case "Feedback":
        return "학습 피드백을 주고받고 싶어요";
      case "Focus":
        return "조용히 집중하고 싶어요";
      default:
        return "";
    }
  };

  const formatDuration = (duration: string) => {
    switch (duration) {
      case "1w":
        return "일주일";
      case "1m":
        return "한달";
      case "3m":
        return "3개월";
      case "6m":
        return "6개월";
      default:
        return "미정";
    }
  };

  return (
    <div className={styles.container}>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Navigation
            isBack={true}
            dark={false}
            onClick={() => {
              return;
            }}
          >
            <p className={styles.mainTitle}>{data.title}</p>
            <Image
              className={styles.settingIcon}
              src={Icon_setting}
              width={48}
              height={48}
              onClick={() => {
                return;
              }}
              alt="settingIcon"
            />
          </Navigation>
          <div className={styles.hrOrange}></div>
          <div className={styles.filterBox}>
            {isQuick && <QuickMatchBtn isQuick={true} />}
            <Category>{data.category}</Category>
          </div>
          <div className={styles.studyDetail}>
            <p className={styles.studyTitle}>{data.title}</p>
            <p className={styles.studyDescription}>{data.description}</p>
            <div className={styles.tagBox}>
              {data.tags.map((tag: string, index: number) => (
                <p key={index} className={styles.tag}>
                  #{tag}
                </p>
              ))}
            </div>
          </div>
          <div className={styles.hrLine}></div>
          <div className={styles.studySetting}>
            <p className={styles.subTitle}>학습 설정</p>
            <div className={styles.cardBox}>
              <StudySettingCard type="기간" descript={formatDuration(data.duration)}></StudySettingCard>
              <StudySettingCard type="인원" descript={`${data.membersList.length}명`}></StudySettingCard>
              <StudySettingCard type="분위기" descript={formatTendency(data.tendency)}></StudySettingCard>
            </div>
          </div>
          <div className={styles.hrLine}></div>
          <div className={styles.membersBox}>
            <p className={styles.subTitle}>참여 멤버</p>
            <div className={styles.members}>
              {data.membersList.map((member: Imember, index: number) => (
                <MemberCard
                  key={index}
                  nickname={member.nickname}
                  profile={member.profileImage}
                  owner={member._owner}
                  onClick={() => setWatchMember(member.nickname)}
                />
              ))}
            </div>
          </div>
          <div className={styles.footer}>
            <ButtonFooter study_id={studyId} />
          </div>
          {openModal && (
            <ModalPortal>
              <ModalContainer>
                <MemberModal handleCloseModal={handleCloseModal} nickname={watchMember} />
              </ModalContainer>
            </ModalPortal>
          )}
        </>
      )}
    </div>
  );
}
