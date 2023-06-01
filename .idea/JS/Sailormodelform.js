const urlPostSailormodel = 'http://localhost:8080/sailors'

document.addEventListener('DOMContentLoaded', createFormEventListener);
let formSailormodel;

function createFormEventListener(){
    formSailormodel = document.getElementById("Sailormodel-form");
    formSailormodel.addEventListener("submit", handleFormSubmit);
}

async function handleFormSubmit(event) {
    event.preventDefault();

    const formData = new FormData(formSailormodel);
    const objectData = formDataToObject(formData);

    await CreateSailor(objectData);

    actionFetchSailormodels()
}

function convertFormDataToJson(formData) {
    // laver formData til JSON
    const plainFormData = Object.fromEntries(formData.entries());
    const formDataJsonString = JSON.stringify(plainFormData);
    console.log(formDataJsonString);
    return formDataJsonString
}

async function postFormDataAsJson(url, jsonToSend) {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: jsonToSend,
    };
    const response = await fetch(url, fetchOptions);
    if (!response.ok) {
        console.log("fejl i postFormDataAsJson")
        const errorMessage = await response.text();
        throw new Error(errorMessage);
    }
    return response.json();
}

/// fill table with sailormodels

const urlGetSailormodels = 'http://localhost:8080/sailors'
const tableSailormodel = document.getElementById('Sailormodel-list')

async function createSailormodelTable(sailormodel) {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${sailormodel.id}</td>
      <td>${sailormodel.points}</td>
      <td>${sailormodel.contestId}</td>
    `;

    cell = row.insertCell(2)
    let pbUpdate = document.createElement("button")
    pbUpdate.textContent = "Opdater"
    pbUpdate.className = "buttonupdate"
    pbUpdate.addEventListener('click', function () {
        handleSailorUpdateById(sailormodel.id)
    })
    cell.appendChild(pbUpdate)
    tableSailormodel.appendChild(row);

    //Delete Sailor
    cell = row.insertCell(2)
    let pbDelete = document.createElement("button")
    pbDelete.textContent = "Delete"
    pbDelete.className = "btn btn-primary" /*buttondelete*/
    pbDelete.addEventListener('click', function () {

        restDeleteSailormodel(sailormodel)
    })
    cell.appendChild(pbDelete)

}

let lstSailor = []
async function actionFetchSailormodels() {
    lstSailor = await fetchAny(urlGetSailormodels);
    tableSailormodel.innerHTML = '';
    lstSailor.forEach(createSailormodelTable)
}
actionFetchSailormodels()
function printTest(testid, sailormodel) {
    console.log(testid)
    console.log(sailormodel)
}

async function restDeleteSailormodel(sailormodel) {
    const url = "http://localhost:8080/sailors/" + sailormodel.id;
    const fetchOptions = {
        method: "DELETE",
        headers: {
            "Content-type": "application/json"
        },
        body: ""
    }
    //calls backend and wait for return
    const response = await fetch(url, fetchOptions);
    console.log(response);
    if (!response.ok) {
        console.log("Delete failed");
    }
    actionFetchSailormodels()
    return response;
}


async function handleSailorUpdateById (id) {

    const formData = new FormData(formSailormodel);
    const changes = formDataToObject(formData);

    await updateSailor(changes, id);

    actionFetchSailormodels()
}

function formDataToObject (data) {

    var object = {};

    data.forEach(function(value, key){
        object[key] = value;
    });

    return object;
}