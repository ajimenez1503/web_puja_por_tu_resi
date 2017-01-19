/**
* @author antonio Jimenez (softwarejimenez)
* @version 0.1
*/

//////////////////////////////////////////////////////////////////////////////
/*
*COLLGE LIST ROOMS , SHOW table with all the rooms
*/
//////////////////////////////////////////////////////////////////////////////
/**
*Get every room and display as a row in the table. nombre,inicio academico,fin academico,inicio puja,fin puja,tamaño,planta,tv, bath, desk, wardrove
*@return tr element (row)
*/
function create_row_room(data){
    var tr = document.createElement('tr');
    //nombre
        var td = document.createElement('td');
        td.appendChild(document.createTextNode(data.name))
        tr.appendChild(td)
    //inicio academico
        var td = document.createElement('td');
        td.appendChild(document.createTextNode(data.date_start_school.date));
        tr.appendChild(td)
    //fin academico
        var td = document.createElement('td');
        td.appendChild(document.createTextNode(data.date_end_school.date));
        tr.appendChild(td)
    //inicio puja
        var td = document.createElement('td');
        td.appendChild(document.createTextNode(data.date_start_bid.date));
        tr.appendChild(td)
    //fin puja
        var td = document.createElement('td');
        td.appendChild(document.createTextNode(data.date_end_bid.date));
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
            icon_check_tv.className+="icon fa fa-check"       //<i class="fa fa-check" aria-hidden="true"></i>
            icon_check_tv.setAttribute("aria-hidden","true")
            td.appendChild(icon_check_tv)
        }else{
            var icon_failed_tv= document.createElement('i');
            icon_failed_tv.className+="icon fa fa-times"       //<i class="fa fa-times" aria-hidden="true"></i>
            icon_failed_tv.setAttribute("aria-hidden","true")
            td.appendChild(icon_failed_tv)
        }
        tr.appendChild(td)
    // bath
        var td = document.createElement('td');
        if(data.bath){
            var icon_check_bath= document.createElement('i');
            icon_check_bath.className+="icon fa fa-check"       //<i class="fa fa-check" aria-hidden="true"></i>
            icon_check_bath.setAttribute("aria-hidden","true")
            td.appendChild(icon_check_bath)
        }else{
            var icon_failed_bath= document.createElement('i');
            icon_failed_bath.className+="icon fa fa-times"       //<i class="fa fa-times" aria-hidden="true"></i>
            icon_failed_bath.setAttribute("aria-hidden","true")
            td.appendChild(icon_failed_bath)
        }
        tr.appendChild(td)
    //desk
        var td = document.createElement('td');
        if(data.desk){
            var icon_check_desk= document.createElement('i');
            icon_check_desk.className+="icon fa fa-check"       //<i class="fa fa-check" aria-hidden="true"></i>
            icon_check_desk.setAttribute("aria-hidden","true")
            td.appendChild(icon_check_desk)
        }else{
            var icon_failed_desk= document.createElement('i');
            icon_failed_desk.className+="icon fa fa-times"       //<i class="fa fa-times" aria-hidden="true"></i>
            icon_failed_desk.setAttribute("aria-hidden","true")
            td.appendChild(icon_failed_desk)
        }
        tr.appendChild(td)
    //wardrove
       var td = document.createElement('td');
       if(data.wardrove){
           var icon_check_wardrove= document.createElement('i');
           icon_check_wardrove.className+="icon fa fa-check"       //<i class="fa fa-check" aria-hidden="true"></i>
           icon_check_wardrove.setAttribute("aria-hidden","true")
           td.appendChild(icon_check_wardrove)
       }else{
           var icon_failed_wardrove= document.createElement('i');
           icon_failed_wardrove.className+="icon fa fa-times"       //<i class="fa fa-times" aria-hidden="true"></i>
           icon_failed_wardrove.setAttribute("aria-hidden","true")
           td.appendChild(icon_failed_wardrove)
       }
       tr.appendChild(td)
    return tr;
}

/**
*Display all the room of the college in the table_rent
*/
function display_table_list_rooms(data){
    var father = document.getElementById("college_element_table_list_rooms");
    deleteAllChildElement(father)
    for (i = 0; i < data.length; i++) {
        father.appendChild( create_row_room(data[i]));
    }
}


/**
*Get all the rents and display in the table
*/
function getRooms(){
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
                display_table_list_rooms(output.data)
    		}else{
    			showErrorMessagesPage("College","showdata",output.message,output.success);
    		}
    	}
    }
}

//////////////////////////////////////////////////////////////////////////////
/*
*Routing College
*/
//////////////////////////////////////////////////////////////////////////////
/**
* Dispaly the Home view
*/
function displayCollege_list_rooms(){
    if("collegeview"===globa_view ){
        console.log("display college_list_rooms");
    	document.getElementById("college_list_rooms").style.display="block";
        getRooms();// display table list rooms
    }
}
/**
* Display list rooms of the college
*/
page('/college_list_rooms', function(){
 	displayCollege_list_rooms();
});
