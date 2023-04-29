import 'assets/components/footer.css'
import RectangleDived from 'assets/images/rectangleDived.png'
import GomingLogo from 'assets/images/goming-logo.png'

/**
 * @파일 Footer
 * @작성자 김상훈
 * @일자 2023.04.16.
 * @param {boolean} type default:true
 * @desc type 에 false 를 전달 시, 하단여백 O
 * @desc props 를 내려주지 않을 시, 하단여백 X
 */
const Footer = ({type = true}: TYPE_FOOTER) => {
  return (
    <>
      <div className="footer-area">
        <div className='inside-footer-area'>
          <div className='footer-title'>
            <img src={GomingLogo} alt="Goming" />
          </div>
          <div className="footer-service-area caption1-regular mb-12">
            <p>서비스 소개</p>
            <div>
              <img src={RectangleDived} alt="|" width={1} height={12}/>
            </div>
            <p>개인정보 처리방침</p>
            <div>
              <img src={RectangleDived} alt="|" width={1} height={12}/>
            </div>
            <p>이용약관</p>
          </div>
          <p className='caption1-regular mb-12'>문의사항 : goming.team@gmail.com</p>
          <p className='caption1-regular mb-40'>©Goming All rights reserved.</p>
          {/* type 에 따른 영역 제어 */}
          {
            type === false ? (<div style={{height:'64px'}}></div>) : ''
          }
        </div>
      </div>
    </>
  )
}

type TYPE_FOOTER = {
  type?: boolean
}

export default Footer