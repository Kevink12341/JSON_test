let cbs_link = "https://opendata.cbs.nl/ODataApi/odata/70072ned/UntypedDataSet?$filter=((substringof(%27NL%27,RegioS)))&$select=Perioden,+TotaleBevolking_1";
let cbs_link2 = "https://odata4.cbs.nl/CBS/83878NED";
let cbs_link4 = "https://odata4.cbs.nl/CBS/84296NED";
let cbs_link3 = "https://odata4.cbs.nl/CBS/83376NED";
let cbs_link_1 = cbs_link4+"/Observations";
let cbs_link_2 = cbs_link_1 +"/?$select=(Measure, Value)";
let cbs_link_3 = cbs_link_1 + "/?$top=250";
let cbs_link_4 = cbs_link4 + "/$metadata";
let db_data = "83878NED"

let compareString = String(cbs_link_4).split("/")
function sort_data(compareString) {
    let string_data = ""
    for (let i=0; i<compareString.length;i++){
        if (String(compareString[i]).includes("NED",0) == 1) {
            string_data += compareString[i]
        }
        else continue
    }
    return string_data
}

function compare_db_to_string(db_data, string_data) {
    let new_string_data =""
    if (db_data.length == string_data.length){
        return true
    }else if (db_data.length != string_data.length) {
        new_string_data += "0" + string_data
        return new_string_data
    }
}

compare_db_to_string(db_data, sort_data(compareString))
