function crearMatriz() {
    // Obtener los criterios ingresados por el usuario
    var criterios = document.getElementById("criterios").value.split("\n");
    
    // Crear la matriz 2x2
    var matrizHtml = "<table><thead><tr><th></th>";
    
    for (var i = 0; i < criterios.length; i++) {
      matrizHtml += "<th>" + criterios[i] + "</th>";
    }
    
    matrizHtml += "</tr></thead><tbody>";
    
    for (var i = 0; i < criterios.length; i++) {
      matrizHtml += "<tr><th>" + criterios[i] + "</th>";
    
      for (var j = 0; j < criterios.length; j++) {
        if (i == j) {
          matrizHtml += "<td>-</td>";
        } else {
          var inputHtml = "<input type='number' min='1' max='9' name='pares-" + i + "-" + j + "'";
  
          // Revisar si ya se hizo una comparación en la contraparte de la matriz
          if (document.querySelector("[name='pares-" + j + "-" + i + "']")) {
            inputHtml += " value='" + (1 / document.querySelector("[name='pares-" + j + "-" + i + "']").value).toFixed(2) + "'";
            inputHtml += " disabled";
          }
  
          inputHtml += ">";
  
          matrizHtml += "<td>" + inputHtml + "</td>";
        }
      }
    
      matrizHtml += "</tr>";
    }
    
    matrizHtml += "</tbody></table><button onclick='calcularValoresRelativos()'>Calcular importancias relativas</button>";
    
    // Mostrar la matriz en el formulario
    document.getElementById("matriz").innerHTML = matrizHtml;
  }

  function calcularValoresRelativos() {
    var matriz = [];
  
    // Obtener los criterios ingresados por el usuario
    var criterios = document.getElementById("criterios").value.split("\n");
  
    // Crear una matriz vacía
    for (var i = 0; i < criterios.length; i++) {
      matriz.push([]);
    }
  
    // Llenar la matriz con los valores de los radio buttons
    for (var i = 0; i < criterios.length; i++) {
      for (var j = 0; j < criterios.length; j++) {
        if (i == j) {
          matriz[i].push(1);
        } else {
          var valor = parseInt(document.querySelector('input[name="pares-' + i + '"]:checked').value);
  
          // Si ya se ingresó una comparación entre j e i, tomar el inverso
          if (matriz[j][i] != undefined) {
            valor = 1 / valor;
          }
  
          // Asignar la calificación correspondiente
          if (valor == 1) {
            matriz[i].push(1);
          } else if (valor == 2) {
            matriz[i].push(1 / 3);
          } else if (valor == 3) {
            matriz[i].push(1 / 2);
          } else if (valor == 4) {
            matriz[i].push(1 / 2);
          } else if (valor == 5) {
            matriz[i].push(1);
          } else if (valor == 6) {
            matriz[i].push(2);
          } else if (valor == 7) {
            matriz[i].push(3);
          } else if (valor == 8) {
            matriz[i].push(4);
          } else if (valor == 9) {
            matriz[i].push(5);
          }
        }
      }
    }
  
    // Calcular los valores relativos
    var valoresRelativos = [];
    for (var i = 0; i < criterios.length; i++) {
      var suma = 0;
      for (var j = 0; j < criterios.length; j++) {
        suma += matriz[j][i];
      }
      valoresRelativos.push(suma / criterios.length);
    }
  
    // Mostrar los valores relativos en el formulario
    var resultadosHtml = "<table><thead><tr><th>Criterio</th><th>Valor relativo</th><th>Importancia relativa</th></tr></thead><tbody>";
    var sumaValoresRelativos = valoresRelativos.reduce(function (a, b) { return a + b; }, 0);
    for (var i = 0; i < criterios.length; i++) {
      var importanciaRelativa = valoresRelativos[i] / sumaValoresRelativos;
      resultadosHtml += "<tr><td>" + criterios[i] + "</td><td>" + valoresRelativos[i].toFixed(3) + "</td><td>" + (importanciaRelativa * 100).toFixed(2) + "%</td></tr>";
    }
    resultadosHtml += "</tbody></table>";
  
    document.getElementById("resultados").innerHTML = resultadosHtml;
  }
  