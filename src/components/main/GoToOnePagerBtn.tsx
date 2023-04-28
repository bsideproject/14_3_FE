import FileImg from 'assets/images/main/file-icon.png'
import { useNavigate } from 'react-router-dom'

/**
 * @desc 원페이저버튼 이동 버튼
 */
const GoToOnePagerBtn = () => {
  const navigate = useNavigate()

  //원페이저 페이지로 이동
  const goToOnepager = () => {
    navigate('/onepager')
  }

  return (
    <>
      <button type="button" className="body3-bold" 
      style={{
        background: '#3d3938', color: 'white', width: '100%', height: '44px', borderRadius: '8px', marginBottom: '32px', marginTop: '32px'
      }}
      onClick={() => goToOnepager()}
      > 
        원페이저 보기 & 다운로드
      </button>
    </>
  )
}

export default GoToOnePagerBtn