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
*@param {view} the tab, it can be profile or home
*/
function dataProfile(view){
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
    			document.getElementById(view+"StudentName").innerHTML="   "+output.data.name;
    			document.getElementById(view+"StudentUSername").innerHTML="   "+output.data.username;
    			document.getElementById(view+"StudentEmail").innerHTML="   "+output.data.email;
                if (view=="profile"){
                    document.getElementById(view+"StudentPoint").innerHTML="   "+output.data.point;
                }
    		}else{
    			showErrorMessagesPage("Student","showdata",output.message,output.success);
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
					showErrorMessagesPage("Student","updatePassword",output.message,output.success);
				}
			}
			xmlHttp.open("POST", url, true );
            xmlHttp.withCredentials = true;
            var data = new FormData();
            data.append("old_password", passwordOld);
            data.append("new_password", passwordNew);
			xmlHttp.send(data);
		}else{
		    showErrorMessagesPage("Student","updatePassword","error input",false);
		}
	}else{
		showErrorMessagesPage("Student","updatePassword","passwords not identical ",false);
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
				showErrorMessagesPage("Student","updateEmail",output.message,output.success);
			}
		}
		xmlHttp.open("POST", url, true );
        xmlHttp.withCredentials = true;
        var data = new FormData();
        data.append("email", email);
		xmlHttp.send(data);
	}else{
		showErrorMessagesPage("Student","updateEmail","Email no es valido.",false);
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
                showErrorMessagesPage("Student","Upload file","error validation file image format.",false);
            }else{
                xmlHttp.onreadystatechange = function() {
            		if ( xmlHttp.readyState == 4 && xmlHttp.status == 200 ){
            			var output= JSON.parse(xmlHttp.responseText);
                        console.log(output);
            			showErrorMessagesPage("Student","createIncidence",output.message,output.success);
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
            showErrorMessagesPage("Student","Upload file","error file image.",false);
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
    			showErrorMessagesPage("Student","showdata",output.message,output.success);
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
        showErrorMessagesPage("Student","message","ERROR: necesita un mensaje texto.",false);
        return;
    }
    if ('files' in file && file.files.length>=1){
        file=file.files[0];
        if ('name' in file && 'size' in file) {
            if (!validate_file(file.name,file.size)){
                showErrorMessagesPage("Student","Upload file","error validation file image format.",false);
                return;
            }
        }else{
            showErrorMessagesPage("Student","Upload file","error file image.",false);
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
			showErrorMessagesPage("Student","createMessage",output.message,output.success);
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
    			showErrorMessagesPage("Student","showdata",output.message,output.success);
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
    			showErrorMessagesPage("Student","Open_message",output.message,output.success);
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
 *Dispaly data of a specific agreement
 *@param: tab
 *@param: data_agreement
 */
function display_specific_agreement(tab,data_agreement){
    //panel room atributes:
    document.getElementById(tab+"_room_specific_agreement_file").setAttribute('href', window.location.protocol+"//"+window.location.host+port+"/Incidence/download/"+data_agreement.file_agreement_signed);
    document.getElementById(tab+"_room_specific_agreement_file").download="file"
    document.getElementById(tab+"_room_specific_agreement_dateStart").innerHTML="   "+data_agreement.date_start_school.date.replace(" 00:00:00", "");
    document.getElementById(tab+"_room_specific_agreement_dateEnd").innerHTML="   "+data_agreement.date_end_school.date.replace(" 00:00:00", "");
    document.getElementById(tab+"_room_specific_agreement_price").innerHTML="   "+data_agreement.price+"€";
    document.getElementById(tab+"_room_specific_size").innerHTML="   "+data_agreement.size;
}

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
                document.getElementById("Room_room_specific").style.display="block";
                //display data agreement
                 display_specific_agreement("Room",output.data.agreement);
                //display data room
                display_specific_room("Room",output.data.room);
                //displat data college
                display_specific_college("Room",output.data.college);
                display_button_accept_refuse(output.data.agreement_signed,output.data.agreement);


            }else{
                showErrorMessagesPage("Student","showdata",output.message,output.success);
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
            showErrorMessagesPage("Student","refuse room",output.message,output.success);
        }
    }
    xmlHttp.open("POST", url, false );
    xmlHttp.withCredentials = true;
    var data = new FormData();
    data.append("room_id", room_id);
    xmlHttp.send(data);
    document.getElementById("Room_room_specific").style.display="none";
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
                showErrorMessagesPage("Student","Upload file","error validation file pdf format.",false);
            }else{
                xmlHttp.onreadystatechange = function() {
            		if ( xmlHttp.readyState == 4 && xmlHttp.status == 200 ){
            			var output= JSON.parse(xmlHttp.responseText);
                        console.log(output);
            			showErrorMessagesPage("Student","accept Agreement",output.message,output.success);
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
            showErrorMessagesPage("Student","Upload file","error file pdf.",false);
        }
    }else{
        console.log("Enter a correct file.")
    }
    document.getElementById("Room_form_id_upload_file_agreement").reset();//clean input
    document.getElementById("Room_accept_refuse").style.display="none";//display button
    get_room_data();
}



/**
*Rotate the images of the room
* The number of images should be 3, otherwise need a paramenter //TODO add parameter with 3 by default
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
                //console.log("stop");
            }
        }

    }
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
    			showErrorMessagesPage("Student","showdata",output.message,output.success);
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
    			showErrorMessagesPage("Student","showdata",output.message,output.success);
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
        showErrorMessagesPage("Student","pay","Invalid credit card",false);
        return;
    }
    if(card_holder_name.length==0){
        showErrorMessagesPage("Student","pay","Invalid card Holder name",false);
        return;
    }if(!validateCVV(card_number,cvv)){
        showErrorMessagesPage("Student","pay","Invalid CCV",false);
        return;
    }
    if(!validateExpiryDate(expiry_month,expiry_year)){
        showErrorMessagesPage("Student","pay","Invalid fecha expiracion",false);
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
			showErrorMessagesPage("Student","pay rent",output.message,output.success);
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
    			showErrorMessagesPage("Student","Get Colleges",output.message,output.success);
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
    			showErrorMessagesPage("Student","showrooms",output.message,output.success);
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
        selected_row_table(tr.id,data_college.latitude,data_college.longitude);
    };
    tr.onmouseout = function() {
        out_selected_row_table(tr.id);
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
    			showErrorMessagesPage("Student","showrooms",output.message,output.success);
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
 *Dispaly data of a specific room
 *@param: tab
 *@param: data_room
 */
function display_specific_room(tab,data_room){
    //panel room atributes:
    document.getElementById(tab+"_room_specific_name").innerHTML="   "+data_room.name;
    document.getElementById(tab+"_room_specific_floor").innerHTML="   "+data_room.floor;
    document.getElementById(tab+"_room_specific_size").innerHTML="   "+data_room.size;

    //panel room equipment
    room_equipment_father=document.getElementById(tab+"_room_specific_equipment_room");
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
    document.getElementById(tab+"_room_specific_picture1").src=window.location.protocol+"//"+window.location.host+port+"/Room/download/"+data_room.picture1;
    document.getElementById(tab+"_room_specific_picture2").src=window.location.protocol+"//"+window.location.host+port+"/Room/download/"+data_room.picture2;
    document.getElementById(tab+"_room_specific_picture3").src=window.location.protocol+"//"+window.location.host+port+"/Room/download/"+data_room.picture3;
    rotate(tab+"_room_specific");
}


/**
*Dispaly data of a specific college
*@param: tab
*@param: data_college
*/
function display_specific_college(tab,data_college){
    //panel college  atributes:
    init_map(tab+"_room_specific_college_map",data_college.latitude,data_college.longitude);
    document.getElementById(tab+"_room_specific_college_company_name").innerHTML="   "+data_college.companyName;
    document.getElementById(tab+"_room_specific_college_telephone").innerHTML="   "+data_college.telephone;
    document.getElementById(tab+"_room_specific_college_url").setAttribute('href', data_college.url);
    document.getElementById(tab+"_room_specific_college_url").innerHTML="   "+data_college.url;
    document.getElementById(tab+"_room_specific_college_email").innerHTML="   "+data_college.email;

    //panel college equipment
    college_equipment_father=document.getElementById(tab+"_room_specific_equipment_college");
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
*Dispaly the features of a specific room
*@param: data_college
*@param: data_room
*/
function display_search_room_specific(data_college,data_room){
    document.getElementById("search_room_table").style.display="none";
    document.getElementById("student_search_room_specific").style.display="block";

    display_specific_room("student_search",data_room);
    display_specific_college("student_search",data_college);

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
            showErrorMessagesPage("Student","createBid",output.message,output.success);
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
            showErrorMessagesPage("Student","createBid",output.message,output.success);
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
    			showErrorMessagesPage("Student","Get bids",output.message,output.success);
    		}
    	}
    }
}

/**
* Select a row in a table of the search room (red background-color) and display its map
*/
function selected_row_table(id, latitude, longitude){
    document.getElementById(id).className = " selected_row_table";
    // display maps latitude, longitude
    init_map("search_room_table_map",latitude,longitude);
}

/**
* out select a row in a table of the search
*/
function out_selected_row_table(id){
    document.getElementById(id).className = "";//any class
}

//////////////////////////////////////////////////////////////////////////////
/*
*Routing student
*/
//////////////////////////////////////////////////////////////////////////////
/**
* Dispaly the Home view
*/
function displayHome(){
    if("studentview"===globa_view){
        console.log("displayhome");
    	document.getElementById("home").style.display="block";
    	document.getElementById("perfil").style.display="none";
        document.getElementById("Room").style.display="none";
        document.getElementById("incidence").style.display="none";
        document.getElementById("message").style.display="none";
        document.getElementById("rent").style.display="none";
        document.getElementById("search_room").style.display="none";
        countUnreadMessages();
    	dataProfile("home");
    }
}

/**
* Dispaly the perfil view
*/
function displayPerfil(){
    if("studentview"===globa_view){
        console.log("displayPerfil");
    	document.getElementById("home").style.display="none";
    	document.getElementById("perfil").style.display="block";
        document.getElementById("incidence").style.display="none";
        document.getElementById("Room").style.display="none";
        document.getElementById("message").style.display="none";
        document.getElementById("rent").style.display="none";
        document.getElementById("search_room").style.display="none";
        countUnreadMessages();
        dataProfile("profile");
    }
}

/**
* Dispaly the Room view
*/
function displayRoom(){
    if("studentview"===globa_view){
        console.log("displayRoom");
    	document.getElementById("home").style.display="none";
    	document.getElementById("perfil").style.display="none";
        document.getElementById("Room").style.display="block";
        document.getElementById("incidence").style.display="none";
        document.getElementById("message").style.display="none";
        document.getElementById("rent").style.display="none";
        document.getElementById("search_room").style.display="none";
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
    	document.getElementById("home").style.display="none";
    	document.getElementById("perfil").style.display="none";
        document.getElementById("Room").style.display="none";
        document.getElementById("search_room").style.display="block";
        document.getElementById("incidence").style.display="none";
        document.getElementById("message").style.display="none";
        document.getElementById("rent").style.display="none";
        //TODO get list of colleges for the search_room_form
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
    	document.getElementById("home").style.display="none";
    	document.getElementById("perfil").style.display="none";
        document.getElementById("Room").style.display="none";
        document.getElementById("incidence").style.display="block";
        document.getElementById("message").style.display="none";
        document.getElementById("rent").style.display="none";
        document.getElementById("search_room").style.display="none";
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
    	document.getElementById("home").style.display="none";
    	document.getElementById("perfil").style.display="none";
        document.getElementById("Room").style.display="none";
        document.getElementById("incidence").style.display="none";
        document.getElementById("message").style.display="block";
        document.getElementById("rent").style.display="none";
        document.getElementById("search_room").style.display="none";
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
    	document.getElementById("home").style.display="none";
    	document.getElementById("perfil").style.display="none";
        document.getElementById("Room").style.display="none";
        document.getElementById("incidence").style.display="none";
        document.getElementById("rent").style.display="block";
        document.getElementById("message").style.display="none";
        document.getElementById("search_room").style.display="none";
        document.getElementById("payment_rent").style.display="none";
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
* Display the Home page
*/
page('/home', function(){
 	displayHome();
});

/**
* Display the perfil page
*/
page('/perfil', function(){
 	displayPerfil();
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
