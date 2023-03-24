var valoresRelativos = [];
var criterios = [];

function crearMatriz() {
  criterios = document.getElementById("criterios").value.split("\n").filter(Boolean);

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
      var valorRelativo = valoresRelativos[i] && valoresRelativos[i][j] || "";
      var valorInverso = valoresRelativos[j] && valoresRelativos[j][i] || "";
      if (valorRelativo) {
        matrizHtml += "<td><input type='text' value='" + valorRelativo + "' disabled></td>";
      } else if (valorInverso) {
        matrizHtml += "<td><input type='text' value='" + (1/valorInverso).toFixed(2) + "' disabled></td>";
      } else {
        matrizHtml += "<td><input type='text' name='pares-" + i + "-" + j + "' oninput='actualizarInversa(" + i + "," + j + ",this.value)'></td>";
      }
    }
  }

  matrizHtml += "</tr>";
}


  matrizHtml += "</tbody></table><button type='button' onclick='calcularValoresRelativos()'>Calcular importancias relativas</button>";

  document.getElementById("matriz").innerHTML = matrizHtml;
}

function calcularValoresRelativos() {
  valoresRelativos = [];
  var matriz = document.getElementById("matriz").getElementsByTagName("input");

  for (var i = 0; i < matriz.length; i++) {
    var name = matriz[i].getAttribute("name");
    if (name && matriz[i].value) {
      var indices = name.match(/\d+/g);
      var fila = parseInt(indices[0]);
      var columna = parseInt(indices[1]);
      var valor = parseFloat(matriz[i].value);

      if (!valoresRelativos[fila]) {
        valoresRelativos[fila] = [];
      }

      if (!valoresRelativos[columna]) {
        valoresRelativos[columna] = [];
      }

      valoresRelativos[fila][columna] = valor;
      valoresRelativos[columna][fila] = 1/valor;
    }
  }

  mostrarResultados();
}

function mostrarResultados() {
  var resultadosHtml = "<h2>Resultados</h2><table><thead><tr><th>Criterio</th><th>Importancia relativa</th></tr></thead><tbody>";

  var sumasPorFila = valoresRelativos.map(function(fila) {
    return fila.reduce(function(acc, valor) {
      return acc + valor;
    }, 0);
  });

  var sumaTotal = sumasPorFila.reduce(function(acc, valor) {
    return acc + valor;
  }, 0);

  for (var i = 0; i < criterios.length; i++) {
    resultadosHtml += "<tr><td>" + criterios[i] + "</td><td>" + (sumasPorFila[i]/sumaTotal).toFixed(2) + "</td></tr>";
  }
  
  resultadosHtml += "</tbody></table>";
  document.getElementById("resultados").innerHTML = resultadosHtml;
  }

  function actualizarInversa(fila, columna, valor) {
    if (valor != "") {
      var valorInverso = (1 / valor).toFixed(2);
      valoresRelativos[columna][fila] = parseFloat(valorInverso);
      document.getElementsByName("pares-" + columna + "-" + fila)[0].value = valorInverso;
    } else {
      valoresRelativos[columna][fila] = null;
      document.getElementsByName("pares-" + columna + "-" + fila)[0].value = "";
    }
  }
  