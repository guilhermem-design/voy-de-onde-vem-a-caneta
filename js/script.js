document.documentElement.classList.add('js-ready');
var reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
document.querySelectorAll('.tabs').forEach(function(group){
group.querySelectorAll('.tab').forEach(function(tab){
tab.addEventListener('click',function(){
var scope=group.closest('.vcol');
group.querySelectorAll('.tab').forEach(function(t){t.classList.remove('on')});
tab.classList.add('on');
var key=tab.getAttribute('data-tab');
scope.querySelectorAll('.pane').forEach(function(p){p.classList.toggle('on',p.getAttribute('data-pane')===key)});
});
});
});
var menuToggle=document.getElementById('menuToggle'),menuOpen=false,lenis=null;
function setMenu(open){menuOpen=open;document.body.classList.toggle('menu-open',open);if(lenis){open?lenis.stop():lenis.start();}}
menuToggle.addEventListener('click',function(e){e.preventDefault();setMenu(!menuOpen);});
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&menuOpen)setMenu(false);});
document.querySelectorAll('.menu-item').forEach(function(item){
item.addEventListener('click',function(e){e.preventDefault();var t=item.dataset.target;setMenu(false);
setTimeout(function(){var el=document.querySelector(t);if(el&&lenis)lenis.scrollTo(el,{offset:-10});else if(el)el.scrollIntoView({behavior:'smooth'});},600);});
});
window.__webp=(function(){try{return document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp')===0;}catch(e){return false;}})();
var __mob=matchMedia('(max-width:760px)').matches;
function __dpr(){return Math.min(window.devicePixelRatio||1,__mob?1.5:2);}
function primeLoad(el,loadFn){
if('IntersectionObserver' in window){
var io=new IntersectionObserver(function(es){for(var i=0;i<es.length;i++){if(es[i].isIntersecting){loadFn();io.disconnect();return;}}},{rootMargin:'150% 0px 150% 0px'});
io.observe(el);
}else{loadFn();}
}
function mountScrub(useScroll){
var section=document.getElementById('heroScrub'),canvas=document.getElementById('heroCanvas');
if(!section||!canvas)return;
var ctx=canvas.getContext('2d'),cur=-1,TOTAL=122,PATH='https://cdn.jsdelivr.net/gh/guilhermem-design/voy-de-onde-vem-a-caneta@main/frames/pens/frame_',EXT=window.__webp?'webp':'jpg';
var step=(useScroll&&__mob)?2:1,nums=[];for(var i=1;i<=TOTAL;i+=step)nums.push(i);if(nums[nums.length-1]!==TOTAL)nums.push(TOTAL);
var N=nums.length,imgs=new Array(N),started=false;
var ov=document.getElementById('scrubOverlay'),chk=section.querySelector('.scrub-check'),circ=section.querySelector('.scrub-check circle'),pth=section.querySelector('.scrub-check path'),ltr=section.querySelector('.scrub-letter');
var circLen=(circ&&circ.getTotalLength)?circ.getTotalLength():132,pthLen=(pth&&pth.getTotalLength)?pth.getTotalLength():34;
if(circ){circ.style.strokeDasharray=circLen;circ.style.strokeDashoffset=circLen;}
if(pth){pth.style.strokeDasharray=pthLen;pth.style.strokeDashoffset=pthLen;}
function cl(v){return v<0?0:v>1?1:v}function eo(t){return 1-Math.pow(1-t,3)}
function setOverlay(p){if(!ov)return;var ca=eo(cl((p-0.34)/0.16)),cb=eo(cl((p-0.44)/0.18)),lt=eo(cl((p-0.52)/0.26));if(chk)chk.style.opacity=ca;if(circ)circ.style.strokeDashoffset=(circLen*(1-ca)).toFixed(1);if(pth)pth.style.strokeDashoffset=(pthLen*(1-cb)).toFixed(1);if(ltr){ltr.style.opacity=lt;ltr.style.transform='translateY('+(28*(1-lt)).toFixed(1)+'px)';}ov.style.setProperty('--ovy',((0.5-p)*70).toFixed(1)+'px');}
function imgAt(k){var img=imgs[k];if(img&&img.complete&&img.naturalWidth)return img;for(var j=k;j>=0;j--){if(imgs[j]&&imgs[j].complete&&imgs[j].naturalWidth)return imgs[j];}for(var j2=k+1;j2<N;j2++){if(imgs[j2]&&imgs[j2].complete&&imgs[j2].naturalWidth)return imgs[j2];}return null;}
function draw(k){var img=imgAt(k);if(!img)return;var dpr=__dpr(),cw=canvas.width/dpr,ch=canvas.height/dpr,iw=img.naturalWidth,ih=img.naturalHeight,scale=Math.max(cw/iw,ch/ih),dw=iw*scale,dh=ih*scale,dx=(cw-dw)/2,dy=(ch-dh)/2;ctx.clearRect(0,0,cw,ch);ctx.drawImage(img,dx,dy,dw,dh);cur=k;}
function resize(){var stage=section.querySelector('.frame-scrub-stage'),r=stage.getBoundingClientRect(),dpr=__dpr();canvas.width=r.width*dpr;canvas.height=r.height*dpr;canvas.style.width=r.width+'px';canvas.style.height=r.height+'px';ctx.setTransform(dpr,0,0,dpr,0,0);if(cur>=0)draw(cur);}
function loadFrame(k){if(imgs[k])return;var im=new Image();im.decoding='async';im.onload=function(){if(cur<0){resize();draw(0);}else draw(cur);};im.src=PATH+String(nums[k]).padStart(3,'0')+'.'+EXT;imgs[k]=im;}
function loadAll(){if(started)return;started=true;for(var k=0;k<N;k++)loadFrame(k);}
window.addEventListener('resize',resize);resize();
if(useScroll&&window.gsap){
primeLoad(section,loadAll);
ScrollTrigger.create({trigger:section,start:'top bottom',end:'bottom bottom',scrub:0.5,onUpdate:function(self){var k=Math.min(N-1,Math.floor(self.progress*N));if(k!==cur)draw(k);setOverlay(self.progress);}});
}else{loadFrame(0);setOverlay(1);if(ov)ov.style.setProperty('--ovy','0px');}
}
function mountContainScrub(wrapId,path,total,useScroll){
var wrap=document.getElementById(wrapId);if(!wrap)return;
var canvas=wrap.querySelector('canvas');if(!canvas)return;
var ctx=canvas.getContext('2d'),cur=-1,EXT=window.__webp?'webp':'jpg';
var step=(useScroll&&__mob)?2:1,nums=[];for(var i=1;i<=total;i+=step)nums.push(i);if(nums[nums.length-1]!==total)nums.push(total);
var N=nums.length,imgs=new Array(N),started=false;
function imgAt(k){var img=imgs[k];if(img&&img.complete&&img.naturalWidth)return img;for(var j=k;j>=0;j--){if(imgs[j]&&imgs[j].complete&&imgs[j].naturalWidth)return imgs[j];}for(var j2=k+1;j2<N;j2++){if(imgs[j2]&&imgs[j2].complete&&imgs[j2].naturalWidth)return imgs[j2];}return null;}
function draw(k){var img=imgAt(k);if(!img)return;var dpr=__dpr(),cw=canvas.width/dpr,ch=canvas.height/dpr,iw=img.naturalWidth,ih=img.naturalHeight,scale=Math.max(cw/iw,ch/ih),dw=iw*scale,dh=ih*scale,dx=(cw-dw)/2,dy=(ch-dh)/2;ctx.clearRect(0,0,cw,ch);ctx.drawImage(img,dx,dy,dw,dh);cur=k;}
function resize(){var r=wrap.getBoundingClientRect(),dpr=__dpr();canvas.width=r.width*dpr;canvas.height=r.height*dpr;canvas.style.width=r.width+'px';canvas.style.height=r.height+'px';ctx.setTransform(dpr,0,0,dpr,0,0);if(cur>=0)draw(cur);}
function loadFrame(k){if(imgs[k])return;var im=new Image();im.decoding='async';im.onload=function(){if(cur<0){resize();draw(0);}else draw(cur);};im.src=path+String(nums[k]).padStart(3,'0')+'.'+EXT;imgs[k]=im;}
function loadAll(){if(started)return;started=true;for(var k=0;k<N;k++)loadFrame(k);}
window.addEventListener('resize',resize);resize();
if(useScroll&&window.gsap){
primeLoad(wrap,loadAll);
ScrollTrigger.create({trigger:wrap,start:'top bottom',end:'bottom top',scrub:0.5,onUpdate:function(self){var k=Math.min(N-1,Math.floor(self.progress*N));if(k!==cur)draw(k);}});
}else{loadFrame(0);}
}
if(reduce || !window.gsap){
document.querySelectorAll('.fade-up').forEach(function(el){el.classList.add('in')});
mountScrub(false);
mountContainScrub('boxScrub','https://cdn.jsdelivr.net/gh/guilhermem-design/voy-de-onde-vem-a-caneta@main/frames/caixa/frame_',121,false);
document.querySelectorAll('.voice-media video').forEach(function(v){v.play().catch(function(){})});
}else{
try{lenis=new Lenis({duration:1.15,easing:function(t){return Math.min(1,1.001-Math.pow(2,-10*t))},smoothWheel:true});window.lenis=lenis;}catch(e){}
gsap.registerPlugin(ScrollTrigger);
if(lenis){gsap.ticker.add(function(time){lenis.raf(time*1000)});lenis.on('scroll',ScrollTrigger.update);}
gsap.ticker.lagSmoothing(0);
document.querySelectorAll('a[href^="#"]:not(.menu-item):not(.nav-logo)').forEach(function(a){
a.addEventListener('click',function(e){var id=a.getAttribute('href');if(id.length<2)return;var el=document.querySelector(id);if(!el)return;e.preventDefault();if(lenis)lenis.scrollTo(el,{offset:-10,duration:1.1});});
});
document.querySelectorAll('.fade-up').forEach(function(el){
var r=el.getBoundingClientRect();
if(r.top<innerHeight&&r.bottom>0){requestAnimationFrame(function(){el.classList.add('in')});return;}
ScrollTrigger.create({trigger:el,start:'top 88%',once:true,onEnter:function(){el.classList.add('in')}});
});
var nav=document.getElementById('nav');
document.querySelectorAll('.block.dark,.cta-section').forEach(function(s){
ScrollTrigger.create({trigger:s,start:'top 40px',end:'bottom 40px',onToggle:function(self){nav.classList.toggle('on-dark',self.isActive)}});
});
if(innerWidth>720){
var MULTS=[1.0,0.58,1.42,0.72,1.28,0.45,1.38,0.82,1.18,0.62];
function splitWords(el){
if(el.dataset.ws)return;el.dataset.ws='1';
var walker=document.createTreeWalker(el,NodeFilter.SHOW_TEXT,{acceptNode:function(n){return n.textContent.trim()?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP}});
var nodes=[],n;while((n=walker.nextNode()))nodes.push(n);
nodes.forEach(function(tn){var parts=tn.textContent.split(/(\s+)/),frag=document.createDocumentFragment();
parts.forEach(function(p){if(/^\s+$/.test(p))frag.appendChild(document.createTextNode(p));else if(p){var s=document.createElement('span');s.className='pw';s.style.cssText='display:inline-block;will-change:transform';s.textContent=p;frag.appendChild(s);}});
tn.parentNode.replaceChild(frag,tn);});
}
[{sel:'.big',base:28,scrub:1.7},{sel:'.banner-title',base:22,scrub:1.5},{sel:'.cta-headline',base:24,scrub:1.5},{sel:'.sec-title',base:22,scrub:1.6}].forEach(function(cfg){
document.querySelectorAll(cfg.sel).forEach(function(el){splitWords(el);
el.querySelectorAll('.pw').forEach(function(span,i){var travel=cfg.base*MULTS[i%MULTS.length];
gsap.fromTo(span,{y:-travel*0.45},{y:travel*0.55,ease:'none',scrollTrigger:{trigger:el,start:'top bottom',end:'bottom top',scrub:cfg.scrub}});});});
});
}
mountScrub(true);
mountContainScrub('boxScrub','https://cdn.jsdelivr.net/gh/guilhermem-design/voy-de-onde-vem-a-caneta@main/frames/caixa/frame_',121,true);
gsap.fromTo('#penHeader',{yPercent:-11},{yPercent:11,ease:'none',scrollTrigger:{trigger:'#confirme',start:'top bottom',end:'bottom top',scrub:true}});
document.querySelectorAll('.voice-media').forEach(function(wrap){
var v=wrap.querySelector('video'),badge=wrap.querySelector('.vmute');
if(!v)return;
if('IntersectionObserver' in window){
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting&&e.intersectionRatio>0.55){v.play().catch(function(){});}else{v.pause();}});},{threshold:[0,0.55,1]});
io.observe(wrap);
}else if(window.ScrollTrigger){
ScrollTrigger.create({trigger:wrap,start:'top bottom',end:'bottom top',onEnter:function(){v.play().catch(function(){})},onEnterBack:function(){v.play().catch(function(){})},onLeave:function(){v.pause()},onLeaveBack:function(){v.pause()}});
}
wrap.addEventListener('click',function(){v.muted=!v.muted;if(!v.muted)v.play().catch(function(){});if(badge)badge.style.display=v.muted?'block':'none';});
});
ScrollTrigger.refresh();
document.fonts && document.fonts.ready.then(function(){ScrollTrigger.refresh()});
}