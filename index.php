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

    <!-- Latest compiled and minified CSS  floatthead for table thead-->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/floatthead/2.0.1/jquery.floatThead.js" integrity="sha256-LJqhf2wTTlYWKcYHAt4bKFleZAKxPnd7SylslyFneqM=" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/floatthead/2.0.1/jquery.floatThead.min.js" integrity="sha256-dhuDgc2Dyz+qwrJkYr0wtEilIq+4MqcTknTKeNgUQ/Y=" crossorigin="anonymous"></script>


    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"><!-- icons  -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"><!-- icons  -->

    <title>Puja por tu resi</title>
    <link href="style/welcome.css" type="text/css" rel="stylesheet">
    <link href="style/student.css" type="text/css" rel="stylesheet">
    <link href="style/college.css" type="text/css" rel="stylesheet">
    <script src="src/icon.js"></script>
    <script src="src/iban.js"></script>
	<script src="src/page.js"></script>
    <script src="src/animation.js"></script>
    <script src="src/validation.js"></script>
    <script src="src/lib.js"></script>
    <script src="src/welcome.js" ></script>
    <script src="src/student.js" ></script>
    <script src="src/college.js" ></script>
    <script src="src/TPV.js" ></script>
    <!--<script async defer  src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDau09DcBHg-wQ8wHUsl6SUCYOPPlDFiWQ&callback=init_map"></script>-->
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDau09DcBHg-wQ8wHUsl6SUCYOPPlDFiWQ&libraries=places"async defer></script>
    <link rel="icon" type="image/ico" href="img/logo.ico">
    </head>
    <body >
        <div  id="viewBase" ></div>
        <div class="footer" >
          <p onclick="page('/Politica_de_privadidad')" class="footer_element" > Politica de privadidad </p>
          <p onclick="page('/Politica_de_cookies')" class="footer_element"> Politica de cookies </p>
          <p onclick="page('/condiciones_generareales')" class="footer_element"> condiciones generareales </p>
          <p onclick="page('/aviso_legal')" class="footer_element"> aviso legal </p>
        </div>
        <div id="all_footer_full_element">
          <div id="Politica_de_privadidad" class="footer_full_element" style="display:none;" >
              <button class="button_footer_full_element"onclick="page('/welcome')" type="button" class="btn btn-link"><i class="fa fa-arrow-left" aria-hidden="true"></i> volver </button>
              <p>
                De acuerdo a la Ley Orgánica 15/1999, de 13 de diciembre, de protección de datos de carácter personal (LOPD), se informa a los usuarios que los datos personales que nos faciliten serán incorporados al fichero PujaPorTuResi el cual está registrado ante la Agencia Española de Protección de Datos, propiedad y responsabilidad para PujaPorTuResi, S.L.
                Respecto a la información almacenada y su uso. Esto depende del tipo de usuario.</p>
              <h3> Estudiante:</h3>
              <ul>
                <li >Nombre y apellidos: utilizados para nombrar quien firma el contrato.</li>
                <li >DNI: para identificar a una persona de forma individual y necesario para firmar el contrato.</li>
                <li >Email: para contratar en caso de problemas.</li>
              </ul>
              <h3> Residencia:</h3>
              <ul>
                <li >Nombre compañía: utilizados para nombrar quien firma el contrato.</li>
                <li >CIF: para identificar a una persona o entidad jurídica de forma individual y necesario para firmar el contrato.</li>
                <li >Email: para que los estudiantes puedan contactar en caso de problema.</li>
                <li >Teléfono: para que los estudiantes puedan contactar en caso de problema.</li>
                <li >URL: para que los estudiantes puedan tener más información sobre la residencia.</li>
                <li >Equipamiento: para que los estudiantes conozcan las características de la residencia.</li>
                <li >Direccion: para que los estidiantes conozcan donde esta situada la residencia.</li>
                <li >IBAN y BIC y propietario de la cuenta bancaria donde debe realizarse el pago mensual.</li>
                <li >Información sobre la habitación: tamaño, precio, planta en la que se encuentra y equipamiento de la habitación. Con el objetivo de que el estudiante conozca la habitación.</li>
              </ul>
              <p>
                Le avisamos que la información provista por los usuarios es no cedida a terceros para su análisis, esta es utilizada unicamente por la aplicación y la empresa PujaPorTuResi S. L. La información es requerida en el formulario de registro, el de añadir cuenta bancaria y el de crear una habitación.
              </p>
              <p>
                Respecto a la seguridad del fichero, según la ley este es de nivel básico. Por lo tanto nuestro sistema debe cumplir los siguientes artículos:
              </p>
              <ul>
                <li >Art. 89 Funciones y obligaciones del personal</li>
                <li >Art. 90. Registro de incidencias</li>
                <li >Art. 91. Control de acceso</li>
                <li >Art. 92. Gestión de soportes y documentos</li>
                <li >Art. 93. Identificación y autenticación</li>
                <li >Art. 94. Copias de respaldo y recuperación</li>
              </ul>
              <p>
                Le recordamos que en cualquier momento podrá ejercitar los derechos de acceso, rectificación, cancelación, y, en su caso, oposición, enviando una solicitud por escrito, acompañada de una fotocopia de su D.N.I., dirigida a: XXX o mediante la dirección de correo electrónico PujaPorTuResi@gmail.com
              </p>
                Usted garantiza que los datos aportados son verdaderos, exactos, completos y actualizados, siendo responsable de cualquier daño o perjuicio, directo o indirecto, que pudiera ocasionarse como consecuencia del incumplimiento de tal obligación. En el caso de que los datos aportados pertenecieran a un tercero, Usted garantiza que ha informado a dicho tercero de los aspectos contenidos en esta Política y obtenido su autorización para facilitar sus datos a las Sociedades Titulares para los fines señalados.
              </p>
              <h4>El titular de la página web y responsable del tratamiento de los datos:</h4>
              <ul style="list-style-type:none">
                <li >Nombre:PujaPorTuResi S. L.</li>
                <li >Direccion: XXX</li>
                <li >Telefono: XXX</li>
                <li >Correo: PujaPorTuResi@gmail.com</li>
              </ul>
          </div>
          <div id="Politica_de_cookies" class="footer_full_element" style="display:none;" >
              <button class="button_footer_full_element"onclick="page('/welcome')" type="button" class="btn btn-link"><i class="fa fa-arrow-left" aria-hidden="true"></i> volver </button>
              <p>
                Cookies es un fichero que se alojan en la memoria del dispositivo cuando se accede a la web para administrar servicios y funcionalidades de la aplicación web. PujaPorTuResi S. L. utiliza solo un cookies para la autentificación, este tiene como objetivo que el usuario pueda acceder a la web y que se mantenga conectado de mantera constante hasta el cierre de sesión.  Esta es unicamente utilizada por PujaPorTuResi S. L. y en ningún momento por terceros.
              <p>
              </p>
                Esta cookies es de tipo técnica puesto que permite al usuario navegar a través de la web. Ademas esta es temporal puesto que es eliminada cuando cierra la sesión en el navegador.
              </p>
          </div>

          <div id="condiciones_generareales" class="footer_full_element" style="display:none;" >
              <button class="button_footer_full_element"onclick="page('/welcome')" type="button" class="btn btn-link"><i class="fa fa-arrow-left" aria-hidden="true"></i> volver </button>
              <p>
                Se expone el documento contractual que regirá la contratación de una habitación de una residencia a través del a empresa PujaPorTuResi S. L. La aceptación del documento conlleva que el usuario:

              </p>
              <ul>
                <li> Comprende el texto expuesto</li>
                <li> Que tiene capacidad suficiente para contratar una habitación</li>
                <li> Que asume todas las obligaciones aquí dispuestas</li>
              </ul>
              <p>
                Todos los precios de las habitaciones son con impuesto incluidos.
              </p>
              <p>
                Respecto al proceso de asignación de una habitación funciona a través de un sistema de pujas, el último día de la puja se le asigna la habitación al usuario con más puntos. El usuario firma el contrato por un periodo académico y cada mes tiene que realizar el pago mensual.
              </p>
              <p>
                El usuario está obligado a aceptar o rechazar la habitación que se le ha sido asignada, ademas de pagar todos los meses la renta durante su contrato.
              </p>
              <p>
                La residencia esta obligada a alquilarle la habitación al usuario durante el periodo de contratación, ademas de permitirle el uso de todos los servicios mostrados en la aplicación web.
              </p>
              <p>
                El proceso de pago se realiza a través de un TPV independiente de la aplicación el cual es seguro. Este permite realizar el pago con tarjeta de crédito.
              </p>
              <p>
                Una vez que la habitación es asignada el usuario, se genera el contrato el cual tiene que ser firmado por el usuario y subirlo a la plataforma. Este contrato está escrito en español.
              </p>
              <p>
                A la hora de confirmar el pago de una mensualidad, aparece una pantalla de confirmación. Para asegurar que el pago se ha realizado correctamente.
              </p>
          </div>

          <div id="aviso_legal" style="display:none;" class="footer_full_element">
              <button class="button_footer_full_element"onclick="display_specific_div('all_footer_full_element')" type="button" class="btn btn-link"><i class="fa fa-arrow-left" aria-hidden="true"></i> volver </button>
              <p>
                El titular de la página web es PujaPorTuResi S L con domicilio en XXX y con número CIF XXX. Los datos se encuentra registrados en el registro mercantil de Granada, XXX.
              </p>
              <p>
                Respecto a los contenido mostrado en la web, con información sobre características,  ubicación, información de contacto, habitaciones y demás de la residencia son creados por ella misma, de esta manera el titular de la página web no es responsable de la veracidad de dicha información.
              </p>
          </div>
        </div>

        <div class="error_footer" id="showErrorMessage" style="display:none;">
            <strong>
                <center>
                    <p id="errorMessage"> Error </p>
                </center>
            </strong>
        </div>
    </body>
</html>
