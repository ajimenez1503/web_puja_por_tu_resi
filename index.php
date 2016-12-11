<!-- /**
  * @author antonio Jimenez (antji996)
    * @version 0.1
  */-->

<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <script src="//code.jquery.com/jquery-1.12.0.min.js"></script>
    <script src="//code.jquery.com/jquery-migrate-1.2.1.min.js"></script>
    <!-- Latest compiled and minified CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
    <!-- Latest compiled and minified JavaScript -->
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script>
    <title>Puja por tu resi</title>
    <link href="client.css" type="text/css" rel="stylesheet">
	<script src="src/page.js"></script>
    <script src="src/lib.js"></script>
    <script src="client.js" ></script>
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
        <div class="row margin">
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
                                                <input type="submit" onClick="signup()" name="register-submit" id="register-submit" tabindex="4" class="form-control btn btn-register" value="Registrar">
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
    </script>
    <script id="studentview" type=”text/view”>
    <nav class="nav nav-pills nav-justified">
		<div class="container-fluid">
			<ul class="nav navbar-nav">
				<li onclick="page('/home')"> <a> <label>Home</label ></a> </li>
				<li onclick="page('/perfil')"> <a>  <label>Perfil</label> </a> </li>
                <li onclick="page('/inicidence')"> <a> <label>Incidencias</label> </a> </li>
				<li onclick="page('/connection')"> <a> <label>Log out</label> </a> </li>
			</ul>
		</div>
	</nav>
    <div id="home">
        <div class="row">
            <div class="col-sm-6">
                <div class="panel-group">
                    <div class="panel with panel-primary class">
                        <div class="panel-heading">Informacion usuario</div>
                        <div class="panel-body">
                            <label>Nomber:   </label><label id="homeStudentName"></label></br>
                            <label>Usuario:   </label><label id="homeStudentUSername"></label></br>
                            <label>Email:   </label><label id="homeStudentEmail"></label></br>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div id="perfil">

        <div class="row">
            <div class="col-sm-6">
                <div class="panel-group">
                    <div class="panel with panel-primary class">
                        <div class="panel-heading">User information</div>
                        <div class="panel-body">
                            <label>perfil</label></br>
                            <label>Nomber:   </label><label id="profileStudentName"></label></br>
                            <label>Usuario:   </label><label id="profileStudentUSername"></label></br>
                            <label>Email:   </label><label id="profileStudentEmail"></label></br>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-sm-3">
                <div class="panel-group">
                    <div class="panel with panel-primary class">
                        <div class="panel-heading">Punto</div>
                        <div class="panel-body">
                            <label>Puntos:   </label><label id="profileStudentPoint"></label></br>
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
                                                    <input type="submit" onClick="changePassword()" name="register-submit" id="register-submit" tabindex="4" class="form-control btn btn-register" value="Cambiar contraseña">
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
                                                    <input type="submit" onClick="changeEmail()" name="register-submit" id="register-submit" tabindex="4" class="form-control btn btn-register" value="Cambiar contraseña">
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
                                                    <input type="submit" onClick="createIncidence()" name="register-submit" id="register-submit" tabindex="4" class="form-control btn btn-register" value="Crear incidencia">
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






    <div id="showErrorMessageStudentPage" style="display:none;">
        <strong>
            <center>
                <p id="errorMessageStudentPage"> Error </p>
            </center>
        </strong>
    </div>
    </script>
  </head>
  <body  id="viewBase" >
  </body>
</html>
