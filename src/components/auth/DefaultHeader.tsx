import LeftVector from 'assets/images/Vector.png';
import 'assets/components/header.css'
import { useNavigate } from 'react-router-dom';
import MainLogo from 'assets/images/main-goming-logo.png'
/**
 * @설명 Header 컴포넌트
 * @작성자 김상훈
 * @일자 2023.04.04.
 * @내용 Header Component 
 */
const DefaultHeader = ({type = true}: TYPE_HEADER) => {
  const navigate = useNavigate()
  const goBack = () => {
    navigate(-1)
  }
  return (
    <div className='default-login-header header'>
      {
        type === true ? (
        <div className='go-back-iconimg' onClick={goBack}>
          <img src={LeftVector} alt="뒤로가기" width={7} height={14}  />
        </div>
        ) : ''
      }
      <div className='default-header-textarea'>
        <img src={MainLogo} alt="Goming logo" />
      </div>
    </div>
  ) 
}
type TYPE_HEADER = {
  type?: boolean
}

export default DefaultHeader