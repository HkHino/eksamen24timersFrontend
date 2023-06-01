let selectedBoat = null;

async function updateBoatTable () {
    var boats = await getAllBoats();
    let table = document.getElementById("boatTable")
        table.innerHTML = '';

    for (var i = 0; i < boats.length; i++) {
        let boat = boats[i]
        let row  = document.createElement('tr');
            row.innerHTML = `
                <td>${boat.id}</td>
                <td>${boat.type}</td>
                <td class="btn-update">UPDATE</td>
                <td class="btn-delete">DELETE</td>
            `;

            row.getElementsByClassName("btn-update")[0].addEventListener("click", async function () {

                var b = await GetBoatById(boat.id);

                selectedBoat = b.id;

                document.getElementById("btn-label").innerText = "Update existing boat"
                document.getElementById("boatTypeSelector").value = b.type;
                document.getElementById("btn-createBoat").hidden  = true;
                document.getElementById("btn-updateBoat").hidden  = false;
            });

            row.getElementsByClassName("btn-delete")[0].addEventListener("click", async function () {
                await DeleteBoatById(boat.id);
                await updateBoatTable();
            });

        table.appendChild(row);
    }
}

async function init () {
    await updateBoatTable();

    document.getElementById("btn-createBoat").addEventListener("click", async function () {
        var boatType   = document.getElementById("boatTypeSelector").value;
        var boatObject = {
            "type" : boatType
        }

        await CreateBoat(boatObject);
        await updateBoatTable();

        document.getElementById("boatTypeSelector").selectedIndex = 0;
    });

    document.getElementById("btn-updateBoat").addEventListener("click", async function () {
        var boatType   = document.getElementById("boatTypeSelector").value;
        var boatObject = {
            "type" : boatType
        }

        await editBoatById(boatObject, selectedBoat);
        await updateBoatTable();

        document.getElementById("btn-label").innerText = "Create new boat"
        document.getElementById("btn-createBoat").hidden  = false;
        document.getElementById("btn-updateBoat").hidden  = true;

        document.getElementById("boatTypeSelector").selectedIndex = 0;
    });

    document.getElementById("btn-updateBoat").hidden = true;
}

window.addEventListener("load", init);
