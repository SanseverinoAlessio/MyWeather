
export class cookie{
constructor(){
this.cookiename = ''
this.cookievalue = ''
}
setcookiename(name){
this.cookiename = name;
}
setcookievalue(val){
this.cookievalue = val;
}
setcookie(days){
let now = new Date();
let expired = new Date();
expired.setTime(now.getTime() + (days *24 *60 *60 *1000));
document.cookie = this.cookiename + '=' + this.cookievalue + '; ' + 'expires=' + expired.toUTCString() + '; ' + 'path=/';
}
static getcookie(nome){
let cookies = document.cookie.split(';')
for(let k =0; k < cookies.length; k++){
let currentcookie = cookies[k];
let val = currentcookie.split('=');
if(val[0] == nome){
return val[1];
}
}
}
}
