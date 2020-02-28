import {weatherSetUp} from './WeatherSetup.js';
import {message} from './Messagge.js';
import {cookie} from './Cookie.js';


export function weatherstart(){
var weather = new weatherSetUp();
//Messaggio che avvisa riguardo la Geolocalizzazione
var geolocalizationmsg = (function(){
let valorecookie= cookie.getcookie('accepted');
if(valorecookie !== 'true'){
let msg = new message('other');
msg.set_title('Informazione');
msg.setbodymessagge('Questo servizio può utilizzare la tua posizione, per fornirti informazioni riguardo il meteo della tua città.')
msg.msgshow();
msg.modalbutton.on('click',()=>{
let accepted = new cookie()
accepted.setcookiename('accepted');
accepted.setcookievalue('true');
accepted.setcookie(365);
geolocalizzazione();
msg.modal.modal('hide');
msg.modalbutton.off('click');
});
$('.modal.fade').on('click',()=>{
  console.log('shish');
msg.modalbutton.off('click');
$('.modal.fade').off('click');
});
}
else{
geolocalizzazione();
}
})();

//Ricerca tramite Geolocalizzazione
function geolocalizzazione(){
  if(navigator.geolocation){
  navigator.geolocation.getCurrentPosition((position)=>{
  weather.containerdays.html('<img  id="loading"  src="icone/25.svg">');
  let latitudine = position.coords.latitude;
  let longitudine = position.coords.longitude
  weather.weatherfile = [];
  weather.getcityweather('https://api.openweathermap.org/data/2.5/forecast?lat=' + latitudine + '&lon=' + longitudine + '&appid='+ process.env.api_key + '&lang=it' + '&units=metric');
  });
  }
}
// Ricerca della città tramite bottone
weather.confirmbutton.on('click', (e)=> {
e.preventDefault();
VerifyInput()
});
//Ricerca tramite input
weather.Cityinput.on('keyup',(e)=>{
if(event.keyCode == 13){
VerifyInput()
}
});
function VerifyInput(){
weather.containerdays.html('<img  id="loading"  src="icone/25.svg">');
  if(weather.Cityinput.val().length > 0){
  weather.setcity(weather.Cityinput.val());
  weather.weatherfile = [];
  weather.getcityweather('https://api.openweathermap.org/data/2.5/forecast?q=' + weather.city + '&appid=' + process.env.api_key + '&lang=it' + '&units=metric');
  }
  else{
  weather.containercurrentday.html('');
  weather.containerdays.html('');
  let msg = new message('error');
  msg.set_title('Non hai digitato la città');
  msg.setbodymessagge("Scrivi la tua città, o non potremo effetture la tua richiesta");
  msg.msgshow();
  }
}


weather.containerdays.on('click',$('.days'),(e)=>{
e.stopPropagation();
if($(e.target).attr('class').substring(0,3) == 'day'){
weather.setcurrentday(e.target);
}
});
}
