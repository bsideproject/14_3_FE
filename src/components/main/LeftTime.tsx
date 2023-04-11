const LeftTime = () => {
  //금일날짜
  const today = new Date()
  const todayDate = today.getMonth() + '월 ' + today.getDate() + '일 '
  return (
    <>
      <p>{todayDate}</p>
      <h1>
        커피중독자님(이름),<br />
        오늘의 회고 질문을 선택해보세요!
      </h1>
    </>
  )
}

export default LeftTime