// Duplicates Check Tool
// @kacper.czapran@medserv.ie

const url = `${window.location.origin}/backend/modules/duplicates/?procid=`;
const pfl = `${window.location.origin}/backend/proceduresfromlist.php`;

if (window.location.href == pfl) {
    const DATA_IN = prompt("Paste Invoice Numbers / PROCIDs below.").split(/\r?\n/);
    const DUPLICATES = [];

    async function getData(dataIn) {
        if (dataIn?.includes("-")) {
            dataIn = parseInt(dataIn.split("-")[1]) - 1000;
        }
        return await fetch(url + dataIn)
            .then((response) => {
                if (response.ok) {
                    return response.text();
                } else {
                    throw new Error(response.status);
                }
            })
            .then((data) => {
                if (data.includes('Possible duplicate procedure')) {
                    DUPLICATES.push(dataIn);
                }
            })
            .catch(error => {
                console.error('Error!', error);
            });
    }

    async function printResult() {
        document.getElementById("procids").value = "Duplicates check in progress..."; 
        for (let dataIn of DATA_IN) {
            await getData(dataIn);
        }
        if (DUPLICATES.length) {
            document.getElementById("procids").value = "POSSIBLE DUPLICATES:" + ("\n") + DUPLICATES.join("\n");
        } else {
            document.getElementById("procids").value = "Error."
        }
    }

    printResult();
} else {
    alert("This tool works only in \"Review Procedures from list\"!");
}