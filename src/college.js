/**
* @author antonio Jimenez (softwarejimenez)
* @version 0.1
*/
//////////////////////////////////////////////////////////////////////////////
/*
*create new room
*/
//////////////////////////////////////////////////////////////////////////////
function create_new_room(){
    var equipment=get_equipment_selected("college_equipment_new_room");
    var room = {
      'name': document.getElementById("college_name_new_room").value,
      'price':document.getElementById("college_price_new_room").value.replace("€",""),
      'floor':document.getElementById("college_floor_new_room").value,
      'size': document.getElementById("college_size_new_room").value.replace("m2",""),
      'date_start_school': document.getElementById("college_date_start_school_new_room").value,
      'date_end_school': document.getElementById("college_date_end_school_new_room").value,
      'date_start_bid': document.getElementById("college_date_start_bid_new_room").value,
      'date_end_bid': document.getElementById("college_date_end_bid_new_room").value,
    };
    var picture={
        'picture1': document.getElementById("college_picture1_new_room"),
        'picture2': document.getElementById("college_picture2_new_room"),
        'picture3': document.getElementById("college_picture3_new_room"),
    }
    if ('files' in picture.picture1 && picture.picture1.files.length>=1){
        picture.picture1=picture.picture1.files[0];
        if ('name' in picture.picture1 && 'size' in picture.picture1) {
            if (!validate_file(picture.picture1.name,picture.picture1.size)){
                showErrorMessagesPage("College","Upload file","error validation pciture1.",false);
                return;
            }
        }else{
            showErrorMessagesPage("College","Upload file"," picture1 error.",false);
            return;
        }
    }else{
        showErrorMessagesPage("College","Upload file","No hay picture1.",false);
        console.log(picture);
        return;
    }
    if ('files' in picture.picture2 && picture.picture2.files.length>=1){
        picture.picture2=picture.picture2.files[0];
        if ('name' in picture.picture2 && 'size' in picture.picture2) {
            if (!validate_file(picture.picture2.name,picture.picture2.size)){
                showErrorMessagesPage("College","Upload file","error validation pciture1.",false);
                return;
            }
        }else{
            showErrorMessagesPage("College","Upload file"," picture2 error.",false);
            return;
        }
    }else{
        showErrorMessagesPage("College","Upload file","No hay picture2.",false);
        console.log(picture);
        return;
    }
    if ('files' in picture.picture3 && picture.picture3.files.length>=1){
        picture.picture3=picture.picture3.files[0];
        if ('name' in picture.picture3 && 'size' in picture.picture3) {
            if (!validate_file(picture.picture3.name,picture.picture3.size)){
                showErrorMessagesPage("College","Upload file","error validation pciture1.",false);
                return;
            }
        }else{
            showErrorMessagesPage("College","Upload file"," picture3 error.",false);
            return;
        }
    }else{
        showErrorMessagesPage("College","Upload file","No hay picture3.",false);
        console.log(picture);
        return;
    }

    if (room.name=="" ||  room.floor=="" ||  room.size=="" ||  room.price==""){
        showErrorMessagesPage("College","Input room","Valores de entrada incorrectos (Habitacion-general).",false);
        console.log(room)
        return;
    }
    if (room.date_start_school=="" ||  room.date_end_school=="" ||  room.date_start_bid=="" ||  room.date_start_bid==""){
        showErrorMessagesPage("College","Input room","Valores de entrada incorrectos (Fechas).",false);
        console.log(room)
        return;
    }
    var xmlHttp =new XMLHttpRequest();
    var url=window.location.protocol+"//"+window.location.host+port+"/Room/create/";
    xmlHttp.onreadystatechange = function() {
        if ( xmlHttp.readyState == 4 && xmlHttp.status == 200 ){
            var output= JSON.parse(xmlHttp.responseText);
            console.log(output);
            showErrorMessagesPage("College","create new room",output.message,output.success);
        }
    }
    xmlHttp.open("POST", url, true );
    xmlHttp.withCredentials = true;

    var data = new FormData();
    data.append("name", room.name);
    data.append("price", room.price);
    data.append("floor",room.floor);
    data.append("size", room.size);
    data.append("date_start_school", room.date_start_school);
    data.append("date_end_school", room.date_end_school);
    data.append("date_start_bid", room.date_start_bid);
    data.append("date_end_bid", room.date_end_bid);
    data.append("picture1", picture.picture1);
    data.append("picture2", picture.picture2);
    data.append("picture3", picture.picture3);
    data.append("tv", equipment.college_icon_tv_new_room);
    data.append("desk", equipment.college_icon_desk_new_room);
    data.append("bath", equipment.college_icon_bath_new_room);
    data.append("wardrove", equipment.college_icon_wardrove_new_room);
    xmlHttp.send(data);
}
//////////////////////////////////////////////////////////////////////////////
/*
*COLLGE LIST ROOMS , SHOW table with all the rooms
*/
//////////////////////////////////////////////////////////////////////////////
/**
*Get every room and display as a row in the table. nombre,inicio academico,fin academico,inicio puja,fin puja,tamaño,planta,tv, bath, desk, wardrove
*@return tr element (row)
*/
function college_create_row_room(data){
    var tr = document.createElement('tr');
    tr.id="college_list_room_id"+data.id.toString();
    //nombre
        var td = document.createElement('td');
        td.appendChild(document.createTextNode(data.name))
        tr.appendChild(td)
    //inicio academico
        var td = document.createElement('td');
        td.appendChild(document.createTextNode(data.date_start_school.date.replace(" 00:00:00", "")));
        tr.appendChild(td)
    //fin academico
        var td = document.createElement('td');
        td.appendChild(document.createTextNode(data.date_end_school.date.replace(" 00:00:00", "")));
        tr.appendChild(td)
    //inicio puja
        var td = document.createElement('td');
        td.appendChild(document.createTextNode(data.date_start_bid.date.replace(" 00:00:00", "")));
        tr.appendChild(td)
    //fin puja
        var td = document.createElement('td');
        td.appendChild(document.createTextNode(data.date_end_bid.date.replace(" 00:00:00", "")));
        tr.appendChild(td)
    //tamaño
        var td = document.createElement('td');
        td.appendChild(document.createTextNode(data.size))
        tr.appendChild(td)
    //planta
        var td = document.createElement('td');
        td.appendChild(document.createTextNode(data.floor))
        tr.appendChild(td)
    //cliente
        var td = document.createElement('td');
        td.appendChild(document.createTextNode("nombre cliente"))
        tr.appendChild(td)

    //tv
        var td = document.createElement('td');
        if(data.tv){
            var icon_check_tv= document.createElement('i');
            icon_check_tv.className+="icon fa fa-check-circle"       //<i class="fa fa-check-circle" aria-hidden="true"></i>
            icon_check_tv.setAttribute("aria-hidden","true")
            td.appendChild(icon_check_tv)
        }else{
            var icon_failed_tv= document.createElement('i');
            icon_failed_tv.className+="icon fa fa-ban"       //<i class="fa fa-ban" aria-hidden="true"></i>
            icon_failed_tv.setAttribute("aria-hidden","true")
            td.appendChild(icon_failed_tv)
        }
        tr.appendChild(td)
    // bath
        var td = document.createElement('td');
        if(data.bath){
            var icon_check_bath= document.createElement('i');
            icon_check_bath.className+="icon fa fa-check-circle"       //<i class="fa fa-check-circle" aria-hidden="true"></i>
            icon_check_bath.setAttribute("aria-hidden","true")
            td.appendChild(icon_check_bath)
        }else{
            var icon_failed_bath= document.createElement('i');
            icon_failed_bath.className+="icon fa fa-ban"       //<i class="fa fa-ban" aria-hidden="true"></i>
            icon_failed_bath.setAttribute("aria-hidden","true")
            td.appendChild(icon_failed_bath)
        }
        tr.appendChild(td)
    //desk
        var td = document.createElement('td');
        if(data.desk){
            var icon_check_desk= document.createElement('i');
            icon_check_desk.className+="icon fa fa-check-circle"       //<i class="fa fa-check-circle" aria-hidden="true"></i>
            icon_check_desk.setAttribute("aria-hidden","true")
            td.appendChild(icon_check_desk)
        }else{
            var icon_failed_desk= document.createElement('i');
            icon_failed_desk.className+="icon fa fa-ban"       //<i class="fa fa-ban" aria-hidden="true"></i>
            icon_failed_desk.setAttribute("aria-hidden","true")
            td.appendChild(icon_failed_desk)
        }
        tr.appendChild(td)
    //wardrove
       var td = document.createElement('td');
       if(data.wardrove){
           var icon_check_wardrove= document.createElement('i');
           icon_check_wardrove.className+="icon fa fa-check-circle"       //<i class="fa fa-check-circle" aria-hidden="true"></i>
           icon_check_wardrove.setAttribute("aria-hidden","true")
           td.appendChild(icon_check_wardrove)
       }else{
           var icon_failed_wardrove= document.createElement('i');
           icon_failed_wardrove.className+="icon fa fa-ban"       //<i class="fa fa-ban" aria-hidden="true"></i>
           icon_failed_wardrove.setAttribute("aria-hidden","true")
           td.appendChild(icon_failed_wardrove)
       }
       tr.appendChild(td)
     //buttom remove
        var td = document.createElement('td');
        remove_buttom=document.createElement('button');
        remove_buttom.className+=" btn btn-link"
        var icon_failed_desk= document.createElement('i');
        icon_failed_desk.className+="icon fa fa-times"       //<i class="fa fa-times" aria-hidden="true"></i>
        icon_failed_desk.setAttribute("aria-hidden","true")
        remove_buttom.appendChild(icon_failed_desk)
        remove_buttom.onclick = function() {
            remove_room(data.id);
            collegeGetAllRooms();
            tr.onclick = function() {/*empty*/ };

        };
        td.appendChild(remove_buttom)
        tr.appendChild(td)

    tr.onmouseover = function() {
        college_selected_outselected_row_table(tr.id)
    };
    tr.onmouseout = function() {
        college_selected_outselected_row_table(tr.id)
    };

    tr.onclick = function() {
        college_display_specifiy_room(data);
    };
    return tr;
}

/**
*Display all the room of the college in the college_element_table_list_rooms
*/
function college_display_table_list_rooms(data){
    var father = document.getElementById("college_element_table_list_rooms");
    deleteAllChildElement(father)
    for (i = 0; i < data.length; i++) {
        father.appendChild( college_create_row_room(data[i]));
    }
}


/**
*Select a row in a table of the search room (red background-color)
* out select a row in a table of the search
*/
function college_selected_outselected_row_table(id){

    class_name=document.getElementById(id).className;
    if (class_name.includes(" selected_row_table")){
        class_name=class_name.replace("selected_row_table","");
        document.getElementById(id).className=class_name;
    }else{
        document.getElementById(id).className+= " selected_row_table";
    }
}


/**
*Get all the rooms of the college and display in the table
*/
function collegeGetAllRooms(){
    var xmlHttp =new XMLHttpRequest();
	var url=window.location.protocol+"//"+window.location.host+port+"/Room/getAll/";
	xmlHttp.open("GET", url, true );
    xmlHttp.withCredentials = true;
	xmlHttp.send();
	xmlHttp.onreadystatechange = function() {
    	if ( xmlHttp.readyState == 4 && xmlHttp.status == 200 ){
    		var output= JSON.parse(xmlHttp.responseText);
            console.log(output)
    		if(output.success){
                college_display_table_list_rooms(output.data)
    		}else{
    			showErrorMessagesPage("College","showdata",output.message,output.success);
    		}
    	}
    }
}




/**
*remove a room (id)
*@param id of the room
*@return bool (true if it is deleted)
*/
function remove_room(id){
	var xmlHttp =new XMLHttpRequest();
	var url=window.location.protocol+"//"+window.location.host+port+"/Room/remove/"+id;
	xmlHttp.open("POST", url, true );
    xmlHttp.withCredentials = true;
	xmlHttp.send();
	xmlHttp.onreadystatechange = function() {
    	if ( xmlHttp.readyState == 4 && xmlHttp.status == 200 ){
    		var output= JSON.parse(xmlHttp.responseText);
            console.log(output)
    		if(!output.success){
    			showErrorMessagesPage("College","remove_roome",output.message,output.success);
                return false;
    		}else{
                return true;
            }
    	}
    }
}



/**
*display the view of a specific room
*/
function college_display_specifiy_room(data_room){
    document.getElementById("college_table_list_rooms").style.display="none";
    document.getElementById("college_specific_room").style.display="block";

    //panel room atributes:
    document.getElementById("college_specific_room_Name").innerHTML="   "+data_room.name;
    document.getElementById("college_specific_room_Size").innerHTML="   "+data_room.size;
    document.getElementById("college_specific_room_Floor").innerHTML="   "+data_room.floor;

    //panel room equipment
    equipment_father=document.getElementById("college_specific_room_equipment");
    deleteAllChildElement(equipment_father);//clean all data
    if(data_room.tv){
        var icon_tv= document.createElement('i');
        icon_tv.className+="icon fa fa-television" ;
        icon_tv.setAttribute("aria-hidden","true");
        icon_tv.title="television";
        equipment_father.appendChild(icon_tv);
    }
    if(data_room.bath){
        var icon_bath= document.createElement('i');
        icon_bath.className+="icon fa fa-bath" ;
        icon_bath.setAttribute("aria-hidden","true");
        icon_bath.title="baño";
        equipment_father.appendChild(icon_bath);
    }
    if(data_room.desk){
        var icon_desk= document.createElement('img');
        icon_desk.className+="icon_img" ;
        icon_desk.src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCAyOTUuMjQgMjk1LjI0IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAyOTUuMjQgMjk1LjI0OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjI0cHgiIGhlaWdodD0iMjRweCI+CjxnPgoJPGc+CgkJPGc+CgkJCTxwYXRoIGQ9Ik0yMzMuMzM1LDIxNC4yODd2LTkuNTI0aDQ3LjYxN3YwYzcuODc2LDAsMTQuMjg2LTYuNDEsMTQuMjg2LTE0LjI4NnYtNzYuMTljMC03Ljg3Ni02LjQxLTE0LjI4Ni0xNC4yODYtMTQuMjg2SDE0Ny42MTkgICAgIGMtNy44NzYsMC0xNC4yODYsNi40MS0xNC4yODYsMTQuMjg2djc2LjE5YzAsNy44NzYsNi40MSwxNC4yODYsMTQuMjg2LDE0LjI4Nmg0Ny42MTl2OS41MjRoLTgwLjk1MnYtNC43NjIgICAgIGMwLTcuODc2LTYuNjg2LTE0LjI4Ni0xNC41NjItMTQuMjg2aC0xNi4xMWwtNDguOTI4LTc5LjY0OGMyLjEzOC0zLjA4MSwzLjQxLTYuODA1LDMuNDEtMTAuODI5YzAtMS4xNzEtMC4xNDMtMi4zMDUtMC4zNDgtMy40MTkgICAgIGwxOS45MzMtMzYuNTQyYzEuODM4LDkuMDUyLDYuODc2LDE3LjEzOCwxNC41MTksMjIuODUybDMuMTEsMi4zMjRsMTEuNzU3LTEwLjQ1MmMyLjU3NiwwLjkzMyw1LjIxNCwxLjQyOSw3Ljg5NSwxLjQyOSAgICAgYzEzLjEyOSwwLDIzLjgxLTEwLjY4MSwyMy44MS0yMy44MWMwLTEuNzI5LTAuMjcxLTMuNDY3LTAuNjc2LTUuMTk1bDExLjc4MS0xMC40NzFsLTEuOTQzLTMuMzY3ICAgICBjLTYuODA1LTExLjc1Ny0xOS40MzgtMTkuMDYyLTMyLjk3MS0xOS4wNjJjLTAuODk1LDAtMS43NzYsMC4wNzEtMi42NTcsMC4xMzNsLTE2LjEtMTYuMUw0MC44MiwzMi41NzJsNi41NTcsOC43NDNMMTYuMDg3LDg2LjAyICAgICBDNi45OSw4Ny40NTMsMCw5NS4yNzcsMCwxMDQuNzYzYzAsNy4xNDMsMy45OTUsMTMuMzA1LDkuODI5LDE2LjU2MmwzOS4zODEsNzMuOTE0SDMzLjA1N2MtNy44NzYsMC0xNC4wMSw2LjQxLTE0LjAxLDE0LjI4NiAgICAgdjQuNzYySDB2MjguNTcxaDE0LjI4NnY1Mi4zODFoOS41MjR2LTUyLjM4MWg5LjUyNHY1Mi4zODFoOS41MjR2LTUyLjM4MWgyMDkuNTI0djUyLjM4MWg5LjUyNHYtNTIuMzgxaDkuNTI0djUyLjM4MWg5LjUyNCAgICAgdi01Mi4zODFoMTQuMjg2di0yOC41NzFIMjMzLjMzNXogTTE0Mi44NTcsMTE0LjI4N2MwLTIuNjI0LDIuMTM4LTQuNzYyLDQuNzYyLTQuNzYyaDEzMy4zMzNjMi42MjQsMCw0Ljc2MiwyLjEzOCw0Ljc2Miw0Ljc2MiAgICAgdjYxLjkwNUgxNDIuODU3VjExNC4yODd6IE0xOTUuMjM4LDE5NS4yMzloLTQ3LjYxOWMtMi42MjQsMC00Ljc2Mi0yLjEzOC00Ljc2Mi00Ljc2MnYtNC43NjJoMTQyLjg1N3Y0Ljc2MiAgICAgYzAsMi42MjQtMi4xMzgsNC43NjItNC43NjIsNC43NjJoLTQ3LjYxOUgxOTUuMjM4eiBNMjIzLjgxLDIwNC43NjN2OS41MjRoLTE5LjA0OHYtOS41MjRIMjIzLjgxeiBNOTYuMjQzLDcxLjM3MmwxMi43LTExLjI5ICAgICBDMTA3LjY3MSw2Ni4xNDksMTAyLjUzOCw3MC44MTEsOTYuMjQzLDcxLjM3MnogTTk0Ljk2NywyOC41NzNjOC44NTctMC4wMDEsMTcuMjA0LDQuMTgsMjIuNTgxLDExLjExOEw3NC45ODYsNzcuNTI1ICAgICBjLTUuNS01LjM1Mi04LjU5LTEyLjYtOC41OS0yMC4zODFDNjYuMzk2LDQxLjM4Nyw3OS4yMSwyOC41NzMsOTQuOTY3LDI4LjU3M3ogTTc1LjYxOSwxNS45NjhsNS42NjIsNS42NjIgICAgIEM3MS43LDI1LjMzNCw2My45NjcsMzIuNzcyLDU5LjkyOSw0Mi4xODdsLTYuMDYyLTguMDlMNzUuNjE5LDE1Ljk2OHogTTUzLjM4NSw0OS4zMjlsMS4wOTEsMS40NTNMMzIuNDE5LDkxLjIyNSAgICAgYy0xLjYyOS0xLjYxLTMuNTQ4LTIuOTA1LTUuNjY3LTMuODQ4TDUzLjM4NSw0OS4zMjl6IE05LjUyNCwxMDQuNzYzYzAtNS4yNTIsNC4yNzEtOS41MjQsOS41MjQtOS41MjQgICAgIGM1LjI1MiwwLDkuNTI0LDQuMjcxLDkuNTI0LDkuNTI0YzAsNS4yNTItNC4yNzEsOS41MjQtOS41MjQsOS41MjRDMTMuNzk1LDExNC4yODcsOS41MjQsMTEwLjAxNiw5LjUyNCwxMDQuNzYzeiBNMjEuNzk1LDEyMy41MzQgICAgIGMxLjk2Ny0wLjI4NiwzLjgyNC0wLjg2Miw1LjU0OC0xLjcwNWw0NS4wOTUsNzMuNDFINjBMMjEuNzk1LDEyMy41MzR6IE0zMy4wNTcsMjA0Ljc2M2g2Ni42NjdjMi42MjQsMCw1LjAzOCwyLjEzOCw1LjAzOCw0Ljc2MiAgICAgdjQuNzYyaC03Ni4xOXYtNC43NjJoLTAuMDAxQzI4LjU3MSwyMDYuOTAxLDMwLjQzMywyMDQuNzYzLDMzLjA1NywyMDQuNzYzeiBNMjg1LjcxNCwyMzMuMzM1aC00Ljc2MmgtMjguNTcxSDQyLjg1N0gxNC4yODYgICAgIEg5LjUyNHYtOS41MjRoOS4yNDhoOTUuMjM4aDgxLjIyOWgzOC4wOTVoNTIuMzhWMjMzLjMzNXoiIGZpbGw9IiMwMDAwMDAiLz4KCQkJPHJlY3QgeD0iMTM4LjA5NSIgeT0iODAuOTUzIiB3aWR0aD0iMTUyLjM4MSIgaGVpZ2h0PSI5LjUyNCIgZmlsbD0iIzAwMDAwMCIvPgoJCQk8cGF0aCBkPSJNMjA0Ljc2MiwwLjAwMWgtMzguMDk1djc2LjE5aDM4LjA5NVYwLjAwMXogTTE5NS4yMzgsNjYuNjY4SDE3Ni4xOVY0Ny42MmgxOS4wNDhWNjYuNjY4eiBNMTk1LjIzOCwzOC4wOTZIMTc2LjE5VjkuNTI1ICAgICBoMTkuMDQ4VjM4LjA5NnoiIGZpbGw9IiMwMDAwMDAiLz4KCQkJPGNpcmNsZSBjeD0iMTg1LjcxNCIgY3k9IjU3LjE0NCIgcj0iNC43NjIiIGZpbGw9IiMwMDAwMDAiLz4KCQkJPHBhdGggZD0iTTI0Ny42MTksMC4wMDFoLTM4LjA5NXY3Ni4xOWgzOC4wOTVWMC4wMDF6IE0yMTkuMDQ3LDkuNTI1aDE5LjA0OHYyOC41NzFoLTE5LjA0OFY5LjUyNXogTTIzOC4wOTYsNjYuNjY4aC0xOS4wNDhWNDcuNjIgICAgIGgxOS4wNDhWNjYuNjY4eiIgZmlsbD0iIzAwMDAwMCIvPgoJCQk8Y2lyY2xlIGN4PSIyMjguNTcxIiBjeT0iNTcuMTQ0IiByPSI0Ljc2MiIgZmlsbD0iIzAwMDAwMCIvPgoJCQk8cGF0aCBkPSJNMjkwLjQ3NiwwLjAwMWgtMzguMDk1djc2LjE5aDM4LjA5NVYwLjAwMXogTTI2MS45MDQsOS41MjVoMTkuMDQ4djI4LjU3MWgtMTkuMDQ4VjkuNTI1eiBNMjgwLjk1Myw2Ni42NjhoLTE5LjA0OFY0Ny42MiAgICAgaDE5LjA0OFY2Ni42Njh6IiBmaWxsPSIjMDAwMDAwIi8+CgkJCTxjaXJjbGUgY3g9IjI3MS40MjkiIGN5PSI1Ny4xNDQiIHI9IjQuNzYyIiBmaWxsPSIjMDAwMDAwIi8+CgkJPC9nPgoJPC9nPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=";
        icon_desk.title="escritorio";
        equipment_father.appendChild(icon_desk);
    }
    if(data_room.wardrove){
        var icon_wardrove= document.createElement('img');
        icon_wardrove.className+="icon_img" ;
        icon_wardrove.src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDYwIDYwIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA2MCA2MDsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSIyNHB4IiBoZWlnaHQ9IjI0cHgiPgo8Zz4KCTxnPgoJCTxwYXRoIGQ9Ik05LDUzaDE5VjNIOVY1M3ogTTExLDVoMTV2NDZIMTFWNXoiIGZpbGw9IiMwMDAwMDAiLz4KCQk8cGF0aCBkPSJNMTUsMTFoN2MwLjU1MiwwLDEtMC40NDgsMS0xcy0wLjQ0OC0xLTEtMWgtN2MtMC41NTIsMC0xLDAuNDQ4LTEsMVMxNC40NDgsMTEsMTUsMTF6IiBmaWxsPSIjMDAwMDAwIi8+CgkJPHBhdGggZD0iTTE1LDE0aDdjMC41NTIsMCwxLTAuNDQ4LDEtMXMtMC40NDgtMS0xLTFoLTdjLTAuNTUyLDAtMSwwLjQ0OC0xLDFTMTQuNDQ4LDE0LDE1LDE0eiIgZmlsbD0iIzAwMDAwMCIvPgoJCTxwYXRoIGQ9Ik0yMywxNmMwLTAuNTUyLTAuNDQ4LTEtMS0xaC03Yy0wLjU1MiwwLTEsMC40NDgtMSwxczAuNDQ4LDEsMSwxaDdDMjIuNTUyLDE3LDIzLDE2LjU1MiwyMywxNnoiIGZpbGw9IiMwMDAwMDAiLz4KCQk8cGF0aCBkPSJNMjMsMjhjLTAuNTUyLDAtMSwwLjQ0OC0xLDF2NWMwLDAuNTUyLDAuNDQ4LDEsMSwxczEtMC40NDgsMS0xdi01QzI0LDI4LjQ0OCwyMy41NTIsMjgsMjMsMjh6IiBmaWxsPSIjMDAwMDAwIi8+CgkJPHBhdGggZD0iTTU0LDBIMzFoLTJINnY1NmgydjRoNC42MThsMi00aDguNzY0bDIsNEgzMHYtNGgxdjRoNC42MThsMi00aDguNzY0bDIsNEg1M3YtNGgxVjB6IE0xMS4zODIsNThIMTB2LTJoMi4zODJMMTEuMzgyLDU4eiAgICAgTTE1LjYxOCw1NEg4VjJoMjF2NTJoLTYuNjE4SDE1LjYxOHogTTI4LDU4aC0xLjM4MmwtMS0ySDI4VjU4eiBNMzQuMzgyLDU4SDMzdi0yaDIuMzgyTDM0LjM4Miw1OHogTTM4LjYxOCw1NEgzMVYyaDIxdjUyaC02LjYxOCAgICBIMzguNjE4eiBNNTEsNThoLTEuMzgybC0xLTJINTFWNTh6IiBmaWxsPSIjMDAwMDAwIi8+CgkJPHBhdGggZD0iTTMyLDUzaDE5VjNIMzJWNTN6IE0zNCw1aDE1djQ2SDM0VjV6IiBmaWxsPSIjMDAwMDAwIi8+CgkJPHBhdGggZD0iTTM4LDExaDdjMC41NTIsMCwxLTAuNDQ4LDEtMXMtMC40NDgtMS0xLTFoLTdjLTAuNTUyLDAtMSwwLjQ0OC0xLDFTMzcuNDQ4LDExLDM4LDExeiIgZmlsbD0iIzAwMDAwMCIvPgoJCTxwYXRoIGQ9Ik0zOCwxNGg3YzAuNTUyLDAsMS0wLjQ0OCwxLTFzLTAuNDQ4LTEtMS0xaC03Yy0wLjU1MiwwLTEsMC40NDgtMSwxUzM3LjQ0OCwxNCwzOCwxNHoiIGZpbGw9IiMwMDAwMDAiLz4KCQk8cGF0aCBkPSJNNDYsMTZjMC0wLjU1Mi0wLjQ0OC0xLTEtMWgtN2MtMC41NTIsMC0xLDAuNDQ4LTEsMXMwLjQ0OCwxLDEsMWg3QzQ1LjU1MiwxNyw0NiwxNi41NTIsNDYsMTZ6IiBmaWxsPSIjMDAwMDAwIi8+CgkJPHBhdGggZD0iTTQ2LDI4Yy0wLjU1MiwwLTEsMC40NDgtMSwxdjVjMCwwLjU1MiwwLjQ0OCwxLDEsMXMxLTAuNDQ4LDEtMXYtNUM0NywyOC40NDgsNDYuNTUyLDI4LDQ2LDI4eiIgZmlsbD0iIzAwMDAwMCIvPgoJPC9nPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo="
        icon_wardrove.title="wardrove";
        equipment_father.appendChild(icon_wardrove);
    }

    //panel room img
    //get imgs
    document.getElementById("college_specific_room_picture1").src=window.location.protocol+"//"+window.location.host+port+"/Room/download/"+data_room.picture1;
    document.getElementById("college_specific_room_picture2").src=window.location.protocol+"//"+window.location.host+port+"/Room/download/"+data_room.picture2;
    document.getElementById("college_specific_room_picture3").src=window.location.protocol+"//"+window.location.host+port+"/Room/download/"+data_room.picture3;
    rotate("college_specific_room");
    //TODO choose if display agreemtn or bid or anything according to the dates
    //TODO get data of agreement and display

    //get data of bids and display
    get_display_bids(data_room.id,"college_specific_room_ul");

}

//////////////////////////////////////////////////////////////////////////////
/*
*Routing College
*/
//////////////////////////////////////////////////////////////////////////////
/**
* Dispaly the College_list_rooms view
*/
function displayCollege_list_rooms(){
    if("collegeview"===globa_view ){
        console.log("display college_list_rooms");
    	document.getElementById("college_list_rooms").style.display="block";
        document.getElementById("college_table_list_rooms").style.display="block";
        document.getElementById("college_specific_room").style.display="none";
        document.getElementById('college_create_room').style.display="none";
        collegeGetAllRooms();// display table list rooms
    }
}
/**
* Dispaly the college_create_room view
*/
function displayCollege_create_room(){
    if("collegeview"===globa_view ){
        console.log("display college_list_rooms");
        document.getElementById('college_create_room').style.display="block";
    	document.getElementById("college_list_rooms").style.display="none";
    }
}
/**
* Display list rooms of the college
*/
page('/college_create_room', function(){
 	displayCollege_create_room();
});
/**
* Display list rooms of the college
*/
page('/college_list_rooms', function(){
 	displayCollege_list_rooms();
});
