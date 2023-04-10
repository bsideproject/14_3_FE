import 'assets/pages/main/mainContent.css'
import Cards from './Cards';

const testData = [
  {index: 'CARD 1', q: 'Question 1 ?'},
  {index: 'CARD 2', q: 'Question 2 ?'},
  {index: 'CARD 3', q: 'Question 3 ?'},
  {index: 'CARD 4', q: 'Question 4 ?'}
]
const SelectionCard = () => {
  return (
    <>
      <div className='main-card-area'>
        { 
        testData.map(item => (
          <Cards key={item.index} item={item} />
        ))
        }
      </div>

    </>
  )
}

export default SelectionCard