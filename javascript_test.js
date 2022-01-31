let cbs_link = "https://opendata.cbs.nl/ODataApi/odata/70072ned/UntypedDataSet?$filter=((substringof(%27NL%27,RegioS)))&$select=Perioden,+TotaleBevolking_1";
let cbs_link2 = "https://odata4.cbs.nl/CBS/83878NED";

// Data laden
async function load_data() {
    const response = await fetch(cbs_link);
    const jsondata = await response.json();
    let data = jsondata.value;
    addTable(data);
}
const data = load_data();

// Tabel generen
function addTable(data) {

const myTableDiv = document.getElementById("myDynamicTable");
    
const table = document.createElement('TABLE');
table.border='1';

const tableBody = document.createElement('TBODY');
table.appendChild(tableBody);

// Loop voor de data in de tabel
    
for (var i=0; i < data.length; i++){
    var tr = document.createElement('TR');
    tableBody.appendChild(tr);
    
    for (var j=0; j< 1; j++){
        var td = document.createElement('TD');
        td.appendChild(document.createTextNode(data[i].Perioden.slice(0,4)));
        tr.appendChild(td);
        td = document.createElement('TD');
        td.appendChild(document.createTextNode(data[i].TotaleBevolking_1));
        tr.appendChild(td);
    }
}
myTableDiv.appendChild(table);
}

console.log(data[0]);
