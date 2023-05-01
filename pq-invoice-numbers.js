// PQ Invoice Numbers Tool
// @kacper.czapran@medserv.ie

const pq1 = `${window.location.origin}/backend/printqueue.php`;
const pq2 = `${window.location.origin}/backend/printqueue.php#`;

if (window.location.href == pq1 || window.location.href == pq2) {
    const DATAGRID = document.getElementsByTagName('tr');
    const DATA_OUT = [];

    for (let index = 11; index < DATAGRID.length; index++) {
        DATA_OUT.push(DATAGRID[index].cells[11].innerText);
    }

    for (let data_out of DATA_OUT) {
        document.write(data_out);
        document.write("<br>");
    }
} else {
    alert("This tool works only in \"Print Queue\"!");
}