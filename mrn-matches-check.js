// MRN Matches Check Tool
// @kacper.czapran@medserv.ie

const url = `${window.location.origin}/backend/modules/duplicates/?procid=`;
const pfl = `${window.location.origin}/backend/proceduresfromlist.php`;

if (window.location.href == pfl) {
    const DATA_IN = prompt("Paste Invoice Numbers / PROCIDs below.").split(/\r?\n/);
    const RESULT_MRN = [];
    const RESULT_NO_MRN = [];

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
                if (data.includes('MRN')) {
                    RESULT_MRN.push(dataIn);
                } else {
                    RESULT_NO_MRN.push(dataIn);
                }
            })
            .catch(error => {
                console.error('Error!', error);
            });
    }

    async function printResult() {
        document.getElementById("procids").value = "MRN check in progress..."; 
        for (let dataIn of DATA_IN) {
            await getData(dataIn);
        }
        if (RESULT_MRN.length == 0 && RESULT_NO_MRN == 0) {
            document.getElementById("procids").value = "Error."
        } else {
            document.getElementById("procids").value = "MRN MATCHES:" + ("\n") + RESULT_MRN.join("\n") + ("\n") + "NO MRN MATCHES:" + ("\n") + RESULT_NO_MRN.join("\n");
        }
    }

    printResult();
} else {
    alert("This tool works only in \"Review Procedures from list\"!");
}