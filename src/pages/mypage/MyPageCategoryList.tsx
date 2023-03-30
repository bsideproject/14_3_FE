import { useNavigate } from "react-router-dom"

const categoryList = [ //카테고리목록
  { text: '개인정보확인&수정', location: '' },
  { text: '공지사항', location: '' },
  { text: '문의사항', location: '' },
  { text: '회원탈퇴', location: '' },
]

const MyPageCategoryList = () => {
  const navigate = useNavigate()
  const movePage = (location: string) => { //페이지이동ㅊ
    navigate(location)
  }
  return (
    <>
      <div>
        {/*헤더영역 */}
          <h3>
            카페인중독자님(`name`),<br/>
            로그인해주셔서 감사합니다.
          </h3>
          {
            categoryList.map((item)=> (
              <button type="button" onClick={()=>movePage(item.location)}>
                <span>{item.text}</span>
                <span>right-arrow-icon</span>
              </button>
            ))
          }
        <div>

        </div>
      </div>
    </>
  )
}

export default MyPageCategoryList