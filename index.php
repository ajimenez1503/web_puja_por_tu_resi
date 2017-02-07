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


    <!-- Latest compiled and minified CSS bootstrap-->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
    <!-- Latest compiled and minified JavaScript bootstrap -->
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script>


    <!-- Latest compiled and minified CSS  select options -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.12.2/css/bootstrap-select.min.css" integrity="sha256-an4uqLnVJ2flr7w0U74xiF4PJjO2N5Df91R2CUmCLCA=" crossorigin="anonymous" />
    <!-- Latest compiled and minified JavaScript  select options -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.12.2/js/bootstrap-select.min.js" integrity="sha256-JD3g+rB9BjW6/cGEuwCue1sGtitb2aQVNs/pl4114XQ=" crossorigin="anonymous"></script>


    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"><!-- icons  -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"><!-- icons  -->

    <title>Puja por tu resi</title>
    <link href="style/welcome.css" type="text/css" rel="stylesheet">
    <link href="style/student.css" type="text/css" rel="stylesheet">
    <link href="style/college.css" type="text/css" rel="stylesheet">
	<script src="src/page.js"></script>
    <script src="src/animation.js"></script>
    <script src="src/validation.js"></script>
    <script src="src/lib.js"></script>
    <script src="src/welcome.js" ></script>
    <script src="src/student.js" ></script>
    <script src="src/college.js" ></script>
    <!--<script async defer  src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDau09DcBHg-wQ8wHUsl6SUCYOPPlDFiWQ&callback=init_map"></script>-->
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDau09DcBHg-wQ8wHUsl6SUCYOPPlDFiWQ&libraries=places"async defer></script>
    <link rel="icon" type="image/ico" href="img/logo.ico">
    </head>
    <body >
        <div  id="viewBase" ></div>
        <div class="error_footer" id="showErrorMessage" style="display:none;">
            <strong>
                <center>
                    <p id="errorMessage"> Error </p>
                </center>
            </strong>
        </div>
    </body>
</html>
