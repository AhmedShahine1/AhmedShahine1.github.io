const $$=s=>document.querySelectorAll(s);
$$('.reveal').forEach(x=>new IntersectionObserver(entries=>entries.forEach(v=>v.isIntersecting&&v.target.classList.add('show')),{threshold:.1}).observe(x));
document.addEventListener('mousemove',e=>{$$('.tilt:hover').forEach(c=>{const r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;c.style.transform=`perspective(900px) rotateY(${x*4}deg) rotateX(${-y*4}deg) translateY(-5px)`})});
document.addEventListener('mouseout',e=>{const c=e.target.closest?.('.tilt');if(c)c.style.transform=''});
function openOS(){location.href='dashboard.html'}
document.addEventListener('keydown',e=>{if(!['INPUT','TEXTAREA','SELECT'].includes(document.activeElement.tagName)){window._typed=(window._typed||'')+e.key.toLowerCase();window._typed=window._typed.slice(-8);if(window._typed.includes('ahmedos')){window._typed='';openOS()}}});