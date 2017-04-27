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
 * show the data of the student user
 */
function dataProfile() {
    var xmlHttp = new XMLHttpRequest();
    var url = window.location.protocol + "//" + window.location.host + port + "/ProfileStudent/get/";
    xmlHttp.open("GET", url, true);
    xmlHttp.withCredentials = true;
    xmlHttp.send();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            var output = JSON.parse(xmlHttp.responseText);
            console.log(output)
            if (output.success) {
                display_specific_student("profile_student_", output.data);
                document.getElementById("profile_student_point").innerHTML = output.data.point;
                display_username("tab_profile_student_username", output.data.username);
            } else {
                showErrorMessagesPage("showdata", output.message, output.success);
            }
        }
    }
}


/**
 * Update the pasword.
 * The input is validate and show the error in case of problem
 */
function updatePassword() {
    var passwordOld = document.getElementById("formUpdatePasswordOld").value;
    var passwordNew = document.getElementById("formUpdatePasswordNew").value;
    var passwordNewRepeat = document.getElementById("formUpdatePasswordNewRepeat").value;
    if (passwordNew == passwordNewRepeat) {
        if (passwordNew.length >= sizePaswword) {
            var url = window.location.protocol + "//" + window.location.host + port + "/ProfileStudent/updatePassword/";
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.onreadystatechange = function() {
                if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                    var output = JSON.parse(xmlHttp.responseText);
                    console.log(output);
                    showErrorMessagesPage("updatePassword", output.message, output.success);
                    if (output.success) {
                        document.getElementById("id_formUpdatePassword").reset(); //clean input
                        display_specific_div('profile_student_list_form', undefined);
                        dataProfile();
                    }
                }
            }
            xmlHttp.open("POST", url, true);
            xmlHttp.withCredentials = true;
            var data = new FormData();
            data.append("old_password", passwordOld);
            data.append("new_password", passwordNew);
            xmlHttp.send(data);
        } else {
            showErrorMessagesPage("updatePassword", "error input", false);
        }
    } else {
        showErrorMessagesPage("updatePassword", "passwords not identical ", false);
    }
}


/**
* Update the email.
* The input is validate and show the error in case of problem

function updateEmail(){
    var email=document.getElementById("formUpdateEmail").value;
    if(validate_email(email)){
        var url=window.location.protocol+"//"+window.location.host+port+"/ProfileStudent/updateEmail/";
        var xmlHttp =new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() {
            if ( xmlHttp.readyState == 4 && xmlHttp.status == 200 ){
                var output= JSON.parse(xmlHttp.responseText);
                console.log(output);
                showErrorMessagesPage("updateEmail",output.message,output.success);
                if(output.success){
                    document.getElementById("id_formUpdateEmail").reset();//clean input
                    display_specific_div('profile_student_list_form',undefined);
                    dataProfile();
                }
            }
        }
        xmlHttp.open("POST", url, true );
        xmlHttp.withCredentials = true;
        var data = new FormData();
        data.append("email", email);
        xmlHttp.send(data);
    }else{
        showErrorMessagesPage("updateEmail","Email no es valido.",false);
    }
}*/

/**
 * Update the email.
 * The input is validate and show the error in case of problem
 */
function student_update_email() {
    button = document.getElementById("student_profile_update_email").textContent;
    if (button == "Actualizar") {
        document.getElementById("student_profile_update_email").textContent = "Cambiar";
        document.getElementById("profile_student_email").style.display = "none";
        document.getElementById("profile_student_email_new").style.display = "block";
        document.getElementById("profile_student_email_new").value = document.getElementById("profile_student_email").textContent;

    } else {
        var email = document.getElementById("profile_student_email_new").value;
        if (validate_email(email)) {
            var url = window.location.protocol + "//" + window.location.host + port + "/ProfileStudent/updateEmail/";
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.onreadystatechange = function() {
                if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                    var output = JSON.parse(xmlHttp.responseText);
                    console.log(output);
                    showErrorMessagesPage("updateEmail", output.message, output.success);
                    if (output.success) {
                        document.getElementById("student_profile_update_email").textContent = "Actualizar"
                        document.getElementById("profile_student_email").style.display = "block";
                        document.getElementById("profile_student_email_new").style.display = "none";
                        document.getElementById("profile_student_email").textContent = email;
                    }
                }
            }
            xmlHttp.open("POST", url, true);
            xmlHttp.withCredentials = true;
            var data = new FormData();
            data.append("email", email);
            xmlHttp.send(data);
        } else {
            showErrorMessagesPage("updateEmail", "Email no es valido.", false);
        }

    }
}
//////////////////////////////////////////////////////////////////////////////
/*
 *INCIDENCE CREATE, SHOW
 */
//////////////////////////////////////////////////////////////////////////////
/**
 * Create Incidence from the Student to the college.
 * The input is validate and show the error in case of problem
 */
function createIncidence() {
    var description = (document.getElementById("formInicidenceDescription").value).escape();
    var file = document.getElementById("formIncidenceFilename");
    var url = window.location.protocol + "//" + window.location.host + port + "/Incidence/create/";
    var xmlHttp = new XMLHttpRequest();
    if ('files' in file && file.files.length >= 1) {
        file = file.files[0];
        if ('name' in file && 'size' in file) {
            if (!validate_file(file.name, file.size)) {
                showErrorMessagesPage("Upload file", "error validation file image format.", false);
            } else {
                xmlHttp.onreadystatechange = function() {
                    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                        var output = JSON.parse(xmlHttp.responseText);
                        console.log(output);
                        showErrorMessagesPage("createIncidence", output.message, output.success);
                        if (output.success) {
                            document.getElementById("id_form_createIncidence").reset(); //clean input
                            page('/inicidence_list')
                        }
                    }
                }
                xmlHttp.open("POST", url, true);
                xmlHttp.withCredentials = true;
                var data = new FormData();
                data.append("description", description);
                data.append("file_name", file);
                xmlHttp.send(data);
            }
        } else {
            showErrorMessagesPage("Upload file", "error file image.", false);
        }
    } else {
        showErrorMessagesPage("Upload file", "Enter a correct file image.", false);
    }
}
//////////////////////////////////////////////////////////////////////////////
/*
 *MESSAGE CREATE SHOW OPEN
 */
//////////////////////////////////////////////////////////////////////////////
/**
 * Create message from the Student to the college.
 * The input is validate and show the error in case of problem
 */
function sendMessage() {
    var message = (document.getElementById("formMessageText").value).escape();
    document.getElementById("formMessageText").value = ""; //clean input
    var file = document.getElementById("formMessageFilename");
    var url = window.location.protocol + "//" + window.location.host + port + "/Message/create/";
    var xmlHttp = new XMLHttpRequest();
    if (message === "") {
        showErrorMessagesPage("message", "ERROR: necesita un mensaje texto.", false);
        return;
    }
    if ('files' in file && file.files.length >= 1) {
        file = file.files[0];
        if ('name' in file && 'size' in file) {
            if (!validate_file(file.name, file.size)) {
                showErrorMessagesPage("Upload file", "error validation file image format.", false);
                return;
            }
        } else {
            showErrorMessagesPage("Upload file", "error file image.", false);
            return;
        }
        console.log("file " + file.name)
    } else {
        console.log("no file")
        file = null;
    }
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            var output = JSON.parse(xmlHttp.responseText);
            console.log(output);
            showErrorMessagesPage("createMessage", output.message, output.success);
            if (output.success) {
                document.getElementById("id_form_sendMessage").reset(); //clean input
            }
        }
    }
    xmlHttp.open("POST", url, true);
    xmlHttp.withCredentials = true;
    var data = new FormData();
    data.append("message", message);
    data.append("file_attached", file);
    xmlHttp.send(data);
}


/**
 * Display the list of message of the user
 */
function getMessages() {
    var xmlHttp = new XMLHttpRequest();
    var url = window.location.protocol + "//" + window.location.host + port + "/Message/get/";
    xmlHttp.open("GET", url, true);
    xmlHttp.withCredentials = true;
    xmlHttp.send();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            var output = JSON.parse(xmlHttp.responseText);
            console.log(output)
            if (output.success) {
                var father = document.getElementById("list_message");
                deleteAllChildElement(father);
                for (i = 0; i < output.data.length; i++) {
                    father.appendChild(createHTMLMessage(output.data[i]));
                }
            } else {
                showErrorMessagesPage("showdata", output.message, output.success);
            }
        }
    }
}


/**
 * Open all the messages of the user
 */
function OpenAllMessages() {
    var xmlHttp = new XMLHttpRequest();
    var url = window.location.protocol + "//" + window.location.host + port + "/Message/openAll/";
    xmlHttp.open("POST", url, true);
    xmlHttp.withCredentials = true;
    xmlHttp.send();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            var output = JSON.parse(xmlHttp.responseText);
            console.log(output)
            if (!output.success) {
                showErrorMessagesPage("Open_message", output.message, output.success);
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
 * verify if the student has a agreement:
 *    -displat data of the college
 *    -display data of the room
 *    -display data of the agreement
 *    -If the AGREEMENT is not signed yet display the button (accept, refuse, download)
 */
function get_room_data() {
    var xmlHttp = new XMLHttpRequest();
    var url = window.location.protocol + "//" + window.location.host + port + "/Agreement/getCurrentSigned/";
    xmlHttp.open("GET", url, true);
    xmlHttp.withCredentials = true;
    xmlHttp.send();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            var output = JSON.parse(xmlHttp.responseText);
            console.log(output)
            if (output.success) { //in the case that there are agreemnt, show it
                document.getElementById("Room_specific").style.display = "block";
                //display data agreement
                display_specific_agreement("Room_specific_agreement_", output.data.agreement);
                //display data room
                display_specific_room("Room_specific", output.data.room);
                //displat data college
                display_specific_college("Room_specific_", output.data.college);
            } else {
                document.getElementById("Room_specific").style.display = "none";
                showErrorMessagesPage("showdata", output.message, output.success);
            }
        }
    }
}
/**
 * Display the button. Assigned a every button and form the specifit function and link
 */
function refuse_agreement_room(room_id,agreement_id) {
    //remove a agrement between room and a student ( assincronous false)
    var url = window.location.protocol + "//" + window.location.host + port + "/Agreement/remove/";
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            var output = JSON.parse(xmlHttp.responseText);
            console.log(output);
            showErrorMessagesPage("refuse room", output.message, output.success);
        }
    }
    xmlHttp.open("POST", url, false);
    xmlHttp.withCredentials = true;
    var data = new FormData();
    data.append("room_id", room_id);
    data.append("agreement_id",agreement_id);
    xmlHttp.send(data);
    document.getElementById("Room_specific").style.display = "none";
    document.getElementById("Room_accept_refuse").style.display = "none"; //display button
    getAgreements();
}


/**
 * Accept the agreement by updload the file signed.
 * @param: room_id
 */
function upload_file_agreement(room_id,agreement_id) {
    //update the file and everything
    var file = document.getElementById("formAgreementFilename");
    var url = window.location.protocol + "//" + window.location.host + port + "/Agreement/accept/";
    var xmlHttp = new XMLHttpRequest();
    if ('files' in file && file.files.length >= 1) {
        file = file.files[0];
        if ('name' in file && 'size' in file) {
            if (!validate_file(file.name, file.size)) {
                showErrorMessagesPage("Upload file", "error validation file pdf format.", false);
            } else {
                xmlHttp.onreadystatechange = function() {
                    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                        var output = JSON.parse(xmlHttp.responseText);
                        console.log(output);
                        showErrorMessagesPage("accept Agreement", output.message, output.success);
                        if (output.success) {
                            document.getElementById("Room_form_id_upload_file_agreement").reset(); //clean input
                            getAgreements();
                        }
                    }
                }
                xmlHttp.open("POST", url, false);
                xmlHttp.withCredentials = true;
                var data = new FormData();
                data.append("room_id", room_id);
                data.append("agreement_id",agreement_id);
                data.append("file_agreement_signed", file);
                xmlHttp.send(data);
            }
        } else {
            showErrorMessagesPage("Upload file", "error file pdf.", false);
        }
    } else {
        console.log("Enter a correct file.")
    }
}
//////////////////////////////////////////////////////////////////////////////
/*
 *Agrements
 */
//////////////////////////////////////////////////////////////////////////////

/**
 * Get every agreement and display as a row in the table. habitacion,Residencia,precio,contrato,Fecha inicio,Fecha fin, Firmar,Rechazar
 * @param data_agreement
 * @return tr
 */
function create_row_agreement(data_agreement) {
    var tr = document.createElement('tr');
    tr.id="Agreement_"+data_agreement.agreement.id;
    //habitacion
    var td = document.createElement('td');
    td.appendChild(document.createTextNode(data_agreement.room.name))
    td.onclick = function() {
        document.getElementById("Agreement_Room_specific").style.display = "block";
        //display data room
        display_specific_room("Agreement_Room_specific", data_agreement.room);
        //displat data college
        display_specific_college("Agreement_Room_specific_", data_agreement.college);
    }
    td.onmouseover = function() {
        selected_out_selected_row_table(tr.id)
    };
    td.onmouseout = function() {
        selected_out_selected_row_table(tr.id)
    };
    tr.appendChild(td)
    //Residencia
    var td = document.createElement('td');
    td.appendChild(document.createTextNode(data_agreement.college.companyName))
    tr.appendChild(td)
    //price
    var td = document.createElement('td');
    td.appendChild(document.createTextNode(data_agreement.agreement.price.toString() + "€"));
    tr.appendChild(td)
    //contrato
    var td = document.createElement('td');
    var file_download = document.createElement('a');
    file_download.setAttribute('href', window.location.protocol + "//" + window.location.host + port + "/Agreement/download/" + data_agreement.agreement.file_agreement);
    file_download.download = "file"
    file_download.appendChild(document.createTextNode("file_download"));
    td.appendChild(file_download);
    tr.appendChild(td);
    //Fecha inicio
    var td = document.createElement('td');
    td.appendChild(document.createTextNode(data_agreement.agreement.date_start_school.date.replace(" 00:00:00", "").replace(".000000", "")));
    tr.appendChild(td)
    //Fecha fin
    var td = document.createElement('td');
    td.appendChild(document.createTextNode(data_agreement.agreement.date_end_school.date.replace(" 00:00:00", "").replace(".000000", "")));
    tr.appendChild(td)
    //Firmar
    var td = document.createElement('td');
    if (!data_agreement.agreement_signed) {
        td.appendChild(icon_check());
        td.title = "Aceptar room"
        td.style.cursor = "pointer";
        //function open TPV module
        td.onclick = function() {
            document.getElementById("Room_upload_file_agreement").style.display = "block"; //display button
            document.getElementById("Room_upload_file_agreement").onclick = function() {
                upload_file_agreement(data_agreement.room.id,data_agreement.agreement.id);
            };
        };
    }
    tr.appendChild(td)
    //Rechazar
    var td = document.createElement('td');
    if (!data_agreement.agreement_signed) {
        td.appendChild(icon_delete());
        td.title = "rechzar room"
        td.style.cursor = "pointer";
        //function open TPV module
        td.onclick = function() {
            refuse_agreement_room(data_agreement.room.id,data_agreement.agreement.id);
        };
    }
    tr.appendChild(td);
    return tr;
}


/**
 * Display table agreements in the tab
 * @param: tab_elements
 * @param: tab_table
 * @param: list_agreements
 */
function display_table_agreements(tab_element, tab_table, list_agreements) {
    var father = document.getElementById(tab_element);
    deleteAllChildElement(father)
    for (i = 0; i < list_agreements.length; i++) {
        father.appendChild(create_row_agreement(list_agreements[i]));
    }
    floatThead_table(tab_table);
}


/**
 * Get all the Agreement and display in the table
 */
function getAgreements() {
    var xmlHttp = new XMLHttpRequest();
    var url = window.location.protocol + "//" + window.location.host + port + "/Agreement/getList/";
    xmlHttp.open("GET", url, true);
    xmlHttp.withCredentials = true;
    xmlHttp.send();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            var output = JSON.parse(xmlHttp.responseText);
            console.log(output)
            if (output.success) {
                display_table_agreements ("table_Agreement_elements","table_Agreement",output.data)
            } else {
                showErrorMessagesPage("showdata", output.message, output.success);
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
 * Get all the rents and display in the table
 */
function getRents() {
    var xmlHttp = new XMLHttpRequest();
    var url = window.location.protocol + "//" + window.location.host + port + "/Rent/getReveiverBankAccount/";
    xmlHttp.open("GET", url, true);
    xmlHttp.withCredentials = true;
    xmlHttp.send();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            var output = JSON.parse(xmlHttp.responseText);
            console.log(output)
            if (output.success) {
                college_bank_account = output.data;
                var xmlHttp2 = new XMLHttpRequest();
                var url2 = window.location.protocol + "//" + window.location.host + port + "/Rent/get/";
                xmlHttp2.open("GET", url2, true);
                xmlHttp2.withCredentials = true;
                xmlHttp2.send();
                xmlHttp2.onreadystatechange = function() {
                    if (xmlHttp2.readyState == 4 && xmlHttp2.status == 200) {
                        var output = JSON.parse(xmlHttp2.responseText);
                        console.log(output)
                        if (output.success) {
                            display_table_rents("student_element_table_rent", "table_rent", output.data, true, college_bank_account)
                        } else {
                            showErrorMessagesPage("showdata", output.message, output.success);
                        }
                    }
                }
            } else {
                showErrorMessagesPage("showdata", output.message, output.success);
            }
        }
    }
}


/**
 * Pay the month of the last rent
 * @param {id} id of the rent in the database
 * @param {month} month of the rent in the database
 * @param {year} year of the rent in the database
 * @param {price} price of the rent in the database
 * @param {college_IBAM} college_IBAM of the bank account of the college
 * @param {college_BIC} college_BIC of the bank account of the college
 * @param {college_accountHolder} college_accountHolder of the bank account of the college
 */
function open_TPV(id, month, year, price, college_IBAM, college_BIC, college_account_holder) {
    //TODO open module
    var window_TPV = window.open(window.location.protocol + "//" + window.location.host + "/web_puja_por_tu_resi/view/TPV.html", "_blank", "width=800,height=500,left=1000");
    window_TPV.onload = function() {
        window_TPV.document.getElementById("payment_rent_month").innerHTML = month;
        window_TPV.document.getElementById("payment_rent_year").innerHTML = year;
        window_TPV.document.getElementById("payment_rent_price").innerHTML = price.toString() + "€";
        window_TPV.document.getElementById("payment_rent_college_IBAM").innerHTML = college_IBAM;
        window_TPV.document.getElementById("payment_rent_college_BIC").innerHTML = college_BIC;
        window_TPV.document.getElementById("payment_rent_college_account_holder").innerHTML = college_account_holder;

        window_TPV.document.getElementById("payment_rent_submit").onclick = function() {
            pay_tpv(id, window_TPV);
        };
    }
}
//////////////////////////////////////////////////////////////////////////////
/*
 *SEARCH_ROOM, SHOW DATA, DOWNLOAD FILE, PAY
 */
//////////////////////////////////////////////////////////////////////////////
/**
 * Get all colleges name and display the list in the form of search room
 */
function display_list_colleges(prefix_id) {
    var xmlHttp = new XMLHttpRequest();
    var url = window.location.protocol + "//" + window.location.host + port + "/Room/getAllCompanyName/";
    xmlHttp.open("GET", url, true);
    xmlHttp.withCredentials = true;
    xmlHttp.send();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            var output = JSON.parse(xmlHttp.responseText);
            console.log(output)
            if (output.success) {
                var search_room_form_college = document.getElementById(prefix_id + "room_form_college");
                deleteAllChildElement(search_room_form_college);
                //Add TODAS
                var option = document.createElement("option");
                option.value = "TODAS";
                option.text = "TODAS";
                search_room_form_college.add(option);
                for (i = 0; i < output.data.length; i++) {
                    var option = document.createElement("option");
                    option.value = output.data[i];
                    option.text = output.data[i];
                    search_room_form_college.add(option);
                }
            } else {
                showErrorMessagesPage("Get Colleges", output.message, output.success);
            }
        }
    }
}


/**
 * Display the range of price
 */
function display_range_price(id) {
    $("#" + id).slider({
        range: true,
        min: 0,
        max: 2000,
        values: [75, 1500],
        slide: function(event, ui) {
            $("#amount").val(ui.values[0] + "€ -" + ui.values[1] + " €");
        }
    });
    $("#amount").val(get_min_range_prince(id) + " € - " + get_max_range_prince(id) + " € ");
}

/**
 * @return min price
 */
function get_min_range_prince(id) {
    return $("#" + id).slider("values", 0);
}

/**
 * @return max price
 */
function get_max_range_prince(id) {
    return $("#" + id).slider("values", 1);
}
/**
 * @return college selected
 */
function get_college_selected(prefix_id) {
    var e = document.getElementById(prefix_id + "room_form_college");
    return e.options[e.selectedIndex].value;
}
/**
 * Select and selected a icon or image of the list of equipment. It will be shadow
 * @param:id_element
 */
function selected_icon_search(id_element) {
    if (document.getElementById(id_element).className.includes(" selected_icon_search")) {
        document.getElementById(id_element).className = document.getElementById(id_element).className.replace('selected_icon_search', '');
    } else {
        document.getElementById(id_element).className += ' selected_icon_search';
    }
}


/**
 * Search room by the parementer of the form
 */
function search_rooms(prefix_id, display_specific_room) {
    display_specific_div(prefix_id + "room_option", prefix_id + "room_table");
    //get data form
    var equipment = get_equipment_selected(prefix_id + "equipment");

    // get all residences availables whith the paramenter
    // create the row of the table
    var url = window.location.protocol + "//" + window.location.host + port + "/Room/getSearch/";
    url += "?college_company_name=" + get_college_selected(prefix_id);
    url += "&price_min=" + get_min_range_prince(prefix_id + "slider-range");
    url += "&price_max=" + get_max_range_prince(prefix_id + "slider-range");
    url += "&study_room=" + equipment.search_icon_study_room;
    url += "&gym=" + equipment.search_icon_gym;
    url += "&canteen=" + equipment.search_icon_canteen;
    url += "&wifi=" + equipment.search_icon_wifi;
    url += "&laundry=" + equipment.search_icon_laundry;
    url += "&heating=" + equipment.search_icon_heating;
    url += "&elevator=" + equipment.search_icon_elevator;
    url += "&hours24=" + equipment.search_icon_24h;
    url += "&tv=" + equipment.search_icon_tv;
    url += "&bath=" + equipment.search_icon_bath;
    url += "&desk=" + equipment.search_icon_desk;
    url += "&wardrove=" + equipment.search_icon_wardrove;
    url += "&date_start_school=" + document.getElementById(prefix_id + "room_form_date_start_school").value;
    url += "&date_end_school=" + document.getElementById(prefix_id + "room_form_date_end_school").value;

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.withCredentials = true;
    xmlHttp.open("GET", url, true);
    xmlHttp.send();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            var output = JSON.parse(xmlHttp.responseText);
            console.log(output)
            if (output.success) {
                display_list_rooms(prefix_id, output.data, display_specific_room)
            } else {
                showErrorMessagesPage("showrooms", output.message, output.success);
            }
        }
    }
}

/**
 * Get every room and display as a row in the table:
 * nombre,inicio academico,fin academico,inicio puja,fin puja,tamaño,planta,tv, bath, desk, wardrove
 * @return div element (column)
 */
function create_room_element(data_college, data_room, display_specific_room, prefix_id) {
    var div = document.createElement('div');
    div.className+=" col-sm-6";
    div.style.textAlign = "center";
    div.id = "student_list_room_id" + data_room.id.toString();
    var div_img = document.createElement('div');
    var img = document.createElement("img")
    img.src = window.location.protocol + "//" + window.location.host + port + "/Room/download/" + data_room.picture1;
    img.className+=" img-responsive";
    img.title = "imagen room";
    img.alt = "imagen room";
    img.style.padding ="5%";
    div_img.appendChild(img);
    div.appendChild(div_img);
    var div_info = document.createElement('div');
    div_info.appendChild(document.createTextNode(data_room.price + "€   " + data_room.name));
    div_info.appendChild(document.createElement('br'));
    div_info.appendChild(document.createTextNode(data_college.companyName));
    div.appendChild(div_info);


    div.onmouseover = function() {
        selected_out_selected_row_table(div.id, data_college.latitude, data_college.longitude, prefix_id + "room_table_map");
    };
    div.onmouseout = function() {
        selected_out_selected_row_table(div.id);
    };
    if (display_specific_room) {
        div.onclick = function() {
            display_search_room_specific(data_college, data_room);
        };
    } else {
        div.onclick = function() {
            showErrorMessagesPage("Login", "El siguiente paso es iniciar sesion o registrarse.", true);
        };
    }

    return div;
}

/**
 * Display all the OFFERED room in the search_room_table_list_rooms
 */
function display_list_rooms(prefix_id, data, display_specific_room) {
    var father = document.getElementById(prefix_id + "room_table_list_rooms");
    deleteAllChildElement(father);
    for (i = 0; i < data.length; i++) {
        for (j = 0; j < data[i].rooms.length; j++) {
            father.appendChild(create_room_element(data[i], data[i].rooms[j], display_specific_room, prefix_id));
        }
    }
}

/**
 * Get all the OFFERED Rooms and display table
 */
function GetOFFEREDRooms(prefix_id, display_specific_room) {
    var xmlHttp = new XMLHttpRequest();
    var url = window.location.protocol + "//" + window.location.host + port + "/Room/getSearchAll/";
    xmlHttp.open("GET", url, true);
    xmlHttp.withCredentials = true;
    xmlHttp.send();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            var output = JSON.parse(xmlHttp.responseText);
            console.log(output)
            if (output.success) {
                display_list_rooms(prefix_id, output.data, display_specific_room)
            } else {
                showErrorMessagesPage("showrooms", output.message, output.success);
            }
        }
    }
}


/**
 * Dispaly search room table (table/ form / map)
 */
function display_search_room_table(prefix_id, display_specific_room) {
    display_range_price(prefix_id + "slider-range");
    display_list_colleges(prefix_id);
    init_map(prefix_id + "room_table_map", 37.176487, -3.597929); //By default GRANADA in the maps
    // display all the availables room in the table
    GetOFFEREDRooms(prefix_id, display_specific_room);
}

/**
 * Dispaly the features of a specific room
 * @param: data_college
 * @param: data_room
 */
function display_search_room_specific(data_college, data_room) {
    display_specific_div("search_room_option", "student_search_room_specific");

    display_specific_room("student_search_room_specific", data_room);
    display_specific_college("student_search_", data_college);

    //button of bid and remove bid
    document.getElementById("search_room_specific_button_bid_new").onclick = function() {
        create_bid(data_room.id)
    };
    document.getElementById("search_room_specific_button_bid_remove").onclick = function() {
        remove_bid(data_room.id)
    };
    //get data of bids and display
    get_display_bids(data_room.id, "search_room_specific_ul_bid");
}


/**
 * Create a bid about the room with the user who call
 * @param: room id
 */
function create_bid(room_id) {
    var url = window.location.protocol + "//" + window.location.host + port + "/Bid/create/";
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            var output = JSON.parse(xmlHttp.responseText);
            console.log(output);
            showErrorMessagesPage("createBid", output.message, output.success);
        }
    }
    xmlHttp.open("POST", url, true);
    xmlHttp.withCredentials = true;
    var data = new FormData();
    data.append("room", room_id);
    data.append("date_start_school", document.getElementById("search_room_form_date_start_school").value);
    data.append("date_end_school", document.getElementById("search_room_form_date_end_school").value);
    xmlHttp.send(data);
    get_display_bids(room_id, "search_room_specific_ul_bid")
}


/**
 * Remove the bid about the room with the user who call
 * @param: room id
 */
function remove_bid(room_id) {
    var url = window.location.protocol + "//" + window.location.host + port + "/Bid/removeBidRoomStudent/";
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            var output = JSON.parse(xmlHttp.responseText);
            console.log(output);
            showErrorMessagesPage("createBid", output.message, output.success);
        }
    }
    xmlHttp.open("POST", url, true);
    xmlHttp.withCredentials = true;
    var data = new FormData();
    data.append("room", room_id);
    xmlHttp.send(data);
    get_display_bids(room_id, "search_room_specific_ul_bid")
}
//////////////////////////////////////////////////////////////////////////////
/*
 *Routing student
 */
//////////////////////////////////////////////////////////////////////////////
/**
 * When only the address of the server is enter, redirection to the connection page (logout)
 */
page('/', function() {
    page('/connection');
});

/**
 * This page disconnect the user when he is connected
 */
page('/connection', function() {
    logout();
});


/**
 * Display the profile page
 */
page('/profile', function() {
    if ("studentview" === globa_view) {
        console.log("displayProfile");
        display_specific_div("student_view_list_elements", "profile");
        countUnreadMessages("student_");
        dataProfile("profile");
        display_specific_div('profile_student_list_form', undefined);
    }
});


/**
 * Display the room page
 */
page('/Room', function() {
    if ("studentview" === globa_view) {
        console.log("displayRoom");
        display_specific_div("student_view_list_elements", "Room");
        get_room_data();
        countUnreadMessages("student_");
    }
});


/**
 * Display the agreement page
 */
page('/Agreement', function() {
    if ("studentview" === globa_view) {
        console.log("displayagreement");
        display_specific_div("student_view_list_elements", "Agreement");
        countUnreadMessages("student_");
        getAgreements();
        document.getElementById("Agreement_Room_specific").style.display = "none";
        document.getElementById("Room_upload_file_agreement").style.display = "none";

    }
});

/**
 * Display the search_room page
 */
page('/search_room', function() {
    if ("studentview" === globa_view) {
        console.log("displaysearch_room");
        display_specific_div("student_view_list_elements", "search_room");
        countUnreadMessages("student_");
        display_specific_div("search_room_option", "search_room_table");
        display_search_room_table("search_", true);
    }
});


/**
 * Display the list of inicidences page
 */
page('/inicidence_list', function() {
    if ("studentview" === globa_view) {
        console.log("displayIncidence");
        display_specific_div("student_view_list_elements", "incidence");
        display_specific_div("incidence", "student_inicidence_list");
        countUnreadMessages("student_");
        getIncidences("student_");
    }
});


/**
 * Display the list of inicidences page
 */
page('/inicidence_create', function() {
    if ("studentview" === globa_view) {
        console.log("displayIncidence");
        display_specific_div("student_view_list_elements", "incidence");
        display_specific_div("incidence", "student_inicidence_create");
        countUnreadMessages("student_");
    }
});


/**
 * Display the message page
 */
page('/message', function() {
    if ("studentview" === globa_view) {
        console.log("displayMessage");
        display_specific_div("student_view_list_elements", "message");
        countUnreadMessages("student_");
        getMessages();
        OpenAllMessages();
    }
});


/**
 * Display the message page
 */
page('/rent', function() {
    if ("studentview" === globa_view) {
        console.log("displayRent");
        display_specific_div("student_view_list_elements", "rent");
        countUnreadMessages("student_");
        getRents();
    }
});
