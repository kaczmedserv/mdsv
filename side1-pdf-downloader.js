// Side 1 Downloader Tool
// @kacper.czapran@medserv.ie

const url = `${window.location.origin}/backend/calls/proced.php?procid=`;
const pfl = `${window.location.origin}/backend/proceduresfromlist.php`;
const gs1 = `${window.location.origin}/side1Claims/genSide1.php?procid=`;

if (window.location.href == pfl) {
    const DATA_IN = prompt("Paste Invoice Numbers / PROCIDs below.").split(/\r?\n/);
    const WEB_ID = [];

    async function getWebId(dataIn) {
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
                    if (d.getElementById('field1_4')) {
                        return d.getElementById('field1_4').value;
                    } else {
                        return 0;
                    }
                } catch (e) {}
            })
            .catch(error => {
                console.error('Error!', error);
            });
    }

    async function downloadPDF(webId, index) {
        return await fetch(gs1 + webId)
            .then((response) => {
                if (response.ok) {
                    return response.blob();
                } else {
                    throw new Error(response.status);
                }
            })
            .then((blob) => {
                const pdfURL = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = pdfURL;
                if (DATA_IN[index]?.includes("-")) {
                    a.download = DATA_IN[index];
                } else {
                    let invoice = parseInt(DATA_IN[index]) + 1000;
                    a.download = "2-" + invoice;
                }
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            })
            .catch(error => {
                console.error('Error!', error);
            });
    }

    async function getSide1PDF() {
        document.getElementById("procids").value = "Downloading Side 1s in progress..."; 
        for (let dataIn of DATA_IN) {
            const r = await getWebId(dataIn);
            if (r) {
                WEB_ID.push(r); 
            }
        }
        if (WEB_ID.length) {
            for (let index = 0; index < WEB_ID.length; index++) {
                if (WEB_ID[index]) {
                    await downloadPDF(WEB_ID[index], index);
                }
            }  
        } else {
            document.getElementById("procids").value = "Error."
        }
        document.getElementById("procids").value = "Download completed!";
    }

    getSide1PDF();
} else {
    alert("This tool works only in \"Review Procedures from list\"!");
}