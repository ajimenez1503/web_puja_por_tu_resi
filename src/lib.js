/**
* @author antonio Jimenez (antji996)
* @version 0.1
*/

/**
* show the error in a div with is block in this moment
* @param {string}page of the view, 2 possibility profile or Welcome
* @param {string}the element of the error, such as: login, message, etc
* @param {message}message of error
* @returns {boolean} return true is the operation is success
*/
function showErrorMessagesPage(page,element,message,success){
    if (typeof(message) === 'string' && typeof(element) === 'string' && typeof(page) === 'string' &&
        (page=="Welcome" || page=="Student" || page=="College")){
        document.getElementById("showErrorMessage"+page+"Page").style.display="block";
        if(success){
            document.getElementById("showErrorMessage"+page+"Page").className ="alert alert-success";
        }
        else{
            document.getElementById("showErrorMessage"+page+"Page").className="alert alert-danger";
        }
        document.getElementById("errorMessage"+page+"Page").innerHTML=element+" : "+message;
		fade(document.getElementById("showErrorMessage"+page+"Page"),300);
        return true;
    }else{
        console.log("incorrect infput showErrorMessage.");
        return false;
    }

}


function fade(element, speed) {
var op = 1,
        timer = setInterval(function () {
            if (op <= 0.1){
                clearInterval(timer);
                element.style.display = 'none';
            }
            element.style.opacity = op;
            element.style.filter = 'alpha(opacity=' + op * 100 + ")";
            op -= op * 0.1;
        }, speed);
}


/**
* Check if the e-mail is valid
* @param {String} email
* @returns {boolean} if the e-mail is valid
*/
function validateEmail(email)  {
    if (typeof(email) === 'string'){
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(email.match(mailformat))  {
            return true;
        }
    }else{
        return false;
    }
}




/**
* Check if the DNI is valid
* @param {String} DNI
* @returns {boolean} if the DNI is valid
*/
function validateDNI(dni){
    expresion_regular_dni = /^\d{8}[A-Z]$/;
    if(expresion_regular_dni.test (dni) == true){
        return true;
    }else{
        return false;
    }
}

/**
* Deleta all child of a node
* @param {element} father of the element will be deleted
*/
function deleteAllChildElement(node){
		while (node.firstChild) {
    		node.removeChild(node.firstChild);
		}
}
