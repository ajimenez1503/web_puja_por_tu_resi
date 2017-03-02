/**
* @author antonio Jimenez (softwarejimenez)
* @version 0.1
*/

var globa_view="welcomeview";//global view
var sizePaswword=8; //global variable of size of password
var port=":8000";
//////////////////////////////////////////////////////////////////////////////
/*
*LOAD VIEWS
*/
//////////////////////////////////////////////////////////////////////////////
/**
* Display the specific view when the page is reload
*/
window.onload = function(){
    check_sesion();
	page({hashbang: true});
};


/**
* Display the specific view without reload the page
*/
reloadPage = function(){
    displayView();
};


/**
* Display a view according to globa_view paramenter, it is chagne in the login/logout
*/
displayView = function(){
   // the code required to display a view
   if("welcomeview" === globa_view){
       $( "#viewBase" ).load( "view/welcome.html" , function() {
          page("/welcome");//display view until is load
        });
   }else if("studentview"===globa_view){
       $( "#viewBase" ).load( "view/student.html" , function() {
          page("/profile");//display view until is load
        });
   }else if("collegeview"===globa_view){
       $( "#viewBase" ).load( "view/college.html" , function() {
          page("/college_profile");//display view until is load
        });
   }
};
//////////////////////////////////////////////////////////////////////////////
/*
*SIGNIN SIGNUP LOGOUT
*/
//////////////////////////////////////////////////////////////////////////////
/**
* Check if the user is logged in the system.
* Display according to the role
*/
function check_sesion(){
    var url= window.location.protocol+"//"+window.location.host+port+"/Security/checkSesion/";
    var xmlHttp =new XMLHttpRequest();
    xmlHttp.open("GET", url, true );
    xmlHttp.withCredentials = true;
	xmlHttp.send();
    xmlHttp.onreadystatechange = function() {
    	if ( xmlHttp.readyState == 4 && xmlHttp.status == 200 ){
    		var output= JSON.parse(xmlHttp.responseText);
            console.log(output);
    		if( output.success ){
                if (output.data.ROLE[0]=="ROLE_STUDENT"){
                        globa_view="studentview";
                }else if (output.data.ROLE[0]=="ROLE_COLLEGE"){
                        globa_view="collegeview";
                }else{
                    console.log(output.data.ROLE[0]);
                    showErrorMessagesPage("login","Role desconocido.",output.success);
                }
    		}
            reloadPage();
    	}
    }
}


/**
* Login the user by email and password.
* The input is validate and show the error in case of problem.
*/
function login(){
	var username=document.getElementById("loginUsername").value;
	var password=document.getElementById("loginPassword").value;
    if(password.length>=sizePaswword && (validate_DNI(username) || validate_CIF(username))){
		var url= window.location.protocol+"//"+window.location.host+port+"/login";
		var xmlHttp =new XMLHttpRequest();
		xmlHttp.onreadystatechange = function() {
			if ( xmlHttp.readyState == 4 && xmlHttp.status == 200 ){
				var output= JSON.parse(xmlHttp.responseText);
                console.log(output);
				if( output.success ){
                    if (output.data.ROLE[0]=="ROLE_STUDENT"){
                        globa_view="studentview";
                        reloadPage();
                    }else if (output.data.ROLE[0]=="ROLE_COLLEGE"){
                        globa_view="collegeview";
                        reloadPage();
                    }else{
                        console.log(output.data.ROLE[0]);
                        showErrorMessagesPage("login","Role desconocido.",output.success);
                    }
				}else{
					showErrorMessagesPage("login",output.message,output.success);
                    console.log(output);
				}
			}
		}
		xmlHttp.open("POST", url, true );
        xmlHttp.withCredentials = true;
        var data = new FormData();
        data.append("_username", username);
        data.append("_password", password);
        xmlHttp.send(data);
    }else{
       showErrorMessagesPage("login","Invalid password o usuario.",false);
    }
    //TODO document.getElementById("login-form").reset();//clean input
}


/**
* Signup a new  user (college) by email, password company_name, CIF, telefone, address, url
* The input is validate and show the error in case of problem
*/
function signup_college(){
        var user = {
          'email': document.getElementById("college_signupEmail").value,
          'password':document.getElementById("college_signupPassword").value,
		  'repeat_password':document.getElementById("college_signupRepeatPSW").value,
          'name': document.getElementById("college_signupName").value,
          'username': document.getElementById("college_signupusername").value,
          'address': global_address_college.formatted_address,
          'lat':global_address_college.lat,
          'lng':global_address_college.lng,
          'url': document.getElementById("college_signupUrl").value,
          'telephone': document.getElementById("college_signupTelephone").value,
        };
        if (!validate_CIF(user.username)){
            showErrorMessagesPage("signup","Invalid CIF",false);
            return;
        }
        if(!validate_email(user.email)){
            showErrorMessagesPage("signup","Invalid email",false);
            return;
        }
        if(!user.password.length==sizePaswword){
            showErrorMessagesPage("signup","Password debe tener "+sizePaswword+" caracteres",false);
            return;
        }
		if(user.repeat_password != user.password){
            showErrorMessagesPage("signup","Passwords no son iguales",false);
            return;
        }
        if(user.name.length==0){
            showErrorMessagesPage("signup","Nombre de la compañia esta vacio",false);
            return;
        }
        if(user.address.length==0){
            showErrorMessagesPage("signup","Dirreccion esta vacia",false);
            return;
        }if(!validate_URL(user.url)){
            showErrorMessagesPage("signup","URL no es valido",false);
            return;
        }if(!Validate_Phonenumber(user.telephone)){
            showErrorMessagesPage("signup","Telefono no es valido",false);
            return;
        }
        var equipment=get_equipment_selected('college_equipment');
		var url=window.location.protocol+"//"+window.location.host+port+"/Signin/college/";
		var xmlHttp =new XMLHttpRequest();
		xmlHttp.onreadystatechange = function() {
			if ( xmlHttp.readyState == 4 && xmlHttp.status == 200 ){
				var output= JSON.parse(xmlHttp.responseText);
                console.log(output);
                showErrorMessagesPage("signup",output.message,output.success);
                if(output.success){
                    document.getElementById("register_form_college").reset();//clean input
                }
			}
		}
		xmlHttp.open("POST", url, true );
        var data = new FormData();
        data.append("username", user.username);
        data.append("password", user.password);
        data.append("email",user.email);
        data.append("companyName", user.name);
        data.append("address", user.address);
        data.append("lat", user.lat);
        data.append("lng", user.lng);
        data.append("url", user.url);
        data.append("telephone", user.telephone);
        data.append("wifi", equipment.college_icon_wifi);
        data.append("elevator", equipment.college_icon_elevator);
        data.append("canteen", equipment.college_icon_restaurant);
        data.append("hours24", equipment.college_icon_24h);
        data.append("laundry", equipment.college_icon_laundry);
        data.append("gym", equipment.college_icon_gym);
        data.append("study_room", equipment.college_icon_school);
        data.append("heating", equipment.college_icon_heating);
		xmlHttp.send(data);
}


/**
* Signin a new  user (student) by email, password name, DNI, Address
* The input is validate and show the error in case of problem
*/
function signup_student(){
        var user = {
          'email': document.getElementById("student_signupEmail").value,
          'password':document.getElementById("student_signupPassword").value,
		  'repeat_password':document.getElementById("student_signupRepeatPSW").value,
          'name': document.getElementById("student_signupName").value,
          'username': document.getElementById("student_signupusername").value,
        };
        if (!validate_DNI(user.username)){
            showErrorMessagesPage("signup","Invalid DNI",false);
            return;
        }
        if(!validate_email(user.email)){
            showErrorMessagesPage("signup","Invalid email",false);
            return;
        }
        if(!user.password.length==sizePaswword){
            showErrorMessagesPage("signup","password debe tener "+sizePaswword+" caracteres",false);
            return;
        }
		if(user.repeat_password != user.password){
            showErrorMessagesPage("signup","Contraseñas no son iguales",false);
            return;
        }
        if(user.name.length==0){
            showErrorMessagesPage("signup","El nombre esta vacio",false);
            return;
        }
		var url=window.location.protocol+"//"+window.location.host+port+"/Signin/student/";
		var xmlHttp =new XMLHttpRequest();
		xmlHttp.onreadystatechange = function() {
			if ( xmlHttp.readyState == 4 && xmlHttp.status == 200 ){
				var output= JSON.parse(xmlHttp.responseText);
                console.log(output);
                showErrorMessagesPage("signup",output.message,output.success);
                if(output.success){
                    document.getElementById("register_form_student").reset();//clean input
                }
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
* Logout the user
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


/**
* Dispaly the welcome view
*/
page('/welcome', function(){
	console.log("welcome page")
});
