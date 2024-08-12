/*
  -> Function to get the list of wines in the cellar (via GET request)
*/
const getList = async () => {
  let url = 'http://127.0.0.1:5000/vinhos';
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      data.vinhos.forEach(item => insertList(item.vinho, item.uva, item.ano, item.categoria, item.fabricante))
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}


/*
  -> Function for initial loading of the list
*/
getList()


/*
  -> Function to add a wine to the list (via POST request)
*/
const postItem = async (inputVinho, inputUva, inputAno,inputCategoria, inputFabricante) => {
  const formData = new FormData();
  formData.append('vinho', inputVinho);
  formData.append('uva', inputUva);
  formData.append('ano', inputAno);
  formData.append('categoria', inputCategoria);
  formData.append('fabricante', inputFabricante);

  let url = 'http://127.0.0.1:5000/vinho';
  fetch(url, {
    method: 'post',
    body: formData
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}


/*
  -> Function to create a close button for each wine in the cellar
*/
const insertButton = (parent) => {
  let span = document.createElement("span");
  let txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  parent.appendChild(span);
}


/*
  -> Function to remove a wine from the cellar (click on the close button)
*/
const removeElement = () => {
  let close = document.getElementsByClassName("close");
  // var table = document.getElementById('myTable');
  let i;
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      let div = this.parentElement.parentElement;
      const nomeItem = div.getElementsByTagName('td')[0].innerHTML
      if (confirm("Esta certo disso?")) {
        div.remove()
        deleteItem(nomeItem)
        alert("Pronto, vinho removido (espero que tenha bebido)!")
      }
    }
  }
}

/*
  -> Function to remove a wine from the cellar (via DELETE request)
*/
const deleteItem = (item) => {
  console.log(item)
  let url = 'http://127.0.0.1:5000/vinho?vinho=' + item;
  fetch(url, {
    method: 'delete'
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}


/*
  -> Function to add a new wine to the cellar with name, grape variety, year, category, and manufacturer
*/
const newItem = () => {
  let inputVinho = document.getElementById("newVinho").value;
  let inputUva = document.getElementById("newUva").value;
  let inputAno = document.getElementById("newAno").value;
  let inputCategoria = document.getElementById("newCategoria").value;
  let inputFabricante = document.getElementById("newFabricante").value;

  if (inputVinho === '') {
    alert("Escreva o nome de um vinho!");
  } else if (isNaN(inputAno)) {
    alert("Ano deve ser numerico!");
  } else {
    insertList(inputVinho, inputUva, inputAno, inputCategoria, inputFabricante)
    postItem(inputVinho, inputUva, inputAno, inputCategoria, inputFabricante)
    alert("Vinho incluido!")
  }
}


/*
  Function to add wines to the list
*/
const insertList = (vinho, uva, ano, categoria, fabricante) => {
  var item = [vinho, uva, ano, categoria, fabricante]
  var table = document.getElementById('myTable');
  var row = table.insertRow();

  for (var i = 0; i < item.length; i++) {
    var cel = row.insertCell(i);
    cel.textContent = item[i];
  }
  insertButton(row.insertCell(-1))
  document.getElementById("newVinho").value = "";
  document.getElementById("newUva").value = "";
  document.getElementById("newAno").value = "";
  document.getElementById("newCategoria").value = "";
  document.getElementById("newFabricante").value = "";

  removeElement()
}
