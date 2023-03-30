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
html, body, div, span, applet, object, iframe,
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
	margin: 0 auto;
	padding: 18px 16px; /*디자인에서 지정한 고정 padding입니다*/
}
`;

export default GlobalStyle;