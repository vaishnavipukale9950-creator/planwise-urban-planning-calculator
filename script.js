const $ = id => document.getElementById(id);
const defaults = [{name:'Residential',area:10.60},{name:'Commercial',area:0.80},{name:'Public facilities',area:1.51},{name:'Transport',area:2.51},{name:'Utilities',area:0.42},{name:'Green / recreation',area:5.10}];
let lastReport = '';
function num(id) { const value = $(id).value.trim(); return value === '' ? NaN : Number(value); }
function format(value, digits=2) { return value.toLocaleString('en-IN',{maximumFractionDigits:digits,minimumFractionDigits:digits}); }
function setResult(id, value, detail) { $(id).className = 'result'+(value === null?' error':''); $(id).innerHTML = value === null ? 'Enter valid values (plot/total area must be greater than zero).' : `<strong>${value}</strong>${detail}`; }
function addLandRow(name='',area='') {
  const row = document.createElement('div'); row.className='land-row';
  const nameInput = document.createElement('input');nameInput.value=name;nameInput.placeholder='Land-use name';nameInput.setAttribute('aria-label','Land-use name');
  const areaInput = document.createElement('input');areaInput.type='number';areaInput.min='0';areaInput.step='any';areaInput.value=area;areaInput.placeholder='Area (ha)';areaInput.setAttribute('aria-label','Area in hectares');
  const remove=document.createElement('button');remove.type='button';remove.textContent='×';remove.title='Remove row';remove.setAttribute('aria-label','Remove land-use row');remove.onclick=()=>{row.remove();update();};
  row.append(nameInput,areaInput,remove);$('landRows').append(row);
}
function update(){
  const fsi=calculateFsi(num('fsiPlot'),num('floorArea'));
  const coverage=calculateCoverage(num('coveragePlot'),num('footprint'));
  const rows=[...document.querySelectorAll('.land-row')].map(row=>({name:row.children[0].value.trim()||'Unnamed',area:row.children[1].value.trim()===''?NaN:Number(row.children[1].value)}));
  const land=calculateLandUse(rows);
  const parking=calculateParking(num('parkingArea'),num('parkingRatio'));
  setResult('fsiResult',fsi===null?null:format(fsi),'FSI / FAR (dimensionless)');
  setResult('coverageResult',coverage===null?null:format(coverage)+'%','of plot covered by the footprint');
  setResult('landResult',land===null?null:format(land.total)+' ha','total entered land area');
  setResult('parkingResult',parking===null?null:String(parking),'estimated parking spaces (rounded up)');
  $('landBreakdown').replaceChildren();
  if(land) land.shares.forEach(item=>{
    const line=document.createElement('div');line.className='land-line';
    const name=document.createElement('span');name.textContent=item.name;
    const share=document.createElement('b');share.textContent=format(item.percent)+'%';line.append(name,share);
    const bar=document.createElement('div');bar.className='bar';const fill=document.createElement('div');fill.style.width=item.percent+'%';bar.append(fill);
    $('landBreakdown').append(line,bar);
  });
  lastReport=['PLANWISE — CALCULATION SUMMARY','Generated: '+new Date().toLocaleString(),'','FSI / FAR: '+(fsi===null?'Invalid':format(fsi)),'Ground coverage: '+(coverage===null?'Invalid':format(coverage)+'%'),'Parking estimate: '+(parking===null?'Invalid':parking+' spaces'),'','Land use:'].concat(land?land.shares.map(item=>`${item.name}: ${format(item.area)} ha (${format(item.percent)}%)`):['Invalid']).concat(['','Educational estimates only; verify applicable local regulations.']).join('\n');
}
function reset(){for(const [id,value] of Object.entries({fsiPlot:1000,floorArea:1800,coveragePlot:1000,footprint:400,parkingArea:2000,parkingRatio:2}))$(id).value=value;$('landRows').replaceChildren();defaults.forEach(row=>addLandRow(row.name,row.area));update();}
document.addEventListener('input',update);
$('addLand').addEventListener('click',()=>{addLandRow();update();});
$('reset').addEventListener('click',reset);
$('download').addEventListener('click',()=>{const blob=new Blob([lastReport],{type:'text/plain;charset=utf-8'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='planwise-results.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);});
const calculationScript=document.createElement('script');calculationScript.src='calculations.js';calculationScript.onload=reset;document.head.append(calculationScript);
