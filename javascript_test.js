let cbs_link = "https://opendata.cbs.nl/ODataApi/odata/70072ned/UntypedDataSet?$filter=((substringof(%27NL%27,RegioS)))&$select=Perioden,+TotaleBevolking_1";
let cbs_link2 = "https://odata4.cbs.nl/CBS/83878NED";


async function load_data() {
    const response = await fetch(cbs_link);
    const jsondata = await response.json();
    data = jsondata.value
    drawTable(data);
}
data = load_data();
// fetch(cbs_link)
//     .then(response => response.json())
//         .then(data => data.value
// );


function drawTable(data) {
    for (var i = 0; i < data.length; i++) {
    drawRow(data[i]);
    }
}

function drawRow(rowData) {
    var row = $("<tr />")
    $("#table-id").append(row);
    row.append($("<td>" + rowData.Perioden.substring(0, 4) + "</td>"));
    row.append($("<td>" + rowData.TotaleBevolking_1 + "</td>"));
  }