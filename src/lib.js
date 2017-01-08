/**
* @author antonio Jimenez (softwarejimenez)
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
        console.log("Incorrect input showErrorMessage.");
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



/**
* display the location of the college on map
* @param {id} id of the div
* @param {latitude} latitude of the position
* @param {latitude} longitued of the position
*/
function init_map(id,latitude,longitued) {
    //get latitude,longitued from the college
    var uluru = {lat: latitude, lng: longitued};
    var map = new google.maps.Map(
        document.getElementById(id),
        {
            zoom: 10,
            center: uluru
        }
    );
    var marker = new google.maps.Marker(
        {
            position: uluru,
            map: map
        }
    );
}


// takes the form field value and returns true on valid number
function validateCreditCard(value) {
  // accept only digits, dashes or spaces
	if (/[^0-9-\s]+/.test(value)) return false;

	// The Luhn Algorithm. It's so pretty.
	var nCheck = 0, nDigit = 0, bEven = false;
	value = value.replace(/\D/g, "");

	for (var n = value.length - 1; n >= 0; n--) {
		var cDigit = value.charAt(n),
			  nDigit = parseInt(cDigit, 10);

		if (bEven) {
			if ((nDigit *= 2) > 9) nDigit -= 9;
		}

		nCheck += nDigit;
		bEven = !bEven;
	}

	return (nCheck % 10) == 0;
}

function validateCVV(cardNumber,cvv)
{
    // Get the first number of the credit card so we know how many digits to look for
    var $firstnumber = Number(cardNumber.substr(0, 1));
    if ($firstnumber === 3)
    {
        if (!cvv.match(/^\d{4}$/))
        {
            // The credit card is an American Express card but does not have a four digit CVV code
            return false;
        }
    }
    else if (!cvv.match(/^\d{3}$/))
    {
        // The credit card is a Visa, MasterCard, or Discover Card card but does not have a three digit CVV code
        return false;
    }
    return true;
}


function validateExpiryDate(expiry_month,expiry_year)
{
    expiry_year=parseInt(expiry_year);
    expiry_month=parseInt(expiry_month);
    var date = new Date ();
    var month = date.getMonth()+1;
    var year = date.getFullYear();
    if (year> expiry_year || (year === expiry_year && month >= expiry_month)){
        return false;
    }else{
        return true;
    }
}
