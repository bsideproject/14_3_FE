import 'assets/components/header.css'
import { useNavigate } from 'react-router-dom';
import MainLogo from 'assets/images/main-goming-logo.png'
import LeftArrow from 'assets/images/left-arrow.png'
/**
 * @설명 Header 컴포넌트
 * @작성자 김상훈
 * @일자 2023.04.04.
 * @내용 Header Component 
 * @param {string} title 표시할 텍스트
 * @param {boolean} isLeftArrow leftArrow 존재여부 (default: true)
 * @desc title 값이 전달되면, title값이 작성된 헤더가 출력됨
 */
const Header = ({isLeftArrow = true, title}: HEADER_INFO) => {
  const navigate = useNavigate()
  const goBack = () => {
    navigate(-1)
  }

  return (
    <>
      <div className='login-header header'>
        
        {// Left Arrow
          isLeftArrow && (
            <div className='go-back-iconimg' onClick={goBack}>
              <img src={LeftArrow} alt="뒤로가기" width={24} height={24} />
            </div>
          )
        }
        
        
        { //TITLE 을 전달받았을 경우 - TITLE이 있는 텍스트 헤더 출력
          title ? ( 
            <div className='header-text'>
              <p>{title}</p>
            </div>
          ) : (
            //그렇지 않은경우, Goming 이미지 출력
            <div className='header-logo-area'>
              <img src={MainLogo} alt="Goming logo" />
            </div>
          )
        }
        </div>
    </>
  ) 
}
type HEADER_INFO = {
  isLeftArrow?: boolean
  title?: string
}

export default Header