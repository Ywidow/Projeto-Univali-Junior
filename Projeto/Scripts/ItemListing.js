const itensList = document.getElementById('ItensList');

let itensListFromLocalStorage = JSON.parse(localStorage.getItem('ItemList'));

function RemoveFromLocaleStage(ev){

  let deleteConfirmation = confirm("Você tem certeza que quer remover este item?");

  if(deleteConfirmation){
    const removeButton = ev.currentTarget;
    const removeButtonSpan = removeButton.parentNode;
    const itensLi = removeButtonSpan.parentNode;

    const elementsInsideItensLi = itensLi.getElementsByTagName('div');
    const itenIdArea = elementsInsideItensLi[0];

    const textsInsideItenIdAdrea = itenIdArea.getElementsByTagName('p');
    let itenId = parseInt(textsInsideItenIdAdrea[1].textContent);

    let localeStorageListItens = JSON.parse(localStorage.getItem('ItemList'));

    for(let i = 0; i < localeStorageListItens.length; i++){
      if(localeStorageListItens[i].Id === itenId){
        localeStorageListItens.splice(i, 1);
      }
    }

    if(localeStorageListItens.length == 0){
      localStorage.clear();
    }
    else{
      localStorage.removeItem('ItemList');

      localStorage.setItem("ItemList", JSON.stringify(localeStorageListItens));
    }


    const list = itensLi.parentNode;
    list.removeChild(itensLi);

    alert("Item removido com sucesso!")
  }
  else{
    alert("Ok, o item não foi removido");
  }
}

function UpdateList(ev){
  const editButton = ev.currentTarget;
  const editButtonSpan = editButton.parentNode;
  const itensLi = editButtonSpan.parentNode;

  const elementsInsideItensLi = itensLi.getElementsByTagName('div');
  const itenIdArea = elementsInsideItensLi[0];

  const textsInsideItenIdAdrea = itenIdArea.getElementsByTagName('p');
  let itenId = parseInt(textsInsideItenIdAdrea[1].textContent);

  let itemListFromLocalStorage = JSON.parse(localStorage.getItem('ItemList'));
  let itemToUpdate;

  for(let i = 0; i < itemListFromLocalStorage.length; i++){
    if(itemListFromLocalStorage[i].Id == itenId){
      itemToUpdate = itemListFromLocalStorage[i];
    }
  }

  localStorage.setItem('ItemToUpdate', JSON.stringify(itemToUpdate));

  window.location.href = "index.html#Form";
}

for(let i = 0; i < itensListFromLocalStorage.length; i++){
  // Manipulação do li:
  let liFromItensList = document.createElement('li');
  liFromItensList.classList.add('items-list__item');

  // Divs Manipulation:
  let divsList = [];

  let divId = document.createElement('div');
  let divName = document.createElement('div');
  let divUnityOfMeasurement = document.createElement('div');
  let divQuantity = document.createElement('div');
  let divPrice = document.createElement('div');
  let divPereshible = document.createElement('div');
  let divFabricationDate = document.createElement('div');

  if(itensListFromLocalStorage[i].IsPerishable){
    let divValidationDate = document.createElement('div');
    
    divsList = [
      divId, divName, divUnityOfMeasurement, divQuantity, divPrice, divPereshible, divValidationDate, divFabricationDate
    ]
  }
  else{
    divsList = [
      divId, divName, divUnityOfMeasurement, divQuantity, divPrice, divPereshible, divFabricationDate
    ]
  }

  for(let d = 0; d < divsList.length; d++){
    divsList[d].classList.add('list__item-text-area')
  }

  // Inserting informations in Divs:

  let contentArray = [];

  let tittlesArray = [];

  // Manipulatin date types:
  let FabricationDateYear = itensListFromLocalStorage[i].FabricationDate.substring(0, 4);
  let FabricationDateMonth = itensListFromLocalStorage[i].FabricationDate.substring(5, 7);
  let FabricationDateDay = itensListFromLocalStorage[i].FabricationDate.substring(8, 10);

  let FabricationDate = FabricationDateDay + "/" + FabricationDateMonth + "/" + FabricationDateYear;


  if(itensListFromLocalStorage[i].IsPerishable){
    let validationDateYear = itensListFromLocalStorage[i].ValidationDate.substring(0, 4);
    let validationDateMonth = itensListFromLocalStorage[i].ValidationDate.substring(5, 7);
    let validationDateDay = itensListFromLocalStorage[i].ValidationDate.substring(8, 10);

    let validationDate = validationDateDay + "/" + validationDateMonth + "/" + validationDateYear;

    contentArray = [
      itensListFromLocalStorage[i].Id, itensListFromLocalStorage[i].Name, itensListFromLocalStorage[i].UnitOfMeasurement, itensListFromLocalStorage[i].Amount,
      itensListFromLocalStorage[i].Price, itensListFromLocalStorage[i].IsPerishable, validationDate, FabricationDate
    ];

    tittlesArray = ["ID:", "Name:", "UF:", "Quantity:", "Price:", "Perecivel:", "DV:", "DF"]
  }
  else{
    contentArray = [
      itensListFromLocalStorage[i].Id, itensListFromLocalStorage[i].Name, itensListFromLocalStorage[i].UnitOfMeasurement, itensListFromLocalStorage[i].Amount,
      itensListFromLocalStorage[i].Price, itensListFromLocalStorage[i].IsPerishable, FabricationDate
    ];

    tittlesArray = ["ID:", "Name:", "UF:", "Quantity:", "Price:", "Perecivel:", "DF"]
  }

  for(let j = 0; j < divsList.length; j++){
    const tittleToAppendInDiv = document.createElement('p');
    const infoToAppendInDiv = document.createElement('p');

    tittleToAppendInDiv.textContent = tittlesArray[j];
    infoToAppendInDiv.textContent = contentArray[j];

    divsList[j].append(tittleToAppendInDiv, infoToAppendInDiv);
  }

  // Inserindo Divs dentro de Li:
  for(let j = 0; j < divsList.length; j++){
    liFromItensList.appendChild(divsList[j]);
  }

  //Inserindo Li dentro da Ul:
  itensList.appendChild(liFromItensList);


  // Span Manipulation:
  let spanButtons = document.createElement('span');
  spanButtons.classList.add('list__buttons-area')

  let editButton = document.createElement('button');
  let removeButton = document.createElement('button');
  let spanEditButton = document.createElement('span');
  let spanRemoveButton = document.createElement('span');


  editButton.classList.add('list__button');
  editButton.classList.add('list__button--type--edit');
  editButton.innerHTML = '<i class="fa-solid fa-pen-to-square buttons__icon"></i>';
  editButton.addEventListener('click', UpdateList)

  spanEditButton.innerText = "Edit"
  spanEditButton.classList.add('buttons-area__text-container');

  editButton.appendChild(spanEditButton);


  removeButton.classList.add('list__button');
  removeButton.classList.add('list__button--type--delete');
  removeButton.innerHTML = '<i class="fa-solid fa-trash buttons__icon"></i>';
  removeButton.addEventListener('click', RemoveFromLocaleStage)

  spanRemoveButton.innerText = "Delete"
  spanRemoveButton.classList.add('buttons-area__text-container');

  removeButton.appendChild(spanRemoveButton);

  spanButtons.append(editButton, removeButton);

  liFromItensList.appendChild(spanButtons);
}