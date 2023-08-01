// Side 1 Dates Tool
// @kacper.czapran@medserv.ie

const url = `${window.location.origin}/claimforms/side1/open.php?procid=`;
const pfl = `${window.location.origin}/backend/proceduresfromlist.php`;

if (window.location.href == pfl) {
    const DATA_IN = prompt("Paste Invoice Numbers / PROCIDs below.").split(/\r?\n/);
    const DATA_OUT = [];

    async function getData(dataIn) {
        if (dataIn?.includes("-")) {
            procid = parseInt(dataIn.split("-")[1]) - 1000;
        } else {
            procid = dataIn;
        }
        return await fetch(url + procid)
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
                    const dateFirstVisit = d.getElementsByTagName('input')[8].value;
                    const durationOfSymptoms = d.getElementsByTagName('input')[9].value;
                    const durationOfSymptomsType = d.getElementsByTagName('select')[0].value;
                    const dateFirstMadeKnown = d.getElementsByTagName('input')[10].value;
                    const returnArray = [dataIn, dateFirstVisit, durationOfSymptoms, durationOfSymptomsType, dateFirstMadeKnown];
                    return returnArray;
                } catch (e) {}
            })
            .catch(error => {
                console.error('Error!', error);
            });
    }

    async function printResult() {
        let i = 1;
        for (let dataIn of DATA_IN) {
            const r = await getData(dataIn);
            if (r) {
                DATA_OUT.push(r); 
            }
            document.getElementById("procids").value = "Generating results... " + i + " of " + DATA_IN.length;
            i++
        }
        if (DATA_OUT.length) {
            document.getElementById("procids").value = "Done!";
        } else {
            document.getElementById("procids").value = "Error!";
        }
        printTable(DATA_OUT);
    }

    function printTable(DATA_TABLE) {
        const newWindow = window.open('', '_blank', 'width = 500, height = 800');
        const table = document.createElement('table');

        for (let i = 0; i < DATA_TABLE.length; i++) {
            const row = document.createElement('tr');
            for (let j = 0; j < DATA_TABLE[0].length; j++) {
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