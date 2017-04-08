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

    <!-- google font-->
    <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">
    </head>
    <body >
        <div  id="viewBase" ></div>
        <div class="footer" >
          <p onclick="page('/Politica_de_privadidad')" class="footer_element" > Politica de privadidad </p>
          <p onclick="page('/Politica_de_cookies')" class="footer_element"> Politica de cookies </p>
          <p onclick="page('/condiciones_generareales')" class="footer_element"> Condiciones generareales </p>
          <p onclick="page('/aviso_legal')" class="footer_element"> Aviso legal </p>
          <p onclick="page('/FAQ')" class="footer_element"> FAQ </p>
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
          <div id="FAQ" style="display:none;" class="footer_full_element">
              <button class="button_footer_full_element"onclick="display_specific_div('all_footer_full_element')" type="button" class="btn btn-link"><i class="fa fa-arrow-left" aria-hidden="true"></i> volver </button>

              <div class="card ">
                  <div class="card-header">
                      <h4 class="card-header">
                          <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion" href="#collapse1">¿Cómo puede solicitar una habitación?</a>
                      </h4>
                  </div>
                  <div id="collapse1" class="panel-collapse collapse">
                      <div class="card-block">
                          Tienes que darte de alta y buscar hasta 5 habitaciones de tu gusto para pujar por ellas y a final de semana puede que se te haya asignado una. En este momento puede aceptar o rechazar la habitación.
                      </div>
                  </div>
              </div>

              <div class="card ">
                  <div class="card-header">
                      <h4 class="card-header">
                          <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion" href="#collapse2">
                              ¿Cómo recojo las llaves?
                          </a>
                      </h4>
                  </div>
                  <div id="collapse2" class="panel-collapse collapse">
                      <div class="card-block">
                          Una vez has firmado el contrato, ponte en contacto con la residencia para recoger las llaves o el día que empieza el contrato debe haber personal de la residencia para ayudarte.                       </div>
                  </div>
              </div>

              <div class="card ">
                  <div class="card-header">
                      <h4 class="card-header">
                          <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion" href="#collapse3">
                             ¿Quiero registrarme pero dice “usuario no es correcto”?
                          </a>
                      </h4>
                  </div>
                  <div id="collapse3" class="panel-collapse collapse">
                      <div class="card-block">
                          Para el usuario debes introducir tu DNI, este es único para cada persona.
                      </div>
                  </div>
              </div>
              <div class="card ">
                  <div class="card-header">
                      <h4 class="card-header">
                          <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion" href="#collapse4">
                              ¿Puedo pasar mis puntos a otra persona?
                          </a>
                      </h4>
                  </div>
                  <div id="collapse4" class="panel-collapse collapse">
                      <div class="card-block">
                          No, los puntos son personales para cada usuario.
                      </div>
                  </div>
              </div>
              <div class="card ">
                  <div class="card-header">
                      <h4 class="card-header">
                          <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion" href="#collapse5">
                              ¿Cuándo debo devolver las llaves?
                          </a>
                      </h4>
                  </div>
                  <div id="collapse5" class="panel-collapse collapse">
                      <div class="card-block">
                          La residencia te informara sobre el procedimiento, en cambio, comúnmente se realiza el ultimo día de contrato.
                      </div>
                  </div>
              </div>
              <div class="card ">
                  <div class="card-header">
                      <h4 class="card-header">
                          <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion" href="#collapse6">
                              ¿Cuándo se debe hacer el pago de la mensualidad?
                          </a>
                      </h4>
                  </div>
                  <div id="collapse6" class="panel-collapse collapse">
                      <div class="card-block">
                          Este debe hacerse entre el día uno y día cinco de cada mes.
                      </div>
                  </div>
              </div>
              <div class="card ">
                  <div class="card-header">
                      <h4 class="card-header">
                          <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion" href="#collapse7">
                              ¿Cómo puedo poner una falta a la residencia?
                          </a>
                      </h4>
                  </div>
                  <div id="collapse7" class="panel-collapse collapse">
                      <div class="card-block">
                          Si tienes cualquier problema con la residencia, a través de la aplicación puede presentar una incidencia al a residencia.
                      </div>
                  </div>
              </div>
              <div class="card ">
                  <div class="card-header">
                      <h4 class="card-header">
                          <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion" href="#collapse8">
                              ¿Cuántos puntos necesito para pujar?
                          </a>
                      </h4>
                  </div>
                  <div id="collapse8" class="panel-collapse collapse">
                      <div class="card-block">
                          No existe un mínimo, puede pujar hasta el mismo día que te registras, en cambio la habitación se le asignara al que tenga más punto de todas las pujas en la mismas fechas.
                      </div>
                  </div>
              </div>
              <div class="card ">
                  <div class="card-header">
                      <h4 class="card-header">
                          <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion" href="#collapse9">
                              ¿Puedo reservar una habitación aunque no sea un estudiante?
                          </a>
                      </h4>
                  </div>
                  <div id="collapse9" class="panel-collapse collapse">
                      <div class="card-block">
                          Es un servicio destinado a estudiantes, en cambio, puede ser utilizado por cualquier persona
                      </div>
                  </div>
              </div>
              <div class="card ">
                  <div class="card-header">
                      <h4 class="card-header">
                          <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion" href="#collapse10">
                              ¿Qué es incluido en el pago de la mensualidad?
                          </a>
                      </h4>
                  </div>
                  <div id="collapse10" class="panel-collapse collapse">
                      <div class="card-block">
                          El pago del contrato incluye: los gasto de agua y luz ademas de la habitación. Ademas del equipamiento de cada habitación y residencia como wifi o comedor o gimnasio y demás.
                      </div>
                  </div>
              </div>

              <div class="card ">
                  <div class="card-header">
                      <h4 class="card-header">
                          <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion" href="#collapse11">
                              ¿Cuándo me registre escribí más mi nombre es posible cambiarlo?
                          </a>
                      </h4>
                  </div>
                  <div id="collapse11" class="panel-collapse collapse">
                      <div class="card-block">
                          Si es posible cambiarlo desde la web, en la ventana del perfil.
                      </div>
                  </div>
              </div>
              <div class="card ">
                  <div class="card-header">
                      <h4 class="card-header">
                          <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion" href="#collapse12">
                              ¿Cómo funciona el sistema de puntos?
                          </a>
                      </h4>
                  </div>
                  <div id="collapse12" class="panel-collapse collapse">
                      <div class="card-block">
                          Cada día desde que te registrar almacenas un punto. Es decir, desde el primer día empiezas a coleccionar puntos.
                      </div>
                  </div>
              </div>
              <div class="card ">
                  <div class="card-header">
                      <h4 class="card-header">
                          <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion" href="#collapse13">
                              ¿Cuántas ofertas de habitaciones puedo tener?
                          </a>
                      </h4>
                  </div>
                  <div id="collapse13" class="panel-collapse collapse">
                      <div class="card-block">
                          Solo es posible tener una oferta por estudiante.
                      </div>
                  </div>
              </div>
              <div class="card ">
                  <div class="card-header">
                      <h4 class="card-header">
                          <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion" href="#collapse14">
                              ¿Si tengo un contrato puedo pujar?
                          </a>
                      </h4>
                  </div>
                  <div id="collapse14" class="panel-collapse collapse">
                      <div class="card-block">
                          No, puesto que ya dispones de una habitación.
                      </div>
                  </div>
              </div>
              <div class="card ">
                  <div class="card-header">
                      <h4 class="card-header">
                          <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion" href="#collapse15">
                              ¿Cuando se realiza la asignación de habitación?
                          </a>
                      </h4>
                  </div>
                  <div id="collapse15" class="panel-collapse collapse">
                      <div class="card-block">
                          El viernes a las 00:00 de cada semana se realiza la asignación de habitaciones.
                      </div>
                  </div>
              </div>
              <div class="card ">
                  <div class="card-header">
                      <h4 class="card-header">
                          <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion" href="#collapse16">
                              ¿Cómo puedo firmar el contrato?
                          </a>
                      </h4>
                  </div>
                  <div id="collapse16" class="panel-collapse collapse">
                      <div class="card-block">
                          Es un procedimiento bastante sencillo, solo tienes que descargar el contrato, firmarlo y subirlo a la web.
                      </div>
                  </div>
              </div>

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
