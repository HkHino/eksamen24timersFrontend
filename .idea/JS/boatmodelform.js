const urlPostBoatmodel = 'http://localhost:8080/boats'

document.addEventListener('DOMContentLoaded', createFormEventListener);
let formBoatmodel;

function createFormEventListener(){
    formBoatmodel = document.getElementById("boatmodel-form");
    formBoatmodel.addEventListener("submit", handleFormSubmit);
}

async function handleFormSubmit(event) {
    event.preventDefault();

    const formData = new FormData(formBoatmodel);
    const objectData = formDataToObject(formData);

    await CreateBoat(objectData);

    actionFetchBoatmodels()
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

/// fill table with boatmodels

const urlGetBoatmodels = 'http://localhost:8080/boats'
const tableBoatmodel = document.getElementById('Boatmodel-list')

async function createBoatmodelTable(boatmodel) {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${boatmodel.id}</td>
      <td>${boatmodel.type}</td>
    `;

    cell = row.insertCell(2)
    let pbUpdate = document.createElement("button")
    pbUpdate.textContent = "Opdater"
    pbUpdate.className = "buttonupdate"
    pbUpdate.addEventListener('click', function () {
        handleBoatUpdateById(boatmodel.id)
    })
    cell.appendChild(pbUpdate)
    tableBoatmodel.appendChild(row);

    //Delete boat
    cell = row.insertCell(2)
    let pbDelete = document.createElement("button")
    pbDelete.textContent = "Delete"
    pbDelete.className = "btn btn-primary" /*buttondelete*/
    pbDelete.addEventListener('click', function () {

        restDeleteBoatmodel(boatmodel)
    })
    cell.appendChild(pbDelete)

}

let lstBoat = []
async function actionFetchBoatmodels() {
    lstBoat = await fetchAny(urlGetBoatmodels);
    tableBoatmodel.innerHTML = '';
    lstBoat.forEach(createBoatmodelTable)
}
actionFetchBoatmodels()
function printTest(testid, boatmodel) {
    console.log(testid)
    console.log(boatmodel)
}

async function restDeleteBoatmodel(boatmodel) {
    const url = "http://localhost:8080/boats/" + boatmodel.id;
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
    actionFetchBoatmodels()
    return response;
}


async function handleBoatUpdateById (id) {

    const formData = new FormData(formBoatmodel);
    const changes = formDataToObject(formData);

    await updateBoat(changes, id);

    actionFetchBoatmodels()
}

function formDataToObject (data) {

    var object = {};

    data.forEach(function(value, key){
        object[key] = value;
    });

    return object;
}