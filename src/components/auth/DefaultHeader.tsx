// import LeftVector from 'assets/images/Vector.png';
import 'assets/components/header.css'
import { useNavigate } from 'react-router-dom';
/**
 * @설명 Header 컴포넌트
 * @작성자 김상훈
 * @일자 2023.04.04.
 * @내용 Header Component 
 */
const DefaultHeader = () => {
  const navigate = useNavigate()
  const goBack = () => {
    navigate(-1)
  }
  return (
    <div className='default-login-header'>
      {/* <div className='go-back-iconimg' onClick={goBack}>
        <img src={LeftVector} alt="뒤로가기" width={7} height={14}  />
      </div> */}
      <div className='default-header-textarea'>
        <h1 className='default-header-text'>Goming</h1>
      </div>
    </div>
  ) 
}


export default DefaultHeader