(() => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#nav');
  const closeMenu = () => {toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Abrir menu');nav.classList.remove('open');};
  toggle.addEventListener('click', () => {const open=toggle.getAttribute('aria-expanded')==='true';if(open)closeMenu();else{toggle.setAttribute('aria-expanded','true');toggle.setAttribute('aria-label','Fechar menu');nav.classList.add('open');}});
  nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav.classList.contains('open')){closeMenu();toggle.focus();}});
  document.addEventListener('click',e=>{if(!e.target.closest('.nav-wrap'))closeMenu();});
  window.matchMedia('(min-width:821px)').addEventListener('change',closeMenu);
  document.querySelectorAll('img[data-local]').forEach(img=>{
    const fallback=()=>img.classList.add('failed');
    const handleError=()=>{if(!img.dataset.tried){img.dataset.tried='1';img.src=img.dataset.local;}else fallback();};
    img.addEventListener('error',handleError);if(img.complete&&!img.naturalWidth)handleError();
  });
  if('IntersectionObserver' in window&&!matchMedia('(prefers-reduced-motion: reduce)').matches){
    const items=document.querySelectorAll('.intro,.approach-copy,.about-copy,.about-visual,.service-grid article,.office-copy,.office-photos,.faq-grid>div,.contact-inner');
    document.documentElement.classList.add('js');
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}}),{threshold:0.08});
    items.forEach(el=>{el.classList.add('reveal');observer.observe(el);});
  }
})();
