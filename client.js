/**
* @author antonio Jimenez (softwarejimenez)
* @version 0.1
*/

var globa_view="welcomeview";//"studentview";//"welcomeview";//global view
var sizePaswword=8; //global variable of size of password
var port=":8000";

////////////////////////////////////////////////////////////////
/*
*LOAD VIEWS
*/
////////////////////////////////////////////////////////////////
/**
* Display the specific view when the page is reload
*/
window.onload = function(){
    displayView();
	page({hashbang: true});
};


/**
* Display the specific view without reload the page
*/
reloadPage = function(){
    displayView();
};


/**
* Display a view according to the token of the user.
*/
displayView = function(){
   // the code required to display a view
   if("welcomeview" === globa_view){
       document.getElementById("viewBase").innerHTML = document.getElementById("welcomeview").innerHTML;
   }else if("studentview"===globa_view){
       document.getElementById("viewBase").innerHTML = document.getElementById("studentview").innerHTML;
   }
};

////////////////////////////////////////////////////////////////
/*
*SIGNIN SIGNUP LOGOUT
*/
////////////////////////////////////////////////////////////////

/**
* login the user by email and password.
*The input is validate and show the error in case of problem
*/
function login(){
	var username=document.getElementById("loginUsername").value;
	var password=document.getElementById("loginPassword").value;
    if(password.length>=sizePaswword && validateDNI(username)){
		//var params = "_password="+password+"&_username="+username;
        var data = new FormData();
        data.append("_username", username);
        data.append("_password", password);
		var url= window.location.protocol+"//"+window.location.host+port+"/login";
		var xmlHttp =new XMLHttpRequest();
        console.log(url);
		xmlHttp.onreadystatechange = function() {
			if ( xmlHttp.readyState == 4 && xmlHttp.status == 200 ){
				var output= JSON.parse(xmlHttp.responseText);
                console.log(output);
				if( output.success ){
                    if (output.data.ROLE[0]=="ROLE_STUDENT"){
                            globa_view="studentview";
                            reloadPage();
                            page("/home");
                    }else{
                            console.log(output.data.ROLE[0]);
                            showErrorMessagesPage("Welcome","login","View of COLLEGE.",output.success);
                    }
				}else{
					showErrorMessagesPage("Welcome","login",output.message,output.success);
				}
			}
		}
		xmlHttp.open("POST", url, true );
        xmlHttp.withCredentials = true;
        xmlHttp.send(data);
    }else{
       showErrorMessagesPage("Welcome","login","Invalid input.",false);
    }
}

/**
*signin a new  user by email, password firstname, familyname, gender, city, country
*The input is validate and show the error in case of problem
*/
function signup(){
        var user = {
          'email': document.getElementById("signupEmail").value,
          'password':document.getElementById("signupPassword").value,
		  'repeat_password':document.getElementById("signupRepeatPSW").value,
          'name': document.getElementById("signupName").value,
          'username': document.getElementById("signupusername").value,
        };
        if (!validateDNI(user.username)){
            showErrorMessagesPage("Welcome","signup","Invalid DNI",false);
            return;
        }
        if(!validateEmail(user.email)){
            showErrorMessagesPage("Welcome","signup","email invalid",false);
            return;
        }
        if(!user.password.length==sizePaswword){
            showErrorMessagesPage("Welcome","signup","password must be "+sizePaswword+" characters",false);
            return;
        }
		if(user.repeat_password != user.password){
            showErrorMessagesPage("Welcome","signup","passwords do not match",false);
            return;
        }
        if(user.name.length==0){
            showErrorMessagesPage("Welcome","signup","First name field empty",false);
            return;
        }
		var url=window.location.protocol+"//"+window.location.host+port+"/Signin/student/";
		var xmlHttp =new XMLHttpRequest();
		xmlHttp.onreadystatechange = function() {
			if ( xmlHttp.readyState == 4 && xmlHttp.status == 200 ){
				var output= JSON.parse(xmlHttp.responseText);
                console.log(output);
                showErrorMessagesPage("Welcome","signup",output.message,output.success);
			}
		}
		xmlHttp.open("POST", url, true );
        var data = new FormData();
        data.append("username", user.username);
        data.append("password", user.password);
        data.append("email",user.email);
        data.append("name", user.name);
		xmlHttp.send(data);
}

/**
* logout the user
*/
function logout(){
    var url=window.location.protocol+"//"+window.location.host+port+"/logout";
    var xmlHttp =new XMLHttpRequest();
	xmlHttp.onreadystatechange = function() {
		if ( xmlHttp.readyState == 4 && xmlHttp.status == 200 ){
            console.log(JSON.parse(xmlHttp.responseText));
			//TODO when success is true
			console.log("logout");
            globa_view="welcomeview";
            reloadPage();
		}
	}
	xmlHttp.open("GET", url, true );
    xmlHttp.withCredentials = true;
	xmlHttp.send();
}

////////////////////////////////////////////////////////////////
/*
*PROFILE USER. SHOW, UPDATE
*/
////////////////////////////////////////////////////////////////

/**
* Display form to updload the agreement (signed)
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
function dataProfile(view){
	var xmlHttp =new XMLHttpRequest();
	var url=window.location.protocol+"//"+window.location.host+port+"/ProfileStudent/profile/";
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
* Change the pasword.
*The input is validate and show the error in case of problem
*/
function changePassword(){
	var passwordOld=document.getElementById("formChangePasswordOld").value;
	var passwordNew=document.getElementById("formChangePasswordNew").value;
	var passwordNewRepeat=document.getElementById("formChangePasswordNewRepeat").value;
	if(passwordNew==passwordNewRepeat){
		if(passwordNew.length>=sizePaswword){
			var url=window.location.protocol+"//"+window.location.host+port+"/ProfileStudent/changePassword/";
			var xmlHttp =new XMLHttpRequest();
			xmlHttp.onreadystatechange = function() {
				if ( xmlHttp.readyState == 4 && xmlHttp.status == 200 ){
					var output= JSON.parse(xmlHttp.responseText);
                    console.log(output);
					showErrorMessagesPage("Student","changePassword",output.message,output.success);
				}
			}
			xmlHttp.open("POST", url, true );
            xmlHttp.withCredentials = true;
            var data = new FormData();
            data.append("old_password", passwordOld);
            data.append("new_password", passwordNew);
			xmlHttp.send(data);
		}else{
		    showErrorMessagesPage("Student","changePassword","error input",false);
		}
	}else{
		showErrorMessagesPage("Student","changePassword","passwords not identical ",false);
	}
}

/**
* Change the pasword.
*The input is validate and show the error in case of problem
*/
function changeEmail(){
	var email=document.getElementById("formChangeEmail").value;
	if(validateEmail(email)){
		var url=window.location.protocol+"//"+window.location.host+port+"/ProfileStudent/changeEmail/";
		var xmlHttp =new XMLHttpRequest();
		xmlHttp.onreadystatechange = function() {
			if ( xmlHttp.readyState == 4 && xmlHttp.status == 200 ){
				var output= JSON.parse(xmlHttp.responseText);
                console.log(output);
				showErrorMessagesPage("Student","changeEmail",output.message,output.success);
			}
		}
		xmlHttp.open("POST", url, true );
        xmlHttp.withCredentials = true;
        var data = new FormData();
        data.append("email", email);
		xmlHttp.send(data);
	}else{
		showErrorMessagesPage("Student","changeEmail","Email no es valido.",false);
	}
}


////////////////////////////////////////////////////////////////
/*
*INCIDENCE CREATE, SHOW
*/
////////////////////////////////////////////////////////////////

/**
* Validate size and name of file.
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
* create Incidence from the Student to the college.
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
}

/**
* create the strucutre to show the incidences in the web
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
* show the list of incidences of the user
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
                    }
                    else if ("IN PROGRESS"==output.data[i].status){
                        father_in_progress.appendChild(create_div_incidence(output.data[i]));
                    }
                    else if ("DONE"==output.data[i].status){
                        father_done.appendChild(create_div_incidence(output.data[i]));
                    }
                }

    		}else{
    			showErrorMessagesPage("Student","showdata",output.message,output.success);
    		}
    	}
    }
}

////////////////////////////////////////////////////////////////
/*
*MESSAGE CREATE SHOW OPEN
*/
////////////////////////////////////////////////////////////////


/**
* create message from the Student to the college.
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
}

/*
function downloadFile(file_attached,a_element){
    var xmlHttp =new XMLHttpRequest();
	var url=window.location.protocol+"//"+window.location.host+port+"/Message/download/"+file_attached;
	xmlHttp.open("GET", url, true );
    xmlHttp.withCredentials = true;
	xmlHttp.send();
	xmlHttp.onreadystatechange = function() {
    	if ( xmlHttp.readyState == 4 && xmlHttp.status == 200 ){
            if(xmlHttp.response.byteLength==0){
                showErrorMessagesPage("Student","download file","cannot download file",false);
            }
            else{

                var filename = "";
                var disposition = xmlHttp.getResponseHeader('Content-Disposition');
                if (disposition && disposition.indexOf('attachment') !== -1) {
                    var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
                    var matches = filenameRegex.exec(disposition);
                    if (matches != null && matches[1]){
                        filename = matches[1].replace(/['"]/g, '');
                        console.log(filename);
                        var type = xmlHttp.getResponseHeader('Content-Type');
                        var blob = new Blob([xmlHttp.response], { type: type });
                        var URL = window.URL || window.webkitURL;
                        var downloadUrl = URL.createObjectURL(blob);
                        console.log(downloadUrl);
                        a_element.href = downloadUrl;
                        a_element.download = filename;
                    }else{
                        console.log("There are no file in contect disposition")
                        showErrorMessagesPage("Student","download file","cannot download file",false);
                    }

                }else{
                    console.log("Cannot access to contect disposition")
                    showErrorMessagesPage("Student","download file","cannot download file",false);
                }


            }
    	}
    }
}*/

/**
* create  html message from the mesage (message / date / id / read )
*@return structure html
*/
function createHTMLMessage(message){
    var div = document.createElement('div');
    div.className += " div_message";

    var p_text = document.createElement('p');
    p_text.appendChild(document.createTextNode(message.message));
    if (message.senderType=="ROLE_STUDENT"){
        p_text.style.textAlign = "right";
    }
    else if (message.senderType=="ROLE_COLLEGE"){
        p_text.style.textAlign="left";
    }
    div.appendChild(p_text);


    var div_extra = document.createElement('div');
    div_extra.id="div_extra"+message.id;
    div_extra.style.display="none";
        var p_time = document.createElement('div');
        p_time.appendChild(document.createTextNode(message.date.date));
        p_time.className += " div_message_time";
        div_extra.appendChild(p_time);

        if (message.file_attached){
            var file_download = document.createElement('a');
            file_download.setAttribute('href',window.location.protocol+"//"+window.location.host+port+"/Message/download/"+message.file_attached);
            file_download.download="file"
            file_download.appendChild(document.createTextNode("file_download"));
            div_extra.appendChild(file_download);
            //downloadFile(message.file_attached,file_download);//TODO cannot read the image :Error al interpretar el archivo gráfico JPEG (Not a JPEG file: starts with 0xef 0xbf)
        }
    div.appendChild(div_extra);


    var img_plus = new Image(20,20); // width, height values are optional params
    img_plus.src = 'http://www.ieem.edu.uy/img/boton-mas.png';
    img_plus.onclick = function(){
        document.getElementById("div_extra"+message.id).style.display="block";
    };
    div.appendChild(img_plus);


    var img_less = new Image(20,20); // width, height values are optional params
    img_less.src = 'https://image.freepik.com/icones-gratuites/le-signe-moins-dans-un-cercle_318-67824.jpg';
    img_less.onclick = function(){
        document.getElementById("div_extra"+message.id).style.display="none";
    };
    div.appendChild(img_less);


    if(message.read_by_student){
        div.style.color = "#3c763d";
    }
    else{
        div.style.color = "#c04021";
    }
    return div

}
/**
* show the list of message of the user
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
                deleteAllChildElement(father)
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
    			showErrorMessagesPage("Student","Open message",output.message,output.success);
    		}
    	}
    }
}


/**
* get number message wihout open, and write in menu whith the message.
*/
function countNotReadMessages(){
	var xmlHttp =new XMLHttpRequest();
	var url=window.location.protocol+"//"+window.location.host+port+"/Message/countNotRead/";
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


////////////////////////////////////////////////////////////////
/*
*ROOM, SHOW DATA, DOWNLOAD FILE, ACEPT AGREEMENT, REJECT
*/
////////////////////////////////////////////////////////////////
/**
* Display form to updload the agreement (signed)
*/
function show_upload_file_agreement() {
    document.getElementById("upload_file_agreement").style.display="block";
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

/**
*Rotate the images of the room
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
////////////////////////////////////////////////////////////////
/*
*RENT, SHOW DATA, DOWNLOAD FILE, PAY
*/
////////////////////////////////////////////////////////////////

/**
*Display the form to pay
*/
function show_form_payment(){
    //check if there area month available to pay.
    var xmlHttp =new XMLHttpRequest();
	var url=window.location.protocol+"//"+window.location.host+port+"/Rent/getUnpaid/";
	xmlHttp.open("GET", url, true );
    xmlHttp.withCredentials = true;
	xmlHttp.send();
	xmlHttp.onreadystatechange = function() {
    	if ( xmlHttp.readyState == 4 && xmlHttp.status == 200 ){
    		var output= JSON.parse(xmlHttp.responseText);
            console.log(output)
    		if(output.success){
                if (output.data.length>=1){
                    document.getElementById("payment_rent_month").innerHTML="   "+output.data[0].month;
                    document.getElementById("payment_rent_price").innerHTML="   "+output.data[0].price.toString()+"€";
                    document.getElementById("payment_rent_submint").onclick = function(){
                        pay_month(output.data[0].id);
                    };
                    console.log(output.data[0].id);
                    document.getElementById("payment_rent").style.display="block";
                }else{
                    document.getElementById("payment_rent").style.display="none";
                }
    		}else{
    			showErrorMessagesPage("Student","showdata",output.message,output.success);
    		}
    	}
    }

}

/**
*Get every rent rents and display as a row in the table. Month/ price/date_paid/receipt
*/
function create_row(data){
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
*Get all the rents and display in the table
*/
function createTableRent(data) {
    var father = document.getElementById("table_rent");
    deleteAllChildElement(father)
    for (i = 0; i < data.length; i++) {
        father.appendChild( create_row(data[i]));
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
* pay the month of the last rent
*
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
    if(!validateDate(parseInt(expiry_month),parseInt(expiry_year))){
        showErrorMessagesPage("Student","pay","Invalid fecha expiracion",false);
        return;
    }

    console.log(card_holder_name);
    console.log(card_number);
    console.log(expiry_month);
    console.log(expiry_year);
    console.log(cvv);

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
}




////////////////////////////////////////////////////////////////
/*
*SEARCH_ROOM, SHOW DATA, DOWNLOAD FILE, PAY
*/
////////////////////////////////////////////////////////////////
/**
*Display the range of price
*/
function display_range_price(){
    $( "#slider-range" ).slider({
        range: true,
        min: 0,
        max: 1000,
        values: [ 75, 300 ],
        slide: function( event, ui ) {
            $( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
        }
    });
    $( "#amount" ).val(
     get_min_range_prince() +" € - " + get_max_range_prince() +" € " );
}

/**
*Get min price
*/
function get_min_range_prince(){
    return $( "#slider-range" ).slider( "values", 0 );
}

/**
*GEt max price
*/
function get_max_range_prince(){
    return $( "#slider-range" ).slider( "values", 1 );
}
/**
*select a icon or image of the list of equipment
*/
function selected_icon_search(id){
    document.getElementById(id).className += " selected_icon_search";
}
/**
*get element selected of the equpment in a json structure
*/
function get_equipment_selected(tab){
    var result={};
    child=document.getElementById(tab).children;;
    var i;
    for (i = 0; i < child.length; i++) {
        result[child[i].id] = child[i].className.includes("selected");
    }
    console.log(result);
    return result;
}

/**
*Search room
*/
function search_rooms() {
    var min_price=get_min_range_prince();
    var max_price=get_max_range_prince();
    //TODO get residence
    get_equipment_selected('search_equipment');
    document.getElementById("search_room_table").style.display="block";
    document.getElementById("search_room_specific").style.display="none";
    //TODO get all residences availables whith the paramenter
    //display the table

}

/**
* Dispaly search room table
*/
 function display_search_room_table() {
     display_range_price();
     init_map("search_room_table_map",39.88605099999999,-3.9192423);
 }
/**
*Dispaly the features of a room
*/
function display_search_room_specific(room_name,username_college){
    //TODO collect data of room and college
    //TODO get the 5 best bets //display the best in search_room_specific_ul
    document.getElementById("search_room_table").style.display="none";
    document.getElementById("search_room_specific").style.display="block";
    init_map("search_room_specific_map",39.88605099999999,-3.9192423);
    rotate("search_room_specific");


}
/**
*select a row in a table of the search
* Display the maps
*/
function selected_row_table(id, latitude, longitued){
    document.getElementById(id).className = " selected_row_table";
    // display maps latitude, longitued
    init_map("map_search_room_table",39.88605099999999,-3.9192423);
}

/**
* out select a row in a table of the search
*/
function out_selected_row_table(id){
    document.getElementById(id).className = "";//any class
}

////////////////////////////////////////////////////////////////
/*
*Routing
*/
////////////////////////////////////////////////////////////////
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
        countNotReadMessages();
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
        countNotReadMessages();
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
        rotate("Room");
        countNotReadMessages();
        init_map("map_room",39.88605099999999,-3.9192423);
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
        countNotReadMessages();
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
        countNotReadMessages();
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
        countNotReadMessages();
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
        countNotReadMessages();
        getRents();
        show_form_payment();
    }
}


/**
* When only the adress of the server is enter, redirection to the connection page
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

/**
* If the URL enter is wrong we redirect the user to the home page, and if the user is not connected to the connection page
*/
page('*', function(){
 	page('/home');
});

page({hashbang: true});
