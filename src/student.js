/**
* @author antonio Jimenez (softwarejimenez)
* @version 0.1
*/

//////////////////////////////////////////////////////////////////////////////
/*
*PROFILE USER. SHOW, UPDATE
*/
//////////////////////////////////////////////////////////////////////////////
/**
* show the data of the student user
*/
function dataProfile(){
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
                display_specific_student("profile_student_",output.data);
                document.getElementById("profile_student_point").innerHTML="   "+output.data.point;
    		}else{
    			showErrorMessagesPage("showdata",output.message,output.success);
    		}
    	}
    }
}


/**
* Update the pasword.
* The input is validate and show the error in case of problem
*/
function updatePassword(){
	var passwordOld=document.getElementById("formUpdatePasswordOld").value;
	var passwordNew=document.getElementById("formUpdatePasswordNew").value;
	var passwordNewRepeat=document.getElementById("formUpdatePasswordNewRepeat").value;
	if(passwordNew==passwordNewRepeat){
		if(passwordNew.length>=sizePaswword){
			var url=window.location.protocol+"//"+window.location.host+port+"/ProfileStudent/updatePassword/";
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
    document.getElementById("id_formUpdatePassword").reset();//clean input
}


/**
* Update the email.
* The input is validate and show the error in case of problem
*/
function updateEmail(){
	var email=document.getElementById("formUpdateEmail").value;
	if(validate_email(email)){
		var url=window.location.protocol+"//"+window.location.host+port+"/ProfileStudent/updateEmail/";
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
    document.getElementById("id_formUpdateEmail").reset();//clean input
}
//////////////////////////////////////////////////////////////////////////////
/*
*INCIDENCE CREATE, SHOW
*/
//////////////////////////////////////////////////////////////////////////////
/**
* Create Incidence from the Student to the college.
* The input is validate and show the error in case of problem
*/
function createIncidence(){
	var description=document.getElementById("formInicidenceDescription").value;
    var file=document.getElementById("formIncidenceFilename");
	var url=window.location.protocol+"//"+window.location.host+port+"/Incidence/create/";
	var xmlHttp =new XMLHttpRequest();
    if ('files' in file && file.files.length>=1){
        file=file.files[0];
        if ('name' in file && 'size' in file) {
            if (!validate_file(file.name,file.size)){
                showErrorMessagesPage("Upload file","error validation file image format.",false);
            }else{
                xmlHttp.onreadystatechange = function() {
            		if ( xmlHttp.readyState == 4 && xmlHttp.status == 200 ){
            			var output= JSON.parse(xmlHttp.responseText);
                        console.log(output);
            			showErrorMessagesPage("createIncidence",output.message,output.success);
            		}
            	}
            	xmlHttp.open("POST", url, true );
                xmlHttp.withCredentials = true;
                var data = new FormData();
                data.append("description", description);
                data.append("file_name", file);
            	xmlHttp.send(data);
                document.getElementById("id_form_createIncidence").reset();//clean input
            }
        }else{
            showErrorMessagesPage("Upload file","error file image.",false);
        }
    }else{
        showErrorMessagesPage("Upload file","Enter a correct file image.",false);
    }

}
//////////////////////////////////////////////////////////////////////////////
/*
*MESSAGE CREATE SHOW OPEN
*/
//////////////////////////////////////////////////////////////////////////////
/**
* Create message from the Student to the college.
* The input is validate and show the error in case of problem
*/
function sendMessage(){
	var message=document.getElementById("formMessageText").value;
    document.getElementById("formMessageText").value= "";//clean input
    var file=document.getElementById("formMessageFilename");
	var url=window.location.protocol+"//"+window.location.host+port+"/Message/create/";
	var xmlHttp =new XMLHttpRequest();
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
	xmlHttp.send(data);
    document.getElementById("id_form_sendMessage").reset();//clean input
}


/**
* Display the list of message of the user
*/
function getMessages(){
	var xmlHttp =new XMLHttpRequest();
	var url=window.location.protocol+"//"+window.location.host+port+"/Message/get/";
	xmlHttp.open("GET", url, true );
    xmlHttp.withCredentials = true;
	xmlHttp.send();
	xmlHttp.onreadystatechange = function() {
    	if ( xmlHttp.readyState == 4 && xmlHttp.status == 200 ){
    		var output= JSON.parse(xmlHttp.responseText);
            console.log(output)
    		if(output.success){
                var father = document.getElementById("list_message");
                deleteAllChildElement(father);
                for (i = 0; i < output.data.length; i++) {
                    father.appendChild( createHTMLMessage(output.data[i]));
                }
    		}else{
    			showErrorMessagesPage("showdata",output.message,output.success);
    		}
    	}
    }
}


/**
* Open all the messages of the user
*/
function OpenAllMessages(){
	var xmlHttp =new XMLHttpRequest();
	var url=window.location.protocol+"//"+window.location.host+port+"/Message/openAll/";
	xmlHttp.open("POST", url, true );
    xmlHttp.withCredentials = true;
	xmlHttp.send();
	xmlHttp.onreadystatechange = function() {
    	if ( xmlHttp.readyState == 4 && xmlHttp.status == 200 ){
    		var output= JSON.parse(xmlHttp.responseText);
            console.log(output)
    		if(!output.success){
    			showErrorMessagesPage("Open_message",output.message,output.success);
    		}
    	}
    }
}
//////////////////////////////////////////////////////////////////////////////
/*
*ROOM, SHOW DATA, DOWNLOAD FILE, ACEPT AGREEMENT, REJECT
*/
//////////////////////////////////////////////////////////////////////////////
/**
* verify if the student has a agreement:
*    -displat data of the college
*    -display data of the room
*    -display data of the agreement
*    -If the AGREEMENT is not signed yet display the button (accept, refuse, download)
*/
function get_room_data(){
    var xmlHttp =new XMLHttpRequest();
    var url=window.location.protocol+"//"+window.location.host+port+"/Agreement/verifyUnsigned/";
    xmlHttp.open("GET", url, true );
    xmlHttp.withCredentials = true;
    xmlHttp.send();
    xmlHttp.onreadystatechange = function() {
        if ( xmlHttp.readyState == 4 && xmlHttp.status == 200 ){
            var output= JSON.parse(xmlHttp.responseText);
            console.log(output)
            if(output.success){//in the case that there are agreemnt, show it
                document.getElementById("Room_specific").style.display="block";
                //display data agreement
                display_specific_agreement("Room_specific_agreement_",output.data.agreement);
                //display data room
                display_specific_room("Room_specific",output.data.room,false);
                //displat data college
                display_specific_college("Room_specific_",output.data.college);
                display_button_accept_refuse(output.data.agreement_signed,output.data.agreement);
            }else{
                document.getElementById("Room_specific").style.display="none";
                showErrorMessagesPage("showdata",output.message,output.success);
            }
        }
    }
}


/**
* Display the button. Assigned a every button and form the specifit function and link
*/
function display_button_accept_refuse(agreement_signed, agreement_data){
    if(!agreement_signed){
        document.getElementById("Room_accept_refuse").style.display="block";//display button
        document.getElementById("Room_upload_file_agreement").onclick = function(){
            upload_file_agreement(agreement_data.room_id);
        };
        document.getElementById("Room_button_download_agreement").setAttribute('href',window.location.protocol+"//"+window.location.host+port+"/Agreement/download/"+agreement_data.file_agreement);
        document.getElementById("Room_button_download_agreement").download="file"
        document.getElementById("Room_button_refuse_agreement").onclick = function(){
            refuse_agreement_room(agreement_data.room_id);
        };

    }else{
        document.getElementById("Room_accept_refuse").style.display="none";//display button
    }

}

/**
* Display the button. Assigned a every button and form the specifit function and link
*/
function refuse_agreement_room(room_id){
    //remove a agrement between room and a student ( assincronous false)
    var url=window.location.protocol+"//"+window.location.host+port+"/Agreement/remove/";
    var xmlHttp =new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if ( xmlHttp.readyState == 4 && xmlHttp.status == 200 ){
            var output= JSON.parse(xmlHttp.responseText);
            console.log(output);
            showErrorMessagesPage("refuse room",output.message,output.success);
        }
    }
    xmlHttp.open("POST", url, false );
    xmlHttp.withCredentials = true;
    var data = new FormData();
    data.append("room_id", room_id);
    xmlHttp.send(data);
    document.getElementById("Room_specific").style.display="none";
    document.getElementById("Room_accept_refuse").style.display="none";//display button
    get_room_data();
}


/**
* Accept the agreement by updload the file signed.
* @param: room_id
*/
function upload_file_agreement(room_id){
    //update the file and everything
    var file=document.getElementById("formAgreementFilename");
	var url=window.location.protocol+"//"+window.location.host+port+"/Agreement/accept/";
	var xmlHttp =new XMLHttpRequest();
    if ('files' in file && file.files.length>=1){
        file=file.files[0];
        if ('name' in file && 'size' in file) {
            if (!validate_file(file.name,file.size)){
                showErrorMessagesPage("Upload file","error validation file pdf format.",false);
            }else{
                xmlHttp.onreadystatechange = function() {
            		if ( xmlHttp.readyState == 4 && xmlHttp.status == 200 ){
            			var output= JSON.parse(xmlHttp.responseText);
                        console.log(output);
            			showErrorMessagesPage("accept Agreement",output.message,output.success);
            		}
            	}
            	xmlHttp.open("POST", url, false );
                xmlHttp.withCredentials = true;
                var data = new FormData();
                data.append("room_id", room_id);
                data.append("file_agreement_signed", file);
            	xmlHttp.send(data);
            }
        }else{
            showErrorMessagesPage("Upload file","error file pdf.",false);
        }
    }else{
        console.log("Enter a correct file.")
    }
    document.getElementById("Room_form_id_upload_file_agreement").reset();//clean input
    get_room_data();
}
//////////////////////////////////////////////////////////////////////////////
/*
*RENT, SHOW DATA, DOWNLOAD FILE, PAY
*/
//////////////////////////////////////////////////////////////////////////////
/**
* Display the form to pay
*/
function show_form_payment(){
    //check if there area any month available to pay.
    var xmlHttp =new XMLHttpRequest();
	var url=window.location.protocol+"//"+window.location.host+port+"/Rent/getUnpaid/";
	xmlHttp.open("GET", url, true );
    xmlHttp.withCredentials = true;
	xmlHttp.send();
	xmlHttp.onreadystatechange = function() {
    	if ( xmlHttp.readyState == 4 && xmlHttp.status == 200 ){
    		var output= JSON.parse(xmlHttp.responseText);
            console.log(output)
    		if(output.success){//in the case that there are month available, show it at the form
                if (output.data.length>=1){
                    document.getElementById("payment_rent_month").innerHTML="   "+output.data[0].month;
                    document.getElementById("payment_rent_year").innerHTML="   "+output.data[0].year;
                    document.getElementById("payment_rent_price").innerHTML="   "+output.data[0].price.toString()+"€";
                    document.getElementById("payment_rent_submit").onclick = function(){
                        pay_month(output.data[0].id);
                    };
                    document.getElementById("payment_rent").style.display="block";
                    document.getElementById("table_rent").style.overflowY = "auto";
                }else{
                    document.getElementById("payment_rent").style.display="none";
                    document.getElementById("table_rent").style.overflowY = "visible";
                }
    		}else{
    			showErrorMessagesPage("showdata",output.message,output.success);
    		}
    	}
    }
}


/**
* Get all the rents and display in the table
*/
function getRents(){
    var xmlHttp =new XMLHttpRequest();
	var url=window.location.protocol+"//"+window.location.host+port+"/Rent/get/";
	xmlHttp.open("GET", url, true );
    xmlHttp.withCredentials = true;
	xmlHttp.send();
	xmlHttp.onreadystatechange = function() {
    	if ( xmlHttp.readyState == 4 && xmlHttp.status == 200 ){
    		var output= JSON.parse(xmlHttp.responseText);
            console.log(output)
    		if(output.success){
                display_table_rents("student_element_table_rent",output.data)
    		}else{
    			showErrorMessagesPage("showdata",output.message,output.success);
    		}
    	}
    }
}


/**
* Pay the month of the last rent
* @param {id} id of the rent in the database
*/
function pay_month(id){
	var card_holder_name=document.getElementById("card-holder-name").value;
    var card_number=document.getElementById("card-number").value;
    card_number= card_number.replace(/\D/g, "");//get only the digit
    var e = document.getElementById("expiry-month");
    var expiry_month = e.options[e.selectedIndex].value;
    var e = document.getElementById("expiry-year");
    var expiry_year = e.options[e.selectedIndex].value;
    var cvv=document.getElementById("card_cvv").value;
    if (!validate_CreditCard(card_number)){
        showErrorMessagesPage("pay","Invalid credit card",false);
        return;
    }
    if(card_holder_name.length==0){
        showErrorMessagesPage("pay","Invalid card Holder name",false);
        return;
    }if(!validate_CVV(card_number,cvv)){
        showErrorMessagesPage("pay","Invalid CCV",false);
        return;
    }
    if(!validate_ExpiryDate(expiry_month,expiry_year)){
        showErrorMessagesPage("pay","Invalid fecha expiracion",false);
        return;
    }
    var data = new FormData();
    data.append("id", id);
    data.append("cardHolder", card_holder_name);
    data.append("cardNumber", card_number);
    data.append("cvv", cvv);
    data.append("expiry_year", expiry_year);
    data.append("expiry_month", expiry_month);

	var url=window.location.protocol+"//"+window.location.host+port+"/Rent/pay/";
	var xmlHttp =new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
		if ( xmlHttp.readyState == 4 && xmlHttp.status == 200 ){
			var output= JSON.parse(xmlHttp.responseText);
            console.log(output);
			showErrorMessagesPage("pay rent",output.message,output.success);
		}
	}
	xmlHttp.open("POST", url, true );
    xmlHttp.withCredentials = true;
	xmlHttp.send(data);
    document.getElementById("form_id_payment_rent_submit").reset();//clean input form
}
//////////////////////////////////////////////////////////////////////////////
/*
*SEARCH_ROOM, SHOW DATA, DOWNLOAD FILE, PAY
*/
//////////////////////////////////////////////////////////////////////////////
/**
* Get all colleges name and display the list in the form of search room
*/
function display_list_colleges(){
    var xmlHttp =new XMLHttpRequest();
	var url=window.location.protocol+"//"+window.location.host+port+"/Room/getAllCompanyName/";
	xmlHttp.open("GET", url, true );
    xmlHttp.withCredentials = true;
	xmlHttp.send();
	xmlHttp.onreadystatechange = function() {
    	if ( xmlHttp.readyState == 4 && xmlHttp.status == 200 ){
    		var output= JSON.parse(xmlHttp.responseText);
            console.log(output)
    		if(output.success){
                var search_room_form_college = document.getElementById("search_room_form_college");
                deleteAllChildElement(search_room_form_college);
                //Add TODAS
                var option = document.createElement("option");
                option.value="TODAS";
                option.text = "TODAS";
                search_room_form_college.add(option);
                for (i = 0; i < output.data.length; i++) {
                    var option = document.createElement("option");
                    option.value=output.data[i];
                    option.text = output.data[i];
                    search_room_form_college.add(option);
                }
    		}else{
    			showErrorMessagesPage("Get Colleges",output.message,output.success);
    		}
    	}
    }
}


/**
* Display the range of price
*/
function display_range_price(){
    $( "#slider-range" ).slider({
        range: true,
        min: 0,
        max: 2000,
        values: [ 75, 1500 ],
        slide: function( event, ui ) {
            $( "#amount" ).val(  ui.values[ 0 ] + "€ -" + ui.values[ 1 ]+" €" );
        }
    });
    $( "#amount" ).val( get_min_range_prince() +" € - " + get_max_range_prince() +" € " );
}

/**
* @return min price
*/
function get_min_range_prince(){
    return $( "#slider-range" ).slider( "values", 0 );
}

/**
* @return max price
*/
function get_max_range_prince(){
    return $( "#slider-range" ).slider( "values", 1 );
}
/**
* @return college selected
*/
function get_college_selected(){
    var e = document.getElementById("search_room_form_college");
    return  e.options[e.selectedIndex].value;
}
/**
* Select and selected a icon or image of the list of equipment. It will be shadow
* @param:id_element
*/
function selected_icon_search(id_element){
    if  (document.getElementById(id_element).className.includes(" selected_icon_search")){
        document.getElementById(id_element).className.replace('selected_icon_search','');
    }else{
        document.getElementById(id_element).className+=' selected_icon_search';
    }
}


/**
* Search room by the parementer of the form
*/
function search_rooms() {
    display_specific_div("search_room_option","search_room_table");
    //get data form
    var equipment=get_equipment_selected('search_equipment');

    // get all residences availables whith the paramenter
    // create the row of the table
    var url=window.location.protocol+"//"+window.location.host+port+"/Room/getSearch/";
    url+="?college_company_name="+get_college_selected();
    url+="&price_min="+get_min_range_prince();
    url+="&price_max="+get_max_range_prince();
    url+="&study_room="+equipment.search_icon_school;
    url+="&gym="+equipment.search_icon_gym;
    url+="&canteen="+equipment.search_icon_restaurant;
    url+="&wifi="+equipment.search_icon_wifi;
    url+="&laundry="+ equipment.search_icon_laundry;
    url+="&heating="+ equipment.search_icon_heating;
    url+="&elevator="+ equipment.search_icon_elevator;
    url+="&hours24="+ equipment.search_icon_24h;
    url+="&tv="+ equipment.search_icon_tv;
    url+="&bath="+ equipment.search_icon_bath;
    url+="&desk="+ equipment.search_icon_desk;
    url+="&wardrove="+ equipment.search_icon_wardrove;

    var xmlHttp =new XMLHttpRequest();
    xmlHttp.withCredentials = true;
    xmlHttp.open("GET", url, true );
	xmlHttp.send();
	xmlHttp.onreadystatechange = function() {
    	if ( xmlHttp.readyState == 4 && xmlHttp.status == 200 ){
    		var output= JSON.parse(xmlHttp.responseText);
            console.log(output)
    		if(output.success){
                display_table_list_rooms(output.data)
    		}else{
    			showErrorMessagesPage("showrooms",output.message,output.success);
    		}
    	}
    }
}


/**
* Get every room and display as a row in the table:
* nombre,inicio academico,fin academico,inicio puja,fin puja,tamaño,planta,tv, bath, desk, wardrove
* @return tr element (row)
*/
function create_row_room(data_college,data_room){
    var tr = document.createElement('tr');
    tr.id="student_list_room_id"+data_room.id.toString();
    //nombre
        var td = document.createElement('td');
        td.appendChild(document.createTextNode(data_room.name))
        tr.appendChild(td)
    //company
        var td = document.createElement('td');
        td.appendChild(document.createTextNode(data_college.companyName))
        tr.appendChild(td)
    //price
        var td = document.createElement('td');
        td.appendChild(document.createTextNode(data_room.price+"€"))
        tr.appendChild(td)
    //fin school
        var td = document.createElement('td');
        td.appendChild(document.createTextNode(data_room.date_start_school.date.replace(" 00:00:00", "")));
        tr.appendChild(td)
    tr.onmouseover = function() {
        selected_out_selected_row_table(tr.id,data_college.latitude,data_college.longitude,"search_room_table_map");
    };
    tr.onmouseout = function() {
        selected_out_selected_row_table(tr.id);
    };
    tr.onclick = function() {
        display_search_room_specific(data_college,data_room);
    };
    return tr;
}

/**
* Display all the OFFERED room in the student_element_table_list_rooms
*/
function display_table_list_rooms(data){
    var father = document.getElementById("student_element_table_list_rooms");
    deleteAllChildElement(father)
    for (i = 0; i < data.length; i++) {
        for (j=0;j< data[i].rooms.length; j++){
            father.appendChild( create_row_room(data[i],data[i].rooms[j]));
        }
    }
}

/**
* Get all the OFFERED Rooms and display table
*/
function GetOFFEREDRooms(){
    var xmlHttp =new XMLHttpRequest();
	var url=window.location.protocol+"//"+window.location.host+port+"/Room/getSearchAll/";
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
    			showErrorMessagesPage("showrooms",output.message,output.success);
    		}
    	}
    }
}


/**
* Dispaly search room table (table/ form / map)
*/
 function display_search_room_table() {
     display_specific_div("search_room_option","search_room_table");
     display_range_price();
     display_list_colleges();
     init_map("search_room_table_map",37.176487,-3.597929);//By default GRANADA in the maps
     // display all the availables room in the table
     GetOFFEREDRooms();
 }


/**
* Dispaly the features of a specific room
* @param: data_college
* @param: data_room
*/
function display_search_room_specific(data_college,data_room){
    display_specific_div("search_room_option","student_search_room_specific");

    display_specific_room("student_search_room_specific",data_room,true);
    display_specific_college("student_search_",data_college);

    //button of bid and remove bid
    document.getElementById("search_room_specific_button_bid_new").onclick = function(){
        create_bid(data_room.id)
    };
    document.getElementById("search_room_specific_button_bid_remove").onclick = function(){
        remove_bid(data_room.id)
    };
    //get data of bids and display
    get_display_bids(data_room.id,"search_room_specific_ul_bid");
}


/**
* Create a bid about the room with the user who call
* @param: room id
*/
function create_bid(room_id){
    var url=window.location.protocol+"//"+window.location.host+port+"/Bid/create/";
    var xmlHttp =new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if ( xmlHttp.readyState == 4 && xmlHttp.status == 200 ){
            var output= JSON.parse(xmlHttp.responseText);
            console.log(output);
            showErrorMessagesPage("createBid",output.message,output.success);
        }
    }
    xmlHttp.open("POST", url, true );
    xmlHttp.withCredentials = true;
    var data = new FormData();
    data.append("room", room_id);
    xmlHttp.send(data);
    get_display_bids(room_id,"search_room_specific_ul_bid")
}


/**
* Remove the bid about the room with the user who call
* @param: room id
*/
function remove_bid(room_id){
    var url=window.location.protocol+"//"+window.location.host+port+"/Bid/removeBidRoomStudent/";
    var xmlHttp =new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if ( xmlHttp.readyState == 4 && xmlHttp.status == 200 ){
            var output= JSON.parse(xmlHttp.responseText);
            console.log(output);
            showErrorMessagesPage("createBid",output.message,output.success);
        }
    }
    xmlHttp.open("POST", url, true );
    xmlHttp.withCredentials = true;
    var data = new FormData();
    data.append("room", room_id);
    xmlHttp.send(data);
    get_display_bids(room_id,"search_room_specific_ul_bid")
}
//////////////////////////////////////////////////////////////////////////////
/*
*Routing student
*/
//////////////////////////////////////////////////////////////////////////////
/**
* When only the address of the server is enter, redirection to the connection page (logout)
*/
page('/', function(){
	page('/connection');
});

/**
* This page disconnect the user when he is connected
*/
page('/connection', function(){
	logout();
});


/**
* Display the profile page
*/
page('/profile', function(){
    if("studentview"===globa_view){
        console.log("displayProfile");
        display_specific_div("student_view_list_elements","profile");
        countUnreadMessages("student_");
        dataProfile("profile");
        display_specific_div('profile_student_list_form',undefined);
    }
});


/**
* Display the room page
*/
page('/Room', function(){
    if("studentview"===globa_view){
        console.log("displayRoom");
        display_specific_div("student_view_list_elements","Room");
        get_room_data();
        countUnreadMessages("student_");
    }
});


/**
* Display the search_room page
*/
page('/search_room', function(){
    if("studentview"===globa_view){
        console.log("displaysearch_room");
        display_specific_div("student_view_list_elements","search_room");
        countUnreadMessages("student_");
        display_search_room_table();
    }
});


/**
* Display the inicidence page
*/
page('/inicidence', function(){
    if("studentview"===globa_view){
        console.log("displayIncidence");
        display_specific_div("student_view_list_elements","incidence");
        countUnreadMessages("student_");
        getIncidences("student_");
    }
});


/**
* Display the message page
*/
page('/message', function(){
    if("studentview"===globa_view){
        console.log("displayMessage");
        display_specific_div("student_view_list_elements","message");
        countUnreadMessages("student_");
        getMessages();
        OpenAllMessages();
    }
});


/**
* Display the message page
*/
page('/rent', function(){
    if("studentview"===globa_view){
        console.log("displayRent");
        display_specific_div("student_view_list_elements","rent");
        countUnreadMessages("student_");
        getRents();
        show_form_payment();
    }
});
