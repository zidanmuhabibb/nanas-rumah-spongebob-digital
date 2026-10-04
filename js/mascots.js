/* ==========================================================================
   NANAS RUMAH SPONGEBOB DIGITAL - SVG MASCOTS & GRAPHICS GENERATOR
   Rich vector illustrations: SpongeBob, Penguin, Pineapple Houses, Corals & Fishes
   ========================================================================== */

const Mascots = {
  // 🍍 Rumah Nanas (Pineapple Palace)
  // variant: 'tens' (Orange-Kuning + Daun Hijau) | 'ones' (Pink-Cream + Daun Biru) | 'default'
  getPineappleHouseSvg(width = 140, height = 160, variant = 'tens') {
    const isTens = variant === 'tens';
    const isOnes = variant === 'ones';

    // Leaves Colors
    const leafPrimary = isTens ? '#16a34a' : (isOnes ? '#0284c7' : '#16a34a');
    const leafSecondary = isTens ? '#22c55e' : (isOnes ? '#38bdf8' : '#22c55e');
    const leafDark = isTens ? '#15803d' : (isOnes ? '#0369a1' : '#15803d');
    const leafLight = isTens ? '#4ade80' : (isOnes ? '#7dd3fc' : '#4ade80');

    // Body Gradient Colors
    const gradId = isTens ? 'pineTensGrad' : (isOnes ? 'pineOnesGrad' : 'pineDefaultGrad');
    const strokeBody = isTens ? '#b45309' : (isOnes ? '#db2777' : '#b45309');
    const hatchColor = isTens ? '#d97706' : (isOnes ? '#f472b6' : '#d97706');

    // Porthole window colors
    const windowGlass = isTens ? '#67e8f9' : '#fef08a';
    const windowFrame = isTens ? '#334155' : '#831843';

    // Door Colors
    const doorColor = isTens ? '#78350f' : '#4c1d95';
    const doorBorder = isTens ? '#451a03' : '#2e1065';
    const doorKnob = isTens ? '#facc15' : '#fbbf24';

    return `
      <svg width="${width}" height="${height}" viewBox="0 0 160 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <!-- Tens Pineapple Body Gradient (Orange - Kuning) -->
          <radialGradient id="pineTensGrad" cx="40%" cy="35%" r="70%">
            <stop offset="0%" stop-color="#fef08a" />
            <stop offset="35%" stop-color="#fde047" />
            <stop offset="70%" stop-color="#f59e0b" />
            <stop offset="100%" stop-color="#d97706" />
          </radialGradient>

          <!-- Ones Pineapple Body Gradient (Pink - Cream) -->
          <radialGradient id="pineOnesGrad" cx="40%" cy="35%" r="70%">
            <stop offset="0%" stop-color="#fff1f2" />
            <stop offset="35%" stop-color="#ffe4e6" />
            <stop offset="70%" stop-color="#fbcfe8" />
            <stop offset="100%" stop-color="#f472b6" />
          </radialGradient>

          <!-- Default Pineapple Body Gradient -->
          <radialGradient id="pineDefaultGrad" cx="40%" cy="35%" r="70%">
            <stop offset="0%" stop-color="#fde047" />
            <stop offset="60%" stop-color="#f59e0b" />
            <stop offset="100%" stop-color="#d97706" />
          </radialGradient>
        </defs>

        <!-- Leaves Crown on top -->
        <g id="leaves" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.18))">
          <path d="M80 50 C65 20 40 10 30 15 C38 28 55 38 70 52 Z" fill="${leafSecondary}" />
          <path d="M80 50 C95 20 120 10 130 15 C122 28 105 38 90 52 Z" fill="${leafPrimary}" />
          <path d="M80 48 C75 10 80 0 80 0 C85 0 90 10 85 48 Z" fill="${leafDark}" />
          <path d="M78 50 C50 30 45 40 40 45 C55 52 70 54 78 50 Z" fill="${leafLight}" />
          <path d="M82 50 C110 30 115 40 120 45 C105 52 90 54 82 50 Z" fill="${leafPrimary}" />
          <path d="M80 45 C65 25 70 12 75 12 C78 22 80 35 80 45 Z" fill="${leafLight}" opacity="0.8"/>
        </g>

        <!-- Pineapple Main Body -->
        <ellipse cx="80" cy="120" rx="56" ry="66" fill="url(#${gradId})" stroke="${strokeBody}" stroke-width="4"/>

        <!-- Pineapple Crosshatch Textures -->
        <g stroke="${hatchColor}" stroke-width="2.5" opacity="0.65">
          <line x1="45" y1="80" x2="115" y2="160" />
          <line x1="30" y1="110" x2="100" y2="180" />
          <line x1="70" y1="60" x2="130" y2="130" />
          <line x1="115" y1="80" x2="45" y2="160" />
          <line x1="130" y1="110" x2="60" y2="180" />
          <line x1="90" y1="60" x2="30" y2="130" />
        </g>

        <!-- Round Porthole Window -->
        <circle cx="55" cy="105" r="14" fill="${windowGlass}" stroke="${windowFrame}" stroke-width="3.5"/>
        <circle cx="55" cy="105" r="11" fill="none" stroke="#ffffff" stroke-width="2" opacity="0.8"/>
        <path d="M44 105 L66 105 M55 94 L55 116" stroke="${windowFrame}" stroke-width="2.5"/>

        <!-- Chimney Tube -->
        <path d="M120 100 L140 85 L145 92 L128 106 Z" fill="#64748b" stroke="#334155" stroke-width="2.5"/>

        <!-- Cozy Door -->
        <path d="M68 185 L68 150 C68 142 92 142 92 150 L92 185 Z" fill="${doorColor}" stroke="${doorBorder}" stroke-width="3"/>
        <circle cx="86" cy="165" r="2.5" fill="${doorKnob}" />

        <!-- Highlights -->
        <ellipse cx="60" cy="75" rx="8" ry="4" fill="#ffffff" opacity="0.5" transform="rotate(-20 60 75)"/>
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
  },

  // 🪸 Terumbu Karang Undersea Decorations (Left / Right Margins)
  getCoralReefSvg(side = 'left') {
    const isLeft = side === 'left';
    return `
      <svg width="180" height="260" viewBox="0 0 180 260" fill="none" xmlns="http://www.w3.org/2000/svg" class="coral-reef-svg ${isLeft ? 'coral-left' : 'coral-right'}">
        <!-- Background Kelp / Seaweeds -->
        <path d="${isLeft ? 'M20 260 Q10 180 30 130 T15 40' : 'M160 260 Q170 180 150 130 T165 40'}" stroke="#059669" stroke-width="14" stroke-linecap="round" fill="none" opacity="0.75" class="seaweed-sway-1"/>
        <path d="${isLeft ? 'M45 260 Q55 190 35 120 T50 60' : 'M135 260 Q125 190 145 120 T130 60'}" stroke="#10b981" stroke-width="12" stroke-linecap="round" fill="none" opacity="0.85" class="seaweed-sway-2"/>
        <path d="${isLeft ? 'M70 260 Q60 200 80 150 T65 90' : 'M110 260 Q120 200 100 150 T115 90'}" stroke="#34d399" stroke-width="10" stroke-linecap="round" fill="none" opacity="0.9" class="seaweed-sway-3"/>

        <!-- Coral Branches (Pink/Orange/Purple) -->
        <g class="coral-branch" filter="drop-shadow(0 4px 8px rgba(0,0,0,0.15))">
          <path d="${isLeft ? 'M10 260 C25 210 15 160 35 140 C45 130 60 140 50 165 C70 145 85 155 75 185 C95 175 105 190 90 220 L95 260 Z' : 'M170 260 C155 210 165 160 145 140 C135 130 120 140 130 165 C110 145 95 155 105 185 C85 175 75 190 90 220 L85 260 Z'}" fill="#f43f5e" stroke="#be123c" stroke-width="3"/>
          <circle cx="${isLeft ? '35' : '145'}" cy="138" r="6" fill="#fb7185"/>
          <circle cx="${isLeft ? '50' : '130'}" cy="162" r="5" fill="#fb7185"/>
          <circle cx="${isLeft ? '75' : '105'}" cy="182" r="5" fill="#fb7185"/>
        </g>

        <!-- Round Sponge Coral (Yellow/Amber) -->
        <g class="coral-tube">
          <rect x="${isLeft ? '55' : '90'}" y="190" width="22" height="70" rx="10" fill="#f59e0b" stroke="#b45309" stroke-width="2.5"/>
          <ellipse cx="${isLeft ? '66' : '101'}" cy="190" rx="11" ry="5" fill="#fde68a" stroke="#b45309" stroke-width="2"/>
          
          <rect x="${isLeft ? '80' : '65'}" y="205" width="18" height="55" rx="8" fill="#fbbf24" stroke="#d97706" stroke-width="2.5"/>
          <ellipse cx="${isLeft ? '89' : '74'}" cy="205" rx="9" ry="4" fill="#fef08a" stroke="#d97706" stroke-width="2"/>
        </g>

        <!-- Sea Anemone (Purple/Violet) -->
        <g class="anemone">
          <ellipse cx="${isLeft ? '40' : '140'}" cy="240" rx="26" ry="14" fill="#8b5cf6" stroke="#6d28d9" stroke-width="2"/>
          <path d="${isLeft ? 'M25 240 Q18 220 28 215 M32 238 Q30 215 38 210 M42 238 Q45 212 50 212 M50 238 Q58 218 60 216' : 'M155 240 Q162 220 152 215 M148 238 Q150 215 142 210 M138 238 Q135 212 130 212 M130 238 Q122 218 120 216'}" stroke="#c4b5fd" stroke-width="3" stroke-linecap="round"/>
        </g>

        <!-- Starfish on Coral -->
        <g transform="translate(${isLeft ? '30, 235' : '120, 235'}) scale(0.6)">
          <path d="M20 0 L25 15 L40 18 L28 28 L32 42 L20 33 L8 42 L12 28 L0 18 L15 15 Z" fill="#fb923c" stroke="#c2410c" stroke-width="2"/>
          <circle cx="20" cy="20" r="3" fill="#fed7aa"/>
        </g>
      </svg>
    `;
  },

  // 🐟 Cute Swimming Fish Vector
  getCuteFishSvg(color = '#38bdf8', direction = 'right') {
    const isRight = direction === 'right';
    return `
      <svg width="48" height="32" viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg" class="swimming-fish-svg ${isRight ? 'swim-right' : 'swim-left'}">
        <!-- Tail Fin -->
        <polygon points="${isRight ? '15,20 0,6 0,34' : '45,20 60,6 60,34'}" fill="${color}" stroke="#0369a1" stroke-width="2" class="fish-tail-wag"/>
        <!-- Dorsal Fin -->
        <path d="${isRight ? 'M28 10 Q35 0 44 10 Z' : 'M32 10 Q25 0 16 10 Z'}" fill="${color}" opacity="0.85"/>
        <!-- Body -->
        <ellipse cx="32" cy="20" rx="20" ry="13" fill="${color}" stroke="#0369a1" stroke-width="2.5"/>
        <!-- Belly Highlight -->
        <ellipse cx="32" cy="24" rx="14" ry="6" fill="#ffffff" opacity="0.5"/>
        <!-- Eye -->
        <circle cx="${isRight ? '42' : '22'}" cy="16" r="4.5" fill="#ffffff" stroke="#1e293b" stroke-width="1.5"/>
        <circle cx="${isRight ? '43' : '21'}" cy="16" r="2.5" fill="#0f172a"/>
        <circle cx="${isRight ? '44' : '20'}" cy="15" r="1" fill="#ffffff"/>
        <!-- Cute Smile -->
        <path d="${isRight ? 'M46 22 Q43 25 40 23' : 'M14 22 Q17 25 20 23'}" stroke="#0369a1" stroke-width="1.8" stroke-linecap="round"/>
        <!-- Pectoral Fin -->
        <ellipse cx="${isRight ? '30' : '34'}" cy="22" rx="5" ry="3" fill="#ffffff" opacity="0.75" class="fish-fin-flutter"/>
      </svg>
    `;
  },

  // 🥘 Kebudayaan & Kuliner Khas Banyumas Vector Illustrations
  getBanyumasIllustrationSvg(type = 'mendoan', width = 120, height = 95) {
    if (type === 'mendoan') {
      return `
        <svg width="${width}" height="${height}" viewBox="0 0 140 110" fill="none" xmlns="http://www.w3.org/2000/svg" class="banyumas-svg-illustration">
          <filter id="mendoanGlow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#b45309" flood-opacity="0.25"/>
          </filter>
          <!-- Plate Base -->
          <ellipse cx="70" cy="85" rx="62" ry="18" fill="#e2e8f0" stroke="#cbd5e1" stroke-width="3"/>
          <ellipse cx="70" cy="84" rx="56" ry="14" fill="#f8fafc"/>
          <ellipse cx="70" cy="84" rx="52" ry="12" fill="#84cc16" opacity="0.45"/> <!-- Banana leaf lining -->

          <!-- Tempe Mendoan Slice 1 (Bottom) -->
          <g transform="translate(18, 25) rotate(-8)" filter="url(#mendoanGlow)">
            <rect x="10" y="10" width="70" height="42" rx="8" fill="#fef08a" stroke="#d97706" stroke-width="3"/>
            <!-- Crispy Batter Crumb Highlights -->
            <path d="M14 18 Q20 12 30 18 T48 14 T65 20" stroke="#b45309" stroke-width="2" fill="none" opacity="0.6"/>
            <!-- Green Scallion Bits -->
            <rect x="22" y="20" width="7" height="4" rx="2" fill="#15803d"/>
            <rect x="42" y="16" width="6" height="4" rx="2" fill="#16a34a"/>
            <rect x="58" y="28" width="8" height="4" rx="2" fill="#15803d"/>
            <rect x="30" y="34" width="7" height="4" rx="2" fill="#16a34a"/>
          </g>

          <!-- Tempe Mendoan Slice 2 (Top Stacked) -->
          <g transform="translate(32, 18) rotate(10)" filter="url(#mendoanGlow)">
            <rect x="10" y="10" width="72" height="44" rx="8" fill="#fde047" stroke="#b45309" stroke-width="3"/>
            <rect x="14" y="14" width="64" height="36" rx="6" fill="#fef08a" opacity="0.8"/>
            <!-- Scallions -->
            <rect x="25" y="22" width="8" height="5" rx="2" fill="#15803d"/>
            <rect x="45" y="18" width="7" height="4" rx="2" fill="#16a34a"/>
            <rect x="36" y="32" width="8" height="5" rx="2" fill="#15803d"/>
            <rect x="58" y="26" width="7" height="4" rx="2" fill="#16a34a"/>
            <!-- Crispy Edge Flour -->
            <path d="M12 28 Q8 32 12 38 M78 18 Q84 24 80 32" stroke="#d97706" stroke-width="2.5" stroke-linecap="round"/>
          </g>

          <!-- Sambal Kecap Dipping Cup -->
          <ellipse cx="108" cy="68" rx="16" ry="9" fill="#334155" stroke="#0f172a" stroke-width="2"/>
          <ellipse cx="108" cy="67" rx="14" ry="7" fill="#1c1917"/>
          <ellipse cx="106" cy="66" rx="10" ry="4" fill="#09090b"/>
          <!-- Sliced Rawit in Kecap -->
          <circle cx="104" cy="66" r="2.5" fill="#ef4444"/>
          <circle cx="111" cy="67" r="2" fill="#22c55e"/>

          <!-- Fresh Green Rawit Chili -->
          <path d="M22 84 Q32 75 42 86 Q30 92 22 84 Z" fill="#22c55e" stroke="#15803d" stroke-width="2"/>
          <path d="M22 84 Q18 80 16 81" stroke="#15803d" stroke-width="2" stroke-linecap="round"/>
        </svg>
      `;
    }

    if (type === 'getuk_goreng') {
      return `
        <svg width="${width}" height="${height}" viewBox="0 0 140 110" fill="none" xmlns="http://www.w3.org/2000/svg" class="banyumas-svg-illustration">
          <!-- Woven Bamboo Besek Basket -->
          <path d="M20 55 L30 92 C32 98 108 98 110 92 L120 55 Z" fill="#fde68a" stroke="#b45309" stroke-width="3"/>
          <!-- Weave Texture -->
          <g stroke="#d97706" stroke-width="2" opacity="0.6">
            <line x1="30" y1="65" x2="110" y2="65"/>
            <line x1="32" y1="78" x2="108" y2="78"/>
            <line x1="45" y1="56" x2="40" y2="92"/>
            <line x1="65" y1="56" x2="63" y2="94"/>
            <line x1="85" y1="56" x2="87" y2="94"/>
            <line x1="105" y1="56" x2="108" y2="92"/>
          </g>

          <!-- Golden Brown Sweet Getuk Goreng Cubes Stacked -->
          <g filter="drop-shadow(0 3px 6px rgba(0,0,0,0.2))">
            <!-- Cube 1 -->
            <rect x="32" y="38" width="24" height="22" rx="5" fill="#b45309" stroke="#78350f" stroke-width="2"/>
            <rect x="34" y="40" width="20" height="18" rx="4" fill="#d97706" opacity="0.9"/>
            <ellipse cx="44" cy="46" rx="6" ry="3" fill="#fde68a" opacity="0.6"/>

            <!-- Cube 2 -->
            <rect x="58" y="34" width="26" height="24" rx="5" fill="#92400e" stroke="#78350f" stroke-width="2"/>
            <rect x="60" y="36" width="22" height="20" rx="4" fill="#b45309" opacity="0.9"/>
            <ellipse cx="71" cy="42" rx="7" ry="3" fill="#fde68a" opacity="0.5"/>

            <!-- Cube 3 -->
            <rect x="85" y="40" width="24" height="22" rx="5" fill="#b45309" stroke="#78350f" stroke-width="2"/>
            <rect x="87" y="42" width="20" height="18" rx="4" fill="#d97706" opacity="0.9"/>
            <ellipse cx="97" cy="47" rx="6" ry="3" fill="#fde68a" opacity="0.6"/>

            <!-- Top Cube 4 -->
            <rect x="48" y="18" width="26" height="24" rx="5" fill="#b45309" stroke="#78350f" stroke-width="2.5"/>
            <rect x="50" y="20" width="22" height="20" rx="4" fill="#d97706"/>
            <ellipse cx="61" cy="26" rx="7" ry="3" fill="#fef08a" opacity="0.8"/>

            <!-- Top Cube 5 -->
            <rect x="74" y="16" width="26" height="24" rx="5" fill="#92400e" stroke="#78350f" stroke-width="2.5"/>
            <rect x="76" y="18" width="22" height="20" rx="4" fill="#b45309"/>
            <ellipse cx="87" cy="24" rx="7" ry="3" fill="#fde68a" opacity="0.8"/>
          </g>

          <!-- Sweet Gula Merah Glaze Aroma Steam -->
          <path d="M60 12 Q56 4 64 0" stroke="#f59e0b" stroke-width="2" stroke-linecap="round" fill="none" opacity="0.8"/>
          <path d="M84 10 Q88 2 82 -2" stroke="#f59e0b" stroke-width="2" stroke-linecap="round" fill="none" opacity="0.8"/>
        </svg>
      `;
    }

    if (type === 'es_dawet') {
      return `
        <svg width="${width}" height="${height}" viewBox="0 0 140 110" fill="none" xmlns="http://www.w3.org/2000/svg" class="banyumas-svg-illustration">
          <!-- Tall Glass Cup -->
          <path d="M42 22 L48 85 C49 92 85 92 86 85 L92 22 Z" fill="#ffffff" opacity="0.4" stroke="#0284c7" stroke-width="2.5"/>
          
          <!-- Layer 1: Gula Jawa / Brown Sugar Syrup (Bottom) -->
          <path d="M48 85 C49 92 85 92 86 85 L87 70 C70 73 60 70 47 70 Z" fill="#78350f"/>
          
          <!-- Layer 2: Santan Kelapa / Coconut Milk Layer (Middle) -->
          <path d="M47 70 C60 70 70 73 87 70 L90 35 C75 37 55 35 44 35 Z" fill="#fefce8"/>

          <!-- Green Cendol / Dawet Droplets Floating -->
          <g fill="#16a34a" stroke="#15803d" stroke-width="1">
            <ellipse cx="58" cy="62" rx="4" ry="7" transform="rotate(25 58 62)"/>
            <ellipse cx="72" cy="58" rx="5" ry="8" transform="rotate(-15 72 58)"/>
            <ellipse cx="64" cy="48" rx="4" ry="7" transform="rotate(10 64 48)"/>
            <ellipse cx="78" cy="66" rx="4" ry="6" transform="rotate(30 78 66)"/>
            <ellipse cx="54" cy="50" rx="3.5" ry="6" transform="rotate(-20 54 50)"/>
            <ellipse cx="80" cy="46" rx="4" ry="7" transform="rotate(-10 80 46)"/>
          </g>

          <!-- Ice Cubes on Top -->
          <rect x="52" y="26" width="12" height="10" rx="2" fill="#bae6fd" stroke="#38bdf8" stroke-width="1.5" opacity="0.9"/>
          <rect x="68" y="24" width="14" height="11" rx="2" fill="#e0f2fe" stroke="#38bdf8" stroke-width="1.5" opacity="0.9"/>

          <!-- Drinking Straw -->
          <path d="M62 4 L68 28 L74 85" stroke="#ef4444" stroke-width="4" stroke-linecap="round" fill="none"/>
          <path d="M62 4 L68 28 L74 85" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-dasharray="6 6" fill="none"/>

          <!-- Durian Slice on Rim (Right) -->
          <g transform="translate(86, 15) rotate(15)">
            <path d="M0 0 C15 -10 32 0 35 18 C25 24 10 20 0 0 Z" fill="#facc15" stroke="#ca8a04" stroke-width="2"/>
            <!-- Spikes / Husk -->
            <path d="M30 4 L36 2 L33 9 L40 9 L35 15" stroke="#854d0e" stroke-width="2" fill="none"/>
            <circle cx="16" cy="10" r="5" fill="#fef08a"/>
          </g>
        </svg>
      `;
    }

    if (type === 'soto_sokaraja') {
      return `
        <svg width="${width}" height="${height}" viewBox="0 0 140 110" fill="none" xmlns="http://www.w3.org/2000/svg" class="banyumas-svg-illustration">
          <!-- Ceramic Bowl -->
          <ellipse cx="70" cy="55" rx="55" ry="20" fill="#fef08a" stroke="#ca8a04" stroke-width="2"/> <!-- Soup surface -->
          <path d="M15 55 C15 95 125 95 125 55 Z" fill="#f8fafc" stroke="#334155" stroke-width="3.5"/>
          <ellipse cx="70" cy="54" rx="52" ry="18" fill="#f59e0b" opacity="0.85"/> <!-- Rich Soto Broth -->

          <!-- Ketupat Rice Cake Slices in Soup -->
          <polygon points="38,48 48,42 56,50 46,56" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
          <polygon points="52,52 64,46 72,54 60,60" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="1.5"/>

          <!-- Shredded Chicken / Meat -->
          <path d="M68 46 Q76 40 84 48 T94 45" stroke="#78350f" stroke-width="3" fill="none"/>

          <!-- Sambal Kacang Dollop in Center -->
          <circle cx="70" cy="55" r="9" fill="#9a3412" stroke="#7c2d12" stroke-width="1.5"/>
          <circle cx="68" cy="53" r="3" fill="#ea580c"/>

          <!-- Pink Kerupuk Cantir / Kerupuk Soto -->
          <g transform="translate(85, 30) rotate(-15)">
            <path d="M0 10 C-5 0 15 -5 20 5 C28 5 25 22 15 20 C5 22 0 18 0 10 Z" fill="#f472b6" stroke="#db2777" stroke-width="2"/>
            <circle cx="8" cy="8" r="1.5" fill="#fdf2f8"/>
            <circle cx="14" cy="14" r="1.5" fill="#fdf2f8"/>
          </g>

          <!-- Green Celery Sprinkles & Fried Onions -->
          <circle cx="48" cy="50" r="2" fill="#15803d"/>
          <circle cx="82" cy="58" r="2" fill="#15803d"/>
          <circle cx="60" cy="44" r="2" fill="#78350f"/>

          <!-- Hot Steaming Waves -->
          <path d="M50 30 Q46 18 54 10" stroke="#f1f5f9" stroke-width="2.5" stroke-linecap="round" fill="none" opacity="0.8"/>
          <path d="M70 25 Q74 15 68 8" stroke="#f1f5f9" stroke-width="2.5" stroke-linecap="round" fill="none" opacity="0.8"/>
          <path d="M90 28 Q86 16 94 10" stroke="#f1f5f9" stroke-width="2.5" stroke-linecap="round" fill="none" opacity="0.8"/>
        </svg>
      `;
    }

    if (type === 'batik_banyumas') {
      return `
        <svg width="${width}" height="${height}" viewBox="0 0 140 110" fill="none" xmlns="http://www.w3.org/2000/svg" class="banyumas-svg-illustration">
          <!-- Draped Traditional Batik Cloth with Jahe Puger Motif -->
          <g filter="drop-shadow(0 4px 8px rgba(0,0,0,0.25))">
            <path d="M20 20 C40 15 80 18 115 15 L125 80 C95 85 55 80 25 85 Z" fill="#78350f" stroke="#451a03" stroke-width="3"/>
            
            <!-- Traditional Sogan & Indigo Batik Patterns -->
            <g stroke="#fef08a" stroke-width="2" fill="#b45309" opacity="0.9">
              <!-- Jahe Puger Ginger Flower Motifs -->
              <circle cx="45" cy="38" r="8"/>
              <path d="M45 26 L45 50 M33 38 L57 38"/>
              
              <circle cx="90" cy="35" r="8"/>
              <path d="M90 23 L90 47 M78 35 L102 35"/>

              <circle cx="68" cy="60" r="9"/>
              <path d="M68 47 L68 73 M55 60 L81 60"/>

              <!-- Lumbon (Taro Leaf) Swirls -->
              <path d="M30 65 Q42 55 45 68 T38 78" fill="none" stroke="#fde047" stroke-width="2.5"/>
              <path d="M95 62 Q108 52 110 65 T102 75" fill="none" stroke="#fde047" stroke-width="2.5"/>
            </g>
          </g>

          <!-- Traditional Canting Pen with Hot Golden Wax Drop -->
          <g transform="translate(85, 45) rotate(-35)">
            <rect x="0" y="8" width="48" height="6" rx="3" fill="#a16207" stroke="#713f12" stroke-width="1.5"/> <!-- Wooden handle -->
            <path d="M48 5 L60 0 L56 16 Z" fill="#d97706" stroke="#b45309" stroke-width="1.5"/> <!-- Copper wax cup -->
            <path d="M60 0 L66 -4" stroke="#ca8a04" stroke-width="2.5" stroke-linecap="round"/> <!-- Canting spout -->
            <circle cx="68" cy="-6" r="2.5" fill="#facc15"/> <!-- Golden wax droplet -->
          </g>
        </svg>
      `;
    }

    // Default fallback
    return `
      <div style="font-size:3rem; text-align:center;">🥘</div>
    `;
  }
};

window.Mascots = Mascots;

