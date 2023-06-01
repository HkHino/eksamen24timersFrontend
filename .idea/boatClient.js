/*
async function getStudentById (id) {

    var result = await fetch("http://localhost:8080/students/" + id, {
        method : "GET"
    })

    return result;
}

async function getAllStudents () {

    var result = await fetch("http://localhost:8080/students/", {
        method : "GET"
    })

    return result
}
*/

async function createBoat (boat) {

    var json = JSON.stringify(boat)

    var result = await fetch("http://localhost:8080/boats", {
        mode    : "cors",
        method  : "PUT",
        body    : json,
        headers : {
            "Content-Type": "application/json"
        }
    })

    if (!result.ok) {
        throw new Error("..");
    }

    return result.json();
}

async function updateBoat (boat, id) {

    var json = JSON.stringify(boat)

    var result = await fetch("http://localhost:8080/boats/" + id, {
        mode    : "cors",
        method  : "POST",
        body    : json,
        headers : {
            "Content-Type": "application/json"
        }
    })

    if (!result.ok) {
        throw new Error("..");
    }

    return result.json();
}

