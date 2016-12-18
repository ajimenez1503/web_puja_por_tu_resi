/**
* @author antonio Jimenez (antji996)
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
* signout the user
*/
function signout(){
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


    return div;
}


/**
* show the list of incidences
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




/**
* create message from the Student to the college.
*The input is validate and show the error in case of problem
* the
*/
function sendMessage(){
	var message=document.getElementById("formMessageText").value;
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


/**
* show the list of incidences
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
                    var div = document.createElement('div');
                    div.className += " div_message";

                    var p_text = document.createElement('p');
                    p_text.appendChild(document.createTextNode(output.data[i].message));
                    div.appendChild(p_text);

                    var p_time = document.createElement('div');
                    p_time.appendChild(document.createTextNode(output.data[i].date.date));
                    p_time.className += " div_message_time";
                    div.appendChild(p_time);

                    if(output.data[i].open){
                        div.style.color = "#c04021";
                    }
                    else{
                        div.style.color = "#3c763d";
                    }
                    father.appendChild(div);
                }
    		}else{
    			showErrorMessagesPage("Student","showdata",output.message,output.success);
    		}
    	}
    }
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
        document.getElementById("incidence").style.display="none";
        document.getElementById("message").style.display="none";

    	dataProfile("home");
    }
}


/**
* Dispaly the perfil view
*/
function displayperfil(){
    if("studentview"===globa_view){
        console.log("displayperfil");
    	document.getElementById("home").style.display="none";
    	document.getElementById("perfil").style.display="block";
        document.getElementById("incidence").style.display="none";
        document.getElementById("message").style.display="none";
        dataProfile("profile");
    }
}



/**
* Dispaly the perfil view
*/
function displayIncidence(){
    if("studentview"===globa_view){
        console.log("displayIncidence");
    	document.getElementById("home").style.display="none";
    	document.getElementById("perfil").style.display="none";
        document.getElementById("incidence").style.display="block";
        document.getElementById("message").style.display="none";
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
        document.getElementById("incidence").style.display="none";
        document.getElementById("message").style.display="block";
        getMessages();
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
		signout();
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
 	displayperfil();
});


/**
* Display the perfil page
*/
page('/inicidence', function(){
 	displayIncidence();
});


/**
* Display the perfil page
*/
page('/message', function(){
 	displayMessage();
});

/**
* If the URL enter is wrong we redirect the user to the home page, and if the user is not connected to the connection page
*/
page('*', function(){
 	page('/home');
});

page({hashbang: true});
