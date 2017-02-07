/**
* @author antonio Jimenez (softwarejimenez)
* @version 0.1
*/

 /**
 * Dispaly data of a specific room
 * @param: tab
 * @param: data_room
 */
function display_specific_room(tab,data_room){
    //panel room atributes:
    document.getElementById(tab+"_name").innerHTML="   "+data_room.name;
    document.getElementById(tab+"_floor").innerHTML="   "+data_room.floor;
    document.getElementById(tab+"_size").innerHTML="   "+data_room.size;

    //panel room equipment
    room_equipment_father=document.getElementById(tab+"_equipment_room");
    deleteAllChildElement(room_equipment_father);//clean all data, in the case of all icon
    if(data_room.tv){
        var icon_tv= document.createElement('i');
        icon_tv.className+="icon fa fa-television" ;
        icon_tv.setAttribute("aria-hidden","true");
        icon_tv.title="television";
        room_equipment_father.appendChild(icon_tv);
    }
    if(data_room.bath){
        var icon_bath= document.createElement('i');
        icon_bath.className+="icon fa fa-bath" ;
        icon_bath.setAttribute("aria-hidden","true");
        icon_bath.title="baño";
        room_equipment_father.appendChild(icon_bath);
    }
    if(data_room.desk){
        var icon_desk= document.createElement('img');
        icon_desk.className+="icon_img" ;
        icon_desk.src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCAyOTUuMjQgMjk1LjI0IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAyOTUuMjQgMjk1LjI0OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjI0cHgiIGhlaWdodD0iMjRweCI+CjxnPgoJPGc+CgkJPGc+CgkJCTxwYXRoIGQ9Ik0yMzMuMzM1LDIxNC4yODd2LTkuNTI0aDQ3LjYxN3YwYzcuODc2LDAsMTQuMjg2LTYuNDEsMTQuMjg2LTE0LjI4NnYtNzYuMTljMC03Ljg3Ni02LjQxLTE0LjI4Ni0xNC4yODYtMTQuMjg2SDE0Ny42MTkgICAgIGMtNy44NzYsMC0xNC4yODYsNi40MS0xNC4yODYsMTQuMjg2djc2LjE5YzAsNy44NzYsNi40MSwxNC4yODYsMTQuMjg2LDE0LjI4Nmg0Ny42MTl2OS41MjRoLTgwLjk1MnYtNC43NjIgICAgIGMwLTcuODc2LTYuNjg2LTE0LjI4Ni0xNC41NjItMTQuMjg2aC0xNi4xMWwtNDguOTI4LTc5LjY0OGMyLjEzOC0zLjA4MSwzLjQxLTYuODA1LDMuNDEtMTAuODI5YzAtMS4xNzEtMC4xNDMtMi4zMDUtMC4zNDgtMy40MTkgICAgIGwxOS45MzMtMzYuNTQyYzEuODM4LDkuMDUyLDYuODc2LDE3LjEzOCwxNC41MTksMjIuODUybDMuMTEsMi4zMjRsMTEuNzU3LTEwLjQ1MmMyLjU3NiwwLjkzMyw1LjIxNCwxLjQyOSw3Ljg5NSwxLjQyOSAgICAgYzEzLjEyOSwwLDIzLjgxLTEwLjY4MSwyMy44MS0yMy44MWMwLTEuNzI5LTAuMjcxLTMuNDY3LTAuNjc2LTUuMTk1bDExLjc4MS0xMC40NzFsLTEuOTQzLTMuMzY3ICAgICBjLTYuODA1LTExLjc1Ny0xOS40MzgtMTkuMDYyLTMyLjk3MS0xOS4wNjJjLTAuODk1LDAtMS43NzYsMC4wNzEtMi42NTcsMC4xMzNsLTE2LjEtMTYuMUw0MC44MiwzMi41NzJsNi41NTcsOC43NDNMMTYuMDg3LDg2LjAyICAgICBDNi45OSw4Ny40NTMsMCw5NS4yNzcsMCwxMDQuNzYzYzAsNy4xNDMsMy45OTUsMTMuMzA1LDkuODI5LDE2LjU2MmwzOS4zODEsNzMuOTE0SDMzLjA1N2MtNy44NzYsMC0xNC4wMSw2LjQxLTE0LjAxLDE0LjI4NiAgICAgdjQuNzYySDB2MjguNTcxaDE0LjI4NnY1Mi4zODFoOS41MjR2LTUyLjM4MWg5LjUyNHY1Mi4zODFoOS41MjR2LTUyLjM4MWgyMDkuNTI0djUyLjM4MWg5LjUyNHYtNTIuMzgxaDkuNTI0djUyLjM4MWg5LjUyNCAgICAgdi01Mi4zODFoMTQuMjg2di0yOC41NzFIMjMzLjMzNXogTTE0Mi44NTcsMTE0LjI4N2MwLTIuNjI0LDIuMTM4LTQuNzYyLDQuNzYyLTQuNzYyaDEzMy4zMzNjMi42MjQsMCw0Ljc2MiwyLjEzOCw0Ljc2Miw0Ljc2MiAgICAgdjYxLjkwNUgxNDIuODU3VjExNC4yODd6IE0xOTUuMjM4LDE5NS4yMzloLTQ3LjYxOWMtMi42MjQsMC00Ljc2Mi0yLjEzOC00Ljc2Mi00Ljc2MnYtNC43NjJoMTQyLjg1N3Y0Ljc2MiAgICAgYzAsMi42MjQtMi4xMzgsNC43NjItNC43NjIsNC43NjJoLTQ3LjYxOUgxOTUuMjM4eiBNMjIzLjgxLDIwNC43NjN2OS41MjRoLTE5LjA0OHYtOS41MjRIMjIzLjgxeiBNOTYuMjQzLDcxLjM3MmwxMi43LTExLjI5ICAgICBDMTA3LjY3MSw2Ni4xNDksMTAyLjUzOCw3MC44MTEsOTYuMjQzLDcxLjM3MnogTTk0Ljk2NywyOC41NzNjOC44NTctMC4wMDEsMTcuMjA0LDQuMTgsMjIuNTgxLDExLjExOEw3NC45ODYsNzcuNTI1ICAgICBjLTUuNS01LjM1Mi04LjU5LTEyLjYtOC41OS0yMC4zODFDNjYuMzk2LDQxLjM4Nyw3OS4yMSwyOC41NzMsOTQuOTY3LDI4LjU3M3ogTTc1LjYxOSwxNS45NjhsNS42NjIsNS42NjIgICAgIEM3MS43LDI1LjMzNCw2My45NjcsMzIuNzcyLDU5LjkyOSw0Mi4xODdsLTYuMDYyLTguMDlMNzUuNjE5LDE1Ljk2OHogTTUzLjM4NSw0OS4zMjlsMS4wOTEsMS40NTNMMzIuNDE5LDkxLjIyNSAgICAgYy0xLjYyOS0xLjYxLTMuNTQ4LTIuOTA1LTUuNjY3LTMuODQ4TDUzLjM4NSw0OS4zMjl6IE05LjUyNCwxMDQuNzYzYzAtNS4yNTIsNC4yNzEtOS41MjQsOS41MjQtOS41MjQgICAgIGM1LjI1MiwwLDkuNTI0LDQuMjcxLDkuNTI0LDkuNTI0YzAsNS4yNTItNC4yNzEsOS41MjQtOS41MjQsOS41MjRDMTMuNzk1LDExNC4yODcsOS41MjQsMTEwLjAxNiw5LjUyNCwxMDQuNzYzeiBNMjEuNzk1LDEyMy41MzQgICAgIGMxLjk2Ny0wLjI4NiwzLjgyNC0wLjg2Miw1LjU0OC0xLjcwNWw0NS4wOTUsNzMuNDFINjBMMjEuNzk1LDEyMy41MzR6IE0zMy4wNTcsMjA0Ljc2M2g2Ni42NjdjMi42MjQsMCw1LjAzOCwyLjEzOCw1LjAzOCw0Ljc2MiAgICAgdjQuNzYyaC03Ni4xOXYtNC43NjJoLTAuMDAxQzI4LjU3MSwyMDYuOTAxLDMwLjQzMywyMDQuNzYzLDMzLjA1NywyMDQuNzYzeiBNMjg1LjcxNCwyMzMuMzM1aC00Ljc2MmgtMjguNTcxSDQyLjg1N0gxNC4yODYgICAgIEg5LjUyNHYtOS41MjRoOS4yNDhoOTUuMjM4aDgxLjIyOWgzOC4wOTVoNTIuMzhWMjMzLjMzNXoiIGZpbGw9IiMwMDAwMDAiLz4KCQkJPHJlY3QgeD0iMTM4LjA5NSIgeT0iODAuOTUzIiB3aWR0aD0iMTUyLjM4MSIgaGVpZ2h0PSI5LjUyNCIgZmlsbD0iIzAwMDAwMCIvPgoJCQk8cGF0aCBkPSJNMjA0Ljc2MiwwLjAwMWgtMzguMDk1djc2LjE5aDM4LjA5NVYwLjAwMXogTTE5NS4yMzgsNjYuNjY4SDE3Ni4xOVY0Ny42MmgxOS4wNDhWNjYuNjY4eiBNMTk1LjIzOCwzOC4wOTZIMTc2LjE5VjkuNTI1ICAgICBoMTkuMDQ4VjM4LjA5NnoiIGZpbGw9IiMwMDAwMDAiLz4KCQkJPGNpcmNsZSBjeD0iMTg1LjcxNCIgY3k9IjU3LjE0NCIgcj0iNC43NjIiIGZpbGw9IiMwMDAwMDAiLz4KCQkJPHBhdGggZD0iTTI0Ny42MTksMC4wMDFoLTM4LjA5NXY3Ni4xOWgzOC4wOTVWMC4wMDF6IE0yMTkuMDQ3LDkuNTI1aDE5LjA0OHYyOC41NzFoLTE5LjA0OFY5LjUyNXogTTIzOC4wOTYsNjYuNjY4aC0xOS4wNDhWNDcuNjIgICAgIGgxOS4wNDhWNjYuNjY4eiIgZmlsbD0iIzAwMDAwMCIvPgoJCQk8Y2lyY2xlIGN4PSIyMjguNTcxIiBjeT0iNTcuMTQ0IiByPSI0Ljc2MiIgZmlsbD0iIzAwMDAwMCIvPgoJCQk8cGF0aCBkPSJNMjkwLjQ3NiwwLjAwMWgtMzguMDk1djc2LjE5aDM4LjA5NVYwLjAwMXogTTI2MS45MDQsOS41MjVoMTkuMDQ4djI4LjU3MWgtMTkuMDQ4VjkuNTI1eiBNMjgwLjk1Myw2Ni42NjhoLTE5LjA0OFY0Ny42MiAgICAgaDE5LjA0OFY2Ni42Njh6IiBmaWxsPSIjMDAwMDAwIi8+CgkJCTxjaXJjbGUgY3g9IjI3MS40MjkiIGN5PSI1Ny4xNDQiIHI9IjQuNzYyIiBmaWxsPSIjMDAwMDAwIi8+CgkJPC9nPgoJPC9nPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=";
        icon_desk.title="escritorio";
        room_equipment_father.appendChild(icon_desk);
    }
    if(data_room.wardrove){
        var icon_wardrove= document.createElement('img');
        icon_wardrove.className+="icon_img" ;
        icon_wardrove.src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDYwIDYwIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA2MCA2MDsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSIyNHB4IiBoZWlnaHQ9IjI0cHgiPgo8Zz4KCTxnPgoJCTxwYXRoIGQ9Ik05LDUzaDE5VjNIOVY1M3ogTTExLDVoMTV2NDZIMTFWNXoiIGZpbGw9IiMwMDAwMDAiLz4KCQk8cGF0aCBkPSJNMTUsMTFoN2MwLjU1MiwwLDEtMC40NDgsMS0xcy0wLjQ0OC0xLTEtMWgtN2MtMC41NTIsMC0xLDAuNDQ4LTEsMVMxNC40NDgsMTEsMTUsMTF6IiBmaWxsPSIjMDAwMDAwIi8+CgkJPHBhdGggZD0iTTE1LDE0aDdjMC41NTIsMCwxLTAuNDQ4LDEtMXMtMC40NDgtMS0xLTFoLTdjLTAuNTUyLDAtMSwwLjQ0OC0xLDFTMTQuNDQ4LDE0LDE1LDE0eiIgZmlsbD0iIzAwMDAwMCIvPgoJCTxwYXRoIGQ9Ik0yMywxNmMwLTAuNTUyLTAuNDQ4LTEtMS0xaC03Yy0wLjU1MiwwLTEsMC40NDgtMSwxczAuNDQ4LDEsMSwxaDdDMjIuNTUyLDE3LDIzLDE2LjU1MiwyMywxNnoiIGZpbGw9IiMwMDAwMDAiLz4KCQk8cGF0aCBkPSJNMjMsMjhjLTAuNTUyLDAtMSwwLjQ0OC0xLDF2NWMwLDAuNTUyLDAuNDQ4LDEsMSwxczEtMC40NDgsMS0xdi01QzI0LDI4LjQ0OCwyMy41NTIsMjgsMjMsMjh6IiBmaWxsPSIjMDAwMDAwIi8+CgkJPHBhdGggZD0iTTU0LDBIMzFoLTJINnY1NmgydjRoNC42MThsMi00aDguNzY0bDIsNEgzMHYtNGgxdjRoNC42MThsMi00aDguNzY0bDIsNEg1M3YtNGgxVjB6IE0xMS4zODIsNThIMTB2LTJoMi4zODJMMTEuMzgyLDU4eiAgICAgTTE1LjYxOCw1NEg4VjJoMjF2NTJoLTYuNjE4SDE1LjYxOHogTTI4LDU4aC0xLjM4MmwtMS0ySDI4VjU4eiBNMzQuMzgyLDU4SDMzdi0yaDIuMzgyTDM0LjM4Miw1OHogTTM4LjYxOCw1NEgzMVYyaDIxdjUyaC02LjYxOCAgICBIMzguNjE4eiBNNTEsNThoLTEuMzgybC0xLTJINTFWNTh6IiBmaWxsPSIjMDAwMDAwIi8+CgkJPHBhdGggZD0iTTMyLDUzaDE5VjNIMzJWNTN6IE0zNCw1aDE1djQ2SDM0VjV6IiBmaWxsPSIjMDAwMDAwIi8+CgkJPHBhdGggZD0iTTM4LDExaDdjMC41NTIsMCwxLTAuNDQ4LDEtMXMtMC40NDgtMS0xLTFoLTdjLTAuNTUyLDAtMSwwLjQ0OC0xLDFTMzcuNDQ4LDExLDM4LDExeiIgZmlsbD0iIzAwMDAwMCIvPgoJCTxwYXRoIGQ9Ik0zOCwxNGg3YzAuNTUyLDAsMS0wLjQ0OCwxLTFzLTAuNDQ4LTEtMS0xaC03Yy0wLjU1MiwwLTEsMC40NDgtMSwxUzM3LjQ0OCwxNCwzOCwxNHoiIGZpbGw9IiMwMDAwMDAiLz4KCQk8cGF0aCBkPSJNNDYsMTZjMC0wLjU1Mi0wLjQ0OC0xLTEtMWgtN2MtMC41NTIsMC0xLDAuNDQ4LTEsMXMwLjQ0OCwxLDEsMWg3QzQ1LjU1MiwxNyw0NiwxNi41NTIsNDYsMTZ6IiBmaWxsPSIjMDAwMDAwIi8+CgkJPHBhdGggZD0iTTQ2LDI4Yy0wLjU1MiwwLTEsMC40NDgtMSwxdjVjMCwwLjU1MiwwLjQ0OCwxLDEsMXMxLTAuNDQ4LDEtMXYtNUM0NywyOC40NDgsNDYuNTUyLDI4LDQ2LDI4eiIgZmlsbD0iIzAwMDAwMCIvPgoJPC9nPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo="
        icon_wardrove.title="wardrove";
        room_equipment_father.appendChild(icon_wardrove);
    }

    //panel room img
    document.getElementById(tab+"_picture1").src=window.location.protocol+"//"+window.location.host+port+"/Room/download/"+data_room.picture1;
    document.getElementById(tab+"_picture2").src=window.location.protocol+"//"+window.location.host+port+"/Room/download/"+data_room.picture2;
    document.getElementById(tab+"_picture3").src=window.location.protocol+"//"+window.location.host+port+"/Room/download/"+data_room.picture3;
    rotate(tab);//rotate images
}


 /**
 * Dispaly data of a specific agreement
 * @param: tab
 * @param: data_agreement
 */
function display_specific_agreement(tab,data_agreement){
    //panel agreeement atributes:
    document.getElementById(tab+"file").setAttribute('href', window.location.protocol+"//"+window.location.host+port+"/Incidence/download/"+data_agreement.file_agreement_signed);
    document.getElementById(tab+"file").download="file"
    document.getElementById(tab+"dateStart").innerHTML="   "+data_agreement.date_start_school.date.replace(" 00:00:00", "");
    document.getElementById(tab+"dateEnd").innerHTML="   "+data_agreement.date_end_school.date.replace(" 00:00:00", "");
    document.getElementById(tab+"price").innerHTML="   "+data_agreement.price+"€";
}


/**
* Dispaly data of a specific college
* @param: tab
* @param: data_college
*/
function display_specific_college(tab,data_college){
    //panel college  atributes:
    init_map(tab+"college_map",data_college.latitude,data_college.longitude);
    document.getElementById(tab+"college_company_name").innerHTML="   "+data_college.companyName;
    document.getElementById(tab+"college_telephone").innerHTML="   "+data_college.telephone;
    document.getElementById(tab+"college_url").setAttribute('href', data_college.url);
    document.getElementById(tab+"college_url").innerHTML="   "+data_college.url;
    document.getElementById(tab+"college_email").innerHTML="   "+data_college.email;

    //panel college equipment
    college_equipment_father=document.getElementById(tab+"college_equipment");
    deleteAllChildElement(college_equipment_father);//clean all data
    if(data_college.equipment_college.study_room){
        var icon_study_room= document.createElement('i');
        icon_study_room.className+="icon material-icons" ;
        icon_study_room.title="habitacion estudio";
        icon_study_room.appendChild(document.createTextNode("school"))
        college_equipment_father.appendChild(icon_study_room);
    }
    if(data_college.equipment_college.gym){
        var icon_gym= document.createElement('i');
        icon_gym.className+="icon material-icons" ;
        icon_gym.title="gym";
        icon_gym.appendChild(document.createTextNode("fitness_center"))
        college_equipment_father.appendChild(icon_gym);
    }
    if(data_college.equipment_college.canteen){
        var icon_canteen= document.createElement('i');
        icon_canteen.className+="icon material-icons" ;
        icon_canteen.title="cantina";
        icon_canteen.appendChild(document.createTextNode("restaurant_menu"))
        college_equipment_father.appendChild(icon_canteen);
    }
    if(data_college.equipment_college.wifi){
        var icon_wifi= document.createElement('i');
        icon_wifi.className+="icon fa fa-wifi" ;
        icon_wifi.title="wifi";
        icon_wifi.setAttribute("aria-hidden","true");
        college_equipment_father.appendChild(icon_wifi);
    }
    if(data_college.equipment_college.laundry){
        var icon_laundry= document.createElement('i');
        icon_laundry.className+="icon material-icons" ;
        icon_laundry.title="lavanderia ";
        icon_laundry.appendChild(document.createTextNode("local_laundry_service"))
        college_equipment_father.appendChild(icon_laundry);
    }
    if(data_college.equipment_college.heating){
        var icon_heating= document.createElement('i');
        icon_heating.className+="icon fa fa-thermometer-full" ;
        icon_heating.title="calefaccion";
        icon_heating.setAttribute("aria-hidden","true");
        college_equipment_father.appendChild(icon_heating);
    }
    if(data_college.equipment_college.elevator){
        var icon_elevator= document.createElement('img');
        icon_elevator.className+="icon_img" ;
        icon_elevator.src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCA1MDMuNjA3IDUwMy42MDciIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUwMy42MDcgNTAzLjYwNzsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSIyNHB4IiBoZWlnaHQ9IjI0cHgiPgo8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxIDEpIj4KCTxnPgoJCTxnPgoJCQk8cGF0aCBkPSJNNDc3LjQyNi0xSDI0LjE4QzkuOTExLTEtMSw5LjkxMS0xLDI0LjE4djQ1My4yNDZjMCwxNC4yNjksMTAuOTExLDI1LjE4LDI1LjE4LDI1LjE4aDgzLjkzNGgxNDIuNjg5aDE0Mi42ODloODMuOTM0ICAgICBjMTQuMjY5LDAsMjUuMTgtMTAuOTExLDI1LjE4LTI1LjE4VjI0LjE4QzUwMi42MDcsOS45MTEsNDkxLjY5NS0xLDQ3Ny40MjYtMXogTTI0Mi40MSw0ODUuODJIMTE2LjUwOFYxMjQuOTAyICAgICBjMC01LjAzNiwzLjM1Ny04LjM5Myw4LjM5My04LjM5M0gyNDIuNDFWNDg1LjgyeiBNMjU5LjE5Nyw0ODUuODJWMTE2LjUwOGgxMTcuNTA4YzUuMDM2LDAsOC4zOTMsMy4zNTcsOC4zOTMsOC4zOTNWNDg1LjgyICAgICBIMjU5LjE5N3ogTTQ4NS44Miw0NzcuNDI2YzAsNS4wMzYtMy4zNTcsOC4zOTMtOC4zOTMsOC4zOTNoLTc1LjU0MVYxMjQuOTAyYzAtMTQuMjY5LTEwLjkxMS0yNS4xOC0yNS4xOC0yNS4xOEgyNTAuODAzSDEyNC45MDIgICAgIGMtMTQuMjY5LDAtMjUuMTgsMTAuOTExLTI1LjE4LDI1LjE4VjQ4NS44MkgyNC4xOGMtNS4wMzYsMC04LjM5My0zLjM1Ny04LjM5My04LjM5M1YyNC4xOGMwLTUuMDM2LDQuMTk3LTguMzkzLDguMzkzLTguMzkzICAgICBoNDUzLjI0NmM1LjAzNiwwLDguMzkzLDMuMzU3LDguMzkzLDguMzkzVjQ3Ny40MjZ6IiBmaWxsPSIjMDAwMDAwIi8+CgkJCTxwYXRoIGQ9Ik00NjAuNjM5LDI1OS4xOTdoLTMzLjU3NGMtNS4wMzYsMC04LjM5MywzLjM1Ny04LjM5Myw4LjM5M3YzMy41NzR2MzMuNTc0YzAsNS4wMzYsMy4zNTcsOC4zOTMsOC4zOTMsOC4zOTNoMzMuNTc0ICAgICBjNS4wMzYsMCw4LjM5My0zLjM1Nyw4LjM5My04LjM5M3YtMzMuNTc0VjI2Ny41OUM0NjkuMDMzLDI2Mi41NTQsNDY1LjY3NSwyNTkuMTk3LDQ2MC42MzksMjU5LjE5N3ogTTQzNS40NTksMjc1Ljk4NGgxNi43ODcgICAgIHYxNi43ODdoLTE2Ljc4N1YyNzUuOTg0eiBNNDUyLjI0NiwzMjYuMzQ0aC0xNi43ODd2LTE2Ljc4N2gxNi43ODdWMzI2LjM0NHoiIGZpbGw9IiMwMDAwMDAiLz4KCQkJPHBhdGggZD0iTTMwOS41NTcsMzIuNTc0SDE5Mi4wNDljLTUuMDM2LDAtOC4zOTMsMy4zNTctOC4zOTMsOC4zOTN2MzMuNTc0YzAsNS4wMzYsMy4zNTcsOC4zOTMsOC4zOTMsOC4zOTNoMTE3LjUwOCAgICAgYzUuMDM2LDAsOC4zOTMtMy4zNTcsOC4zOTMtOC4zOTNWNDAuOTY3QzMxNy45NTEsMzUuOTMxLDMxNC41OTMsMzIuNTc0LDMwOS41NTcsMzIuNTc0eiBNMzAxLjE2NCw2Ni4xNDhIMjAwLjQ0M1Y0OS4zNjFoMTAwLjcyMSAgICAgVjY2LjE0OHoiIGZpbGw9IiMwMDAwMDAiLz4KCQk8L2c+Cgk8L2c+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg=="
        icon_elevator.title="ascensor";
        college_equipment_father.appendChild(icon_elevator);
    }
    if(data_college.equipment_college.hours24){
        var icon_hours24= document.createElement('img');
        icon_hours24.className+="icon_img" ;
        icon_hours24.src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjI0cHgiIGhlaWdodD0iMjRweCI+CjxnPgoJPGc+CgkJPHBhdGggZD0iTTQ5OC45NDYsMjk0Ljk1OWMtNS41MjEtMS4xMTYtMTAuOTAyLDIuNDU1LTEyLjAxOCw3Ljk3N0M0NjQuODM0LDQxMi4yNTYsMzY3LjcxNSw0OTEuNjAyLDI1Niw0OTEuNjAyICAgIGMtMTI5LjkxMSwwLTIzNS42MDItMTA1LjY5LTIzNS42MDItMjM1LjYwMlMxMjYuMDg5LDIwLjM5OCwyNTYsMjAuMzk4YzYxLjI4NywwLDEyMC4wNDEsMjMuOTcsMTYzLjgxOCw2Ni4yOTVoLTI2LjM2MSAgICBjLTUuNjMzLDAtMTAuMTk5LDQuNTY2LTEwLjE5OSwxMC4xOTljMCw1LjYzMyw0LjU2NiwxMC4xOTksMTAuMTk5LDEwLjE5OWg1MS4yMjljNS42MzMsMCwxMC4xOTktNC41NjYsMTAuMTk5LTEwLjE5OVY0NS42NjQgICAgYzAtNS42MzMtNC41NjYtMTAuMTk5LTEwLjE5OS0xMC4xOTljLTUuNjMzLDAtMTAuMTk5LDQuNTY2LTEwLjE5OSwxMC4xOTl2MjYuODQ4QzM4Ni44NywyNi4yMjgsMzIyLjgyMywwLDI1NiwwICAgIEMxODcuNjIsMCwxMjMuMzMzLDI2LjYyOCw3NC45OCw3NC45OEMyNi42MjgsMTIzLjMzMywwLDE4Ny42MiwwLDI1NnMyNi42MjgsMTMyLjY2Nyw3NC45OCwxODEuMDIgICAgQzEyMy4zMzMsNDg1LjM3MiwxODcuNjIsNTEyLDI1Niw1MTJjNTkuNDM4LDAsMTE3LjM1Mi0yMC44MywxNjMuMDc0LTU4LjY1MmM0NS4xMTYtMzcuMzIxLDc2LjMxNS04OS4zMDQsODcuODQ5LTE0Ni4zNzIgICAgQzUwOC4wMzksMzAxLjQ1NSw1MDQuNDY3LDI5Ni4wNzUsNDk4Ljk0NiwyOTQuOTU5eiIgZmlsbD0iIzAwMDAwMCIvPgoJPC9nPgo8L2c+CjxnPgoJPGc+CgkJPHBhdGggZD0iTTUwMS44MDEsMjQ1LjgwMWMtNS42MzMsMC0xMC4xOTksNC41NjYtMTAuMTk5LDEwLjE5OWMwLDIuMjgxLTAuMDMzLDQuNTg1LTAuMDk4LDYuODQ4ICAgIGMtMC4xNjEsNS42MzEsNC4yNzMsMTAuMzI2LDkuOTAzLDEwLjQ4N2MwLjEsMC4wMDIsMC4xOTgsMC4wMDQsMC4yOTcsMC4wMDRjNS40OTcsMCwxMC4wMzEtNC4zNzYsMTAuMTktOS45MDcgICAgYzAuMDctMi40NTcsMC4xMDYtNC45NTcsMC4xMDYtNy40M0M1MTIsMjUwLjM2Nyw1MDcuNDM0LDI0NS44MDEsNTAxLjgwMSwyNDUuODAxeiIgZmlsbD0iIzAwMDAwMCIvPgoJPC9nPgo8L2c+CjxnPgoJPGc+CgkJPHBhdGggZD0iTTI0OC44NTgsMzUwLjQxNkgxNDUuMjM0di0yMC4xNGMwLTQzLjIwNCwxMDkuMTQ3LTY1LjI5MywxMDkuMTQ3LTEzNS4xMzRjMC0zNS4wODItMjcuMjg2LTYyLjM2OS02NC42NDQtNjIuMzY5ICAgIGMtMzQuNDM0LDAtNjEuMDcsMjIuNzM5LTYxLjA3LDUzLjkyNGMwLDkuNzQ1LDMuMjQ4LDEzLjMxOSw5Ljc0NSwxMy4zMTljNy40NzEsMCwxMS4zNjktNC41NDgsMTEuMzY5LTguNzcxICAgIGMwLTI1LjY2MiwxNi44OTItMzguMzMyLDM5LjMwNi0zOC4zMzJjMjkuODg2LDAsNDMuODU0LDIyLjQxNCw0My44NTQsNDIuODhjMCw1Ni44NDYtMTA5Ljc5Nyw4MC41Ni0xMDkuNzk3LDEzNC40ODR2MzEuNTEgICAgYzAsNS4xOTgsNS44NDcsOC40NDYsMTAuMDcsOC40NDZoMTE1LjY0NGM0LjIyMywwLDcuNzk2LTQuODcyLDcuNzk2LTEwLjA3MUMyNTYuNjU0LDM1NC45NjQsMjUzLjA4MSwzNTAuNDE2LDI0OC44NTgsMzUwLjQxNnoiIGZpbGw9IiMwMDAwMDAiLz4KCTwvZz4KPC9nPgo8Zz4KCTxnPgoJCTxwYXRoIGQ9Ik0zODguNTM4LDI5My44OTNoLTE3Ljg2NnYtNjIuNjk1YzAtNS41MjMtNS41MjMtOC4xMjEtMTAuNzItOC4xMjFjLTUuNTIzLDAtMTAuNzE5LDIuNTk5LTEwLjcxOSw4LjEyMXY2Mi42OTVoLTYzLjY2OSAgICBsNzUuMDM5LTE0OC4xMjdjMC42NS0xLjYyNSwwLjk3NS0yLjkyNCwwLjk3NS00LjIyM2MwLTUuMTk4LTYuMTczLTguNzcxLTEwLjM5NS04Ljc3MWMtMy44OTgsMC03Ljc5NiwxLjk0OS0xMC4wNzEsNi40OTcgICAgbC04MS41MzUsMTYwLjc5N2MtMC45NzQsMS42MjUtMS4yOTksMy41NzMtMS4yOTksNS41MjNjMCw0Ljg3MiwyLjkyNCw4Ljc3MSw4LjQ0Niw4Ljc3MWg4Mi41MXY0Ny40MjYgICAgYzAsNS41MjIsNS4xOTgsOC40NDYsMTAuNzE5LDguNDQ2YzUuMTk4LDAsMTAuNzItMi45MjQsMTAuNzItOC40NDZ2LTQ3LjQyNmgxNy44NjZjNC44NzIsMCw4LjEyMS01LjE5OCw4LjEyMS0xMC4zOTUgICAgQzM5Ni42NTgsMjk5LjA5MSwzOTQuMDU5LDI5My44OTMsMzg4LjUzOCwyOTMuODkzeiIgZmlsbD0iIzAwMDAwMCIvPgoJPC9nPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo="
        icon_hours24.title="recepcion 24 horas";
        college_equipment_father.appendChild(icon_hours24);
    }
}


/**
* Dispaly data of a specific student
* @param: tab
* @param: data_student
*/
function display_specific_student(tab,data_student){
    //panel student atributes
   document.getElementById(tab+"name").innerHTML="   "+data_student.name;
   document.getElementById(tab+"username").innerHTML="   "+data_student.username;
   document.getElementById(tab+"email").innerHTML="   "+data_student.email;
}



/**
* create  html message from the mesage (message / date / id / read )
* @return structure html
*/
function createHTMLMessage(message){
    var div = document.createElement('div');
    div.className += " div_message";

    var div_elements= document.createElement("div");
    div_elements.className+=" list_message_elements_div"
        if (message.senderType=="ROLE_STUDENT"){
            var p_from = document.createElement('p');
            p_from.className+=" list_message_element_p";
            p_from.appendChild(document.createTextNode("De: "+message.student_name));
            div_elements.appendChild(p_from);

            var p_to = document.createElement('p');
            p_to.className+=" list_message_element_p";
            p_to.appendChild(document.createTextNode("Para: "+message.college_name));
            div_elements.appendChild(p_to);
        }
        else if (message.senderType=="ROLE_COLLEGE"){
            var p_from = document.createElement('p');
            p_from.className+=" list_message_element_p";
            p_from.appendChild(document.createTextNode("De: "+message.college_name));
            div_elements.appendChild(p_from);

            var p_to = document.createElement('p');
            p_to.className+=" list_message_element_p";
            p_to.appendChild(document.createTextNode("Para: "+message.student_name));
            div_elements.appendChild(p_to);
        }

        var p_time = document.createElement('div');
        p_time.appendChild(document.createTextNode("Fecha: "+message.date.date));
        p_time.className += " list_message_element_p";
        div_elements.appendChild(p_time);

        if (message.file_attached){
            var p_file_attached = document.createElement('div');
            p_file_attached.appendChild(document.createTextNode("Adjunto: "));
            p_file_attached.className += " list_message_element_p";
            div_elements.appendChild(p_file_attached);

            var file_download = document.createElement('a');
            file_download.setAttribute('href',window.location.protocol+"//"+window.location.host+port+"/Message/download/"+message.file_attached);
            file_download.download="file"
            file_download.appendChild(document.createTextNode("file_download"));
            div_elements.appendChild(file_download);
        }

    div.appendChild(div_elements);

    var p_text = document.createElement('p');
    p_text.appendChild(document.createTextNode(message.message));
    p_text.className+="list_messages_elements_text";
    if (message.senderType=="ROLE_STUDENT"){
        p_text.style.textAlign = "right";
    }
    else if (message.senderType=="ROLE_COLLEGE"){
        p_text.style.textAlign="left";
    }
    if(message.read_by_student){
        p_text.style.color = "#3c763d";
    }
    else{
        p_text.style.color = "#c04021";
    }
    div.appendChild(p_text);
    return div
}


/**
*Get element selected of the equipment in a json structure
@param tab: it is the id of the div with the elements
@return json_structure with the list of element
*/
function get_equipment_selected(tab){
    child=document.getElementById(tab).children;;
    var i;
    var result={};
    for (i = 0; i < child.length; i++) {
        if (child[i].className.includes("selected_icon_search")){
            result[child[i].id]='1';
        }else{
            result[child[i].id]='0';
        }
    }
    console.log(result);
    return result;
}


var global_address_college = {
  'formatted_address': "",
  'lat':"",
  'lng':"",
};

/**
*Searchbox for the address of the college. When the user choose aa specific address
*/
function search_place(tab) {
  // Create the search box and link it to the UI element.
  var input = document.getElementById(tab);
  var searchBox = new google.maps.places.SearchBox(input);

  var markers = [];
  // [START region_getplaces]
  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();
    if (places.length == 0) {
      return;
    }
    // Clear out the old markers.
    markers.forEach(function(marker) {
      marker.setMap(null);
    });
    markers = [];

    // For each place, get  name and location.
    places.forEach(function(place) {

      // Create a marker for each place.
      markers.push(new google.maps.Marker({
        title: place.name,
        position: place.geometry.location
      }));
    });
    if(places.length == 1)
    {
        console.log(places[0].formatted_address);
        global_address_college.formatted_address=places[0].formatted_address;
        global_address_college.lat=places[0].geometry.location.lat();
        global_address_college.lng=places[0].geometry.location.lng();
    }
  });
  // [END region_getplaces]
}
