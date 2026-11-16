/* ==========================================================================
   ODISHA SUPPLY NETWORK - INTERACTIVE SVG MAP GENERATOR
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const mapContainer = document.getElementById('odisha-map-container');
  if (!mapContainer) return;

  // Render SVG Map of Odisha with Hubs & Product Nodes
  const svgHTML = `
    <svg viewBox="0 0 600 520" class="odisha-svg-map" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <!-- Gradients & Radar Pulse Filters -->
        <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#1E222A" />
          <stop offset="100%" stop-color="#121417" />
        </linearGradient>

        <radialGradient id="rourkelaGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#D95D28" stop-opacity="0.8" />
          <stop offset="60%" stop-color="#D95D28" stop-opacity="0.2" />
          <stop offset="100%" stop-color="#D95D28" stop-opacity="0" />
        </radialGradient>

        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      <!-- Stylized Vector Outline of Odisha State Boundary -->
      <path d="M 240,40 L 290,45 L 340,65 L 380,100 L 440,120 L 480,160 L 510,210 L 490,260 L 440,300 L 410,340 L 370,390 L 320,440 L 280,480 L 240,490 L 200,460 L 160,420 L 120,380 L 80,340 L 60,290 L 70,240 L 100,190 L 140,150 L 180,110 L 210,70 Z" 
            fill="url(#mapGradient)" 
            stroke="#2C3340" 
            stroke-width="2" 
            stroke-dasharray="4 2" />

      <!-- Major Supply Corridors / Logistics Connection Lines from Rourkela -->
      <g stroke="#D95D28" stroke-width="1.5" stroke-opacity="0.4" stroke-dasharray="6 4">
        <!-- Rourkela to Jharsuguda/Sambalpur -->
        <line x1="260" y1="90" x2="200" y2="160" />
        <!-- Rourkela to Angul/Dhenkanal -->
        <line x1="260" y1="90" x2="310" y2="230" />
        <!-- Rourkela to Jajpur/Cuttack -->
        <line x1="260" y1="90" x2="390" y2="280" />
        <!-- Rourkela to Paradeep Coast -->
        <line x1="260" y1="90" x2="450" y2="290" />
        <!-- Rourkela to South Odisha -->
        <line x1="260" y1="90" x2="210" y2="360" />
      </g>

      <!-- Hub 01: ROURKELA / SUNDARGARH (PRIMARY HEADQUARTERS & MANUFACTURING HUB) -->
      <g class="map-hub-group" transform="translate(260, 90)" filter="url(#glow)">
        <!-- Animated Pulsing Waves -->
        <circle cx="0" cy="0" r="28" fill="url(#rourkelaGlow)">
          <animate attributeName="r" values="16;34;16" dur="3s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.8;0.2;0.8" dur="3s" repeatCount="indefinite"/>
        </circle>
        <circle cx="0" cy="0" r="10" fill="#D95D28" />
        <circle cx="0" cy="0" r="4" fill="#FFFFFF" />
        <text x="16" y="4" class="map-label" fill="#FFFFFF" font-size="13" font-weight="700">ROURKELA / SUNDARGARH</text>
        <text x="16" y="18" fill="#D95D28" font-size="9" font-weight="700" letter-spacing="1">PRIMARY MANUFACTURING HUB</text>
      </g>

      <!-- Distribution Network Nodes Across Odisha -->
      <!-- Node: Northern Minerals Belt -->
      <g class="map-node-group" transform="translate(200, 160)">
        <circle cx="0" cy="0" r="6" class="map-node" fill="#8590A0" />
        <text x="10" y="4" fill="#A0ABC0" font-size="10" font-weight="600">Western Supply Zone</text>
      </g>

      <!-- Node: Central Industrial Belt (Angul / Dhenkanal) -->
      <g class="map-node-group" transform="translate(310, 230)">
        <circle cx="0" cy="0" r="6" class="map-node" fill="#8590A0" />
        <text x="10" y="4" fill="#A0ABC0" font-size="10" font-weight="600">Central Odisha Zone</text>
      </g>

      <!-- Node: Coastal & Port Corridor -->
      <g class="map-node-group" transform="translate(390, 280)">
        <circle cx="0" cy="0" r="6" class="map-node" fill="#8590A0" />
        <text x="10" y="4" fill="#A0ABC0" font-size="10" font-weight="600">Coastal Supply Zone</text>
      </g>

      <!-- Center Watermark Overlay -->
      <text x="300" y="270" text-anchor="middle" fill="#FFFFFF" fill-opacity="0.04" font-family="'Space Grotesk', sans-serif" font-size="54" font-weight="700" letter-spacing="10">ODISHA</text>

      <!-- Division Legend Pill Overlay -->
      <g transform="translate(30, 430)">
        <rect x="0" y="0" width="540" height="60" rx="8" fill="#15181E" stroke="#2C3340" stroke-width="1"/>
        
        <circle cx="30" cy="30" r="5" fill="#D95D28"/>
        <text x="44" y="34" fill="#FFFFFF" font-size="11" font-weight="700" font-family="'Space Grotesk', sans-serif">MINERALS</text>

        <circle cx="180" cy="30" r="5" fill="#D95D28"/>
        <text x="194" y="34" fill="#FFFFFF" font-size="11" font-weight="700" font-family="'Space Grotesk', sans-serif">DURASTRONG CEMENT</text>

        <circle cx="380" cy="30" r="5" fill="#D95D28"/>
        <text x="394" y="34" fill="#FFFFFF" font-size="11" font-weight="700" font-family="'Space Grotesk', sans-serif">BUILDING MATERIALS</text>
      </g>
    </svg>
  `;

  mapContainer.innerHTML = svgHTML;
});
