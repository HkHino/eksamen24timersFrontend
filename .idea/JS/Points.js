let selectedSailor = null;

async function updateSailorTable () {
    var sailors = await getAllSailors();
    let table = document.getElementById("sailorTable")
    table.innerHTML = '';

    for (var i = 0; i < sailors.length; i++) {
        let sailor = sailor[i]
        let row  = document.createElement('tr');
        row.innerHTML = `
                <td>${sailor.id}</td>
                <td>${sailor.points}</td>
                <td>${sailor.contestId}</td>
                <td class="btn-update">UPDATE</td>
                <td class="btn-delete">DELETE</td>
            `;

        row.getElementsByClassName("btn-update")[0].addEventListener("click", async function () {

            var b = await GetSailorById(sailor.id);

            selectedSailor = b.id;

            document.getElementById("btn-label").innerText = "Update existing sailor"
            document.getElementById("sailorTypeSelector").value = b.type;
            document.getElementById("btn-createSailor").hidden  = true;
            document.getElementById("btn-updateSailor").hidden  = false;
        });

        row.getElementsByClassName("btn-delete")[0].addEventListener("click", async function () {
            await DeleteSailorById(sailor.id);
            await updateSailorTable();
        });

        table.appendChild(row);
    }
}

async function init () {
    await updateSailorTable();

    document.getElementById("btn-createSailor").addEventListener("click", async function () {
        var sailorType   = document.getElementById("sailorTypeSelector").value;
        var sailorObject = {
            "type" : sailorType
        }

        await CreateSailor(SailorObject);
        await updateSailorTable();

        document.getElementById("sailorTypeSelector").selectedIndex = 0;
    });

    document.getElementById("btn-updateSailor").addEventListener("click", async function () {
        var SailorType   = document.getElementById("sailorTypeSelector").value;
        var sailorObject = {
            "type" : sailorType
        }

        await editSailorById(sailorObject, selectedSailor);
        await updateSailorTable();

        document.getElementById("btn-label").innerText = "Create new sailor"
        document.getElementById("btn-createSailor").hidden  = false;
        document.getElementById("btn-updateSailor").hidden  = true;

        document.getElementById("sailorTypeSelector").selectedIndex = 0;
    });

    document.getElementById("btn-updateSailor").hidden = true;
}

window.addEventListener("load", init);
