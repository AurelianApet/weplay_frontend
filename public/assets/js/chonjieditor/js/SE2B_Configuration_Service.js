/*
 * Smart Editor 2 Configuration : This setting must be changed by service
 */
window.nhn = window.nhn || {};
nhn.husky = nhn.husky || {};
nhn.husky.SE2M_Configuration = nhn.husky.SE2M_Configuration || {};

/**
 * 편집기2에서 접근하는 JS, IMG 등록부
 */
nhn.husky.SE2M_Configuration.Editor = {
	sJsBaseURL : './js_src',
	sImageBaseURL : './img/'
};

/**
 * JS LazyLoad를 위한 경로
 */
nhn.husky.SE2M_Configuration.LazyLoad = {
	sJsBaseURI : "js_lazyload"
};

/**
 * CSS LazyLoad를 위한 경로
 */
nhn.husky.SE2M_Configuration.SE2B_CSSLoader = {
	sCSSBaseURI : "css"
};

/**
 * 편집령역 설정
 */
nhn.husky.SE2M_Configuration.SE_EditingAreaManager = {
	sCSSBaseURI : "css",
	sBlankPageURL : "smart_editor2_inputarea.html",
	sBlankPageURL_EmulateIE7 : "smart_editor2_inputarea_ie8.html",
	aAddtionalEmulateIE7 : [] // IE8 default 사용, IE9 ~ 선택적 사용
};

/**
 * 편집기2에서 사용하는 도메인 정보
 * http://wiki.nhncorp.com/pages/viewpage.action?pageId=74253685
 */
nhn.husky.SE2M_Configuration.LinkageDomain = {
	sCommonAPI : 'http://api.se2.naver.com',
	sCommonStatic : 'http://static.se2.naver.com',
	sCommonImage : 'http://images.se2.naver.com'
};


/**
 * [웨브접근성]
 * 단축건 ALT+,  ALT+. 을 리용하여 편집기 령역의 이전/이후 요소로 이동할수 있다.
 * 		sBeforeElementId : 편집기 령역 이전 요소의 id
 * 		sNextElementId : 편집기 령역 이후 요소의 id 
 * 
 * 편집기 령역 이외의 제목 령역 (례:편집기가 적용된 블로그 쓰기 페지에서의 제목 령역) 에 해당하는 요소에서 Tab키를 누르면 편집령역으로 focus를 이동시킬수 있다.
 * 		sTitleElementId : 제목에 해당하는 input 요소의 id. 
 */
nhn.husky.SE2M_Configuration.SE2M_Accessibility = {
    sBeforeElementId : '',
    sNextElementId : '',
    sTitleElementId : ''
};

/**
 * 초련결 기능 설정
 */
nhn.husky.SE2M_Configuration.SE2M_Hyperlink = {
	bAutolink : true	// 자동초련결기능 사용여부(기본값:true)
};