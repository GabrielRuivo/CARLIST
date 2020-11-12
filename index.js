(function(DOM) {
  'use strict'

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

  const app = (() => {
    return {
      //inicializa os métodos
      init: function () {
        console.log(this);
        this.companyInfo();
        this.initEvents();
      },

      //inicializa os eventos;
      initEvents: function () {
        const $form = DOM('[class="form"]');
        $form.on('submit', this.handleSubmit);
      },

      //previne comportamento padrao do btn submit;
      //.get() => pega o elemento dentro do nó selecionado;
      //adiciona dentro da tableCar os valores criados no método createNewCar();
      handleSubmit: function handleSubmit(e) {
        e.preventDefault()
        const $tableCar = DOM('[id=table-car]').get();
        $tableCar.appendChild(app.createNewCar());
      },

      handleDelete: function handleDelete(event){
        event.preventDefault()
        var $deletedRow = this.parentNode.parentNode
        var $table = $deletedRow.parentNode
        $table.removeChild($deletedRow)
      },

      //Cria os elementos HTML
      //atribui um src para a url da imagem
      //atribui os valores as td`s
      createNewCar: function createNewCar() {
        let $fragment = document.createDocumentFragment();
        let $deleteButton = document.createElement("button");
        let $image = document.createElement('img');
        let $tr = document.createElement('tr');

        let $tdDelete= document.createElement('td');
        let $tdImage = document.createElement('td');
        let $tdModel = document.createElement('td');
        let $tdYear  = document.createElement('td');
        let $tdPlate = document.createElement('td');
        let $tdColor = document.createElement('td');

        $deleteButton.innerHTML = "Deletar"
        $deleteButton.addEventListener('click',this.handleDelete, false);
        $tdDelete.appendChild($deleteButton);

        $image.setAttribute('src', DOM('[id="image"]').get().value);
        $tdImage.appendChild($image);

        /* $tdModel = document.createTextNode(DOM('[id="model"]').get().value);
        $tdYear =  document.createTextNode(DOM('[id="year"]').get().value);
        $tdPlate = document.createTextNode(DOM('[id="plate"]').get().value);
        $tdColor = document.createTextNode(DOM('[id="color"]').get().value); */

        $tdModel.textContent = DOM('[id="model"]').get().value;
        $tdYear.textContent  = DOM('[id="year"]' ).get().value;
        $tdPlate.textContent = DOM('[id="plate"]').get().value;
        $tdColor.textContent = DOM('[id="color"]').get().value;

        $tr.appendChild($tdImage);
        $tr.appendChild($tdModel);
        $tr.appendChild($tdYear);
        $tr.appendChild($tdPlate);
        $tr.appendChild($tdColor);
        $tr.appendChild($tdDelete);
        
        return $fragment.appendChild($tr)
      },

      companyInfo: function companyInfo() {
        const ajax = new XMLHttpRequest();
        ajax.open('GET', './company.json', true);
        ajax.send();
        ajax.addEventListener('readystatechange', this.getCompanyInfo);
      },

      getCompanyInfo: function getCompanyInfo() {
        console.log('APP:', app);
        console.log('isReady:', app.isReady);
        console.log('isReady.call(this)', app.isReady.call(this));

        //se o status da requisição for false ele nao retorna os dados do json
        //se true, ele entra na função e imprime na tela os dados da API;
        if (!app.isReady.call(this)) {return} 

        const data = JSON.parse(this.response);
        
        const $companyName = DOM('[id=name]').get();
        const $companyPhone = DOM('[id=contact]').get();

        $companyName.textContent = data.name
        $companyPhone.textContent = data.phone
      },

      //Verifica o status da requisição:
      isReady: function () {
        return this.readyState === 4 && this.status === 200
      },
    }
  })()

  app.init()
})(window.DOM);
