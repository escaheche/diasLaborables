
//funcion para generar fechas aleatorias dentro de un rango

function randomTime(cantidadDias=5) {
    var fechaInicial=document.getElementById("fechaInicial").value;
    var fechaFinal=document.getElementById("fechaFinal").value;
    inicial=fechaInicial.split("-");
        final=fechaFinal.split("-");
        // obtenemos las fechas en milisegundos
        var dateStart=new Date(inicial[0],(inicial[1]-1),inicial[2]);
        var dateEnd=new Date(final[0],(final[1]-1),final[2]);
        feriados=[];
        for(let i=0;i<cantidadDias;i++){
    var diff =  dateEnd.getTime() - dateStart.getTime();
    var new_diff = diff * Math.random();
    var date = new Date(dateStart.getTime() + new_diff);
    
   
    feriados.push(date);
   
    }
}
//funcion para saber que feriados caen en semana
var feriados=[];
feriadosCount.apply(this, feriados);

function feriadosCount(){
var count=0;
var countsabadosydomingos=0;
for(let i=0;i<feriados.length;i++){
    if(feriados[i].getDay()===0||feriados[i].getDay()===6){
        countsabadosydomingos++;
       
        }else{
            
            count++;
           
        }

}
return count;


}
//validador de fecha
function isValidDate(day,month,year)
{
    var dteDate;
    month=month-1;
    dteDate=new Date(year,month,day);
    return ((day==dteDate.getDate()) && (month==dteDate.getMonth()) && (year==dteDate.getFullYear()));
}

/**
 * Funcion para validar una fecha
 * Tiene que recibir:
 *  La fecha en formato español dd/mm/yyyy
 * Devuelve:
 *  true o false
 */
function validate_fecha(fecha)
{
    var patron=new RegExp("^(19|20)+([0-9]{2})([-])([0-9]{1,2})([-])([0-9]{1,2})$");

    if(fecha.search(patron)==0)
    {
        var values=fecha.split("-");
        if(isValidDate(values[2],values[1],values[0]))
        {
            return true;
        }
    }
    return false;
}
//Funcion para calcular los dias en base a dos fechas dadas
function calcularDias()
{
    var fechaInicial=document.getElementById("fechaInicial").value;
    var fechaFinal=document.getElementById("fechaFinal").value;
    var resultado=0;
    if(validate_fecha(fechaInicial) && validate_fecha(fechaFinal))
    {
        inicial=fechaInicial.split("-");
        final=fechaFinal.split("-");
        // obtenemos las fechas en milisegundos
        var dateStart=new Date(inicial[0],(inicial[1]-1),inicial[2]);
        var dateEnd=new Date(final[0],(final[1]-1),final[2]);

        if(dateStart<dateEnd)
        {
            // la diferencia entre las dos fechas, la dividimos entre 86400 segundos
            // que tiene un dia, y posteriormente entre 1000 ya que estamos
            // trabajando con milisegundos.
            var diasDif = dateEnd.getTime() - dateStart.getTime();
            resultado= (diasDif/86400000) +1;

        }else{
            alert("La fecha inicial es posterior a la fecha final");

        }
    }else{
        if(!validate_fecha(fechaInicial))
            alert("La fecha inicial es incorrecta");
        if(!validate_fecha(fechaFinal))
            alert("La fecha final es incorrecta");
    }
    return resultado;

}
 
//funcion que extrae los sabados y domingos
function contadorSabadosYDomingos(){
    var fechaInicial=document.getElementById("fechaInicial").value;
    var fechaFinal=document.getElementById("fechaFinal").value;
   
    fechaInicial = fechaInicial.split("-");
    fechaFinal = fechaFinal.split("-");

    var dtInicial = new Date(fechaInicial[0], fechaInicial[1]-1, fechaInicial[2]);
    var dtFinal =new Date(fechaFinal[0], fechaFinal[1]-1, fechaFinal[2]);
    var contadorDias = 0;
    while(dtInicial <=dtFinal){
        if(dtInicial.getDay()===0||dtInicial.getDay()===6){
       
        contadorDias++;
        }
    dtInicial = new Date(dtInicial.getTime()+86400000);// se agrega un dia
    
    }
    return contadorDias;
    
    }
   //calculo dias laborables
function diasLaborables(resultado,count, contadorDias){
   

    return resultado-(count+contadorDias);


 
}
//llamo a todas las funciones desde aca
function getDias(){
    randomTime(7);
   let totalDias=calcularDias(); 
   let contadorFinesdeSemana=contadorSabadosYDomingos(); 
   let feriados= feriadosCount(); 
   let diasLab=diasLaborables(totalDias,feriados,contadorFinesdeSemana);
   document.getElementById("resultado").innerHTML="Total de dias"+" "+totalDias;
   document.getElementById("contador").innerHTML="Sabados y Domingos"+" "+contadorFinesdeSemana;
   document.getElementById("result").innerHTML="lunes a viernes feriados "+feriados;
   document.getElementById("laborables").innerHTML="Los dias laborables son: "+ diasLab;

}




   