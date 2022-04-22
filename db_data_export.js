import { request } from 'express';
import fetch, { Headers } from 'node-fetch';
import { xml_text_parse } from './XML_parse.js';

let cbs_link = "https://opendata.cbs.nl/ODataApi/odata/70072ned/UntypedDataSet?$filter=((substringof(%27NL%27,RegioS)))&$select=Perioden,+TotaleBevolking_1";
let cbs_link2 = "https://odata4.cbs.nl/CBS/83878NED";
let cbs_link4 = "https://odata4.cbs.nl/CBS/84296NED";
let cbs_link_1 = cbs_link2+"/Observations";
let cbs_link_2 = cbs_link_1 +"/?$select=(Measure, Value)";
let cbs_link_3 = cbs_link_1 + "/?$top=250";
let cbs_link_4 = cbs_link2 + "/$metadata";

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


var myHeaders = new Headers();

myHeaders.append("Accept", "text")

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

export const import_schema = () => {
    return fetch(cbs_link_4, requestOptions)
    .then(response => response.text())
    .then( (text) => { return xml_text_parse(text); }
    )};