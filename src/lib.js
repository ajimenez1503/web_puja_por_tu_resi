/**
* @author antonio Jimenez (softwarejimenez)
* @version 0.1
*/

 /**
 * Dispaly data of a specific room
 * @param: tab
 * @param: data_room
 */
function display_specific_room(tab,data_room,display_shcool_date){
    //panel room atributes:
    document.getElementById(tab+"_name").innerHTML="   "+data_room.name;
    document.getElementById(tab+"_floor").innerHTML="   "+data_room.floor;
    document.getElementById(tab+"_size").innerHTML="   "+data_room.size;

    if (display_shcool_date){
        document.getElementById(tab+"_dateStart").innerHTML="   "+data_room.date_start_school.date.replace(" 00:00:00", "");
        document.getElementById(tab+"_dateEnd").innerHTML="   "+data_room.date_end_school.date.replace(" 00:00:00", "");
    }

    //panel room equipment
    room_equipment_father=document.getElementById(tab+"_equipment_room");
    deleteAllChildElement(room_equipment_father);//clean all data, in the case of all icon
    if(data_room.tv){
        room_equipment_father.appendChild(icon_tv());
    }
    if(data_room.bath){
        room_equipment_father.appendChild(icon_bath());
    }
    if(data_room.desk){
        room_equipment_father.appendChild(icon_desk());
    }
    if(data_room.wardrove){
        room_equipment_father.appendChild(icon_wardrove());
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
* Get the bid of a room (room_id) and display in a tab_id
* @param: room id
* @param: tab_id of the ul element
*/
function get_display_bids(room_id,tab_id){
    var xmlHttp =new XMLHttpRequest();
	var url=window.location.protocol+"//"+window.location.host+port+"/Bid/getBidsRoom/"+room_id;
	xmlHttp.open("GET", url, true );
    xmlHttp.withCredentials = true;
	xmlHttp.send();
	xmlHttp.onreadystatechange = function() {
    	if ( xmlHttp.readyState == 4 && xmlHttp.status == 200 ){
    		var output= JSON.parse(xmlHttp.responseText);
            console.log(output)
    		if(output.success){
                var ul_element = document.getElementById(tab_id);
                deleteAllChildElement(ul_element);
                for (i = 0; i < output.data.length; i++) {
                    var li = document.createElement("li");
                    li.className="list-group-item justify-content-between";
                    li.innerHTML="Puntos";
                    var span = document.createElement("span");
                    span.className="badge badge-default badge-pilln";
                    span.innerHTML=output.data[i].point;
                    li.appendChild(span);
                    ul_element.appendChild(li);
                }
    		}else{
    			showErrorMessagesPage("Get bids",output.message,output.success);
    		}
    	}
    }
}


/**
* create the strucutre to show the incidences in the html structure
* @param:data_incidence
* @param: tab
*/
function create_div_incidence(data_incidence,tab){
    var div = document.createElement('div');
    div.className += " localIncidence";
    div.id="div_inicdence_"+data_incidence.id;

    var label_id= document.createElement('label');
    label_id.appendChild(document.createTextNode("id: "+data_incidence.id));
    div.appendChild(label_id);
    div.appendChild(document.createElement('br'));

    var label_description= document.createElement('label');
    label_description.appendChild(document.createTextNode("description: "+data_incidence.description));
    div.appendChild(label_description);
    div.appendChild(document.createElement('br'));

    var label_date= document.createElement('label');
    label_date.appendChild(document.createTextNode("Fecha: "+data_incidence.date.date));
    div.appendChild(label_date);
    div.appendChild(document.createElement('br'));

    if (data_incidence.file_name){
        var file_download = document.createElement('a');
        file_download.setAttribute('href', window.location.protocol+"//"+window.location.host+port+"/Incidence/download/"+data_incidence.file_name);
        file_download.download="file"
        file_download.appendChild(document.createTextNode("file_download"));
        div.appendChild(file_download);
    }
    if(tab.includes("college")){
        var label_date= document.createElement('label');
        label_date.appendChild(document.createTextNode("Estudiante: "+data_incidence.student_username));
        div.appendChild(label_date);
        div.appendChild(document.createElement('br'));

        div.ondragstart = function(){
            drag(event,data_incidence.id);
        };

        div.setAttribute('draggable', true);//graggable
    }


    return div;
}


/**
* Get number message wihout open, and write in menu whith the message.
* @param: tab
*/
function countUnreadMessages(tab){
	var xmlHttp =new XMLHttpRequest();
	var url=window.location.protocol+"//"+window.location.host+port+"/Message/countUnread/";
	xmlHttp.open("GET", url, true );
    xmlHttp.withCredentials = true;
	xmlHttp.send();
	xmlHttp.onreadystatechange = function() {
    	if ( xmlHttp.readyState == 4 && xmlHttp.status == 200 ){
    		var output= JSON.parse(xmlHttp.responseText);
            console.log(output)
    		if(output.success){
    			document.getElementById(tab+"numberMessage").textContent=output.data;
    		}
    	}
    }
}


/**
* Display the list of incidences of the user
* @param: tab
*/
function getIncidences(tab){
	var xmlHttp =new XMLHttpRequest();
	var url=window.location.protocol+"//"+window.location.host+port+"/Incidence/get/";
	xmlHttp.open("GET", url, true );
    xmlHttp.withCredentials = true;
	xmlHttp.send();
	xmlHttp.onreadystatechange = function() {
    	if ( xmlHttp.readyState == 4 && xmlHttp.status == 200 ){
    		var output= JSON.parse(xmlHttp.responseText);
            console.log(output)
    		if(output.success){
                var father_open = document.getElementById(tab+"incidence_OPEN");
                deleteAllChildElement(father_open)
                var father_in_progress = document.getElementById(tab+"incidence_IN_PROGRESS");
                deleteAllChildElement(father_in_progress)
                var father_done = document.getElementById(tab+"incidence_DONE");
                deleteAllChildElement(father_done)
                for (i = 0; i < output.data.length; i++) {//organize in the different div
                    if("OPEN"==output.data[i].status){
                        father_open.appendChild(create_div_incidence(output.data[i],tab));
                    }else if ("IN PROGRESS"==output.data[i].status){
                        father_in_progress.appendChild(create_div_incidence(output.data[i],tab));
                    }else if ("DONE"==output.data[i].status){
                        father_done.appendChild(create_div_incidence(output.data[i],tab));
                    }
                }

    		}else{
    			showErrorMessagesPage("showdata",output.message,output.success);
    		}
    	}
    }
}


/**
* Update the a inicidence .
* @param id_inicidence
* @param new_status
*/
function update_inicidence(id_inicidence, new_status){
	var url=window.location.protocol+"//"+window.location.host+port+"/Incidence/updateState/";
	var xmlHttp =new XMLHttpRequest();
	xmlHttp.onreadystatechange = function() {
		if ( xmlHttp.readyState == 4 && xmlHttp.status == 200 ){
			var output= JSON.parse(xmlHttp.responseText);
            console.log(output);
			showErrorMessagesPage("updateInicidence",output.message,output.success);
		}
	}
	xmlHttp.open("POST", url, true );
    xmlHttp.withCredentials = true;
    var data = new FormData();
    data.append("id", id_inicidence);
    data.append("status",new_status);
	xmlHttp.send(data);
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
        college_equipment_father.appendChild(icon_study_room());
    }
    if(data_college.equipment_college.gym){
        college_equipment_father.appendChild(icon_gym());
    }
    if(data_college.equipment_college.canteen){
        college_equipment_father.appendChild(icon_canteen());
    }
    if(data_college.equipment_college.wifi){
        college_equipment_father.appendChild(icon_wifi());
    }
    if(data_college.equipment_college.laundry){
        college_equipment_father.appendChild(icon_laundry());
    }
    if(data_college.equipment_college.heating){
        college_equipment_father.appendChild(icon_heating());
    }
    if(data_college.equipment_college.elevator){
        college_equipment_father.appendChild(icon_elevator());
    }
    if(data_college.equipment_college.hours24){
        college_equipment_father.appendChild(icon_hours24());
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
* Get element selected of the equipment in a json structure
* @param tab: it is the id of the div with the elements
* @return json_structure with the list of element
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
