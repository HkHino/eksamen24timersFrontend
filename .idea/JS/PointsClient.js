var path = "http://localhost:8080/sailors"

async function getAllSailors() {

    var result = await fetch(path, {
        mode: "cors",
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })

    if (!result.ok) {
        throw new Error("..");
    }

    return result.json();
}


async function CreateSailor (sailor) {

    var json = JSON.stringify(sailor)
    console.log(json);
    var result = await fetch(path, {
        mode: "cors",
        method: "POST",
        body: json,
        headers: {
            "Content-Type": "application/json"
        }
    })

    if (!result.ok) {
        console.log("X");
        throw new Error("..");
    }

    return result.json();
}

async function DeleteAllSailors() {

    var result = await fetch(path, {
        mode: "cors",
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })

    if (!result.ok) {
        throw new Error("..");
    }

    return result.json();
}

async function GetSailorById (id) {

    var result = await fetch(path + "/" + id, {
        mode: "cors",
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })

    if (!result.ok) {
        throw new Error("..");
    }

    return result.json();
}


async function DeleteSailorById(id) {

    var result = await fetch(path + "/" + id, {
        mode: "cors",
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })

    if (!result.ok) {
        throw new Error("..");
    }

}

async function editSailorById(sailor, id) {

    var json = JSON.stringify(sailor)

    var result = await fetch(path + "/" + id, {
        mode: "cors",
        method: "POST",
        body: json,
        headers: {
            "Content-Type": "application/json"
        }
    })

    if (!result.ok) {
        throw new Error("..");
    }

    return result.json();
}

