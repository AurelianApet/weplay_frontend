//------------------------------------------------------//
//------------------------------------------------------//
//------------------------------------------------------//
//------------- 자주 사용되는 상수 모음 ----------------------//
//------------------------------------------------------//
//------------------------------------------------------//
//------------------------------------------------------//

//------------------------------------------------------//
//리엑트 앱소스 버전 ----------------------------------------- 
//수정할 때마다 값을 올려줘야 서버쪽에서 오류발생시점을 알 수 있음.------
//------------------------------------------------------//
export const appsource = 1;

export const sort_os = "A";

//------------------------------------------------------//
//api 연결 주소 --------------------------------------------
//------------------------------------------------------//
export const apiurl = "https://extreme-alba-api.com/api/";

export const appurl = "https://extremealbaapp.com";

export const weburl = "https://extreme-alba.com";

//------------------------------------------------------//
//네이버 지도 - 네이버클라우드플랫폼 -----------------------------
//------------------------------------------------------//
export const map_client = {
    map_client_id: "hxwbnn7hqr",
    map_client_secret: "Fnd9hFYfk6EODwdCwrOCeaZVKIXB1eFoM5BvL2Zp"
};

//애니메이션 처리 ----------------------------------------------------------
export const pageTransition = {
    type: "spring",
    duration: 0.3,
    damping: 400,
    stiffness: 270
};

export const pageTransition_side = {
    type: "spring",
    duration: 0.5,
    damping: 80,
    stiffness: 570
};

export const pageVariants = {
    before: {
        opacity: 0,
        x: "100%"
    },
    in: {
        opacity:1,
        x: 0,
    },
    out: {
        x: "-100%",
        transition: { ease: 'easeInOut'}
    }
};


export const pageVariants_side = {
    before: {
        x: "100%"
    },
    in: {
        x: 0,
    },
    out: {
        x: "100%"
    }
};

//팝업 애니메이션 처리 ----------------------------------------------------------
export const pageVariants_popup = {
    before: {
        scale: 0
    },
    in: {
        rotate: 360,
        scale: 1,
    },
    out: {
        scale: 0
    }
};

export const pageTransition_popup = {
    type: "spring",
    damping: 20,
    stiffness: 260
};


//프로필 사진 선택 애니메이션 처리 ----------------------------------------------------------
export const pageVariants_photo = {
    before: {
        y: "100%"
    },
    in: {
        y: 0,
    },
    out: {
        y: "100%"
    }
};


//지도화면 필터 애니메이션 처리 ----------------------------------------------------------
export const pageVariants_filter = {
    before: {
        opacity: 0,
    },
    in: {
        opacity:1,
    },
    out: {
        opacity: 0,
    }
};


//지도화면 리스트보기화면 애니메이션 처리 ----------------------------------------------------------
export const pageVariants_sidemenu_bg = {
    before: {
        opacity: 0,
    },
    in: {
        opacity:0.7,
    },
    out: {
        opacity: 0,
    }
};

// 플러스 버튼 메뉴 ---------------------------------------------------------------------
export const pageVariants_plus_menu = {
    before: {
        opacity: 1,
        scale: 0,
    },
    in: {
        opacity: 1,
        scale: 1,
    },
    out: {
        opacity: 1,
        scale: 0,
    }
}

export const pageTransition_plus_menu = {
    type: "spring",
    delay: 0,
    damping: 60,
    stiffness: 500,
    mass: 1,
};




