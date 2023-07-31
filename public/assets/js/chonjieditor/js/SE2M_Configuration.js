/*
 * Smart Editor 2 Configuration : This setting must be changed by service
 */
window.nhn = window.nhn || {};
nhn.husky = nhn.husky || {};
nhn.husky.SE2M_Configuration = nhn.husky.SE2M_Configuration || {};

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
	sCSSBaseURI : "css",					// smart_editor2_inputarea.html 화일의 상대경로
	sBlankPageURL : "smart_editor2_inputarea.html",
	sBlankPageURL_EmulateIE7 : "smart_editor2_inputarea_ie8.html",
	aAddtionalEmulateIE7 : [] // IE8 default 사용, IE9 ~ 선택적 사용
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
    ed_nonce : (typeof parent.ed_nonce !='undefined') ? parent.ed_nonce : '',
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

nhn.husky.SE2M_Configuration.Quote = {
	sImageBaseURL : 'http://static.se2.naver.com/static/img'
};
nhn.husky.SE2M_Configuration.SE2M_ColorPalette = {
	bAddRecentColorFromDefault : false
};

nhn.husky.SE2B_Customize_ToolBar = jindo.$Class(/** @lends nhn.husky.SE2B_Customize_ToolBar */{
	name : "SE2B_Customize_ToolBar",
	/**
	 * @constructs
	 * @param {Object} oAppContainer 편집기를 구성하는 콘테이너
	 */
	$init : function(oAppContainer) {
		this._assignHTMLElements(oAppContainer);
	},
	$BEFORE_MSG_APP_READY : function(){
		this._addEventMoreButton();
	},
	
	/**
	 * @private
	 * @description DOM요소를 수집하는 메쏘드
	 * @param {Object} oAppContainer 도구띠 포함 편집기를 감싸고 있는 div 요소
	 */
	_assignHTMLElements : function(oAppContainer) {
		this.oAppContainer = oAppContainer;
		this.elTextToolBarArea =  jindo.$$.getSingle("div.se2_tool");
		this.elTextMoreButton =  jindo.$$.getSingle("button.se2_text_tool_more", this.elTextToolBarArea);
		this.elTextMoreButtonParent = this.elTextMoreButton.parentNode;
		this.welTextMoreButtonParent = jindo.$Element(this.elTextMoreButtonParent);
		this.elMoreLayer =  jindo.$$.getSingle("div.se2_sub_text_tool");
	},

	_addEventMoreButton : function (){
		this.oApp.registerBrowserEvent(this.elTextMoreButton, "click", "EVENT_CLICK_EXPAND_VIEW");
		this.oApp.registerBrowserEvent(this.elMoreLayer, "click", "EVENT_CLICK_EXPAND_VIEW");			
	},
	
	$ON_EVENT_CLICK_EXPAND_VIEW : function(weEvent){
		this.oApp.exec("TOGGLE_EXPAND_VIEW", [this.elTextMoreButton]);
		weEvent.stop();
	},
	
	$ON_TOGGLE_EXPAND_VIEW : function(){
		if(!this.welTextMoreButtonParent.hasClass("active")){
			this.oApp.exec("SHOW_EXPAND_VIEW");
		} else {
			this.oApp.exec("HIDE_EXPAND_VIEW");
		}
	},
	
	$ON_CHANGE_EDITING_MODE : function(sMode){
		if(sMode != "WYSIWYG"){
			this.elTextMoreButton.disabled =true;
			this.welTextMoreButtonParent.removeClass("active");
			this.oApp.exec("HIDE_EXPAND_VIEW");
		}else{
			this.elTextMoreButton.disabled =false;
		}
	},
	
	$AFTER_SHOW_ACTIVE_LAYER : function(){
		this.oApp.exec("HIDE_EXPAND_VIEW");
	},
	
	$AFTER_SHOW_DIALOG_LAYER : function(){
		this.oApp.exec("HIDE_EXPAND_VIEW");
	},
	
	$ON_SHOW_EXPAND_VIEW : function(){
		this.welTextMoreButtonParent.addClass("active");
		this.elMoreLayer.style.display = "block";
	},
	
	$ON_HIDE_EXPAND_VIEW : function(){
		this.welTextMoreButtonParent.removeClass("active");
		this.elMoreLayer.style.display = "none";
	},
	
	/**
	 * CHANGE_EDITING_MODE방식 이후에 호출되여야 함. 
	 * WYSIWYG 방식이 활성화되기 전에 호출이 되면 APPLY_FONTCOLOR에서 오유 발생.
	 */
	$ON_RESET_TOOLBAR : function(){
		if(this.oApp.getEditingMode() !== "WYSIWYG"){			
			return;
		}
		//철자검사 닫기 
		this.oApp.exec("END_SPELLCHECK");		
		//열린 popup을 닫기 위해서
		this.oApp.exec("DISABLE_ALL_UI");
		this.oApp.exec("ENABLE_ALL_UI");
		//글자색과 글자 배경색을 제외한 설정
		this.oApp.exec("RESET_STYLE_STATUS");
		this.oApp.exec("CHECK_STYLE_CHANGE");
		//최근 사용한 글자색 설정.
		this.oApp.exec("APPLY_FONTCOLOR", ["#000000"]);
		//더보기 령역 닫기.
		this.oApp.exec("HIDE_EXPAND_VIEW");
	}
});