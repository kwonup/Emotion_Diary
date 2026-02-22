import { useContext, useState, useEffect } from "react";
import { DiaryStateContext } from "../App";
import { useNavigate } from "react-router-dom";

const useDiary = (id) => {
  const nav = useNavigate();

  const data = useContext(DiaryStateContext);
  const [curDiaryItem, setCurDiaryItem] = useState();

  useEffect(() => {
    // 현재 URL id와 일치하는 일기를 목록에서 찾는다.
    const currentDiaryItem = data.find(
      (item) => String(item.id) === String(id),
    );
    // 일기가 없으면 경고 후 홈으로 보낸다.
    if (!currentDiaryItem) {
      window.alert("존재하지 않는 일기입니다.");
      nav("/", { replace: true });
    }
    // 찾은 일기를 Editor 초기값으로 사용한다.
    setCurDiaryItem(currentDiaryItem);
  }, [id]);

  return curDiaryItem;
};
export default useDiary;
