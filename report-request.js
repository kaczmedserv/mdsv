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
                    var MRN = d.getElementById("field3_1").value;
                    var DOB = d.getElementById("field3_2").value;
                    var VID = d.getElementById("field5_1").value.split("Visit ID: ").pop().split("\n")[0];
                    var DOP = d.getElementById("field1_5").value;
                    var PRO = d.getElementById("field5_1").value.split("Procedures:").pop().replace('\n','');
                    var MSV = d.getElementById("field4_2").value;
                    const RESULT = [MRN, DOB, VID, DOP, PRO, MSV];
                    return RESULT;
                } catch (e) {}
            })
            .catch(error => {
                console.error('Error!', error);
            });
    }

    async function printResult() {
        let i = 1;
        const DATA_TABLE = [];
        for (let dataIn of DATA_IN) {
            const r = await getData(dataIn);
            if (r) {
                const p = "MRN: " + r[0] + '\n' + "Patient DoB: " + r[1] + '\n' + "Visit ID: " + r[2] + '\n' + "Date: " + r[3] + '\n' + "Procedures: " + r[4] + "Medserv: " + r[5];
                DATA_OUT.push(p);
                DATA_TABLE.push(r);
                document.getElementById("procids").value = "Generating result... " + i + " of " + DATA_IN.length;
                i++;
            }
        }

        if (DATA_OUT.length) {
            document.getElementById("procids").value = DATA_OUT.join("\n\n");
        } else {
            document.getElementById("procids").value = "Error."
        }
        printTable(DATA_TABLE);
    }

    function printTable(DATA_TABLE) {
        const newWindow = window.open('', '_blank', 'width=1500,height=1000');
        const table = document.createElement('table');

        for (let i = 0; i < DATA_TABLE.length; i++) {
            const row = document.createElement('tr');
            for (let j = 0; j < 6; j++) {
                const cell = document.createElement('td');
                cell.style.padding = '8px';
                cell.textContent = DATA_TABLE[i][j];
                row.appendChild(cell);
            }
            table.appendChild(row);
        }

        newWindow.document.body.appendChild(table);
    }

    printResult();
} else {
    alert("This tool works only in \"Review Procedures from list\"!");
}