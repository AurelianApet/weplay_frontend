/**
 * @use 간단 포토 올리적재용으로 제작되였습니다.
 * @author cielo
 * @See nhn.husky.SE2M_Configuration 
 * @ popup 마크업은 SimplePhotoUpload.html과 SimplePhotoUpload_html5.html이 있습니다. 
 */

nhn.husky.SE2M_AttachQuickPhoto = jindo.$Class({		
	name : "SE2M_AttachQuickPhoto",

	$init : function(){},
	
	$ON_MSG_APP_READY : function(){
		this.oApp.exec("REGISTER_UI_EVENT", ["photo_attach", "click", "ATTACHPHOTO_OPEN_WINDOW"]);
	},
	
	$LOCAL_BEFORE_FIRST : function(sMsg){
		if(!!this.oPopupMgr){ return; }
		// Popup Manager에서 사용할 param
		this.htPopupOption = {
			oApp : this.oApp,
			sName : this.name,
			bScroll : false,
			sProperties : "",
			sUrl : ""
		};
		this.oPopupMgr = nhn.husky.PopUpManager.getInstance(this.oApp);
	},
	
	/**
	 * 포토 웨브탑 열기
	 */
	$ON_ATTACHPHOTO_OPEN_WINDOW : function(){			
		this.htPopupOption.sUrl = this.makePopupURL();
		//this.htPopupOption.sProperties = "left=0,top=0,width=640,height=459,scrollbars=yes,location=no,status=0,resizable=no";
        this.htPopupOption.sProperties = "left="+(screen.width-640)/2+", top="+(screen.height-459)/2+",width=640,height=459,scrollbars=yes,location=no,status=0,resizable=no";

		this.oPopupWindow = this.oPopupMgr.openWindow(this.htPopupOption);
		
		// 처음 적재하고 IE에서 카숄이 전혀 없는 경우
		// 복수 올리적재시에 순서가 바뀜	
		this.oApp.exec('FOCUS');
		return (!!this.oPopupWindow ? true : false);
	},
	
	/**
	 * 봉사별로 popup에  parameter를 추가하여 URL을 생성하는 함수	 
	 * nhn.husky.SE2M_AttachQuickPhoto.prototype.makePopupURL로 덮어써서 사용하면 됨.
	 */
	makePopupURL : function(){
		//var sPopupUrl = "./photo_uploader/popup/photo_uploader.html";
		var sPopupUrl = "./photo_uploader/popup/index.html";
		return sPopupUrl;
	},
	
	/**
	 * popup에서 호출되는 통보문.
	 */
	$ON_SET_PHOTO : function(aPhotoData){
		var sContents, 
			aPhotoInfo,
			htData;
		
		if( !aPhotoData ){ 
			return; 
		}
		
		try{
			sContents = "";
			for(var i = 0; i <aPhotoData.length; i++){				
				htData = aPhotoData[i];
				
				if(!htData.sAlign){
					htData.sAlign = "";
				}
				
				aPhotoInfo = {
				    sName : htData.sFileName || "",
				    sOriginalImageURL : htData.sFileURL,
					bNewLine : htData.bNewLine || false 
				};
				
				sContents += this._getPhotoTag(aPhotoInfo);
			}

			this.oApp.exec("PASTE_HTML", [sContents]); // 웃줄 첨부화일 부분 확인
		}catch(e){
			// upload시 error발생에 대해서 skip함
			return false;
		}
	},

	$ON_SET_MULTIMEDIA : function(aMultiMediaData){
		var sContents, 
			aMultiMediaInfo,
			htData;
		var	videoFileURLs = [];
		
		if( !aMultiMediaData ){ 
			return; 
		}
		
		try{
			sContents = "";
			for(var i = 0; i <aMultiMediaData.length; i++){				
				htData = aMultiMediaData[i];
				
				if(!htData.sAlign){
					htData.sAlign = "";
				}
				
				aMultiMediaInfo = {
				    sName : htData.sFileName || "",
				    sOriginalMultiMediaURL : htData.sFileURL,
						bNewLine : htData.bNewLine || false 
				};
				if (htData.sFileType.indexOf('video') >= 0) {
					videoFileURLs.push(htData.sFileURL);
				}
				
				sContents += this._getMultiMediaTag(aMultiMediaInfo, htData.sFileType);
			}

			this.oApp.exec("INSERT_MULTIMEDIA", [sContents], [videoFileURLs],); // 웃줄 첨부화일 부분 확인
		}catch(e){
			// upload시 error발생에 대해서 skip함
			return false;
		}
	},

	/**
	 * @use 일반 포토 tag 생성
	 */
	_getPhotoTag : function(htPhotoInfo){
		// id와 class는 썸네일과 련관이 많습니다. 수정시 썸네일 령역도 Test
		var sTag = '<img src="{=sOriginalImageURL}" title="{=sName}" >';
		if(htPhotoInfo.bNewLine){
			sTag += '<br style="clear:both;">';
		}
		sTag = jindo.$Template(sTag).process(htPhotoInfo);
		
		return sTag;
	},

	_getMultiMediaTag : function(htMultiMediaInfo, fileType){
		// id와 class는 썸네일과 련관이 많습니다. 수정시 썸네일 령역도 Test
		var sTag;
		if(fileType.indexOf('video') >= 0){
			sTag = "<video class='video-player' title='{=sName}' controls></video>";
		} else {
			sTag = '<img src="{=sOriginalMultiMediaURL}" title="{=sName}" >';
		}
		if(htMultiMediaInfo.bNewLine){
			sTag += '<br style="clear:both;">';
		}
		sTag = jindo.$Template(sTag).process(htMultiMediaInfo);
		
		return sTag;
	}
});