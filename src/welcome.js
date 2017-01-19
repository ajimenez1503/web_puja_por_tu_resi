/**
* @author antonio Jimenez (softwarejimenez)
* @version 0.1
*/

var globa_view="welcomeview";//"studentview";//"collegeview";//"welcomeview";//global view
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
* Display a view according to globa_view paramenter, it is chagne in the login/logout
*/
displayView = function(){
   // the code required to display a view
   if("welcomeview" === globa_view){
       $( "#viewBase" ).load( "welcome.html" , function() {
          page("/welcome");//display view until is load
        });
   }else if("studentview"===globa_view){
       $( "#viewBase" ).load( "student.html" , function() {
          page("/home");//display view until is load
        });
   }else if("collegeview"===globa_view){
       $( "#viewBase" ).load( "college.html" , function() {
          page("/college_list_rooms");//display view until is load
        });
   }
};

//////////////////////////////////////////////////////////////////////////////
/*
*SIGNIN SIGNUP LOGOUT
*/
//////////////////////////////////////////////////////////////////////////////
/**
* Display the register form of the student or the college.
*@param {id} id of the div
*/
function display_form_login(id) {
    if (id=="register_form_student"){
        document.getElementById("register_form_student").style.display="block";
        document.getElementById("register_form_college").style.display="none";
    } else if (id=="register_form_college") {
        document.getElementById("register_form_college").style.display="block";
        document.getElementById("register_form_student").style.display="none";

    }
}
/**
* Login the user by email and password.
*The input is validate and show the error in case of problem.
*/
function login(){
	var username=document.getElementById("loginUsername").value;
	var password=document.getElementById("loginPassword").value;
    if(password.length>=sizePaswword && (validateDNI(username) || validateCIF(username))){
        var data = new FormData();
        data.append("_username", username);
        data.append("_password", password);
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
                            showErrorMessagesPage("Welcome","login","Role desconocido.",output.success);
                    }
				}else{
					showErrorMessagesPage("Welcome","login",output.message,output.success);
                    console.log(output);
				}
			}
		}
		xmlHttp.open("POST", url, true );
        xmlHttp.withCredentials = true;
        xmlHttp.send(data);
    }else{
       showErrorMessagesPage("Welcome","login","Invalid password o usuario.",false);
    }
    //TODO document.getElementById("login-form").reset();//clean input
}



var global_address_college = {
  'formatted_address': "",
  'lat':"",
  'lng':"",
};

/**
*Searchbox for the address of the college. When the user choose aa specific address
*/
function search_place() {
  // Create the search box and link it to the UI element.
  var input = document.getElementById('college_signupAddress');
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

/**
*Signin a new  user (college) by email, password company_name, CIF, telefone, address, url
*The input is validate and show the error in case of problem
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
        if (!validateCIF(user.username)){
            showErrorMessagesPage("Welcome","signup","Invalid CIF",false);
            return;
        }
        if(!validateEmail(user.email)){
            showErrorMessagesPage("Welcome","signup","Invalid email",false);
            return;
        }
        if(!user.password.length==sizePaswword){
            showErrorMessagesPage("Welcome","signup","password debe tener "+sizePaswword+" caracteres",false);
            return;
        }
		if(user.repeat_password != user.password){
            showErrorMessagesPage("Welcome","signup","passwords no son iguales",false);
            return;
        }
        if(user.name.length==0){
            showErrorMessagesPage("Welcome","signup","Nombre de la compañia esta vacio",false);
            return;
        }
        if(user.address.length==0){
            showErrorMessagesPage("Welcome","signup","Dirreccion esta vacia",false);
            return;
        }if(!ValidURL(user.url)){
            showErrorMessagesPage("Welcome","signup","URL no es valido",false);
            return;
        }if(!ValidatePhonenumber(user.telephone)){
            showErrorMessagesPage("Welcome","signup","Telefono no es valido",false);
            return;
        }
        var equipment=get_equipment_selected('college_equipment');
		var url=window.location.protocol+"//"+window.location.host+port+"/Signin/college/";
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
        document.getElementById("register_form_college").reset();//clean input

}


/**
*Signin a new  user (student) by email, password name, DNI, Address
*The input is validate and show the error in case of problem
*/
function signup_student(){
        var user = {
          'email': document.getElementById("student_signupEmail").value,
          'password':document.getElementById("student_signupPassword").value,
		  'repeat_password':document.getElementById("student_signupRepeatPSW").value,
          'name': document.getElementById("student_signupName").value,
          'username': document.getElementById("student_signupusername").value,
        };
        if (!validateDNI(user.username)){
            showErrorMessagesPage("Welcome","signup","Invalid DNI",false);
            return;
        }
        if(!validateEmail(user.email)){
            showErrorMessagesPage("Welcome","signup","Invalid email",false);
            return;
        }
        if(!user.password.length==sizePaswword){
            showErrorMessagesPage("Welcome","signup","password debe tener "+sizePaswword+" caracteres",false);
            return;
        }
		if(user.repeat_password != user.password){
            showErrorMessagesPage("Welcome","signup","Contraseñas no son iguales",false);
            return;
        }
        if(user.name.length==0){
            showErrorMessagesPage("Welcome","signup","El nombre esta vacio",false);
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
        document.getElementById("register_form_student").reset();//clean input


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
