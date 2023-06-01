var path = "http://localhost:8080/boats"

async function getAllBoats() {

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


async function CreateBoat (boat) {

    var json = JSON.stringify(boat)
    console.log(json);
    var result = await fetch(path, {
        mode: "cors",
        method: "PUT",
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

async function DeleteAllBoats() {

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

async function GetBoatById (id) {

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


async function DeleteBoatById(id) {

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

async function editBoatById(boat, id) {

    var json = JSON.stringify(boat)

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

