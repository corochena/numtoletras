var num = "";

$('body').on("keypress", function(e) {
  num += e.key;
  $('p').html(addCommas(num) + ": " + numToLetras(num));
});

$('button').on("click", function(e) {
  var digit = e.currentTarget.textContent;
  
  if (digit == "C") num = "";
  else if (digit == "<") 
    {
      if (num.length > 0) num = num.slice(0,-1);
    }
  else num += digit;
  
  $('p').html(addCommas(num) + ": " + numToLetras(num));
});

function addCommas(str) {
  var rem = str.length % 3;
  if (rem == 0) rem = 3;
  
  var commaSep = str.substr(0,rem);
  
  for (var i=0; i<Math.floor((str.length-1)/3); i++)
    commaSep += "," + str.substr(rem+3*i, 3);
  return commaSep;    
}

function numToLetras(numStr) {
  var units = ["", "un", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho", "nueve", "diez", "once", "doce", "trece", "catorce", "quince", "dieciseis", "diecisiete", "dieciocho", "diecinueve", "veinte", "veintiuno", "veintidos", "veintitres", "veinticuatro", "veinticinco", "veintiseis", "veintisiete", "veintiocho", "veintinueve"];
  var tens = ["", "", "veinte", "treinta", "cuarenta", "cincuenta", "sesenta", "setenta", "ochenta", "noventa"];
  var hundreds = ["", "ciento", "doscientos", "trescientos", "cuatrocientos", "quinientos", "seiscientos", "setecientos", "ochocientos", "novecientos"];
  
  if (numStr.length < 7) {
    var number = Number(numStr);
    numStr = String(number); // sin esta instruccion da un error con 1,0xx (ej 1,043) por el 0xx

    if (number < 30) 
      return units[number];
    else if (number < 100)
      return tens[numStr[0]] + ((numStr[1] == 0) ? "" : " y " + units[numStr[1]]);
    else if (number== 100)
      return "cien";
    else if (number < 1000)
      return hundreds[numStr[0]] + " " + numToLetras(numStr[1] + numStr[2]);
    else if (number < 1e6)
      return numToLetras(numStr.substring(0,numStr.length-3)) + " mil " + numToLetras(numStr.substring(numStr.length-3));  
  }
  else return more(numStr);
  
  function more(numStr) {
    var words = [" millon", " billon", " trillon", " cuatrillon", " quintillon"];
    var i = Math.floor((numStr.length-1) / 6);

    var suffix = "es ";
    if (numStr.length == 6*i + 1 && numStr[0] == "1") suffix = " ";
    
    return numToLetras(numStr.substring(0,numStr.length-6*i)) + words[i-1] + suffix + numToLetras(numStr.substring(numStr.length-6*i));
  }
}

console.log(numToLetras("15936535897932384626433832795"));
console.log(numToLetras(String(Math.pow(2,54)-1)));

/*
var i = 0;
setInterval(function() {
  console.log(numToLetras(i));
  i++;//
}, 100);
*/