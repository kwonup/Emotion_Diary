import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Button from "../components/Button";
import Editor from "../components/Editor";
import { useContext, useEffect, useState } from "react";
import { DiaryDispatchContext, DiaryStateContext } from "../App";

const Edit = () => {
  // URL 파라미터(/edit/:id)에서 현재 수정 대상 id를 가져온다.
  const params = useParams();
  const nav = useNavigate();
  const { onDelete, onUpdate } = useContext(DiaryDispatchContext);
  const data = useContext(DiaryStateContext);
  // 현재 수정할 일기 데이터를 Editor에 넘기기 위해 별도 state로 보관한다.
  const [curDiaryItem, setCurDiaryItem] = useState();

  useEffect(() => {
    // 현재 URL id와 일치하는 일기를 목록에서 찾는다.
    const currentDiaryItem = data.find(
      (item) => String(item.id) === String(params.id),
    );
    // 일기가 없으면 경고 후 홈으로 보낸다.
    if (!currentDiaryItem) {
      window.alert("존재하지 않는 일기입니다.");
      nav("/", { replace: true });
    }
    // 찾은 일기를 Editor 초기값으로 사용한다.
    setCurDiaryItem(currentDiaryItem);
  }, [params.id]);

  const onClickDelete = () => {
    if (window.confirm("일기를 정말 삭제할까요? 다시 복구되지 않아요!")) {
      // 확인 시 현재 일기를 삭제하고 홈으로 이동한다.
      onDelete(params.id);
      nav("/", { replace: true });
    }
  };

  const onSubmit = (input) => {
    if (window.confirm("일기를 정말 수정할까요?")) {
      // Editor에서 받은 입력값으로 기존 일기를 업데이트한다.
      onUpdate(
        params.id,
        input.createdDate.getTime(),
        input.emotionId,
        input.content,
      );
      // 수정 완료 후 홈으로 이동한다.
      nav("/", { replace: true });
    }
  };
  return (
    <div>
      <Header
        title={"일기 수정하기"}
        leftChild={<Button onClick={() => nav(-1)} text={"< 뒤로 가기"} />}
        rightChild={
          <Button onClick={onClickDelete} text={"삭제하기"} type={"NEGATIVE"} />
        }
      />
      <Editor initData={curDiaryItem} onSubmit={onSubmit} />
    </div>
  );
};
export default Edit;
