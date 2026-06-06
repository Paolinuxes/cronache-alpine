<!DOCTYPE html>
<html lang="it">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Cronache Alpine — Trentino-Alto Adige</title>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="style.css">
</head>
<body>

<header>
  <div class="header-top">
    <div class="masthead">Cronache <span>Alpine</span></div>
    <div class="date-badge">Settimana 23 · Giugno 2026</div>
  </div>
  <div class="week-nav">
    <label>Settimana</label>
    <div class="week-selector">
      <button class="week-btn" onclick="setWeek(this, 20)">20</button>
      <button class="week-btn" onclick="setWeek(this, 21)">21</button>
      <button class="week-btn" onclick="setWeek(this, 22)">22</button>
      <button class="week-btn active" onclick="setWeek(this, 23)">23 ·attuale</button>
    </div>
  </div>
</header>

<div class="main">

  <!-- MAP SECTION -->
  <div class="map-section">
    <div class="map-title">▸ Seleziona una provincia o zona sulla mappa</div>

    <div class="map-container" id="mapContainer">
      <div class="map-tooltip" id="tooltip"></div>

      <svg viewBox="0 0 520 480" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;">

        <!-- Background subtle relief -->
        <defs>
          <radialGradient id="reliefGrad" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stop-color="#e8e0ce" stop-opacity="0.6"/>
            <stop offset="100%" stop-color="#d4c9b0" stop-opacity="0.2"/>
          </radialGradient>
          <filter id="softShadow">
            <feDropShadow dx="1" dy="2" stdDeviation="3" flood-opacity="0.12"/>
          </filter>
        </defs>

        <rect width="520" height="480" fill="url(#reliefGrad)" rx="4"/>

        <!-- ── ZONE CLICCABILI ── -->

        <!-- Bolzano / Alto Adige / Südtirol -->
        <g class="zone" id="zone-bolzano" onclick="selectZone('bolzano')"
           onmouseenter="showTooltip(event,'Alto Adige / Südtirol')"
           onmouseleave="hideTooltip()">
          <polygon points="80,60 180,40 300,55 320,100 310,160 280,190 240,200 200,195 160,170 120,160 90,130 70,95"
            fill="#c8e6c9" stroke="#2d6a4f" stroke-width="1.5" filter="url(#softShadow)"/>
          <text x="195" y="118" text-anchor="middle" font-family="Playfair Display,serif" font-size="13" fill="#1a3d2b" font-weight="700">Alto Adige</text>
          <text x="195" y="133" text-anchor="middle" font-family="DM Sans,sans-serif" font-size="9" fill="#2d6a4f" letter-spacing="1" font-style="italic">Südtirol</text>
        </g>

        <!-- Trento / Trentino -->
        <g class="zone" id="zone-trento" onclick="selectZone('trento')"
           onmouseenter="showTooltip(event,'Provincia di Trento')"
           onmouseleave="hideTooltip()">
          <polygon points="120,160 160,170 200,195 240,200 280,190 310,160 330,200 340,260 320,320 290,360 250,380 210,375 175,350 150,300 130,260 115,210"
            fill="#bbdefb" stroke="#457b9d" stroke-width="1.5" filter="url(#softShadow)"/>
          <text x="228" y="285" text-anchor="middle" font-family="Playfair Display,serif" font-size="13" fill="#1a2d3d" font-weight="700">Trentino</text>
          <text x="228" y="300" text-anchor="middle" font-family="DM Sans,sans-serif" font-size="9" fill="#457b9d" letter-spacing="1" font-style="italic">Provincia di Trento</text>
        </g>

        <!-- Val Venosta / Vinschgau (subzone dentro AA) -->
        <g class="zone" id="zone-venosta" onclick="selectZone('venosta')"
           onmouseenter="showTooltip(event,'Val Venosta · Vinschgau')"
           onmouseleave="hideTooltip()">
          <polygon points="80,60 150,55 160,100 130,130 90,130 70,95"
            fill="#a5d6a7" stroke="#2d6a4f" stroke-width="1" stroke-dasharray="4,2"/>
          <text x="113" y="95" text-anchor="middle" font-family="DM Sans,sans-serif" font-size="8" fill="#1a3d2b" font-weight="500">Venosta</text>
        </g>

        <!-- Bolzano città marker -->
        <g style="pointer-events:none;">
          <circle cx="220" cy="155" r="5" fill="#2d6a4f" opacity="0.8"/>
          <circle cx="220" cy="155" r="9" fill="none" stroke="#2d6a4f" stroke-width="1" opacity="0.4"/>
          <text x="233" y="159" font-family="DM Sans,sans-serif" font-size="8" fill="#1a3d2b" font-weight="600">Bolzano</text>
        </g>

        <!-- Trento città marker -->
        <g style="pointer-events:none;">
          <circle cx="240" cy="320" r="5" fill="#457b9d" opacity="0.8"/>
          <circle cx="240" cy="320" r="9" fill="none" stroke="#457b9d" stroke-width="1" opacity="0.4"/>
          <text x="253" y="324" font-family="DM Sans,sans-serif" font-size="8" fill="#1a2d3d" font-weight="600">Trento</text>
        </g>

        <!-- Merano marker -->
        <g style="pointer-events:none;">
          <circle cx="165" cy="130" r="3.5" fill="#2d6a4f" opacity="0.7"/>
          <text x="172" y="134" font-family="DM Sans,sans-serif" font-size="7" fill="#1a3d2b">Merano</text>
        </g>

        <!-- Rovereto marker -->
        <g style="pointer-events:none;">
          <circle cx="215" cy="355" r="3.5" fill="#457b9d" opacity="0.7"/>
          <text x="222" y="359" font-family="DM Sans,sans-serif" font-size="7" fill="#1a2d3d">Rovereto</text>
        </g>

        <!-- News count bubbles (dynamic) -->
        <g id="bubbles">
          <g id="bubble-bolzano" class="news-bubble">
            <circle cx="270" cy="80" r="16" fill="#2d6a4f" opacity="0.9"/>
            <text x="270" y="85" text-anchor="middle" font-family="DM Sans,sans-serif" font-size="11" font-weight="700" fill="white" id="count-bolzano">14</text>
          </g>
          <g id="bubble-trento" class="news-bubble">
            <circle cx="290" cy="250" r="16" fill="#457b9d" opacity="0.9"/>
            <text x="290" y="255" text-anchor="middle" font-family="DM Sans,sans-serif" font-size="11" font-weight="700" fill="white" id="count-trento">11</text>
          </g>
          <g id="bubble-venosta" class="news-bubble">
            <circle cx="100" cy="72" r="12" fill="#2d6a4f" opacity="0.7"/>
            <text x="100" y="77" text-anchor="middle" font-family="DM Sans,sans-serif" font-size="9" font-weight="700" fill="white" id="count-venosta">4</text>
          </g>
        </g>

        <!-- Compass rose decorative -->
        <g transform="translate(450,60)" opacity="0.3">
          <circle cx="0" cy="0" r="18" fill="none" stroke="#1a1a2e" stroke-width="0.5"/>
          <line x1="0" y1="-14" x2="0" y2="14" stroke="#1a1a2e" stroke-width="0.8"/>
          <line x1="-14" y1="0" x2="14" y2="0" stroke="#1a1a2e" stroke-width="0.8"/>
          <text x="0" y="-17" text-anchor="middle" font-size="7" font-family="DM Sans,sans-serif" fill="#1a1a2e" font-weight="600">N</text>
        </g>

        <!-- Scale bar -->
        <g transform="translate(390,440)" opacity="0.5">
          <line x1="0" y1="0" x2="60" y2="0" stroke="#1a1a2e" stroke-width="1"/>
          <line x1="0" y1="-3" x2="0" y2="3" stroke="#1a1a2e" stroke-width="1"/>
          <line x1="60" y1="-3" x2="60" y2="3" stroke="#1a1a2e" stroke-width="1"/>
          <text x="30" y="-6" text-anchor="middle" font-size="6.5" font-family="DM Sans,sans-serif" fill="#1a1a2e">50 km</text>
        </g>

      </svg>
    </div>

    <!-- Province chips -->
    <div class="province-strip">
      <div class="province-chip" id="chip-bolzano" onclick="selectZone('bolzano')">
        <div class="chip-dot" style="background:#2d6a4f"></div>
        Alto Adige / Südtirol
      </div>
      <div class="province-chip" id="chip-trento" onclick="selectZone('trento')">
        <div class="chip-dot" style="background:#457b9d"></div>
        Provincia di Trento
      </div>
      <div class="province-chip" id="chip-venosta" onclick="selectZone('venosta')">
        <div class="chip-dot" style="background:#6aab6a"></div>
        Val Venosta
      </div>
    </div>

    <!-- Legend -->
    <div class="map-legend">
      <div class="legend-item">
        <div class="legend-swatch" style="background:#c8e6c9; border:1px solid #2d6a4f"></div>
        Alto Adige
      </div>
      <div class="legend-item">
        <div class="legend-swatch" style="background:#bbdefb; border:1px solid #457b9d"></div>
        Trentino
      </div>
      <div class="legend-item">
        <div class="legend-swatch" style="background:#2d6a4f; border-radius:50%; width:10px; height:10px"></div>
        N° notizie settimana
      </div>
    </div>
  </div>

  <!-- SIDEBAR -->
  <div class="sidebar">

    <div class="sidebar-header">
      <div class="sidebar-region-name" id="regionName">Seleziona una regione</div>
      <div class="sidebar-meta">
        <span class="count" id="newsCount">— Clicca sulla mappa</span>
      </div>
      <div class="category-pills" id="categoryPills" style="display:none">
        <div class="pill pill-politica active" onclick="filterCat('all',this)">Tutte</div>
        <div class="pill pill-politica" onclick="filterCat('politica',this)">Politica</div>
        <div class="pill pill-cronaca" onclick="filterCat('cronaca',this)">Cronaca</div>
        <div class="pill pill-cultura" onclick="filterCat('cultura',this)">Cultura</div>
        <div class="pill pill-economia" onclick="filterCat('economia',this)">Economia</div>
        <div class="pill pill-sport" onclick="filterCat('sport',this)">Sport</div>
      </div>
    </div>

    <div id="digestBanner" style="display:none">
      <div class="digest-banner">
        <div class="digest-label">✦ Sintesi IA · Settimana 23</div>
        <div class="digest-text" id="digestText"></div>
      </div>
    </div>

    <div class="news-feed" id="newsFeed">
      <div class="empty-state">
        <div class="empty-icon">🗺</div>
        <div class="empty-text">Seleziona una provincia<br>sulla mappa per vedere<br>le notizie della settimana</div>
      </div>
    </div>

    <div class="timeline">
      <span class="timeline-label">Storico</span>
      <div class="timeline-dot" title="Sett. 19" onclick="setWeek(null,19)"></div>
      <div class="timeline-dot" title="Sett. 20" onclick="setWeek(null,20)"></div>
      <div class="timeline-dot" title="Sett. 21" onclick="setWeek(null,21)"></div>
      <div class="timeline-dot" title="Sett. 22" onclick="setWeek(null,22)"></div>
      <div class="timeline-dot active" title="Sett. 23 (attuale)" onclick="setWeek(null,23)"></div>
    </div>

  </div>
</div>

<script src="data.js"></script>
<script src="script.js"></script>

</body>
</html>
