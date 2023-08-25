class UnitsOfMeasurement { //Classe para Enumeração:
  static Liter = 'Liter';
  static Kilo = 'Kilogram';
  static Unity = 'Unity';
}


const form = document.getElementById('Form'); //Pegando o formulário.

// Parte do Update Button

let ItemFromUpdateItemLocalStorage = JSON.parse(localStorage.getItem('ItemToUpdate')); //Pegando o item para o update.

const formSituationText = document.getElementById('Form-Situation'); //Pegando a div com o texto da situação da inserção no formulário.
const spanFromSituationText = formSituationText.getElementsByTagName('span'); //Pegando o span dentro dessa div.

const inputsArray = document.getElementsByTagName('input'); //Pegando todos os inputs do HTML.
const UnitOfMeasurementSelect = form.querySelector('select[name="UnitSelect"]'); //Pegando o Select da seleção do tipo de unidade de medida.

function DateManipulationToInput(date){ //Função para manipular uma string de data.
  return date.substring(0, 10) //Pega a string fornecida e vai do começo dela até o caracteres de indice 10.
}

/* 
  Explicação da condição:
  Caso haja um valor dentro do Update do LocalStorage, os valores dentro dos inputs serão alterados,
  com isso, o usuário poderá ver os valores atuais do item, e poderá modificar itens específicos sem perder valores
  anteriores.

  Junto a isso, caso haja algo dentro do Update, o texto de referência da página será alterado de "adicionando" para "alterando".
*/

if(ItemFromUpdateItemLocalStorage){ //Caso haja um item para ser alterado, esta condição irá ser utilizada
  if(spanFromSituationText[0].classList.contains('form__text--situation--enable')){
    spanFromSituationText[0].classList.remove('form__text--situation--enable');
    spanFromSituationText[0].classList.add('form__text--situation--disable')

    spanFromSituationText[1].classList.remove('form__text--situation--disable');
    spanFromSituationText[1].classList.add('form__text--situation--enable');

    inputsArray[0].value = ItemFromUpdateItemLocalStorage.Name;

    if(ItemFromUpdateItemLocalStorage.UnitOfMeasurement == "Kilogram"){
      UnitOfMeasurementSelect.selectedIndex = 1;
      ChangeUnitOfMeasurement("kg")
    }
    else if(ItemFromUpdateItemLocalStorage.UnitOfMeasurement == "Liter"){
      UnitOfMeasurementSelect.selectedIndex = 2;
      ChangeUnitOfMeasurement("lt")
    }
    else if(ItemFromUpdateItemLocalStorage.UnitOfMeasurement =="Unity"){
      UnitOfMeasurementSelect.selectedIndex = 3;
      ChangeUnitOfMeasurement("un")
    }

    let priceString = ItemFromUpdateItemLocalStorage.Price;
    priceString = priceString.substring(3);
    priceString = priceString.replace('.', "")

    inputsArray[1].value = ItemFromUpdateItemLocalStorage.Amount;
    inputsArray[2].value = priceString;

    if(ItemFromUpdateItemLocalStorage.IsPerishable){
      inputsArray[3].checked = true;

      const validationDateDiv = document.getElementById('ValidationDate-div');
      const validatioDateInput = document.getElementById('ValidationDate');

      validationDateDiv.classList.remove('form__containers--status--disabled');
      validationDateDiv.classList.add('form__containers');

      validatioDateInput.disabled = false;

      inputsArray[5].value = DateManipulationToInput(ItemFromUpdateItemLocalStorage.ValidationDate)
    }
    else{
      inputsArray[4].checked = true;
    }

    inputsArray[6].value = DateManipulationToInput(ItemFromUpdateItemLocalStorage.FabricationDate)


  }
}
else{
  if(spanFromSituationText[1].classList.contains('form__text--situation--enable')){
    spanFromSituationText[1].classList.remove('form__text--situation--enable');
    spanFromSituationText[1].classList.add('form__text--situation--disable')

    spanFromSituationText[0].classList.remove('form__text--situation--disable');
    spanFromSituationText[0].classList.add('form__text--situation--enable')
  }
}

// Funções para manipular o CheckBox
const CheckBoxInputs = document.querySelectorAll('input[name="optionCheckBox"]');

CheckBoxInputs[0].addEventListener(
  "change", function(ev){
    CheckBoxInputs[0].checked = true;
    CheckBoxInputs[1].checked = false;

    const validationDateDiv = document.getElementById('ValidationDate-div');
    const validatioDateInput = document.getElementById('ValidationDate');

    validationDateDiv.classList.remove('form__containers--status--disabled');
    validationDateDiv.classList.add('form__containers');

    validatioDateInput.disabled = false;
  }
);

CheckBoxInputs[1].addEventListener(
  "change", function(ev){
    CheckBoxInputs[1].checked = true;
    CheckBoxInputs[0].checked = false;

    const validationDateDiv = document.getElementById('ValidationDate-div');
    const validatioDateInput = document.getElementById('ValidationDate');

    if(!validationDateDiv.classList.contains('form__containers--status--disabled')){
      validationDateDiv.classList.remove('form__containers');
      validationDateDiv.classList.add('form__containers--status--disabled');

      validatioDateInput.disabled = true;
    }
  }
);

// Função para mudar o tipo de unidade de medida que aparece ao lado do input
function ChangeUnitOfMeasurement(abbreviation){
  const divToQuantity = document.getElementById('Quantity-Div');

  let textAlreadyAppended = divToQuantity.getElementsByTagName('p');

  if(textAlreadyAppended.length != 0){
    divToQuantity.removeChild(textAlreadyAppended[0]);
  }

  let textToAppend = document.createElement('p');

  textToAppend.innerText = abbreviation;
  textToAppend.classList.add('form__labels');

  divToQuantity.appendChild(textToAppend);
}

const unitOfMeasurementInput = document.querySelector('select[name="UnitSelect"]');

unitOfMeasurementInput.addEventListener(
  "change", function(ev){
    let valueChoosedFromUnitOfMeasurement = unitOfMeasurementInput.value;

    if(valueChoosedFromUnitOfMeasurement === "Kilograms"){
      ChangeUnitOfMeasurement("kg");
    }
    else if(valueChoosedFromUnitOfMeasurement === "Liters"){
      ChangeUnitOfMeasurement("lt");
    }
    else if(valueChoosedFromUnitOfMeasurement === "Unity"){
      ChangeUnitOfMeasurement("un");
    }
  }
);


// Funções para Verificação dos componentes 
function NameVerification(name){
  let onlyLetters = /^[A-Za-z\s]+$/.test(name);

  if(!onlyLetters){
    return false;
  }

  let nameInCharVector = name.split('');

  if(nameInCharVector.length > 50){
    return false
  }

  name = name.replace(/ /g, "")

  if(name === null){
    return false;
  }

  return true;
}

function DecimalQuantityVerification(quantity){
  quantity = quantity.replace(',', '.');

  let quantityIsNumber = /^[0-9]+(\.[0-9]+)?$/.test(quantity);

  if(!quantityIsNumber){
    return false;
  }
  
  let quantityToArray = quantity.split('');
  let quantityOfNumberAfterFloat = 0;

  if(quantity.includes(".")){
    for(let i = 0; i < quantityToArray.length; i++){
      if(quantityToArray[i] == '.'){
        quantityOfNumberAfterFloat = quantityToArray.length - i - 1;
      }
    }
  }

  if(quantityOfNumberAfterFloat > 3){
    return false;
  }

  return true;
}

function UnityQuantityVerification(quantity){

  let quantityHasOnlyNumbers = /^\d+$/.test(quantity);

  if(!quantityHasOnlyNumbers){
    return false;
  }

  if(quantity == null){
    return false;
  }

  return true;
}

function ActualDayValidationVerification(validationDate, actualDay, actualMonth, actualYear){
  let validationDateYear = validationDate.substring(0, 4);
  let validationDateMonth = validationDate.substring(5, 7);
  let validationDateDay = validationDate.substring(8, 10);

  let validationDateYearToNumber = parseInt(validationDateYear);
  let validationDateMonthToNumber = parseInt(validationDateMonth);
  let validationDateDayToNumber = parseInt(validationDateDay);

  if(validationDateYearToNumber > actualYear){
    return true;
  }
  else if(validationDateYearToNumber == actualYear && validationDateMonthToNumber > actualMonth){
    return true;
  }
  else if(validationDateYearToNumber == actualYear && validationDateMonthToNumber == actualMonth && validationDateDayToNumber >= actualDay){
    return true;
  }

  return false
}

function FabricationItemVerification(validationDate, fabricationDate){
  let validationDateYear = validationDate.substring(0, 4);
  let validationDateMonth = validationDate.substring(5, 7);
  let validationDateDay = validationDate.substring(8, 10);

  let validationDateYearToNumber = parseInt(validationDateYear);
  let validationDateMonthToNumber = parseInt(validationDateMonth);
  let validationDateDayToNumber = parseInt(validationDateDay);

  let fabricationDateYear = fabricationDate.substring(0, 4);
  let fabricationDateMonth = fabricationDate.substring(5, 7);
  let fabricationDateDay = fabricationDate.substring(8, 10);

  let fabricationDateYearToNumber = parseInt(fabricationDateYear);
  let fabricationDateMonthToNumber = parseInt(fabricationDateMonth);
  let fabricationDateDayToNumber = parseInt(fabricationDateDay);

  if(fabricationDateYearToNumber < validationDateYearToNumber){
    return true;
  }
  else if(fabricationDateYearToNumber == validationDateYearToNumber && fabricationDateMonthToNumber < validationDateMonthToNumber){
    return true;
  }
  else if(fabricationDateYearToNumber == validationDateYearToNumber && fabricationDateMonthToNumber == validationDateMonthToNumber && fabricationDateDayToNumber <= validationDateDayToNumber){
    return true;
  }

  return false;
}


// Função para validar os atributos e enviar o formulário
form.addEventListener(
  "submit", function(ev){
    ev.preventDefault();

    let ResponseFromFormToLocalStorage = new Object();

    // Verificação do Nome:
    const nameInput = document.getElementById('NameInput');
    let nameFromInput = nameInput.value;
    nameFromInput = nameFromInput.trim();

    let nameConfirmation = NameVerification(nameFromInput);

    if(!nameConfirmation){
      alert("Nome inválido");

      return;
    }


    // Verificação do Preço:
    const priceInput = document.getElementById('PriceInput');
    let valueOfPriceInput = priceInput.value;
    valueOfPriceInput = valueOfPriceInput.trim();
    valueOfPriceInput = valueOfPriceInput.replace(',', '.');

    let priceConfirmation = DecimalQuantityVerification(valueOfPriceInput);

    if(!priceConfirmation){
      alert("Valor de preço inválido...");
      
      return ;
    }

    valueOfPriceInput = parseFloat(valueOfPriceInput);

    const monetaryFormat = new Intl.NumberFormat(
      'pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }  
    );

    valueOfPriceInput = monetaryFormat.format(valueOfPriceInput);


    // Verificação da Quantidade:
    const quantitySelect = document.querySelector('select[name="UnitSelect"]');
    let valueOfQuantitySelect = quantitySelect.value;

    const quantityInput = document.getElementById('QuantityInput');
    let valueOfQuantityInput = quantityInput.value;

    valueOfQuantityInput = valueOfQuantityInput.trim();
    valueOfQuantityInput = valueOfQuantityInput.replace(',', '.');

    let quantityConfirmation = true;

    if(valueOfQuantitySelect === "NotChoosed"){
      alert("Escolhe uma opção de unidade de medida...");

      return;
    }
    else if(valueOfQuantitySelect === "Kilograms" || valueOfQuantitySelect === "Liters"){
      quantityConfirmation = DecimalQuantityVerification(valueOfQuantityInput);
    }
    else if(valueOfQuantitySelect === "Unity"){
      quantityConfirmation = UnityQuantityVerification(valueOfQuantityInput);
    }

    if(!quantityConfirmation){
      alert("Valor de quantidade inválido...");

      return;
    }

    if(valueOfQuantitySelect === "Kilograms"){
      ResponseFromFormToLocalStorage.UnitOfMeasurement = UnitsOfMeasurement.Kilo;

      valueOfQuantityInput = parseFloat(valueOfQuantityInput);
    }
    else if(valueOfQuantitySelect === "Liters"){
      ResponseFromFormToLocalStorage.UnitOfMeasurement = UnitsOfMeasurement.Liter;

      valueOfQuantityInput = parseFloat(valueOfQuantityInput);
    }
    else if(valueOfQuantitySelect === "Unity"){
      ResponseFromFormToLocalStorage.UnitOfMeasurement = UnitsOfMeasurement.Unity;

      valueOfQuantityInput = parseInt(valueOfQuantityInput)
    }


    // Verificação da Data de Validade e da Data de Fabricação:
    const CheckBoxInputs = document.querySelectorAll('input[name="optionCheckBox"]');

    if(CheckBoxInputs[0].checked == false && CheckBoxInputs[1].checked == false){
      alert("Selecione uma das opções da Checkbox...");

      return;
    }

    if(CheckBoxInputs[0].checked){
      const ValidationDateInput = document.getElementById('ValidationDate');
      let valueOfValidationDateInput = ValidationDateInput.value;

      const informationsAboutActualTime = new Date();
      let actualDay = informationsAboutActualTime.getDate();
      let actualMonth = informationsAboutActualTime.getMonth() + 1;
      let actualYear = informationsAboutActualTime.getFullYear();

      let actualDayValidationConfirmation = ActualDayValidationVerification(valueOfValidationDateInput, actualDay, actualMonth, actualYear);

      if(!actualDayValidationConfirmation){
        alert("O item já está vencido...")

        return;
      }

      const FabricationDateInput = document.getElementById('FabricationDate');
      let valueOfFabricationDateInput = FabricationDateInput.value;

      let validationItemConfirmation = FabricationItemVerification(valueOfValidationDateInput, valueOfFabricationDateInput);

      if(!validationItemConfirmation){
        alert("A data de fabricação é maior que a data de validade...")

        return;
      }
    }


    // Atribuindo os valores das checkboxes para o objeto
    if(CheckBoxInputs[0].checked){
      ResponseFromFormToLocalStorage.IsPerishable = true;

      const ValidationDateInput = document.getElementById('ValidationDate');
      let valueOfValidationDateInput = ValidationDateInput.value;

      let validationDateYear = valueOfValidationDateInput.substring(0, 4);
      let validationDateMonth = valueOfValidationDateInput.substring(5, 7);
      let validationDateDay = valueOfValidationDateInput.substring(8, 10);

      let validationDateYearToNumber = parseInt(validationDateYear);
      let validationDateMonthToNumber = parseInt(validationDateMonth);
      let validationDateDayToNumber = parseInt(validationDateDay);

      const validationDateFromForm = new Date(validationDateYearToNumber, validationDateMonthToNumber - 1, validationDateDayToNumber);
      ResponseFromFormToLocalStorage.ValidationDate = validationDateFromForm; // Atribuindo o valor da data de validade para o objeto
    }
    else{
      ResponseFromFormToLocalStorage.IsPerishable = false;
    }

    const FabricationDateInput = document.getElementById('FabricationDate');
    let valueOfFabricationDateInput = FabricationDateInput.value;

    let fabricationDateYear = valueOfFabricationDateInput.substring(0, 4);
    let fabricationDateMonth = valueOfFabricationDateInput.substring(5, 7);
    let fabricationDateDay = valueOfFabricationDateInput.substring(8, 10);

    let fabricationDateYearToNumber = parseInt(fabricationDateYear);
    let fabricationDateMonthToNumber = parseInt(fabricationDateMonth);
    let fabricationDateDayToNumber = parseInt(fabricationDateDay);

    const fabricationDateFromForm = new Date(fabricationDateYearToNumber, fabricationDateMonthToNumber - 1, fabricationDateDayToNumber);

    ResponseFromFormToLocalStorage.Name = nameFromInput; // Atribuindo o valor do nome para o objeto
    ResponseFromFormToLocalStorage.Amount = valueOfQuantityInput; // Atribuindo o valor da quantidade para o objeto
    ResponseFromFormToLocalStorage.Price = valueOfPriceInput;
    ResponseFromFormToLocalStorage.FabricationDate = fabricationDateFromForm; // Atribuindo o valor da data de fabricação para o objeto
    ResponseFromFormToLocalStorage.Id = 0;
    let itenListFromLocalStorage = JSON.parse(localStorage.getItem('ItemList'));

    if(!itenListFromLocalStorage){
      ResponseFromFormToLocalStorage.Id = 1;
    }
    else{
      ResponseFromFormToLocalStorage.Id = itenListFromLocalStorage[itenListFromLocalStorage.length - 1].Id + 1;
    }

    alert("Formulário enviado com sucesso!");

    if(!ItemFromUpdateItemLocalStorage){
      LocalStorageStart(ResponseFromFormToLocalStorage);
      return;
    }

    UpdateItem(ResponseFromFormToLocalStorage, ItemFromUpdateItemLocalStorage);

    return;
  }
);


// Função para adicionar o item no LocalStorage
function LocalStorageStart(formValuesObject){
  let itensListFromLocalStorage = JSON.parse(localStorage.getItem('ItemList'));

  if(!itensListFromLocalStorage){
    let newListToLocalStorage = [];
    newListToLocalStorage.push(formValuesObject);

    localStorage.setItem("ItemList", JSON.stringify(newListToLocalStorage));

    return;
  }

  localStorage.removeItem("ItemList");

  itensListFromLocalStorage.push(formValuesObject);

  localStorage.setItem("ItemList", JSON.stringify(itensListFromLocalStorage));

  return;
}

function UpdateItem(updatedItem, itemToFind){
  let ListItemFromLocalStorage = JSON.parse(localStorage.getItem('ItemList'));

  for(let i = 0; i < ListItemFromLocalStorage.length; i++){
    if(ListItemFromLocalStorage[i].Id == itemToFind.Id){
      ListItemFromLocalStorage[i].Name = updatedItem.Name;
      ListItemFromLocalStorage[i].UnitOfMeasurement = updatedItem.UnitOfMeasurement;
      ListItemFromLocalStorage[i].Amount = updatedItem.Amount;
      ListItemFromLocalStorage[i].Price = updatedItem.Price;
      ListItemFromLocalStorage[i].IsPerishable = updatedItem.IsPerishable;

      if(updatedItem.IsPerishable){
        ListItemFromLocalStorage[i].ValidationDate = updatedItem.ValidationDate;
      }

      ListItemFromLocalStorage[i].FabricationDate = updatedItem.FabricationDate;
    }
  }

  localStorage.clear();
  localStorage.setItem('ItemList', JSON.stringify(ListItemFromLocalStorage));

  return ;
}

function RemoveLocaleStageUpdate(){
  localStorage.removeItem('ItemToUpdate');
}
