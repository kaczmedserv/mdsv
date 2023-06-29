// Report Request
// @kacper.czapran@medserv.ie

const url = `${window.location.origin}/backend/calls/proced.php?procid=`;
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
                    var MRN = "MRN: " + d.getElementById("field3_1").value;
                    var DOB = "Patient DoB: " + d.getElementById("field3_2").value;
                    var VID = "Visit ID: " + d.getElementById("field5_1").value.split("Visit ID: ").pop().split("\n")[0];
                    var DOP = "Date of Procedure: " + d.getElementById("field1_5").value;
                    var PRO = "Procedures: " + d.getElementById("field5_1").value.split("Procedures:").pop().replace('\n','');
                    var MSV = "Medserv: " + d.getElementById("field4_2").value;
                    return MRN + '\n' + DOB + '\n' + VID + '\n' + DOP + '\n' + PRO + MSV;
                } catch (e) {}
            })
            .catch(error => {
                console.error('Error!', error);
            });
    }

    async function printResult() {
        document.getElementById("procids").value = "Generating request..."; 
        for (let dataIn of DATA_IN) {
            const r = await getData(dataIn);
            if (r) {
                DATA_OUT.push(r); 
            }
        }
        if (DATA_OUT.length) {
            document.getElementById("procids").value = DATA_OUT.join("\n\n");
        } else {
            document.getElementById("procids").value = "Error."
        }
    }

    printResult();
} else {
    alert("This tool works only in \"Review Procedures from list\"!");
}