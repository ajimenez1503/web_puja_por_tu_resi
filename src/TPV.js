
/**
* Pay the month of the last rent
* @param {id} id of the rent in the database
* @param {window_TPV} new window_TPV
*/
function pay_tpv(id,window_TPV){
	  var card_holder_name=window_TPV.document.getElementById("card-holder-name").value;
    var card_number=window_TPV.document.getElementById("card-number").value;
    card_number= card_number.replace(/\D/g, "");//get only the digit
    var e = window_TPV.document.getElementById("expiry-month");
    var expiry_month = e.options[e.selectedIndex].value;
    var e = window_TPV.document.getElementById("expiry-year");
    var expiry_year = e.options[e.selectedIndex].value;
    var cvv=window_TPV.document.getElementById("card_cvv").value;
    if (!validate_CreditCard(card_number)){
        showErrorMessagesPage("pay","Invalid credit card",false,window_TPV);
        return;
    }
    if(card_holder_name.length==0){
        showErrorMessagesPage("pay","Invalid card Holder name",false,window_TPV);
        return;
    }if(!validate_CVV(card_number,cvv)){
        showErrorMessagesPage("pay","Invalid CCV",false,window_TPV);
        return;
    }
    if(!validate_ExpiryDate(expiry_month,expiry_year)){
        showErrorMessagesPage("pay","Invalid fecha expiracion",false,window_TPV);
        return;
    }
		var idTransaction=Math.floor((Math.random() * 10000) + 1);
    var data = new FormData();
    data.append("id", id);
    data.append("idTransaction", idTransaction);

	var url=window.location.protocol+"//"+window.location.host+port+"/Rent/pay/";
	var xmlHttp =new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
		if ( xmlHttp.readyState == 4 && xmlHttp.status == 200 ){
			var output= JSON.parse(xmlHttp.responseText);
      console.log(output);
			showErrorMessagesPage("pay rent",output.message,output.success,window_TPV);
      showErrorMessagesPage("pay rent",output.message,output.success);
			if(output.success){
        //window_TPV.close()//close window
				window_TPV.document.getElementById("payment_rent").style.display="none";
				window_TPV.document.getElementById("payment_rent_confirm").style.display="block";
				window_TPV.document.getElementById("payment_rent_confirm_idTransaction").createTextNode=idTransaction;
        getRents();
			}
		}
	}
	xmlHttp.open("POST", url, true );
  xmlHttp.withCredentials = true;
	xmlHttp.send(data);
}
