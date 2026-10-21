const $=id=>document.getElementById(id);
const money=n=>new Intl.NumberFormat('es-MX',{style:'currency',currency:'MXN',maximumFractionDigits:0}).format(n);
function render(){
  const age=+$('age').value;
  $('retire').min=Math.max(50,age+1);
  if(+$('retire').value<=age) $('retire').value=age+1;
  const retirement=+$('retire').value, monthly=+$('monthly').value;
  $('retireMin').innerHTML=`${Math.max(50,age+1)} <span>80 años</span>`;
  $('ageOut').textContent=age+' años'; $('retireOut').textContent=retirement+' años'; $('monthlyOut').textContent=money(monthly);
  const result=GarbaProjection(age,retirement,monthly);
  $('capital').textContent=money(result.balance); $('contributed').textContent=money(result.contributed);
  $('difference').textContent=money(result.balance-result.contributed);
  $('yearsSummary').textContent=`${retirement-age} años`;
  const monthlyIncome=result.balance*((0.07/12)/(1-Math.pow(1+0.07/12,-240)));
  $('income').textContent=money(monthlyIncome);
  const goal=Math.max(0,Math.min(1000000,Number($('goal').value)||0));
  const incomeToday=monthlyIncome/Math.pow(1.04,retirement-age);
  $('goalStatus').textContent=goal ? `${Math.round(incomeToday/goal*100)}% de tu meta inicial, aprox.` : 'Define tu meta mensual';
  $('horizon').textContent=`${retirement-age} ${retirement-age===1?'año':'años'} de aportaciones`;
  const ceiling=Math.max(result.balance,1), x=i=>72+i/(result.points.length-1)*865, y=v=>77-v/ceiling*65;
  const path=key=>result.points.map((p,i)=>`${i?'L':'M'}${x(i)},${y(p[key])}`).join(' ');
  let grid='';for(let i=0;i<=2;i++){const v=ceiling*i/2;grid+=`<line x1="72" x2="937" y1="${y(v)}" y2="${y(v)}" stroke="#24445b"/><text x="62" y="${y(v)+5}" text-anchor="end" fill="#b3c6d8" font-size="14">${v>=1e6?(v/1e6).toFixed(1)+' M':v>=1000?(v/1000).toFixed(0)+' mil':Math.round(v)}</text>`;}
  const ticks=[...new Set([0,Math.floor((result.points.length-1)/2),result.points.length-1])].map(i=>`<text x="${x(i)}" y="100" text-anchor="middle" fill="#b3c6d8" font-size="15">${result.points[i].age} años</text>`).join('');
  $('chart').innerHTML=`<title id="chartTitle">Capital estimado ${money(result.balance)} a los ${retirement} años; aportación total ${money(result.contributed)}</title><defs><linearGradient id="fill" x2="0" y2="1"><stop stop-color="#eac16c" stop-opacity=".7"/><stop offset="1" stop-color="#eac16c" stop-opacity=".08"/></linearGradient></defs>${grid}<path d="${path('balance')} L937,77 L72,77 Z" fill="url(#fill)"/><path d="${path('balance')}" fill="none" stroke="#edc36c" stroke-width="3"/><path d="${path('contributed')}" fill="none" stroke="#43b7fa" stroke-width="3"/>${ticks}`;
}
document.querySelectorAll('[data-for]').forEach(button=>button.onclick=()=>{const input=$(button.dataset.for);input.value=Math.min(+input.max,Math.max(+input.min,+input.value+(+button.dataset.dir)*(+input.step||1)));render();});
['age','retire','monthly','goal'].forEach(id=>$(id).addEventListener('input',render)); render();
let stream;
$('startCamera').onclick=async()=>{
  try{
    if(!navigator.mediaDevices?.getUserMedia) throw Error('unavailable');
    stream=await navigator.mediaDevices.getUserMedia({video:{width:{ideal:1080},height:{ideal:960}},audio:false});
    $('video').srcObject=stream;await $('video').play();$('cameraPrompt').hidden=true;$('stopCamera').hidden=false;
  }catch(error){if(stream)stream.getTracks().forEach(t=>t.stop());$('cameraStatus').textContent='No se pudo activar la cámara. Revisa el permiso del navegador o utiliza tu programa de transmisión.';}
};
$('stopCamera').onclick=()=>{if(stream)stream.getTracks().forEach(t=>t.stop());$('video').srcObject=null;$('cameraPrompt').hidden=false;$('stopCamera').hidden=true;};
window.addEventListener('pagehide',()=>{if(stream)stream.getTracks().forEach(t=>t.stop());});
