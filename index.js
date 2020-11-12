(function (DOM, win, doc) {
  "use strict";

  /*
    Vamos estruturar um pequeno app utilizando módulos.
    Nosso APP vai ser um cadastro de carros. Vamos fazê-lo por partes.
    A primeira etapa vai ser o cadastro de veículos, de deverá funcionar da
    seguinte forma:
    - No início do arquivo, deverá ter as informações da sua empresa - nome e
    telefone (já vamos ver como isso vai ser feito)
    - Ao abrir a tela, ainda não teremos carros cadastrados. Então deverá ter
    um formulário para cadastro do carro, com os seguintes campos:
      - Imagem do carro (deverá aceitar uma URL)
      - Marca / Modelo
      - Ano
      - Placa
      - Cor
      - e um botão "Cadastrar"
    Logo abaixo do formulário, deverá ter uma tabela que irá mostrar todos os
    carros cadastrados. Ao clicar no botão de cadastrar, o novo carro deverá
    aparecer no final da tabela.
    Agora você precisa dar um nome para o seu app. Imagine que ele seja uma
    empresa que vende carros. Esse nosso app será só um catálogo, por enquanto.
    Dê um nome para a empresa e um telefone fictício, preechendo essas informações
    no arquivo company.json que já está criado.
    Essas informações devem ser adicionadas no HTML via Ajax.
    Parte técnica:
    Separe o nosso módulo de DOM criado nas últimas aulas em
    um arquivo DOM.js.
    E aqui nesse arquivo, faça a lógica para cadastrar os carros, em um módulo
    que será nomeado de "app".
    */

  let app = (function () {

    let ajax = new XMLHttpRequest();
    let $companyName = DOM("[data-js=companyName]");
    let $companyPhone = DOM("[data-js=companyPhone]");

    return {

      //inicializa as seguintes funções:
      init: function () {
        this.getCompanyData();
        this.initEvents();
        this.getCarData();
      },

      //inicia o evendo submit do formulario;
      initEvents: function() {
        let $carForm = DOM("[data-js=carForm]");
        $carForm.on("submit", this.handleSubmit);
      },

      //quando clicado no button, essa função é dispara, previnindo o comportamento
      //padrao do submit e executando os respectivos métodos passados;
      handleSubmit: function(event) {
        event.preventDefault();
        app.saveCarData()
        app.newCar();
      },


      //lida com a exclusão de uma row;
      handleDelete: function(event) {
        event.preventDefault();
        //pega o pai do pai do elemento this que é o button: btn -> td -> tr;
        let $deletedRow = this.parentNode.parentNode; // -> tr
        let $table = $deletedRow.parentNode; //table = -> <table>
        $table.removeChild($deletedRow); // remove o filho do <table> = tr
      },

      //pega os valores do company.json
      getCompanyData: function() {
        let ajax = new XMLHttpRequest();
        ajax.open("GET", "company.json");
        ajax.send();
        ajax.addEventListener("readystatechange", this.setCompanyData, false);
      },

      //se isReady der tudo certo entra na função
      // pega os valores da API e atibui as variaveis
      // imprimindo as mesmas no html
      setCompanyData: function() {
        if(!app.isReady.call(this))
          return
        let companyInfo = JSON.parse(this.response);
        $companyName.get().textContent = companyInfo.name;
        $companyPhone.get().textContent = companyInfo.phone;
      },

      //Verifica o status da requisição
      isReady: function() {
        return this.readyState === 4 && this.status === 200;
      },

      //busca os dados dos carros o servidor.
      getCarData: function() {
        ajax.open("GET", "http://localhost:3000/car");
        ajax.send();
        ajax.addEventListener("readystatechange", this.dataCar, false);
      },

      //busca os dados do carro pelo GET dado no server e adciona no tableCar,
      //para quando dar um reload ele aparecer na tela
      dataCar: function() {
        if (!app.isReady.call(this)) return
        let cars = JSON.parse(this.response);
        cars.forEach(car => {
          app.addtable(car.image, car.brandModel, car.year, car.plate, car.color);
        });
      },

      //Faz um post no servidor, guardando os dados digitados nas inputs..
      saveCarData: function() {
        ajax.open("POST", "http://localhost:3000/car");
        ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");

        let $imageInput = DOM("[data-js=imagem]").get().value;
        let $modelInput = DOM("[data-js=modelo]").get().value;
        let $yearInput = DOM("[data-js=ano]").get().value;
        let $plateInput = DOM("[data-js=placa]").get().value;
        let $colorInput = DOM("[data-js=cor]").get().value;
        
        ajax.send(
          `image=${$imageInput}
          &brandModel=${$modelInput}
          &year=${$yearInput}
          &plate=${$plateInput}
          &color=${$colorInput}
        `);
      },

      //Pega os valores dos inputs e adciona no tela, no tr para o método addTable;
      newCar: function() {
        let $imageInput = DOM("[data-js=imagem]").get().value;
        let $modelInput = DOM("[data-js=modelo]").get().value;
        let $yearInput = DOM("[data-js=ano]").get().value;
        let $plateInput = DOM("[data-js=placa]").get().value;
        let $colorInput = DOM("[data-js=cor]").get().value;
        this.addtable($imageInput,$modelInput,$yearInput,$plateInput,$colorInput);
      },

      //método responsavel por criar os elementos HTML, e com os valores passados
      //no seu parametro preencher na tela com os respectivos dados...
      
      addtable: function(/* image, model, year, plate, color */) {
        let $carTable = DOM("[data-js=carTable]");

        let $fragment = doc.createDocumentFragment();
        let $image = doc.createElement("img");
        let $newRow = doc.createElement("tr");

        let $tdImage = doc.createElement("td");
        let $tdModel = doc.createElement("td");
        let $tdYear = doc.createElement("td");
        let $tdPlate = doc.createElement("td");
        let $tdColor = doc.createElement("td");
        let $tdDelete = doc.createElement("td");

        let $deleteButton = doc.createElement("button");
        $deleteButton.innerHTML = "delete";
        $deleteButton.addEventListener("click", this.handleDelete, false);
        $tdDelete.appendChild($deleteButton);

        $image.src = arguments[0];
        $tdImage.appendChild($image);

        $tdModel.textContent = arguments[1];
        $tdYear.textContent  = arguments[2];
        $tdPlate.textContent = arguments[3];
        $tdColor.textContent = arguments[4];

        $newRow.appendChild($tdImage);
        $newRow.appendChild($tdModel);
        $newRow.appendChild($tdYear);
        $newRow.appendChild($tdPlate);
        $newRow.appendChild($tdColor);
        $newRow.appendChild($tdDelete);

        $fragment.appendChild($newRow);
        $carTable.get().appendChild($fragment);
      },
    };
  })();

  app.init();
})(window.DOM, window, document);