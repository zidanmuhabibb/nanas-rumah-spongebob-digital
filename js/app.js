/* ==========================================================================
   NANAS RUMAH SPONGEBOB DIGITAL (NRSD)
   Penguin Penyimpan Angka Pintar di Nanas Rumah SpongeBob
   by LIDYA CHOIRUN NISA
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize SVG Mascots & Ocean Elements
  initMascots();
  initBubbles();

  // Instantiate NRSD Application Engine
  window.app = new NRSDApp();
});

// Render Dynamic SVGs across screens
function initMascots() {
  // Splash Mascots
  const splashSponge = document.getElementById('splashSponge');
  if (splashSponge) splashSponge.innerHTML = Mascots.getSpongeMascotSvg(120, 130);

  const splashPineapple = document.getElementById('splashPineappleHouse');
  if (splashPineapple) splashPineapple.innerHTML = Mascots.getPineappleHouseSvg(130, 150, 'tens');

  const splashPenguin = document.getElementById('splashPenguin');
  if (splashPenguin) splashPenguin.innerHTML = Mascots.getPenguinMascotSvg(120, 130, 'waving');

  // Home Hero Mascot Triad
  const homeSponge = document.getElementById('homeSpongeContainer');
  if (homeSponge) homeSponge.innerHTML = Mascots.getSpongeMascotSvg(130, 140);

  const homePineapple = document.getElementById('homePineappleContainer');
  if (homePineapple) homePineapple.innerHTML = Mascots.getPineappleHouseSvg(140, 160, 'tens');

  const homePenguin = document.getElementById('homePenguinContainer');
  if (homePenguin) homePenguin.innerHTML = Mascots.getPenguinMascotSvg(120, 130, 'neutral');

  // Workspace Mascots
  const wsSponge = document.getElementById('wsSpongeAvatar');
  if (wsSponge) wsSponge.innerHTML = Mascots.getSpongeMascotSvg(55, 60);

  const wsPenguin = document.getElementById('wsPenguinContainer');
  if (wsPenguin) wsPenguin.innerHTML = Mascots.getPenguinMascotSvg(100, 105, 'neutral');

  // Ocean Margin Decorations (Left & Right Coral Reefs)
  const decorLeft = document.getElementById('decorCoralLeft');
  if (decorLeft) decorLeft.innerHTML = Mascots.getCoralReefSvg('left');

  const decorRight = document.getElementById('decorCoralRight');
  if (decorRight) decorRight.innerHTML = Mascots.getCoralReefSvg('right');

  // Cute Swimming Fishes in Ocean
  const fish1 = document.getElementById('oceanFish1');
  if (fish1) fish1.innerHTML = Mascots.getCuteFishSvg('#38bdf8', 'right');

  const fish2 = document.getElementById('oceanFish2');
  if (fish2) fish2.innerHTML = Mascots.getCuteFishSvg('#fbbf24', 'left');

  const fish3 = document.getElementById('oceanFish3');
  if (fish3) fish3.innerHTML = Mascots.getCuteFishSvg('#f472b6', 'right');
}

// Background Animated Bubbles
function initBubbles() {
  const container = document.getElementById('bubbleContainer');
  if (!container) return;

  const bubbleCount = 18;
  for (let i = 0; i < bubbleCount; i++) {
    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    const size = Math.random() * 32 + 12;
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    bubble.style.left = `${Math.random() * 96}%`;
    bubble.style.animationDuration = `${Math.random() * 8 + 6}s`;
    bubble.style.animationDelay = `${Math.random() * 5}s`;
    container.appendChild(bubble);
  }
}

/* ==========================================================================
   NRSD MAIN APPLICATION CLASS
   ========================================================================== */
class NRSDApp {
  constructor() {
    this.STORAGE_KEY = 'NRSD_STORAGE_V2';
    this.currentScreen = 'screen-splash';
    this.currentMode = 'belajar';

    // Core Workspace Problem State
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

    // Interaction Settings
    this.interactionMode = 'hybrid';
    this.selectedBall = null;
    this.autoHintEnabled = true;
    this.currentHintLevel = 1;
    this.phase = 'ONES_INPUT';
    this.keypadBuffer = '';
    this.history = [];

    // Practice Mode State (5 Focus Areas)
    this.practiceFocus = 'placeValue';
    this.practiceCount = 5;
    this.practiceQuestions = [];
    this.practiceIndex = 0;
    this.practiceScore = 0;
    this.practiceCorrectCount = 0;
    this.practiceWrongCount = 0;
    this.practiceStartTime = 0;
    this.practiceTimerInterval = null;
    this.practiceHintsUsed = 0;

    // Place Value Interactive Explorer State
    this.pvCurrentNumber = 47;
    this.pvTensPlaced = false;
    this.pvOnesPlaced = false;

    // Challenge Mode State (3 Levels Only)
    this.challengeCurrentLevel = 1;
    this.challengeQuestions = [];
    this.challengeIndex = 0;
    this.challengeScore = 0;
    this.challengeCorrectCount = 0;
    this.challengeWrongCount = 0;
    this.challengeStartTime = 0;
    this.challengeTimerInterval = null;

    // Problem Builder State
    this.builderProblems = [];
    this.activeEditIndex = -1;

    // 10-Step Guide State
    this.guideCurrentStep = 1;

    // Demo Mode State
    this.demoCurrentStep = 1;
    this.demoAutoPlayInterval = null;
    this.demoIsPlaying = false;

    // Load Local Storage
    this.loadState();

    // Bind Controllers
    this.bindNavigation();
    this.bindStudentIdentity();
    this.bindWorkspaceEvents();
    this.bindDragAndDrop();
    this.bindKeypad();
    this.bindPracticeController();
    this.bindChallengeController();
    this.bindBuilderController();
    this.bindGuideController();
    this.bindDemoController();
    this.bindDashboardController();
    this.bindSettingsController();

    // Initial UI Sync
    this.applySettings();
    this.updateStudentNameUI();
    this.renderChallengeLevelCards();
    this.renderDashboard();
  }

  /* ==========================================================================
     STORAGE MANAGEMENT
     ========================================================================== */
  getDefaultState() {
    return {
      studentName: 'Bintang Juara',
      studentClass: 'Kelas 3',
      sessions: [],
      unlockedLevels: [1],
      achievements: ['badge_pemula'],
      customProblemSets: [],
      settings: {
        sound: true,
        oceanSound: true,
        volume: 0.8,
        voice: true,
        anim: true,
        unlockAllLevels: false
      }
    };
  }

  loadState() {
    try {
      const raw = localStorage.getItem(this.STORAGE_KEY);
      if (raw) {
        this.state = JSON.parse(raw);
        const def = this.getDefaultState();
        this.state.settings = { ...def.settings, ...this.state.settings };
        if (!this.state.studentClass) this.state.studentClass = 'Kelas 3';
        if (!Array.isArray(this.state.sessions)) this.state.sessions = [];
        if (!Array.isArray(this.state.unlockedLevels)) this.state.unlockedLevels = [1];
        if (!Array.isArray(this.state.achievements)) this.state.achievements = [];
        if (!Array.isArray(this.state.customProblemSets)) this.state.customProblemSets = [];
      } else {
        this.state = this.getDefaultState();
        this.saveState();
      }
    } catch (e) {
      console.warn('Storage read error, using defaults:', e);
      this.state = this.getDefaultState();
    }
  }

  saveState() {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.state));
    } catch (e) {
      console.error('Storage write error:', e);
    }
  }

  recordSession(sess) {
    const sessionData = {
      id: 'sess_' + Date.now(),
      studentName: this.state.studentName || 'Murid Juara',
      studentClass: this.state.studentClass || 'Kelas 3',
      timestamp: Date.now(),
      dateStr: new Date().toLocaleString('id-ID', { dateStyle: 'short', timeStyle: 'short' }),
      mode: sess.mode || 'latihan',
      focus: sess.focus || 'general',
      focusTitle: sess.focusTitle || 'Latihan',
      total: sess.total || 5,
      correct: sess.correct || 0,
      wrong: sess.wrong || 0,
      score: sess.score || 0,
      durationSec: sess.durationSec || 0,
      hintsUsed: sess.hintsUsed || 0,
      stages: sess.stages || {
        placeValue: true,
        onesAddition: true,
        regrouping: true,
        carryDigit: true,
        withCarry: true,
        tensAddition: true,
        finalResult: true
      }
    };

    this.state.sessions.unshift(sessionData);
    if (this.state.sessions.length > 50) this.state.sessions.pop();
    this.saveState();
    this.renderDashboard();
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

    // Update Main Sub-Nav active class
    document.querySelectorAll('.app-main-nav .nav-item').forEach(btn => {
      btn.classList.remove('active');
      const scr = btn.getAttribute('data-screen');
      if (scr === screenId) {
        btn.classList.add('active');
      }
    });

    if (screenId !== 'screen-demo' && this.demoIsPlaying) {
      this.pauseDemoAutoPlay();
    }

    if (target) target.scrollTop = 0;
  }

  setMode(mode) {
    this.currentMode = mode;
    const modeBadge = document.getElementById('headerModeBadge');
    const modeIcon = document.getElementById('headerModeIcon');
    const modeText = document.getElementById('headerModeText');
    const problemCounter = document.getElementById('wsProblemCounter');

    const modeLabels = {
      belajar: { icon: '📚', text: 'Mode Belajar' },
      latihan: { icon: '🎮', text: 'Mode Latihan' },
      tantangan: { icon: '🏆', text: 'Mode Tantangan' },
      guru: { icon: '👩‍🏫', text: 'Mode Guru' }
    };

    const cur = modeLabels[mode] || modeLabels.belajar;
    if (modeIcon) modeIcon.textContent = cur.icon;
    if (modeText) modeText.textContent = cur.text;
    if (problemCounter) {
      problemCounter.style.display = (mode === 'latihan' || mode === 'tantangan') ? 'block' : 'none';
    }
  }

  bindNavigation() {
    // Top Sub-Navigation Items
    document.getElementById('navHome')?.addEventListener('click', () => {
      window.soundEngine.playPop();
      this.showScreen('screen-home');
    });

    document.getElementById('navLearn')?.addEventListener('click', () => {
      window.soundEngine.playPop();
      this.isPracticeSession = false;
      const counter = document.getElementById('wsProblemCounter');
      if (counter) counter.style.display = 'none';
      this.setMode('belajar');
      this.startProblem(27, 18);
      this.showScreen('screen-workspace');
    });

    document.getElementById('navPractice')?.addEventListener('click', () => {
      window.soundEngine.playPop();
      this.openPracticeSetup();
    });

    document.getElementById('navChallenge')?.addEventListener('click', () => {
      window.soundEngine.playPop();
      this.openChallengePicker();
    });

    document.getElementById('navBuilder')?.addEventListener('click', () => {
      window.soundEngine.playPop();
      this.showScreen('screen-builder');
      this.generateBuilderProblems();
    });

    document.getElementById('navGuide')?.addEventListener('click', () => {
      window.soundEngine.playPop();
      this.showScreen('screen-guide');
      this.setGuideStep(1);
    });

    document.getElementById('navTeacherGuide')?.addEventListener('click', () => {
      window.soundEngine.playPop();
      this.showScreen('screen-teacher-guide');
    });

    document.getElementById('navDemo')?.addEventListener('click', () => {
      window.soundEngine.playPop();
      this.showScreen('screen-demo');
      this.setDemoStep(1);
    });

    document.getElementById('navDashboard')?.addEventListener('click', () => {
      window.soundEngine.playPop();
      this.showScreen('screen-dashboard');
      this.renderDashboard();
    });

    document.getElementById('navSettings')?.addEventListener('click', () => {
      window.soundEngine.playPop();
      this.showScreen('screen-settings');
      this.syncSettingsForm();
    });

    // Header Quick Action Buttons
    document.getElementById('btnHeaderHome')?.addEventListener('click', () => {
      window.soundEngine.playPop();
      this.showScreen('screen-home');
    });

    document.getElementById('btnHeaderGuide')?.addEventListener('click', () => {
      window.soundEngine.playPop();
      this.showScreen('screen-guide');
      this.setGuideStep(1);
    });

    document.getElementById('btnHeaderDashboard')?.addEventListener('click', () => {
      window.soundEngine.playPop();
      this.showScreen('screen-dashboard');
      this.renderDashboard();
    });

    document.getElementById('btnHeaderTeacher')?.addEventListener('click', () => {
      window.soundEngine.playPop();
      this.showScreen('screen-settings');
      this.syncSettingsForm();
    });

    // Home Screen Quick Cards
    document.getElementById('btnHomeLearn')?.addEventListener('click', () => {
      window.soundEngine.playPop();
      this.isPracticeSession = false;
      const counter = document.getElementById('wsProblemCounter');
      if (counter) counter.style.display = 'none';
      this.setMode('belajar');
      this.startProblem(27, 18);
      this.showScreen('screen-workspace');
    });

    document.getElementById('btnHomePractice')?.addEventListener('click', () => {
      window.soundEngine.playPop();
      this.openPracticeSetup();
    });

    document.getElementById('btnHomeChallenge')?.addEventListener('click', () => {
      window.soundEngine.playPop();
      this.openChallengePicker();
    });

    document.getElementById('btnHomeBuilder')?.addEventListener('click', () => {
      window.soundEngine.playPop();
      this.showScreen('screen-builder');
      this.generateBuilderProblems();
    });

    document.getElementById('btnHomeGuide')?.addEventListener('click', () => {
      window.soundEngine.playPop();
      this.showScreen('screen-guide');
      this.setGuideStep(1);
    });

    document.getElementById('btnHomeDemo')?.addEventListener('click', () => {
      window.soundEngine.playPop();
      this.showScreen('screen-demo');
      this.setDemoStep(1);
    });

    document.getElementById('btnHomeDashboard')?.addEventListener('click', () => {
      window.soundEngine.playPop();
      this.showScreen('screen-dashboard');
      this.renderDashboard();
    });

    // Splash Start Button
    document.getElementById('btnSplashStart')?.addEventListener('click', () => {
      window.soundEngine.playPop();
      this.showScreen('screen-home');
      if (!this.state.studentName || this.state.studentName === 'Murid Juara') {
        setTimeout(() => {
          document.getElementById('modalStudentName')?.classList.add('active');
        }, 300);
      }
    });

    // Teacher Guide Back & Demo
    document.getElementById('btnTeacherGuideBack')?.addEventListener('click', () => {
      window.soundEngine.playPop();
      this.showScreen('screen-home');
    });

    document.getElementById('btnTeacherGuideToDemo')?.addEventListener('click', () => {
      window.soundEngine.playPop();
      this.showScreen('screen-demo');
      this.setDemoStep(1);
    });

    // Achievement Modal Close
    document.getElementById('btnCloseAchievement')?.addEventListener('click', () => {
      window.soundEngine.playPop();
      document.getElementById('modalAchievement')?.classList.remove('active');
    });
  }

  /* ==========================================================================
     STUDENT IDENTITY CONTROLLER
     ========================================================================== */
  updateStudentNameUI() {
    const name = this.state.studentName || 'Murid Juara';
    const cls = this.state.studentClass || 'Kelas 3';
    const headerName = document.getElementById('headerStudentName');
    if (headerName) headerName.textContent = `${name} • ${cls}`;

    const inputSetting = document.getElementById('inputSettingStudentName');
    if (inputSetting) inputSetting.value = name;

    const inputHomeName = document.getElementById('homeInputStudentName');
    const inputHomeClass = document.getElementById('homeInputStudentClass');
    if (inputHomeName) inputHomeName.value = name;
    if (inputHomeClass) inputHomeClass.value = cls;
  }

  bindStudentIdentity() {
    const chip = document.getElementById('headerStudentChip');
    if (chip) {
      chip.addEventListener('click', () => {
        window.soundEngine.playPop();
        const input = document.getElementById('inputModalStudentName');
        if (input) input.value = this.state.studentName || '';
        document.getElementById('modalStudentName')?.classList.add('active');
      });
    }

    // Save from Home screen identity card (Revisi 2)
    const btnSaveHome = document.getElementById('btnSaveHomeIdentity');
    if (btnSaveHome) {
      btnSaveHome.addEventListener('click', () => {
        const nameVal = (document.getElementById('homeInputStudentName')?.value || '').trim() || 'Murid Juara';
        const classVal = (document.getElementById('homeInputStudentClass')?.value || '').trim() || 'Kelas 3';
        this.state.studentName = nameVal;
        this.state.studentClass = classVal;
        this.saveState();
        this.updateStudentNameUI();

        const notice = document.getElementById('homeIdentitySavedNotice');
        const label = document.getElementById('savedStudentLabel');
        if (label) label.textContent = `${nameVal} • ${classVal}`;
        if (notice) {
          notice.style.display = 'block';
          setTimeout(() => { if (notice) notice.style.display = 'none'; }, 4000);
        }

        window.soundEngine.playSuccessFanfare();
        this.showToast(`Halo ${nameVal} (${classVal})! Identitas berhasil disimpan.`, 'success');
        window.soundEngine.speak(`Halo ${nameVal}, selamat belajar penjumlahan.`);
      });
    }

    const btnSubmit = document.getElementById('btnSubmitStudentName');
    if (btnSubmit) {
      btnSubmit.addEventListener('click', () => {
        const input = document.getElementById('inputModalStudentName');
        const val = (input?.value || '').trim();
        if (val) {
          this.state.studentName = val;
          this.saveState();
          this.updateStudentNameUI();
          window.soundEngine.playCorrect();
          window.soundEngine.speak(`Selamat datang, ${val}! Selamat belajar.`);
        }
        document.getElementById('modalStudentName')?.classList.remove('active');
      });
    }

    const btnSaveSetting = document.getElementById('btnSaveStudentName');
    if (btnSaveSetting) {
      btnSaveSetting.addEventListener('click', () => {
        const input = document.getElementById('inputSettingStudentName');
        const val = (input?.value || '').trim();
        if (val) {
          this.state.studentName = val;
          this.saveState();
          this.updateStudentNameUI();
          this.showToast(`Nama siswa berhasil diubah menjadi ${val}!`, 'success');
          window.soundEngine.playCorrect();
        }
      });
    }
  }

  /* ==========================================================================
     FITUR LATIHAN CONTROLLER (5 FITUR KHUSUS)
     ========================================================================== */
  openPracticeSetup() {
    this.showScreen('screen-practice');
    document.getElementById('practiceSetupView').style.display = 'block';
    document.getElementById('practicePlaceValueView').style.display = 'none';
    document.getElementById('practiceRegroupingView').style.display = 'none';
    document.getElementById('practiceQuizView').style.display = 'none';
    document.getElementById('practiceSummaryView').style.display = 'none';
  }

  bindPracticeController() {
    // 5 Focus Selection Cards
    document.querySelectorAll('.practice-focus-card').forEach(card => {
      card.addEventListener('click', (e) => {
        document.querySelectorAll('.practice-focus-card').forEach(c => c.classList.remove('selected'));
        const target = e.currentTarget;
        target.classList.add('selected');
        this.practiceFocus = target.getAttribute('data-focus') || 'placeValue';
        window.soundEngine.playPop();

        // Show/hide count picker depending on focus
        const countBox = document.getElementById('practiceCountBox');
        if (countBox) {
          countBox.style.display = (this.practiceFocus === 'withCarry' || this.practiceFocus === 'wordProblems') ? 'flex' : 'none';
        }
      });
    });

    // Count pills
    document.querySelectorAll('.count-pill').forEach(pill => {
      pill.addEventListener('click', (e) => {
        document.querySelectorAll('.count-pill').forEach(p => p.classList.remove('active'));
        const target = e.currentTarget;
        target.classList.add('active');
        this.practiceCount = parseInt(target.getAttribute('data-count') || '5', 10);
        window.soundEngine.playPop();
      });
    });

    document.getElementById('btnPracticeBack')?.addEventListener('click', () => {
      window.soundEngine.playPop();
      this.showScreen('screen-home');
    });

    // Start Practice button routing to specific interactive view
    document.getElementById('btnStartPracticeQuiz')?.addEventListener('click', () => {
      window.soundEngine.playPop();
      if (this.practiceFocus === 'placeValue') {
        this.startPlaceValueInteractive();
      } else if (this.practiceFocus === 'regrouping' || this.practiceFocus === 'carryDigit') {
        this.startRegroupingInteractive(this.practiceFocus);
      } else if (this.practiceFocus === 'withCarry' || this.practiceFocus === 'wordProblems') {
        this.startWorkspacePractice(this.practiceFocus, this.practiceCount);
      } else {
        this.startPracticeQuiz();
      }
    });

    // Place Value View buttons
    document.getElementById('btnPVQuit')?.addEventListener('click', () => {
      this.openPracticeSetup();
    });

    document.getElementById('btnPVReset')?.addEventListener('click', () => {
      this.setupPlaceValueNumber(this.pvCurrentNumber);
      window.soundEngine.playPop();
    });

    document.getElementById('btnPVNext')?.addEventListener('click', () => {
      window.soundEngine.playPop();
      const numbers = [58, 36, 92, 24, 71, 63, 85, 49];
      const nextNum = numbers[Math.floor(Math.random() * numbers.length)];
      this.setupPlaceValueNumber(nextNum);
    });

    // Regrouping View buttons
    document.getElementById('btnRGQuit')?.addEventListener('click', () => {
      this.openPracticeSetup();
    });

    document.getElementById('btnRGReset')?.addEventListener('click', () => {
      window.soundEngine.playPop();
      this.setupRegroupingExample(27, 18);
    });

    document.getElementById('btnRGNext')?.addEventListener('click', () => {
      window.soundEngine.playPop();
      const pairs = [{ a: 38, b: 27 }, { a: 46, b: 17 }, { a: 58, b: 24 }, { a: 67, b: 15 }];
      const nextPair = pairs[Math.floor(Math.random() * pairs.length)];
      this.setupRegroupingExample(nextPair.a, nextPair.b);
    });

    document.getElementById('btnRGRunPenguin')?.addEventListener('click', () => {
      this.animateRegroupingPenguinGlide(1);
    });

    // Quiz Mode buttons
    document.getElementById('btnPracticeCheck')?.addEventListener('click', () => {
      this.checkPracticeAnswer();
    });

    document.getElementById('btnPracticeNext')?.addEventListener('click', () => {
      window.soundEngine.playPop();
      this.advancePracticeQuestion();
    });

    document.getElementById('btnPracticeHint')?.addEventListener('click', () => {
      this.triggerPracticeHint();
    });

    document.getElementById('btnPracticeQuit')?.addEventListener('click', () => {
      if (confirm('Apakah kamu yakin ingin keluar dari sesi latihan ini?')) {
        clearInterval(this.practiceTimerInterval);
        this.openPracticeSetup();
      }
    });

    // Summary buttons
    document.getElementById('btnSummaryRetry')?.addEventListener('click', () => {
      window.soundEngine.playPop();
      if (this.practiceFocus === 'withCarry' || this.practiceFocus === 'wordProblems') {
        this.startWorkspacePractice(this.practiceFocus, this.practiceCount);
      } else {
        this.startPracticeQuiz();
      }
    });

    document.getElementById('btnSummaryDashboard')?.addEventListener('click', () => {
      window.soundEngine.playPop();
      this.showScreen('screen-dashboard');
      this.renderDashboard();
    });

    document.getElementById('btnSummaryChallenge')?.addEventListener('click', () => {
      window.soundEngine.playPop();
      this.openChallengePicker();
    });

    document.getElementById('practiceInputAnswer')?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const nextBtn = document.getElementById('btnPracticeNext');
        if (nextBtn && nextBtn.style.display !== 'none') {
          this.advancePracticeQuestion();
        } else {
          this.checkPracticeAnswer();
        }
      }
    });
  }

  /* --- Fitur 1: Nilai Tempat Interactive Stage --- */
  startPlaceValueInteractive() {
    document.getElementById('practiceSetupView').style.display = 'none';
    document.getElementById('practicePlaceValueView').style.display = 'block';
    document.getElementById('practiceRegroupingView').style.display = 'none';
    document.getElementById('practiceQuizView').style.display = 'none';
    document.getElementById('practiceSummaryView').style.display = 'none';

    this.setupPlaceValueNumber(47);
  }

  setupPlaceValueNumber(num) {
    this.pvCurrentNumber = num;
    this.pvTensPlaced = false;
    this.pvOnesPlaced = false;

    const numDisplay = document.getElementById('pvNumberDisplay');
    if (numDisplay) numDisplay.textContent = num;

    const tens = Math.floor(num / 10);
    const ones = num % 10;

    const ballsContainer = document.getElementById('pvAvailableBalls');
    if (ballsContainer) {
      ballsContainer.innerHTML = `
        <div class="digit-ball digit-ball-purple" id="pvBallTens" data-type="tens" data-digit="${tens}" style="cursor:pointer; width:60px; height:60px; font-size:2rem;" title="Klik untuk tempatkan ke Rumah Puluhan">${tens}</div>
        <div class="digit-ball digit-ball-amber" id="pvBallOnes" data-type="ones" data-digit="${ones}" style="cursor:pointer; width:60px; height:60px; font-size:2rem;" title="Klik untuk tempatkan ke Rumah Satuan">${ones}</div>
      `;
    }

    const tensSlot = document.getElementById('pvTensSlot');
    const onesSlot = document.getElementById('pvOnesSlot');
    if (tensSlot) tensSlot.innerHTML = `<span style="color:#92400e; font-weight:700; font-size:0.9rem;">Letakkan digit puluhan (${tens}) di sini</span>`;
    if (onesSlot) onesSlot.innerHTML = `<span style="color:#9f1239; font-weight:700; font-size:0.9rem;">Letakkan digit satuan (${ones}) di sini</span>`;

    const fbBox = document.getElementById('pvFeedbackBox');
    if (fbBox) fbBox.style.display = 'none';

    // Bind click interactivity
    const ballT = document.getElementById('pvBallTens');
    const ballO = document.getElementById('pvBallOnes');
    const dropT = document.getElementById('pvDropTens');
    const dropO = document.getElementById('pvDropOnes');

    ballT?.addEventListener('click', () => {
      this.placePVDigit('tens', tens);
    });

    ballO?.addEventListener('click', () => {
      this.placePVDigit('ones', ones);
    });

    dropT?.addEventListener('click', () => {
      if (!this.pvTensPlaced) this.placePVDigit('tens', tens);
    });

    dropO?.addEventListener('click', () => {
      if (!this.pvOnesPlaced) this.placePVDigit('ones', ones);
    });
  }

  placePVDigit(type, val) {
    window.soundEngine.playSnap();
    const tens = Math.floor(this.pvCurrentNumber / 10);
    const ones = this.pvCurrentNumber % 10;

    if (type === 'tens') {
      this.pvTensPlaced = true;
      document.getElementById('pvBallTens')?.remove();
      const tensSlot = document.getElementById('pvTensSlot');
      if (tensSlot) {
        tensSlot.innerHTML = `<div class="digit-ball digit-ball-purple locked" style="width:60px; height:60px; font-size:2rem;">${val}</div>`;
      }
    } else {
      this.pvOnesPlaced = true;
      document.getElementById('pvBallOnes')?.remove();
      const onesSlot = document.getElementById('pvOnesSlot');
      if (onesSlot) {
        onesSlot.innerHTML = `<div class="digit-ball digit-ball-amber locked" style="width:60px; height:60px; font-size:2rem;">${val}</div>`;
      }
    }

    if (this.pvTensPlaced && this.pvOnesPlaced) {
      window.soundEngine.playSuccessFanfare();
      const fbBox = document.getElementById('pvFeedbackBox');
      const fbText = document.getElementById('pvFeedbackText');
      if (fbBox && fbText) {
        fbBox.className = 'growth-feedback-box correct show';
        fbBox.style.display = 'flex';
        fbText.innerHTML = `<strong>Hebat!</strong> Pada bilangan <strong>${this.pvCurrentNumber}</strong>: Angka <strong>${tens}</strong> menempati Rumah Puluhan (${tens * 10}) dan Angka <strong>${ones}</strong> menempati Rumah Satuan (${ones})!`;
      }
      window.soundEngine.speak(`Hebat! ${tens} adalah puluhan dan ${ones} adalah satuan.`);
    }
  }

  /* --- Fitur 2 & 3: Regrouping & Angka Simpan 3-Column Interactive Stage --- */
  startRegroupingInteractive(mode) {
    document.getElementById('practiceSetupView').style.display = 'none';
    document.getElementById('practicePlaceValueView').style.display = 'none';
    document.getElementById('practiceRegroupingView').style.display = 'block';
    document.getElementById('practiceQuizView').style.display = 'none';
    document.getElementById('practiceSummaryView').style.display = 'none';

    this.setupRegroupingExample(27, 18);
  }

  setupRegroupingExample(a, b) {
    const o1 = a % 10;
    const o2 = b % 10;
    const onesSum = o1 + o2;
    const carry = Math.floor(onesSum / 10);
    const onesRemain = onesSum % 10;

    const title = document.getElementById('rgTitle');
    const subtitle = document.getElementById('rgSubtitle');

    if (title) {
      title.innerHTML = `Hasil Penjumlahan Satuan: <span style="font-family:var(--font-numbers); color:#d97706; font-size:2.2rem; font-weight:900;">${o1} + ${o2} = ${onesSum} Satuan</span>`;
    }
    if (subtitle) {
      subtitle.innerHTML = `Karena hasil satuan <strong style="color:#e11d48;">${onesSum} &ge; 10</strong> (lebih dari 9), kelompokkan <strong style="color:#7c3aed;">10 Satuan</strong> menjadi <strong style="color:#7c3aed;">${carry} Puluhan</strong> yang siap dibawa Penguin ke Rumah Puluhan!`;
    }

    const carryBall = document.getElementById('rgCarryBall');
    const onesBall = document.getElementById('rgOnesBall');
    const onesRemainText = document.getElementById('rgOnesRemainText');
    if (carryBall) carryBall.textContent = `${carry}`;
    if (onesBall) onesBall.textContent = `${onesRemain}`;
    if (onesRemainText) onesRemainText.textContent = `(${onesRemain} Satuan)`;

    // Populate 10 unit dots inside breakdown box
    const dotsContainer = document.getElementById('rgBundleDots');
    if (dotsContainer) {
      let dotsHtml = '';
      for (let i = 0; i < 10; i++) {
        dotsHtml += `<div class="unit-dot" style="animation-delay:${i * 0.12}s;" title="1 Satuan (ke-${i+1})"></div>`;
      }
      dotsContainer.innerHTML = dotsHtml;
    }

    // Populate Penguin SVG avatar
    const penguinAvatar = document.getElementById('rgPenguinAvatar');
    if (penguinAvatar) {
      penguinAvatar.innerHTML = Mascots.getPenguinMascotSvg(90, 95, 'holding');
    }

    // Reset carry drop slot
    const carryDropTarget = document.getElementById('rgCarryDropTarget');
    if (carryDropTarget) {
      carryDropTarget.innerHTML = '';
      carryDropTarget.classList.remove('filled');
    }

    const fbBox = document.getElementById('rgFeedbackBox');
    if (fbBox) fbBox.style.display = 'none';
  }

  animateRegroupingPenguinGlide(carryVal = 1) {
    window.soundEngine.playPenguinChirp();
    const startElem = document.getElementById('rgPenguinNestSlot');
    const endElem = document.getElementById('rgCarryDropTarget');
    const boardElem = document.getElementById('rgVisualBoard');

    if (startElem && endElem && boardElem) {
      const boardRect = boardElem.getBoundingClientRect();
      const startRect = startElem.getBoundingClientRect();
      const endRect = endElem.getBoundingClientRect();

      const startX = startRect.left - boardRect.left + startRect.width / 2 - 30;
      const startY = startRect.top - boardRect.top + startRect.height / 2 - 30;

      const topCornerX = startX;
      const topCornerY = endRect.top - boardRect.top + endRect.height / 2 - 30;

      const endX = endRect.left - boardRect.left + endRect.width / 2 - 30;
      const endY = topCornerY;

      const sprite = document.createElement('div');
      sprite.className = 'penguin-glide-sprite';
      sprite.innerHTML = `
        ${Mascots.getPenguinMascotSvg(65, 70, 'holding')}
        <div class="held-carry-digit" style="font-size:1.2rem; width:26px; height:26px;">${carryVal}</div>
      `;

      sprite.style.left = `${startX}px`;
      sprite.style.top = `${startY}px`;
      sprite.style.position = 'absolute';
      sprite.style.transform = 'scale(0.85)';
      boardElem.appendChild(sprite);

      window.soundEngine.playWhoosh();

      // Step 1: Naik
      requestAnimationFrame(() => {
        sprite.style.transition = 'top 0.45s ease-out, transform 0.3s ease';
        sprite.style.top = `${topCornerY}px`;
        sprite.style.transform = 'scale(1.1)';

        // Step 2: Belok & Ke Kiri
        setTimeout(() => {
          sprite.style.transition = 'left 0.55s cubic-bezier(0.25, 1, 0.5, 1), transform 0.35s ease';
          sprite.style.transform = 'scale(1.1) rotate(-10deg)';
          sprite.style.left = `${endX}px`;

          // Step 3: Land at Carry Slot
          setTimeout(() => {
            sprite.style.transform = 'scale(1) rotate(0deg)';
            window.soundEngine.playCarryPlaced();
            
            if (endElem) {
              endElem.innerHTML = `<div class="digit-ball digit-ball-carry locked" style="width:46px; height:46px; font-size:1.5rem;">${carryVal}</div>`;
              endElem.classList.add('filled');
            }

            if (sprite.parentNode) sprite.remove();

            const fbBox = document.getElementById('rgFeedbackBox');
            const fbText = document.getElementById('rgFeedbackText');
            if (fbBox && fbText) {
              fbBox.className = 'growth-feedback-box correct show';
              fbBox.style.display = 'flex';
              fbText.innerHTML = `<strong>Luar Biasa!</strong> 10 Satuan telah dikelompokkan menjadi <strong>${carryVal} Puluhan</strong> dan berhasil dibawa Penguin meluncur ke Rumah Puluhan!`;
            }
            window.soundEngine.speak('10 satuan dikelompokkan menjadi 1 puluhan dibawa oleh penguin ke rumah puluhan.');
          }, 600);
        }, 450);
      });
    }
  }

  /* --- Fitur 4 & 5: Penjumlahan Menyimpan & Soal Cerita via Workspace Manipulatif --- */
  startWorkspacePractice(focus, count = 5) {
    this.isPracticeSession = true;
    this.practiceFocus = focus;
    this.practiceQuestions = this.generatePracticeQuestions(focus, count);
    this.practiceIndex = 0;
    this.practiceCorrectCount = 0;
    this.practiceWrongCount = 0;
    this.practiceScore = 0;
    this.practiceHintsUsed = 0;
    this.practiceStartTime = Date.now();

    this.setMode('latihan');
    this.showScreen('screen-workspace');

    this.loadCurrentPracticeWorkspaceProblem();
  }

  loadCurrentPracticeWorkspaceProblem() {
    const q = this.practiceQuestions[this.practiceIndex];
    if (!q) {
      this.finishPracticeSession();
      return;
    }

    const counter = document.getElementById('wsProblemCounter');
    if (counter) {
      counter.style.display = 'block';
      counter.textContent = `Soal ${this.practiceIndex + 1} / ${this.practiceQuestions.length}`;
    }

    this.startProblem(q.a, q.b);

    if (this.practiceFocus === 'wordProblems') {
      const instructionText = document.getElementById('wsInstructionText');
      if (instructionText) instructionText.textContent = `📖 Soal Cerita: ${q.prompt}`;
      const spongeSpeech = document.getElementById('wsSpongeSpeech');
      if (spongeSpeech) spongeSpeech.innerHTML = `Mari kita selesaikan soal cerita ini bersama-sama! Hitung angka satuan <strong>${this.onesA} + ${this.onesB}</strong> di Rumah Satuan (Pink) ya!`;
    } else {
      const instructionText = document.getElementById('wsInstructionText');
      if (instructionText) instructionText.textContent = `Latihan ${this.practiceIndex + 1}: Hitung ${q.a} + ${q.b} dengan Rumah Nanas & Penguin!`;
      const spongeSpeech = document.getElementById('wsSpongeSpeech');
      if (spongeSpeech) spongeSpeech.innerHTML = `Mulai dari Rumah Satuan (Pink) ya! Berapa hasil dari <strong>${this.onesA} + ${this.onesB}</strong>?`;
    }
  }

  finishPracticeSession() {
    this.isPracticeSession = false;
    const elapsed = Math.floor((Date.now() - this.practiceStartTime) / 1000);
    const score = Math.round((this.practiceCorrectCount / this.practiceQuestions.length) * 100);

    this.recordSession({
      mode: 'latihan',
      focus: this.practiceFocus,
      focusTitle: this.practiceFocus === 'wordProblems' ? 'Soal Cerita' : 'Penjumlahan Menyimpan',
      total: this.practiceQuestions.length,
      correct: this.practiceCorrectCount,
      wrong: this.practiceWrongCount,
      score: score,
      durationSec: elapsed,
      hintsUsed: this.practiceHintsUsed || 0
    });

    this.showScreen('screen-practice');
    document.getElementById('practiceSetupView').style.display = 'none';
    document.getElementById('practicePlaceValueView').style.display = 'none';
    document.getElementById('practiceRegroupingView').style.display = 'none';
    document.getElementById('practiceQuizView').style.display = 'none';
    document.getElementById('practiceSummaryView').style.display = 'block';

    const sumCorrect = document.getElementById('sumPracCorrect');
    const sumWrong = document.getElementById('sumPracWrong');
    const sumScore = document.getElementById('sumPracScore');
    const sumTime = document.getElementById('sumPracTime');
    const sumSub = document.getElementById('practiceSummarySubtitle');

    if (sumCorrect) sumCorrect.textContent = this.practiceCorrectCount;
    if (sumWrong) sumWrong.textContent = this.practiceWrongCount;
    if (sumScore) sumScore.textContent = score;

    const mins = String(Math.floor(elapsed / 60)).padStart(2, '0');
    const secs = String(elapsed % 60).padStart(2, '0');
    if (sumTime) sumTime.textContent = `${mins}:${secs}`;

    if (sumSub) {
      sumSub.textContent = `Hebat ${this.state.studentName || 'Murid Juara'}! Kamu telah menuntaskan seluruh latihan manipulatif bersama Penguin!`;
    }

    window.soundEngine.playLevelUp();
    this.showAchievementModal('🎉 LATIHAN SELESAI!', `Hebat! Kamu telah menuntaskan seluruh soal latihan manipulatif dengan skor ${score}!`);
  }

  /* --- Fitur 3: Practice Quiz Mode (Angka Simpan) --- */
  startPracticeQuiz() {
    this.practiceQuestions = this.generatePracticeQuestions(this.practiceFocus, this.practiceCount);
    this.practiceIndex = 0;
    this.practiceCorrectCount = 0;
    this.practiceWrongCount = 0;
    this.practiceScore = 0;
    this.practiceHintsUsed = 0;
    this.practiceStartTime = Date.now();

    document.getElementById('practiceSetupView').style.display = 'none';
    document.getElementById('practicePlaceValueView').style.display = 'none';
    document.getElementById('practiceRegroupingView').style.display = 'none';
    document.getElementById('practiceSummaryView').style.display = 'none';
    document.getElementById('practiceQuizView').style.display = 'block';

    const focusTitles = {
      carryDigit: 'Fokus: Angka Simpan',
      withCarry: 'Fokus: Penjumlahan Menyimpan',
      wordProblems: 'Fokus: Soal Cerita'
    };
    const focusBadge = document.getElementById('practiceQuizFocusBadge');
    if (focusBadge) {
      focusBadge.textContent = focusTitles[this.practiceFocus] || 'Fokus: Latihan Soal';
    }

    this.renderCurrentPracticeQuestion();
    this.startPracticeTimer();
  }

  startPracticeTimer() {
    clearInterval(this.practiceTimerInterval);
    const timerElem = document.getElementById('practiceTimer');
    this.practiceTimerInterval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - this.practiceStartTime) / 1000);
      const mins = String(Math.floor(elapsed / 60)).padStart(2, '0');
      const secs = String(elapsed % 60).padStart(2, '0');
      if (timerElem) timerElem.textContent = `⏱️ ${mins}:${secs}`;
    }, 1000);
  }

  generatePracticeQuestions(focus, count) {
    const list = [];
    const used = new Set();

    for (let i = 0; i < count; i++) {
      let q = null;
      let attempts = 0;

      while (attempts < 50) {
        attempts++;
        if (focus === 'wordProblems') {
          const templates = [
            { txt: (a, b) => `SpongeBob menangkap ${a} ubur-ubur di pagi hari dan ${b} ubur-ubur di sore hari. Berapa total seluruh ubur-ubur yang ditangkap SpongeBob?`, a: 28, b: 17 },
            { txt: (a, b) => `Krusty Krab membuat ${a} Krabby Patty keju dan ${b} Krabby Patty pedas. Berapa total Krabby Patty yang dibuat?`, a: 36, b: 28 },
            { txt: (a, b) => `Patrick mengumpulkan ${a} kerang laut dan Squidward mengumpulkan ${b} batu karang. Berapa total koleksi mereka?`, a: 45, b: 38 },
            { txt: (a, b) => `Tuan Krab menghitung ${a} koin perak dan ${b} koin emas di peti harta karun. Berapa total seluruh koin?`, a: 54, b: 29 },
            { txt: (a, b) => `Sandy mengumpulkan ${a} biji kenari dan ${b} biji pohon ek di dalam kubah. Berapa total biji yang dikumpulkan Sandy?`, a: 38, b: 27 }
          ];
          const tpl = templates[i % templates.length];
          const a = tpl.a + (i * 2);
          const b = tpl.b + (i * 3);
          const key = `wp_${a}_${b}`;
          if (!used.has(key)) {
            used.add(key);
            q = {
              a: a,
              b: b,
              prompt: tpl.txt(a, b),
              answer: a + b
            };
            break;
          }
        } else {
          // Penjumlahan Menyimpan (2-digit with carry)
          const t1 = Math.floor(Math.random() * 4) + 1;
          const t2 = Math.floor(Math.random() * 4) + 1;
          const o1 = Math.floor(Math.random() * 5) + 5; // 5-9
          const o2 = Math.floor(Math.random() * 5) + 5; // 5-9
          const a = t1 * 10 + o1;
          const b = t2 * 10 + o2;
          const key = `wc_${a}_${b}`;
          if (!used.has(key)) {
            used.add(key);
            q = {
              a: a,
              b: b,
              prompt: `Berapakah hasil dari <strong>${a} + ${b}</strong>?`,
              answer: a + b
            };
            break;
          }
        }
      }

      if (!q) {
        q = {
          a: 27,
          b: 18,
          prompt: `Hitunglah: <strong>27 + 18 = ?</strong>`,
          answer: 45
        };
      }
      list.push(q);
    }
    return list;
  }

  renderCurrentPracticeQuestion() {
    const q = this.practiceQuestions[this.practiceIndex];
    if (!q) return;

    const counter = document.getElementById('practiceQuizCounter');
    if (counter) counter.textContent = `Soal ${this.practiceIndex + 1} dari ${this.practiceQuestions.length}`;

    const scoreBadge = document.getElementById('practiceScoreBadge');
    if (scoreBadge) scoreBadge.textContent = `⭐ Skor: ${this.practiceScore}`;

    const progFill = document.getElementById('practiceProgressFill');
    if (progFill) progFill.style.width = `${((this.practiceIndex) / this.practiceQuestions.length) * 100}%`;

    const promptText = document.getElementById('practicePromptText');
    if (promptText) promptText.innerHTML = q.prompt;

    const visualCard = document.getElementById('practiceVisualCard');
    if (visualCard) visualCard.innerHTML = q.visual || '';

    const inputAnswer = document.getElementById('practiceInputAnswer');
    if (inputAnswer) {
      inputAnswer.value = '';
      inputAnswer.disabled = false;
      inputAnswer.focus();
    }

    const feedbackBox = document.getElementById('practiceFeedbackBox');
    if (feedbackBox) feedbackBox.style.display = 'none';

    const btnCheck = document.getElementById('btnPracticeCheck');
    const btnNext = document.getElementById('btnPracticeNext');
    if (btnCheck) btnCheck.style.display = 'inline-flex';
    if (btnNext) btnNext.style.display = 'none';
  }

  checkPracticeAnswer() {
    const q = this.practiceQuestions[this.practiceIndex];
    const inputElem = document.getElementById('practiceInputAnswer');
    const userVal = parseInt((inputElem?.value || '').trim(), 10);

    if (isNaN(userVal)) {
      this.showToast('Ketik jawabanmu terlebih dahulu!', 'warning');
      window.soundEngine.playErrorBounce();
      return;
    }

    const feedbackBox = document.getElementById('practiceFeedbackBox');
    const feedbackIcon = document.getElementById('practiceFeedbackIcon');
    const feedbackText = document.getElementById('practiceFeedbackText');
    const btnCheck = document.getElementById('btnPracticeCheck');
    const btnNext = document.getElementById('btnPracticeNext');

    if (userVal === q.answer) {
      window.soundEngine.playCorrect();
      this.practiceCorrectCount++;
      const points = Math.round(100 / this.practiceQuestions.length);
      this.practiceScore += points;

      if (feedbackBox && feedbackText && feedbackIcon) {
        feedbackBox.className = 'growth-feedback-box correct show';
        feedbackBox.style.display = 'flex';
        feedbackIcon.textContent = '✨';
        feedbackText.innerHTML = `<strong>Luar biasa!</strong> Jawabanmu <strong>${userVal}</strong> tepat sekali! Kamu memahami penjumlahan dengan menyimpan dengan sangat baik.`;
      }

      if (inputElem) inputElem.disabled = true;
      if (btnCheck) btnCheck.style.display = 'none';
      if (btnNext) btnNext.style.display = 'inline-flex';

      const scoreBadge = document.getElementById('practiceScoreBadge');
      if (scoreBadge) scoreBadge.textContent = `⭐ Skor: ${this.practiceScore}`;

      window.soundEngine.speak('Hebat! Jawabanmu benar.');
    } else {
      window.soundEngine.playWrong();
      this.practiceWrongCount++;

      if (feedbackBox && feedbackText && feedbackIcon) {
        feedbackBox.className = 'growth-feedback-box wrong show';
        feedbackBox.style.display = 'flex';
        feedbackIcon.textContent = '🌱';
        feedbackText.innerHTML = `<strong>Belum tepat, tapi jangan menyerah!</strong> Periksa kembali penjumlahan satuan dan angka simpanmu.`;
      }

      window.soundEngine.speak('Belum tepat. Coba periksa lagi.');
    }
  }

  triggerPracticeHint() {
    const q = this.practiceQuestions[this.practiceIndex];
    if (!q) return;

    window.soundEngine.playPop();
    this.practiceHintsUsed++;

    const feedbackBox = document.getElementById('practiceFeedbackBox');
    const feedbackIcon = document.getElementById('practiceFeedbackIcon');
    const feedbackText = document.getElementById('practiceFeedbackText');

    if (feedbackBox && feedbackText && feedbackIcon) {
      feedbackBox.className = 'growth-feedback-box hint show';
      feedbackBox.style.display = 'flex';
      feedbackIcon.textContent = '💡';
      feedbackText.innerHTML = `<strong>Petunjuk:</strong> ${q.hint1 || 'Jumlahkan satuan terlebih dahulu lalu simpan 1 ke puluhan.'}`;
    }
  }

  advancePracticeQuestion() {
    this.practiceIndex++;
    if (this.practiceIndex < this.practiceQuestions.length) {
      this.renderCurrentPracticeQuestion();
    } else {
      this.finishPracticeQuiz();
    }
  }

  finishPracticeQuiz() {
    clearInterval(this.practiceTimerInterval);
    window.soundEngine.playSuccessFanfare();

    const elapsed = Math.floor((Date.now() - this.practiceStartTime) / 1000);
    const mins = String(Math.floor(elapsed / 60)).padStart(2, '0');
    const secs = String(elapsed % 60).padStart(2, '0');
    const timeStr = `${mins}:${secs}`;
    const finalScore = Math.min(100, Math.round((this.practiceCorrectCount / this.practiceQuestions.length) * 100));

    document.getElementById('sumPracCorrect').textContent = this.practiceCorrectCount;
    document.getElementById('sumPracWrong').textContent = this.practiceWrongCount;
    document.getElementById('sumPracScore').textContent = finalScore;
    document.getElementById('sumPracTime').textContent = timeStr;

    this.recordSession({
      mode: 'latihan',
      focus: this.practiceFocus,
      focusTitle: this.practiceFocus === 'wordProblems' ? 'Soal Cerita' : 'Penjumlahan Menyimpan',
      total: this.practiceQuestions.length,
      correct: this.practiceCorrectCount,
      wrong: this.practiceWrongCount,
      score: finalScore,
      durationSec: elapsed,
      hintsUsed: this.practiceHintsUsed,
      stages: {
        placeValue: true,
        onesAddition: true,
        regrouping: true,
        carryDigit: true,
        withCarry: finalScore >= 70,
        tensAddition: true,
        finalResult: finalScore >= 70
      }
    });

    document.getElementById('practiceQuizView').style.display = 'none';
    document.getElementById('practiceSummaryView').style.display = 'block';
  }

  /* ==========================================================================
     FITUR TANTANGAN (LEVEL 1 - 3 & BANYUMAS CULTURE)
     ========================================================================== */
  openChallengePicker() {
    this.showScreen('screen-challenge');
    document.getElementById('challengePickerView').style.display = 'block';
    document.getElementById('challengeQuizView').style.display = 'none';
    this.renderChallengeLevelCards();
  }

  renderChallengeLevelCards() {
    const unlocked = this.state.settings?.unlockAllLevels 
      ? [1, 2, 3] 
      : (this.state.unlockedLevels || [1]);

    for (let lvl = 1; lvl <= 3; lvl++) {
      const card = document.getElementById(`cardLevel${lvl}`);
      const icon = document.getElementById(`iconLevel${lvl}`);
      if (card) {
        if (unlocked.includes(lvl)) {
          card.className = 'challenge-level-card unlocked' + (this.challengeCurrentLevel === lvl ? ' active-level' : '');
          if (icon) icon.textContent = lvl === 1 ? '⚡' : (lvl === 2 ? '🐧' : '🍘');
        } else {
          card.className = 'challenge-level-card locked';
          if (icon) icon.textContent = '🔒';
        }
      }
    }
  }

  bindChallengeController() {
    for (let lvl = 1; lvl <= 3; lvl++) {
      document.getElementById(`cardLevel${lvl}`)?.addEventListener('click', () => {
        const unlocked = this.state.settings?.unlockAllLevels 
          ? [1, 2, 3] 
          : (this.state.unlockedLevels || [1]);

        if (!unlocked.includes(lvl)) {
          window.soundEngine.playErrorBounce();
          this.showToast(`Level ${lvl} masih terkunci! Selesaikan Level ${lvl - 1} terlebih dahulu.`, 'warning');
          return;
        }

        window.soundEngine.playPop();
        this.challengeCurrentLevel = lvl;
        this.renderChallengeLevelCards();

        const levelInfo = [
          { title: 'Level 1: Dua Digit Tanpa Simpan', desc: 'Hitung penjumlahan bentuk susun langsung tanpa bantuan (tanpa Penguin).' },
          { title: 'Level 2: Dua Digit Menyimpan', desc: 'Penjumlahan bentuk susun dengan angka simpan di atas kolom puluhan.' },
          { title: 'Level 3: Soal Cerita Budaya Banyumas', desc: 'Hitung total makanan & kerajinan khas Banyumas (Mendoan, Getuk Goreng, Es Dawet) dengan lembar bersusun!' }
        ];

        const info = levelInfo[lvl - 1];
        const titleElem = document.getElementById('selectedLevelTitle');
        const descElem = document.getElementById('selectedLevelDesc');
        if (titleElem) titleElem.textContent = info.title;
        if (descElem) descElem.textContent = info.desc;
      });
    }

    document.getElementById('btnStartSelectedLevel')?.addEventListener('click', () => {
      window.soundEngine.playPop();
      this.startChallengeLevel(this.challengeCurrentLevel);
    });

    document.getElementById('btnChallengeBack')?.addEventListener('click', () => {
      window.soundEngine.playPop();
      this.showScreen('screen-home');
    });

    document.getElementById('btnChallengeCheck')?.addEventListener('click', () => {
      this.checkChallengeAnswer();
    });

    document.getElementById('btnChallengeNext')?.addEventListener('click', () => {
      window.soundEngine.playPop();
      this.advanceChallengeQuestion();
    });

    document.getElementById('btnChallengeHint')?.addEventListener('click', () => {
      this.triggerChallengeHint();
    });

    document.getElementById('btnChallengeQuit')?.addEventListener('click', () => {
      if (confirm('Keluar dari tantangan? Progres level ini tidak akan tersimpan.')) {
        clearInterval(this.challengeTimerInterval);
        this.openChallengePicker();
      }
    });
  }

  generateChallengeQuestions(lvl) {
    const list = [];
    if (lvl === 1) {
      // Level 1: 2-digit without carry
      list.push({ a: 23, b: 14, ans: 37, prompt: '23 + 14 = __' });
      list.push({ a: 31, b: 25, ans: 56, prompt: '31 + 25 = __' });
      list.push({ a: 42, b: 34, ans: 76, prompt: '42 + 34 = __' });
      list.push({ a: 53, b: 24, ans: 77, prompt: '53 + 24 = __' });
      list.push({ a: 61, b: 18, ans: 79, prompt: '61 + 18 = __' });
    } else if (lvl === 2) {
      // Level 2: 2-digit with carry
      list.push({ a: 26, b: 37, ans: 63, prompt: '26 + 37 = __', carry: 1 });
      list.push({ a: 38, b: 27, ans: 65, prompt: '38 + 27 = __', carry: 1 });
      list.push({ a: 46, b: 17, ans: 63, prompt: '46 + 17 = __', carry: 1 });
      list.push({ a: 58, b: 24, ans: 82, prompt: '58 + 24 = __', carry: 1 });
      list.push({ a: 67, b: 15, ans: 82, prompt: '67 + 15 = __', carry: 1 });
    } else {
      // Level 3: Banyumas Culture Story Problems (Revisi 5: Ilustrasi Pendukung Soal Cerita)
      list.push({
        type: 'banyumas',
        key: 'mendoan',
        cultureName: 'Tempe Mendoan Sokaraja',
        icon: '🍘',
        story: 'Ibu menggoreng 28 potong Tempe Mendoan hangat di pagi hari dan 17 potong lagi di sore hari untuk pesanan wisatawan. Berapa total seluruh tempe mendoan yang digoreng Ibu?',
        a: 28,
        b: 17,
        ans: 45
      });
      list.push({
        type: 'banyumas',
        key: 'getuk_goreng',
        cultureName: 'Getuk Goreng Khas Sokaraja',
        icon: '🥮',
        story: 'Toko oleh-oleh Banyumas menjual 36 kotak Getuk Goreng rasa gula kelapa dan 28 kotak Getuk Goreng rasa cokelat. Berapa total kotak getuk goreng yang terjual?',
        a: 36,
        b: 28,
        ans: 64
      });
      list.push({
        type: 'banyumas',
        key: 'es_dawet',
        cultureName: 'Es Dawet Segar & Es Durian',
        icon: '🍧',
        story: 'Warung minuman khas Banyumas menjual 45 mangkuk Es Dawet segar dan 38 porsi Es Durian lezat. Berapa total porsi minuman khas yang terjual?',
        a: 45,
        b: 38,
        ans: 83
      });
      list.push({
        type: 'banyumas',
        key: 'soto_sokaraja',
        cultureName: 'Soto Sokaraja dengan Ketupat',
        icon: '🍲',
        story: 'Warung Soto Sokaraja menyiapkan 54 mangkuk Soto Daging dan 29 mangkuk Soto Ayam dengan sambal kacang gurih. Berapa total mangkuk soto yang disiapkan?',
        a: 54,
        b: 29,
        ans: 83
      });
      list.push({
        type: 'banyumas',
        key: 'batik_banyumas',
        cultureName: 'Kain Batik Banyumasan',
        icon: '🎨',
        story: 'Pengrajin Batik Banyumas berhasil membuat 38 lembar kain motif Jahe Puger dan 27 lembar kain motif Lumbon. Berapa total kain batik yang dibuat?',
        a: 38,
        b: 27,
        ans: 65
      });
    }
    return list;
  }

  startChallengeLevel(lvl) {
    this.challengeQuestions = this.generateChallengeQuestions(lvl);
    this.challengeIndex = 0;
    this.challengeCorrectCount = 0;
    this.challengeWrongCount = 0;
    this.challengeScore = 0;
    this.challengeStartTime = Date.now();

    document.getElementById('challengePickerView').style.display = 'none';
    document.getElementById('challengeQuizView').style.display = 'block';

    const lvlBadge = document.getElementById('challengeLevelBadge');
    if (lvlBadge) lvlBadge.textContent = `LEVEL ${lvl}`;

    clearInterval(this.challengeTimerInterval);
    const timerElem = document.getElementById('challengeTimer');
    this.challengeTimerInterval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - this.challengeStartTime) / 1000);
      const mins = String(Math.floor(elapsed / 60)).padStart(2, '0');
      const secs = String(elapsed % 60).padStart(2, '0');
      if (timerElem) timerElem.textContent = `⏱️ ${mins}:${secs}`;
    }, 1000);

    this.renderCurrentChallengeQuestion();
  }

  renderCurrentChallengeQuestion() {
    const q = this.challengeQuestions[this.challengeIndex];
    if (!q) return;

    const counter = document.getElementById('challengeQuizCounter');
    if (counter) counter.textContent = `Soal ${this.challengeIndex + 1} / ${this.challengeQuestions.length}`;

    const scoreVal = document.getElementById('challengeScoreVal');
    if (scoreVal) scoreVal.textContent = `⭐ ${this.challengeScore}`;

    const progFill = document.getElementById('challengeProgressFill');
    if (progFill) progFill.style.width = `${((this.challengeIndex) / this.challengeQuestions.length) * 100}%`;

    const stageContainer = document.getElementById('challengeStageContainer');
    if (!stageContainer) return;

    if (this.challengeCurrentLevel === 1) {
      // Level 1: Clean Vertical Board (Tanpa Simpan, No Penguin)
      stageContainer.innerHTML = `
        <div class="clean-vertical-board">
          <div class="math-sentence-display">${q.a} + ${q.b} = __</div>
          <div style="display:grid; grid-template-columns: 32px 50px 50px; row-gap:6px; font-family:var(--font-numbers); font-size:2.2rem; font-weight:900; color:#1e1b4b; align-items:center; justify-items:center;">
            <div style="grid-column:2; font-size:0.8rem; color:#64748b; font-weight:700;">PUL</div>
            <div style="grid-column:3; font-size:0.8rem; color:#64748b; font-weight:700;">SAT</div>
            
            <div style="grid-column:2;">${Math.floor(q.a / 10)}</div>
            <div style="grid-column:3;">${q.a % 10}</div>

            <div style="grid-column:1; color:#64748b;">+</div>
            <div style="grid-column:2;">${Math.floor(q.b / 10)}</div>
            <div style="grid-column:3;">${q.b % 10}</div>

            <div style="grid-column:1/span 3; width:100%; height:4px; background:#1e1b4b; margin:2px 0;"></div>

            <div style="grid-column:2/span 2; display:flex; justify-content:center; width:100%;">
              <input type="number" id="challengeInputAnswer" class="quiz-input-field" placeholder="?" autocomplete="off" style="width:120px;">
            </div>
          </div>
        </div>
      `;
    } else if (this.challengeCurrentLevel === 2) {
      // Level 2: Clean Vertical Board With Carry Slot
      stageContainer.innerHTML = `
        <div class="clean-vertical-board">
          <div class="math-sentence-display">${q.a} + ${q.b} = __</div>
          <div style="display:grid; grid-template-columns: 32px 50px 50px; row-gap:6px; font-family:var(--font-numbers); font-size:2.2rem; font-weight:900; color:#1e1b4b; align-items:center; justify-items:center;">
            <div style="grid-column:2; font-size:0.8rem; color:#64748b; font-weight:700;">PUL</div>
            <div style="grid-column:3; font-size:0.8rem; color:#64748b; font-weight:700;">SAT</div>
            
            <!-- Carry Box -->
            <div style="grid-column:2; width:44px; height:44px; border:2px dashed #b45309; border-radius:50%; background:#fef3c7; display:flex; align-items:center; justify-content:center; font-size:1.4rem; color:#b45309;" title="Angka Simpan">+1</div>

            <div style="grid-column:2;">${Math.floor(q.a / 10)}</div>
            <div style="grid-column:3;">${q.a % 10}</div>

            <div style="grid-column:1; color:#64748b;">+</div>
            <div style="grid-column:2;">${Math.floor(q.b / 10)}</div>
            <div style="grid-column:3;">${q.b % 10}</div>

            <div style="grid-column:1/span 3; width:100%; height:4px; background:#1e1b4b; margin:2px 0;"></div>

            <div style="grid-column:2/span 2; display:flex; justify-content:center; width:100%;">
              <input type="number" id="challengeInputAnswer" class="quiz-input-field" placeholder="?" autocomplete="off" style="width:120px;">
            </div>
          </div>
        </div>
      `;
    } else {
      // Level 3: Banyumas Culture Story Problem Worksheet with Rich Illustration
      const illustrationSvg = Mascots.getBanyumasIllustrationSvg(q.key || 'mendoan', 130, 95);

      stageContainer.innerHTML = `
        <div style="background:#ffffff; border:3px solid #fde68a; border-radius:var(--radius-lg); padding:20px; box-shadow:var(--shadow-md);">
          
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; margin-bottom:12px;">
            <div class="banyumas-culture-badge">${q.icon} Kebudayaan & Kuliner Khas Banyumas: ${q.cultureName}</div>
            <span style="font-size:0.85rem; color:#b45309; font-weight:700;">Soal Kontekstual Banyumas</span>
          </div>

          <!-- Story Narrative & Visual Illustration Card -->
          <div style="display:flex; gap:18px; align-items:center; margin-bottom:16px; flex-wrap:wrap;">
            <div class="banyumas-illustration-wrap" style="flex-shrink:0;">
              ${illustrationSvg}
            </div>
            <p style="flex:1; min-width:260px; font-size:1.15rem; font-weight:700; color:#1e1b4b; line-height:1.5; margin:0;">
              ${q.story}
            </p>
          </div>

          <div style="display:grid; grid-template-columns: 1fr 1fr; gap:16px;">
            <!-- Worksheet Column 1: Tentukan Bilangan -->
            <div class="banyumas-worksheet-step">
              <div class="banyumas-step-title">1. Tentukan Nilai Bilangan:</div>
              <div style="display:flex; flex-direction:column; gap:8px;">
                <div>Bilangan Pertama: <strong style="color:#2563eb; font-size:1.2rem;">${q.a}</strong> (${Math.floor(q.a/10)} Puluhan + ${q.a%10} Satuan)</div>
                <div>Bilangan Kedua: <strong style="color:#d97706; font-size:1.2rem;">${q.b}</strong> (${Math.floor(q.b/10)} Puluhan + ${q.b%10} Satuan)</div>
              </div>
            </div>

            <!-- Worksheet Column 2: Penjumlahan Bersusun -->
            <div class="banyumas-worksheet-step" style="display:flex; flex-direction:column; align-items:center;">
              <div class="banyumas-step-title">2. Hitung Penjumlahan Bersusun:</div>
              <div style="display:grid; grid-template-columns: 24px 44px 44px; row-gap:4px; font-family:var(--font-numbers); font-size:1.8rem; font-weight:900; align-items:center; justify-items:center;">
                <div style="grid-column:2; font-size:0.75rem; color:#854d0e;">(Simpan 1)</div>
                <div style="grid-column:2;">${Math.floor(q.a/10)}</div>
                <div style="grid-column:3;">${q.a%10}</div>
                <div style="grid-column:1; color:#64748b;">+</div>
                <div style="grid-column:2;">${Math.floor(q.b/10)}</div>
                <div style="grid-column:3;">${q.b%10}</div>
                <div style="grid-column:1/span 3; width:100%; height:3px; background:#1e1b4b;"></div>
              </div>
            </div>
          </div>

          <div style="text-align:center; margin-top:16px;">
            <label for="challengeInputAnswer" style="font-family:var(--font-display); font-weight:800; font-size:1.15rem; color:#1e1b4b; display:block; margin-bottom:6px;">
              Tuliskan Hasil Total Akhir:
            </label>
            <input type="number" id="challengeInputAnswer" class="quiz-input-field" placeholder="?" autocomplete="off" style="width:140px;">
          </div>
        </div>
      `;
    }

    const inputElem = document.getElementById('challengeInputAnswer');
    if (inputElem) {
      inputElem.value = '';
      inputElem.disabled = false;
      inputElem.focus();
      inputElem.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          const nextBtn = document.getElementById('btnChallengeNext');
          if (nextBtn && nextBtn.style.display !== 'none') {
            this.advanceChallengeQuestion();
          } else {
            this.checkChallengeAnswer();
          }
        }
      });
    }

    const fbBox = document.getElementById('challengeFeedbackBox');
    if (fbBox) fbBox.style.display = 'none';

    const btnCheck = document.getElementById('btnChallengeCheck');
    const btnNext = document.getElementById('btnChallengeNext');
    if (btnCheck) btnCheck.style.display = 'inline-flex';
    if (btnNext) btnNext.style.display = 'none';
  }

  checkChallengeAnswer() {
    const q = this.challengeQuestions[this.challengeIndex];
    const inputElem = document.getElementById('challengeInputAnswer');
    const userVal = parseInt((inputElem?.value || '').trim(), 10);

    if (isNaN(userVal)) {
      this.showToast('Ketik jawabanmu terlebih dahulu!', 'warning');
      window.soundEngine.playErrorBounce();
      return;
    }

    const fbBox = document.getElementById('challengeFeedbackBox');
    const fbIcon = document.getElementById('challengeFeedbackIcon');
    const fbText = document.getElementById('challengeFeedbackText');
    const btnCheck = document.getElementById('btnChallengeCheck');
    const btnNext = document.getElementById('btnChallengeNext');

    if (userVal === q.ans) {
      window.soundEngine.playCorrect();
      this.challengeCorrectCount++;
      this.challengeScore += 20;

      if (fbBox && fbIcon && fbText) {
        fbBox.className = 'growth-feedback-box correct show';
        fbBox.style.display = 'flex';
        fbIcon.textContent = '✨';
        fbText.innerHTML = `<strong>Tepat Sekali!</strong> Jawaban <strong>${userVal}</strong> benar!`;
      }

      if (inputElem) inputElem.disabled = true;
      if (btnCheck) btnCheck.style.display = 'none';
      if (btnNext) btnNext.style.display = 'inline-flex';

      const scoreVal = document.getElementById('challengeScoreVal');
      if (scoreVal) scoreVal.textContent = `⭐ ${this.challengeScore}`;
    } else {
      window.soundEngine.playWrong();
      this.challengeWrongCount++;

      if (fbBox && fbIcon && fbText) {
        fbBox.className = 'growth-feedback-box wrong show';
        fbBox.style.display = 'flex';
        fbIcon.textContent = '⚠️';
        fbText.innerHTML = `<strong>Belum tepat.</strong> Coba periksa kembali penjumlahan satuan dan angka simpanmu.`;
      }
    }
  }

  triggerChallengeHint() {
    const q = this.challengeQuestions[this.challengeIndex];
    window.soundEngine.playPop();
    const fbBox = document.getElementById('challengeFeedbackBox');
    const fbIcon = document.getElementById('challengeFeedbackIcon');
    const fbText = document.getElementById('challengeFeedbackText');

    if (fbBox && fbIcon && fbText) {
      fbBox.className = 'growth-feedback-box hint show';
      fbBox.style.display = 'flex';
      fbIcon.textContent = '💡';
      if (this.challengeCurrentLevel === 1) {
        fbText.innerHTML = `<strong>Petunjuk:</strong> Jumlahkan satuan ${q.a % 10} + ${q.b % 10} = ${(q.a % 10) + (q.b % 10)}, lalu jumlahkan puluhan ${Math.floor(q.a / 10)} + ${Math.floor(q.b / 10)} = ${Math.floor(q.a / 10) + Math.floor(q.b / 10)}.`;
      } else {
        fbText.innerHTML = `<strong>Petunjuk:</strong> Satuan ${q.a % 10} + ${q.b % 10} = ${(q.a % 10) + (q.b % 10)} &ge; 10 (simpan 1 ke puluhan). Total puluhan = 1 + ${Math.floor(q.a / 10)} + ${Math.floor(q.b / 10)}.`;
      }
    }
  }

  advanceChallengeQuestion() {
    this.challengeIndex++;
    if (this.challengeIndex < this.challengeQuestions.length) {
      this.renderCurrentChallengeQuestion();
    } else {
      this.finishChallengeLevel();
    }
  }

  finishChallengeLevel() {
    clearInterval(this.challengeTimerInterval);
    const score = Math.round((this.challengeCorrectCount / this.challengeQuestions.length) * 100);
    const elapsed = Math.floor((Date.now() - this.challengeStartTime) / 1000);

    const passed = score >= 60;
    const nextLvl = this.challengeCurrentLevel + 1;

    if (passed && nextLvl <= 3) {
      if (!this.state.unlockedLevels.includes(nextLvl)) {
        this.state.unlockedLevels.push(nextLvl);
        this.saveState();
        window.soundEngine.playLevelUp();
        this.showAchievementModal(`⭐ LEVEL ${nextLvl} TERBUKA!`, `Hebat! Kamu berhasil menuntaskan Level ${this.challengeCurrentLevel} dengan skor ${score} dan membuka Level ${nextLvl}!`);
      }
    }

    if (passed && this.challengeCurrentLevel === 3) {
      if (!this.state.achievements.includes('badge_master_banyumas')) {
        this.state.achievements.push('badge_master_banyumas');
        this.saveState();
        this.showAchievementModal('👑 BINTANG MASTER BANYUMAS', 'Selamat! Kamu telah menuntaskan seluruh tantangan matematika dan memecahkan Soal Cerita Budaya Banyumas!');
      }
      this.showScreen('screen-challenge-complete');
      return;
    }

    this.recordSession({
      mode: 'tantangan',
      focus: `level_${this.challengeCurrentLevel}`,
      focusTitle: `Tantangan Level ${this.challengeCurrentLevel}`,
      total: this.challengeQuestions.length,
      correct: this.challengeCorrectCount,
      wrong: this.challengeWrongCount,
      score: score,
      durationSec: elapsed,
      hintsUsed: 0,
      stages: {
        placeValue: true,
        onesAddition: true,
        regrouping: true,
        carryDigit: true,
        withCarry: passed,
        tensAddition: true,
        finalResult: passed
      }
    });

    this.openChallengePicker();
    this.showToast(`Level ${this.challengeCurrentLevel} selesai! Skor kamu: ${score}/100.`, passed ? 'success' : 'warning');
  }

  showAchievementModal(title, desc) {
    const titleElem = document.getElementById('achieveTitle');
    const descElem = document.getElementById('achieveDesc');
    if (titleElem) titleElem.textContent = title;
    if (descElem) descElem.textContent = desc;
    window.soundEngine.playAchievement();
    document.getElementById('modalAchievement')?.classList.add('active');
  }

  /* ==========================================================================
     PEMBUAT SOAL GURU CONTROLLER
     ========================================================================== */
  bindBuilderController() {
    const n1 = document.getElementById('bldNum1');
    const n2 = document.getElementById('bldNum2');
    const updateCarryInd = () => {
      const v1 = parseInt(n1?.value || '0', 10);
      const v2 = parseInt(n2?.value || '0', 10);
      const onesSum = (v1 % 10) + (v2 % 10);
      const ind = document.getElementById('bldCarryIndicator');
      if (ind) {
        if (onesSum >= 10) {
          ind.textContent = `Mode: Penjumlahan dengan Menyimpan (${v1 % 10} + ${v2 % 10} = ${onesSum} ≥ 10)`;
          ind.style.color = '#1d4ed8';
        } else {
          ind.textContent = `Mode: Penjumlahan Tanpa Simpan (${v1 % 10} + ${v2 % 10} = ${onesSum} < 10)`;
          ind.style.color = '#059669';
        }
      }
    };

    n1?.addEventListener('input', updateCarryInd);
    n2?.addEventListener('input', updateCarryInd);

    document.getElementById('btnBldGenerate')?.addEventListener('click', () => {
      window.soundEngine.playPop();
      this.generateBuilderProblems();
    });

    document.getElementById('btnBldRandomize')?.addEventListener('click', () => {
      window.soundEngine.playPop();
      if (n1) n1.value = Math.floor(Math.random() * 70) + 15;
      if (n2) n2.value = Math.floor(Math.random() * 70) + 15;
      updateCarryInd();
      this.generateBuilderProblems();
    });

    document.getElementById('btnBldShuffle')?.addEventListener('click', () => {
      window.soundEngine.playPop();
      this.builderProblems.sort(() => Math.random() - 0.5);
      this.renderBuilderTable();
      this.showToast('Urutan soal berhasil diacak!', 'info');
    });

    document.getElementById('btnBldReset')?.addEventListener('click', () => {
      window.soundEngine.playPop();
      if (n1) n1.value = 27;
      if (n2) n2.value = 18;
      updateCarryInd();
      this.generateBuilderProblems();
      this.showToast('Form pembuat soal di-reset ke awal.', 'info');
    });

    document.getElementById('btnBldSaveSet')?.addEventListener('click', () => {
      if (this.builderProblems.length === 0) {
        this.showToast('Belum ada soal untuk disimpan!', 'warning');
        return;
      }
      window.soundEngine.playCorrect();
      const newSet = {
        id: 'set_' + Date.now(),
        date: new Date().toLocaleDateString('id-ID'),
        count: this.builderProblems.length,
        problems: [...this.builderProblems]
      };
      this.state.customProblemSets.push(newSet);
      this.saveState();
      this.showToast(`Paket ${this.builderProblems.length} soal berhasil disimpan!`, 'success');
    });

    // Use in Practice (Penjumlahan Menyimpan)
    document.getElementById('btnBldUseInPractice')?.addEventListener('click', () => {
      if (this.builderProblems.length === 0) {
        this.showToast('Buat soal terlebih dahulu!', 'warning');
        return;
      }
      window.soundEngine.playPop();
      this.practiceQuestions = this.builderProblems.map(p => ({
        prompt: `Berapakah hasil dari <strong>${p.a} + ${p.b}</strong>?`,
        visual: `<div style="font-family:var(--font-numbers); font-size:2rem; font-weight:900; color:#1e1b4b; background:#f1f5f9; padding:6px 20px; border-radius:8px; display:inline-block;">${p.a} + ${p.b}</div>`,
        answer: p.a + p.b,
        hint1: `Hitung satuan: ${p.a % 10} + ${p.b % 10} = ${(p.a % 10) + (p.b % 10)}.`,
        hint2: `Simpan puluhan dan jumlahkan puluhan.`,
        hint3: `Kunci jawabannya adalah ${p.a + p.b}.`
      }));

      this.practiceFocus = 'withCarry';
      this.practiceIndex = 0;
      this.practiceCorrectCount = 0;
      this.practiceWrongCount = 0;
      this.practiceScore = 0;
      this.practiceStartTime = Date.now();

      this.showScreen('screen-practice');
      document.getElementById('practiceSetupView').style.display = 'none';
      document.getElementById('practicePlaceValueView').style.display = 'none';
      document.getElementById('practiceRegroupingView').style.display = 'none';
      document.getElementById('practiceQuizView').style.display = 'block';
      document.getElementById('practiceSummaryView').style.display = 'none';

      const badge = document.getElementById('practiceQuizFocusBadge');
      if (badge) badge.textContent = 'Fokus: Soal Guru Kustom';

      clearInterval(this.practiceTimerInterval);
      const timerElem = document.getElementById('practiceTimer');
      this.practiceTimerInterval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - this.practiceStartTime) / 1000);
        const mins = String(Math.floor(elapsed / 60)).padStart(2, '0');
        const secs = String(elapsed % 60).padStart(2, '0');
        if (timerElem) timerElem.textContent = `⏱️ ${mins}:${secs}`;
      }, 1000);

      this.renderCurrentPracticeQuestion();
    });

    // Use in Challenge
    document.getElementById('btnBldUseInChallenge')?.addEventListener('click', () => {
      if (this.builderProblems.length === 0) {
        this.showToast('Buat soal terlebih dahulu!', 'warning');
        return;
      }
      window.soundEngine.playPop();
      this.challengeQuestions = this.builderProblems.map(p => ({
        a: p.a,
        b: p.b,
        ans: p.a + p.b,
        prompt: `${p.a} + ${p.b} = __`
      }));

      this.challengeCurrentLevel = 2;
      this.challengeIndex = 0;
      this.challengeCorrectCount = 0;
      this.challengeWrongCount = 0;
      this.challengeScore = 0;
      this.challengeStartTime = Date.now();

      this.showScreen('screen-challenge');
      document.getElementById('challengePickerView').style.display = 'none';
      document.getElementById('challengeQuizView').style.display = 'block';

      const lvlBadge = document.getElementById('challengeLevelBadge');
      if (lvlBadge) lvlBadge.textContent = `TANTANGAN GURU`;

      clearInterval(this.challengeTimerInterval);
      const timerElem = document.getElementById('challengeTimer');
      this.challengeTimerInterval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - this.challengeStartTime) / 1000);
        const mins = String(Math.floor(elapsed / 60)).padStart(2, '0');
        const secs = String(elapsed % 60).padStart(2, '0');
        if (timerElem) timerElem.textContent = `⏱️ ${mins}:${secs}`;
      }, 1000);

      this.renderCurrentChallengeQuestion();
    });

    document.getElementById('btnBldAddSingle')?.addEventListener('click', () => {
      const a = Math.floor(Math.random() * 50) + 15;
      const b = Math.floor(Math.random() * 50) + 15;
      this.builderProblems.push({
        a,
        b,
        sum: a + b,
        hasCarry: (a % 10) + (b % 10) >= 10
      });
      this.renderBuilderTable();
      window.soundEngine.playPop();
    });

    document.getElementById('btnCancelEditProb')?.addEventListener('click', () => {
      document.getElementById('modalEditProblem')?.classList.remove('active');
    });

    document.getElementById('btnSaveEditProb')?.addEventListener('click', () => {
      const n1 = parseInt(document.getElementById('editNum1')?.value || '0', 10);
      const n2 = parseInt(document.getElementById('editNum2')?.value || '0', 10);
      if (isNaN(n1) || isNaN(n2) || n1 < 0 || n2 < 0) {
        alert('Masukkan angka valid');
        return;
      }
      if (this.activeEditIndex >= 0 && this.activeEditIndex < this.builderProblems.length) {
        this.builderProblems[this.activeEditIndex] = {
          a: n1,
          b: n2,
          sum: n1 + n2,
          hasCarry: (n1 % 10) + (n2 % 10) >= 10
        };
        this.renderBuilderTable();
      }
      document.getElementById('modalEditProblem')?.classList.remove('active');
    });
  }

  generateBuilderProblems() {
    const baseA = parseInt(document.getElementById('bldNum1')?.value || '27', 10);
    const baseB = parseInt(document.getElementById('bldNum2')?.value || '18', 10);
    const count = parseInt(document.getElementById('bldCount')?.value || '10', 10);
    const diff = document.getElementById('bldDifficulty')?.value || 'sedang';

    this.builderProblems = [];
    const used = new Set();

    this.builderProblems.push({
      a: baseA,
      b: baseB,
      sum: baseA + baseB,
      hasCarry: (baseA % 10) + (baseB % 10) >= 10
    });
    used.add(`${baseA}_${baseB}`);

    while (this.builderProblems.length < count) {
      let a = 0, b = 0;
      if (diff === 'mudah') {
        a = Math.floor(Math.random() * 40) + 12;
        b = Math.floor(Math.random() * 40) + 12;
      } else if (diff === 'sedang') {
        a = Math.floor(Math.random() * 60) + 20;
        b = Math.floor(Math.random() * 60) + 15;
      } else {
        a = Math.floor(Math.random() * 200) + 50;
        b = Math.floor(Math.random() * 200) + 50;
      }

      const key = `${a}_${b}`;
      if (!used.has(key)) {
        used.add(key);
        this.builderProblems.push({
          a,
          b,
          sum: a + b,
          hasCarry: (a % 10) + (b % 10) >= 10
        });
      }
    }

    this.renderBuilderTable();
  }

  renderBuilderTable() {
    const tbody = document.getElementById('bldTableBody');
    const countBadge = document.getElementById('bldTableCount');
    if (countBadge) countBadge.textContent = this.builderProblems.length;
    if (!tbody) return;

    if (this.builderProblems.length === 0) {
      tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; color:#94a3b8; padding:20px;">Belum ada soal terbuat. Klik tombol Buat Soal Otomatis!</td></tr>`;
      return;
    }

    let html = '';
    this.builderProblems.forEach((p, idx) => {
      html += `
        <tr>
          <td style="font-weight:700;">${idx + 1}</td>
          <td style="font-family:var(--font-numbers); font-weight:800; font-size:1.1rem; color:#1e1b4b;">${p.a} + ${p.b}</td>
          <td style="font-family:var(--font-numbers); font-weight:800; color:#059669;">${p.sum}</td>
          <td>
            <span class="carry-pill ${p.hasCarry ? 'yes' : 'no'}">
              ${p.hasCarry ? 'Ya (Simpan)' : 'Tanpa Simpan'}
            </span>
          </td>
          <td>
            <div style="display:flex; gap:6px;">
              <button class="btn btn-secondary btn-sm" onclick="window.app.editBuilderProblem(${idx})" title="Edit Soal">✏️</button>
              <button class="btn btn-secondary btn-sm" onclick="window.app.deleteBuilderProblem(${idx})" title="Hapus Soal" style="color:#dc2626;">🗑️</button>
            </div>
          </td>
        </tr>
      `;
    });
    tbody.innerHTML = html;
  }

  editBuilderProblem(idx) {
    this.activeEditIndex = idx;
    const p = this.builderProblems[idx];
    if (!p) return;

    const n1 = document.getElementById('editNum1');
    const n2 = document.getElementById('editNum2');
    if (n1) n1.value = p.a;
    if (n2) n2.value = p.b;

    document.getElementById('modalEditProblem')?.classList.add('active');
  }

  deleteBuilderProblem(idx) {
    window.soundEngine.playPop();
    this.builderProblems.splice(idx, 1);
    this.renderBuilderTable();
  }

  /* ==========================================================================
     PETUNJUK BERMAIN 10 LANGKAH
     ========================================================================== */
  bindGuideController() {
    const dotsContainer = document.getElementById('guideStepDots');
    if (dotsContainer) {
      let dotsHtml = '';
      for (let i = 1; i <= 10; i++) {
        dotsHtml += `<div class="step-indicator-dot ${i === 1 ? 'active' : ''}" data-step="${i}" onclick="window.app.setGuideStep(${i})"></div>`;
      }
      dotsContainer.innerHTML = dotsHtml;
    }

    document.getElementById('btnGuidePrev')?.addEventListener('click', () => {
      if (this.guideCurrentStep > 1) {
        this.setGuideStep(this.guideCurrentStep - 1);
      }
    });

    document.getElementById('btnGuideNext')?.addEventListener('click', () => {
      if (this.guideCurrentStep < 10) {
        this.setGuideStep(this.guideCurrentStep + 1);
      } else {
        window.soundEngine.playPop();
        this.setMode('belajar');
        this.startProblem(27, 18);
        this.showScreen('screen-workspace');
      }
    });

    document.getElementById('btnGuideHome')?.addEventListener('click', () => {
      window.soundEngine.playPop();
      this.showScreen('screen-home');
    });
  }

  setGuideStep(stepNum) {
    this.guideCurrentStep = stepNum;
    window.soundEngine.playPop();

    const stepsData = [
      {
        icon: '📚',
        title: '1. Pilih MULAI BELAJAR',
        desc: 'Buka menu MULAI BELAJAR dari beranda untuk masuk ke papan permainan matematika interaktif.',
        visual: '💡 Siap belajar bersama SpongeBob & Penguin!'
      },
      {
        icon: '🏷️',
        title: '2. Kenali Puluhan dan Satuan',
        desc: 'Rumah Nanas Orange-Kuning di kiri bernilai Puluhan (10), dan Rumah Nanas Pink-Cream di kanan bernilai Satuan (1).',
        visual: '🏠 Rumah Puluhan (Orange) │ 🏠 Rumah Satuan (Pink)'
      },
      {
        icon: '➕',
        title: '3. Hitung Satuan Terlebih Dahulu',
        desc: 'Selalu mulai menjumlahkan dari kolom satuan di sebelah kanan (contoh: 7 + 8).',
        visual: '7 Satuan + 8 Satuan = 15'
      },
      {
        icon: '🔢',
        title: '4. Buat Hasil Satuan pada Keypad',
        desc: 'Ketik hasil penjumlahan satuan pada keypad digital di sebelah kanan lalu tekan MASUKKAN.',
        visual: 'Ketik "15" pada Keypad ➜'
      },
      {
        icon: '🔄',
        title: '5. Pisahkan Angka Simpan',
        desc: 'Jika hasil satuan ≥ 10, muncul 2 bola angka: 1 simpan (puluhan) dan 5 satuan.',
        visual: '🔵 1 Simpan │ 🟡 5 Satuan'
      },
      {
        icon: '🐧',
        title: '6. Seret Angka Simpan ke Penguin',
        desc: 'Tarik atau klik bola angka simpan (1) ke Sarang Penguin di Jalur Simpan tengah!',
        visual: '🐧 "Aku siap menjaga angka simpanmu!"'
      },
      {
        icon: '🚀',
        title: '7. Tekan JALANKAN PENGUIN',
        desc: 'Penguin akan meluncur melalui Jalur Simpan (Naik ➜ Belok ➜ Ke Kiri) mengantar angka simpan.',
        visual: '🐧 Meluncur Naik ➜ Belok ➜ Ke Kiri ➜'
      },
      {
        icon: '⭐',
        title: '8. Letakkan Angka Simpan di Rumah Puluhan',
        desc: 'Angka simpan mendarat di Slot Simpan Puluhan dan siap dijumlahkan bersama puluhan lainnya.',
        visual: '⭐ Slot Angka Simpan Terisi (+1)'
      },
      {
        icon: '➕',
        title: '9. Hitung Hasil Puluhan',
        desc: 'Jumlahkan seluruh angka puluhan: 1 (simpan) + 2 + 1 = 4 pada keypad digital.',
        visual: '1 + 2 + 1 = 4 Puluhan'
      },
      {
        icon: '🎉',
        title: '10. Isi Hasil Akhir & Tekan SELESAI',
        desc: 'Hasil akhir penjumlahan adalah 45! Kamu berhasil memahami konsep penjumlahan dengan menyimpan!',
        visual: '✨ 27 + 18 = 45 (Selesai Sempurna!)'
      }
    ];

    const cur = stepsData[stepNum - 1] || stepsData[0];
    const badge = document.getElementById('guideStepBadge');
    const icon = document.getElementById('guideStepIcon');
    const title = document.getElementById('guideStepTitle');
    const desc = document.getElementById('guideStepDesc');
    const visual = document.getElementById('guideStepVisual');
    const btnPrev = document.getElementById('btnGuidePrev');
    const btnNext = document.getElementById('btnGuideNext');

    if (badge) badge.textContent = `Langkah ${stepNum} / 10`;
    if (icon) icon.textContent = cur.icon;
    if (title) title.textContent = cur.title;
    if (desc) desc.innerHTML = cur.desc;
    if (visual) visual.innerHTML = cur.visual;

    if (btnPrev) btnPrev.disabled = stepNum === 1;
    if (btnNext) {
      btnNext.innerHTML = stepNum === 10 ? 'MULAI PRAKTIK SEKARANG ➜' : 'SELANJUTNYA ▶';
      btnNext.className = stepNum === 10 ? 'btn btn-green' : 'btn btn-primary';
    }

    document.querySelectorAll('.step-indicator-dot').forEach(dot => {
      const s = parseInt(dot.getAttribute('data-step') || '1', 10);
      dot.className = `step-indicator-dot ${s === stepNum ? 'active' : ''}`;
    });

    window.soundEngine.speak(cur.title);
  }

  /* ==========================================================================
     MODE DEMONSTRASI GURU
     ========================================================================== */
  bindDemoController() {
    document.getElementById('btnDemoPrev')?.addEventListener('click', () => {
      if (this.demoCurrentStep > 1) {
        this.setDemoStep(this.demoCurrentStep - 1);
      }
    });

    document.getElementById('btnDemoNext')?.addEventListener('click', () => {
      if (this.demoCurrentStep < 8) {
        this.setDemoStep(this.demoCurrentStep + 1);
      }
    });

    document.getElementById('btnDemoPlay')?.addEventListener('click', () => {
      this.startDemoAutoPlay();
    });

    document.getElementById('btnDemoPause')?.addEventListener('click', () => {
      this.pauseDemoAutoPlay();
    });

    document.getElementById('btnDemoReset')?.addEventListener('click', () => {
      this.pauseDemoAutoPlay();
      this.setDemoStep(1);
    });
  }

  startDemoAutoPlay() {
    this.demoIsPlaying = true;
    document.getElementById('btnDemoPlay').style.display = 'none';
    document.getElementById('btnDemoPause').style.display = 'inline-flex';

    clearInterval(this.demoAutoPlayInterval);
    this.demoAutoPlayInterval = setInterval(() => {
      if (this.demoCurrentStep < 8) {
        this.setDemoStep(this.demoCurrentStep + 1);
      } else {
        this.pauseDemoAutoPlay();
      }
    }, 3200);
  }

  pauseDemoAutoPlay() {
    this.demoIsPlaying = false;
    clearInterval(this.demoAutoPlayInterval);
    const btnPlay = document.getElementById('btnDemoPlay');
    const btnPause = document.getElementById('btnDemoPause');
    if (btnPlay) btnPlay.style.display = 'inline-flex';
    if (btnPause) btnPause.style.display = 'none';
  }

  setDemoStep(stepNum) {
    this.demoCurrentStep = stepNum;
    window.soundEngine.playPop();

    const pill = document.getElementById('demoStepPill');
    const desc = document.getElementById('demoDescText');
    const stage = document.getElementById('demoVisualStage');

    const steps = [
      {
        name: 'Tahap 1: Mengenali Bilangan',
        desc: '1. Mengenali bilangan yang akan dijumlahkan: 27 (2 Puluhan, 7 Satuan) dan 18 (1 Puluhan, 8 Satuan).',
        visual: `
          <div style="display:flex; gap:20px; align-items:center;">
            <div style="background:#fef08a; border:3px solid #b45309; padding:14px 20px; border-radius:12px; font-family:var(--font-numbers); font-size:2rem; font-weight:800; color:#78350f;">27</div>
            <span style="font-size:2.5rem; font-weight:900;">+</span>
            <div style="background:#fbcfe8; border:3px solid #db2777; padding:14px 20px; border-radius:12px; font-family:var(--font-numbers); font-size:2rem; font-weight:800; color:#831843;">18</div>
          </div>
        `
      },
      {
        name: 'Tahap 2: Memisahkan Puluhan & Satuan',
        desc: '2. Memisahkan nilai tempat: Puluhan (2 & 1) di Rumah Nanas Puluhan (Orange), Satuan (7 & 8) di Rumah Nanas Satuan (Pink).',
        visual: `
          <div style="display:grid; grid-template-columns: 150px 150px; gap:20px;">
            <div style="background:#fef3c7; border:2px dashed #d97706; padding:10px; border-radius:8px;">
              <div style="font-size:0.8rem; font-weight:800; color:#b45309;">🏠 PULUHAN</div>
              <div style="display:flex; gap:8px; justify-content:center; margin-top:8px;">
                <div class="digit-ball digit-ball-purple">2</div>
                <div class="digit-ball digit-ball-purple">1</div>
              </div>
            </div>
            <div style="background:#ffe4e6; border:2px dashed #f472b6; padding:10px; border-radius:8px;">
              <div style="font-size:0.8rem; font-weight:800; color:#db2777;">🏠 SATUAN</div>
              <div style="display:flex; gap:8px; justify-content:center; margin-top:8px;">
                <div class="digit-ball digit-ball-amber">7</div>
                <div class="digit-ball digit-ball-amber">8</div>
              </div>
            </div>
          </div>
        `
      },
      {
        name: 'Tahap 3: Menjumlahkan Satuan',
        desc: '3. Menjumlahkan digit satuan terlebih dahulu: 7 + 8 = 15.',
        visual: `
          <div style="display:flex; align-items:center; gap:12px;">
            <div class="digit-ball digit-ball-amber" style="width:54px; height:54px; font-size:1.8rem;">7</div>
            <span style="font-size:1.8rem; font-weight:800;">+</span>
            <div class="digit-ball digit-ball-amber" style="width:54px; height:54px; font-size:1.8rem;">8</div>
            <span style="font-size:1.8rem; font-weight:800;">=</span>
            <div style="background:#1e1b4b; color:#fbbf24; padding:8px 18px; border-radius:8px; font-family:var(--font-numbers); font-size:2rem; font-weight:900;">15</div>
          </div>
        `
      },
      {
        name: 'Tahap 4: Mendeteksi Hasil ≥ 10',
        desc: '4. Karena hasil satuan 15 ≥ 10, satu kolom satuan tidak dapat menampung dua digit. Maka dilakukan REGROUPING.',
        visual: `
          <div style="background:#fee2e2; border:2px solid #ef4444; color:#991b1b; padding:12px 24px; border-radius:8px; font-weight:800; font-size:1.2rem;">
            ⚠️ 15 ≥ 10 ➜ Perlu Teknik Menyimpan bersama Penguin!
          </div>
        `
      },
      {
        name: 'Tahap 5: Membentuk Angka Simpan',
        desc: '5. Angka 15 dipisahkan menjadi 1 Puluhan yang harus disimpan dan 5 Satuan yang tetap di Rumah Nanas Satuan.',
        visual: `
          <div style="display:flex; gap:20px; align-items:center;">
            <div class="digit-ball digit-ball-carry" style="width:56px; height:56px; font-size:1.8rem;" title="1 Puluhan Simpan">1</div>
            <span style="font-weight:800; font-size:1.2rem;">(Simpan via Penguin)</span>
            <span style="font-size:1.5rem;">&</span>
            <div class="digit-ball digit-ball-amber" style="width:56px; height:56px; font-size:1.8rem;" title="5 Satuan">5</div>
            <span style="font-weight:800; font-size:1.2rem;">(Rumah Satuan)</span>
          </div>
        `
      },
      {
        name: 'Tahap 6: Pengiriman via Penguin (Naik ➜ Belok ➜ Ke Kiri)',
        desc: '6. Maskot Penguin membawa angka simpan 1 meluncur melalui Jalur Simpan: Naik ➜ Belok ➜ Ke Kiri ke Rumah Nanas Puluhan.',
        visual: `
          <div style="display:flex; align-items:center; gap:16px;">
            <div style="font-size:3rem;">🐧</div>
            <div style="background:#0284c7; color:#fff; padding:6px 14px; border-radius:20px; font-weight:800;">Meluncur Naik ➜ Belok ➜ Ke Kiri ➜</div>
            <div class="digit-ball digit-ball-carry" style="width:50px; height:50px; font-size:1.6rem;">1</div>
          </div>
        `
      },
      {
        name: 'Tahap 7: Menjumlahkan Puluhan',
        desc: '7. Menjumlahkan seluruh puluhan: 1 (angka simpan) + 2 (puluhan atas) + 1 (puluhan bawah) = 4.',
        visual: `
          <div style="display:flex; align-items:center; gap:10px;">
            <div class="digit-ball digit-ball-carry" style="width:48px; height:48px; font-size:1.5rem;">1</div>
            <span style="font-weight:800; font-size:1.5rem;">+</span>
            <div class="digit-ball digit-ball-purple" style="width:48px; height:48px; font-size:1.5rem;">2</div>
            <span style="font-weight:800; font-size:1.5rem;">+</span>
            <div class="digit-ball digit-ball-purple" style="width:48px; height:48px; font-size:1.5rem;">1</div>
            <span style="font-weight:800; font-size:1.5rem;">=</span>
            <div class="digit-ball digit-ball-purple" style="width:54px; height:54px; font-size:1.8rem;">4</div>
          </div>
        `
      },
      {
        name: 'Tahap 8: Membentuk Hasil Akhir',
        desc: '8. Gabungkan hasil puluhan (4) dan satuan (5) menghasilkan jawaban akhir: 45.',
        visual: `
          <div style="background:#ecfdf5; border:3px solid #10b981; padding:14px 28px; border-radius:12px; font-family:var(--font-numbers); font-size:2.5rem; font-weight:900; color:#065f46;">
            27 + 18 = 45 🎉
          </div>
        `
      }
    ];

    const cur = steps[stepNum - 1] || steps[0];
    if (pill) pill.textContent = cur.name;
    if (desc) desc.textContent = cur.desc;
    if (stage) stage.innerHTML = cur.visual;

    window.soundEngine.speak(cur.name);
  }

  /* ==========================================================================
     DASHBOARD & 7-STAGE DIAGNOSTICS CONTROLLER
     ========================================================================== */
  bindDashboardController() {
    document.getElementById('btnExportCSV')?.addEventListener('click', () => {
      this.exportCSV();
    });

    document.getElementById('btnPrintReport')?.addEventListener('click', () => {
      window.print();
    });

    document.getElementById('btnClearHistory')?.addEventListener('click', () => {
      if (confirm('Apakah kamu yakin ingin menghapus seluruh riwayat aktivitas belajar?')) {
        this.state.sessions = [];
        this.saveState();
        this.renderDashboard();
        this.showToast('Riwayat data aktivitas berhasil dibersihkan.', 'info');
      }
    });
  }

  renderDashboard() {
    const sessions = this.state.sessions || [];
    const totalProblems = sessions.reduce((acc, s) => acc + (s.total || 0), 0);
    const totalCorrect = sessions.reduce((acc, s) => acc + (s.correct || 0), 0);
    const totalScore = sessions.reduce((acc, s) => acc + (s.score || 0), 0);
    const avgScore = sessions.length > 0 ? Math.round(totalScore / sessions.length) : 0;
    const accuracy = totalProblems > 0 ? Math.round((totalCorrect / totalProblems) * 100) : 0;

    let statusText = 'Belum Ada Aktivitas';
    if (sessions.length > 0) {
      if (avgScore >= 85) statusText = '🏆 Mahir';
      else if (avgScore >= 70) statusText = '⭐ Berkembang';
      else if (avgScore >= 50) statusText = '🌱 Mulai Berkembang';
      else statusText = '📚 Sedang Belajar';
    }

    const totalProbElem = document.getElementById('dashTotalProblems');
    const accElem = document.getElementById('dashAccuracy');
    const avgElem = document.getElementById('dashAvgScore');
    const statElem = document.getElementById('dashStudentStatus');
    const countElem = document.getElementById('dashSessionCount');

    if (totalProbElem) totalProbElem.textContent = totalProblems;
    if (accElem) accElem.textContent = `${accuracy}%`;
    if (avgElem) avgElem.textContent = avgScore;
    if (statElem) statElem.textContent = statusText;
    if (countElem) countElem.textContent = `${sessions.length} Sesi Tercatat`;

    const stages = [
      { id: 'placeValue', title: '1. Nilai Tempat', icon: '🏷️' },
      { id: 'onesAddition', title: '2. Menjumlah Satuan', icon: '➕' },
      { id: 'regrouping', title: '3. Regrouping', icon: '🔄' },
      { id: 'carryDigit', title: '4. Angka Simpan', icon: '🐧' },
      { id: 'withCarry', title: '5. Menyimpan Puluhan', icon: '⭐' },
      { id: 'tensAddition', title: '6. Menjumlah Puluhan', icon: '➕' },
      { id: 'finalResult', title: '7. Hasil Akhir', icon: '🏁' }
    ];

    const stagesGrid = document.getElementById('diagnosticStagesGrid');
    if (stagesGrid) {
      let stagesHtml = '';
      stages.forEach(st => {
        let statusTag = `<span class="diag-status-badge badge-not-mastered" style="font-size:0.72rem;">✕ Belum</span>`;
        if (sessions.length > 0) {
          if (avgScore >= 70) {
            statusTag = `<span class="diag-status-badge badge-mastered" style="font-size:0.72rem;">✓ Dikuasai</span>`;
          } else if (avgScore >= 45) {
            statusTag = `<span class="diag-status-badge badge-needs-practice" style="font-size:0.72rem;">△ Perlu Latihan</span>`;
          }
        }

        stagesHtml += `
          <div class="stage-card-mini">
            <div style="display:flex; align-items:center; justify-content:space-between;">
              <span style="font-size:1.2rem;">${st.icon}</span>
              ${statusTag}
            </div>
            <span class="stage-card-title">${st.title}</span>
          </div>
        `;
      });
      stagesGrid.innerHTML = stagesHtml;
    }

    const tbody = document.getElementById('sessionHistoryBody');
    if (tbody) {
      if (sessions.length === 0) {
        tbody.innerHTML = `<tr><td colspan="9" style="text-align:center; color:#94a3b8; padding:24px;">Belum ada riwayat aktivitas belajar. Ayo mulai latihan atau tantangan!</td></tr>`;
      } else {
        let rows = '';
        sessions.forEach((s) => {
          const statusBadge = s.score >= 70 
            ? `<span class="diag-status-badge badge-mastered" style="font-size:0.72rem;">✓ Dikuasai</span>`
            : `<span class="diag-status-badge badge-needs-practice" style="font-size:0.72rem;">△ Perlu Latihan</span>`;

          const mins = String(Math.floor((s.durationSec || 0) / 60)).padStart(2, '0');
          const secs = String((s.durationSec || 0) % 60).padStart(2, '0');

          rows += `
            <tr>
              <td style="font-weight:700;">${s.studentName || 'Murid Juara'}</td>
              <td style="font-size:0.85rem; color:#64748b;">${s.dateStr || '-'}</td>
              <td><strong>${s.focusTitle || s.mode}</strong></td>
              <td style="font-family:var(--font-numbers); font-weight:800;">${s.total}</td>
              <td><span style="color:#059669; font-weight:800;">${s.correct}</span> / <span style="color:#dc2626; font-weight:800;">${s.wrong}</span></td>
              <td style="font-family:var(--font-numbers); font-weight:900; color:#d97706;">${s.score}</td>
              <td style="font-size:0.85rem;">${mins}:${secs}</td>
              <td style="font-size:0.85rem;">${s.hintsUsed || 0}x</td>
              <td>${statusBadge}</td>
            </tr>
          `;
        });
        tbody.innerHTML = rows;
      }
    }
  }

  exportCSV() {
    const sessions = this.state.sessions || [];
    if (sessions.length === 0) {
      this.showToast('Tidak ada data riwayat untuk diekspor!', 'warning');
      return;
    }

    let csv = 'Nama Siswa,Tanggal,Mode,Fokus,Total Soal,Benar,Salah,Skor,Durasi (Detik),Petunjuk (Hint)\n';
    sessions.forEach(s => {
      csv += `"${s.studentName}","${s.dateStr}","${s.mode}","${s.focusTitle}",${s.total},${s.correct},${s.wrong},${s.score},${s.durationSec},${s.hintsUsed}\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Hasil_Belajar_${this.state.studentName}_${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    this.showToast('Data hasil belajar berhasil diekspor ke CSV!', 'success');
  }

  /* ==========================================================================
     PENGATURAN SCREEN
     ========================================================================== */
  syncSettingsForm() {
    const s = this.state.settings;
    const chkOcean = document.getElementById('chkSettingOceanSound');
    const chkSound = document.getElementById('chkSettingSound');
    const sliderVol = document.getElementById('sliderSettingVolume');
    const chkVoice = document.getElementById('chkSettingVoice');
    const chkAnim = document.getElementById('chkSettingAnim');
    const chkUnlock = document.getElementById('chkSettingUnlockLevels');

    if (chkOcean) chkOcean.checked = s.oceanSound !== false;
    if (chkSound) chkSound.checked = s.sound !== false;
    if (sliderVol) sliderVol.value = s.volume || 0.8;
    if (chkVoice) chkVoice.checked = s.voice !== false;
    if (chkAnim) chkAnim.checked = s.anim !== false;
    if (chkUnlock) chkUnlock.checked = s.unlockAllLevels === true;
  }

  applySettings() {
    const s = this.state.settings || {};
    window.soundEngine.setSoundEnabled(s.sound !== false);
    window.soundEngine.setOceanAmbienceEnabled(s.oceanSound !== false);
    window.soundEngine.setVoiceEnabled(s.voice !== false);
    window.soundEngine.setVolume(s.volume || 0.8);

    if (s.anim === false) {
      document.body.classList.add('no-anim');
    } else {
      document.body.classList.remove('no-anim');
    }
  }

  bindSettingsController() {
    document.getElementById('chkSettingOceanSound')?.addEventListener('change', (e) => {
      this.state.settings.oceanSound = e.target.checked;
      this.saveState();
      this.applySettings();
    });

    document.getElementById('chkSettingSound')?.addEventListener('change', (e) => {
      this.state.settings.sound = e.target.checked;
      this.saveState();
      this.applySettings();
    });

    document.getElementById('sliderSettingVolume')?.addEventListener('input', (e) => {
      this.state.settings.volume = parseFloat(e.target.value) || 0.8;
      this.saveState();
      this.applySettings();
      window.soundEngine.playPop();
    });

    document.getElementById('chkSettingVoice')?.addEventListener('change', (e) => {
      this.state.settings.voice = e.target.checked;
      this.saveState();
      this.applySettings();
    });

    document.getElementById('chkSettingAnim')?.addEventListener('change', (e) => {
      this.state.settings.anim = e.target.checked;
      this.saveState();
      this.applySettings();
    });

    document.getElementById('chkSettingUnlockLevels')?.addEventListener('change', (e) => {
      this.state.settings.unlockAllLevels = e.target.checked;
      this.saveState();
      this.renderChallengeLevelCards();
      this.showToast(e.target.checked ? 'Semua level tantangan berhasil dibuka!' : 'Mode level kembali ke progres standar.', 'info');
    });

    document.getElementById('btnResetAllData')?.addEventListener('click', () => {
      if (confirm('PERINGATAN: Apakah kamu yakin ingin mereset seluruh data siswa, riwayat, dan pencapaian?')) {
        this.state = this.getDefaultState();
        this.saveState();
        this.applySettings();
        this.updateStudentNameUI();
        this.renderChallengeLevelCards();
        this.renderDashboard();
        this.showToast('Seluruh data aplikasi berhasil di-reset.', 'info');
      }
    });

    document.getElementById('btnSettingsBack')?.addEventListener('click', () => {
      window.soundEngine.playPop();
      this.showScreen('screen-home');
    });

    // Ocean ambience toggle in header
    const btnOcean = document.getElementById('btnToggleOceanSound');
    if (btnOcean) {
      btnOcean.addEventListener('click', () => {
        const active = btnOcean.classList.toggle('active');
        this.state.settings.oceanSound = active;
        this.saveState();
        this.applySettings();
        btnOcean.setAttribute('data-tooltip', active ? 'Suara Ombak & Laut (Aktif)' : 'Suara Ombak & Laut (Mati)');
      });
      if (this.state.settings?.oceanSound !== false) btnOcean.classList.add('active');
    }

    // Sound toggle in header
    const btnSound = document.getElementById('btnToggleSound');
    if (btnSound) {
      btnSound.addEventListener('click', () => {
        const active = btnSound.classList.toggle('active');
        this.state.settings.sound = active;
        this.saveState();
        this.applySettings();
        btnSound.setAttribute('data-tooltip', active ? 'Suara Efek (Aktif)' : 'Suara Efek (Mati)');
      });
      if (this.state.settings?.sound !== false) btnSound.classList.add('active');
    }

    const btnVoice = document.getElementById('btnToggleVoice');
    if (btnVoice) {
      btnVoice.addEventListener('click', () => {
        const active = btnVoice.classList.toggle('active');
        this.state.settings.voice = active;
        this.saveState();
        this.applySettings();
        btnVoice.setAttribute('data-tooltip', active ? 'Suara Narasi (Aktif)' : 'Suara Narasi (Mati)');
      });
      if (this.state.settings?.voice !== false) btnVoice.classList.add('active');
    }
  }

  /* ==========================================================================
     CORE WORKSPACE MANIPULATIVE ENGINE (RUMAH NANAS & PENGUIN NAIK->BELOK->KIRI)
     ========================================================================== */
  bindWorkspaceEvents() {
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

    document.getElementById('btnChallengeRetry')?.addEventListener('click', () => {
      window.soundEngine.playPop();
      this.openChallengePicker();
    });

    document.getElementById('btnChallengeHome')?.addEventListener('click', () => {
      window.soundEngine.playPop();
      this.showScreen('screen-home');
    });

    // Jalankan Penguin button in center Jalur Simpan
    document.getElementById('btnRunPenguin')?.addEventListener('click', () => {
      this.animatePenguinGlideToCarry(this.carryDigit || 1);
    });
  }

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

    const probDisplay = document.getElementById('wsProblemDisplay');
    if (probDisplay) probDisplay.textContent = `${numA} + ${numB} = ?`;

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

    const ballTensA = document.getElementById('ballTensA');
    const ballTensB = document.getElementById('ballTensB');
    const ballOnesA = document.getElementById('ballOnesA');
    const ballOnesB = document.getElementById('ballOnesB');

    if (ballTensA) ballTensA.textContent = this.tensA;
    if (ballTensB) ballTensB.textContent = this.tensB;
    if (ballOnesA) ballOnesA.textContent = this.onesA;
    if (ballOnesB) ballOnesB.textContent = this.onesB;

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

    const pipe = document.getElementById('jalurSimpanPipe');
    if (pipe) pipe.classList.remove('pipe-active');

    const onesFormula = document.getElementById('onesCalcFormula');
    if (onesFormula) onesFormula.textContent = `${this.onesA} + ${this.onesB} = ?`;

    const splitContainer = document.getElementById('splitTokensContainer');
    if (splitContainer) {
      splitContainer.innerHTML = `<span style="font-size:0.85rem; color:#94a3b8; font-weight:600;">Masukkan hasil pada keypad ➜</span>`;
    }

    const splitBox = document.getElementById('splitQuestionsBox');
    if (splitBox) splitBox.style.display = 'none';

    this.keypadBuffer = '';
    const keyDisplay = document.getElementById('keypadDisplay');
    const keyPrompt = document.getElementById('keypadPrompt');
    if (keyDisplay) keyDisplay.textContent = '__';
    if (keyPrompt) keyPrompt.textContent = 'Ketik Hasil Satuan:';

    this.setPenguinSpeech('“Aku siap menjaga angka simpanmu!”');
    const penguinContainer = document.getElementById('wsPenguinContainer');
    if (penguinContainer) penguinContainer.innerHTML = Mascots.getPenguinMascotSvg(100, 105, 'neutral');

    this.setPhase('ONES_INPUT');
  }

  setPhase(phase) {
    this.phase = phase;
    const instructionText = document.getElementById('wsInstructionText');
    const phasePill = document.getElementById('wsPhasePill');
    const spongeSpeech = document.getElementById('wsSpongeSpeech');
    const btnCheckText = document.getElementById('btnCheckText');
    const keypadCard = document.getElementById('wsKeypadCard');

    this.clearAllDropHighlights();

    if (phase === 'ONES_INPUT') {
      if (phasePill) phasePill.textContent = 'Tahap 1: Hitung Satuan';
      const prompt = `Hitung angka satuan: ${this.onesA} + ${this.onesB} = ? Masukkan di keypad!`;
      if (instructionText) instructionText.textContent = prompt;
      if (spongeSpeech) spongeSpeech.innerHTML = `Mulai dari Rumah Satuan (Pink) ya! Berapa hasil dari <strong>${this.onesA} + ${this.onesB}</strong>?`;
      if (btnCheckText) btnCheckText.textContent = 'KIRIM HASIL';
      if (keypadCard) keypadCard.style.opacity = '1';
      window.soundEngine.speak(`Hitung angka satuan: ${this.onesA} ditambah ${this.onesB}`);
    } 
    else if (phase === 'ONES_SPLIT_CHOICE') {
      if (phasePill) phasePill.textContent = 'Tahap 2: Pisahkan Hasil Satuan';
      const prompt = `Hasilnya ${this.onesSum}: Pindahkan ${this.onesDigit} ke Rumah Satuan, dan simpan ${this.carryDigit} ke Penguin!`;
      if (instructionText) instructionText.textContent = prompt;
      if (spongeSpeech) spongeSpeech.innerHTML = `Hasilnya <strong>${this.onesSum}</strong>! Letakkan angka <strong>${this.onesDigit}</strong> di Hasil Satuan, dan seret <strong>${this.carryDigit}</strong> ke Penguin di Jalur Simpan!`;
      if (btnCheckText) btnCheckText.textContent = 'CEK LANGKAH';
      if (keypadCard) keypadCard.style.opacity = '0.5';

      this.highlightValidTarget('result-ones');
      this.highlightValidTarget('penguin-nest');
      window.soundEngine.speak(`Pisahkan angka satuan dan angka simpan`);
    }
    else if (phase === 'MOVE_TO_PENGUIN') {
      if (phasePill) phasePill.textContent = 'Tahap 3: Simpan ke Penguin';
      const prompt = `Bawa angka ${this.carryDigit} ke Penguin lalu tekan JALANKAN PENGUIN!`;
      if (instructionText) instructionText.textContent = prompt;
      if (spongeSpeech) spongeSpeech.innerHTML = `Sekarang simpan angka <strong>${this.carryDigit}</strong> ke Penguin lalu tekan tombol <strong>JALANKAN PENGUIN</strong>!`;
      
      this.highlightValidTarget('penguin-nest');
      this.setPenguinSpeech(`“Oper angka ${this.carryDigit} ke sini, lalu tekan Jalankan Penguin!”`);
      window.soundEngine.speak(`Simpan angka ${this.carryDigit} ke Penguin`);
    }
    else if (phase === 'MOVE_TO_ONES_RESULT') {
      if (phasePill) phasePill.textContent = 'Tahap 3: Tempatkan Satuan';
      const prompt = `Pindahkan angka satuan (${this.onesDigit}) ke kotak HASIL SATUAN di Rumah Satuan!`;
      if (instructionText) instructionText.textContent = prompt;
      if (spongeSpeech) spongeSpeech.innerHTML = `Bagus! Sekarang letakkan angka <strong>${this.onesDigit}</strong> di Rumah Satuan.`;
      
      this.highlightValidTarget('result-ones');
      window.soundEngine.speak(`Pindahkan angka ${this.onesDigit} ke hasil satuan`);
    }
    else if (phase === 'TENS_INPUT') {
      if (phasePill) phasePill.textContent = 'Tahap 4: Jumlahkan Puluhan';
      const prompt = `Jumlahkan semua puluhan di Rumah Nanas Puluhan: ${this.carryDigit > 0 ? this.carryDigit + ' (simpan) + ' : ''}${this.tensA} + ${this.tensB} = ?`;
      if (instructionText) instructionText.textContent = prompt;
      if (spongeSpeech) spongeSpeech.innerHTML = `Angka simpan sudah mendarat di atas Rumah Puluhan! Sekarang hitung: <strong>${this.carryDigit > 0 ? this.carryDigit + ' + ' : ''}${this.tensA} + ${this.tensB}</strong> di keypad!`;
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

  submitKeypadAnswer() {
    const val = parseInt(this.keypadBuffer, 10);
    if (isNaN(val)) {
      this.showToast('Ketik angka terlebih dahulu pada keypad!', 'warning');
      window.soundEngine.playErrorBounce();
      return;
    }

    if (this.phase === 'ONES_INPUT') {
      if (val === this.onesSum) {
        this.saveHistorySnapshot();
        window.soundEngine.playPop();
        this.keypadBuffer = '';

        if (this.carryDigit === 0) {
          this.placeOnesResultBall(this.onesDigit);
          this.showToast(`Bagus sekali! ${this.onesA} + ${this.onesB} = ${this.onesDigit}`, 'success');
          this.setPhase('TENS_INPUT');
        } else {
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

  renderSplitTokens(carry, ones) {
    const container = document.getElementById('splitTokensContainer');
    if (!container) return;

    container.innerHTML = `
      <div style="display:flex; align-items:center; gap:16px;">
        <div class="digit-ball digit-ball-carry" id="splitBallCarry" data-digit="${carry}" data-type="carry" title="Digit Puluhan Simpan: ${carry} (Seret ke Penguin)">
          ${carry}
        </div>
        <div class="digit-ball digit-ball-amber" id="splitBallOnes" data-digit="${ones}" data-type="ones" title="Digit Satuan: ${ones} (Tetap di Satuan)">
          ${ones}
        </div>
      </div>
    `;

    this.bindTokenInteractivity(document.getElementById('splitBallCarry'));
    this.bindTokenInteractivity(document.getElementById('splitBallOnes'));
  }

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

  executeTokenPlacement(tokenElem, targetType) {
    const tokenType = tokenElem.getAttribute('data-type');
    const digit = parseInt(tokenElem.getAttribute('data-digit') || '0', 10);

    if (tokenType === 'ones' && targetType === 'result-ones') {
      this.saveHistorySnapshot();
      window.soundEngine.playSnap();
      this.placeOnesResultBall(digit);
      tokenElem.remove();
      this.showToast(`Bagus! Angka ${digit} tetap pada tempat satuan di Rumah Satuan.`, 'success');

      const carrySlotFilled = document.getElementById('wsCarryDropSlot')?.classList.contains('filled');
      if (carrySlotFilled) {
        this.setPhase('TENS_INPUT');
      } else {
        this.setPhase('MOVE_TO_PENGUIN');
      }
      return;
    }

    if (tokenType === 'carry' && (targetType === 'penguin-nest' || targetType === 'carry-slot' || targetType === 'algo-carry')) {
      this.saveHistorySnapshot();
      tokenElem.remove();
      this.animatePenguinGlideToCarry(digit);
      return;
    }

    window.soundEngine.playErrorBounce();
    if (tokenType === 'ones') {
      this.showToast(`Angka ${digit} adalah satuan. Letakkan di kotak Hasil Satuan (Rumah Pink)!`, 'warning');
    } else if (tokenType === 'carry') {
      this.showToast(`Angka ${digit} adalah puluhan. Letakkan di Sarang Penguin di tengah!`, 'warning');
    } else {
      this.showToast('Letakkan angka pada slot yang menyala.', 'warning');
    }
  }

  /* --- Penguin Animation along Naik -> Belok -> Ke Kiri --- */
  animatePenguinGlideToCarry(digit) {
    window.soundEngine.playPenguinChirp();
    this.setPenguinSpeech(`“Hore! Aku bawa angka ${digit} meluncur Naik ➜ Belok ➜ Ke Kiri ke Rumah Puluhan!”`);
    
    const jalurCol = document.getElementById('colJalurCenter');
    if (jalurCol) jalurCol.classList.add('active-flow');

    const carryAnchor = document.getElementById('tensCarryAnchor');
    if (carryAnchor) carryAnchor.classList.add('target-active');

    const sprite = document.createElement('div');
    sprite.className = 'penguin-glide-sprite';
    sprite.innerHTML = `
      ${Mascots.getPenguinMascotSvg(80, 85, 'holding')}
      <div class="held-carry-digit">${digit}</div>
    `;

    const startElem = document.getElementById('penguinDropSlot');
    const endElem = document.getElementById('wsCarryDropSlot');
    const boardElem = document.getElementById('manipulationBoard');

    if (startElem && endElem && boardElem) {
      const boardRect = boardElem.getBoundingClientRect();
      const startRect = startElem.getBoundingClientRect();
      const endRect = endElem.getBoundingClientRect();

      const startX = startRect.left - boardRect.left + startRect.width / 2 - 40;
      const startY = startRect.top - boardRect.top + startRect.height / 2 - 42;

      const topCornerX = startX;
      const topCornerY = endRect.top - boardRect.top + endRect.height / 2 - 42;

      const endX = endRect.left - boardRect.left + endRect.width / 2 - 40;
      const endY = topCornerY;

      sprite.style.left = `${startX}px`;
      sprite.style.top = `${startY}px`;
      sprite.style.transform = 'scale(0.85)';
      boardElem.appendChild(sprite);

      window.soundEngine.playWhoosh();

      // Step 1: Naik (Upwards along Jalur Simpan)
      requestAnimationFrame(() => {
        sprite.style.transition = 'top 0.5s ease-out, transform 0.3s ease';
        sprite.style.top = `${topCornerY}px`;
        sprite.style.transform = 'scale(1.15)';

        // Step 2: Belok & Ke Kiri (Turn and slide leftwards to Rumah Puluhan)
        setTimeout(() => {
          sprite.style.transition = 'left 0.6s cubic-bezier(0.25, 1, 0.5, 1), transform 0.4s ease';
          sprite.style.transform = 'scale(1.15) rotate(-10deg)';
          sprite.style.left = `${endX}px`;

          // Step 3: Land at Carry Slot
          setTimeout(() => {
            sprite.style.transform = 'scale(1) rotate(0deg)';
            window.soundEngine.playCarryPlaced();
            this.placeCarrySlotBall(digit);

            if (sprite.parentNode) {
              sprite.remove();
            }

            if (jalurCol) jalurCol.classList.remove('active-flow');
            if (carryAnchor) carryAnchor.classList.remove('target-active');

            this.setPenguinSpeech(`“Angka ${digit} berhasil disimpan di atas Rumah Puluhan!”`);
            this.showToast(`Tepat! Angka simpan ${digit} berhasil dipindahkan ke Rumah Puluhan.`, 'success');

            const onesSlotFilled = document.getElementById('wsResultOnesSlot')?.classList.contains('filled');
            if (onesSlotFilled) {
              this.setPhase('TENS_INPUT');
            } else {
              this.setPhase('MOVE_TO_ONES_RESULT');
            }
          }, 650);
        }, 500);
      });
    } else {
      this.placeCarrySlotBall(digit);
      this.setPhase('TENS_INPUT');
    }
  }

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

  highlightValidTarget(targetKey, forClick = false) {
    this.clearAllDropHighlights();
    const targets = document.querySelectorAll(`[data-target="${targetKey}"]`);
    targets.forEach(t => {
      t.classList.add('valid-target', 'highlight-target');
      if (forClick) {
        t.classList.add('click-target-candidate');
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

  showTieredHint() {
    window.soundEngine.playPop();
    const hints = [
      `Level 1: Selalu mulai menjumlahkan dari kolom Satuan (Rumah Nanas Pink).`,
      `Level 2: Hitunglah digit satuan: ${this.onesA} + ${this.onesB}.`,
      `Level 3: Hasil dari ${this.onesA} + ${this.onesB} adalah ${this.onesSum}.`,
      `Level 4: Angka ${this.onesDigit} tetap di tempat Satuan.`,
      `Level 5: Angka ${this.carryDigit} adalah 1 puluhan yang harus disimpan ke Penguin, lalu dipindahkan ke Slot Simpan Rumah Puluhan di atas.`
    ];

    const hintMsg = hints[this.currentHintLevel - 1] || hints[hints.length - 1];
    const modalContent = document.getElementById('modalHintContent');
    if (modalContent) modalContent.textContent = hintMsg;

    document.getElementById('modalHintDialog')?.classList.add('active');

    if (this.currentHintLevel < 5) {
      this.currentHintLevel++;
      this.updateHintBadge();
    }
  }

  updateHintBadge() {
    const badge = document.getElementById('hintLevelBadge');
    if (badge) badge.textContent = `Lv ${this.currentHintLevel}`;
  }

  showDemoAction() {
    window.soundEngine.playPop();
    const demoDescriptions = [
      `💡 Contoh: 7 + 8 = 15.`,
      `15 memiliki 1 Puluhan dan 5 Satuan.`,
      `Angka 5 ditaruh di Hasil Satuan.`,
      `Angka 1 disimpan ke Penguin, lalu diteruskan ke Carry Slot Rumah Puluhan.`
    ];
    this.showToast(demoDescriptions.join(' '), 'info');
  }

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

  triggerSuccessCelebration() {
    window.soundEngine.playSuccessFanfare();

    const formulaDisplay = document.getElementById('modalResultFormula');
    const rowOnes = document.getElementById('sumRowOnes');
    const rowCarry = document.getElementById('sumRowCarry');
    const rowTens = document.getElementById('sumRowTens');
    const rowFinal = document.getElementById('sumRowFinal');

    if (formulaDisplay) formulaDisplay.textContent = `${this.numA} + ${this.numB} = ${this.finalResult}`;
    if (rowOnes) rowOnes.textContent = `${this.onesSum} (${this.carryDigit} Puluhan + ${this.onesDigit} Satuan)`;
    if (rowCarry) rowCarry.textContent = `+ ${this.carryDigit} (ke Rumah Puluhan)`;
    const tensExp = this.carryDigit > 0 
      ? `${this.carryDigit} + ${this.tensA} + ${this.tensB} = ${this.tensSum}`
      : `${this.tensA} + ${this.tensB} = ${this.tensSum}`;
    if (rowTens) rowTens.textContent = tensExp;
    if (rowFinal) rowFinal.textContent = `${this.finalResult}`;

    if (this.isPracticeSession && this.practiceQuestions && this.practiceQuestions.length > 0) {
      this.practiceCorrectCount++;
      const isLast = (this.practiceIndex + 1) >= this.practiceQuestions.length;
      const btnModalNext = document.getElementById('btnModalNext');
      if (btnModalNext) {
        btnModalNext.textContent = isLast ? 'LIHAT SKOR AKHIR 🏆' : 'SOAL BERIKUTNYA ➜';
      }
    } else {
      const btnModalNext = document.getElementById('btnModalNext');
      if (btnModalNext) btnModalNext.textContent = 'SOAL BERIKUTNYA ➜';

      this.recordSession({
        mode: 'belajar',
        focus: 'general',
        focusTitle: 'Panduan Belajar Bersusun',
        total: 1,
        correct: 1,
        wrong: 0,
        score: 100,
        durationSec: 45,
        hintsUsed: this.currentHintLevel - 1,
        stages: {
          placeValue: true,
          onesAddition: true,
          regrouping: true,
          carryDigit: true,
          withCarry: true,
          tensAddition: true,
          finalResult: true
        }
      });
    }

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
    if (this.isPracticeSession && this.practiceQuestions && this.practiceQuestions.length > 0) {
      this.practiceIndex++;
      if (this.practiceIndex < this.practiceQuestions.length) {
        this.loadCurrentPracticeWorkspaceProblem();
      } else {
        this.finishPracticeSession();
      }
      return;
    }

    const presets = [
      { a: 38, b: 27 },
      { a: 46, b: 17 },
      { a: 58, b: 24 },
      { a: 67, b: 15 },
      { a: 29, b: 35 },
      { a: 48, b: 26 }
    ];
    const randomQ = presets[Math.floor(Math.random() * presets.length)];
    this.startProblem(randomQ.a, randomQ.b);
  }

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
