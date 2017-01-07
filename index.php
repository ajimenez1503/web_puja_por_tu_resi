<!-- /**
  * @author antonio Jimenez (softwarejimenez)
    * @version 0.1
 */-->

<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <script src="//code.jquery.com/jquery-1.12.0.min.js"></script>
    <script src="//code.jquery.com/jquery-migrate-1.2.1.min.js"></script>

    <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>

    <!-- Latest compiled and minified CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
    <!-- Latest compiled and minified JavaScript -->
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script>

    <title>Puja por tu resi</title>
    <link href="client.css" type="text/css" rel="stylesheet">
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
	<script src="src/page.js"></script>
    <script src="src/lib.js"></script>
    <script src="client.js" ></script>
    <script async defer  src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDau09DcBHg-wQ8wHUsl6SUCYOPPlDFiWQ&callback=initMap"></script>
    <link rel="icon" type="image/ico" href="img/logo.ico">

    <script id="welcomeview" type=”text/view”>
    <div class="header_welcomeview">
        <div class="header_welcomeview_left">
            <img class="img-responsive" src="img/logo2.png" alt="log and slogan">
        </div>
        <div class="header_welcomeview_right">
            <form id="login-form" role="form" action="javascript:void(0);" method="post">
                <table >
                    <tr>
                        <td>
                        <div class="header_welcomeview_right_form">
                            <input required name="_username" id="loginUsername" type="text" tabindex="1" class="form-control" placeholder="username"  value="12345678A" required>
                        </div>
                        </td>
                        <td>
                        <div class="header_welcomeview_right_form">
                            <input required name="_password" id="loginPassword" type="text" pattern=".{8,8}" tabindex="2" class="form-control" placeholder="Contraseña"  value="password" required>
                        </div>
                        </td>
                        <td>
                        <div class="header_welcomeview_right_form">
                                <input type="submit" onClick="login()" name="login-submit" id="login-submit" tabindex="4" class="form-control btn btn-login" value="Iniciar sesion">
                        </div>
                        </td>
                    </tr>
                </table>
            </form>
        </div>
    </div>
    <div class="container">
        <div class="row margin_top">
            <div class="col-md-6 col-md-offset-3">
                <div class="panel panel-login">
                    <div class="panel-body">
                        <div class="row">
                            <div class="col-lg-12">
                                <form id="register-form" action="javascript:void(0);" method="post" role="form" >
                                    <div class="form-group">
                                        <input id="signupusername" type="text" name="username" required tabindex="1" class="form-control" placeholder="DNI" required>
                                    </div>
                                    <div class="form-group">
                                        <input id="signupName" type="text" name="name" required tabindex="1" class="form-control" placeholder="Nombre" required>
                                    </div>
                                    <div class="form-group">
                                        <input type="email" name="email" id="signupEmail" tabindex="1" class="form-control" placeholder="Email" required>
                                    </div>
                                    <div class="form-group">
                                        <input type="password" name="password" pattern=".{8,8}" id="signupPassword" tabindex="2" class="form-control" placeholder="Contraseña" required>
                                    </div>
                                    <div class="form-group">
                                        <input type="password" name="confirm-password" pattern=".{8,8}" id="signupRepeatPSW" tabindex="2" class="form-control" placeholder="Confirma Contraseña" required>
                                    </div>
                                    <div class="form-group">
                                        <div class="row">
                                            <div class="col-sm-6 col-sm-offset-3">
                                                <input type="submit" onClick="signup()" name="register-submit" id="register-submit" tabindex="4" class="form-control btn btn-submit" value="Registrar">
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="showErrorMessageWelcomePage" style="display:none;">
            <strong>
                <center>
                    <p id="errorMessageWelcomePage"> Error </p>
                </center>
            </strong>
        </div>
    </div>
    </script> <!-- end welcomeview -->
    <script id="studentview" type=”text/view”>
    <nav class="nav nav-pills nav-justified">
		<div class="container-fluid">
			<ul class="nav navbar-nav">
				<li onclick="page('/home')"> <a> <label>Home</label ></a> </li>
				<li onclick="page('/perfil')"> <a>  <label>Perfil</label> </a> </li>
                <li onclick="page('/search_room')"> <a>  <label>Buscar Habitacion</label> </a> </li>
                <li onclick="page('/Room')"> <a>  <label>Mi Habitacion</label> </a> </li>
                <li onclick="page('/inicidence')"> <a> <label>Incidencias</label> </a> </li>
                <li onclick="page('/message')"> <a> <label>Mensajes <span id="numberMessage">0</span></label> </a> </li>
                <li onclick="page('/rent')"> <a> <label>Pagos</label> </a> </li>
				<li onclick="page('/connection')"> <a> <label>Log out</label> </a> </li>
			</ul>
		</div>
	</nav> <!-- end nav -->
    <div id="home">
        <div class="row">
            <div class="col-sm-6">
                <div class="panel-group">
                    <div class="panel with panel-primary class">
                        <div class="panel-heading">Informacion usuario</div>
                        <div class="panel-body">
                            <label>Nombre:   </label><label id="homeStudentName"></label></br>
                            <label>Usuario:   </label><label id="homeStudentUSername"></label></br>
                            <label>Email:   </label><label id="homeStudentEmail"></label></br>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div> <!-- end home -->

    <div id="perfil">

        <div class="elememt_profile">

            <div class="col-sm-3">
                <div class="panel-group">
                    <div class="panel with panel-primary class">
                        <div class="panel-heading">Informacion usuario</div>
                        <div class="panel-body">
                            <label>Nombre:   </label><label id="profileStudentName"></label></br>
                            <label>Usuario:   </label><label id="profileStudentUSername"></label></br>
                            <label>Email:   </label><label id="profileStudentEmail"></label></br>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-sm-3">
                <button onclick="show_from_update('email')" type="button" class="button_margin_room btn btn-success">Cambiar email</button>
                <button onclick="show_from_update('password')" type="button" class="button_margin_room btn btn-warning">Cambiar contraseña</button>
            </div>

            <div class="col-sm-3">
                <div class="panel-group">
                    <div class="panel with panel-primary class">
                        <div class="panel-heading">Puntos</div>
                        <div class="panel-body">
                            <label>Puntos:   </label><label id="profileStudentPoint"></label></br>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <div id="from_update_password">
            <div class="col-sm-7">
                <div class="row">
                    <div class="col-md-10 col-md-offset-5">
                        <div class="panel panel-login">
                            <div class="panel-body">
                                <div class="row">
                                    <div class="col-lg-12">
                                        <form action="javascript:void(0);" method="post" role="form" >
                                            <div class="form-group">
                                                <input  id="formChangePasswordOld" type="password" name="password" pattern=".{8,8}" tabindex="2" class="form-control" placeholder="contraseña actual" required>
                                            </div>
                                            <div class="form-group">
                                                <input type="password" name="confirm-password" pattern=".{8,8}" id="formChangePasswordNew" tabindex="2" class="form-control" placeholder="Nueva contraeña" required>
                                            </div>
                                            <div class="form-group">
                                                <input type="password" name="confirm-password" pattern=".{8,8}" id="formChangePasswordNewRepeat" tabindex="2" class="form-control" placeholder="Confirmar nueva contraseña" required>
                                            </div>
                                            <div class="form-group">
                                                <div class="row">
                                                    <div class="col-sm-6 col-sm-offset-3">
                                                        <input type="submit" onClick="changePassword()" name="register-submit" id="register-submit" tabindex="4" class="form-control btn btn-submit" value="Cambiar contraseña">
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div id="from_update_email">
            <div class="col-sm-7">
                <div class="row">
                    <div class="col-md-10 col-md-offset-5">
                        <div class="panel panel-login">
                            <div class="panel-body">
                                <div class="row">
                                    <div class="col-lg-12">
                                        <form action="javascript:void(0);" method="post" role="form" >
                                            <div class="form-group">
                                                <input  id="formChangeEmail" type="email" name="email"  tabindex="2" class="form-control" placeholder="nuevo email" required>
                                            </div>
                                            <div class="form-group">
                                                <div class="row">
                                                    <div class="col-sm-6 col-sm-offset-3">
                                                        <input type="submit" onClick="changeEmail()" name="register-submit" id="register-submit" tabindex="4" class="form-control btn btn-submit" value="Cambiar  email">
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div> <!-- end Profile -->



    <div id="search_room_global">

        <div id="search_room_form">
            <form class="form-horizontal" role="form">
                <fieldset>
                    <div class="form-group">
                        <label class="col-sm-3 control-label" >Equipamiento: </label>
                        <div id="search_equipment" class="col-sm-9">
                            <i id="search_icon_school" onclick="selected_icon_search('search_icon_school')" title="habitacion estudio"  class="icon material-icons selected">school</i>
                            <i id="search_icon_gym" onclick="selected_icon_search('search_icon_gym')"title="gym" class="icon material-icons">fitness_center</i>
                            <i id="search_icon_restaurant" onclick="selected_icon_search('search_icon_restaurant')" title="cantina"class="icon material-icons">restaurant_menu</i>
                            <i id="search_icon_wifi" onclick="selected_icon_search('search_icon_wifi')"title="wifi" class="icon fa fa-wifi" aria-hidden="true"></i>
                            <i id="search_icon_laundry" onclick="selected_icon_search('search_icon_laundry')"title="lavanderia" class="icon material-icons">local_laundry_service</i>
                            <i  id="search_icon_heating" onclick="selected_icon_search('search_icon_heating')"title="calefaccion" class="icon fa fa-thermometer-full" aria-hidden="true"></i> <!-- heating -->
                            <img id="search_icon_elevator" onclick="selected_icon_search('search_icon_elevator')" title="ascensor" class="selected icon_img" src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCA1MDMuNjA3IDUwMy42MDciIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUwMy42MDcgNTAzLjYwNzsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSIyNHB4IiBoZWlnaHQ9IjI0cHgiPgo8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxIDEpIj4KCTxnPgoJCTxnPgoJCQk8cGF0aCBkPSJNNDc3LjQyNi0xSDI0LjE4QzkuOTExLTEtMSw5LjkxMS0xLDI0LjE4djQ1My4yNDZjMCwxNC4yNjksMTAuOTExLDI1LjE4LDI1LjE4LDI1LjE4aDgzLjkzNGgxNDIuNjg5aDE0Mi42ODloODMuOTM0ICAgICBjMTQuMjY5LDAsMjUuMTgtMTAuOTExLDI1LjE4LTI1LjE4VjI0LjE4QzUwMi42MDcsOS45MTEsNDkxLjY5NS0xLDQ3Ny40MjYtMXogTTI0Mi40MSw0ODUuODJIMTE2LjUwOFYxMjQuOTAyICAgICBjMC01LjAzNiwzLjM1Ny04LjM5Myw4LjM5My04LjM5M0gyNDIuNDFWNDg1LjgyeiBNMjU5LjE5Nyw0ODUuODJWMTE2LjUwOGgxMTcuNTA4YzUuMDM2LDAsOC4zOTMsMy4zNTcsOC4zOTMsOC4zOTNWNDg1LjgyICAgICBIMjU5LjE5N3ogTTQ4NS44Miw0NzcuNDI2YzAsNS4wMzYtMy4zNTcsOC4zOTMtOC4zOTMsOC4zOTNoLTc1LjU0MVYxMjQuOTAyYzAtMTQuMjY5LTEwLjkxMS0yNS4xOC0yNS4xOC0yNS4xOEgyNTAuODAzSDEyNC45MDIgICAgIGMtMTQuMjY5LDAtMjUuMTgsMTAuOTExLTI1LjE4LDI1LjE4VjQ4NS44MkgyNC4xOGMtNS4wMzYsMC04LjM5My0zLjM1Ny04LjM5My04LjM5M1YyNC4xOGMwLTUuMDM2LDQuMTk3LTguMzkzLDguMzkzLTguMzkzICAgICBoNDUzLjI0NmM1LjAzNiwwLDguMzkzLDMuMzU3LDguMzkzLDguMzkzVjQ3Ny40MjZ6IiBmaWxsPSIjMDAwMDAwIi8+CgkJCTxwYXRoIGQ9Ik00NjAuNjM5LDI1OS4xOTdoLTMzLjU3NGMtNS4wMzYsMC04LjM5MywzLjM1Ny04LjM5Myw4LjM5M3YzMy41NzR2MzMuNTc0YzAsNS4wMzYsMy4zNTcsOC4zOTMsOC4zOTMsOC4zOTNoMzMuNTc0ICAgICBjNS4wMzYsMCw4LjM5My0zLjM1Nyw4LjM5My04LjM5M3YtMzMuNTc0VjI2Ny41OUM0NjkuMDMzLDI2Mi41NTQsNDY1LjY3NSwyNTkuMTk3LDQ2MC42MzksMjU5LjE5N3ogTTQzNS40NTksMjc1Ljk4NGgxNi43ODcgICAgIHYxNi43ODdoLTE2Ljc4N1YyNzUuOTg0eiBNNDUyLjI0NiwzMjYuMzQ0aC0xNi43ODd2LTE2Ljc4N2gxNi43ODdWMzI2LjM0NHoiIGZpbGw9IiMwMDAwMDAiLz4KCQkJPHBhdGggZD0iTTMwOS41NTcsMzIuNTc0SDE5Mi4wNDljLTUuMDM2LDAtOC4zOTMsMy4zNTctOC4zOTMsOC4zOTN2MzMuNTc0YzAsNS4wMzYsMy4zNTcsOC4zOTMsOC4zOTMsOC4zOTNoMTE3LjUwOCAgICAgYzUuMDM2LDAsOC4zOTMtMy4zNTcsOC4zOTMtOC4zOTNWNDAuOTY3QzMxNy45NTEsMzUuOTMxLDMxNC41OTMsMzIuNTc0LDMwOS41NTcsMzIuNTc0eiBNMzAxLjE2NCw2Ni4xNDhIMjAwLjQ0M1Y0OS4zNjFoMTAwLjcyMSAgICAgVjY2LjE0OHoiIGZpbGw9IiMwMDAwMDAiLz4KCQk8L2c+Cgk8L2c+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg==" /><!-- elevator -->
                            <img id="search_icon_24h" onclick="selected_icon_search('search_icon_24h')" title="recepcion 24 horas "class="icon_img" src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjI0cHgiIGhlaWdodD0iMjRweCI+CjxnPgoJPGc+CgkJPHBhdGggZD0iTTQ5OC45NDYsMjk0Ljk1OWMtNS41MjEtMS4xMTYtMTAuOTAyLDIuNDU1LTEyLjAxOCw3Ljk3N0M0NjQuODM0LDQxMi4yNTYsMzY3LjcxNSw0OTEuNjAyLDI1Niw0OTEuNjAyICAgIGMtMTI5LjkxMSwwLTIzNS42MDItMTA1LjY5LTIzNS42MDItMjM1LjYwMlMxMjYuMDg5LDIwLjM5OCwyNTYsMjAuMzk4YzYxLjI4NywwLDEyMC4wNDEsMjMuOTcsMTYzLjgxOCw2Ni4yOTVoLTI2LjM2MSAgICBjLTUuNjMzLDAtMTAuMTk5LDQuNTY2LTEwLjE5OSwxMC4xOTljMCw1LjYzMyw0LjU2NiwxMC4xOTksMTAuMTk5LDEwLjE5OWg1MS4yMjljNS42MzMsMCwxMC4xOTktNC41NjYsMTAuMTk5LTEwLjE5OVY0NS42NjQgICAgYzAtNS42MzMtNC41NjYtMTAuMTk5LTEwLjE5OS0xMC4xOTljLTUuNjMzLDAtMTAuMTk5LDQuNTY2LTEwLjE5OSwxMC4xOTl2MjYuODQ4QzM4Ni44NywyNi4yMjgsMzIyLjgyMywwLDI1NiwwICAgIEMxODcuNjIsMCwxMjMuMzMzLDI2LjYyOCw3NC45OCw3NC45OEMyNi42MjgsMTIzLjMzMywwLDE4Ny42MiwwLDI1NnMyNi42MjgsMTMyLjY2Nyw3NC45OCwxODEuMDIgICAgQzEyMy4zMzMsNDg1LjM3MiwxODcuNjIsNTEyLDI1Niw1MTJjNTkuNDM4LDAsMTE3LjM1Mi0yMC44MywxNjMuMDc0LTU4LjY1MmM0NS4xMTYtMzcuMzIxLDc2LjMxNS04OS4zMDQsODcuODQ5LTE0Ni4zNzIgICAgQzUwOC4wMzksMzAxLjQ1NSw1MDQuNDY3LDI5Ni4wNzUsNDk4Ljk0NiwyOTQuOTU5eiIgZmlsbD0iIzAwMDAwMCIvPgoJPC9nPgo8L2c+CjxnPgoJPGc+CgkJPHBhdGggZD0iTTUwMS44MDEsMjQ1LjgwMWMtNS42MzMsMC0xMC4xOTksNC41NjYtMTAuMTk5LDEwLjE5OWMwLDIuMjgxLTAuMDMzLDQuNTg1LTAuMDk4LDYuODQ4ICAgIGMtMC4xNjEsNS42MzEsNC4yNzMsMTAuMzI2LDkuOTAzLDEwLjQ4N2MwLjEsMC4wMDIsMC4xOTgsMC4wMDQsMC4yOTcsMC4wMDRjNS40OTcsMCwxMC4wMzEtNC4zNzYsMTAuMTktOS45MDcgICAgYzAuMDctMi40NTcsMC4xMDYtNC45NTcsMC4xMDYtNy40M0M1MTIsMjUwLjM2Nyw1MDcuNDM0LDI0NS44MDEsNTAxLjgwMSwyNDUuODAxeiIgZmlsbD0iIzAwMDAwMCIvPgoJPC9nPgo8L2c+CjxnPgoJPGc+CgkJPHBhdGggZD0iTTI0OC44NTgsMzUwLjQxNkgxNDUuMjM0di0yMC4xNGMwLTQzLjIwNCwxMDkuMTQ3LTY1LjI5MywxMDkuMTQ3LTEzNS4xMzRjMC0zNS4wODItMjcuMjg2LTYyLjM2OS02NC42NDQtNjIuMzY5ICAgIGMtMzQuNDM0LDAtNjEuMDcsMjIuNzM5LTYxLjA3LDUzLjkyNGMwLDkuNzQ1LDMuMjQ4LDEzLjMxOSw5Ljc0NSwxMy4zMTljNy40NzEsMCwxMS4zNjktNC41NDgsMTEuMzY5LTguNzcxICAgIGMwLTI1LjY2MiwxNi44OTItMzguMzMyLDM5LjMwNi0zOC4zMzJjMjkuODg2LDAsNDMuODU0LDIyLjQxNCw0My44NTQsNDIuODhjMCw1Ni44NDYtMTA5Ljc5Nyw4MC41Ni0xMDkuNzk3LDEzNC40ODR2MzEuNTEgICAgYzAsNS4xOTgsNS44NDcsOC40NDYsMTAuMDcsOC40NDZoMTE1LjY0NGM0LjIyMywwLDcuNzk2LTQuODcyLDcuNzk2LTEwLjA3MUMyNTYuNjU0LDM1NC45NjQsMjUzLjA4MSwzNTAuNDE2LDI0OC44NTgsMzUwLjQxNnoiIGZpbGw9IiMwMDAwMDAiLz4KCTwvZz4KPC9nPgo8Zz4KCTxnPgoJCTxwYXRoIGQ9Ik0zODguNTM4LDI5My44OTNoLTE3Ljg2NnYtNjIuNjk1YzAtNS41MjMtNS41MjMtOC4xMjEtMTAuNzItOC4xMjFjLTUuNTIzLDAtMTAuNzE5LDIuNTk5LTEwLjcxOSw4LjEyMXY2Mi42OTVoLTYzLjY2OSAgICBsNzUuMDM5LTE0OC4xMjdjMC42NS0xLjYyNSwwLjk3NS0yLjkyNCwwLjk3NS00LjIyM2MwLTUuMTk4LTYuMTczLTguNzcxLTEwLjM5NS04Ljc3MWMtMy44OTgsMC03Ljc5NiwxLjk0OS0xMC4wNzEsNi40OTcgICAgbC04MS41MzUsMTYwLjc5N2MtMC45NzQsMS42MjUtMS4yOTksMy41NzMtMS4yOTksNS41MjNjMCw0Ljg3MiwyLjkyNCw4Ljc3MSw4LjQ0Niw4Ljc3MWg4Mi41MXY0Ny40MjYgICAgYzAsNS41MjIsNS4xOTgsOC40NDYsMTAuNzE5LDguNDQ2YzUuMTk4LDAsMTAuNzItMi45MjQsMTAuNzItOC40NDZ2LTQ3LjQyNmgxNy44NjZjNC44NzIsMCw4LjEyMS01LjE5OCw4LjEyMS0xMC4zOTUgICAgQzM5Ni42NTgsMjk5LjA5MSwzOTQuMDU5LDI5My44OTMsMzg4LjUzOCwyOTMuODkzeiIgZmlsbD0iIzAwMDAwMCIvPgoJPC9nPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=" /><!-- 24hours -->
                            <i  id="search_icon_tv" onclick="selected_icon_search('search_icon_tv')" title="television" class="icon fa fa-television" aria-hidden="true"></i>
                            <i  id="search_icon_bath" onclick="selected_icon_search('search_icon_bath')" title="baño" class="icon fa fa-bath" aria-hidden="true"></i>
                            <img id="search_icon_desk" onclick="selected_icon_search('search_icon_desk')" title="escritorio" class="icon_img" src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCAyOTUuMjQgMjk1LjI0IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAyOTUuMjQgMjk1LjI0OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjI0cHgiIGhlaWdodD0iMjRweCI+CjxnPgoJPGc+CgkJPGc+CgkJCTxwYXRoIGQ9Ik0yMzMuMzM1LDIxNC4yODd2LTkuNTI0aDQ3LjYxN3YwYzcuODc2LDAsMTQuMjg2LTYuNDEsMTQuMjg2LTE0LjI4NnYtNzYuMTljMC03Ljg3Ni02LjQxLTE0LjI4Ni0xNC4yODYtMTQuMjg2SDE0Ny42MTkgICAgIGMtNy44NzYsMC0xNC4yODYsNi40MS0xNC4yODYsMTQuMjg2djc2LjE5YzAsNy44NzYsNi40MSwxNC4yODYsMTQuMjg2LDE0LjI4Nmg0Ny42MTl2OS41MjRoLTgwLjk1MnYtNC43NjIgICAgIGMwLTcuODc2LTYuNjg2LTE0LjI4Ni0xNC41NjItMTQuMjg2aC0xNi4xMWwtNDguOTI4LTc5LjY0OGMyLjEzOC0zLjA4MSwzLjQxLTYuODA1LDMuNDEtMTAuODI5YzAtMS4xNzEtMC4xNDMtMi4zMDUtMC4zNDgtMy40MTkgICAgIGwxOS45MzMtMzYuNTQyYzEuODM4LDkuMDUyLDYuODc2LDE3LjEzOCwxNC41MTksMjIuODUybDMuMTEsMi4zMjRsMTEuNzU3LTEwLjQ1MmMyLjU3NiwwLjkzMyw1LjIxNCwxLjQyOSw3Ljg5NSwxLjQyOSAgICAgYzEzLjEyOSwwLDIzLjgxLTEwLjY4MSwyMy44MS0yMy44MWMwLTEuNzI5LTAuMjcxLTMuNDY3LTAuNjc2LTUuMTk1bDExLjc4MS0xMC40NzFsLTEuOTQzLTMuMzY3ICAgICBjLTYuODA1LTExLjc1Ny0xOS40MzgtMTkuMDYyLTMyLjk3MS0xOS4wNjJjLTAuODk1LDAtMS43NzYsMC4wNzEtMi42NTcsMC4xMzNsLTE2LjEtMTYuMUw0MC44MiwzMi41NzJsNi41NTcsOC43NDNMMTYuMDg3LDg2LjAyICAgICBDNi45OSw4Ny40NTMsMCw5NS4yNzcsMCwxMDQuNzYzYzAsNy4xNDMsMy45OTUsMTMuMzA1LDkuODI5LDE2LjU2MmwzOS4zODEsNzMuOTE0SDMzLjA1N2MtNy44NzYsMC0xNC4wMSw2LjQxLTE0LjAxLDE0LjI4NiAgICAgdjQuNzYySDB2MjguNTcxaDE0LjI4NnY1Mi4zODFoOS41MjR2LTUyLjM4MWg5LjUyNHY1Mi4zODFoOS41MjR2LTUyLjM4MWgyMDkuNTI0djUyLjM4MWg5LjUyNHYtNTIuMzgxaDkuNTI0djUyLjM4MWg5LjUyNCAgICAgdi01Mi4zODFoMTQuMjg2di0yOC41NzFIMjMzLjMzNXogTTE0Mi44NTcsMTE0LjI4N2MwLTIuNjI0LDIuMTM4LTQuNzYyLDQuNzYyLTQuNzYyaDEzMy4zMzNjMi42MjQsMCw0Ljc2MiwyLjEzOCw0Ljc2Miw0Ljc2MiAgICAgdjYxLjkwNUgxNDIuODU3VjExNC4yODd6IE0xOTUuMjM4LDE5NS4yMzloLTQ3LjYxOWMtMi42MjQsMC00Ljc2Mi0yLjEzOC00Ljc2Mi00Ljc2MnYtNC43NjJoMTQyLjg1N3Y0Ljc2MiAgICAgYzAsMi42MjQtMi4xMzgsNC43NjItNC43NjIsNC43NjJoLTQ3LjYxOUgxOTUuMjM4eiBNMjIzLjgxLDIwNC43NjN2OS41MjRoLTE5LjA0OHYtOS41MjRIMjIzLjgxeiBNOTYuMjQzLDcxLjM3MmwxMi43LTExLjI5ICAgICBDMTA3LjY3MSw2Ni4xNDksMTAyLjUzOCw3MC44MTEsOTYuMjQzLDcxLjM3MnogTTk0Ljk2NywyOC41NzNjOC44NTctMC4wMDEsMTcuMjA0LDQuMTgsMjIuNTgxLDExLjExOEw3NC45ODYsNzcuNTI1ICAgICBjLTUuNS01LjM1Mi04LjU5LTEyLjYtOC41OS0yMC4zODFDNjYuMzk2LDQxLjM4Nyw3OS4yMSwyOC41NzMsOTQuOTY3LDI4LjU3M3ogTTc1LjYxOSwxNS45NjhsNS42NjIsNS42NjIgICAgIEM3MS43LDI1LjMzNCw2My45NjcsMzIuNzcyLDU5LjkyOSw0Mi4xODdsLTYuMDYyLTguMDlMNzUuNjE5LDE1Ljk2OHogTTUzLjM4NSw0OS4zMjlsMS4wOTEsMS40NTNMMzIuNDE5LDkxLjIyNSAgICAgYy0xLjYyOS0xLjYxLTMuNTQ4LTIuOTA1LTUuNjY3LTMuODQ4TDUzLjM4NSw0OS4zMjl6IE05LjUyNCwxMDQuNzYzYzAtNS4yNTIsNC4yNzEtOS41MjQsOS41MjQtOS41MjQgICAgIGM1LjI1MiwwLDkuNTI0LDQuMjcxLDkuNTI0LDkuNTI0YzAsNS4yNTItNC4yNzEsOS41MjQtOS41MjQsOS41MjRDMTMuNzk1LDExNC4yODcsOS41MjQsMTEwLjAxNiw5LjUyNCwxMDQuNzYzeiBNMjEuNzk1LDEyMy41MzQgICAgIGMxLjk2Ny0wLjI4NiwzLjgyNC0wLjg2Miw1LjU0OC0xLjcwNWw0NS4wOTUsNzMuNDFINjBMMjEuNzk1LDEyMy41MzR6IE0zMy4wNTcsMjA0Ljc2M2g2Ni42NjdjMi42MjQsMCw1LjAzOCwyLjEzOCw1LjAzOCw0Ljc2MiAgICAgdjQuNzYyaC03Ni4xOXYtNC43NjJoLTAuMDAxQzI4LjU3MSwyMDYuOTAxLDMwLjQzMywyMDQuNzYzLDMzLjA1NywyMDQuNzYzeiBNMjg1LjcxNCwyMzMuMzM1aC00Ljc2MmgtMjguNTcxSDQyLjg1N0gxNC4yODYgICAgIEg5LjUyNHYtOS41MjRoOS4yNDhoOTUuMjM4aDgxLjIyOWgzOC4wOTVoNTIuMzhWMjMzLjMzNXoiIGZpbGw9IiMwMDAwMDAiLz4KCQkJPHJlY3QgeD0iMTM4LjA5NSIgeT0iODAuOTUzIiB3aWR0aD0iMTUyLjM4MSIgaGVpZ2h0PSI5LjUyNCIgZmlsbD0iIzAwMDAwMCIvPgoJCQk8cGF0aCBkPSJNMjA0Ljc2MiwwLjAwMWgtMzguMDk1djc2LjE5aDM4LjA5NVYwLjAwMXogTTE5NS4yMzgsNjYuNjY4SDE3Ni4xOVY0Ny42MmgxOS4wNDhWNjYuNjY4eiBNMTk1LjIzOCwzOC4wOTZIMTc2LjE5VjkuNTI1ICAgICBoMTkuMDQ4VjM4LjA5NnoiIGZpbGw9IiMwMDAwMDAiLz4KCQkJPGNpcmNsZSBjeD0iMTg1LjcxNCIgY3k9IjU3LjE0NCIgcj0iNC43NjIiIGZpbGw9IiMwMDAwMDAiLz4KCQkJPHBhdGggZD0iTTI0Ny42MTksMC4wMDFoLTM4LjA5NXY3Ni4xOWgzOC4wOTVWMC4wMDF6IE0yMTkuMDQ3LDkuNTI1aDE5LjA0OHYyOC41NzFoLTE5LjA0OFY5LjUyNXogTTIzOC4wOTYsNjYuNjY4aC0xOS4wNDhWNDcuNjIgICAgIGgxOS4wNDhWNjYuNjY4eiIgZmlsbD0iIzAwMDAwMCIvPgoJCQk8Y2lyY2xlIGN4PSIyMjguNTcxIiBjeT0iNTcuMTQ0IiByPSI0Ljc2MiIgZmlsbD0iIzAwMDAwMCIvPgoJCQk8cGF0aCBkPSJNMjkwLjQ3NiwwLjAwMWgtMzguMDk1djc2LjE5aDM4LjA5NVYwLjAwMXogTTI2MS45MDQsOS41MjVoMTkuMDQ4djI4LjU3MWgtMTkuMDQ4VjkuNTI1eiBNMjgwLjk1Myw2Ni42NjhoLTE5LjA0OFY0Ny42MiAgICAgaDE5LjA0OFY2Ni42Njh6IiBmaWxsPSIjMDAwMDAwIi8+CgkJCTxjaXJjbGUgY3g9IjI3MS40MjkiIGN5PSI1Ny4xNDQiIHI9IjQuNzYyIiBmaWxsPSIjMDAwMDAwIi8+CgkJPC9nPgoJPC9nPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=" /><!--desk -->
                            <img id="search_icon_wardrove" onclick="selected_icon_search('search_icon_wardrove')" title="armario"  class="icon_img" src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDYwIDYwIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA2MCA2MDsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSIyNHB4IiBoZWlnaHQ9IjI0cHgiPgo8Zz4KCTxnPgoJCTxwYXRoIGQ9Ik05LDUzaDE5VjNIOVY1M3ogTTExLDVoMTV2NDZIMTFWNXoiIGZpbGw9IiMwMDAwMDAiLz4KCQk8cGF0aCBkPSJNMTUsMTFoN2MwLjU1MiwwLDEtMC40NDgsMS0xcy0wLjQ0OC0xLTEtMWgtN2MtMC41NTIsMC0xLDAuNDQ4LTEsMVMxNC40NDgsMTEsMTUsMTF6IiBmaWxsPSIjMDAwMDAwIi8+CgkJPHBhdGggZD0iTTE1LDE0aDdjMC41NTIsMCwxLTAuNDQ4LDEtMXMtMC40NDgtMS0xLTFoLTdjLTAuNTUyLDAtMSwwLjQ0OC0xLDFTMTQuNDQ4LDE0LDE1LDE0eiIgZmlsbD0iIzAwMDAwMCIvPgoJCTxwYXRoIGQ9Ik0yMywxNmMwLTAuNTUyLTAuNDQ4LTEtMS0xaC03Yy0wLjU1MiwwLTEsMC40NDgtMSwxczAuNDQ4LDEsMSwxaDdDMjIuNTUyLDE3LDIzLDE2LjU1MiwyMywxNnoiIGZpbGw9IiMwMDAwMDAiLz4KCQk8cGF0aCBkPSJNMjMsMjhjLTAuNTUyLDAtMSwwLjQ0OC0xLDF2NWMwLDAuNTUyLDAuNDQ4LDEsMSwxczEtMC40NDgsMS0xdi01QzI0LDI4LjQ0OCwyMy41NTIsMjgsMjMsMjh6IiBmaWxsPSIjMDAwMDAwIi8+CgkJPHBhdGggZD0iTTU0LDBIMzFoLTJINnY1NmgydjRoNC42MThsMi00aDguNzY0bDIsNEgzMHYtNGgxdjRoNC42MThsMi00aDguNzY0bDIsNEg1M3YtNGgxVjB6IE0xMS4zODIsNThIMTB2LTJoMi4zODJMMTEuMzgyLDU4eiAgICAgTTE1LjYxOCw1NEg4VjJoMjF2NTJoLTYuNjE4SDE1LjYxOHogTTI4LDU4aC0xLjM4MmwtMS0ySDI4VjU4eiBNMzQuMzgyLDU4SDMzdi0yaDIuMzgyTDM0LjM4Miw1OHogTTM4LjYxOCw1NEgzMVYyaDIxdjUyaC02LjYxOCAgICBIMzguNjE4eiBNNTEsNThoLTEuMzgybC0xLTJINTFWNTh6IiBmaWxsPSIjMDAwMDAwIi8+CgkJPHBhdGggZD0iTTMyLDUzaDE5VjNIMzJWNTN6IE0zNCw1aDE1djQ2SDM0VjV6IiBmaWxsPSIjMDAwMDAwIi8+CgkJPHBhdGggZD0iTTM4LDExaDdjMC41NTIsMCwxLTAuNDQ4LDEtMXMtMC40NDgtMS0xLTFoLTdjLTAuNTUyLDAtMSwwLjQ0OC0xLDFTMzcuNDQ4LDExLDM4LDExeiIgZmlsbD0iIzAwMDAwMCIvPgoJCTxwYXRoIGQ9Ik0zOCwxNGg3YzAuNTUyLDAsMS0wLjQ0OCwxLTFzLTAuNDQ4LTEtMS0xaC03Yy0wLjU1MiwwLTEsMC40NDgtMSwxUzM3LjQ0OCwxNCwzOCwxNHoiIGZpbGw9IiMwMDAwMDAiLz4KCQk8cGF0aCBkPSJNNDYsMTZjMC0wLjU1Mi0wLjQ0OC0xLTEtMWgtN2MtMC41NTIsMC0xLDAuNDQ4LTEsMXMwLjQ0OCwxLDEsMWg3QzQ1LjU1MiwxNyw0NiwxNi41NTIsNDYsMTZ6IiBmaWxsPSIjMDAwMDAwIi8+CgkJPHBhdGggZD0iTTQ2LDI4Yy0wLjU1MiwwLTEsMC40NDgtMSwxdjVjMCwwLjU1MiwwLjQ0OCwxLDEsMXMxLTAuNDQ4LDEtMXYtNUM0NywyOC40NDgsNDYuNTUyLDI4LDQ2LDI4eiIgZmlsbD0iIzAwMDAwMCIvPgoJPC9nPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=" /><!-- wardrove -->

                        </div>
                    </div>
                    <div class="form-group">
                        <div class="row">
                            <label class="col-sm-3 control-label" for="amount">Rango precio:</label>
                            <div class="col-xs-3" >
                                <input type="text" id="amount" readonly style="border:0; color:#f6931f; font-weight:bold;">
                                <div id="slider-range"></div>
                            </div>
                            <div class="col-xs-3">
                                <select class="form-control" name="expiry-year">
                                <option value="17">residencia2017</option>
                                <option value="18">residencia2018</option>
                                <option value="19">residencia2019</option>
                                <option value="20">residencia2020</option>
                                <option value="21">residencia2021</option>
                                <option value="22">residencia2022</option>
                                <option value="23">residencia2023</option>
                                <option value="20">residencia2024</option>
                                <option value="21">residencia2025</option>
                                <option value="22">residencia2026</option>
                                <option value="23">residencia2027</option>
                                </select>
                            </div>
                            <div class="col-xs-3" >
                                <div class="form-group">
                                    <div class="col-sm-offset-3 col-sm-9">
                                        <button type="button" onclick="get_equipment_selected('search_equipment')"  class="btn btn-success">Buscar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr /><!-- Horizontal separator -->
                </fieldset>
            </form>

            <div class="row">

                <div class="col-sm-8">
                    <div class="table_search_room_form">
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                  <th>Nombre</th>
                                  <th>Residencia</th>
                                  <th>Precio</th>
                                  <th>Fecha inicio</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr id="row_room_name_room1" onmouseover="selected_row_table('row_room_name_room1')" onmouseout="out_selected_row_table('row_room_name_room1')" >
                                  <td>room1</td>
                                  <td>residencia2027</td>
                                  <td>500€</td>
                                  <td>1/1/2017</td>
                                </tr>
                                <tr id="row_room_name_room2" onmouseover="selected_row_table('row_room_name_room2')"  onmouseout="out_selected_row_table('row_room_name_room2')">
                                    <td>room2</td>
                                    <td>residencia2023</td>
                                    <td>600€</td>
                                    <td>3/1/2017</td>
                                </tr>
                                <tr id="row_room_name_room3" onmouseover="selected_row_table('row_room_name_room3')" onmouseout="out_selected_row_table('row_room_name_room3')" >
                                    <td>room3</td>
                                    <td>residencia203</td>
                                    <td>400€</td>
                                    <td>1/3/2017</td>
                                </tr>
                                <tr id="row_room_name_room4" onmouseover="selected_row_table('row_room_name_room4')" onmouseout="out_selected_row_table('row_room_name_room4')" >
                                    <td>room4</td>
                                    <td>residencia1</td>
                                    <td>5100€</td>
                                    <td>2/1/2017</td>
                                </tr>
                            </tbody>
                        </table>
                    </div> <!-- end table_search_room -->
                </div>

                <div class="col-sm-4">
                    <div class="panel-group">
                        <div class="panel with panel-primary class">
                            <div class="panel-heading">Mapa Residencia</div>
                            <div id="map_search_room_global"></div>
                        </div>
                    </div>
                </div>

            </div>  <!-- end row -->

        </div> <!-- end search_room_form -->

        <div class="search_room_local">

        </div> <!-- end search_local -->


    </div> <!-- end search_room_global -->


    <div id="Room">
        <button onclick="show_upload_file_agreement()" type="button" class="button_margin_room btn btn-primary">Aceptar y firmar contrato</button>
        <button type="button" class="button_margin_room btn btn-success">Descargar contrato</button>
        <button type="button" class="button_margin_room btn btn-warning">Rechazar habitacion</button>


        <div    id="upload_file_agreement" class="col-sm-7">
            <div class="row">
                <div class="col-md-10 col-md-offset-5">
                    <div class="panel panel-login">
                        <div class="panel-body">
                            <div class="row">
                                <div class="col-lg-12">
                                    <form action="javascript:void(0);" method="post" enctype="multipart/form-data" >
                                        <div class="form-group">
                                            <input type="file" name="file_name"  id="formIncidenceFilename" tabindex="2" class="form-control" placeholder="nombre archivo" required>
                                        </div>
                                        <div class="form-group">
                                            <div class="row">
                                                <div class="col-sm-6 col-sm-offset-3">
                                                    <input type="submit" onClick="upload_file_agreement()" tabindex="4" class="form-control btn btn-submit" value="subir contrato">
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <div class="row">

            <div class="col-sm-6">
                <div class="panel-group">
                    <div class="panel with panel-primary class">
                        <div class="panel-heading">Habitacion</div>
                        <div class="panel-body">
                            <div class="left_room" >
                                <label>Nombre:   </label><label id="RoomStudentName"></label></br>
                                <label>tamaño:   </label><label id="RoomStudentSize"></label></br>
                                <label>planta:   </label><label id="RoomStudentFloor"></label></br>
                                <label>Equipamiento:   </label></br>

                                <label>equipment college:</label></br>
                                <i title="habitacion estudio"  class="icon material-icons">school</i>
                                <i title="gym" class="icon material-icons">fitness_center</i>
                                <i title="cantina"class="icon material-icons">restaurant_menu</i>
                                <i title="wifi" class="icon fa fa-wifi" aria-hidden="true"></i>
                                <i title="lavanderia" class="icon material-icons">local_laundry_service</i>
                                <i  title="calefaccion" class="icon fa fa-thermometer-full" aria-hidden="true"></i> <!-- heating -->
                                <img title="ascensor" class="icon_img" src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCA1MDMuNjA3IDUwMy42MDciIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUwMy42MDcgNTAzLjYwNzsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSIyNHB4IiBoZWlnaHQ9IjI0cHgiPgo8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxIDEpIj4KCTxnPgoJCTxnPgoJCQk8cGF0aCBkPSJNNDc3LjQyNi0xSDI0LjE4QzkuOTExLTEtMSw5LjkxMS0xLDI0LjE4djQ1My4yNDZjMCwxNC4yNjksMTAuOTExLDI1LjE4LDI1LjE4LDI1LjE4aDgzLjkzNGgxNDIuNjg5aDE0Mi42ODloODMuOTM0ICAgICBjMTQuMjY5LDAsMjUuMTgtMTAuOTExLDI1LjE4LTI1LjE4VjI0LjE4QzUwMi42MDcsOS45MTEsNDkxLjY5NS0xLDQ3Ny40MjYtMXogTTI0Mi40MSw0ODUuODJIMTE2LjUwOFYxMjQuOTAyICAgICBjMC01LjAzNiwzLjM1Ny04LjM5Myw4LjM5My04LjM5M0gyNDIuNDFWNDg1LjgyeiBNMjU5LjE5Nyw0ODUuODJWMTE2LjUwOGgxMTcuNTA4YzUuMDM2LDAsOC4zOTMsMy4zNTcsOC4zOTMsOC4zOTNWNDg1LjgyICAgICBIMjU5LjE5N3ogTTQ4NS44Miw0NzcuNDI2YzAsNS4wMzYtMy4zNTcsOC4zOTMtOC4zOTMsOC4zOTNoLTc1LjU0MVYxMjQuOTAyYzAtMTQuMjY5LTEwLjkxMS0yNS4xOC0yNS4xOC0yNS4xOEgyNTAuODAzSDEyNC45MDIgICAgIGMtMTQuMjY5LDAtMjUuMTgsMTAuOTExLTI1LjE4LDI1LjE4VjQ4NS44MkgyNC4xOGMtNS4wMzYsMC04LjM5My0zLjM1Ny04LjM5My04LjM5M1YyNC4xOGMwLTUuMDM2LDQuMTk3LTguMzkzLDguMzkzLTguMzkzICAgICBoNDUzLjI0NmM1LjAzNiwwLDguMzkzLDMuMzU3LDguMzkzLDguMzkzVjQ3Ny40MjZ6IiBmaWxsPSIjMDAwMDAwIi8+CgkJCTxwYXRoIGQ9Ik00NjAuNjM5LDI1OS4xOTdoLTMzLjU3NGMtNS4wMzYsMC04LjM5MywzLjM1Ny04LjM5Myw4LjM5M3YzMy41NzR2MzMuNTc0YzAsNS4wMzYsMy4zNTcsOC4zOTMsOC4zOTMsOC4zOTNoMzMuNTc0ICAgICBjNS4wMzYsMCw4LjM5My0zLjM1Nyw4LjM5My04LjM5M3YtMzMuNTc0VjI2Ny41OUM0NjkuMDMzLDI2Mi41NTQsNDY1LjY3NSwyNTkuMTk3LDQ2MC42MzksMjU5LjE5N3ogTTQzNS40NTksMjc1Ljk4NGgxNi43ODcgICAgIHYxNi43ODdoLTE2Ljc4N1YyNzUuOTg0eiBNNDUyLjI0NiwzMjYuMzQ0aC0xNi43ODd2LTE2Ljc4N2gxNi43ODdWMzI2LjM0NHoiIGZpbGw9IiMwMDAwMDAiLz4KCQkJPHBhdGggZD0iTTMwOS41NTcsMzIuNTc0SDE5Mi4wNDljLTUuMDM2LDAtOC4zOTMsMy4zNTctOC4zOTMsOC4zOTN2MzMuNTc0YzAsNS4wMzYsMy4zNTcsOC4zOTMsOC4zOTMsOC4zOTNoMTE3LjUwOCAgICAgYzUuMDM2LDAsOC4zOTMtMy4zNTcsOC4zOTMtOC4zOTNWNDAuOTY3QzMxNy45NTEsMzUuOTMxLDMxNC41OTMsMzIuNTc0LDMwOS41NTcsMzIuNTc0eiBNMzAxLjE2NCw2Ni4xNDhIMjAwLjQ0M1Y0OS4zNjFoMTAwLjcyMSAgICAgVjY2LjE0OHoiIGZpbGw9IiMwMDAwMDAiLz4KCQk8L2c+Cgk8L2c+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg==" /><!-- elevator -->
                                <img title="recepcion 24 horas "class="icon_img" src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjI0cHgiIGhlaWdodD0iMjRweCI+CjxnPgoJPGc+CgkJPHBhdGggZD0iTTQ5OC45NDYsMjk0Ljk1OWMtNS41MjEtMS4xMTYtMTAuOTAyLDIuNDU1LTEyLjAxOCw3Ljk3N0M0NjQuODM0LDQxMi4yNTYsMzY3LjcxNSw0OTEuNjAyLDI1Niw0OTEuNjAyICAgIGMtMTI5LjkxMSwwLTIzNS42MDItMTA1LjY5LTIzNS42MDItMjM1LjYwMlMxMjYuMDg5LDIwLjM5OCwyNTYsMjAuMzk4YzYxLjI4NywwLDEyMC4wNDEsMjMuOTcsMTYzLjgxOCw2Ni4yOTVoLTI2LjM2MSAgICBjLTUuNjMzLDAtMTAuMTk5LDQuNTY2LTEwLjE5OSwxMC4xOTljMCw1LjYzMyw0LjU2NiwxMC4xOTksMTAuMTk5LDEwLjE5OWg1MS4yMjljNS42MzMsMCwxMC4xOTktNC41NjYsMTAuMTk5LTEwLjE5OVY0NS42NjQgICAgYzAtNS42MzMtNC41NjYtMTAuMTk5LTEwLjE5OS0xMC4xOTljLTUuNjMzLDAtMTAuMTk5LDQuNTY2LTEwLjE5OSwxMC4xOTl2MjYuODQ4QzM4Ni44NywyNi4yMjgsMzIyLjgyMywwLDI1NiwwICAgIEMxODcuNjIsMCwxMjMuMzMzLDI2LjYyOCw3NC45OCw3NC45OEMyNi42MjgsMTIzLjMzMywwLDE4Ny42MiwwLDI1NnMyNi42MjgsMTMyLjY2Nyw3NC45OCwxODEuMDIgICAgQzEyMy4zMzMsNDg1LjM3MiwxODcuNjIsNTEyLDI1Niw1MTJjNTkuNDM4LDAsMTE3LjM1Mi0yMC44MywxNjMuMDc0LTU4LjY1MmM0NS4xMTYtMzcuMzIxLDc2LjMxNS04OS4zMDQsODcuODQ5LTE0Ni4zNzIgICAgQzUwOC4wMzksMzAxLjQ1NSw1MDQuNDY3LDI5Ni4wNzUsNDk4Ljk0NiwyOTQuOTU5eiIgZmlsbD0iIzAwMDAwMCIvPgoJPC9nPgo8L2c+CjxnPgoJPGc+CgkJPHBhdGggZD0iTTUwMS44MDEsMjQ1LjgwMWMtNS42MzMsMC0xMC4xOTksNC41NjYtMTAuMTk5LDEwLjE5OWMwLDIuMjgxLTAuMDMzLDQuNTg1LTAuMDk4LDYuODQ4ICAgIGMtMC4xNjEsNS42MzEsNC4yNzMsMTAuMzI2LDkuOTAzLDEwLjQ4N2MwLjEsMC4wMDIsMC4xOTgsMC4wMDQsMC4yOTcsMC4wMDRjNS40OTcsMCwxMC4wMzEtNC4zNzYsMTAuMTktOS45MDcgICAgYzAuMDctMi40NTcsMC4xMDYtNC45NTcsMC4xMDYtNy40M0M1MTIsMjUwLjM2Nyw1MDcuNDM0LDI0NS44MDEsNTAxLjgwMSwyNDUuODAxeiIgZmlsbD0iIzAwMDAwMCIvPgoJPC9nPgo8L2c+CjxnPgoJPGc+CgkJPHBhdGggZD0iTTI0OC44NTgsMzUwLjQxNkgxNDUuMjM0di0yMC4xNGMwLTQzLjIwNCwxMDkuMTQ3LTY1LjI5MywxMDkuMTQ3LTEzNS4xMzRjMC0zNS4wODItMjcuMjg2LTYyLjM2OS02NC42NDQtNjIuMzY5ICAgIGMtMzQuNDM0LDAtNjEuMDcsMjIuNzM5LTYxLjA3LDUzLjkyNGMwLDkuNzQ1LDMuMjQ4LDEzLjMxOSw5Ljc0NSwxMy4zMTljNy40NzEsMCwxMS4zNjktNC41NDgsMTEuMzY5LTguNzcxICAgIGMwLTI1LjY2MiwxNi44OTItMzguMzMyLDM5LjMwNi0zOC4zMzJjMjkuODg2LDAsNDMuODU0LDIyLjQxNCw0My44NTQsNDIuODhjMCw1Ni44NDYtMTA5Ljc5Nyw4MC41Ni0xMDkuNzk3LDEzNC40ODR2MzEuNTEgICAgYzAsNS4xOTgsNS44NDcsOC40NDYsMTAuMDcsOC40NDZoMTE1LjY0NGM0LjIyMywwLDcuNzk2LTQuODcyLDcuNzk2LTEwLjA3MUMyNTYuNjU0LDM1NC45NjQsMjUzLjA4MSwzNTAuNDE2LDI0OC44NTgsMzUwLjQxNnoiIGZpbGw9IiMwMDAwMDAiLz4KCTwvZz4KPC9nPgo8Zz4KCTxnPgoJCTxwYXRoIGQ9Ik0zODguNTM4LDI5My44OTNoLTE3Ljg2NnYtNjIuNjk1YzAtNS41MjMtNS41MjMtOC4xMjEtMTAuNzItOC4xMjFjLTUuNTIzLDAtMTAuNzE5LDIuNTk5LTEwLjcxOSw4LjEyMXY2Mi42OTVoLTYzLjY2OSAgICBsNzUuMDM5LTE0OC4xMjdjMC42NS0xLjYyNSwwLjk3NS0yLjkyNCwwLjk3NS00LjIyM2MwLTUuMTk4LTYuMTczLTguNzcxLTEwLjM5NS04Ljc3MWMtMy44OTgsMC03Ljc5NiwxLjk0OS0xMC4wNzEsNi40OTcgICAgbC04MS41MzUsMTYwLjc5N2MtMC45NzQsMS42MjUtMS4yOTksMy41NzMtMS4yOTksNS41MjNjMCw0Ljg3MiwyLjkyNCw4Ljc3MSw4LjQ0Niw4Ljc3MWg4Mi41MXY0Ny40MjYgICAgYzAsNS41MjIsNS4xOTgsOC40NDYsMTAuNzE5LDguNDQ2YzUuMTk4LDAsMTAuNzItMi45MjQsMTAuNzItOC40NDZ2LTQ3LjQyNmgxNy44NjZjNC44NzIsMCw4LjEyMS01LjE5OCw4LjEyMS0xMC4zOTUgICAgQzM5Ni42NTgsMjk5LjA5MSwzOTQuMDU5LDI5My44OTMsMzg4LjUzOCwyOTMuODkzeiIgZmlsbD0iIzAwMDAwMCIvPgoJPC9nPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=" /><!-- 24hours -->
                                <br><br>
                                <label>equipment room:</label></br>
                                <i  title="television" class="icon fa fa-television" aria-hidden="true"></i>
                                <i  title="baño" class="icon fa fa-bath" aria-hidden="true"></i>
                                <img title="escritorio" class="icon_img" src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCAyOTUuMjQgMjk1LjI0IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAyOTUuMjQgMjk1LjI0OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjI0cHgiIGhlaWdodD0iMjRweCI+CjxnPgoJPGc+CgkJPGc+CgkJCTxwYXRoIGQ9Ik0yMzMuMzM1LDIxNC4yODd2LTkuNTI0aDQ3LjYxN3YwYzcuODc2LDAsMTQuMjg2LTYuNDEsMTQuMjg2LTE0LjI4NnYtNzYuMTljMC03Ljg3Ni02LjQxLTE0LjI4Ni0xNC4yODYtMTQuMjg2SDE0Ny42MTkgICAgIGMtNy44NzYsMC0xNC4yODYsNi40MS0xNC4yODYsMTQuMjg2djc2LjE5YzAsNy44NzYsNi40MSwxNC4yODYsMTQuMjg2LDE0LjI4Nmg0Ny42MTl2OS41MjRoLTgwLjk1MnYtNC43NjIgICAgIGMwLTcuODc2LTYuNjg2LTE0LjI4Ni0xNC41NjItMTQuMjg2aC0xNi4xMWwtNDguOTI4LTc5LjY0OGMyLjEzOC0zLjA4MSwzLjQxLTYuODA1LDMuNDEtMTAuODI5YzAtMS4xNzEtMC4xNDMtMi4zMDUtMC4zNDgtMy40MTkgICAgIGwxOS45MzMtMzYuNTQyYzEuODM4LDkuMDUyLDYuODc2LDE3LjEzOCwxNC41MTksMjIuODUybDMuMTEsMi4zMjRsMTEuNzU3LTEwLjQ1MmMyLjU3NiwwLjkzMyw1LjIxNCwxLjQyOSw3Ljg5NSwxLjQyOSAgICAgYzEzLjEyOSwwLDIzLjgxLTEwLjY4MSwyMy44MS0yMy44MWMwLTEuNzI5LTAuMjcxLTMuNDY3LTAuNjc2LTUuMTk1bDExLjc4MS0xMC40NzFsLTEuOTQzLTMuMzY3ICAgICBjLTYuODA1LTExLjc1Ny0xOS40MzgtMTkuMDYyLTMyLjk3MS0xOS4wNjJjLTAuODk1LDAtMS43NzYsMC4wNzEtMi42NTcsMC4xMzNsLTE2LjEtMTYuMUw0MC44MiwzMi41NzJsNi41NTcsOC43NDNMMTYuMDg3LDg2LjAyICAgICBDNi45OSw4Ny40NTMsMCw5NS4yNzcsMCwxMDQuNzYzYzAsNy4xNDMsMy45OTUsMTMuMzA1LDkuODI5LDE2LjU2MmwzOS4zODEsNzMuOTE0SDMzLjA1N2MtNy44NzYsMC0xNC4wMSw2LjQxLTE0LjAxLDE0LjI4NiAgICAgdjQuNzYySDB2MjguNTcxaDE0LjI4NnY1Mi4zODFoOS41MjR2LTUyLjM4MWg5LjUyNHY1Mi4zODFoOS41MjR2LTUyLjM4MWgyMDkuNTI0djUyLjM4MWg5LjUyNHYtNTIuMzgxaDkuNTI0djUyLjM4MWg5LjUyNCAgICAgdi01Mi4zODFoMTQuMjg2di0yOC41NzFIMjMzLjMzNXogTTE0Mi44NTcsMTE0LjI4N2MwLTIuNjI0LDIuMTM4LTQuNzYyLDQuNzYyLTQuNzYyaDEzMy4zMzNjMi42MjQsMCw0Ljc2MiwyLjEzOCw0Ljc2Miw0Ljc2MiAgICAgdjYxLjkwNUgxNDIuODU3VjExNC4yODd6IE0xOTUuMjM4LDE5NS4yMzloLTQ3LjYxOWMtMi42MjQsMC00Ljc2Mi0yLjEzOC00Ljc2Mi00Ljc2MnYtNC43NjJoMTQyLjg1N3Y0Ljc2MiAgICAgYzAsMi42MjQtMi4xMzgsNC43NjItNC43NjIsNC43NjJoLTQ3LjYxOUgxOTUuMjM4eiBNMjIzLjgxLDIwNC43NjN2OS41MjRoLTE5LjA0OHYtOS41MjRIMjIzLjgxeiBNOTYuMjQzLDcxLjM3MmwxMi43LTExLjI5ICAgICBDMTA3LjY3MSw2Ni4xNDksMTAyLjUzOCw3MC44MTEsOTYuMjQzLDcxLjM3MnogTTk0Ljk2NywyOC41NzNjOC44NTctMC4wMDEsMTcuMjA0LDQuMTgsMjIuNTgxLDExLjExOEw3NC45ODYsNzcuNTI1ICAgICBjLTUuNS01LjM1Mi04LjU5LTEyLjYtOC41OS0yMC4zODFDNjYuMzk2LDQxLjM4Nyw3OS4yMSwyOC41NzMsOTQuOTY3LDI4LjU3M3ogTTc1LjYxOSwxNS45NjhsNS42NjIsNS42NjIgICAgIEM3MS43LDI1LjMzNCw2My45NjcsMzIuNzcyLDU5LjkyOSw0Mi4xODdsLTYuMDYyLTguMDlMNzUuNjE5LDE1Ljk2OHogTTUzLjM4NSw0OS4zMjlsMS4wOTEsMS40NTNMMzIuNDE5LDkxLjIyNSAgICAgYy0xLjYyOS0xLjYxLTMuNTQ4LTIuOTA1LTUuNjY3LTMuODQ4TDUzLjM4NSw0OS4zMjl6IE05LjUyNCwxMDQuNzYzYzAtNS4yNTIsNC4yNzEtOS41MjQsOS41MjQtOS41MjQgICAgIGM1LjI1MiwwLDkuNTI0LDQuMjcxLDkuNTI0LDkuNTI0YzAsNS4yNTItNC4yNzEsOS41MjQtOS41MjQsOS41MjRDMTMuNzk1LDExNC4yODcsOS41MjQsMTEwLjAxNiw5LjUyNCwxMDQuNzYzeiBNMjEuNzk1LDEyMy41MzQgICAgIGMxLjk2Ny0wLjI4NiwzLjgyNC0wLjg2Miw1LjU0OC0xLjcwNWw0NS4wOTUsNzMuNDFINjBMMjEuNzk1LDEyMy41MzR6IE0zMy4wNTcsMjA0Ljc2M2g2Ni42NjdjMi42MjQsMCw1LjAzOCwyLjEzOCw1LjAzOCw0Ljc2MiAgICAgdjQuNzYyaC03Ni4xOXYtNC43NjJoLTAuMDAxQzI4LjU3MSwyMDYuOTAxLDMwLjQzMywyMDQuNzYzLDMzLjA1NywyMDQuNzYzeiBNMjg1LjcxNCwyMzMuMzM1aC00Ljc2MmgtMjguNTcxSDQyLjg1N0gxNC4yODYgICAgIEg5LjUyNHYtOS41MjRoOS4yNDhoOTUuMjM4aDgxLjIyOWgzOC4wOTVoNTIuMzhWMjMzLjMzNXoiIGZpbGw9IiMwMDAwMDAiLz4KCQkJPHJlY3QgeD0iMTM4LjA5NSIgeT0iODAuOTUzIiB3aWR0aD0iMTUyLjM4MSIgaGVpZ2h0PSI5LjUyNCIgZmlsbD0iIzAwMDAwMCIvPgoJCQk8cGF0aCBkPSJNMjA0Ljc2MiwwLjAwMWgtMzguMDk1djc2LjE5aDM4LjA5NVYwLjAwMXogTTE5NS4yMzgsNjYuNjY4SDE3Ni4xOVY0Ny42MmgxOS4wNDhWNjYuNjY4eiBNMTk1LjIzOCwzOC4wOTZIMTc2LjE5VjkuNTI1ICAgICBoMTkuMDQ4VjM4LjA5NnoiIGZpbGw9IiMwMDAwMDAiLz4KCQkJPGNpcmNsZSBjeD0iMTg1LjcxNCIgY3k9IjU3LjE0NCIgcj0iNC43NjIiIGZpbGw9IiMwMDAwMDAiLz4KCQkJPHBhdGggZD0iTTI0Ny42MTksMC4wMDFoLTM4LjA5NXY3Ni4xOWgzOC4wOTVWMC4wMDF6IE0yMTkuMDQ3LDkuNTI1aDE5LjA0OHYyOC41NzFoLTE5LjA0OFY5LjUyNXogTTIzOC4wOTYsNjYuNjY4aC0xOS4wNDhWNDcuNjIgICAgIGgxOS4wNDhWNjYuNjY4eiIgZmlsbD0iIzAwMDAwMCIvPgoJCQk8Y2lyY2xlIGN4PSIyMjguNTcxIiBjeT0iNTcuMTQ0IiByPSI0Ljc2MiIgZmlsbD0iIzAwMDAwMCIvPgoJCQk8cGF0aCBkPSJNMjkwLjQ3NiwwLjAwMWgtMzguMDk1djc2LjE5aDM4LjA5NVYwLjAwMXogTTI2MS45MDQsOS41MjVoMTkuMDQ4djI4LjU3MWgtMTkuMDQ4VjkuNTI1eiBNMjgwLjk1Myw2Ni42NjhoLTE5LjA0OFY0Ny42MiAgICAgaDE5LjA0OFY2Ni42Njh6IiBmaWxsPSIjMDAwMDAwIi8+CgkJCTxjaXJjbGUgY3g9IjI3MS40MjkiIGN5PSI1Ny4xNDQiIHI9IjQuNzYyIiBmaWxsPSIjMDAwMDAwIi8+CgkJPC9nPgoJPC9nPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=" /><!--desk -->
                                <img title="armario"  class="icon_img" src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDYwIDYwIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA2MCA2MDsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSIyNHB4IiBoZWlnaHQ9IjI0cHgiPgo8Zz4KCTxnPgoJCTxwYXRoIGQ9Ik05LDUzaDE5VjNIOVY1M3ogTTExLDVoMTV2NDZIMTFWNXoiIGZpbGw9IiMwMDAwMDAiLz4KCQk8cGF0aCBkPSJNMTUsMTFoN2MwLjU1MiwwLDEtMC40NDgsMS0xcy0wLjQ0OC0xLTEtMWgtN2MtMC41NTIsMC0xLDAuNDQ4LTEsMVMxNC40NDgsMTEsMTUsMTF6IiBmaWxsPSIjMDAwMDAwIi8+CgkJPHBhdGggZD0iTTE1LDE0aDdjMC41NTIsMCwxLTAuNDQ4LDEtMXMtMC40NDgtMS0xLTFoLTdjLTAuNTUyLDAtMSwwLjQ0OC0xLDFTMTQuNDQ4LDE0LDE1LDE0eiIgZmlsbD0iIzAwMDAwMCIvPgoJCTxwYXRoIGQ9Ik0yMywxNmMwLTAuNTUyLTAuNDQ4LTEtMS0xaC03Yy0wLjU1MiwwLTEsMC40NDgtMSwxczAuNDQ4LDEsMSwxaDdDMjIuNTUyLDE3LDIzLDE2LjU1MiwyMywxNnoiIGZpbGw9IiMwMDAwMDAiLz4KCQk8cGF0aCBkPSJNMjMsMjhjLTAuNTUyLDAtMSwwLjQ0OC0xLDF2NWMwLDAuNTUyLDAuNDQ4LDEsMSwxczEtMC40NDgsMS0xdi01QzI0LDI4LjQ0OCwyMy41NTIsMjgsMjMsMjh6IiBmaWxsPSIjMDAwMDAwIi8+CgkJPHBhdGggZD0iTTU0LDBIMzFoLTJINnY1NmgydjRoNC42MThsMi00aDguNzY0bDIsNEgzMHYtNGgxdjRoNC42MThsMi00aDguNzY0bDIsNEg1M3YtNGgxVjB6IE0xMS4zODIsNThIMTB2LTJoMi4zODJMMTEuMzgyLDU4eiAgICAgTTE1LjYxOCw1NEg4VjJoMjF2NTJoLTYuNjE4SDE1LjYxOHogTTI4LDU4aC0xLjM4MmwtMS0ySDI4VjU4eiBNMzQuMzgyLDU4SDMzdi0yaDIuMzgyTDM0LjM4Miw1OHogTTM4LjYxOCw1NEgzMVYyaDIxdjUyaC02LjYxOCAgICBIMzguNjE4eiBNNTEsNThoLTEuMzgybC0xLTJINTFWNTh6IiBmaWxsPSIjMDAwMDAwIi8+CgkJPHBhdGggZD0iTTMyLDUzaDE5VjNIMzJWNTN6IE0zNCw1aDE1djQ2SDM0VjV6IiBmaWxsPSIjMDAwMDAwIi8+CgkJPHBhdGggZD0iTTM4LDExaDdjMC41NTIsMCwxLTAuNDQ4LDEtMXMtMC40NDgtMS0xLTFoLTdjLTAuNTUyLDAtMSwwLjQ0OC0xLDFTMzcuNDQ4LDExLDM4LDExeiIgZmlsbD0iIzAwMDAwMCIvPgoJCTxwYXRoIGQ9Ik0zOCwxNGg3YzAuNTUyLDAsMS0wLjQ0OCwxLTFzLTAuNDQ4LTEtMS0xaC03Yy0wLjU1MiwwLTEsMC40NDgtMSwxUzM3LjQ0OCwxNCwzOCwxNHoiIGZpbGw9IiMwMDAwMDAiLz4KCQk8cGF0aCBkPSJNNDYsMTZjMC0wLjU1Mi0wLjQ0OC0xLTEtMWgtN2MtMC41NTIsMC0xLDAuNDQ4LTEsMXMwLjQ0OCwxLDEsMWg3QzQ1LjU1MiwxNyw0NiwxNi41NTIsNDYsMTZ6IiBmaWxsPSIjMDAwMDAwIi8+CgkJPHBhdGggZD0iTTQ2LDI4Yy0wLjU1MiwwLTEsMC40NDgtMSwxdjVjMCwwLjU1MiwwLjQ0OCwxLDEsMXMxLTAuNDQ4LDEtMXYtNUM0NywyOC40NDgsNDYuNTUyLDI4LDQ2LDI4eiIgZmlsbD0iIzAwMDAwMCIvPgoJPC9nPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=" /><!-- wardrove -->
                            </div>

                            <div class="right_room">
                                <div id="Room_slider_img">
                                    <div id="Room_slidesContainer_img">
                                        <div class="slide_img"><img src= "http://www.carltonhotel.sg/assets/images/masthead/int-mast-executive-room-new.jpg"  width="230px" height="200px" alt="Imagen hotel" title="Imagen room"></div>
                                        <div class="slide_img"><img src= "http://www.rialta.net/residencia/wp-content/uploads/2012/08/residencia-doble-cocina2.jpg"  width="230px" height="200px" alt="Imagen hotel" title="Imagen room"></div>
                                        <div class="slide_img"><img src= "http://www.rusevilla.com/img/events/aloja7_large.jpg"  width="230px" height="200px" alt="Imagen hotel" title="Imagen room"></div>
                                    </div> <!-- /Room_slidesContainer-->
                                </div> <!-- /Room_slider -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>



            <div class="col-sm-6">

                <div class="panel-group">
                    <div class="panel with panel-primary class">
                        <div class="panel-heading">Residencia</div>
                        <div class="panel-body">

                            <label>Nombre:   </label><label id="CollegeStudentName"></label></br>
                            <label>Contacto:   </label><label id="CollegeStudentContact"></label></br>
                            <label>Url:   </label><label id="CollegeStudentWeb"></label></br>
                            <label>Equipamiento:   </label></br>
                        </div>
                        <div id="map_room"></div>
                    </div>
                </div>


                <div class="panel-group">
                    <div class="panel with panel-primary class">
                        <div class="panel-heading">Contato</div>
                        <div class="panel-body">
                            <label>Archivo:   </label><label id="AgreementStudentfile"></label></br>
                            <label>fecha inicio:   </label><label id="AgreementStudentDateStart"></label></br>
                            <label>fecha fin:   </label><label id="AgreementStudentDateEnd"></label></br>
                            <label>Precio:   </label><label id="AgreementStudentPrice"></label></br>
                        </div>
                    </div>
                </div>

            </div>

        </div><!-- end row -->


    </div><!-- end room -->

    <div id="incidence">

        <div class="row">

            <div class="col-sm-3">
                <div class="panel-group">
                    <div class="panel with panel-primary class">
                        <div class="panel-heading">OPEN</div>
                        <div class="panel-body" id="incidence_OPEN">
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-sm-3">
                <div class="panel-group">
                    <div class="panel with panel-primary class">
                        <div class="panel-heading">IN PROGRESS</div>
                        <div class="panel-body" id="incidence_IN_PROGRESS">
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-sm-3">
                <div class="panel-group">
                    <div class="panel with panel-primary class">
                        <div class="panel-heading">DONE</div>
                        <div class="panel-body" id="incidence_DONE">
                        </div>
                    </div>
                </div>
            </div>

        </div>




        <div class="col-sm-7">
            <div class="row">
                <div class="col-md-10 col-md-offset-5">
                    <div class="panel panel-login">
                        <div class="panel-body">
                            <div class="row">
                                <div class="col-lg-12">
                                    <form action="javascript:void(0);" method="post" enctype="multipart/form-data" >
                                        <div class="form-group">
                                            <input  id="formInicidenceDescription" type="text" name="descritption" tabindex="2" class="form-control" placeholder="Descripcion" required>
                                        </div>
                                        <div class="form-group">
                                            <input type="file" name="file_name"  id="formIncidenceFilename" tabindex="2" class="form-control" placeholder="nombre archivo" required>
                                        </div>
                                        <div class="form-group">
                                            <div class="row">
                                                <div class="col-sm-6 col-sm-offset-3">
                                                    <input type="submit" onClick="createIncidence()" name="register-submit" id="register-submit" tabindex="4" class="form-control btn btn-submit" value="Crear incidencia">
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div><!-- end inicidence -->




    <div id="message">
        <form class="panel-footer" action="javascript:void(0);" method="post" enctype="multipart/form-data" >
            <div class="input-group">
                <input required id="formMessageText" type="text" class="form-control input-sm" placeholder="Type your message here..."  />
                <span class="fileUpload input-group-btn">
                    <button class="btn btn-warning btn-sm"><i class="icon_paperclip fa fa-paperclip" aria-hidden="true"></i> </button>
                    <input id="formMessageFilename" type="file" class="upload" />
                </span>
                <span class="input-group-btn">
                    <button class="btn btn-warning btn-sm"  onClick="sendMessage()">Enviar</button>
                </span>
            </div>
        </form>

        <div id="list_message"></div>


    </div><!-- end message -->


    <div id="rent">
            <div class="table_rent">
                <table class="table table-striped">
                    <thead>
                    <tr>
                      <th>mes</th>
                      <th>precio</th>
                      <th>Fecha pago</th>
                      <th>recivo</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                      <td>Jacob</td>
                      <td>Mark</td>
                      <td>Otto</td>
                      <td>@mdo</td>
                    </tr>
                    <tr>
                      <td>Jacob</td>
                      <td>Jacob</td>
                      <td>Thornton</td>
                      <td>@fat</td>
                    </tr>
                    <tr>
                      <td>Jacob</td>
                      <td>Larry</td>
                      <td>the Bird</td>
                      <td>@twitter</td>
                    </tr>
                    </tbody>
                </table>
            </div>

        <div id="payment_rent">
            <form class="form-horizontal" role="form">
                <fieldset>
                    <legend>
                        <label>PAGO:   </label>
                        <label>Mes:   </label><label id="payment_rent_month"></label>
                        <label>Precio:   </label><label id="payment_rent_price"></label>
                    </legend>
                    <div class="form-group">
                        <label class="col-sm-3 control-label" for="card-holder-name">Name on Card</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" name="card-holder-name" id="card-holder-name" placeholder="Card Holder's Name">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label" for="card-number">Card Number</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" name="card-number" id="card-number" placeholder="Debit/Credit Card Number">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label" for="expiry-month">Expiration Date</label>
                        <div class="col-sm-9">
                            <div class="row">
                                <div class="col-xs-3">
                                    <select class="form-control col-sm-2" name="expiry-month" id="expiry-month">
                                    <option>Month</option>
                                    <option value="01">Jan (01)</option>
                                    <option value="02">Feb (02)</option>
                                    <option value="03">Mar (03)</option>
                                    <option value="04">Apr (04)</option>
                                    <option value="05">May (05)</option>
                                    <option value="06">June (06)</option>
                                    <option value="07">July (07)</option>
                                    <option value="08">Aug (08)</option>
                                    <option value="09">Sep (09)</option>
                                    <option value="10">Oct (10)</option>
                                    <option value="11">Nov (11)</option>
                                    <option value="12">Dec (12)</option>
                                    </select>
                                </div>
                                <div class="col-xs-3">
                                    <select class="form-control" name="expiry-year">
                                    <option value="17">2017</option>
                                    <option value="18">2018</option>
                                    <option value="19">2019</option>
                                    <option value="20">2020</option>
                                    <option value="21">2021</option>
                                    <option value="22">2022</option>
                                    <option value="23">2023</option>
                                    <option value="20">2024</option>
                                    <option value="21">2025</option>
                                    <option value="22">2026</option>
                                    <option value="23">2027</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label" for="cvv">Card CVV</label>
                        <div class="col-sm-3">
                            <input type="text" class="form-control" name="cvv" id="card_cvv" placeholder="Security Code">
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-sm-offset-3 col-sm-9">
                            <button type="button" class="btn btn-success">Pay Now</button>
                        </div>
                    </div>
                </fieldset>
            </form>
        </div>



    </div> <!-- end rent -->




    <div id="showErrorMessageStudentPage" style="display:none;">
        <strong>
            <center>
                <p id="errorMessageStudentPage"> Error </p>
            </center>
        </strong>
    </div> <!-- end showErrorMessageStudentPage -->
    </script>
    </head>
    <body  id="viewBase" >
    </body>
</html>
