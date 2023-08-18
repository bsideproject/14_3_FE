import 'assets/components/etc/showNewQuestions.css'
import export_svg from 'assets/images/etc/export_svg.svg'
import reload_svg from 'assets/images/etc/reload.svg'
import { useEffect } from 'react'
import useETCQuestionStore, {SEARCH} from 'store/modules/ETC_QuestionList'

/**
 * @desc 추가한 질문 목록 조회 [운영자-확인용]
 * @information
 *  1. 권한과 상관없이 조회 가능하도록 설정
 *  2. AddNewQuestion 페이지를 통해서 접근 가능
 *  3. mediaQuery를 사용하여 적용하기 (web, mobile 구분 가능하면)
 * @todo
 *  1. 목록 조회 호출 - 20개씩 처리하는걸로
 *  2. filter
 *  3. sort
 */
const ShowNewQuestions = () => {
  const {getETCQuestionList} = useETCQuestionStore()
  //reset 버튼 클릭 이벤트
  const resetFilters = () => {
    console.log('resetFilters')
  }

  const exportExcel = () => {
    console.log('exportExcel')
  }

  useEffect(()=> {
    const param:SEARCH = {
      pageNo: 1,
      pageSize: 30,
    }
    getETCQuestionList(param)
  }, [])

  return (
    <div className='s-n-q-container'>
      <div className='s-n-q-inner-container'>
        <h1>추가한 질문 목록 조회</h1>
        {/* 검색영억 */}
        <div className='s-n-q-search-area'>
          <input type="text" name="search"  /> {/* 검색 */}

          <select name="itemCount" id="itemCount"> {/* 출력개수 */}
            <option value="20">20개씩 보기</option>
            <option value="30">30개씩 보기</option>
            <option value="50">50개씩 보기</option>
            <option value="100">100개씩 보기</option>
          </select>

          <button onClick={resetFilters}> {/* 초기화 */}
            <label style={{display:'none'}}>reload</label>
            <img src={reload_svg} alt="Reload" height={20} />
          </button>
          <button onClick={exportExcel}> {/* 엑셀출력 */}
            <label style={{display:'none'}}>export to excel</label>
            <img src={export_svg} alt="export" />
          </button>
        </div>
        
        {/* 목록영역 */}
        <div>
          <div className='s-n-q-list'>
            <div className='s-n-q-list-header'>
              <div style={{width:'40px'}}>No</div>
              <div style={{flex:1}}>질문</div>
              <div style={{minWidth:'80px'}}>작성자</div>
              <div style={{minWidth:'80px'}}>작성일자</div>
              <div style={{width:'40px'}}>수정</div>
              <div style={{width:'40px'}}>삭제</div>
            </div>
            <div className='s-n-q-list-item'>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShowNewQuestions