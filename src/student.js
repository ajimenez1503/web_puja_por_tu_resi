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
* Display form to updload password and the email student
*@param {id} id of the div
*/
function show_from_update(id) {
    if (id=="password"){
        document.getElementById("from_update_password").style.display="block";
        document.getElementById("from_update_email").style.display="none";
    }else if (id=="email"){
        document.getElementById("from_update_email").style.display="block";
        document.getElementById("from_update_password").style.display="none";
    }
}
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
*The input is validate and show the error in case of problem
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
*The input is validate and show the error in case of problem
*/
function updateEmail(){
	var email=document.getElementById("formUpdateEmail").value;
	if(validateEmail(email)){
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
*Create Incidence from the Student to the college.
*The input is validate and show the error in case of problem
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
            }
        }else{
            showErrorMessagesPage("Upload file","error file image.",false);
        }
    }else{
        console.log("Enter a correct file.")
    }
    document.getElementById("id_form_createIncidence").reset();//clean input
}

/**
* create the strucutre to show the incidences in the html structure
*/
function create_div_incidence(data){
    var div = document.createElement('div');
    div.className += " localIncidence";

    var label_id= document.createElement('label');
    label_id.appendChild(document.createTextNode("id: "+data.id));
    div.appendChild(label_id);
    div.appendChild(document.createElement('br'));

    var label_description= document.createElement('label');
    label_description.appendChild(document.createTextNode("description: "+data.description));
    div.appendChild(label_description);
    div.appendChild(document.createElement('br'));

    var label_date= document.createElement('label');
    label_date.appendChild(document.createTextNode("Fecha: "+data.date.date));
    div.appendChild(label_date);
    div.appendChild(document.createElement('br'));

    if (data.file_name){
        var file_download = document.createElement('a');
        file_download.setAttribute('href', window.location.protocol+"//"+window.location.host+port+"/Incidence/download/"+data.file_name);
        file_download.download="file"
        file_download.appendChild(document.createTextNode("file_download"));
        div.appendChild(file_download);
        //downloadFile(message.file_attached,file_download);//TODO cannot read the image :Error al interpretar el archivo gráfico JPEG (Not a JPEG file: starts with 0xef 0xbf)
    }
    return div;
}


/**
* Display the list of incidences of the user
*/
function getIncidences(){
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
                var father_open = document.getElementById("incidence_OPEN");
                deleteAllChildElement(father_open)
                var father_in_progress = document.getElementById("incidence_IN_PROGRESS");
                deleteAllChildElement(father_in_progress)
                var father_done = document.getElementById("incidence_DONE");
                deleteAllChildElement(father_done)
                for (i = 0; i < output.data.length; i++) {
                    if("OPEN"==output.data[i].status){
                        father_open.appendChild(create_div_incidence(output.data[i]));
                    }else if ("IN PROGRESS"==output.data[i].status){
                        father_in_progress.appendChild(create_div_incidence(output.data[i]));
                    }else if ("DONE"==output.data[i].status){
                        father_done.appendChild(create_div_incidence(output.data[i]));
                    }
                }

    		}else{
    			showErrorMessagesPage("showdata",output.message,output.success);
    		}
    	}
    }
}

//////////////////////////////////////////////////////////////////////////////
/*
*MESSAGE CREATE SHOW OPEN
*/
//////////////////////////////////////////////////////////////////////////////
/**
* Create message from the Student to the college.
*The input is validate and show the error in case of problem
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


/**
* Get number message wihout open, and write in menu whith the message.
*/
function countUnreadMessages(){
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
    			document.getElementById("numberMessage").textContent=output.data;
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
    -displat data of the college
    -display data of the room
    -display data of the agreement
    -If the AGREEMENT is not signed yet display the button (accept, refuse, download)
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
                display_specific_room("Room_specific",output.data.room);
                //displat data college
                display_specific_college("Room_specific_",output.data.college);
                display_button_accept_refuse(output.data.agreement_signed,output.data.agreement);


            }else{
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
* Display form to updload the agreement (signed)
*/
function show_upload_file_agreement() {
    document.getElementById("Room_upload_file_agreement").style.display="block";
}


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
    document.getElementById("Room_accept_refuse").style.display="none";//display button
    get_room_data();
}

//////////////////////////////////////////////////////////////////////////////
/*
*RENT, SHOW DATA, DOWNLOAD FILE, PAY
*/
//////////////////////////////////////////////////////////////////////////////
/**
*Display the form to pay
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
    		if(output.success){//in the case that there are month available, show it
                if (output.data.length>=1){
                    document.getElementById("payment_rent_month").innerHTML="   "+output.data[0].month;
                    document.getElementById("payment_rent_price").innerHTML="   "+output.data[0].price.toString()+"€";
                    document.getElementById("payment_rent_submit").onclick = function(){
                        pay_month(output.data[0].id);
                    };
                    console.log(output.data[0].id);
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
*Get every rent and display as a row in the table. Month/ price/ date_paid/ receipt_file
*/
function create_row_rent(data){
    var tr = document.createElement('tr');
    //month
        var td = document.createElement('td');
        td.appendChild(document.createTextNode(data.month))
        tr.appendChild(td)
    //price
        var td = document.createElement('td');
        td.appendChild(document.createTextNode(data.price.toString()+"€"));
        tr.appendChild(td)
    //date paid
        var td = document.createElement('td');
        if (data.date_paid == null){
            td.appendChild(document.createTextNode(""))
        }else{
            td.appendChild(document.createTextNode(data.date_paid.date))
        }
        tr.appendChild(td)
    //file_paid
        var td = document.createElement('td');
        if (data.file_receipt == null){
            td.appendChild(document.createTextNode(""))
        }else{
            var file_download = document.createElement('a');
            file_download.setAttribute('href',window.location.protocol+"//"+window.location.host+port+"/Rent/download/"+data.file_receipt);
            file_download.download="file"
            file_download.appendChild(document.createTextNode("file_download"));
            td.appendChild(file_download);
        }
        tr.appendChild(td)

    return tr;
}

/**
*Display all the rents in the table_rent
*/
function createTableRent(data) {
    var father = document.getElementById("element_table_rent");
    deleteAllChildElement(father)
    for (i = 0; i < data.length; i++) {
        father.appendChild( create_row_rent(data[i]));
    }
}

/**
*Get all the rents and display in the table
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
                createTableRent(output.data)
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
    if (!validateCreditCard(card_number)){
        showErrorMessagesPage("pay","Invalid credit card",false);
        return;
    }
    if(card_holder_name.length==0){
        showErrorMessagesPage("pay","Invalid card Holder name",false);
        return;
    }if(!validateCVV(card_number,cvv)){
        showErrorMessagesPage("pay","Invalid CCV",false);
        return;
    }
    if(!validateExpiryDate(expiry_month,expiry_year)){
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
*Get all colleges name and display the list in the form of search room
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
*Display the range of price
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
*@return min price
*/
function get_min_range_prince(){
    return $( "#slider-range" ).slider( "values", 0 );
}

/**
*@return max price
*/
function get_max_range_prince(){
    return $( "#slider-range" ).slider( "values", 1 );
}
/**
*@return college selected
*/
function get_college_selected(){
    var e = document.getElementById("search_room_form_college");
    return  e.options[e.selectedIndex].value;
}
/**
*Select and selected a icon or image of the list of equipment. It will be shadow
*/
function selected_icon_search(id){
    if  (document.getElementById(id).className.includes(" selected_icon_search")){
        document.getElementById(id).className.replace('selected_icon_search','');
    }else{
        document.getElementById(id).className+=' selected_icon_search';
    }

}

/**
*Search room by the parementer of the form
*/
function search_rooms() {
    document.getElementById("search_room_table").style.display="block";
    document.getElementById("student_search_room_specific").style.display="none";

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

    init_map("search_room_table_map",37.176487,-3.597929);//By default GRANADA in the maps
}


/**
*Get every room and display as a row in the table. nombre,inicio academico,fin academico,inicio puja,fin puja,tamaño,planta,tv, bath, desk, wardrove
*@return tr element (row)
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
    //fin puja
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
*Display all the OFFERED room in the student_element_table_list_rooms
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
*Get all the OFFERED Rooms and display table
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
     document.getElementById("search_room_table").style.display="block";
     document.getElementById("student_search_room_specific").style.display="none";
     display_range_price();
     display_list_colleges();
     init_map("search_room_table_map",37.176487,-3.597929);//By default GRANADA in the maps
     // display all the availables room in the table
     GetOFFEREDRooms();
 }


/**
*Dispaly the features of a specific room
*@param: data_college
*@param: data_room
*/
function display_search_room_specific(data_college,data_room){
    document.getElementById("search_room_table").style.display="none";
    document.getElementById("student_search_room_specific").style.display="block";

    display_specific_room("student_search_room_specific",data_room);
    display_specific_college("student_search_",data_college);

    //button of bid and remove bid
    document.getElementById("search_room_specific_button_bid_new").onclick = function(){ create_bid(data_room.id)};
    document.getElementById("search_room_specific_button_bid_remove").onclick = function(){ remove_bid(data_room.id)};
    //get data of bids and display
    get_display_bids(data_room.id,"search_room_specific_ul_bid");
}
/**
*Create the a bid about the room with the user who call
*@param: room id
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
*Create the a bid about the room with the user who call
*@param: room id
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

/**
*Get the bid of a room (room_id) and display in a tab_id
*@param: room id
*@param: tab_id of the ul element
*/
function get_display_bids(room_id,tab_id){
    var xmlHttp =new XMLHttpRequest();
	var url=window.location.protocol+"//"+window.location.host+port+"/Bid/getBidsRoom/"+room_id.toString();
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

//////////////////////////////////////////////////////////////////////////////
/*
*Routing student
*/
//////////////////////////////////////////////////////////////////////////////

/**
* Dispaly the profile view
*/
function displayProfile(){
    if("studentview"===globa_view){
        console.log("displayProfile");
        display_specific_div("student_view_list_elements","profile");
        countUnreadMessages();
        dataProfile("profile");
        display_specific_div('profile_student_list_form',undefined);
    }
}

/**
* Dispaly the Room view
*/
function displayRoom(){
    if("studentview"===globa_view){
        console.log("displayRoom");
        display_specific_div("student_view_list_elements","Room");
        get_room_data();
        countUnreadMessages();
    }
}


/**
* Dispaly the search_room view
*/
function displaySearch_room(){
    if("studentview"===globa_view){
        console.log("displaysearch_room");
        display_specific_div("student_view_list_elements","search_room");
        countUnreadMessages();
        display_search_room_table();
    }
}

/**
* Dispaly the inicidence view
*/
function displayIncidence(){
    if("studentview"===globa_view){
        console.log("displayIncidence");
        display_specific_div("student_view_list_elements","incidence");
        countUnreadMessages();
        getIncidences();
    }
}

/**
* Dispaly the messsage view
*/
function displayMessage(){
    if("studentview"===globa_view){
        console.log("displayMessage");
        display_specific_div("student_view_list_elements","message");
        countUnreadMessages();
        getMessages();
        OpenAllMessages();
    }
}

/**
* Dispaly the rent view
*/
function displayRent(){
    if("studentview"===globa_view){
        console.log("displayRent");
        display_specific_div("student_view_list_elements","rent");
        countUnreadMessages();
        getRents();
        show_form_payment();
    }
}


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
 	displayProfile();
});

/**
* Display the room page
*/
page('/Room', function(){
 	displayRoom();
});

/**
* Display the search_room page
*/
page('/search_room', function(){
 	displaySearch_room();
});


/**
* Display the inicidence page
*/
page('/inicidence', function(){
 	displayIncidence();
});


/**
* Display the message page
*/
page('/message', function(){
 	displayMessage();
});

/**
* Display the message page
*/
page('/rent', function(){
 	displayRent();
});
