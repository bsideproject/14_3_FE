
// YYYY-MM-DD 형태의 문자열로 반환
export const getDateFormat01 = (getDate: GET_DATE_FORMAT_01) => {
  const date = new Date(getDate)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  return `${year}-${month}-${day}`
}
type GET_DATE_FORMAT_01 = string | Date