// Injury Check Tool
// @kacper.czapran@medserv.ie

const url = `${window.location.origin}/claimforms/side1/open.php?procid=`;
const pfl = `${window.location.origin}/backend/proceduresfromlist.php`;

if (window.location.href == pfl) {
    const DATA_IN = prompt("Paste Invoice Numbers / PROCIDs below.").split(/\r?\n/);
    const DATA_OUT = [];

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
                const parser = new DOMParser();
                const d = parser.parseFromString(data, "text/html");
                try {
                    if (d.getElementsByTagName('input')[17].checked) {
                        return dataIn;
                    } else {
                        return 0;
                    }
                } catch (e) {}
            })
            .catch(error => {
                console.error('Error!', error);
            });
    }

    async function printResult() {
        document.getElementById("procids").value = "Injury check in progress..."; 
        for (let dataIn of DATA_IN) {
            const r = await getData(dataIn);
            if (r) {
                DATA_OUT.push(r); 
            }
        }
        if (DATA_OUT.length) {
            document.getElementById("procids").value = DATA_OUT.join("\n");
        } else {
            document.getElementById("procids").value = "No injury found."
        }
    }

    printResult();
} else {
    alert("This tool works only in \"Review Procedures from list\"!");
}