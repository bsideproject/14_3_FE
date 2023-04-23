
import html2canvas from 'html2canvas';
import Masonry from 'react-masonry-css'
import 'assets/pages/onepager/onepagermain.css'
import Header from 'components/auth/Header';
import downloadjs from 'downloadjs'

const testData = [
  {index: 1, content: 'contentsssssssssssssssssssss'},
  {index: 2, content: 'contensssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssstssssssss'},
  {index: 3, content: 'contentssssssss'},
  {index: 4, content: 'contsssssssssssssssssentssssssss'},
  {index: 5, content: 'contentssssssss'},
  {index: 6, content: 'contentssssssss'},
  {index: 7, content: 'contentssssssss'},
  {index: 8, content: 'contentssssssss'},
  {index: 9, content: 'contentssssssss'},
  {index: 10, content: 'contentsssssssssssssssssssssddddddddddddddsssssss'},
  {index: 11, content: 'contentssssssss'},
  {index: 12, content: 'contessssssssssssssssssssssssssntssssssss'},
  {index: 13, content: 'contentssssgfggggggggggggggggggggggggggggggggggggggggggggggssss'},
  {index: 14, content: 'contessssssssssssssssssssssssssntssssssss'},
  {index: 15, content: 'contentssssssss'},
  {index: 16, content: 'contessssssssssssssssssssssssssntssssssss'},
  {index: 17, content: 'contentsssssssssssssssssssss'},
  {index: 18, content: 'contensssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssstssssssss'},
  {index: 19, content: 'contentssssssss'},
  {index: 20, content: 'contsssssssssssssssssentssssssss'},
  {index: 21, content: 'contentssssssss'},
  {index: 22, content: 'contentssssssss'},
  {index: 23, content: 'contentssssssss'},
]

const OnePagerMain = () => {
  const onepager = async () => {
    const wrapper = document.querySelector('.onepager-download') as HTMLElement;
    wrapper.style.display = ''                              //hidden 시 canvas가 안그려지는 현상있음
    const canvas = await html2canvas(wrapper, {scale:2})    //scale 4 옵션으로 출력   => 3840px
    // canvas.style.width = '1920px'                        //가로넓이 1920으로 설정: 안됨
    const dataURL = canvas.toDataURL('image/png')           //이미지변환      
    wrapper.style.display = 'none'                          //canvas hidden 처리
    downloadjs(dataURL, 'goming', 'image/png')              //다운로드
  }
  return (
    <>
      <Header title={'원페이저 다운로드'} />
      <h1 style={{marginTop: '20px'}}>Onepager</h1>
      <div>
        <button onClick={onepager}>원페이저다운로드</button>
      </div>
      <div className='onepager-wrap'>
        <Masonry
          breakpointCols={4}                          //컬럼수
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column">
          {
            testData.map(item => (
              <div key={item.index}>
                <p className='word-wrap-break-word'>{item.index}</p>
                <p className='word-wrap-break-word'>{item.content}</p>
              </div>
            ))
          }
        </Masonry>

      </div>

      <div className='onepager-wrap onepager-download' style={{display:'none'}}>
        <Masonry
          width={1920}
          breakpointCols={12}                          //컬럼수
          className="my-masonry-grid-download"
          columnClassName="my-masonry-grid_column-download">
          {
            testData.map(item => (
              <div key={item.index}>
                <p className='word-wrap-break-word'>{item.index}</p>
                <p className='word-wrap-break-word'>{item.content}</p>
              </div>
            ))
          }
        </Masonry>

      </div>
     
    </>
  )
}
export default OnePagerMain 