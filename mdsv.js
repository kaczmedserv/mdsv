var URLS = [
    'https://raw.githubusercontent.com/kaczmedserv/auto-pending-claims/main/apc.js',
    'https://raw.githubusercontent.com/kaczmedserv/mdsv/main/injury-check.js',
    'https://raw.githubusercontent.com/kaczmedserv/mdsv/main/pq-invoice-numbers.js',
    'https://raw.githubusercontent.com/kaczmedserv/mdsv/main/report-request.js',
    'https://raw.githubusercontent.com/kaczmedserv/mdsv/main/side1-pdf-downloader.js'
];

var option;
do {
    option = prompt("SELECT TOOL:\n1 - Auto Pending Claims\n2 - Injury Check\n3 - Invoice on PQ\n4 - Report Request\n5 - Side 1 PDF Downloader");
} while (![null, '1', '2', '3', '4', '5'].includes(option));

switch (option) {
    case "1":
        getTool(URLS[0]);
        break;
    case "2":
        getTool(URLS[1]);
        break;
    case "3":
        getTool(URLS[2]);
        break;
    case "4":
        getTool(URLS[3]);
        break;
    case "5":
        getTool(URLS[4]);
        break;
    default:
        alert("No option selected.");
        break;
}

function getTool(url) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            const script = document.createElement('script');
            script.text = data;
            document.body.appendChild(script);
            document.body.removeChild(script);
        });
}