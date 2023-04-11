import { createGlobalStyle } from "styled-components";

/**
 * @설명 전역 스타일
 * @작성자 김상훈
 * @생성일자 2023.03.30.
 * ---------------------------------------- 
 *  수정일자      수정자      내용
 * ---------------------------------------- (공백3회)
 * 2023.03.30.   김상훈   container 전역 추가
 */
const GlobalStyle = createGlobalStyle`
html, body, #root, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	font-family: 'NanumSquareNeo-Variable';
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	vertical-align: baseline;
}
button{
	font-family: 'NanumSquareNeo-Variable';
}

input {
  box-sizing : border-box;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}

/* custom 내용입니다 */
.container{
	width: 100%;
	max-width: 420px;
	min-height: 100vh;
	margin: 0 auto;
}
.inside-container{
	background-color: #FAF9F6;
  padding: 0 16px; /*고정 padding*/
  min-height: 100vh;
	position: relative;
}
:root {
	--button-bg-color-1: #3D3938; /*로그인버튼배경색*/
	--caption-text-color-1: #7A7670 /* 캡션 글자 색 */
	--wgray13: #121212;					/* 타이틀에 주로 사용 */
	--wgray12: #3D3938;					/* 본문에 주로 사용 */
	--wgray11: #49484C;
	--wgray10: #5E5C5A;
	--wgray08: #96938C;
	--wgray07: #AEABA2;
	--wgray06: #C9C6C0;
	--wgray05: #E4E2DD;					/* Disabled 색 */
	--wgray04: #E9E7E2;					/* border-color1 */
	--wgray03: #F2F1ED;
	--wgray02: #FAF9F6;					/* background-color */
	--wgray01: #FFFFFF;					/* 흰색 */
	--error: #EA4343; 					/* error color */
	--info: #4D99DE;						/* info color */
	--success: #59B757; 				/* success color */
	--warning: #F09B4D; 				/* warning color */
}
html, body, #root {
	min-height: 100vh;
	background-color: #FFFFFF;
}
`;

export default GlobalStyle;