
export function setsrc(state){
let src;
switch (state) {
case "Clouds":
src = '../icone/cloud.svg';
break;

case "Rain":
src = '../icone/rain.svg'
break;

case "Clear":
src = '../icone/sun.svg'
break;

case "Snow":
src = '../icone/snow.svg'
break;
}
return src;
}
