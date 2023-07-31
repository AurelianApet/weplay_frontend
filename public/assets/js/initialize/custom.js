window.initChonjiEditor = function(aId, aData, aUrl){
    localStorage.setItem('apiUrl', aUrl);
    oEditors = [];
    $(".smarteditor2").each( function(index){
        var get_id = $(this).attr("id");
        if( !get_id || $(this).prop("nodeName") != 'TEXTAREA' ) return true;
        nhn.husky.EZCreator.createInIFrame({
            oAppRef: oEditors,
            elPlaceHolder: get_id,
            sSkinURI: g5_editor_url+"/SmartEditor2Skin.html",	
            htParams : {
                bUseToolbar : true,				// 툴바 사용 여부 (true:사용/ false:사용하지 않음)
                bUseVerticalResizer : true,		// 입력창 크기 조절바 사용 여부 (true:사용/ false:사용하지 않음)
                bUseModeChanger : true,			// 모드 탭(Editor | HTML | TEXT) 사용 여부 (true:사용/ false:사용하지 않음)
                //aAdditionalFontList : aAdditionalFontSet,		// 추가 글꼴 목록
                fOnBeforeUnload : function(){
                    //alert("완료!");
                }
            }, //boolean
            fOnAppLoad : function(){
                //례제 코드
                if ( aId !== "" && aData !== "" ) {
                    oEditors.getById[aId].exec("PASTE_HTML", [aData]);
                }
                oEditors.getById[aId].exec("SET_FONTSIZE", ['11pt']);
            },
            fCreator: "createSEditor2"
        });
    });
    
}

window.initChonjiEditorFontsize = function(aId, fontsize) {
    if ( oEditors.length !== 0 && aId && fontsize ) {
        oEditors.getById[aId].exec("SET_FONTSIZE", [fontsize]);
    }
}

// window.openEditorHelp = function(aId) {
//     if (oEditors.length === 0) return "";
//     oEditors.getById[aId].exec("OPEN_HELP_POPUP");
// }

window.isUploadValid = function(aId) {
    return $(aId).html() === '' ? false : true;
}

window.createJsPDF = function(aParam) {
  const doc = new jsPDF('p', 'mm', 'a4', 'utf-8');
  return doc;
}

window.getValueFromId = function(aId){
    if (oEditors.length === 0) return "";
    oEditors.getById[aId].exec("UPDATE_CONTENTS_FIELD");
    var tmpHtml = $("#" + aId).val();
    return $("#" + aId).val();
}

window.htmlToText = function(aHtml){
    if(!aHtml) return '';
    var regex = /(<([^>]+)>)/img;
    return aHtml.replace(regex, "");
    // return $(aHtml).text();
}

window.checkCollapse = function() {
    return window.screen.availWidth;
}

window.getCustomHeight = function(classId) {
    return $("." + classId).height();
}

window.setCustomHeight = function(classId, height) {
    return $("." + classId).css("height", height);
}

window.getElementFromId = function(aId) {
    return $("#" + aId);
}

window.getElementFromClass = function(aClass) {
    return $("." + aClass);
}

window.setValueById = function(aId, aValue) {
    // console.log('set value', aId, aValue)
    $("#" + aId).val(aValue);
}

window.getHtmlFromId = function(aId) {
    return $("#" + aId).html();
}

window.changeBackground = function(){
    $("#loginPage").backstretch([
        "/assets/images/login/BG1.png",
        "/assets/images/login/BG2.png",
        "/assets/images/login/BG3.png",
        ], {
            fade: 1000,
            duration: 8000
        }
    );
}

window.changeFirstBackground = function(){
    $("#firstScreen").backstretch([
        "/assets/images/first/background1.png",
        "/assets/images/first/background2.png",
        ], {
            fade: 1000,
            duration: 8000
      }
    );
}

window.setFocus = function(aId, aTimeout = 10){
    setTimeoout(() => {
        $(aId).focus();
    }, aTimeout);
}

window.movePage = function(aId, aTop = null, aLeft = null, aTime = 600){
    let container;
    if (aId === "html, body") {
        container = $(aId);
    } else {
        container = $("#" + aId);
    }
    var currentScroll = {top: container.scrollTop(), left: container.scrollLeft()};
    if (aLeft === null && aTop !== null) container.animate({scrollTop: currentScroll.top + aTop}, aTime);
    if (aLeft !== null && aTop === null) container.animate({scrollLeft: currentScroll.left + aLeft}, aTime);
    if (aLeft !== null && aTop !== null) container.animate({scrollTop: currentScroll.top + aTop, scrollLeft: currentScroll.left + aLeft}, aTime);
}

window.getPosition = function(aId){
    if(aId && aId !== "") return ($("#" + aId).offset());
}

window.onDidMount_pieChart_init = function(aId, aData, aTheme, aGraphSetting){

    pieChart(aId, aData, aTheme, aGraphSetting);
}

window.onDidMount_cylinderChart_init = function(aId, aData){
    cylinderChart(aId, aData);
}

window.onDidMount_interactiveChart_init = function(aId, aData){
    interactiveChart(aId, aData);
}

window.onDidMount_circleChart_init = function(aId, aData){
    circleChart(aId, aData);
}

window.onDidMount_barlineChart_init = function(aId, aData, aTitle, aTheme, aGraphSetting) {
    barlineChart(aId, aData, aTitle, aTheme, aGraphSetting);
}

window.onDidMount_serialChart_init = function( aId, aData, aTheme, aGraphSetting ) {
    serialChart(aId, aData, aTheme, aGraphSetting);
}

var serialChart = function(aId, aData, aTheme, aGraphSetting) {
    var chart = AmCharts.makeChart(aId, {
        "type": "serial",
        "theme": "light",


        "handDrawn": aTheme.handDrawScatter,
        "handDrawScatter": aTheme.handDrawScatter,
        "legend": {
            "useGraphSettings": true,
            "markerSize": 12,
            "valueWidth": 0,
            "verticalGap": 0
        },
        "dataProvider": aData,
        "valueAxes": [{
            "minorGridAlpha": 0.08,
            "minorGridEnabled": true,
            "position": "top",
            "axisAlpha": 0
        }],
        "startDuration": aTheme.startDuration || 0,
        "graphs": aGraphSetting.graph,
        "rotate": aTheme.rotate || false,
        "categoryField": aGraphSetting.mainAxis || 'x',
        "categoryAxis": {
            "gridPosition": "start"
        }
    });

    $('#' + aId).closest('.portlet').find('.fullscreen').click(function() {
        chart.invalidateSize();
    });
}

var barlineChart = function(aId, aData, aTitle, aTheme = {}, aGraphSetting = {}) {
    var chart = AmCharts.makeChart(aId, {
        "type": "serial",
        "theme": "light",
        // "pathToImages": Metronic.getGlobalPluginsPath() + "amcharts/amcharts/images/",
        "autoMargins": false,
        "marginLeft": aTheme.marginLeft || 30,
        "marginRight": aTheme.marginRight || 8,
        "marginTop": aTheme.marginTop || 10,
        "marginBottom": aTheme.marginBottom || 26,

        "fontFamily": 'Open Sans',            
        "color": aTheme.color || '#888',
        
        "dataProvider": aData,
        "valueAxes": [{
            "axisAlpha": 0,
            "position": "left"
        }],
        "startDuration": aTheme.startDuration || 0,
        "graphs": aGraphSetting.graph,
        "categoryField": aGraphSetting.mainAxis || 'x',
        "categoryAxis": {
            "gridPosition": "start",
            "axisAlpha": 0,
            "tickLength": 0
        }
    });

    $('#chart_1').closest('.portlet').find('.fullscreen').click(function() {
        chart.invalidateSize();
    });
}

var cylinderChart = function(aId, aData) {
    var chart = AmCharts.makeChart(aId, {
        "theme": "light",
        "type": "serial",
        "startDuration": 2,
        "fontFamily": 'Open Sans',
        "color":    '#888',

        "dataProvider": aData,
        "valueAxes": [{
            "position": "left",
            "axisAlpha": 0,
            "gridAlpha": 0
        }],
        "graphs": [{
            "balloonText": "[[category]]: <b>[[value]]</b>",
            "colorField": "color",
            "fillAlphas": 0.85,
            "lineAlpha": 0.1,
            "type": "column",
            "topRadius": 1,
            "valueField": "values"
        }],
        "depth3D": 40,
        "angle": 30,
        "chartCursor": {
            "categoryBalloonEnabled": false,
            "cursorAlpha": 0,
            "zoomable": false
        },
        "categoryField": "indicator",
        "categoryAxis": {
            "gridPosition": "start",
            "axisAlpha": 0,
            "gridAlpha": 0

        },
        "exportConfig": {
            "menuTop": "20px",
            "menuRight": "20px",
            "menuItems": [{
                "icon": '/lib/3/images/export.png',
                "format": 'png'
            }]
        }
    }, 0);

    jQuery('.' + aId + '_chart_input').off().on('input change', function() {
        var property = jQuery(this).data('property');
        var target = chart;
        chart.startDuration = 0;

        if (property == 'topRadius') {
            target = chart.graphs[0];
        }

        target[property] = this.value;
        chart.validateNow();
    });

    $('#' + aId).closest('.portlet').find('.fullscreen').click(function() {
        chart.invalidateSize();
    });
}

var pieChart = function(aId, aData, aTheme = {}, aGraphSetting = {}) {
    var chart = AmCharts.makeChart(aId, {
        "type": "pie",
        "theme": "light",
        "fontFamily": 'Open Sans',
        "color":    '#888',

        "dataProvider": aData,
        "valueField": aGraphSetting.valueAxis,
        "titleField": aGraphSetting.mainAxis,
        // "outlineAlpha": 0.4,
        // "depth3D": 15,
        // "balloonText": "[[title]]<br><span style='font-size:14px'><b>[[value]]</b> ([[percents]]%)</span>",
        // "angle": 30,
        
    });
    

    $('#' + aId).closest('.portlet').find('.fullscreen').click(function() {
        chart.invalidateSize();
    });
}

var interactiveChart = function(aId, aData) {
    if ($('#' + aId).size() != 1) {
        return;
    }
    var nature = [
        [1, 10],
        [2, 14],
        [3, 3],
        [4, 7],
        [5, 1],
        [6, 20]
    ];
    var social = [
        [1, 1],
        [2, 5],
        [3, 9],
        [4, 12],
        [5, 4],
        [6, 0]
    ];

    var plot = $.plot($('#' + aId), [{
        data: nature,
        label: "자연과학",
        lines: {
            lineWidth: 5,
        },
        shadowSize: 0

    }, {
        data: social,
        label: "사회과학",
        lines: {
            lineWidth: 5,
        },
        shadowSize: 0
    }], {
        series: {
            lines: {
                show: true,
                lineWidth: 4,
                fill: true,
                fillColor: {
                    colors: [{
                        opacity: 0.05
                    }, {
                        opacity: 0.01
                    }]
                }
            },
            points: {
                show: true,
                radius: 3,
                lineWidth: 1
            },
            shadowSize: 2
        },
        grid: {
            hoverable: true,
            clickable: true,
            tickColor: "#eee",
            borderColor: "#eee",
            borderWidth: 2
        },
        colors: ["#d12610", "#37b7f3", "#52e136"],
        xaxis: {
            ticks: 11,
            tickDecimals: 0,
            tickColor: "#eee",
        },
        yaxis: {
            ticks: 11,
            tickDecimals: 0,
            tickColor: "#eee",
        }
    });


    function showTooltip(x, y, contents) {
        $('<div id="tooltip">' + contents + '</div>').css({
            position: 'absolute',
            display: 'none',
            top: y + 5,
            left: x + 15,
            border: '1px solid #333',
            padding: '4px',
            color: '#fff',
            'border-radius': '3px',
            'background-color': '#333',
            opacity: 0.80
        }).appendTo("body").fadeIn(200);
    }

    var previousPoint = null;
    $('#' + aId).bind("plothover", function(event, pos, item) {
        if (item) {
            if (previousPoint != item.dataIndex) {
                previousPoint = item.dataIndex;

                $("#tooltip").remove();
                var x = item.datapoint[0].toFixed(0),
                    y = item.datapoint[1].toFixed(0);

                    showTooltip(item.pageX, item.pageY, x + "과의 " + item.series.label + "학위학직소유자 : " +  y + "명");
            }
        } else {
            $("#tooltip").remove();
            previousPoint = null;
        }
    });
}

var circleChart = function(aId, aData) {
    if ($('#' + aId).size() !== 0) {
        $.plot($('#' + aId), aData, {
            series: {
                pie: {
                    show: true,
                    radius: 1,
                    label: {
                        show: true,
                        radius: 0.5,
                        formatter: function(label, series) {
                            return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">' + series.data[0][1] + "명" + '<br/>' + "(" + series.percent.toFixed(1) + '%)</div>';
                        },
                        background: {
                            opacity: 0.5,
                            color: '#000'
                        }
                    }
                }
            },
            legend: {
                show: true
            }
        });
    }
}

window.onDidMount_multiselect_init = function(func, aId, aData, aPlaceHolder){
    $("#" + aId).select2({
        tags: aData,
        placeholder: aPlaceHolder,
    });

    $("#" + aId).change(function () {
        func($("#" + aId).val());
    })
}

handleKeyUp = (e) => {
    if (e && e.key === "Escape") {
        window.ModalImageClose();
    }
}

window.ModalImageOpen = function(arg){
    var modal = document.getElementById('modalImage');
    var img = document.getElementById('srcImage');
    var modalImg = document.getElementById('spreadImage');
    var captionText = document.getElementById('caption');
    modal.style.display = "block";
    modalImg.src = arg.props.pContent.src;
    captionText.innerHTML = arg.props.pContent.alt;
    document.addEventListener('keyup', handleKeyUp);
}

window.ModalImageClose = function(){
    document.removeEventListener('keyup', handleKeyUp);
    var modal = document.getElementById('modalImage');
    modal.style.display = "none";
}

window.ChattingFullScreenOpen = function(aId){
    var elem = document.getElementById(aId);
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.mozRequestFullScreen) { /* Firefox */
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) { /* IE/Edge */
        elem.msRequestFullscreen();
    }
}

window.Slick = function(){
	$('.slick-item').slick({
        infinite: true,
          arrows: true,
          dots:true,
          pauseOnHover:true
    });
    setInterval(function (){
        $(".slick-next").click(); 
    }, 5000);
}

window.AddressSearch = function () {
    var geocoder = new kakao.maps.services.Geocoder();

	//비동기로 콜백을 반드시 구현해야함.
	/*var callback = function(result, status) {
	    if (status === kakao.maps.services.Status.OK) {
	        console.log(result);
	    }
	};*/

	
	//geocoder.addressSearch('(06097) 서울 강남구 봉은사로 403 하모니 빌딩', callback);
	geocoder.addressSearch(address, callback);	
}

window.onSearchAddressClick = function(addressId, locationXId, locationYId, callbackFunc) {
    // offline dummy code for testing purpose
    setTimeout( ()=>{
        $('#' + addressId).val('(ab234352) avenue studio buiding');
        $('#' + locationXId).val('135.6');
        $('#' + locationXId).val('37.5');
        callbackFunc({
            zonecode: '(ab234352)',
            roadAddress: 'avenue',
            buildingName: 'studio building',
        });
    }, 2000);

    // online
    // daum.postcode.load(function(){
    //     new daum.Postcode({
    //         oncomplete: function(data) {
    //             console.log('daum postcode success', data);
    //             var callback = function(result, status) {
                    
    //                 if (status === kakao.maps.services.Status.OK) {
    //                     if(result.length >0){
    //                         $("#" + locationXId).val(result[0].x); 
    //                         $("#" + locationYId).val(result[0].y);
    //                     }
    //                     else {
    //                         $("#" + locationXId).val("0.0");
    //                         $("#" + locationYId).val("0.0");
    //                     }    
    //                 }
    //             };
                
    //             //무조건 도로명으로넣음.
    //             var loadString = "(" + data.zonecode + ") " +  data.roadAddress + " " + data.buildingName;
    //             $("#" + addressId).val(loadString);
    //             callbackFunc(data)
    //             window.AddressSearch(data.roadAddress + " " + data.buildingName,callback);  
    //         }
    //     }).open();
        
    //     $("#__daum__layer_1").attr('style','position: relative;width: 330px;height: 500px; background-color: rgb(255, 255, 255); z-index: 0; overflow: hidden auto; min-width: 300px; margin: 0px; padding: 0px;');
    // });
}
