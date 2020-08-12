<?php
    include("../FUNCIONES/funciones.php");

    $base = $_GET['base'];
    $versus = $_GET['versus'];
    $peticion = $_GET['peticion'];

    // instancia del objeto de la clase funciones para la utilizacion de sus metodos
    $funcionesOBJ = new funciones();
    $funcionesOBJ->extraerTipoCambioBaseEUR();

    // atiende la peticion y retorna el json que contiene unicamente un valor en el rate
    if ($peticion == "baseVersus") {
        $jsonTipoCambioSegunBase = $funcionesOBJ->convertir($base);
        $jsonBaseVersus = $funcionesOBJ->BaseVersus($jsonTipoCambioSegunBase,$versus, $base);
        echo $jsonBaseVersus;
        
    }else{//atiene la peticion y retorna el json que contiene todos los valores de las monedas en el rate
        $jsonTipoCambioSegunBase = $funcionesOBJ->convertir($base);
        echo $jsonTipoCambioSegunBase;
    }
?>