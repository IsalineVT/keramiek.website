
(function(){
  function setHTML(sel, val){var el=document.querySelector(sel); if(el && val!==undefined) el.innerHTML=val;}
  function setText(sel, val){var el=document.querySelector(sel); if(el && val!==undefined) el.textContent=val;}
  function setSrc(sel, val){var el=document.querySelector(sel); if(el && val) el.src=val;}
  function setBg(sel, val){var el=document.querySelector(sel); if(el && val) el.style.backgroundImage="url('"+val+"')";}
  function esc(s){return String(s||'').replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]});}
  function imgBlock(url){return url ? '<img src="'+esc(url)+'" alt="" loading="lazy">' : '<div style="background:var(--red-pale);height:200px;display:flex;align-items:center;justify-content:center"><span style="font-family:Syne,sans-serif;font-size:4rem;font-weight:800;color:var(--red-light)">+</span></div>';}
  function loadData(){
    fetch('data/site.json?ts=' + Date.now()).then(function(r){return r.json()}).then(function(d){
      document.title = d.site && d.site.title ? d.site.title : document.title;
      setText('meta[name="description"]', d.site && d.site.description);
      setHTML('.hero-eyebrow', d.hero.eyebrow); setHTML('.hero-h1', d.hero.title); setHTML('.hero-desc', d.hero.description); setBg('#heroBg', d.hero.image); setText('.btn-white', d.hero.primaryButton); setText('.btn-outline-w', d.hero.secondaryButton);
      var stats=document.querySelector('.stats-bar'); if(stats && Array.isArray(d.stats)){stats.innerHTML=d.stats.map(function(s){return '<div class="stat-c rev in"><div class="stat-n">'+s.number+'</div><div class="stat-l">'+s.label+'</div></div>';}).join('');}
      setText('#about-h', d.about.title); setHTML('.about-grid .sec-sub', d.about.text1); setHTML('.about-grid p[style*="font-size"]', d.about.text2); setSrc('.about-img img', d.about.image); setText('.about-img-badge', d.about.badge);
      var boxes=document.querySelector('.info-boxes'); if(boxes) boxes.innerHTML=(d.about.boxes||[]).map(function(b){return '<div class="ib"><div class="ibl">'+esc(b.label)+'</div><div class="ibv">'+b.value+'</div></div>';}).join('');
      var acts=document.querySelector('.act-list'); if(acts) acts.innerHTML=(d.about.activities||[]).map(function(a){return '<div class="act-li rev in"><div class="act-dot"></div><span>'+a+'</span></div>';}).join('');
      setHTML('.quote-band blockquote', '"'+d.quote.text+'"'); setHTML('.quote-band cite', d.quote.cite);
      var fbs=document.querySelectorAll('.fullbleed'); if(fbs[0]){setBg('#fb1', d.feature1.image); setHTML('#fb1 ~ .fb-overlay + .fb-content h2', d.feature1.title); setHTML('#fb1 ~ .fb-overlay + .fb-content p', d.feature1.text); setText('#fb1 ~ .fb-overlay + .fb-content a', d.feature1.button);} if(fbs[1]){setBg('#fb2', d.feature2.image); setHTML('#fb2 ~ .fb-overlay + .fb-content h2', d.feature2.title); setHTML('#fb2 ~ .fb-overlay + .fb-content p', d.feature2.text); setText('#fb2 ~ .fb-overlay + .fb-content a', d.feature2.button);}
      setText('#news-h', d.newsTitle); var news=document.querySelector('.news-grid'); if(news) news.innerHTML=(d.news||[]).map(function(n){return '<article class="nc rev in"><div class="nc-img">'+imgBlock(n.image)+'</div><div class="nc-body"><span class="nc-tag">'+esc(n.tag)+'</span><h3>'+esc(n.title)+'</h3><p>'+esc(n.text)+'</p></div></article>';}).join('');
      setText('#yt-h', d.video.title); setText('.yt-inner .sec-sub', d.video.text); var iframe=document.querySelector('.yt-frame iframe'); if(iframe && d.video.youtube) iframe.src=d.video.youtube;
      setText('#page-fotos .pb-inner p', d.galleryIntro); var gal=document.getElementById('masonry'); if(gal) gal.innerHTML=(d.gallery||[]).map(function(g){return '<div class="m-item" data-c="'+esc(g.category)+'"><img src="'+esc(g.image)+'" alt="'+esc(g.label)+'" loading="lazy"><div class="m-ov"><span>'+esc(g.label)+'</span></div></div>';}).join('');
      setText('#page-agenda .pb-inner p', d.agendaIntro); var ag=document.querySelector('.ag-list'); if(ag) ag.innerHTML=(d.agenda||[]).map(function(a){return '<article class="ag-item rev in" role="listitem"><div class="ag-date"><div class="ag-day">'+esc(a.day)+'</div><div class="ag-mon">'+esc(a.month)+'</div></div><div class="ag-info"><h3>'+esc(a.title)+'</h3><p>'+esc(a.text)+'</p></div><div class="ag-badge '+esc(a.badgeClass||'b-act')+'">'+esc(a.badge)+'</div></article>';}).join(''); setHTML('#page-agenda section .sec-inner > div[style*="red-pale"] p', d.fixedRepetition);
      setText('#page-bestuur .pb-inner p', d.boardIntro); var board=document.querySelector('.board-grid'); if(board) board.innerHTML=(d.board||[]).map(function(b){return '<div class="bc rev in"><div class="bc-init">'+esc(b.initials)+'</div><h3>'+esc(b.name)+'</h3><div class="role">'+esc(b.role)+'</div><p class="bio">'+esc(b.bio)+'</p></div>';}).join('');
      setText('#page-leden .pb-inner p', d.membersIntro); var mem=document.getElementById('memGrid'); if(mem) mem.innerHTML=(d.members||[]).map(function(m){return '<div class="mc rev in" data-v="'+esc(m.voice)+'"><div class="mc-av">'+esc(m.initials)+'</div><h4>'+esc(m.name)+'</h4><p>'+esc(m.voiceLabel)+'</p></div>';}).join('');
      setText('#page-contact .pb-inner p', d.contact.intro); setHTML('#page-contact .ci:nth-of-type(1) p', d.contact.address); var mail=document.querySelector('#page-contact .ci:nth-of-type(2) a'); if(mail){mail.textContent=d.contact.email; mail.href='mailto:'+d.contact.email;} setHTML('#page-contact .ci:nth-of-type(3) p', d.contact.repetitions); setHTML('#page-contact .ci:nth-of-type(4) p', d.contact.age); setHTML('footer .ft-bottom p', d.footer);
      if(typeof reveal==='function') reveal();
    }).catch(function(err){console.warn('CMS data could not be loaded', err);});
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', loadData); else loadData();
})();
