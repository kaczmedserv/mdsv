var URLS = [
    'https://raw.githubusercontent.com/kaczmedserv/auto-pending-claims/main/apc.js',
    'https://raw.githubusercontent.com/kaczmedserv/mdsv/main/injury-check.js',
    'https://raw.githubusercontent.com/kaczmedserv/mdsv/main/report-request.js',
    'https://raw.githubusercontent.com/kaczmedserv/mdsv/main/side1-dates.js',
    'https://raw.githubusercontent.com/kaczmedserv/mdsv/main/side1-pdf-downloader.js'
];

var URLS_DESCRIPTION = [
    "Selected - Auto Pending Claims",
    "Selected - Injury Check",
    "Selected - Report Request",
    "Selected - Side 1 Dates",
    "Selected - Side 1 PDF Downloader"
];

var option;
do {
    option = prompt("SELECT TOOL:\n1 - Auto Pending Claims\n2 - Injury Check\n3 - Report Request\n4 - Side 1 Dates Downloader\n5 - Side 1 PDF Downloader");
} while (option == null || !['1', '2', '3', '4', '5'].includes(option));

switch (option) {
    case "1":
        getTool(URLS[0], URLS_DESCRIPTION[0])
        break;
    case "2":
        getTool(URLS[1], URLS_DESCRIPTION[1])
        break;
    case "3":
        getTool(URLS[2], URLS_DESCRIPTION[2])
        break;
    case "4":
        getTool(URLS[3], URLS_DESCRIPTION[3])
        break;
    case "5":
        getTool(URLS[4], URLS_DESCRIPTION[4])
        break;
    default:
        console.log("Error!");
  }

function getTool(url, urlDescription) {
    fetch(url)
            .then(response => response.text())
            .then(data => {
                const script = document.createElement('script');
                script.text = data;
                document.body.appendChild(script);
            });
    console.log(urlDescription);
}