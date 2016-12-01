/**
* @author antonio Jimenez (antji996)
* @version 0.1
*/
var globa_view="welcomeview";//global view
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
* Display the data of the user in the tab home: messages, data profile and chart
*/
displayData = function(){
	// the code required to display a view
	if(localStorage.getItem("token") != null){
		dataProfile();
		getMessage();
		getNumberMessageAndLikes();
		showImageUser();
		showVideoUser();
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
			//TODO when success is true
			console.log("logout");
            reloadPage();
		}
	}
	xmlHttp.open("GET", url, true );
	xmlHttp.send();
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
	if(localStorage.getItem("token") != null){
		document.getElementById("home").style.display="block";
		document.getElementById("browse").style.display="none";
		document.getElementById("account").style.display="none";
		dataProfile();
		getMessage();
		getNumberMessageAndLikes();
		showImageUser();
		showVideoUser();
	} else {
		page('/connection');
	}
}

/**
* Dispaly the Browse view
*/
function displayBrowse(){
	if(localStorage.getItem("token") != null){
		document.getElementById("home").style.display="none";
		document.getElementById("browse").style.display="block";
		document.getElementById("account").style.display="none";
	} else {
		page('/connection');
	}

}

/**
* Dispaly the Account view
*/
function displayAccount(){
	if(localStorage.getItem("token") != null){
		document.getElementById("home").style.display="none";
		document.getElementById("browse").style.display="none";
		document.getElementById("account").style.display="block";
	} else {
		page('/connection');
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
 	if(localStorage.getItem("token") != null){
		signout();
	}
});

/**
* Display the Home page
*/
page('/home', function(){
 	displayHome();
});

/**
* Display the Browse page
*/
page('/browse', function(){
 	displayBrowse();
});

/**
* Display the Account page
*/
page('/account', function(){
 	displayAccount();
});

/**
* If the URL enter is wrong we redirect the user to the home page, and if the user is not connected to the connection page
*/
page('*', function(){
 	page('/home');
});

page({hashbang: true});
