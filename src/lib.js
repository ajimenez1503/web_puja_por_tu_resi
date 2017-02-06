/**
* @author antonio Jimenez (softwarejimenez)
* @version 0.1
*/


/**
* All the form display none
* Display a specific form of the user in the profile
*@param {fater} id of the div
*@param {id} id of the div
*/
function display_specific_div(father,id) {
    var list_elements=document.getElementById(father).children;
    for(i=0;i<list_elements.length;i++){//display none all the children
        list_elements[i].style.display="none";
    }
    if (id!== undefined){
        document.getElementById(id).style.display="block";
    }
}



/**
*Select a row in a table (red background-color)
* out select a row in a table of the search
*Im the case that there paremeter latitude, longitude and id_map, display map
*@param: id_element
*@param:latitude
*@param:longitude
*@param:id_map
*/
function selected_out_selected_row_table(id_element,latitude, longitude,id_map){
    class_name=document.getElementById(id_element).className;
    if (class_name.includes(" selected_row_table")){
        class_name=class_name.replace("selected_row_table","");
        document.getElementById(id_element).className=class_name;

    }else{
        document.getElementById(id_element).className+= " selected_row_table";
        if(latitude!==undefined && longitude!==undefined && id_map!==undefined){
            init_map(id_map,latitude,longitude);
        }
    }
}





/**
*Rotate the images of the room
* The number of images should be 3, otherwise need a paramenter //TODO add parameter with 3 by default
* @param: tab
*/
function rotate(tab){
    //console.log("rotata start: "+ tab)
    var animate=null;
    var number_image=3;
    var size_width=230;
    var slider =document.getElementById(tab+"_slider_img");
	document.getElementById(tab+"_slidesContainer_img").style.width=(size_width*number_image).toString()+"px";//230*3=690 totalWidth* number images
	var totalWidth =size_width*number_image-size_width;//3*230-230=460//The total width, less one
    animate=setTimeout(sliderScroll,20); // call moveRight in 20msec

	function sliderScroll(){
		position=parseInt(slider.scrollLeft);
        //console.log(position);

		if(position%size_width==0){//start of a image, pause 1seg
			pause(1000);
            //console.log("pause")
		}
		if(position+1>=totalWidth){//at the end, start again
			slider.scrollLeft=0;
            //console.log("start")
		}
		else{
	    	slider.scrollLeft=position+1;//move scroll
		}
        if(globa_view=="studentview" || globa_view=="collegeview"){
            if (document.getElementById(tab).style.display=="block"){//still in tab
                animate = setTimeout(sliderScroll,20); // call moveRight in 20msec
                //console.log("repeat");
            }else {//stop animation if move to other tab
                slider.scrollLeft=0;
                clearTimeout(animate);
                console.log("stop");
            }
        }

    }
}




 /**
 *Dispaly data of a specific room
 *@param: tab
 *@param: data_room
 */
function display_specific_room(tab,data_room){
    //panel room atributes:
    document.getElementById(tab+"_name").innerHTML="   "+data_room.name;
    document.getElementById(tab+"_floor").innerHTML="   "+data_room.floor;
    document.getElementById(tab+"_size").innerHTML="   "+data_room.size;

    //panel room equipment
    room_equipment_father=document.getElementById(tab+"_equipment_room");
    deleteAllChildElement(room_equipment_father);//clean all data
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
    //get imgs
    document.getElementById(tab+"_picture1").src=window.location.protocol+"//"+window.location.host+port+"/Room/download/"+data_room.picture1;
    document.getElementById(tab+"_picture2").src=window.location.protocol+"//"+window.location.host+port+"/Room/download/"+data_room.picture2;
    document.getElementById(tab+"_picture3").src=window.location.protocol+"//"+window.location.host+port+"/Room/download/"+data_room.picture3;
    rotate(tab);
}




 /**
 *Dispaly data of a specific agreement
 *@param: tab
 *@param: data_agreement
 */
function display_specific_agreement(tab,data_agreement){
    //panel room atributes:
    document.getElementById(tab+"file").setAttribute('href', window.location.protocol+"//"+window.location.host+port+"/Incidence/download/"+data_agreement.file_agreement_signed);
    document.getElementById(tab+"file").download="file"
    document.getElementById(tab+"dateStart").innerHTML="   "+data_agreement.date_start_school.date.replace(" 00:00:00", "");
    document.getElementById(tab+"dateEnd").innerHTML="   "+data_agreement.date_end_school.date.replace(" 00:00:00", "");
    document.getElementById(tab+"price").innerHTML="   "+data_agreement.price+"€";
}



/**
*Dispaly data of a specific college
*@param: tab
*@param: data_college
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
*Dispaly data of a specific student
*@param: tab
*@param: data_student
*/
function display_specific_student(tab,data_student){
   document.getElementById(tab+"name").innerHTML="   "+data_student.name;
   document.getElementById(tab+"username").innerHTML="   "+data_student.username;
   document.getElementById(tab+"email").innerHTML="   "+data_student.email;
}

/**
* show the error in a div with is block in this moment
* @param {string} page of the view, 2 possibility profile or Welcome
* @param {string} the element of the error, such as: login, message, etc
* @param {message} message of error
* @returns {boolean} bool
*/
function showErrorMessagesPage(page,element,message,success){
    if (typeof(message) === 'string' && typeof(element) === 'string' && typeof(page) === 'string' &&
        (page=="Welcome" || page=="Student" || page=="College")){
        document.getElementById("showErrorMessage"+page+"Page").style.display="block";
        if(success){
            document.getElementById("showErrorMessage"+page+"Page").className +=" alert alert-success";
        }
        else{
            document.getElementById("showErrorMessage"+page+"Page").className+=" alert alert-danger";
        }
        document.getElementById("errorMessage"+page+"Page").innerHTML=element+" : "+message;
		fade(document.getElementById("showErrorMessage"+page+"Page"),300);
        return true;
    }else{
        console.log("Incorrect input showErrorMessage.");
        return false;
    }

}

/**
* Disappear the element with a speed
* @param {element} html element
* @param {speed} speed to disappear
*/
function fade(element, speed) {
var op = 1,
        timer = setInterval(function () {
            if (op <= 0.1){
                clearInterval(timer);
                element.style.display = 'none';
            }
            element.style.opacity = op;
            element.style.filter = 'alpha(opacity=' + op * 100 + ")";
            op -= op * 0.1;
        }, speed);
}


/**
* Check if the e-mail is valid
* @param {String} email
* @returns {boolean} if the e-mail is valid
*/
function validateEmail(email)  {
    if (typeof(email) === 'string'){
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(email.match(mailformat))  {
            return true;
        }
    }else{
        return false;
    }
}




/**
* Check if the DNI is valid
* @param {String} DNI
* @returns {boolean} if the DNI is valid
*/
function validateDNI(dni){
    expresion_regular_dni = /^\d{8}[A-Z]$/;
    if(expresion_regular_dni.test (dni) == true){
        return true;
    }else{
        return false;
    }
}

/**
* Deleta all child of a node
* @param {element} father of the element will be deleted
*/
function deleteAllChildElement(node){
	while (node.firstChild) {
		node.removeChild(node.firstChild);
	}
}



/**
* Display the location of the latitude and logitude on map
* @param {id} id of the div
* @param {latitude} latitude of the position
* @param {longitude} longitude of the position
*/
function init_map(id,latitude,longitude) {
    //get latitude,longitude from the college
    var uluru = {lat: latitude, lng: longitude};
    var map = new google.maps.Map(
        document.getElementById(id),
        {
            zoom: 10,
            center: uluru
        }
    );
    var marker = new google.maps.Marker(
        {
            position: uluru,
            map: map
        }
    );
}


/**
* Check if the credit Card is valid by the Luhn Algorithm
* @param {String} cardNumber
* @returns {boolean} if the cardNumber is valid
*/
function validateCreditCard(cardNumber) {
  // accept only digits, dashes or spaces
	if (/[^0-9-\s]+/.test(cardNumber)) return false;

	// The Luhn Algorithm. It's so pretty.
	var nCheck = 0, nDigit = 0, bEven = false;
	cardNumber = cardNumber.replace(/\D/g, "");

	for (var n = cardNumber.length - 1; n >= 0; n--) {
		var cDigit = cardNumber.charAt(n),
			  nDigit = parseInt(cDigit, 10);

		if (bEven) {
			if ((nDigit *= 2) > 9) nDigit -= 9;
		}

		nCheck += nDigit;
		bEven = !bEven;
	}

	return (nCheck % 10) == 0;
}

/**
* Check if the security code is valid
* @param {String} cardNumber
* @param {String} cvv
* @returns {boolean} if the cvv is valid
*/
function validateCVV(cardNumber,cvv)
{
    // Get the first number of the credit card so we know how many digits to look for
    var $firstnumber = Number(cardNumber.substr(0, 1));
    if ($firstnumber === 3)
    {
        if (!cvv.match(/^\d{4}$/))
        {
            // The credit card is an American Express card but does not have a four digit CVV code
            return false;
        }
    }
    else if (!cvv.match(/^\d{3}$/))
    {
        // The credit card is a Visa, MasterCard, or Discover Card card but does not have a three digit CVV code
        return false;
    }
    return true;
}


/**
* Check if the expiry date is valid compare with now
* @param {String} cardNumber
* @param {String} cvv
* @returns {boolean} if the cvv is valid
*/
function validateExpiryDate(expiry_month,expiry_year)
{
    expiry_year=parseInt(expiry_year);
    expiry_month=parseInt(expiry_month);
    var date = new Date ();
    var month = date.getMonth()+1;
    var year = date.getFullYear();
    if (year> expiry_year || (year === expiry_year && month >= expiry_month)){
        return false;
    }else{
        return true;
    }
}

/**
* Check if the Url is valid by the Algorithm:
*http://blog.mattheworiordan.com/post/13174566389/url-regular-expression-for-links-with-or-without
* @param {String} Url
* @returns {boolean} if the url is valid
*/
function ValidURL(Url) {
    var pattern = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/
    if(pattern.test(Url)) {
        return true;
    } else {
        return false;
    }
}


/**
* Check if the tel is valid
* @param {String} tel
* @returns {boolean} if the tel is valid
*/
function ValidatePhonenumber(tel){
    var phoneno1 = /^\d{9}$/; //XXXXXXXXX
    var phoneno2 = /^\+?([0-9]{2})\)?[-. ]?([0-9]{9})$/; //+XX-XXXXXXXXX
    if(tel.match(phoneno1) || tel.match(phoneno2)){
        return true;
    }
    else{
        return false;
    }
 }

/**
* Check if the CIF is valid by the Algorithm:
_   _ _ _ _ _ _ _   _
|_| |_|_|_|_|_|_|_| |_|
^   ^           ^   ^
|   |_ Números _|   |
|                   |
|               Dígito de control, un número ó letra:
|               {Aó1,Bó2,Có3,Dó4,Eó5,Fó6,Gó7,Hó8,Ió9,Jó0}
|
Letra de tipo de Organización, una de las siguientes:
{A,B,C,D,E,F,G,H,K,L,M,N,P,Q,S}
//http://www.microteching.com/javascript/clase-para-validar-cifs-y-nifs-por-javascript
* @param {String} cif
* @returns {boolean} if the cif is valid
*/
function validateCIF(cif) {
    var CIF_regExp = "^[a-zA-Z]{1}\\d{7}[a-jA-J0-9]{1}$";
    var v1 = new Array(0,2,4,6,8,1,3,5,7,9);
    var tempStr = cif.toUpperCase(); // pasar a mayúsculas
    var temp = 0;
    var temp1;
    var dc;

    // Comprueba el formato
    if (!tempStr.match(CIF_regExp)) return false;    // Valida el formato?
    if (!/^[ABCDEFGHKLMNPQS]/.test(tempStr)) return false;  // Es una letra de las admitidas ?

    for( i = 2; i <= 6; i += 2 ) {
            temp = temp + v1[ parseInt(cif.substr(i-1,1)) ];
            temp = temp + parseInt(cif.substr(i,1));
    };
    temp = temp + v1[ parseInt(cif.substr(7,1)) ];
    temp = (10 - ( temp % 10));
    if (temp==10) temp=0;
    dc  = cif.toUpperCase().charAt(8);
    return (dc==temp) || (temp==1 && dc=='A') || (temp==2 && dc=='B') || (temp==3 && dc=='C') || (temp==4 && dc=='D') || (temp==5 && dc=='E') || (temp==6 && dc=='F') || (temp==7 && dc=='G') || (temp==8 && dc=='H') || (temp==9 && dc=='I') || (temp==0 && dc=='J');
}


/**
* Validate size and name of file.
*@param {fileName} name of the file
*@param {fileSize} size of the file
*/
function validate_file(fileName,fileSize){
    console.log("name:"+fileName+" . Size: "+fileSize)
	var ext = fileName.substring(fileName.lastIndexOf('.') + 1);
    if( ext=="gif" || ext=="jpg" || ext=="JPG" || ext=="jpeg" || ext=="png" || ext=="pdf" ){
		if(fileSize>0 && fileSize<1000000000){//The file size can not exceed 1GB.
			 return true;
		}else{
			return false;
		}
    }
    else{
        return false;
    }
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


/**
* pause during the milisecond
*/
function pause(millis){
  var date = new Date();
  var curDate = null;
  do { curDate = new Date(); }
  while(curDate-date < millis);

}
