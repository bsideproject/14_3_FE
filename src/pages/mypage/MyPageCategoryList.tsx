import { useNavigate } from "react-router-dom"
import 'assets/pages/auth/myPageCategoryList.css'
import RightArrow from 'assets/images/right-arrow.png'
import useDefaultSets from "store/modules/Defaults"
import { useEffect } from "react"
import Header from "components/auth/Header"
import Footer from "components/Footer"
import NavigationBar from "components/NavigationBar"

const categoryList = [ //카테고리목록
  { text: '개인정보관리', location: '/mypage' },
  { text: '공지사항', location: '/notice' },
  { text: '문의사항', location: '/qna' },
]

/**
 * @설명 마이페이지 진입 전 카테고리 목록
 * @작성자 김상훈
 * @일자 2023.04.10.
 */
const MyPageCategoryList = () => {
  //헤더설정
  const {setHeaderText, setHeaderBgColor} = useDefaultSets()
  useEffect(()=> {
    setHeaderText()
    setHeaderBgColor(true)

    return (()=> setHeaderBgColor(false))
  },[])

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
      <div className="categorylist-wrap">
        <Header></Header>
        <div className="categorylist-top">
          {/* header */}
          <div className="welcome-logout">
            {/* welcome */}
            <div> 
              <h3 className="headline3">반가워요!</h3>
              <h3 className="headline3" style={{color: '#6E8DBA'}}>카페인중독자님</h3>
            </div>

            {/* logout btn */}
            <div className="logout-area">
              <button className="logout-btn caption1-bold" type="button" onClick={handleLogout}>로그아웃</button>
            </div>
          </div>
        </div>
        
        {/* 카테고리 영역 */}
        <div className="myinfo-category-area">
          { /** 카테고리 반복 **/
            categoryList.map((item)=> (
              <button type="button" className="myinfo-category-btn" onClick={()=>movePage(item.location)}>
                <span className="">{item.text}</span>
                <img className="right-arrow-img" src={RightArrow} alt="right-vector" width={24} height={24} />
              </button>
            ))
          }
        </div>
      </div>
      <Footer></Footer>
      <NavigationBar></NavigationBar>
    </>
  )
}

export default MyPageCategoryList