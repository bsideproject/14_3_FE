import 'assets/components/navigationBar.css'
import useNavBarStatus from 'store/modules/NavBar';

/**
 * @설명 네비게이션 하단바
 * @작성자 김상훈
 * @일자 2023.04.16.
 * @TODO state 사용하여 navbar 선택된것 유지 시키기
 */
const NavigationBar = () => {
  const { status, updateStatus } = useNavBarStatus((state) => state);
  return (
    <>
      <div className="navbar-area">
        {/* 오늘의고밍 */}
        <div className='navbar-item' onClick={() => updateStatus(1)}>
          <TodyGomingSvg status={status === 1 ? true : false}/>
          <p 
            style={{color: status === 1 ? '': 'var(--wgray08)'}}
            className='navbar-text caption1-bold ' 
            >오늘의 고밍</p>
        </div>

        {/* 고밍 기록 */}
        <div className='navbar-item' onClick={() => updateStatus(2)}>
          <CalendarSvg status={status === 2 ? true : false}/>
          <p 
            style={{color: status === 2 ? '': 'var(--wgray08)'}}
            className='navbar-text caption1-bold ' 
            >고밍 기록</p>
        </div>

        {/* 고밍 설정 */}
        <div className='navbar-item' onClick={() => updateStatus(3)}>
          <SettingSvg status={status === 3 ? true : false}/>
          <p 
            style={{color: status === 3 ? '': 'var(--wgray08)'}}
            className='navbar-text caption1-bold ' 
            >고밍 설정</p>
        </div>
      </div>
    </>
  )
}

//오늘의고밍 svg
export const TodyGomingSvg = ({status}:FILL_CONTROL) => {
  return (
    <>
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path 
      fill={status === true ? '#3D3938' : '#96938C' } //active에 따른 색 제어
      fillRule="evenodd" clipRule="evenodd" d="M0.698438 0.698438C1.14564 0.251236 1.75218 0 2.38462 0H17.6154C18.2478 0 18.8544 0.251236 19.3016 0.698438C19.7488 1.14564 20 1.75218 20 2.38462V14.1538C20 14.7863 19.7488 15.3928 19.3016 15.84C18.8544 16.2872 18.2478 16.5385 17.6154 16.5385H9.82507L5.77915 19.7804C5.47906 20.0208 5.06767 20.0679 4.72101 19.9015C4.37435 19.735 4.15385 19.3845 4.15385 19V16.5385H2.38462C1.75218 16.5385 1.14564 16.2872 0.698438 15.84C0.251236 15.3928 0 14.7863 0 14.1538V2.38462C0 1.75218 0.251236 1.14564 0.698438 0.698438ZM2.38462 2C2.28261 2 2.18478 2.04052 2.11265 2.11265C2.04052 2.18478 2 2.28261 2 2.38462V14.1538C2 14.2559 2.04052 14.3537 2.11265 14.4258C2.18478 14.4979 2.28261 14.5385 2.38462 14.5385H5.15385C5.70613 14.5385 6.15385 14.9862 6.15385 15.5385V16.9173L8.84854 14.7581C9.02595 14.6159 9.24651 14.5385 9.47385 14.5385H17.6154C17.7174 14.5385 17.8152 14.4979 17.8873 14.4258C17.9595 14.3537 18 14.2559 18 14.1538V2.38462C18 2.28261 17.9595 2.18478 17.8873 2.11265C17.8152 2.04052 17.7174 2 17.6154 2H2.38462Z" />
      <path 
      fill={status === true ? '#3D3938' : '#96938C' } //active에 따른 색 제어
      fillRule="evenodd" clipRule="evenodd" d="M10.2101 5.48218C10.0012 5.44063 9.78468 5.46195 9.5879 5.54346C9.39112 5.62497 9.22292 5.76301 9.10459 5.9401C8.98626 6.1172 8.9231 6.32542 8.9231 6.53841C8.9231 7.0907 8.47538 7.53841 7.9231 7.53841C7.37081 7.53841 6.9231 7.0907 6.9231 6.53841C6.9231 5.92985 7.10355 5.33496 7.44165 4.82896C7.77975 4.32297 8.2603 3.92859 8.82253 3.69571C9.38477 3.46282 10.0034 3.40189 10.6003 3.52061C11.1972 3.63933 11.7454 3.93238 12.1757 4.3627C12.606 4.79301 12.8991 5.34127 13.0178 5.93813C13.1365 6.535 13.0756 7.15366 12.8427 7.7159C12.6098 8.27813 12.2155 8.75868 11.7095 9.09678C11.4849 9.24685 11.2428 9.36587 10.9897 9.45183C10.9198 9.93579 10.5033 10.3076 10 10.3076C9.44773 10.3076 9.00002 9.85993 9.00002 9.30764V8.61533C9.00002 8.06305 9.44773 7.61533 10 7.61533C10.213 7.61533 10.4212 7.55217 10.5983 7.43384C10.7754 7.31551 10.9135 7.14731 10.995 6.95053C11.0765 6.75375 11.0978 6.53722 11.0562 6.32831C11.0147 6.11941 10.9121 5.92752 10.7615 5.77691C10.6109 5.6263 10.419 5.52373 10.2101 5.48218Z" />
      <path 
      fill={status === true ? '#3D3938' : '#96938C' } //active에 따른 색 제어
      d="M10.0001 11.3846C9.79474 11.3846 9.59397 11.4455 9.42319 11.5596C9.25242 11.6737 9.11932 11.8359 9.04072 12.0256C8.96212 12.2154 8.94155 12.4242 8.98162 12.6256C9.02169 12.8271 9.1206 13.0121 9.26583 13.1573C9.41106 13.3026 9.5961 13.4015 9.79754 13.4416C9.99898 13.4816 10.2078 13.4611 10.3975 13.3825C10.5873 13.3039 10.7495 13.1708 10.8636 13C10.9777 12.8292 11.0386 12.6284 11.0386 12.423C11.035 12.1487 10.9244 11.8867 10.7305 11.6927C10.5365 11.4987 10.2744 11.3882 10.0001 11.3846Z" />
      </svg>

    </>
  )
}

//캘린더 svg
export const CalendarSvg = ({status}:FILL_CONTROL) => {
  return (
    <>
      <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path 
          fill={status === true ? '#3D3938' : '#96938C' } //active에 따른 색 제어
          fillRule="evenodd" clipRule="evenodd" d="M5 0C5.55229 0 6 0.447715 6 1V2H12V1C12 0.447715 12.4477 0 13 0C13.5523 0 14 0.447715 14 1V2.00003C14.4591 2.00031 14.8592 2.00313 15.1949 2.03057C15.5902 2.06289 15.9831 2.13424 16.3614 2.32698C16.9248 2.61405 17.3851 3.07224 17.6732 3.63781C17.8659 4.016 17.9372 4.40906 17.9695 4.80396C18 5.17815 18 5.6323 18 6.15839V15.8421C18 16.3682 18 16.8221 17.9695 17.1962C17.9372 17.591 17.8659 17.9838 17.6732 18.3619C17.3854 18.9269 16.9254 19.3859 16.3614 19.6732C15.9833 19.8659 15.5905 19.9372 15.1957 19.9695C14.8217 20 14.3677 20 13.8416 20H4.15839C3.6323 20 3.17815 20 2.80397 19.9695C2.40906 19.9372 2.016 19.8659 1.63781 19.6732C1.07276 19.3853 0.614315 18.9258 0.326982 18.3619C0.134209 17.9835 0.0628795 17.5904 0.0305727 17.1951C-3.25181e-05 16.8206 -1.70213e-05 16.3659 8.60089e-07 15.8388V6.16168C-1.70213e-05 5.6345 -3.23988e-05 5.17965 0.0305692 4.80498C0.0628619 4.40962 0.134158 4.01624 0.326982 3.63781C0.614602 3.07332 1.07332 2.6146 1.63781 2.32698C2.01625 2.13416 2.40962 2.06286 2.80499 2.03057C3.14079 2.00314 3.54102 2.00031 4 2.00003V1C4 0.447715 4.44772 0 5 0ZM2.9678 4.02393C2.69595 4.04613 2.59517 4.08383 2.54579 4.10899C2.35763 4.20487 2.20487 4.35763 2.109 4.54579C2.08383 4.59517 2.04614 4.69595 2.02393 4.9678C2.00358 5.21702 2.00052 5.53498 2.00007 6H15.9999C15.9995 5.53429 15.9965 5.21614 15.9761 4.96686C15.9539 4.69554 15.9163 4.595 15.8912 4.54579C15.7959 4.35871 15.6427 4.20542 15.4534 4.10899C15.4039 4.08374 15.3032 4.0461 15.0319 4.02392C14.7488 4.00078 14.3768 4 13.8002 4H4.2002C3.62365 4 3.25126 4.00078 2.9678 4.02393ZM16 8H2V15.8002C2 16.3768 2.00078 16.7489 2.02393 17.0322C2.04612 17.3037 2.08378 17.4044 2.109 17.4539C2.20516 17.6426 2.35819 17.7956 2.54579 17.8912C2.595 17.9163 2.69554 17.9539 2.96686 17.9761C3.2498 17.9992 3.62146 18 4.19691 18H13.8031C14.3786 18 14.75 17.9992 15.0327 17.9761C15.3036 17.9539 15.4041 17.9164 15.4534 17.8912C15.6421 17.7951 15.7956 17.6415 15.8912 17.4539C15.9164 17.4046 15.954 17.3041 15.9761 17.0332C15.9992 16.7505 16 16.379 16 15.8036V8ZM12.7071 10.2929C13.0976 10.6834 13.0976 11.3166 12.7071 11.7071L8.70711 15.7071C8.31658 16.0976 7.68342 16.0976 7.2929 15.7071L5.2929 13.7071C4.90237 13.3166 4.90237 12.6834 5.2929 12.2929C5.68342 11.9024 6.31658 11.9024 6.70711 12.2929L8 13.5858L11.2929 10.2929C11.6834 9.90237 12.3166 9.90237 12.7071 10.2929Z" />
        </svg>

    </>
  )
}
//설정 svg
//캘린더 svg
export const SettingSvg = ({status}:FILL_CONTROL) => {
  return (
    <>
      <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path 
      fill={status === true ? '#3D3938' : '#96938C' } //active에 따른 색 제어
      fillRule="evenodd" clipRule="evenodd" d="M0.157234 10.6173L0.157226 10.6147L0.15723 9.3827C0.158668 8.90465 0.306622 8.43602 0.584815 8.0381C0.862973 7.64023 1.25956 7.33021 1.72583 7.15284M1.72702 7.15239L3.10582 6.62662L4.06504 4.98549L3.83583 3.50639C3.77149 3.03984 3.84937 2.56416 4.06102 2.13898C4.27278 1.71357 4.61035 1.35558 5.0347 1.11383L5.03922 1.11125L6.10088 0.514093C6.531 0.266689 7.02968 0.151525 7.5311 0.18647C8.03328 0.221464 8.50986 0.405019 8.89882 0.709095L8.90195 0.711549L10.0538 1.60153L11.9393 1.60153L13.0982 0.681552C13.4877 0.376008 13.9655 0.191575 14.4691 0.156484C14.9705 0.121539 15.4692 0.236718 15.8994 0.484149L16.9609 1.08128L16.9655 1.08384C17.3898 1.32559 17.7274 1.68359 17.9392 2.10899C18.1508 2.53417 18.2286 3.00984 18.1642 3.47638L18.1622 3.49072L17.9351 4.9555L18.8944 6.59663L20.2732 7.12241C20.7398 7.29973 21.137 7.61 21.4154 8.00811C21.6936 8.40604 21.8415 8.87466 21.8429 9.35272L21.8429 9.35531L21.8429 10.6147L21.8429 10.6173C21.8415 11.0953 21.6936 11.5639 21.4154 11.9619C21.137 12.36 20.7401 12.6701 20.2735 12.8474L18.8944 13.3733L17.9351 15.0145L18.1643 16.4936C18.2287 16.9601 18.1508 17.4358 17.9392 17.861C17.7274 18.2864 17.3898 18.6444 16.9655 18.8861L16.961 18.8887L15.8993 19.4859C15.4692 19.7333 14.9705 19.8484 14.4691 19.8135C13.9668 19.7785 13.4902 19.5949 13.1012 19.2908L11.9463 18.3984L10.0609 18.3984L8.90196 19.3184C8.51244 19.624 8.03463 19.8084 7.5311 19.8435C7.02969 19.8784 6.53101 19.7633 6.10091 19.5159L5.03469 18.9161C4.61034 18.6744 4.27278 18.3164 4.06102 17.891C3.84937 17.4658 3.77161 16.9901 3.83595 16.5236L3.83793 16.5092L4.06549 15.0416L3.10297 13.3723L1.72702 12.8476C1.26039 12.6703 0.863136 12.36 0.584815 11.9619C0.306622 11.5639 0.158669 11.0953 0.157234 10.6173M2.04294 10.6131C2.04353 10.7387 2.08264 10.8591 2.15213 10.9585C2.2216 11.0578 2.317 11.1302 2.4227 11.1704L4.1145 11.8155C4.31719 11.8928 4.48559 12.0349 4.591 12.2178L5.87039 14.4366C5.97018 14.6097 6.00781 14.8093 5.97751 15.0049L5.70471 16.7653C5.68919 16.886 5.71015 17.0079 5.76345 17.1149C5.81714 17.2228 5.89992 17.3085 5.99758 17.3646L7.0711 17.9684C7.17081 18.0261 7.28321 18.0515 7.39414 18.0437C7.50449 18.036 7.61296 17.9957 7.70489 17.9241L9.11872 16.8018C9.28792 16.6674 9.50086 16.5939 9.7207 16.5939L12.2795 16.5939C12.495 16.5939 12.7041 16.6646 12.8718 16.7942L14.2937 17.8928C14.3859 17.9652 14.495 18.006 14.606 18.0137C14.717 18.0215 14.8294 17.9962 14.9291 17.9385L14.9392 17.9327L16.0008 17.3356L16.0026 17.3346C16.1003 17.2785 16.183 17.1928 16.2367 17.0849C16.29 16.9779 16.311 16.8561 16.2955 16.7353L16.0227 14.9749C15.9921 14.7776 16.0307 14.5762 16.1324 14.4021L17.4118 12.2132C17.5174 12.0325 17.6847 11.8921 17.8857 11.8155L19.5775 11.1704C19.6832 11.1302 19.7786 11.0578 19.848 10.9585C19.9176 10.859 19.9567 10.7384 19.9572 10.6127L19.9572 9.3579C19.9567 9.23216 19.9176 9.11101 19.848 9.01151C19.7786 8.91214 19.6832 8.83977 19.5775 8.79963L19.5763 8.79918L17.8857 8.1545C17.6847 8.07787 17.5174 7.93745 17.4118 7.75678L16.1324 5.56789C16.0307 5.39382 15.9921 5.19239 16.0227 4.9951L16.2955 3.23468C16.311 3.11392 16.29 2.99209 16.2367 2.88503C16.183 2.77716 16.1002 2.69145 16.0026 2.63536L16.0008 2.63438L14.9291 2.03154C14.8294 1.97384 14.717 1.9485 14.606 1.95623C14.4957 1.96392 14.3872 2.00428 14.2953 2.07585L14.2936 2.07714L12.8815 3.19821C12.7122 3.33252 12.4993 3.40604 12.2795 3.40604L9.7207 3.40604C9.50515 3.40604 9.2961 3.33536 9.12839 3.20578L7.70651 2.10715C7.61423 2.03476 7.50515 1.99395 7.39414 1.98622C7.28321 1.97848 7.17077 2.00376 7.07106 2.06146L7.06098 2.06729L5.99932 2.66437L5.9976 2.66535C5.89993 2.72144 5.81714 2.80715 5.76345 2.91501C5.71015 3.02208 5.68919 3.14392 5.70471 3.26469L5.97751 5.02509C6.00809 5.22238 5.96949 5.4238 5.86774 5.59788L4.58836 7.78676C4.48276 7.96743 4.31545 8.10786 4.1145 8.18449L2.4227 8.82961C2.317 8.86976 2.2216 8.94212 2.15213 9.04149C2.08264 9.14088 2.04353 9.26128 2.04294 9.38687L2.04294 10.6131ZM8.17008 12.7491C7.42506 12.0158 7.01108 11.0264 7.01108 9.99998C7.01108 9.23407 7.24168 8.48336 7.67662 7.84263C8.11172 7.20163 8.73293 6.6981 9.46479 6.3997C10.197 6.10117 11.0042 6.02262 11.7834 6.17517C12.5623 6.32769 13.274 6.70346 13.8301 7.25082C14.3859 7.7979 14.7615 8.49188 14.9134 9.24371C15.0653 9.99543 14.9876 10.7749 14.689 11.4845C14.3903 12.1943 13.8828 12.8051 13.2265 13.2367C12.5699 13.6685 11.7951 13.9007 11.0001 13.9007C9.93341 13.9007 8.91598 13.4834 8.17008 12.7491ZM8.89679 9.99998C8.89679 10.564 9.12467 11.1 9.52218 11.4913C9.91881 11.8817 10.451 12.0962 11.0001 12.0962C11.4101 12.0962 11.8131 11.9767 12.1584 11.7496C12.504 11.5222 12.7773 11.1964 12.9398 10.8104C13.1023 10.4242 13.1452 9.99789 13.062 9.58631C12.9789 9.17484 12.7742 8.80026 12.478 8.50866C12.182 8.21733 11.8082 8.02194 11.4054 7.94306C11.0027 7.86422 10.585 7.90443 10.204 8.0598C9.82259 8.21529 9.49231 8.48041 9.25799 8.82561C9.02349 9.17107 8.89679 9.57981 8.89679 9.99998Z" />
      </svg>

    </>
  )
}

type FILL_CONTROL = {
  status: boolean
}

export default NavigationBar