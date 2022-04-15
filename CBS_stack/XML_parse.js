function xml_formatting(text)  { 
    let xml_cleanup1 = String(text).replace(/=/g,":")
    let xml_cleanup2 = xml_cleanup1.replace(/\/>/g, "");
    let xml_cleanup3 = xml_cleanup2.replace(/\>/g, "");
    let xml_cleanup4 = xml_cleanup3.replace(/\/Key/g, "");
    let xml_cleanup5 = xml_cleanup4.replace(/Name/g, " \"Name\"");
    let xml_cleanup6 = xml_cleanup5.replace(/Key/g,"")
    let xml_cleanup7 = xml_cleanup6.replace(/<</g,"<")
    let xml_cleanup8 = xml_cleanup7.replace(/\?/g,"")
    let xml_cleanup9 = xml_cleanup8.replace(/Type/g,"\"Type\"")
    let xml_cleanup10 = xml_cleanup9.replace(/Nullable/g,"\"Nullable\"")
    let xml_cleanup11 = xml_cleanup10.replace(/"Name"space/g,"\"Namespace\"");
    let xml_cleanup12 = xml_cleanup11.replace(/Entity"Type"/g,"EntityType")

    let xml_final = xml_cleanup12.split("<")
    return xml_final
};

function data_splitting(xml_final) {
    let dataset_xml = [];
// code voor array specifiek op dataset die ik wil + wat ruimte
    for (let i = 0; i<xml_final.length; i++) {
        if(String(xml_final[i]).includes("Cbs.Ccb.MemModels")) {
            dataset_xml.push(xml_final[i]);
            if (xml_final[i] == dataset_xml[0]) {
                for (let j = 1; j<20;j++){
                    dataset_xml.push(xml_final[i+j])
                }
            }else break
        }else continue
    }
    // code die onnodige data eruit haalt
    for (let i=0; i<dataset_xml.length;i++){
        if (String(dataset_xml[i]).includes("PropertyRef")) {
            dataset_xml.splice(i,1)
        }else break
    }
    // code die de overflow na de data eruit haalt
    for (let i=0;i<dataset_xml.length;i++){
        if (String(dataset_xml[i]).includes("/EntityType")){
            dataset_xml.splice(i,20)
        }
    }
    console.log("dataset1",dataset_xml)

    let entitytypeArr = [];
    for (let i=0; i<dataset_xml.length;i++) {
        if (dataset_xml[i].startsWith("EntityType")){
            
            let tableArr = String(dataset_xml[i]).split(" ")
            let entityId = tableArr[2].replaceAll(`"`,"").replace("Name:","").trim()
            let database_name = {
                tableid: entityId
            }
            console.log(database_name)
            entitytypeArr.push(database_name)
        }
    };

    let propertiesArr = []
    for (let i = 0; i<dataset_xml.length; i++){
        if (dataset_xml[i].startsWith("Property ") && dataset_xml[i].endsWith("\ ")) {

            let line = dataset_xml[i].replace("  ", " ")
            line = line.split(" ")

            let type = line[2].replaceAll('"', "").replace("Type:", "").trim()
            let name = line[1].replaceAll('"', "").replace("Name:", "").trim()

            let property = {
                name: name,
                type: type
            }
            propertiesArr.push(property)
        
        }
        else { continue}
        }

    console.log(propertiesArr,entitytypeArr)
    return propertiesArr, entitytypeArr
};

export const xml_text_parse = (xml) => {
    data_splitting(xml_formatting(xml))
};