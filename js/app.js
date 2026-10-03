/* ==========================================================================
   NANAS RUMAH SPONGEBOB DIGITAL (NRSD)
   Core Application Engine & Pedagogical State Machine
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize SVG Mascots
  initMascots();
  initBubbles();

  // Instantiate Application
  window.app = new NRSDApp();
});

// Render dynamic SVGs
function initMascots() {
  const splashSponge = document.getElementById('splashSponge');
  if (splashSponge) splashSponge.innerHTML = Mascots.getSpongeMascotSvg(120, 130);

  const splashPenguin = document.getElementById('splashPenguin');
  if (splashPenguin) splashPenguin.innerHTML = Mascots.getPenguinMascotSvg(120, 130, 'waving');

  const homeSponge = document.getElementById('homeSpongeContainer');
  if (homeSponge) homeSponge.innerHTML = Mascots.getSpongeMascotSvg(130, 140);

  const homePenguin = document.getElementById('homePenguinContainer');
  if (homePenguin) homePenguin.innerHTML = Mascots.getPenguinMascotSvg(110, 120, 'neutral');

  const wsSponge = document.getElementById('wsSpongeAvatar');
  if (wsSponge) wsSponge.innerHTML = Mascots.getSpongeMascotSvg(55, 60);

  const wsPenguin = document.getElementById('wsPenguinContainer');
  if (wsPenguin) wsPenguin.innerHTML = Mascots.getPenguinMascotSvg(120, 130, 'neutral');
}

// Background animated bubbles
function initBubbles() {
  const container = document.getElementById('bubbleContainer');
  if (!container) return;

  const bubbleCount = 15;
  for (let i = 0; i < bubbleCount; i++) {
    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    const size = Math.random() * 30 + 15;
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    bubble.style.left = `${Math.random() * 95}%`;
    bubble.style.animationDuration = `${Math.random() * 8 + 6}s`;
    bubble.style.animationDelay = `${Math.random() * 5}s`;
    container.appendChild(bubble);
  }
}

/* ==========================================================================
   NRSD APPLICATION CLASS
   ========================================================================== */
class NRSDApp {
  constructor() {
    // Application Modes: 'belajar' | 'latihan' | 'tantangan' | 'guru'
    this.currentMode = 'belajar';
    this.currentScreen = 'screen-splash';

    // Problem State
    this.numA = 27;
    this.numB = 18;
    this.tensA = 2;
    this.onesA = 7;
    this.tensB = 1;
    this.onesB = 8;
    this.onesSum = 15;
    this.carryDigit = 1;
    this.onesDigit = 5;
    this.tensSum = 4;
    this.finalResult = 45;

    // Challenge Mode State
    this.challengeIndex = 0;
    this.challengeScore = 0;
    this.challengeQuestions = [
      { a: 27, b: 18 },
      { a: 38, b: 27 },
      { a: 46, b: 17 },
      { a: 58, b: 24 },
      { a: 67, b: 15 }
    ];

    // Practice Mode Questions
    this.practiceIndex = 0;
    this.practiceQuestions = [
      { a: 23, b: 19 },
      { a: 34, b: 28 },
      { a: 46, b: 17 },
      { a: 58, b: 24 },
      { a: 67, b: 15 }
    ];

    // Interaction Settings
    this.interactionMode = 'hybrid'; // 'hybrid' allows both Drag and Click-to-Move
    this.selectedBall = null;
    this.autoHintEnabled = true;
    this.currentHintLevel = 1;

    // Pedagogical Phase:
    // 'ONES_INPUT' -> 'ONES_SPLIT_CHOICE' -> 'MOVE_TO_PENGUIN' -> 'MOVE_TO_CARRY' -> 'TENS_INPUT' -> 'COMPLETED'
    this.phase = 'ONES_INPUT';

    // Keypad Input Buffer
    this.keypadBuffer = '';

    // Undo History Stack
    this.history = [];

    // Diagnostics Counter
    this.diagnostics = {
      placeValue: true,
      onesAddition: true,
      splitCarry: true,
      moveToPenguin: true,
      moveToCarrySlot: true,
      tensAddition: true
    };

    // Initialize Event Listeners
    this.bindEvents();
    this.bindDragAndDrop();
    this.bindKeypad();
  }

  /* ==========================================================================
     NAVIGATION & SCREEN SWITCHING
     ========================================================================== */
  showScreen(screenId) {
    document.querySelectorAll('.view-screen').forEach(s => s.classList.remove('active'));
    const target = document.getElementById(screenId);
    if (target) {
      target.classList.add('active');
      this.currentScreen = screenId;
    }
  }

  setMode(mode) {
    this.currentMode = mode;
    const modeBadge = document.getElementById('headerModeBadge');
    const modeIcon = document.getElementById('headerModeIcon');
    const modeText = document.getElementById('headerModeText');
    const problemCounter = document.getElementById('wsProblemCounter');

    if (mode === 'belajar') {
      if (modeIcon) modeIcon.textContent = '📚';
      if (modeText) modeText.textContent = 'Mode Belajar';
      if (problemCounter) problemCounter.style.display = 'none';
    } else if (mode === 'latihan') {
      if (modeIcon) modeIcon.textContent = '🎮';
      if (modeText) modeText.textContent = 'Mode Latihan';
      if (problemCounter) {
        problemCounter.style.display = 'block';
        problemCounter.textContent = `Soal ${this.practiceIndex + 1} / ${this.practiceQuestions.length}`;
      }
    } else if (mode === 'tantangan') {
      if (modeIcon) modeIcon.textContent = '🏆';
      if (modeText) modeText.textContent = 'Mode Tantangan';
      if (problemCounter) {
        problemCounter.style.display = 'block';
        problemCounter.textContent = `Tantangan ${this.challengeIndex + 1} / ${this.challengeQuestions.length}`;
      }
    } else if (mode === 'guru') {
      if (modeIcon) modeIcon.textContent = '👩‍🏫';
      if (modeText) modeText.textContent = 'Mode Guru';
      if (problemCounter) problemCounter.style.display = 'none';
    }
  }

  /* ==========================================================================
     BIND MAIN UI EVENT LISTENERS
     ========================================================================== */
  bindEvents() {
    // Header Actions
    document.getElementById('btnHeaderHome')?.addEventListener('click', () => {
      window.soundEngine.playPop();
      this.showScreen('screen-home');
    });

    const btnSound = document.getElementById('btnToggleSound');
    if (btnSound) {
      btnSound.addEventListener('click', () => {
        const isActive = btnSound.classList.toggle('active');
        window.soundEngine.setSoundEnabled(isActive);
        btnSound.setAttribute('data-tooltip', isActive ? 'Suara Efek (Aktif)' : 'Suara Efek (Mati)');
      });
      btnSound.classList.add('active');
    }

    const btnVoice = document.getElementById('btnToggleVoice');
    if (btnVoice) {
      btnVoice.addEventListener('click', () => {
        const isActive = btnVoice.classList.toggle('active');
        window.soundEngine.setVoiceEnabled(isActive);
        btnVoice.setAttribute('data-tooltip', isActive ? 'Suara Narasi (Aktif)' : 'Suara Narasi (Mati)');
      });
      btnVoice.classList.add('active');
    }

    document.getElementById('btnHeaderGuide')?.addEventListener('click', () => {
      window.soundEngine.playPop();
      this.showScreen('screen-guide');
    });

    document.getElementById('btnHeaderTeacher')?.addEventListener('click', () => {
      window.soundEngine.playPop();
      this.showScreen('screen-teacher');
    });

    // Screen 1: Splash
    document.getElementById('btnSplashStart')?.addEventListener('click', () => {
      window.soundEngine.playPop();
      this.showScreen('screen-home');
    });

    // Screen 2: Home Menu
    document.getElementById('btnHomeLearn')?.addEventListener('click', () => {
      window.soundEngine.playPop();
      this.setMode('belajar');
      this.startProblem(27, 18);
      this.showScreen('screen-workspace');
    });

    document.getElementById('btnHomePractice')?.addEventListener('click', () => {
      window.soundEngine.playPop();
      this.setMode('latihan');
      this.practiceIndex = 0;
      const q = this.practiceQuestions[0];
      this.startProblem(q.a, q.b);
      this.showScreen('screen-workspace');
    });

    document.getElementById('btnHomeChallenge')?.addEventListener('click', () => {
      window.soundEngine.playPop();
      this.setMode('tantangan');
      this.challengeIndex = 0;
      this.challengeScore = 0;
      const q = this.challengeQuestions[0];
      this.startProblem(q.a, q.b);
      this.showScreen('screen-workspace');
    });

    document.getElementById('btnHomeGuide')?.addEventListener('click', () => {
      window.soundEngine.playPop();
      this.showScreen('screen-guide');
    });

    document.getElementById('btnHomeTeacher')?.addEventListener('click', () => {
      window.soundEngine.playPop();
      this.setMode('guru');
      this.showScreen('screen-teacher');
    });

    // Screen 3: Guide Actions
    document.getElementById('btnGuideBack')?.addEventListener('click', () => {
      window.soundEngine.playPop();
      this.showScreen('screen-home');
    });

    document.getElementById('btnGuideToWorkspace')?.addEventListener('click', () => {
      window.soundEngine.playPop();
      this.setMode('belajar');
      this.startProblem(27, 18);
      this.showScreen('screen-workspace');
    });

    // Screen 4: Modes
    document.getElementById('btnModesBack')?.addEventListener('click', () => {
      window.soundEngine.playPop();
      this.showScreen('screen-home');
    });

    document.getElementById('cardModeBelajar')?.addEventListener('click', () => {
      window.soundEngine.playPop();
      this.setMode('belajar');
      this.startProblem(27, 18);
      this.showScreen('screen-workspace');
    });

    document.getElementById('cardModeLatihan')?.addEventListener('click', () => {
      window.soundEngine.playPop();
      this.setMode('latihan');
      this.practiceIndex = 0;
      const q = this.practiceQuestions[0];
      this.startProblem(q.a, q.b);
      this.showScreen('screen-workspace');
    });

    document.getElementById('cardModeTantangan')?.addEventListener('click', () => {
      window.soundEngine.playPop();
      this.setMode('tantangan');
      this.challengeIndex = 0;
      this.challengeScore = 0;
      const q = this.challengeQuestions[0];
      this.startProblem(q.a, q.b);
      this.showScreen('screen-workspace');
    });

    document.getElementById('cardModeGuru')?.addEventListener('click', () => {
      window.soundEngine.playPop();
      this.setMode('guru');
      this.showScreen('screen-teacher');
    });

    // Screen 5: Bottom Workspace Controls (PRD Section 15 & 49)
    document.getElementById('btnHelp')?.addEventListener('click', () => {
      this.showTieredHint();
    });

    document.getElementById('btnDemoStep')?.addEventListener('click', () => {
      this.showDemoAction();
    });

    document.getElementById('btnUndo')?.addEventListener('click', () => {
      this.performUndo();
    });

    document.getElementById('btnReset')?.addEventListener('click', () => {
      window.soundEngine.playPop();
      this.startProblem(this.numA, this.numB);
      this.showToast('Workspace berhasil di-reset ke kondisi awal.', 'info');
    });

    document.getElementById('btnCheckAction')?.addEventListener('click', () => {
      this.handleCheckButton();
    });

    // Screen 6: Teacher Panel Actions
    document.getElementById('btnTeacherBack')?.addEventListener('click', () => {
      window.soundEngine.playPop();
      this.showScreen('screen-home');
    });

    document.getElementById('btnApplyTeacherProblem')?.addEventListener('click', () => {
      const n1 = parseInt(document.getElementById('teacherNum1')?.value || '27', 10);
      const n2 = parseInt(document.getElementById('teacherNum2')?.value || '18', 10);
      if (isNaN(n1) || isNaN(n2) || n1 < 0 || n2 < 0 || n1 > 99 || n2 > 99) {
        alert('Masukkan bilangan valid antara 0 sampai 99');
        return;
      }
      window.soundEngine.playPop();
      this.setMode('guru');
      this.startProblem(n1, n2);
      this.showScreen('screen-workspace');
    });

    // Teacher Preset Pills
    document.querySelectorAll('.preset-pill-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const n1 = e.currentTarget.getAttribute('data-n1');
        const n2 = e.currentTarget.getAttribute('data-n2');
        if (n1 && n2) {
          const input1 = document.getElementById('teacherNum1');
          const input2 = document.getElementById('teacherNum2');
          if (input1) input1.value = n1;
          if (input2) input2.value = n2;
          window.soundEngine.playPop();
        }
      });
    });

    // Printable Worksheet Generator
    document.getElementById('btnPrintWorksheet')?.addEventListener('click', () => {
      window.print();
    });

    // Modals Close
    document.getElementById('btnModalClose')?.addEventListener('click', () => {
      document.getElementById('modalResultSummary')?.classList.remove('active');
    });

    document.getElementById('btnModalNext')?.addEventListener('click', () => {
      document.getElementById('modalResultSummary')?.classList.remove('active');
      this.advanceToNextProblem();
    });

    document.getElementById('btnModalHintClose')?.addEventListener('click', () => {
      document.getElementById('modalHintDialog')?.classList.remove('active');
    });

    // Challenge Complete Buttons
    document.getElementById('btnChallengeHome')?.addEventListener('click', () => {
      window.soundEngine.playPop();
      this.showScreen('screen-home');
    });

    document.getElementById('btnChallengeRetry')?.addEventListener('click', () => {
      window.soundEngine.playPop();
      this.setMode('tantangan');
      this.challengeIndex = 0;
      this.challengeScore = 0;
      const q = this.challengeQuestions[0];
      this.startProblem(q.a, q.b);
      this.showScreen('screen-workspace');
    });
  }

  /* ==========================================================================
     DIGITAL KEYPAD HANDLER
     ========================================================================== */
  bindKeypad() {
    const keys = document.querySelectorAll('.key-btn');
    const display = document.getElementById('keypadDisplay');

    keys.forEach(key => {
      key.addEventListener('click', () => {
        const val = key.getAttribute('data-key');
        window.soundEngine.playKeyClick();

        if (val === 'clear') {
          this.keypadBuffer = '';
        } else if (val === 'backspace') {
          this.keypadBuffer = this.keypadBuffer.slice(0, -1);
        } else if (val === 'enter') {
          this.submitKeypadAnswer();
          return;
        } else if (this.keypadBuffer.length < 3) {
          this.keypadBuffer += val;
        }

        if (display) {
          display.textContent = this.keypadBuffer || '__';
        }
      });
    });
  }

  /* ==========================================================================
     START & CONFIGURE PROBLEM WORKSPACE
     ========================================================================== */
  startProblem(numA, numB) {
    this.numA = numA;
    this.numB = numB;
    this.tensA = Math.floor(numA / 10);
    this.onesA = numA % 10;
    this.tensB = Math.floor(numB / 10);
    this.onesB = numB % 10;

    this.onesSum = this.onesA + this.onesB;
    this.carryDigit = Math.floor(this.onesSum / 10);
    this.onesDigit = this.onesSum % 10;
    this.tensSum = this.carryDigit + this.tensA + this.tensB;
    this.finalResult = numA + numB;

    this.history = [];
    this.updateUndoButton();
    this.currentHintLevel = 1;
    this.updateHintBadge();

    // Reset UI Elements
    const probDisplay = document.getElementById('wsProblemDisplay');
    if (probDisplay) probDisplay.textContent = `${numA} + ${numB} = ?`;

    // Algorithm box elements
    const algoTens1 = document.getElementById('algoTens1');
    const algoOnes1 = document.getElementById('algoOnes1');
    const algoTens2 = document.getElementById('algoTens2');
    const algoOnes2 = document.getElementById('algoOnes2');
    const algoCarryVal = document.getElementById('algoCarryVal');
    const algoCarrySlot = document.getElementById('algoCarrySlot');
    const algoResultTens = document.getElementById('algoResultTens');
    const algoResultOnes = document.getElementById('algoResultOnes');

    if (algoTens1) algoTens1.textContent = this.tensA;
    if (algoOnes1) algoOnes1.textContent = this.onesA;
    if (algoTens2) algoTens2.textContent = this.tensB;
    if (algoOnes2) algoOnes2.textContent = this.onesB;
    if (algoCarryVal) algoCarryVal.textContent = '';
    if (algoCarrySlot) {
      algoCarrySlot.classList.remove('filled', 'highlight-target');
      algoCarrySlot.style.borderColor = '';
    }
    if (algoResultTens) {
      algoResultTens.textContent = '';
      algoResultTens.classList.remove('filled');
    }
    if (algoResultOnes) {
      algoResultOnes.textContent = '';
      algoResultOnes.classList.remove('filled');
    }

    // Workspace Tokens
    const ballTensA = document.getElementById('ballTensA');
    const ballTensB = document.getElementById('ballTensB');
    const ballOnesA = document.getElementById('ballOnesA');
    const ballOnesB = document.getElementById('ballOnesB');

    if (ballTensA) ballTensA.textContent = this.tensA;
    if (ballTensB) ballTensB.textContent = this.tensB;
    if (ballOnesA) ballOnesA.textContent = this.onesA;
    if (ballOnesB) ballOnesB.textContent = this.onesB;

    // Clear Workspace Result and Carry Slots
    const wsCarrySlot = document.getElementById('wsCarryDropSlot');
    const wsResultTens = document.getElementById('wsResultTensSlot');
    const wsResultOnes = document.getElementById('wsResultOnesSlot');
    const penguinSlot = document.getElementById('penguinDropSlot');
    const penguinNest = document.getElementById('penguinStorageNest');

    if (wsCarrySlot) wsCarrySlot.innerHTML = '';
    if (wsResultTens) wsResultTens.innerHTML = '';
    if (wsResultOnes) wsResultOnes.innerHTML = '';
    if (penguinSlot) penguinSlot.innerHTML = '';
    if (penguinNest) penguinNest.classList.remove('has-stored-ball', 'highlight-target');

    // Reset Jalur Simpan
    const pipe = document.getElementById('jalurSimpanPipe');
    if (pipe) pipe.classList.remove('pipe-active');

    // Reset Ones Calculation Area
    const onesFormula = document.getElementById('onesCalcFormula');
    if (onesFormula) onesFormula.textContent = `${this.onesA} + ${this.onesB} = ?`;

    const splitContainer = document.getElementById('splitTokensContainer');
    if (splitContainer) {
      splitContainer.innerHTML = `<span style="font-size:0.85rem; color:#94a3b8; font-weight:600;">Masukkan hasil pada keypad ➜</span>`;
    }

    const splitBox = document.getElementById('splitQuestionsBox');
    if (splitBox) splitBox.style.display = 'none';

    // Keypad Reset
    this.keypadBuffer = '';
    const keyDisplay = document.getElementById('keypadDisplay');
    const keyPrompt = document.getElementById('keypadPrompt');
    if (keyDisplay) keyDisplay.textContent = '__';
    if (keyPrompt) keyPrompt.textContent = 'Ketik Hasil Satuan:';

    // Reset Penguin
    this.setPenguinSpeech('“Aku siap menjaga angka simpanmu!”');
    const penguinContainer = document.getElementById('wsPenguinContainer');
    if (penguinContainer) penguinContainer.innerHTML = Mascots.getPenguinMascotSvg(100, 105, 'neutral');

    // Set initial phase
    this.setPhase('ONES_INPUT');
  }

  /* ==========================================================================
     PHASE CONTROLLER & PEDAGOGICAL GUIDANCE (PRD Section 35 & 53)
     ========================================================================== */
  setPhase(phase) {
    this.phase = phase;
    const instructionText = document.getElementById('wsInstructionText');
    const phasePill = document.getElementById('wsPhasePill');
    const spongeSpeech = document.getElementById('wsSpongeSpeech');
    const btnCheckText = document.getElementById('btnCheckText');
    const keypadCard = document.getElementById('wsKeypadCard');

    // Clear highlights
    this.clearAllDropHighlights();

    if (phase === 'ONES_INPUT') {
      if (phasePill) phasePill.textContent = 'Tahap 1: Hitung Satuan';
      const prompt = `Hitung angka satuan: ${this.onesA} + ${this.onesB} = ? Masukkan di keypad!`;
      if (instructionText) instructionText.textContent = prompt;
      if (spongeSpeech) spongeSpeech.innerHTML = `Mulai dari kolom Satuan ya! Berapa hasil dari <strong>${this.onesA} + ${this.onesB}</strong>?`;
      if (btnCheckText) btnCheckText.textContent = 'KIRIM HASIL';
      if (keypadCard) keypadCard.style.opacity = '1';
      window.soundEngine.speak(`Hitung angka satuan: ${this.onesA} ditambah ${this.onesB}`);
    } 
    else if (phase === 'ONES_SPLIT_CHOICE') {
      if (phasePill) phasePill.textContent = 'Tahap 2: Pisahkan Hasil Satuan';
      const prompt = `Hasilnya ${this.onesSum}: Pindahkan ${this.onesDigit} ke Hasil Satuan, dan simpan ${this.carryDigit} ke Penguin!`;
      if (instructionText) instructionText.textContent = prompt;
      if (spongeSpeech) spongeSpeech.innerHTML = `Hasilnya <strong>${this.onesSum}</strong>! Letakkan angka <strong>${this.onesDigit}</strong> di Hasil Satuan, dan simpan <strong>${this.carryDigit}</strong> ke Sarang Penguin di tengah!`;
      if (btnCheckText) btnCheckText.textContent = 'CEK LANGKAH';
      if (keypadCard) keypadCard.style.opacity = '0.5';

      // Highlight targets
      this.highlightValidTarget('result-ones');
      this.highlightValidTarget('penguin-nest');
      window.soundEngine.speak(`Pisahkan angka satuan dan angka simpan`);
    }
    else if (phase === 'MOVE_TO_PENGUIN') {
      if (phasePill) phasePill.textContent = 'Tahap 3: Simpan ke Penguin';
      const prompt = `Bawa angka ${this.carryDigit} ke Sarang Penguin di tengah Jalur Simpan!`;
      if (instructionText) instructionText.textContent = prompt;
      if (spongeSpeech) spongeSpeech.innerHTML = `Sekarang simpan angka <strong>${this.carryDigit}</strong> ke Sarang Penguin di tengah!`;
      
      this.highlightValidTarget('penguin-nest');
      this.setPenguinSpeech(`“Oper angka ${this.carryDigit} ke sini, biar aku antar ke Puluhan!”`);
      window.soundEngine.speak(`Simpan angka ${this.carryDigit} ke Penguin`);
    }
    else if (phase === 'MOVE_TO_ONES_RESULT') {
      if (phasePill) phasePill.textContent = 'Tahap 3: Tempatkan Satuan';
      const prompt = `Pindahkan angka satuan (${this.onesDigit}) ke kotak HASIL SATUAN!`;
      if (instructionText) instructionText.textContent = prompt;
      if (spongeSpeech) spongeSpeech.innerHTML = `Bagus! Sekarang letakkan angka <strong>${this.onesDigit}</strong> di Hasil Satuan.`;
      
      this.highlightValidTarget('result-ones');
      window.soundEngine.speak(`Pindahkan angka ${this.onesDigit} ke hasil satuan`);
    }
    else if (phase === 'TENS_INPUT') {
      if (phasePill) phasePill.textContent = 'Tahap 4: Jumlahkan Puluhan';
      const prompt = `Jumlahkan semua puluhan: ${this.carryDigit > 0 ? this.carryDigit + ' (simpan) + ' : ''}${this.tensA} + ${this.tensB} = ?`;
      if (instructionText) instructionText.textContent = prompt;
      if (spongeSpeech) spongeSpeech.innerHTML = `Angka simpan sudah siap di atas Puluhan! Sekarang hitung: <strong>${this.carryDigit > 0 ? this.carryDigit + ' + ' : ''}${this.tensA} + ${this.tensB}</strong> di keypad!`;
      if (keypadCard) keypadCard.style.opacity = '1';
      
      const keyPrompt = document.getElementById('keypadPrompt');
      if (keyPrompt) keyPrompt.textContent = 'Ketik Hasil Puluhan:';

      const keyDisplay = document.getElementById('keypadDisplay');
      if (keyDisplay) keyDisplay.textContent = '__';
      this.keypadBuffer = '';

      window.soundEngine.speak(`Sekarang hitung kolom puluhan`);
    }
    else if (phase === 'COMPLETED') {
      if (phasePill) phasePill.textContent = 'Selesai: Sempurna! 🎉';
      if (instructionText) instructionText.textContent = `Hebat! ${this.numA} + ${this.numB} = ${this.finalResult}`;
      if (spongeSpeech) spongeSpeech.innerHTML = `Luar biasa! Kamu berhasil menemukan hasilnya yaitu <strong>${this.finalResult}</strong>!`;
      if (btnCheckText) btnCheckText.textContent = 'LIHAT RINGKASAN';

      this.triggerSuccessCelebration();
    }
  }

  /* ==========================================================================
     SUBMIT KEYPAD ANSWER & VALIDATION
     ========================================================================== */
  submitKeypadAnswer() {
    const val = parseInt(this.keypadBuffer, 10);
    if (isNaN(val)) {
      this.showToast('Ketik angka terlebih dahulu pada keypad!', 'warning');
      window.soundEngine.playErrorBounce();
      return;
    }

    // Step 1: Ones Input
    if (this.phase === 'ONES_INPUT') {
      if (val === this.onesSum) {
        this.saveHistorySnapshot();
        window.soundEngine.playPop();
        this.keypadBuffer = '';

        if (this.carryDigit === 0) {
          // No carry needed (e.g. 3 + 4 = 7)
          this.placeOnesResultBall(this.onesDigit);
          this.showToast(`Bagus sekali! ${this.onesA} + ${this.onesB} = ${this.onesDigit}`, 'success');
          this.setPhase('TENS_INPUT');
        } else {
          // Carry needed! Generate Split Tokens (🔵1 & 🔵5) - PRD Section 24
          this.renderSplitTokens(this.carryDigit, this.onesDigit);
          this.showToast(`Tepat! ${this.onesA} + ${this.onesB} = ${this.onesSum}. Pisahkan angka satuan dan angka simpan.`, 'success');
          this.setPhase('ONES_SPLIT_CHOICE');
        }
      } else {
        window.soundEngine.playErrorBounce();
        this.showToast(`Belum tepat. Coba hitung lagi: ${this.onesA} + ${this.onesB}`, 'error');
        this.keypadBuffer = '';
        const keyDisplay = document.getElementById('keypadDisplay');
        if (keyDisplay) keyDisplay.textContent = '__';
      }
    }
    // Step 4: Tens Input
    else if (this.phase === 'TENS_INPUT') {
      if (val === this.tensSum) {
        this.saveHistorySnapshot();
        window.soundEngine.playPop();
        this.keypadBuffer = '';
        this.placeTensResultBall(this.tensSum);
        this.setPhase('COMPLETED');
      } else {
        window.soundEngine.playErrorBounce();
        const calculationFormula = this.carryDigit > 0 
          ? `${this.carryDigit} (simpan) + ${this.tensA} + ${this.tensB}`
          : `${this.tensA} + ${this.tensB}`;
        this.showToast(`Belum tepat. Hitung: ${calculationFormula}`, 'error');
        this.keypadBuffer = '';
        const keyDisplay = document.getElementById('keypadDisplay');
        if (keyDisplay) keyDisplay.textContent = '__';
      }
    }
  }

  /* ==========================================================================
     RENDER SPLIT TOKENS (PRD Section 24)
     ========================================================================== */
  renderSplitTokens(carry, ones) {
    const container = document.getElementById('splitTokensContainer');
    if (!container) return;

    container.innerHTML = `
      <div style="display:flex; align-items:center; gap:16px;">
        <div class="digit-ball digit-ball-carry" id="splitBallCarry" data-digit="${carry}" data-type="carry" title="Digit Puluhan Simpan: ${carry} (Simpan ke Penguin)">
          ${carry}
        </div>
        <div class="digit-ball digit-ball-amber" id="splitBallOnes" data-digit="${ones}" data-type="ones" title="Digit Satuan: ${ones} (Tetap di Satuan)">
          ${ones}
        </div>
      </div>
    `;

    // Bind click / drag to split tokens
    this.bindTokenInteractivity(document.getElementById('splitBallCarry'));
    this.bindTokenInteractivity(document.getElementById('splitBallOnes'));
  }

  /* ==========================================================================
     DRAG AND DROP & CLICK-TO-MOVE ENGINE (PRD Section 20, 21, 22)
     ========================================================================== */
  bindDragAndDrop() {
    window.addEventListener('pointerup', (e) => this.handlePointerUp(e));
    window.addEventListener('pointermove', (e) => this.handlePointerMove(e));
  }

  bindTokenInteractivity(tokenElem) {
    if (!tokenElem) return;

    tokenElem.addEventListener('pointerdown', (e) => {
      this.handlePointerDown(e, tokenElem);
    });

    tokenElem.addEventListener('click', (e) => {
      this.handleTokenClick(e, tokenElem);
    });
  }

  handleTokenClick(e, tokenElem) {
    e.stopPropagation();
    window.soundEngine.playPop();

    // If clicking already selected ball, deselect
    if (this.selectedBall === tokenElem) {
      tokenElem.classList.remove('selected', 'click-move-active-ball');
      this.selectedBall = null;
      this.clearAllDropHighlights();
      if (this.phase === 'ONES_SPLIT_CHOICE') {
        this.highlightValidTarget('result-ones');
        this.highlightValidTarget('penguin-nest');
      }
      return;
    }

    // Select token
    if (this.selectedBall) {
      this.selectedBall.classList.remove('selected', 'click-move-active-ball');
    }

    this.selectedBall = tokenElem;
    tokenElem.classList.add('selected', 'click-move-active-ball');

    const tokenType = tokenElem.getAttribute('data-type');
    if (tokenType === 'ones') {
      this.highlightValidTarget('result-ones', true);
    } else if (tokenType === 'carry') {
      this.highlightValidTarget('penguin-nest', true);
    }
  }

  handlePointerDown(e, tokenElem) {
    if (e.button !== 0) return;
    this.isDragging = true;
    this.draggedElem = tokenElem;
    this.dragStartX = e.clientX;
    this.dragStartY = e.clientY;

    tokenElem.setPointerCapture(e.pointerId);
    tokenElem.classList.add('dragging');
    window.soundEngine.playPop();
  }

  handlePointerMove(e) {
    if (!this.isDragging || !this.draggedElem) return;
    const dx = e.clientX - this.dragStartX;
    const dy = e.clientY - this.dragStartY;
    this.draggedElem.style.transform = `translate(${dx}px, ${dy}px) scale(1.15)`;
  }

  handlePointerUp(e) {
    if (!this.isDragging || !this.draggedElem) return;
    this.isDragging = false;
    const elem = this.draggedElem;
    this.draggedElem = null;

    elem.classList.remove('dragging');
    elem.style.transform = '';

    const dropTarget = this.findDropTargetUnderCursor(e.clientX, e.clientY);
    if (dropTarget) {
      this.executeTokenPlacement(elem, dropTarget);
    } else {
      window.soundEngine.playErrorBounce();
      this.showToast('Arahkan bola angka ke target yang menyala.', 'warning');
    }
  }

  findDropTargetUnderCursor(x, y) {
    const targets = document.querySelectorAll('[data-target]');
    for (const target of targets) {
      const rect = target.getBoundingClientRect();
      const padding = 20;
      if (
        x >= rect.left - padding &&
        x <= rect.right + padding &&
        y >= rect.top - padding &&
        y <= rect.bottom + padding
      ) {
        return target.getAttribute('data-target');
      }
    }
    return null;
  }

  /* ==========================================================================
     EXECUTE TOKEN PLACEMENT & STATE TRANSITION
     ========================================================================== */
  executeTokenPlacement(tokenElem, targetType) {
    const tokenType = tokenElem.getAttribute('data-type');
    const digit = parseInt(tokenElem.getAttribute('data-digit') || '0', 10);

    // Case 1: Placing Ones Result Digit (e.g. 5 into Ones Result)
    if (tokenType === 'ones' && targetType === 'result-ones') {
      this.saveHistorySnapshot();
      window.soundEngine.playSnap();
      this.placeOnesResultBall(digit);
      tokenElem.remove();
      this.showToast(`Bagus! Angka ${digit} tetap pada tempat satuan.`, 'success');

      // Check if carry token is already placed in Carry Slot
      const carrySlotFilled = document.getElementById('wsCarryDropSlot')?.classList.contains('filled');
      if (carrySlotFilled) {
        this.setPhase('TENS_INPUT');
      } else {
        this.setPhase('MOVE_TO_PENGUIN');
      }
      return;
    }

    // Case 2: Moving Carry Digit to Penguin Nest -> Triggers Penguin Glide Animation!
    if (tokenType === 'carry' && (targetType === 'penguin-nest' || targetType === 'carry-slot' || targetType === 'algo-carry')) {
      this.saveHistorySnapshot();
      tokenElem.remove();
      
      // Animate Penguin gliding up the central Jalur Simpan to Carry Slot
      this.animatePenguinGlideToCarry(digit);
      return;
    }

    // Invalid target feedback
    window.soundEngine.playErrorBounce();
    if (tokenType === 'ones') {
      this.showToast(`Angka ${digit} adalah satuan. Letakkan di kotak Hasil Satuan!`, 'warning');
    } else if (tokenType === 'carry') {
      this.showToast(`Angka ${digit} adalah puluhan. Letakkan di Sarang Penguin di tengah!`, 'warning');
    } else {
      this.showToast('Letakkan angka pada slot yang menyala.', 'warning');
    }
  }

  /* ==========================================================================
     ANIMATE PENGUIN GLIDING FROM CENTER TO CARRY SLOT
     ========================================================================== */
  animatePenguinGlideToCarry(digit) {
    window.soundEngine.playPenguinChirp();
    this.setPenguinSpeech(`“Hore! Aku bawa angka ${digit} meluncur ke Slot Simpan Puluhan!”`);
    
    const jalurCol = document.getElementById('colJalurCenter');
    if (jalurCol) jalurCol.classList.add('active-flow');

    // Highlight target carry slot
    const carryAnchor = document.getElementById('tensCarryAnchor');
    if (carryAnchor) carryAnchor.classList.add('target-active');

    // Create dynamic gliding sprite
    const sprite = document.createElement('div');
    sprite.className = 'penguin-glide-sprite';
    sprite.innerHTML = `
      ${Mascots.getPenguinMascotSvg(80, 85, 'holding')}
      <div class="held-carry-digit">${digit}</div>
    `;

    // Calculate start position (Penguin nest in center) and end position (Carry Slot above Puluhan)
    const startElem = document.getElementById('penguinDropSlot');
    const endElem = document.getElementById('wsCarryDropSlot');
    const boardElem = document.getElementById('manipulationBoard');

    if (startElem && endElem && boardElem) {
      const boardRect = boardElem.getBoundingClientRect();
      const startRect = startElem.getBoundingClientRect();
      const endRect = endElem.getBoundingClientRect();

      const startX = startRect.left - boardRect.left + startRect.width / 2 - 40;
      const startY = startRect.top - boardRect.top + startRect.height / 2 - 42;

      const endX = endRect.left - boardRect.left + endRect.width / 2 - 40;
      const endY = endRect.top - boardRect.top + endRect.height / 2 - 42;

      sprite.style.left = `${startX}px`;
      sprite.style.top = `${startY}px`;
      sprite.style.transform = 'scale(0.8)';
      boardElem.appendChild(sprite);

      // Play whoosh sound as it glides
      window.soundEngine.playWhoosh();

      // Trigger glide transition
      requestAnimationFrame(() => {
        sprite.style.transform = 'scale(1.1)';
        requestAnimationFrame(() => {
          sprite.style.left = `${endX}px`;
          sprite.style.top = `${endY}px`;
        });
      });

      // On arrival at Carry Slot
      setTimeout(() => {
        window.soundEngine.playCarryPlaced();
        this.placeCarrySlotBall(digit);

        if (sprite.parentNode) {
          sprite.remove();
        }

        if (jalurCol) jalurCol.classList.remove('active-flow');
        if (carryAnchor) carryAnchor.classList.remove('target-active');

        this.setPenguinSpeech(`“Angka ${digit} berhasil disimpan di atas Puluhan!”`);
        this.showToast(`Tepat! Angka simpan ${digit} berhasil dipindahkan ke atas Puluhan.`, 'success');

        // Check if ones digit is already placed
        const onesSlotFilled = document.getElementById('wsResultOnesSlot')?.classList.contains('filled');
        if (onesSlotFilled) {
          this.setPhase('TENS_INPUT');
        } else {
          this.setPhase('MOVE_TO_ONES_RESULT');
        }
      }, 1250);
    } else {
      // Fallback
      this.placeCarrySlotBall(digit);
      this.setPhase('TENS_INPUT');
    }
  }

  /* ==========================================================================
     DOM SLOT POPULATION HELPERS
     ========================================================================== */
  placeOnesResultBall(digit) {
    const wsSlot = document.getElementById('wsResultOnesSlot');
    const algoSlot = document.getElementById('algoResultOnes');

    if (wsSlot) {
      wsSlot.innerHTML = `<div class="digit-ball digit-ball-amber locked">${digit}</div>`;
      wsSlot.classList.add('filled');
    }
    if (algoSlot) {
      algoSlot.textContent = digit;
      algoSlot.classList.add('filled');
    }
  }

  placeCarrySlotBall(digit) {
    const wsCarrySlot = document.getElementById('wsCarryDropSlot');
    const algoCarryVal = document.getElementById('algoCarryVal');
    const algoCarrySlot = document.getElementById('algoCarrySlot');
    const penguinContainer = document.getElementById('wsPenguinContainer');

    if (wsCarrySlot) {
      wsCarrySlot.innerHTML = `<div class="digit-ball digit-ball-carry locked">${digit}</div>`;
      wsCarrySlot.classList.add('filled');
    }

    if (algoCarryVal) algoCarryVal.textContent = digit;
    if (algoCarrySlot) algoCarrySlot.classList.add('filled');

    if (penguinContainer) {
      penguinContainer.innerHTML = Mascots.getPenguinMascotSvg(100, 105, 'neutral');
    }
  }

  placeTensResultBall(digit) {
    const wsSlot = document.getElementById('wsResultTensSlot');
    const algoSlot = document.getElementById('algoResultTens');

    if (wsSlot) {
      wsSlot.innerHTML = `<div class="digit-ball digit-ball-purple locked">${digit}</div>`;
      wsSlot.classList.add('filled');
    }
    if (algoSlot) {
      algoSlot.textContent = digit;
      algoSlot.classList.add('filled');
    }
  }

  /* ==========================================================================
     TARGET HIGHLIGHT UTILITIES
     ========================================================================== */
  highlightValidTarget(targetKey, forClick = false) {
    this.clearAllDropHighlights();
    const targets = document.querySelectorAll(`[data-target="${targetKey}"]`);
    targets.forEach(t => {
      t.classList.add('valid-target', 'highlight-target');
      if (forClick) {
        t.classList.add('click-target-candidate');
        // If clicking candidate slot directly
        t.onclick = (e) => {
          e.stopPropagation();
          if (this.selectedBall) {
            this.executeTokenPlacement(this.selectedBall, targetKey);
            this.selectedBall.classList.remove('selected', 'click-move-active-ball');
            this.selectedBall = null;
          }
        };
      }
    });
  }

  clearAllDropHighlights() {
    document.querySelectorAll('[data-target]').forEach(t => {
      t.classList.remove('valid-target', 'highlight-target', 'click-target-candidate');
      t.onclick = null;
    });
  }

  /* ==========================================================================
     TIERED HINT SYSTEM (PRD Section 32)
     Level 1 -> 2 -> 3 -> 4 -> 5
     ========================================================================== */
  showTieredHint() {
    window.soundEngine.playPop();
    const hints = [
      `Level 1: Selalu mulai menjumlahkan dari kolom Satuan (sebelah kanan).`,
      `Level 2: Hitunglah digit satuan: ${this.onesA} + ${this.onesB}.`,
      `Level 3: Hasil dari ${this.onesA} + ${this.onesB} adalah ${this.onesSum}.`,
      `Level 4: Angka ${this.onesDigit} tetap di tempat Satuan.`,
      `Level 5: Angka ${this.carryDigit} adalah 1 puluhan yang harus disimpan ke Penguin, lalu dipindahkan ke Slot Simpan Puluhan di atas.`
    ];

    const hintMsg = hints[this.currentHintLevel - 1] || hints[hints.length - 1];
    const modalContent = document.getElementById('modalHintContent');
    if (modalContent) modalContent.textContent = hintMsg;

    document.getElementById('modalHintDialog')?.classList.add('active');

    // Increment hint level for next request
    if (this.currentHintLevel < 5) {
      this.currentHintLevel++;
      this.updateHintBadge();
    }
  }

  updateHintBadge() {
    const badge = document.getElementById('hintLevelBadge');
    if (badge) badge.textContent = `Lv ${this.currentHintLevel}`;
  }

  /* ==========================================================================
     INTERACTIVE DEMO STEP HELPER (Section 13)
     ========================================================================== */
  showDemoAction() {
    window.soundEngine.playPop();
    const demoDescriptions = [
      `💡 Contoh: 7 + 8 = 15.`,
      `15 memiliki 1 Puluhan dan 5 Satuan.`,
      `Angka 5 ditaruh di Hasil Satuan.`,
      `Angka 1 disimpan ke Penguin, lalu diteruskan ke Carry Slot di atas Puluhan.`
    ];
    this.showToast(demoDescriptions.join(' '), 'info');
  }

  /* ==========================================================================
     HISTORY SNAPSHOT & UNDO (PRD Section 33)
     ========================================================================== */
  saveHistorySnapshot() {
    const snapshot = {
      phase: this.phase,
      keypadBuffer: this.keypadBuffer,
      splitTokensHTML: document.getElementById('splitTokensContainer')?.innerHTML || '',
      wsResultOnesHTML: document.getElementById('wsResultOnesSlot')?.innerHTML || '',
      algoResultOnesText: document.getElementById('algoResultOnes')?.textContent || '',
      penguinSlotHTML: document.getElementById('penguinDropSlot')?.innerHTML || '',
      wsCarrySlotHTML: document.getElementById('wsCarryDropSlot')?.innerHTML || '',
      algoCarryValText: document.getElementById('algoCarryVal')?.textContent || '',
      wsResultTensHTML: document.getElementById('wsResultTensSlot')?.innerHTML || '',
      algoResultTensText: document.getElementById('algoResultTens')?.textContent || ''
    };
    this.history.push(snapshot);
    this.updateUndoButton();
  }

  performUndo() {
    if (this.history.length === 0) return;
    window.soundEngine.playPop();

    const snapshot = this.history.pop();
    this.phase = snapshot.phase;
    this.keypadBuffer = snapshot.keypadBuffer;

    const splitContainer = document.getElementById('splitTokensContainer');
    if (splitContainer) {
      splitContainer.innerHTML = snapshot.splitTokensHTML;
      // Re-bind restored tokens if present
      const ballCarry = document.getElementById('splitBallCarry');
      const ballOnes = document.getElementById('splitBallOnes');
      if (ballCarry) this.bindTokenInteractivity(ballCarry);
      if (ballOnes) this.bindTokenInteractivity(ballOnes);
    }

    const wsResultOnes = document.getElementById('wsResultOnesSlot');
    const algoResultOnes = document.getElementById('algoResultOnes');
    if (wsResultOnes) wsResultOnes.innerHTML = snapshot.wsResultOnesHTML;
    if (algoResultOnes) algoResultOnes.textContent = snapshot.algoResultOnesText;

    const penguinSlot = document.getElementById('penguinDropSlot');
    if (penguinSlot) {
      penguinSlot.innerHTML = snapshot.penguinSlotHTML;
      const penguinStoredBall = document.getElementById('penguinStoredBall');
      if (penguinStoredBall) this.bindTokenInteractivity(penguinStoredBall);
    }

    const wsCarrySlot = document.getElementById('wsCarryDropSlot');
    const algoCarryVal = document.getElementById('algoCarryVal');
    if (wsCarrySlot) wsCarrySlot.innerHTML = snapshot.wsCarrySlotHTML;
    if (algoCarryVal) algoCarryVal.textContent = snapshot.algoCarryValText;

    const wsResultTens = document.getElementById('wsResultTensSlot');
    const algoResultTens = document.getElementById('algoResultTens');
    if (wsResultTens) wsResultTens.innerHTML = snapshot.wsResultTensHTML;
    if (algoResultTens) algoResultTens.textContent = snapshot.algoResultTensText;

    this.setPhase(this.phase);
    this.updateUndoButton();
    this.showToast('Langkah terakhir telah dibatalkan (Undo).', 'info');
  }

  updateUndoButton() {
    const btnUndo = document.getElementById('btnUndo');
    if (btnUndo) {
      btnUndo.disabled = this.history.length === 0;
    }
  }

  /* ==========================================================================
     SUCCESS CELEBRATION & ADVANCEMENT
     ========================================================================== */
  triggerSuccessCelebration() {
    window.soundEngine.playSuccessFanfare();

    // Populate Modal Pedagogical Summary
    const formulaDisplay = document.getElementById('modalResultFormula');
    const rowOnes = document.getElementById('sumRowOnes');
    const rowCarry = document.getElementById('sumRowCarry');
    const rowTens = document.getElementById('sumRowTens');
    const rowFinal = document.getElementById('sumRowFinal');

    if (formulaDisplay) formulaDisplay.textContent = `${this.numA} + ${this.numB} = ${this.finalResult}`;
    if (rowOnes) rowOnes.textContent = `${this.onesSum} (${this.carryDigit} Puluhan + ${this.onesDigit} Satuan)`;
    if (rowCarry) rowCarry.textContent = `+ ${this.carryDigit} (ke Puluhan)`;
    const tensExp = this.carryDigit > 0 
      ? `${this.carryDigit} + ${this.tensA} + ${this.tensB} = ${this.tensSum}`
      : `${this.tensA} + ${this.tensB} = ${this.tensSum}`;
    if (rowTens) rowTens.textContent = tensExp;
    if (rowFinal) rowFinal.textContent = `${this.finalResult}`;

    // Open Summary Modal
    setTimeout(() => {
      document.getElementById('modalResultSummary')?.classList.add('active');
    }, 600);
  }

  handleCheckButton() {
    if (this.phase === 'COMPLETED') {
      document.getElementById('modalResultSummary')?.classList.add('active');
    } else if (this.phase === 'ONES_INPUT' || this.phase === 'TENS_INPUT') {
      this.submitKeypadAnswer();
    } else {
      this.showToast('Selesaikan perpindahan bola angka yang sedang aktif.', 'info');
    }
  }

  advanceToNextProblem() {
    if (this.currentMode === 'latihan') {
      this.practiceIndex++;
      if (this.practiceIndex < this.practiceQuestions.length) {
        const q = this.practiceQuestions[this.practiceIndex];
        const counter = document.getElementById('wsProblemCounter');
        if (counter) counter.textContent = `Soal ${this.practiceIndex + 1} / ${this.practiceQuestions.length}`;
        this.startProblem(q.a, q.b);
      } else {
        this.showScreen('screen-challenge-complete');
      }
    } else if (this.currentMode === 'tantangan') {
      this.challengeIndex++;
      this.challengeScore += 100;
      if (this.challengeIndex < this.challengeQuestions.length) {
        const q = this.challengeQuestions[this.challengeIndex];
        const counter = document.getElementById('wsProblemCounter');
        if (counter) counter.textContent = `Tantangan ${this.challengeIndex + 1} / ${this.challengeQuestions.length}`;
        this.startProblem(q.a, q.b);
      } else {
        this.showScreen('screen-challenge-complete');
      }
    } else {
      // In Belajar or Guru mode, generate another engaging problem
      const presets = [
        { a: 38, b: 27 },
        { a: 46, b: 17 },
        { a: 58, b: 24 },
        { a: 67, b: 15 },
        { a: 29, b: 35 }
      ];
      const randomQ = presets[Math.floor(Math.random() * presets.length)];
      this.startProblem(randomQ.a, randomQ.b);
    }
  }

  /* ==========================================================================
     UI HELPERS: TOASTS & PENGUIN SPEECH
     ========================================================================== */
  showToast(message, type = 'info') {
    const toast = document.getElementById('formativeToast');
    const msgElem = document.getElementById('toastMessage');
    const iconElem = document.getElementById('toastIcon');
    if (!toast || !msgElem) return;

    msgElem.textContent = message;
    toast.className = `formative-toast show ${type}`;

    if (iconElem) {
      if (type === 'success') iconElem.textContent = '✨';
      else if (type === 'error') iconElem.textContent = '❌';
      else if (type === 'warning') iconElem.textContent = '⚠️';
      else iconElem.textContent = '💡';
    }

    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 3800);
  }

  setPenguinSpeech(text) {
    const elem = document.getElementById('penguinSpeech');
    if (elem) elem.textContent = text;
  }
}
