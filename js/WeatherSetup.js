import {setsrc} from './Seticonurl.js';
import {message} from './Messagge.js';
import {istoday} from './Date.js';
import {$$} from './AjaxPromise';

export function weatherSetUp(){
this.months = ['Gennaio','Febbraio','Marzo','Aprile','Maggio','Giugno','Luglio',
'Agosto','Settembre','Novembre','Dicembre'];
this.days = ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì','Venerdì', 'Sabato'];
this.containerdays = $('#days-container');
this.city;
this.weatherfile = [];
this.containercurrentday = $('.day-show-content');
this.Cityinput = $('#city-input input');
this.confirmbutton = $('#confirm-city');
this.setcity = function(city){
this.city = city;
this.weatherfile = [];
}
this.getcityweather = function(urlrequest){
let url = urlrequest;

$$.ajax(urlrequest,'','GET').then((resp) => {

this.setcity(resp.city.name + ' ' + resp.city.country);
let exdata;
for (let i = 0; i< resp.list.length; i++){
let newdata = resp.list[i]['dt_txt'].substring(0,10);
if(newdata !== exdata){
this.weatherfile.push(resp.list[i]);
exdata = newdata;
}
}
this.show();
}).catch((err) => {
let errore = err;
this.error(errore);
});
}

this.error = function(err){
let msg = new message('error');
msg.setbodymessagge(err.body);
msg.set_title(err.title);
msg.msgshow();
this.weatherfile = [];
this.containerdays.html('');
this.containercurrentday.html('');
}

this.show = function(){
this.containercurrentday.html('');
this.containerdays.html('');
if(this.weatherfile.length > 5){
this.weatherfile.pop();
}
for(let k = 0; k < this.weatherfile.length; k++){
let prova =this.weatherfile[k]['dt_txt'].substring(0,10);
let data = new Date(prova);
let mese = this.months[data.getMonth()];
let datacorrente = istoday(data,mese);
let temperature = Math.round(this.weatherfile[k].main.temp) + '°'
let state = this.weatherfile[k].weather[0].main
let srcicon = setsrc(state);
let element = '<div class="day d-flex" data-day="'+ data + '"   >' +
'<div class="img-container"">'+
'<img src=' + srcicon + '>' +
'</div>' + '<div class="contenuto">' +
'<h2 class=' + 'title-day' +  '>' + datacorrente + '</h2>' +
'<p class="day-temperature">' +  'Temperatura: '  + '</p>' +
'<p class="degree">' +   temperature + '</p>' +
'</div>' + '</div>';
this.containerdays.append(element);
}
}

this.setcurrentday = function(element){

$('.current').removeClass('current');
$(element).addClass('current');

this.containercurrentday.html('');
let currentday =[];
let clicked_date = $(element).attr('data-day');
let date = new Date(clicked_date);
let mese = this.months[date.getMonth()];
let località =this.city;
let day = this.days[date.getDay()];
let daysdefine = function(day){
if(date.getDate() ==  new Date().getDate()){
return 'Oggi';
}
else{
return day + ' ' +  istoday(date,mese);
}
}
let title = daysdefine(day);
this.weatherfile.filter((value) => {
let newdate = new Date(value.dt_txt.substring(0,10));
if(date.getDate() == newdate.getDate()){
currentday = value;
}
});
let description = currentday.weather[0].description;
let iconsrc = setsrc(currentday.weather[0].main);
let humidity = currentday.main.humidity + '%';
let temp = 'min: ' + currentday.main.temp_min + '°' + ' max: ' + currentday.main.temp_max + '°';
let elemento = '<div class="anim d-flex flex-column">' +
  '<h3> Località: <span>' + this.city + '</span>  </h3>'+

'<h3 id="day">' + title + '</h3>' +
'<p class="temperature"> Temperatura: <span>' + temp + '</span></p>' +
'<div class="d-flex ">' +
'<p class="weather">' + description + '</p>' +
'<img class="icon" src="'+ iconsrc +'" alt="">' +
'</div>' +
'<p class="humidity"> Umidità: <span>' + humidity +  '</span> </p>' +
'</div>';

this.containercurrentday.append(elemento);
}
}
