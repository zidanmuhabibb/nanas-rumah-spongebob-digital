/* ==========================================================================
   NANAS RUMAH SPONGEBOB DIGITAL - SVG MASCOTS & GRAPHICS GENERATOR
   Rich, responsive, playful vector illustrations
   ========================================================================== */

const Mascots = {
  // 🍍 Rumah Nanas (Pineapple Palace)
  getPineappleHouseSvg(width = 120, height = 140) {
    return `
      <svg width="${width}" height="${height}" viewBox="0 0 160 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Leaves on top -->
        <g id="leaves" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.15))">
          <path d="M80 50 C65 20 40 10 30 15 C38 28 55 38 70 52 Z" fill="#22c55e" />
          <path d="M80 50 C95 20 120 10 130 15 C122 28 105 38 90 52 Z" fill="#16a34a" />
          <path d="M80 48 C75 10 80 0 80 0 C85 0 90 10 85 48 Z" fill="#15803d" />
          <path d="M78 50 C50 30 45 40 40 45 C55 52 70 54 78 50 Z" fill="#4ade80" />
          <path d="M82 50 C110 30 115 40 120 45 C105 52 90 54 82 50 Z" fill="#16a34a" />
        </g>
        <!-- Pineapple Main Body -->
        <ellipse cx="80" cy="120" rx="55" ry="65" fill="url(#pineappleGrad)" stroke="#b45309" stroke-width="4"/>
        <!-- Pineapple Crosshatch Lines -->
        <g stroke="#d97706" stroke-width="2.5" opacity="0.6">
          <line x1="45" y1="80" x2="115" y2="160" />
          <line x1="30" y1="110" x2="100" y2="180" />
          <line x1="70" y1="60" x2="130" y2="130" />
          <line x1="115" y1="80" x2="45" y2="160" />
          <line x1="130" y1="110" x2="60" y2="180" />
          <line x1="90" y1="60" x2="30" y2="130" />
        </g>
        <!-- Round Porthole Window -->
        <circle cx="55" cy="105" r="14" fill="#67e8f9" stroke="#334155" stroke-width="3.5"/>
        <circle cx="55" cy="105" r="11" fill="none" stroke="#e0f2fe" stroke-width="2"/>
        <path d="M44 105 L66 105 M55 94 L55 116" stroke="#334155" stroke-width="2.5"/>
        <!-- Chimney Tube -->
        <path d="M120 100 L140 85 L145 92 L128 106 Z" fill="#64748b" stroke="#334155" stroke-width="2.5"/>
        <!-- Cozy Door -->
        <path d="M68 185 L68 150 C68 142 92 142 92 150 L92 185 Z" fill="#78350f" stroke="#451a03" stroke-width="3"/>
        <circle cx="86" cy="165" r="2.5" fill="#facc15" />
        <!-- Highlights -->
        <ellipse cx="60" cy="75" rx="8" ry="4" fill="#fef08a" opacity="0.6" transform="rotate(-20 60 75)"/>
        
        <defs>
          <radialGradient id="pineappleGrad" cx="40%" cy="35%" r="70%">
            <stop offset="0%" stop-color="#fde047" />
            <stop offset="60%" stop-color="#f59e0b" />
            <stop offset="100%" stop-color="#d97706" />
          </radialGradient>
        </defs>
      </svg>
    `;
  },

  // 🧽 Sponge Companion Mascot (Friendly helper)
  getSpongeMascotSvg(width = 110, height = 120, emotion = 'happy') {
    return `
      <svg width="${width}" height="${height}" viewBox="0 0 140 150" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Shadow -->
        <ellipse cx="70" cy="144" rx="42" ry="6" fill="rgba(0,0,0,0.15)"/>
        <!-- Legs & Shoes -->
        <path d="M52 115 L52 135 M88 115 L88 135" stroke="#f59e0b" stroke-width="5" stroke-linecap="round"/>
        <!-- Shoes -->
        <ellipse cx="48" cy="138" rx="10" ry="5" fill="#0f172a"/>
        <ellipse cx="92" cy="138" rx="10" ry="5" fill="#0f172a"/>
        <!-- Arms -->
        <path d="M22 68 C10 60 12 40 24 38 C28 50 32 60 30 72" stroke="#f59e0b" stroke-width="4.5" stroke-linecap="round" fill="none"/>
        <path d="M118 68 C130 65 132 50 128 42 C120 48 115 58 110 72" stroke="#f59e0b" stroke-width="4.5" stroke-linecap="round" fill="none"/>
        <!-- Sponge Body -->
        <rect x="25" y="20" width="90" height="82" rx="14" fill="url(#spongeGrad)" stroke="#b45309" stroke-width="4"/>
        <!-- Sponge Porous Spots -->
        <circle cx="36" cy="32" r="5" fill="#ca8a04" opacity="0.6"/>
        <circle cx="102" cy="34" r="4.5" fill="#ca8a04" opacity="0.6"/>
        <circle cx="34" cy="86" r="6" fill="#ca8a04" opacity="0.6"/>
        <circle cx="104" cy="84" r="5.5" fill="#ca8a04" opacity="0.6"/>
        <circle cx="44" cy="60" r="3.5" fill="#ca8a04" opacity="0.4"/>
        <!-- Big Cute Eyes -->
        <g id="eyes">
          <circle cx="53" cy="50" r="16" fill="#ffffff" stroke="#1e293b" stroke-width="3"/>
          <circle cx="87" cy="50" r="16" fill="#ffffff" stroke="#1e293b" stroke-width="3"/>
          <!-- Iris & Pupil -->
          <circle cx="56" cy="50" r="9" fill="#0284c7"/>
          <circle cx="84" cy="50" r="9" fill="#0284c7"/>
          <circle cx="57" cy="49" r="5.5" fill="#0f172a"/>
          <circle cx="83" cy="49" r="5.5" fill="#0f172a"/>
          <!-- Sparkles -->
          <circle cx="54" cy="46" r="2.5" fill="#ffffff"/>
          <circle cx="81" cy="46" r="2.5" fill="#ffffff"/>
          <!-- Eyelashes -->
          <line x1="43" y1="34" x2="41" y2="28" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round"/>
          <line x1="53" y1="31" x2="53" y2="24" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round"/>
          <line x1="63" y1="34" x2="65" y2="28" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round"/>
          <line x1="77" y1="34" x2="75" y2="28" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round"/>
          <line x1="87" y1="31" x2="87" y2="24" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round"/>
          <line x1="97" y1="34" x2="99" y2="28" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round"/>
        </g>
        <!-- Cute Nose -->
        <path d="M67 52 C65 58 75 58 73 52" stroke="#b45309" stroke-width="3.5" stroke-linecap="round" fill="none"/>
        <!-- Cheek Blush -->
        <circle cx="38" cy="64" r="6" fill="#f43f5e" opacity="0.35"/>
        <circle cx="102" cy="64" r="6" fill="#f43f5e" opacity="0.35"/>
        <!-- Cheerful Smile & Cute Teeth -->
        <path d="M50 68 Q70 88 90 68" stroke="#1e293b" stroke-width="3.5" stroke-linecap="round" fill="#be123c"/>
        <rect x="63" y="68" width="6" height="6" rx="1" fill="#ffffff" stroke="#1e293b" stroke-width="1.5"/>
        <rect x="71" y="68" width="6" height="6" rx="1" fill="#ffffff" stroke="#1e293b" stroke-width="1.5"/>
        <!-- Shirt & Tie Collar -->
        <path d="M26 102 L114 102 L114 115 L26 115 Z" fill="#ffffff" stroke="#334155" stroke-width="2"/>
        <path d="M70 102 L70 115 L66 110 Z" fill="#ef4444"/>
        <polygon points="66,106 74,106 70,116" fill="#dc2626"/>
        <polygon points="68,116 72,116 74,124 70,126 66,124" fill="#dc2626"/>
        <defs>
          <radialGradient id="spongeGrad" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stop-color="#fef08a" />
            <stop offset="70%" stop-color="#facc15" />
            <stop offset="100%" stop-color="#eab308" />
          </radialGradient>
        </defs>
      </svg>
    `;
  },

  // 🐧 Penguin Penjaga Bilangan (Guardian of Carry/Storage)
  getPenguinMascotSvg(width = 110, height = 120, state = 'neutral') {
    const isWaving = state === 'holding' || state === 'celebrating';
    return `
      <svg width="${width}" height="${height}" viewBox="0 0 140 150" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Soft Shadow -->
        <ellipse cx="70" cy="142" rx="38" ry="6" fill="rgba(0,0,0,0.18)"/>
        <!-- Earmuffs Top Band -->
        <path d="M40 38 C40 18 100 18 100 38" stroke="#ec4899" stroke-width="5" stroke-linecap="round" fill="none"/>
        <circle cx="38" cy="38" r="8" fill="#f43f5e" stroke="#be123c" stroke-width="2"/>
        <circle cx="102" cy="38" r="8" fill="#f43f5e" stroke="#be123c" stroke-width="2"/>
        
        <!-- Penguin Feet (Orange Flippers) -->
        <ellipse cx="52" cy="138" rx="12" ry="6" fill="#f59e0b" stroke="#d97706" stroke-width="2"/>
        <ellipse cx="88" cy="138" rx="12" ry="6" fill="#f59e0b" stroke="#d97706" stroke-width="2"/>
        
        <!-- Flippers (Wings) -->
        ${isWaving ? `
          <!-- Excited/Holding Wings Raised -->
          <path d="M34 72 C16 55 18 36 28 42 C34 50 36 65 35 78 Z" fill="#0284c7" stroke="#0369a1" stroke-width="2.5"/>
          <path d="M106 72 C124 55 122 36 112 42 C106 50 104 65 105 78 Z" fill="#0284c7" stroke="#0369a1" stroke-width="2.5"/>
        ` : `
          <!-- Rest Wings -->
          <path d="M34 72 C18 80 16 100 24 105 C30 98 34 85 36 76 Z" fill="#0284c7" stroke="#0369a1" stroke-width="2.5"/>
          <path d="M106 72 C122 80 124 100 116 105 C110 98 106 85 104 76 Z" fill="#0284c7" stroke="#0369a1" stroke-width="2.5"/>
        `}

        <!-- Penguin Body -->
        <path d="M70 28 C45 28 32 50 32 85 C32 120 48 135 70 135 C92 135 108 120 108 85 C108 50 95 28 70 28 Z" fill="#0369a1" stroke="#075985" stroke-width="3"/>
        
        <!-- White Cozy Belly -->
        <path d="M70 48 C54 48 44 65 44 92 C44 122 56 130 70 130 C84 130 96 122 96 92 C96 65 86 48 70 48 Z" fill="#f0f9ff" stroke="#bae6fd" stroke-width="2"/>
        
        <!-- Warm Scarf -->
        <path d="M42 58 C55 64 85 64 98 58 C95 68 85 70 70 70 C55 70 45 68 42 58 Z" fill="#ec4899" stroke="#be123c" stroke-width="2"/>
        <path d="M82 66 L86 86 L74 86 L78 66 Z" fill="#f43f5e" stroke="#be123c" stroke-width="2"/>
        
        <!-- Eyes -->
        <ellipse cx="58" cy="46" rx="6" ry="8" fill="#0f172a"/>
        <ellipse cx="82" cy="46" rx="6" ry="8" fill="#0f172a"/>
        <circle cx="56" cy="43" r="2.5" fill="#ffffff"/>
        <circle cx="80" cy="43" r="2.5" fill="#ffffff"/>
        
        <!-- Orange Beak -->
        <path d="M63 52 C70 49 77 49 77 52 C77 58 70 63 63 52 Z" fill="#f59e0b" stroke="#d97706" stroke-width="2"/>
        
        <!-- Cheeks -->
        <circle cx="48" cy="54" r="5" fill="#fb7185" opacity="0.5"/>
        <circle cx="92" cy="54" r="5" fill="#fb7185" opacity="0.5"/>
      </svg>
    `;
  }
};

window.Mascots = Mascots;
