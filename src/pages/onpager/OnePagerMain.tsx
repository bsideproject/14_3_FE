import Masonry from 'react-masonry-css'
import 'assets/pages/onepager/onepagermain.css'
import DefaultHeader from 'components/auth/DefaultHeader'
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
]
const OnePagerMain = () => {
  return (
    <>
      <DefaultHeader />
      <h1 style={{marginTop: '20px'}}>Onepager</h1>
      <div className='onepager-wrap'>
        <Masonry
          breakpointCols={3}                          //컬럼수
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
    </>
  )
}
export default OnePagerMain 