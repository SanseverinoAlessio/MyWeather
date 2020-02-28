import 'bootstrap';

export function message(type){
this.modalbutton = $('.modal #closebutton');
 var bodymsg = '';
var titlemsg = '';
this.type = type;  //errore oppure informazione
var modaltitle = $('.modal-title');
var modalbody = $('.modal-body');
this.modalelement = $('#Message');
this.set_title = function(tit){
titlemsg = tit;
}
this.setbodymessagge = function(body){
bodymsg = body;
}
this.msgshow = function(){
modaltitle.text(titlemsg);
modalbody.text(bodymsg);
if(this.type == 'error'){
modaltitle.removeClass('other');
modaltitle.addClass('error');
}
else{
modaltitle.removeClass('error');
modaltitle.addClass('other');
}
this.modalelement.modal('show');
}
}
