
export function istoday(data,mese){
let today = new Date();
if(data.getDate() == today.getDate() ){
return 'Oggi';
}
else{
return data.getDate() + ' ' + mese ;
}
}
