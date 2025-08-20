
const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('#site-nav');
navToggle.addEventListener('click', () => {
  const open = siteNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
});

document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href').substring(1);
    const el = document.getElementById(id);
    if(el){
      e.preventDefault();
      el.scrollIntoView({behavior:'smooth', block: 'start'});
      siteNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
});

const events = [
  { title: "Hackathon ", tag: "College competition ", date: "20 Aug 2025", image: "assets/IMG-20250820-WA0015.jpg", desc: "Explore the future at our science exhibition, coding competition, and hands-on workshop, sparking innovation and creativity in all participants."},
  { title: "Science Exhibition", tag: " School Competition", date: "20 Aug 2025", image: "assets/IMG_5475.JPG", desc: "Explore the future at our science exhibition, coding competition, and hands-on workshop, sparking innovation and creativity in all participants.."},
  { title: "Cultural Celebration", tag: "Outdoor Games", date: "20 Aug 2025", image: "assets/IMG-20250820-WA0013.jpg", desc: "Treasure hunt excitement, outdoor stalls, cultural celebrations, and a DJ night to remember.."},
  { title: "Tech Fest", tag: "College Competition", date: "20 Aug 2025", image: "assets/IMG-20250820-WA0020.jpg", desc: "showcase the talent , organise gaming tournaments like BGMI , FREE FIRE,COC "},
  { title: "Open DJ", tag: "Outdoor Games", date: "20 Aug 2025", image: "assets/WhatsApp Image 2025-08-20 at 15.13.56_600aaa82.jpg", desc: "Enjoy the DJ Night."}
];

const cardsWrap = document.getElementById('event-cards');
cardsWrap.innerHTML = events.map(e => `
  <article class="card">
    <div class="tag">${e.tag}</div>
    <h3>${e.title}</h3>
    <p>${e.desc}</p>
  </article>
`).join('');

const cardElements = cardsWrap.querySelectorAll('.card');
cardElements.forEach((cardEl, idx) => {
  const btn = document.createElement('a');
  btn.href = '#';
  btn.className = 'btn btn-ghost';
  btn.textContent = 'Know More';
  btn.addEventListener('click', (ev) => {
    ev.preventDefault();
    const evData = events[idx];
    const win = window.open('', '_blank');
    if (!win) return;
    win.opener = null;
    const page = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>${evData.title} — Details</title>
<link rel="icon" type="image/svg+xml" href="assets/favicon.svg">
<style>
  :root{--bg:#0b1020;--text:#e6e9f5;--muted:#a6accd;--primary:#7c5cff}
  body{margin:0;background:var(--bg);color:var(--text);font-family:Inter,ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,"Helvetica Neue",Arial}
  .wrap{max-width:900px;margin:0 auto;padding:28px 20px}
  .tag{display:inline-block;font-size:.8rem;padding:.25rem .6rem;border-radius:999px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.08);margin-bottom:.75rem}
  .meta{color:var(--muted);margin:.25rem 0 1rem}
  h1{margin:.25rem 0 .5rem;line-height:1.1}
  p{color:var(--muted);font-size:1.05rem}
  .hero{border:1px solid rgba(255,255,255,.08);border-radius:14px;overflow:hidden;margin:8px 0 16px}
  .hero img{display:block;width:100%;height:auto}
  .actions{margin-top:16px}
  .btn{display:inline-flex;align-items:center;gap:.5rem;border:1px solid rgba(255,255,255,.12);padding:.6rem .9rem;border-radius:10px;text-decoration:none;color:var(--text)}
  .btn-primary{background:linear-gradient(180deg,var(--primary),#5c3bff);color:#fff;border-color:transparent}
  ul{margin:.5rem 0 0 1.1rem}
</style>
</head>
<body>
  <div class="wrap">
    <div class="tag">${evData.tag}</div>
    <h1>${evData.title}</h1>
    <div class="meta">${evData.date ? evData.date : ''}</div>
    <div class="hero">
      <img src="${evData.image || ''}" alt="${evData.title} image"/>
    </div>
    <p>${evData.desc}</p>
    <ul>
      <li>Team size: up to 4 participants</li>
      <li>Duration: 24 hours</li>
      <li>Judging: innovation, impact, and execution</li>
    </ul>
    <div class="actions">
      <a class="btn btn-primary" href="#" onclick="window.close();return false;">Close</a>
    </div>
  </div>
</body>
</html>`;
    win.document.write(page);
    win.document.close();
  });
  cardEl.appendChild(btn);
});

async function loadSchedule(){
  try{
    const res = await fetch('schedule.json');
    const data = await res.json();
    for(const day of ['day-1','day-2','day-3']){
      const wrap = document.getElementById(day);
      wrap.innerHTML = data[day].map(item => `
        <div class="session">
          <div class="time">${item.time}</div>
          <div>
            <div><strong>${item.title}</strong></div>
            <div class="muted">${item.location} • ${item.speaker || ''}</div>
          </div>
        </div>
      `).join('');
    }
  }catch(e){
    console.error('Failed to load schedule', e);
  }
}
loadSchedule();
// Tabs behavior
const tabs = document.querySelectorAll('.tab');
const panels = document.querySelectorAll('.panel');
tabs.forEach((tab, i) => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('is-active')); 
    panels.forEach(p => p.classList.remove('is-active'));
    tab.classList.add('is-active');
    panels[i].classList.add('is-active');
  });
});

