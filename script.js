const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];

// Mobile navigation
$('#menuBtn').addEventListener('click', () => {
  const nav = $('#nav'); nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
});
$$('#nav a').forEach(a => a.addEventListener('click', () => { if(innerWidth < 901) $('#nav').style.display='none'; }));

// Scroll progress
addEventListener('scroll', () => {
  const max = document.documentElement.scrollHeight - innerHeight;
  $('#progress').style.width = `${(scrollY / max) * 100}%`;
});

// Sector filters
$$('.filter').forEach(btn => btn.addEventListener('click', () => {
  $$('.filter').forEach(b => b.classList.remove('active')); btn.classList.add('active');
  const filter = btn.dataset.filter;
  $$('.sector-card').forEach(card => card.style.display = filter === 'all' || card.dataset.cat === filter ? '' : 'none');
}));

// Modal pathways
const details = {
  agro: {title:'Farm-to-brand pathway', text:'Start with one local crop or food product. Build a small repeatable chain: producer group → sorting → processing → food safety → packaging → catalogue → local + digital buyers.'},
  craft: {title:'Craft & handloom pathway', text:'Document the craft, improve quality consistency, co-design contemporary use cases, photograph every product, create a transparent maker story and sell through exhibitions, retailers and digital channels.'},
  forest: {title:'Forest-to-value pathway', text:'Map sustainable local collection, aggregate through community groups, grade and process the produce, invest in safe packaging and traceability, then connect to institutional and consumer markets.'},
  digital: {title:'Rural digital services pathway', text:'Train local youth to become the digital layer: product photography, cataloguing, inventory, social content, customer support, bookkeeping and logistics coordination for producer groups.'}
};
function openModal(html){$('#modalContent').innerHTML=html;$('#modal').classList.add('show');$('#modal').setAttribute('aria-hidden','false')}
$$('[data-detail]').forEach(btn => btn.addEventListener('click',()=>{const d=details[btn.dataset.detail];openModal(`<div class="eyebrow">ROOTS & RISE PATHWAY</div><h3>${d.title}</h3><p>${d.text}</p><div class="modal-step"><b>1 · Start small</b> — choose one product with real local supply.</div><div class="modal-step"><b>2 · Add value</b> — improve quality, processing and presentation.</div><div class="modal-step"><b>3 · Reach buyers</b> — test local demand before scaling digitally.</div>`)}));
$('#closeModal').addEventListener('click',()=>$('#modal').classList.remove('show'));
$('#modal').addEventListener('click',e=>{if(e.target.id==='modal')$('#modal').classList.remove('show')});

// Story modal
$('#storyBtn').addEventListener('click',()=>openModal(`<div class="eyebrow">THE 60-SECOND IDEA</div><h3>Move value closer to the producer.</h3><p>A farmer or artisan should not have to remain only a supplier of cheap raw material. The enterprise can own more of the journey: aggregation, processing, design, packaging, branding and market access.</p><div class="modal-step"><b>Local knowledge</b> → becomes a differentiated product.</div><div class="modal-step"><b>Collective organisation</b> → creates scale and bargaining power.</div><div class="modal-step"><b>Digital infrastructure</b> → makes the product discoverable.</div><div class="modal-step"><b>Fair market access</b> → keeps more value with the community.</div>`));

// Calculator
const inputs = {units:$('#units'),raw:$('#rawPrice'),va:$('#vaPrice'),cost:$('#cost')};
function calc(){
  const u=+inputs.units.value,r=+inputs.raw.value,v=+inputs.va.value,c=+inputs.cost.value;
  $('#unitsOut').textContent=`${u} units`; $('#rawOut').textContent=`₹${r}`; $('#vaOut').textContent=`₹${v}`; $('#costOut').textContent=`₹${c}`;
  const raw=u*r, gross=u*(v-c), gain=gross-raw;
  $('#result').textContent=`₹${Math.max(0,gross).toLocaleString('en-IN')}`;
  $('#resultText').textContent=`Compared with ₹${raw.toLocaleString('en-IN')} if sold raw — an illustrative gross uplift of ₹${gain.toLocaleString('en-IN')}.`;
  $('#bar').style.width=`${Math.min(100,Math.max(8,(gross/Math.max(raw,1))*50))}%`;
}
Object.values(inputs).forEach(i=>i.addEventListener('input',calc)); calc();

// Cart toast
$('#buyBtn').addEventListener('click',()=>{const t=$('#toast');t.textContent='Added to community cart ✓';t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2200)});
$('#pledgeBtn').addEventListener('click',()=>{const t=$('#toast');t.textContent='Thank you — grassroots enterprise starts with support ✓';t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2600)});
