/*
  -> Função para obter a lista de vinhos na adega (via requisição GET)
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
  -> Função para carregamento inicial da lista
*/
getList()


/*
  -> Função para adicionar um vinho na lista (via requisição POST)
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
  -> Função para criar um botão close para cada vinho da adega
*/
const insertButton = (parent) => {
  let span = document.createElement("span");
  let txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  parent.appendChild(span);
}


/*
  -> Função para remover um vinho da adega (click no botão close)
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
  -> Função para remover um vinho da adega (via requisição DELETE)
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
  -> Função para adicionar um novo vinho na adega com nome, uva, ano, categoria e fabricante
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
  Função para inserir vinhos na lista
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