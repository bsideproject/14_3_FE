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
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	vertical-align: baseline;
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
/* 웹포함 기준 */
.container{
	background-color: #FAF9F6;
	max-width: 430px;
	min-height: 100vh;
	margin: 0 auto;
  filter: drop-shadow(4px 4px 8px rgba(0, 0, 0, 0.08));

}
.inside-container{
	background-color: #FAF9F6;
	margin: 0 16px;
	padding-top: 60px;
  min-height: 100vh;
}
// 모바일기준
@media (max-width:430px) {
	.container {
		width: 100%;
	}
}
:root {
	--button-bg-color-1: #3D3938; /*로그인버튼배경색*/
	--caption-text-color-1: #7A7670; /* 캡션 글자 색 */
	--wgray13: #121212;					/* 타이틀에 주로 사용 */
	--wgray12: #3D3938;					/* 본문에 주로 사용 */
	--wgray11: #49484C;
	--wgray10: #5E5C5A;
	--wgray09: #7A7670;
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
button {
	outline: none;
	border: none;
}
/* custom font */
.headline1 {
	font-size: 28px;
	font-weight: 800;
	line-height: 40px;
	letter-spacing: 0em;
}
.headline2 {
	font-size: 24px;
	font-weight: 800;
	line-height: 36px;
	letter-spacing: 0em;
}
.headline3 {
	font-size: 20px;
	font-weight: 800;
	line-height: 32px;
	letter-spacing: 0em;
}
.body1-bold {
	font-size: 18px;
	font-weight: 700;
	line-height: 28px;
	letter-spacing: -0.025em;
}
.body1-regular {
	font-size: 18px;
	font-weight: 400;
	line-height: 28px;
	letter-spacing: -0.025em;
}
.body2-bold {
	font-size: 16px;
	font-weight: 700;
	line-height: 26px;
	letter-spacing: -0.025em;
}
.body2-regular {
	font-size: 16px;
	font-weight: 400;
	line-height: 26px;
	letter-spacing: -0.025em;
}
.body3-bold {
	font-size: 14px;
	font-weight: 700;
	line-height: 24px;
	letter-spacing: -0.025em;
}
.body3-regular {
	font-size: 14px;
	font-weight: 400;
	line-height: 24px;
	letter-spacing: -0.025em;
}
.caption1-bold {
	font-size: 12px;
	font-weight: 700;
	line-height: 16px;
	letter-spacing: -0.025em;
}
.caption1-regular {
	font-size: 12px;
	font-weight: 400;
	line-height: 16px;
	letter-spacing: -0.025em;
}
.caption2-bold {
	font-size: 12px;
	font-weight: 700;
	line-height: 12px;
	letter-spacing: -0.025em;
}
.caption2-regular {
	font-size: 10px;
	font-weight: 400;
	line-height: 12px;
	letter-spacing: -0.025em;
}

//textarea
.common-textarea {
	height: 240px;
	padding: 16px;
	resize: none;
	background-color: var(--wgray03);
	margin-bottom: 8px;	
  border: 1px solid var(--wgray04);
  border-radius: 8px;
	color: var(--wgray12);
}
.common-textarea::placeholder {
	color: var(--wgray09);
	outline: 
}
.common-textarea:foucs {
	color: var(--wgray12);
}

.primary-button {
	background: var(--wgray02);
	border: none;
}
.secondary-button {
	border: 1px solid var(--wgray02);
	background: var(--wgray01);
}
`;

export default GlobalStyle;