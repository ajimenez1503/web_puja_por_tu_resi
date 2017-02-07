/**
* @author antonio Jimenez (softwarejimenez)
* @version 0.1
*/
//////////////////////////////////////////////////////////////////////////////
/*
*create new room
*/
//////////////////////////////////////////////////////////////////////////////
/**
* Create a room by the form
* Validate the input
*/
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
                showErrorMessagesPage("Upload file","error validation pciture1.",false);
                return;
            }
        }else{
            showErrorMessagesPage("Upload file"," picture1 error.",false);
            return;
        }
    }else{
        showErrorMessagesPage("Upload file","No hay picture1.",false);
        console.log(picture);
        return;
    }
    if ('files' in picture.picture2 && picture.picture2.files.length>=1){
        picture.picture2=picture.picture2.files[0];
        if ('name' in picture.picture2 && 'size' in picture.picture2) {
            if (!validate_file(picture.picture2.name,picture.picture2.size)){
                showErrorMessagesPage("Upload file","error validation pciture1.",false);
                return;
            }
        }else{
            showErrorMessagesPage("Upload file"," picture2 error.",false);
            return;
        }
    }else{
        showErrorMessagesPage("Upload file","No hay picture2.",false);
        console.log(picture);
        return;
    }
    if ('files' in picture.picture3 && picture.picture3.files.length>=1){
        picture.picture3=picture.picture3.files[0];
        if ('name' in picture.picture3 && 'size' in picture.picture3) {
            if (!validate_file(picture.picture3.name,picture.picture3.size)){
                showErrorMessagesPage("Upload file","error validation pciture1.",false);
                return;
            }
        }else{
            showErrorMessagesPage("Upload file"," picture3 error.",false);
            return;
        }
    }else{
        showErrorMessagesPage("Upload file","No hay picture3.",false);
        console.log(picture);
        return;
    }

    if (room.name=="" ||  room.floor=="" ||  room.size=="" ||  room.price==""){
        showErrorMessagesPage("Input room","Valores de entrada incorrectos (Habitacion-general).",false);
        console.log(room)
        return;
    }
    if (room.date_start_school=="" ||  room.date_end_school=="" ||  room.date_start_bid=="" ||  room.date_start_bid==""){
        showErrorMessagesPage("Input room","Valores de entrada incorrectos (Fechas).",false);
        console.log(room)
        return;
    }
    var xmlHttp =new XMLHttpRequest();
    var url=window.location.protocol+"//"+window.location.host+port+"/Room/create/";
    xmlHttp.onreadystatechange = function() {
        if ( xmlHttp.readyState == 4 && xmlHttp.status == 200 ){
            var output= JSON.parse(xmlHttp.responseText);
            console.log(output);
            showErrorMessagesPage("create new room",output.message,output.success);
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
* COLLGE LIST ROOMS , SHOW table with all the rooms
*/
//////////////////////////////////////////////////////////////////////////////
/**
* Get every room and display as a row in the table. nombre,inicio academico,fin academico,inicio puja,fin puja,tamaño,planta,tv, bath, desk, wardrove
* @return tr element (row)
*/
function college_create_row_room(data_room){
    var tr = document.createElement('tr');
    tr.id="college_list_room_id"+data_room.id.toString();
    //nombre
        var td = document.createElement('td');
        td.appendChild(document.createTextNode(data_room.name))
        tr.appendChild(td)
    //inicio academico
        var td = document.createElement('td');
        td.appendChild(document.createTextNode(data_room.date_start_school.date.replace(" 00:00:00", "")));
        tr.appendChild(td)
    //fin academico
        var td = document.createElement('td');
        td.appendChild(document.createTextNode(data_room.date_end_school.date.replace(" 00:00:00", "")));
        tr.appendChild(td)
    //inicio puja
        var td = document.createElement('td');
        td.appendChild(document.createTextNode(data_room.date_start_bid.date.replace(" 00:00:00", "")));
        tr.appendChild(td)
    //fin puja
        var td = document.createElement('td');
        td.appendChild(document.createTextNode(data_room.date_end_bid.date.replace(" 00:00:00", "")));
        tr.appendChild(td)
    //tamaño
        var td = document.createElement('td');
        td.appendChild(document.createTextNode(data_room.size))
        tr.appendChild(td)
    //planta
        var td = document.createElement('td');
        td.appendChild(document.createTextNode(data_room.floor))
        tr.appendChild(td)
    //cliente
        var td = document.createElement('td');
        td.appendChild(document.createTextNode("nombre cliente"))
        tr.appendChild(td)

    //tv
        var td = document.createElement('td');
        if(data_room.tv){
            td.appendChild(icon_check())
        }else{
            td.appendChild(icon_failed())
        }
        tr.appendChild(td)
    // bath
        var td = document.createElement('td');
        if(data_room.bath){
            td.appendChild(icon_check())
        }else{
            td.appendChild(icon_failed())
        }
        tr.appendChild(td)
    //desk
        var td = document.createElement('td');
        if(data_room.desk){
            td.appendChild(icon_check())
        }else{
            td.appendChild(icon_failed())
        }
        tr.appendChild(td)
    //wardrove
       var td = document.createElement('td');
       if(data_room.wardrove){
           td.appendChild(icon_check())
       }else{
           td.appendChild(icon_failed())
       }
       tr.appendChild(td)
     //buttom remove
        var td = document.createElement('td');
        remove_buttom=document.createElement('button');
        remove_buttom.className+=" btn btn-link"
        remove_buttom.appendChild(icon_cross())
        remove_buttom.onclick = function() {
            remove_room(data_room.id);
            collegeGetAllRooms();
            tr.onclick = function() {
                /*empty for the tv. It have onclic in the button -> remove_room*/
            };

        };
        td.appendChild(remove_buttom)
        tr.appendChild(td)

    tr.onmouseover = function() {
        selected_out_selected_row_table(tr.id)
    };
    tr.onmouseout = function() {
        selected_out_selected_row_table(tr.id)
    };

    tr.onclick = function() {
        college_display_specifiy_room(data_room);
    };
    return tr;
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
                var father = document.getElementById("college_element_table_list_rooms");
                deleteAllChildElement(father)
                for (i = 0; i < output.data.length; i++) {
                    father.appendChild( college_create_row_room(output.data[i]));
                }
    		}else{
    			showErrorMessagesPage("showdata",output.message,output.success);
    		}
    	}
    }
}

/**
* remove a room by id
* @param id of the room
* @return bool (true if it is deleted)
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
    			showErrorMessagesPage("remove_roome",output.message,output.success);
                return false;
    		}else{
                return true;
            }
    	}
    }
}


/**
* display the view of a specific room, student, agreeemnt, bids,
* Verify if display agreement or bids
* @param data_room
*/
function college_display_specifiy_room(data_room){
    display_specific_div("college_list_rooms","college_room_specific")
    display_specific_room("college_room_specific",data_room);

    var xmlHttp =new XMLHttpRequest();
    var url=window.location.protocol+"//"+window.location.host+port+"/Agreement/roomVerifyUnsigned/"+data_room.id;
    xmlHttp.open("GET", url, true );
    xmlHttp.withCredentials = true;
    xmlHttp.send();
    xmlHttp.onreadystatechange = function() {
        if ( xmlHttp.readyState == 4 && xmlHttp.status == 200 ){
            var output= JSON.parse(xmlHttp.responseText);
            console.log(output)
            if(output.success){//choose if display agreemtn or bid or anything according to the dates
                if(output.data.agreement_signed){
                    document.getElementById("college_room_specific_agreement").style.display="block";
                    //display data agreement
                    display_specific_agreement("college_room_specific_agreement_",output.data.agreement);
                    document.getElementById("college_room_specific_agreement_student").style.display="block";
                    //display data agreement student
                     display_specific_student("college_room_specific_agreement_student_",output.data.student);

                }else{
                    document.getElementById("college_room_specific_bids").style.display="block";
                    //get data of bids and display
                    get_display_bids(data_room.id,"college_room_specific_ul");
                }
            }else{
                document.getElementById("college_room_specific_bids").style.display="block";
                //get data of bids and display
                get_display_bids(data_room.id,"college_room_specific_ul");
            }
        }
    }
}
//////////////////////////////////////////////////////////////////////////////
/*
*MESSAGES , get list student, get messages of student, send message, read messag
*/
//////////////////////////////////////////////////////////////////////////////
/**
* Send a message to one or several student with a text and a file
* @param: tab
* @param: specific_student (optional)
*/
function college_sendMessage(tab, specific_student){
    //console.log(tab);
    var student_targets= [];
    if (specific_student !== undefined) { //we already know the specific student
        student_targets.push(specific_student);
    } else { //get elements of the list of students
        $.each($("#college_messages_send_message_form_select option:selected"), function(){
            student_targets.push($(this).val());
        });
        $("#college_messages_send_message_form_select").selectpicker('deselectAll');
    }
    console.log(student_targets)

    var message=document.getElementById(tab+"_form_text").value;
    var file=document.getElementById(tab+"_form_filename");
	var url=window.location.protocol+"//"+window.location.host+port+"/Message/create/";
    if (message ===""){
        showErrorMessagesPage("message","ERROR: necesita un mensaje texto.",false);
        return;
    }
    if ('files' in file && file.files.length>=1){
        file=file.files[0];
        if ('name' in file && 'size' in file) {
            if (!validate_file(file.name,file.size)){
                showErrorMessagesPage("Upload file","error validation file image format.",false);
                return;
            }
        }else{
            showErrorMessagesPage("Upload file","error file image.",false);
            return;
        }
        console.log("file "+file.name)
    }
    else{
        console.log("no file")
        file=null;
    }
    for (i=0; i<student_targets.length ; i++){//send a messsage for every student
        var xmlHttp =new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() {
    		if ( xmlHttp.readyState == 4 && xmlHttp.status == 200 ){
    			var output= JSON.parse(xmlHttp.responseText);
                console.log(output);
    			showErrorMessagesPage("createMessage",output.message,output.success);
    		}
    	}
    	xmlHttp.open("POST", url, true );
        xmlHttp.withCredentials = true;
        var data = new FormData();
        data.append("message", message);
        data.append("file_attached", file);
        data.append("username_student", student_targets[i]);
    	xmlHttp.send(data);
    }
    document.getElementById(tab+"_form").reset();//clean input
}

/**
* Create a row in the table.
* Name of the studnet, in a circle the number of messages without read
* Click go the the conversation of the studetn
* onmouseout onmouseover change the background-color
* @param: data_student
* @param: unread
* @return tr
*/
function college_create_row_student(data_student,unread){
    var tr = document.createElement('tr');
    tr.className+=" college_messages_tr";
    tr.id="college_messages_tr_"+data_student.username;
    //nombre
        var td = document.createElement('td');
        td.appendChild(document.createTextNode(data_student.name+" "))

    //unrad messges
        var span = document.createElement("span");
        span.className="badge badge-default badge-pilln";
        span.innerHTML=unread;
        td.appendChild(span);
    tr.appendChild(td);
    tr.onmouseover = function() {
        selected_out_selected_row_table(tr.id)
    };
    tr.onmouseout = function() {
        selected_out_selected_row_table(tr.id)
    };

    tr.onclick = function() {
        college_display_messages_specific_student(data_student.username);
    };
    return tr;
}


/**
* Get the list of student and the number of message without read ofthem
* For every studnet create a row in the table of the left with the name and the number of unread messages
* save the list of student of another uses
* add all the studnt to the select option
*/
function college_get_list_student(){
    var list_student=[]
    var xmlHttp =new XMLHttpRequest();
	var url=window.location.protocol+"//"+window.location.host+port+"/Message/countUnreadStudent/";
	xmlHttp.open("GET", url, true );
    xmlHttp.withCredentials = true;
	xmlHttp.send();
	xmlHttp.onreadystatechange = function() {
    	if ( xmlHttp.readyState == 4 && xmlHttp.status == 200 ){
    		var output= JSON.parse(xmlHttp.responseText);
            console.log(output)
    		if(output.success){
                var father = document.getElementById("college_messages_list_student_table");
                deleteAllChildElement(father);
                for (i = 0; i < output.data.length; i++) {
                    list_student.push(output.data[i].student)
                    father.appendChild( college_create_row_student(output.data[i].student,output.data[i].unread));
                }
                //add all the studnt to the select option
                college_fill_list_student_select(list_student);
    		}else{
    			showErrorMessagesPage("showdata",output.message,output.success);
    		}
    	}
    }
}


/**
* Fill the select element of the form with the list of student.(name and username)
* Activate library selectpicker
* @param: list_student
*/
function college_fill_list_student_select(list_student){
    var select=document.getElementById('college_messages_send_message_form_select');
    for(i=0;i<list_student.length;i++){
        // <option value="12345678A" data-tokens="Antonio">Antonio</option>
        var option = document.createElement("option");
        option.text = list_student[i].name;
        option.value=list_student[i].username;
        option.setAttribute('data-tokens', list_student[i].name);
        select.add(option);
    }
    $('.selectpicker').selectpicker(); // display the select
}



/**
* reaad/open  all the list of message of the college with a specific student
* @param: student
*/
function college_open_messages_specific_student(student){
	var xmlHttp =new XMLHttpRequest();
	var url=window.location.protocol+"//"+window.location.host+port+"/Message/openStudent/"+student;
	xmlHttp.onreadystatechange = function() {
    	if ( xmlHttp.readyState == 4 && xmlHttp.status == 200 ){
    		var output= JSON.parse(xmlHttp.responseText);
            console.log(output)
    		if(!output.success){
    			showErrorMessagesPage("displayMessages",output.message,output.success);
    		}
    	}
    }
    xmlHttp.open("POST", url, true );
    xmlHttp.withCredentials = true;
	xmlHttp.send();
}

/**
* Display the list of message of the college with a specific student
* Open all the messages of the studnet
* @param: student
*/
function college_display_messages_specific_student(student){
	var xmlHttp =new XMLHttpRequest();
	var url=window.location.protocol+"//"+window.location.host+port+"/Message/get/?username_student="+student;
	xmlHttp.open("GET", url, true );
    xmlHttp.withCredentials = true;
	xmlHttp.send();
	xmlHttp.onreadystatechange = function() {
    	if ( xmlHttp.readyState == 4 && xmlHttp.status == 200 ){
    		var output= JSON.parse(xmlHttp.responseText);
            console.log(output)
    		if(output.success){
                var father = document.getElementById("college_messages_conversation_list_message");
                deleteAllChildElement(father);
                for (i = 0; i < output.data.length; i++) {
                    father.appendChild( createHTMLMessage(output.data[i]));
                }
    		}else{
    			showErrorMessagesPage("displayMessages",output.message,output.success);
    		}
    	}
    }

    college_open_messages_specific_student(student);

    //display the conversation
    display_specific_div("college_messages_list_messages",'college_messages_conversation')

    //update the button send messages
    document.getElementById('college_messages_conversation_form_button').onclick = function(){
        college_sendMessage("college_messages_conversation", student);
    }
}
//////////////////////////////////////////////////////////////////////////////
/*
* College Profile
*/
//////////////////////////////////////////////////////////////////////////////
/**
* show the data of the college user
*/
function college_displayProfile(){
	var xmlHttp =new XMLHttpRequest();
	var url=window.location.protocol+"//"+window.location.host+port+"/ProfileStudent/get/";
	xmlHttp.open("GET", url, true );
    xmlHttp.withCredentials = true;
	xmlHttp.send();
	xmlHttp.onreadystatechange = function() {
    	if ( xmlHttp.readyState == 4 && xmlHttp.status == 200 ){
    		var output= JSON.parse(xmlHttp.responseText);
            console.log(output)
    		if(output.success){
    			display_specific_college("college_profile_",output.data);
    		}else{
    			showErrorMessagesPage("showdata",output.message,output.success);
    		}
    	}
    }
}


/**
* Update the pasword of the user college
* The input is validate and show the error in case of problem
*/
function college_profile_updatePassword(){
	var passwordOld=document.getElementById("college_profile_formUpdatePasswordOld").value;
	var passwordNew=document.getElementById("college_profile_formUpdatePasswordNew").value;
	var passwordNewRepeat=document.getElementById("college_profile_formUpdatePasswordNewRepeat").value;
	if(passwordNew==passwordNewRepeat){
		if(passwordNew.length>=sizePaswword){
			var url=window.location.protocol+"//"+window.location.host+port+"/ProfileCollege/updatePassword/";
			var xmlHttp =new XMLHttpRequest();
			xmlHttp.onreadystatechange = function() {
				if ( xmlHttp.readyState == 4 && xmlHttp.status == 200 ){
					var output= JSON.parse(xmlHttp.responseText);
                    console.log(output);
					showErrorMessagesPage("updatePassword",output.message,output.success);
				}
			}
			xmlHttp.open("POST", url, true );
            xmlHttp.withCredentials = true;
            var data = new FormData();
            data.append("old_password", passwordOld);
            data.append("new_password", passwordNew);
			xmlHttp.send(data);
		}else{
		    showErrorMessagesPage("updatePassword","error input",false);
		}
	}else{
		showErrorMessagesPage("updatePassword","passwords not identical ",false);
	}
    document.getElementById("college_profile_id_formUpdatePassword").reset();//clean input
}


/**
* Update the email of the college user
*The input is validate and show the error in case of problem
*/
function college_profile_updateEmail(){
	var email=document.getElementById("college_profile_formUpdateEmail").value;
	if(validate_email(email)){
		var url=window.location.protocol+"//"+window.location.host+port+"/ProfileCollege/updateEmail/";
		var xmlHttp =new XMLHttpRequest();
		xmlHttp.onreadystatechange = function() {
			if ( xmlHttp.readyState == 4 && xmlHttp.status == 200 ){
				var output= JSON.parse(xmlHttp.responseText);
                console.log(output);
				showErrorMessagesPage("updateEmail",output.message,output.success);
			}
		}
		xmlHttp.open("POST", url, true );
        xmlHttp.withCredentials = true;
        var data = new FormData();
        data.append("email", email);
		xmlHttp.send(data);
	}else{
		showErrorMessagesPage("updateEmail","Email no es valido.",false);
	}
    document.getElementById("college_profile_id_formUpdateEmail").reset();//clean input
}


/**
* Update the address of the college user
*/
function college_profile_updateAddress(){
	var url=window.location.protocol+"//"+window.location.host+port+"/ProfileCollege/updateAddress/";
	var xmlHttp =new XMLHttpRequest();
	xmlHttp.onreadystatechange = function() {
		if ( xmlHttp.readyState == 4 && xmlHttp.status == 200 ){
			var output= JSON.parse(xmlHttp.responseText);
            console.log(output);
			showErrorMessagesPage("updateEmail",output.message,output.success);
		}
    }
	xmlHttp.open("POST", url, true );
    xmlHttp.withCredentials = true;
    var data = new FormData();
    data.append("address", global_address_college.formatted_address);
    data.append("lat", global_address_college.lat);
    data.append("lng", global_address_college.lng);

	xmlHttp.send(data);

    document.getElementById("college_profile_id_formUpdateAddress").reset();//clean input
}


/**
* Update the telephone of the college user
*The input is validate and show the error in case of problem
*/
function college_profile_updateTelephone(){
	var telephone=document.getElementById("college_profile_formUpdateTelephone").value;
	if(Validate_Phonenumber(telephone)){
		var url=window.location.protocol+"//"+window.location.host+port+"/ProfileCollege/updateTelephone/";
		var xmlHttp =new XMLHttpRequest();
		xmlHttp.onreadystatechange = function() {
			if ( xmlHttp.readyState == 4 && xmlHttp.status == 200 ){
				var output= JSON.parse(xmlHttp.responseText);
                console.log(output);
				showErrorMessagesPage("updateTelephone",output.message,output.success);
			}
		}
		xmlHttp.open("POST", url, true );
        xmlHttp.withCredentials = true;
        var data = new FormData();
        data.append("telephone", telephone);
		xmlHttp.send(data);
	}else{
		showErrorMessagesPage("updateTelephone","Telefono no es valido.",false);
	}
    document.getElementById("college_profile_id_formUpdateTelephone").reset();//clean input
}


/**
* Update the URL of the college user
*The input is validate and show the error in case of problem
*/
function college_profile_updateURL(){
	var URL=document.getElementById("college_profile_formUpdateURL").value;
	if(validate_URL(URL)){
		var url=window.location.protocol+"//"+window.location.host+port+"/ProfileCollege/updateURL/";
		var xmlHttp =new XMLHttpRequest();
		xmlHttp.onreadystatechange = function() {
			if ( xmlHttp.readyState == 4 && xmlHttp.status == 200 ){
				var output= JSON.parse(xmlHttp.responseText);
                console.log(output);
				showErrorMessagesPage("updateURL",output.message,output.success);
			}
		}
		xmlHttp.open("POST", url, true );
        xmlHttp.withCredentials = true;
        var data = new FormData();
        data.append("URL", URL);
		xmlHttp.send(data);
	}else{
		showErrorMessagesPage("updateURL","URL no es valido.",false);
	}
    document.getElementById("college_profile_id_formUpdateURL").reset();//clean input
}


/**
* Update the equipemnt of the college user
*The input is validate and show the error in case of problem
*/
function college_profile_updateEquipment(){
	var equipment=get_equipment_selected("college_profile_formUpdateEquipment");
	var url=window.location.protocol+"//"+window.location.host+port+"/ProfileCollege/updateEquipment/";
	var xmlHttp =new XMLHttpRequest();
	xmlHttp.onreadystatechange = function() {
		if ( xmlHttp.readyState == 4 && xmlHttp.status == 200 ){
			var output= JSON.parse(xmlHttp.responseText);
            console.log(output);
			showErrorMessagesPage("updateURL",output.message,output.success);
		}
	}
	xmlHttp.open("POST", url, true );
    xmlHttp.withCredentials = true;
    var data = new FormData();
    data.append("wifi", equipment.college_profile_icon_wifi);
    data.append("elevator", equipment.college_profile_icon_elevator);
    data.append("canteen", equipment.college_profile_icon_restaurant);
    data.append("hours24", equipment.college_profile_icon_24h);
    data.append("laundry", equipment.college_profile_icon_laundry);
    data.append("gym", equipment.college_profile_icon_gym);
    data.append("study_room", equipment.college_profile_icon_school);
    data.append("heating", equipment.college_profile_icon_heating);
	xmlHttp.send(data);

    document.getElementById("college_profile_id_formUpdateEquipment").reset();//clean input
}
//////////////////////////////////////////////////////////////////////////////
/*
*Routing College
*/
//////////////////////////////////////////////////////////////////////////////
/**
* Display the college_create_room view
*/
page('/college_create_room', function(){
    if("collegeview"===globa_view ){
        console.log("display college_create_room");
        display_specific_div("college_view_list_elements","college_create_room");
    }
});
/**
* Display list rooms of the college
*/
page('/college_list_rooms', function(){
    if("collegeview"===globa_view ){
        console.log("display college_list_rooms");
        display_specific_div("college_view_list_elements","college_list_rooms");
        display_specific_div("college_list_rooms","college_table_list_rooms");
        collegeGetAllRooms();// display table list rooms
    }
});

/**
* Display the college_create_room view
*/
page('/college_messages', function(){
    if("collegeview"===globa_view ){
        console.log("display college_messagess");
        display_specific_div("college_view_list_elements","college_messages");
        display_specific_div("college_messages_list_messages",'college_messages_send_message');
        // get list student
            //get number of message without read of every student
            college_get_list_student();
        //display the list of messgaes of every student
    }
});

/**
* Display the college_profile view
*/
page('/college_profile', function(){
    if("collegeview"===globa_view ){
        console.log("display college_list_rooms");
        display_specific_div("college_view_list_elements","college_profile");
        display_specific_div("college_profile_list_form",undefined);
        college_displayProfile();
    }
});
