// Codes Converter Tool
// @kacper.czapran@medserv.ie

const bs = "/dataImport_2/";

if (window.location.href.includes(bs)) {
    const CODE_MATRIX = [
        ["MRA","7041","IL22-62300201","IL22-62310201"],
        ["ORBIT","7041","IL22-62300011","IL22-62310011"],
        ["IAM","7041","IL22-62300021","IL22-62310021"],
        ["PITUITARY","7041","IL22-62300031","IL22-62310031"],
        ["BRAIN","7041","IL22-62300041","IL22-62310041"],
        ["CERVICAL","7046","IL22-62300411","IL22-62310411"],
        ["CSPINE","7046","IL22-62300411","IL22-62310411"],
        ["THORACIC","7082","IL22-62300411","IL22-62310411"],
        ["LUMBAR","7054","IL22-62300411","IL22-62310411"],
        ["LUMBOSACRAL","7054","IL22-62300411","IL22-62310411"],
        ["KNEE","7074","IL22-62301171","IL22-62311171"],
        ["HIP","7048","IL22-62301161","IL22-62311161"],
        ["ANKLE","7076","IL22-62307011","IL22-62317001"],
        ["ACHILLES","7076","IL22-62307011","IL22-62317001"],
        ["FOOT","7060","IL22-62307031","IL22-62317031"],
        ["SHOULDER","7077","IL22-62307081","IL22-62317081"],
        ["ELBOW","7078","IL22-62307101","IL22-62317101"],
        ["WRIST","7079","IL22-62307121","IL22-62317121"],
        ["PELVIS","7047","IL22-62301011","IL22-62311011"],
        ["SIJ","7047","IL22-62301031","IL22-62311031"],
        ["PROSTATE","198","IL22-62307251","IL22-62317251"],
        ["SMALL BOWEL","7087","IL22-62307201","IL22-62317201"],
        ["ENTEROGRAPHY","7087","IL22-62307201","IL22-62317201"],
        ["MRCP","7057","IL22-62301601","IL22-62311601"],
        ["LIVER","7056","IL22-62301311","IL22-62311311"],
        ["FISTULA","7056","IL22-62301511","IL22-62311511"],
        ["ADRENAL","7056","IL22-62307151","IL22-62317151"],
        ["RENAL","7056","IL22-62307161","IL22-62317161"],
        ["HAND","7047","IL22-62301011","IL22-62311011"],
        ["THUMB","7047","IL22-62301011","IL22-62311011"],
        ["HUMERUS","7047","IL22-62301011","IL22-62311011"],
        ["TIBIA","7047","IL22-62301011","IL22-62311011"],
        ["FIBULA","7047","IL22-62301011","IL22-62311011"],
        ["THIGH","7047","IL22-62301011","IL22-62311011"],
        ["FEMUR","7047","IL22-62301011","IL22-62311011"],
        ["CALF","7047","IL22-62301011","IL22-62311011"],
        ["SCAPULA","7047","IL22-62301011","IL22-62311011"],
        ["TMJ","7047","IL22-62301011","IL22-62311011"],
        ["FACIAL","7047","IL22-62301011","IL22-62311011"],
        ["SACRUM","7047","IL22-62301011","IL22-62311011"],
        ["COCCYX","7047","IL22-62301011","IL22-62311011"],
        ["TIB","7047","IL22-62301011","IL22-62311011"],
        ["FIB","7047","IL22-62301011","IL22-62311011"],
        ["CLAVICLE","7047","IL22-62301011","IL22-62311011"],
        ["FINGER","7047","IL22-62301011","IL22-62311011"],
        ["CHEST","7047","IL22-62301011","IL22-62311011"],
        ["THORAX","7047","IL22-62301011","IL22-62311011"],
        ["SPLEEN","7047","IL22-62301011","IL22-62311011"],
        ["MANDIBLE","7047","IL22-62301011","IL22-62311011"]
    ];

    const D = document.getElementsByTagName("tr");

    const DESCRIPTION = [];
    const CODE = [];
    const AMOUNT = [];

    const CODE_OUT = [];

    var i = 1;

    do {
        const r = D[i];
        const c = r.getElementsByTagName("td");
        DESCRIPTION.push(c[5].textContent);
        CODE.push(c[6].textContent);
        AMOUNT.push(c[8].textContent); 
        i++;
    } while (D[i].getElementsByTagName("td")[0].textContent);

    CONVERT_NEXT:
    for (let description of DESCRIPTION) {
        for (let code of CODE_MATRIX) {
            if (description?.toUpperCase().includes(code[0]) && !description?.toUpperCase().includes("CT")) {
                if (description?.toUpperCase().includes("CONTRAST")) {
                    CODE_OUT.push(code[3]);  
                } else {
                    CODE_OUT.push(code[2]);
                }
                continue CONVERT_NEXT;
            }
        }
        CODE_OUT.push("EX");
    }

    function printResult() {
        const tableWindow = window.open();
        const table = document.createElement('table');
    
        for (let i = 0; i < CODE_OUT.length; i++) {
          const row = document.createElement('tr');
          const cell = document.createElement('td');
          cell.innerText = CODE_OUT[i];
          row.appendChild(cell);
          table.appendChild(row);
        }
        tableWindow.document.body.appendChild(table);
      }
    
      printResult();
} else {
    alert("This tool works only in \"Bulk Services\"!");
}