import { useNavigate } from "react-router-dom"
import 'assets/pages/auth/myPageCategoryList.css'
import RightVector from 'assets/images/RightVector.png'
import Header from "components/auth/Header"

const categoryList = [ //카테고리목록
  { text: '개인정보관리', location: '/mypage' },
  { text: '공지사항', location: '/notice' },
  { text: '문의사항', location: '/qna' },
]

const MyPageCategoryList = () => {
  const navigate = useNavigate()

  //페이지이동처리
  const movePage = (location: string) => { 
    navigate(location)
  }

  //로그아웃 프로세스
  const handleLogout = () => {
    //TODO
    //1.BE로그아웃처리
    //2.store 비우기
    alert('로그아웃처리')
  }
  return (
    <>
      <div className="padding-bottom-32px">
        {/* header */}
        <Header isLeftArrow={false}/> 

        {/* welcome & logout */}
        <div className="welcome-logout">

          {/* welcome */}
          <div className="welcome-text"> 
            <h3>반가워요!</h3>
            <h3 style={{color: '#6E8DBA'}}>카페인중독자님</h3>
          </div>

          {/* logout btn */}
          <div className="logout-area">
            <button className="logout-btn" type="button" onClick={handleLogout}>로그아웃</button>
          </div>
        </div>
        
        {/** 이메일 */}
        {/* <div className="myinfo-email-area">
          <p>madness-of-coffee@google.com</p>
        </div> */}
        
      </div>

      {/* 카테고리 영역 */}
      <div className="myinfo-category-area">
        { /** 카테고리 반복 **/
        categoryList.map((item)=> (
          <button type="button" className="myinfo-category-btn" onClick={()=>movePage(item.location)}>
            <span className="">{item.text}</span>
            <span className="padding-right-24px">
              <img src={RightVector} alt="right-vector" width={6} height={10} />
            </span>
          </button>
        ))
        }
      </div>
    </>
  )
}

export default MyPageCategoryList