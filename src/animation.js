/**
* @author antonio Jimenez (softwarejimenez)
* @version 0.1
*/


/**
* Get the element father and all the children style display none.
* Display a specific element ( style. display=block)
* @param {fater} id of the div
* @param {id} id of the div
*/
function display_specific_div(father,id) {
    var list_elements=document.getElementById(father).children;
    for(i=0;i<list_elements.length;i++){//display none all the children
        list_elements[i].style.display="none";
    }
    if (id!== undefined){
        document.getElementById(id).style.display="block";
    }
}



/**
* Select a row in a table (red background-color)
* Outelect a row in a table of the search
* Im the case that there paremeter latitude, longitude and id_map, display map
* @param: id_element
* @param:latitude
* @param:longitude
* @param:id_map
*/
function selected_out_selected_row_table(id_element,latitude, longitude,id_map){
    class_name=document.getElementById(id_element).className;
    if (class_name.includes(" selected_row_table")){
        class_name=class_name.replace("selected_row_table","");
        document.getElementById(id_element).className=class_name;

    }else{
        document.getElementById(id_element).className+= " selected_row_table";
        if(latitude!==undefined && longitude!==undefined && id_map!==undefined){
            init_map(id_map,latitude,longitude);
        }
    }
}





/**
* Rotate the images of the room
* The number of images should be 3, otherwise need a paramenter //TODO add parameter with 3 by default
* The images are rotete during the tab is style.display==Block
* @param: tab
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
        if( (globa_view=="studentview" || globa_view=="collegeview") && document.getElementById(tab).style.display=="block"){//still in tab
                animate = setTimeout(sliderScroll,20); // call moveRight in 20msec
                //console.log("repeat");
        }else {//stop animation if move to other tab
            slider.scrollLeft=0;
            clearTimeout(animate);
            console.log("stop animation");
        }
    }
}


/**
* show the error in a div
* @param {string} page of the view, 3possibility Student or Welcome or College
* @param {string} the element of the error, such as: login, message, etc
* @param {message} message of error
* @returns {boolean} bool
*/
function showErrorMessagesPage(page,element,message,success){
    if (typeof(message) === 'string' && typeof(element) === 'string' && typeof(page) === 'string' &&
        (page=="Welcome" || page=="Student" || page=="College")){
        document.getElementById("showErrorMessage"+page+"Page").style.display="block";
        if(success){
            document.getElementById("showErrorMessage"+page+"Page").className +=" alert alert-success";
        }
        else{
            document.getElementById("showErrorMessage"+page+"Page").className+=" alert alert-danger";
        }
        document.getElementById("errorMessage"+page+"Page").innerHTML=element+" : "+message;
		fade(document.getElementById("showErrorMessage"+page+"Page"),300);
        return true;
    }else{
        console.log("Incorrect input showErrorMessage.");
        return false;
    }

}

/**
* Disappear the element with a speed
* @param {element} html element
* @param {speed} speed to disappear
*/
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
* Deleta all child of a node
* @param {element} father of the element will be deleted
*/
function deleteAllChildElement(node){
	while (node.firstChild) {
		node.removeChild(node.firstChild);
	}
}


/**
* Display the location of the latitude and logitude on map
* @param {id} id of the div
* @param {latitude} latitude of the position
* @param {longitude} longitude of the position
*/
function init_map(id,latitude,longitude) {
    //get latitude,longitude from the college
    var uluru = {lat: latitude, lng: longitude};
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


/**
* pause during the milisecond
*/
function pause(millis){
  var date = new Date();
  var curDate = null;
  do { curDate = new Date(); }
  while(curDate-date < millis);

}