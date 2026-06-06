let currentZone = null;
let currentCat = 'all';
let currentWeek = 23;

function selectZone(zoneId) {
  // Deselect previous
  if (currentZone) {
    document.getElementById('zone-' + currentZone)?.querySelectorAll('polygon,ellipse,path').forEach(el => {
      el.style.opacity = '';
    });
    document.getElementById('chip-' + currentZone)?.classList.remove('active');
  }

  currentZone = zoneId;
  currentCat = 'all';

  // Highlight zone
  const zone = document.getElementById('zone-' + zoneId);
  if (zone) {
    zone.querySelectorAll('polygon').forEach(el => {
      el.style.strokeWidth = '2.5';
      el.style.filter = 'brightness(0.92)';
    });
  }

  document.getElementById('chip-' + zoneId)?.classList.add('active');

  const d = DATA[zoneId];
  if (!d) return;

  document.getElementById('regionName').textContent = d.name;
  document.getElementById('newsCount').textContent = d.count + ' notizie · settimana ' + currentWeek;
  document.getElementById('categoryPills').style.display = 'flex';

  // Reset pills
  document.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
  document.querySelector('.pill-politica').classList.add('active');

  // Digest
  document.getElementById('digestText').textContent = d.digest;
  document.getElementById('digestBanner').style.display = 'block';

  renderNews(d.news);
}

function renderNews(newsArr) {
  const feed = document.getElementById('newsFeed');
  const filtered = currentCat === 'all' ? newsArr : newsArr.filter(n => n.cat === currentCat);

  if (filtered.length === 0) {
    feed.innerHTML = '<div class="empty-state"><div class="empty-icon">🔍</div><div class="empty-text">Nessuna notizia<br>per questa categoria</div></div>';
    return;
  }

  feed.innerHTML = filtered.map((n, i) => `
    <div class="news-item" style="animation-delay:${i * 0.07}s" onclick="openNews(n)">
      <div class="news-cat" style="color:${n.color}">${n.cat.toUpperCase()}</div>
      <div class="news-headline">${n.headline}</div>
      <div class="news-footer">
        <div class="news-source">
          <div class="source-dot"></div>
          ${n.source}
        </div>
        <span>${n.date}</span>
      </div>
    </div>
  `).join('');
}

function filterCat(cat, el) {
  currentCat = cat;
  document.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
  el.classList.add('active');
  if (currentZone) renderNews(DATA[currentZone].news);
}

function setWeek(btn, w) {
  currentWeek = w;
  document.querySelectorAll('.week-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');

  // Update timeline dots
  const dots = document.querySelectorAll('.timeline-dot');
  const weeks = [19, 20, 21, 22, 23];
  dots.forEach((d, i) => {
    d.classList.toggle('active', weeks[i] === w);
  });

  if (currentZone) {
    document.getElementById('newsCount').textContent = DATA[currentZone].count + ' notizie · settimana ' + w;
  }
}

function showTooltip(e, text) {
  const tt = document.getElementById('tooltip');
  const rect = document.getElementById('mapContainer').getBoundingClientRect();
  tt.textContent = text;
  tt.style.left = (e.clientX - rect.left + 10) + 'px';
  tt.style.top = (e.clientY - rect.top - 30) + 'px';
  tt.classList.add('visible');
}

function hideTooltip() {
  document.getElementById('tooltip').classList.remove('visible');
}

function openNews(n) {
  if (n.url) window.open(n.url, "_blank", "noopener,noreferrer");
}
