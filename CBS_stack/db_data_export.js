import fetch from 'node-fetch';

let cbs_link = "https://opendata.cbs.nl/ODataApi/odata/70072ned/UntypedDataSet?$filter=((substringof(%27NL%27,RegioS)))&$select=Perioden,+TotaleBevolking_1";
let cbs_link2 = "https://odata4.cbs.nl/CBS/83878NED";
let cbs_link4 = "https://odata4.cbs.nl/CBS/84296NED";
let cbs_link_1 = cbs_link2+"/Observations";
let cbs_link_2 = cbs_link_1 +"/?$select=(Measure, Value)";
let cbs_link_3 = cbs_link_1 + "/?$top=10";

export const import_data = () => {    

    
    return fetch(cbs_link_3).then((response) => { 
         return response.json().then((json) => {
            let data = json.value;
            return data;
        })
    }).catch((error) => {
        console.error("Couldnt fetch recource", error)
    });
};
