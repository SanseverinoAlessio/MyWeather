export var $$ = {
ajax: function(url,send,method){
let prom = new Promise(function(resolved, rejected){
let xml= new XMLHttpRequest();
xml.open(method,url,true);
xml.send(send);
xml.onreadystatechange = ()=>{
if(xml.readyState == 4){
switch (xml.status) {
  case 200:
  let response = JSON.parse(xml.responseText);
  resolved(response);
    break;
    case 404: rejected({
    title: 'Errore: Località non trovata',
    body: "Non siamo riusciti a trovare la località da te inserita. Prova a digitarne un'altra"
    });
     break;
   case 400:
   rejected({
   title: 'Errore di Comunicazione',
   body: "La richiesta non è andata a buon fine. Riprova di nuovo"
   });
   break;
    case 500:    rejected({
    title: 'Errore di Comunicazione',
    body: "La richiesta non è andata a buon fine. Riprova di nuovo"
    });
    break;
}
}
}
});
return prom;
}
}
