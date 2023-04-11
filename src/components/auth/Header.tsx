import LeftVector from 'assets/images/Vector.png';
import 'assets/components/header.css'
import { useNavigate } from 'react-router-dom';
/**
 * @설명 Header 컴포넌트
 * @작성자 김상훈
 * @일자 2023.04.04.
 * @내용 Header Component 
 * @param {string} title 표시할 텍스트
 */
const Header = ({title}: HEADER_INFO) => {
  const navigate = useNavigate()
  const goBack = () => {
    navigate(-1)
  }
  return (
    <>
      <div className='login-header header'>
        <div className='go-back-iconimg' onClick={goBack}>
          <img src={LeftVector} alt="뒤로가기" width={7} height={14}  />
        </div>
        <div className='header-text'>
          <p>{title}</p>
        </div>
      </div>
    </>
  ) 
}
type HEADER_INFO = {
  title: string
}

export default Header