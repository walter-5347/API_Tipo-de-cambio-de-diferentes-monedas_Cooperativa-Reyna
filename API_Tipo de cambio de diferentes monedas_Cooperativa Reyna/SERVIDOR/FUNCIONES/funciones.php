<?php

    include("currency.php");


    //clase utilizada para la implementacion de funciones que llevaran a cabo la creacion y manipulacion de json
    class funciones {

        //en este arreglo se almacenan los valores extraidos de la pagina web del Banco Central Europeo 
        private $baseEUR = array(); 

        // funcion utilizada para extraer la informacion de las monedas y tipos de cambio de la pagina web 
        // del Banco Central Europeo asi como tambien se almacenan los valores en el arreglo mencionado previamente
        public function extraerTipoCambioBaseEUR(){
            $XML=simplexml_load_file("http://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml");

            foreach($XML->Cube->Cube->Cube as $rate){
                $moneda = strval($rate["currency"]);
                $valor = strval($rate["rate"]) ;
                $this->baseEUR[$moneda]= $valor;
            }

            $this->baseEUR["EUR"]= "1";

            
        }

        //funcion utilizada para imprimir el arreglo y verificar la estructura de los datos
        public function imprimirArreglo(){
            foreach ($this->baseEUR as $currency => $rate){
                echo $currency."=>".$rate."
                ";
            }
        }

        //funcion utilizada para convertir el arreglo inicial en un objeto json
        public function ImprimirJsonBaseEUR(){
            return json_encode($this->baseEUR);
        }

        //funcion utilizada para aproximar los numeros decimales
        public function redondear_dos_decimal($valor) {
            $float_redondeado=round($valor * 100) / 100;
            return $float_redondeado;
         }


        //funcion utilizada para convertir cualquier moneda a otra partiendo de los valores extraidos del
        //banco central europeo, se hace uso de la clase currency(moneda) para almacenar los valores en sus 
        //atributos, asi como tamibien se realizan las respectivas operaciones aritmeticas para realizar la 
        //convercion de todas las monedas, al final se retorna un objeto json
        public function convertir($base){
            $currencyOBJ = new currency(); 
            $currencyOBJ->base = $base;

            $XML=simplexml_load_file("http://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml");

            foreach($XML->Cube->Cube as $fecha){
                $currencyOBJ->date = strval($fecha["time"]);
            }

            $rateValue=0;

            foreach ($this->baseEUR as $currency => $rate){
                if (strval($currency) == strval($base)) {
                    $tipoCambio = $rate;
                }
                
            }

            foreach ($this->baseEUR as $currency => $rate){

                $rateValue = (1)*(1/$tipoCambio)*($rate/1);

                $rateValue = $this->redondear_dos_decimal($rateValue);

                $rateValue = strval($rateValue);
                $CurrencyForech = strval($currency);

                $currencyOBJ->rate[$CurrencyForech]=$rateValue;
                
            }

            $JsonBase = json_encode($currencyOBJ);

            return $JsonBase;
        }


        //funcion utilizada para extraer los valores de de los objetos json ya creados previamente,
        //a partir de ahi se procede a la construccion de otro json que sera de utilidad en el frontend
        public function BaseVersus($json, $versus, $base){

            $jsonOBJ = json_decode($json);
            $date = $jsonOBJ->date;
            $rate = $jsonOBJ->rate->$versus;
            
            $baseVersus = array("base"=>$base, "versus"=>$versus, "date"=>$date, "rate"=>$rate);

            return json_encode($baseVersus);
            
            
        }

    }
?>