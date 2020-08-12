
// funcion utilizada para extraer el valor seleccionado en las listas de monedas
function extraerMoneda() {
    let base = $('#base').val();
    let versus = $('#versus').val();

    let json = { "base": base, "versus": versus };

    $('#tituloTabla').text(`TIPOS DE CAMBIO DE REFERENCIA DEL ${base}`);

    return json;
}


// funcion utilizada para extraer la cantidad de dinero a convertir
function extraerCantidad() {
    let cantidad = $('#cantidad').val();
    return cantidad;
}


//funcion utilizada para calcular la equivalencia de una moneda a otra
function equivalencia(cantidad, rate) {

    let resultado = (cantidad) * (rate);
    return resultado;

}


// funcion utilizada para ejecutar una un evento cuando se teclea un valor en el input text 
// que almacenara la cantidad a convertir, tambien realiza la peticion al backend a traves del metodo get de Jquery.
// tambien inserta las tablas dinamicante en el index.html
$("#cantidad").on("keyup", function () {
    let moneda = extraerMoneda();
    let cantidad = extraerCantidad();

    if (isNaN(cantidad)) {
        alert("el valor ingresado no es correcto");
    } else {

        if (String(cantidad).length == 0) {
            cantidad = 0;
        }

        $.get("../SERVIDOR/CONTROLADOR/controlador.php", { base: moneda.base, versus: moneda.versus, peticion: "baseVersus" }, function (data) {
            var baseVersusOBJ = JSON.parse(data);
            console.log(baseVersusOBJ);

            let resultado = equivalencia(cantidad, baseVersusOBJ.rate);

            $('#equivalente').val(resultado);

            encabezado1 = `1 ${baseVersusOBJ.base} = ${baseVersusOBJ.rate} ${baseVersusOBJ.versus}`;
            $('#valor1').text(encabezado1);

            encabezado2 = `1 ${baseVersusOBJ.versus} = ${1 / baseVersusOBJ.rate} ${baseVersusOBJ.base}`;
            $('#valor2').text(encabezado2);

            $('#fecha').val(baseVersusOBJ.date);
        });

        $.get("../SERVIDOR/CONTROLADOR/controlador.php", { base: moneda.base, versus: moneda.versus, peticion: "baseTipoCambio" }, function (data) {
            var baseOBJ = JSON.parse(data);
            console.log(baseOBJ);
            var contador = 1;
            var columnas = ``;

            for (var rate in baseOBJ.rate) {

                if (baseOBJ.rate.hasOwnProperty(rate)) {

                    columnas = columnas + `<tr>
                    <th scope="row" class="bg-success" >${contador}</th>
                    <td class="bg-success">${rate}</td>
                    <td class="bg-success">${baseOBJ.rate[rate]}</td>
                  </tr>`;
                    contador += 1;
                }
            }

            document.getElementById("tabla").innerHTML = `<thead>
              <tr>
                <th scope="col" class="bg-secondary">#</th>
                <th scope="col" class="bg-secondary">Moneda</th>
                <th scope="col" class="bg-secondary">Valor</th>
              </tr>
            </thead>
            <tbody>
            ${columnas}
            </tbody>`;
        });
    }

});

// funcion que se ejecutra a traves del evento onclick definido en las listas, 
// tambien realiza la peticion al backend a traves del metodo get de Jquery.
// tambien inserta las tablas dinamicante en el index.html
function evaluar() {
    let moneda = extraerMoneda();
    let cantidad = extraerCantidad();

    if (isNaN(cantidad)) {
        alert("el valor ingresado no es correcto");
    } else {

        if (String(cantidad).length == 0) {
            cantidad = 0;
        }

        $.get("../SERVIDOR/CONTROLADOR/controlador.php", { base: moneda.base, versus: moneda.versus, peticion: "baseVersus" }, function (data) {
            var baseVersusOBJ = JSON.parse(data);
            console.log(baseVersusOBJ);

            let resultado = equivalencia(cantidad, baseVersusOBJ.rate);

            $('#equivalente').val(resultado);

            encabezado1 = `1 ${baseVersusOBJ.base} = ${baseVersusOBJ.rate} ${baseVersusOBJ.versus}`;
            $('#valor1').text(encabezado1);

            encabezado2 = `1 ${baseVersusOBJ.versus} = ${1 / baseVersusOBJ.rate} ${baseVersusOBJ.base}`;
            $('#valor2').text(encabezado2);

            $('#fecha').val(baseVersusOBJ.date);
        });

        $.get("../SERVIDOR/CONTROLADOR/controlador.php", { base: moneda.base, versus: moneda.versus, peticion: "baseTipoCambio" }, function (data) {
            var baseOBJ = JSON.parse(data);
            console.log(baseOBJ);
            var contador = 1;
            var columnas = ``;

            for (var rate in baseOBJ.rate) {

                if (baseOBJ.rate.hasOwnProperty(rate)) {

                    columnas = columnas + `<tr>
                    <th scope="row" class="bg-success" >${contador}</th>
                    <td class="bg-success">${rate}</td>
                    <td class="bg-success">${baseOBJ.rate[rate]}</td>
                  </tr>`;
                    contador += 1;
                }
            }

            document.getElementById("tabla").innerHTML = `<thead>
              <tr>
                <th scope="col" class="bg-secondary">#</th>
                <th scope="col" class="bg-secondary">Moneda</th>
                <th scope="col" class="bg-secondary">Valor</th>
              </tr>
            </thead>
            <tbody>
            ${columnas}
            </tbody>`;

        });
    }

}


// funcion utilizada para intercambien los valores entre las listas, esta definida en el evento
// onclik del boton intercambiar 
function intercambiar() {
    let moneda = extraerMoneda();

    document.getElementById('base').value = moneda.versus;
    document.getElementById('versus').value = moneda.base;
    evaluar();

}