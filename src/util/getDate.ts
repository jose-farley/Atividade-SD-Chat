export function getDate():string{
    const dateTime = "["+getActualDate()+"]"+" - "+getActualTime()+" ";
    return dateTime;
}

function getActualTime(){
    const date = new Date()
    let hours = (date.getHours()<10)?"0"+date.getHours():date.getHours();
    let minutes = (date.getMinutes()<10)?"0"+date.getMinutes():date.getMinutes();
    let seconds = (date.getSeconds()<10)?"0"+date.getSeconds():date.getSeconds();

    return `${hours}:${minutes}:${seconds}`
}
function getActualDate(){
    var data = new Date(),
        dia  = data.getDate().toString(),
        diaF = (dia.length == 1) ? '0'+dia : dia,
        mes  = (data.getMonth()+1).toString(), //+1 pois no getMonth Janeiro começa com zero.
        mesF = (mes.length == 1) ? '0'+mes : mes,
        anoF = data.getFullYear();
    return diaF+"/"+mesF+"/"+anoF;
}