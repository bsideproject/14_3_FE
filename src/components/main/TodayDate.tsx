import { useEffect, useState } from "react"
import useAuthStore from "store/modules/Auth"
/**
 * @설명 금일일자, 사용자명 노출
 * @작성자 김상훈
 * @일자 2023.04.10.
 * @내용 메인화면 안내문구 노출
 * @TODO 사용자명 받아오기, 스타일 적용
 */
const TodayDate = () => {
  const days = ["일", "월", "화", "수", "목", "금", "토"]
  //금일날짜
  const today = new Date()
  const todayDate = today.getMonth() + '월 ' + today.getDate() + '일 ' + days[today.getDay()] + '요일'
  const [nickName, setNickName] = useState<string>('커피중독자');
  //사용자명 정의
  const {userInfo} = useAuthStore((state) => state);

  useEffect(() => {
    //임시코드
    if(userInfo.usr_nm === "" || userInfo.usr_nm === undefined || userInfo.usr_nm === null) {
      setNickName('커피중독자')
    } else {
      setNickName(userInfo.usr_nm)  //값 세팅
    }
  })
  
  return (
    <>
      <div className="todaydate-area">
        <p>{todayDate}</p>
        <h1>
          {nickName}님,<br />
          오늘의 회고 질문을 선택해보세요!
        </h1>
      </div>
    </>
  )
}

export default TodayDate