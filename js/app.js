/* ═══════════════════════════════════════════════════════════
   A LITTLE UNIVERSE — App.js 💛
   Multi-page romantic birthday experience (10 pages)
   SVG animated dolls: walk → hug → kiss → burst → wipe → front-facing hearts
   ═══════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const rand = (a, b) => Math.random() * (b - a) + a;
  const randInt = (a, b) => Math.floor(rand(a, b + 1));

  let currentPage = 1;

  function addTapListener(el, handler) {
    if (!el) return;
    let startX = 0, startY = 0, startTime = 0;
    let didTouch = false;

    el.addEventListener('touchstart', e => {
      didTouch = true;
      if (e.touches.length === 1) {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        startTime = Date.now();
      }
    }, { passive: true });

    el.addEventListener('touchend', e => {
      if (e.changedTouches.length === 1) {
        const dx = Math.abs(e.changedTouches[0].clientX - startX);
        const dy = Math.abs(e.changedTouches[0].clientY - startY);
        const dt = Date.now() - startTime;
        if (dx < 16 && dy < 16 && dt < 450) {
          e.preventDefault();
          handler(e);
        }
      }
    }, { passive: false });

    el.addEventListener('click', e => {
      if (didTouch) {
        setTimeout(() => { didTouch = false; }, 400);
        return;
      }
      handler(e);
    });
  }

  // ═══════════════════════════════════════════════════════════
  //  1. SVG DOLL GENERATORS
  // ═══════════════════════════════════════════════════════════

  function dollSVG(k, arms) {
    const b = k === 'boy', c = k[0];
    const sk = '#ffe2d0', hr = b ? '#4b2d1f' : '#2a1730';
    const cl = b ? '#6f93e6' : '#f58db0', lg = b ? '#3f4c80' : '#fff0f5';
    const sh = b ? '#fff' : '#e3789c';

    if (arms) return `<svg class="${c} arms" viewBox="0 0 120 190"><g class="ai" style="transform-origin:62px 100px"><rect x="57" y="96" width="10" height="58" rx="5" fill="${cl}"/><circle cx="62" cy="158" r="7" fill="${sk}"/></g></svg>`;

    return `<svg class="${c} body" viewBox="0 0 120 190"><ellipse cx="60" cy="186" rx="34" ry="5" fill="#000" opacity=".3"/>
${b ? '' : `<path d="M34 46C14 74 12 122 30 150C44 140 46 110 44 78Z" fill="${hr}"/>`}
<g class="leg a"><rect x="48" y="142" width="13" height="38" rx="6.5" fill="${lg}"/><ellipse cx="57" cy="182" rx="10" ry="5.5" fill="${sh}"/></g>
<g class="leg b"><rect x="60" y="142" width="13" height="38" rx="6.5" fill="${lg}"/><ellipse cx="69" cy="182" rx="10" ry="5.5" fill="${sh}"/></g>
${b ? `<rect x="40" y="84" width="40" height="64" rx="18" fill="${cl}"/><path d="M52 118h18v10q-9 3-18 0z" fill="#5877c9"/>` : `<path d="M42 88Q60 82 78 88L88 150Q60 158 32 150Z" fill="${cl}"/><path d="M46 90Q60 100 74 90" fill="none" stroke="#fff" stroke-width="3"/>`}
<g class="head"><circle cx="60" cy="58" r="30" fill="${sk}"/>
<ellipse cx="50" cy="60" rx="3.6" ry="5.5" fill="#f3c4a8"/>${b ? '' : '<circle cx="50" cy="67" r="2" fill="#f7c453"/>'}
<path d="M30 60C23 22 48 10 64 12C82 12 94 28 90 46C84 36 74 32 62 34C50 36 44 44 42 54C40 62 33 68 30 60Z" fill="${hr}"/>
${b ? `<path d="M60 13Q64 2 74 6Q68 9 70 15Z" fill="${hr}"/>` : `<g transform="translate(44 20) rotate(-20)"><ellipse cx="-7" rx="8" ry="5" fill="#ff7fa8"/><ellipse cx="7" rx="8" ry="5" fill="#ff7fa8"/><circle r="3.6" fill="#ff4f86"/></g>`}
<path d="M69 47Q74 44 80 47" fill="none" stroke="${hr}" stroke-width="2" stroke-linecap="round"/>
<g class="eo"><ellipse cx="74" cy="57" rx="4" ry="5.5" fill="#2b1b2e"/><circle cx="75.4" cy="55" r="1.6" fill="#fff"/></g>
<path class="ec" d="M68 58Q74 63 80 58" fill="none" stroke="#2b1b2e" stroke-width="2.4" stroke-linecap="round"/>
<ellipse cx="88" cy="62" rx="2.4" ry="2" fill="#f3bfa4"/><ellipse class="bl" cx="72" cy="69" rx="6" ry="4" fill="#ff8fab"/>
<path class="sm" d="M80 71Q83 75 87 71" fill="none" stroke="#c0506b" stroke-width="2.2" stroke-linecap="round"/></g></svg>`;
  }

  function frontDollSVG(k, side) {
    const b = k === 'boy', sk = '#ffe2d0', hr = b ? '#4b2d1f' : '#2a1730';
    const cl = b ? '#6f93e6' : '#f58db0', lg = b ? '#3f4c80' : '#fff0f5';
    const sh = b ? '#fff' : '#e3789c';

    return `<svg class="fv ${side}" viewBox="0 0 120 190"><ellipse cx="60" cy="186" rx="40" ry="5" fill="#000" opacity=".3"/>
${b ? '' : `<circle cx="26" cy="38" r="12" fill="${hr}"/><circle cx="94" cy="38" r="12" fill="${hr}"/>`}
<rect x="42" y="144" width="14" height="36" rx="7" fill="${lg}"/><rect x="64" y="144" width="14" height="36" rx="7" fill="${lg}"/><ellipse cx="48" cy="182" rx="10" ry="5.5" fill="${sh}"/><ellipse cx="72" cy="182" rx="10" ry="5.5" fill="${sh}"/>
${b ? `<rect x="32" y="94" width="56" height="58" rx="22" fill="${cl}"/>` : `<path d="M36 98Q60 90 84 98L96 154Q60 164 24 154Z" fill="${cl}"/>`}
<path d="M36 108L26 127L50 116M84 108L94 127L70 116" fill="none" stroke="${cl}" stroke-width="11" stroke-linecap="round" stroke-linejoin="round"/>
<g class="hh"><path d="M60 131C43 119 45 105 53 105C57 105 60 108 60 112C60 108 63 105 67 105C75 105 77 119 60 131Z" fill="${sk}" stroke="#ff5c8d" stroke-width="2.4" stroke-linejoin="round"/><path d="M60 125C51 118 52 111 55.5 111C58 111 60 113 60 115C60 113 62 111 64.5 111C68 111 69 118 60 125Z" fill="#ff7aa5" opacity=".75"/></g>
<circle cx="60" cy="56" r="33" fill="${sk}"/>
<path d="${b ? 'M26 54C20 16 46 6 60 8C76 6 100 16 94 54C90 38 78 28 60 30C42 28 30 38 26 54Z' : 'M27 56C20 14 100 14 93 56C88 40 76 30 60 32C44 30 32 40 27 56Z'}" fill="${hr}"/>
${b ? '' : `<g transform="translate(86 16) rotate(20)"><ellipse cx="-7" rx="8" ry="5" fill="#ff7fa8"/><ellipse cx="7" rx="8" ry="5" fill="#ff7fa8"/><circle r="3.6" fill="#ff4f86"/></g>`}
<ellipse cx="47" cy="60" rx="4.6" ry="6.4" fill="#2b1b2e"/><ellipse cx="73" cy="60" rx="4.6" ry="6.4" fill="#2b1b2e"/><circle cx="48.6" cy="57.6" r="1.8" fill="#fff"/><circle cx="74.6" cy="57.6" r="1.8" fill="#fff"/>
<ellipse cx="36" cy="72" rx="7" ry="4.5" fill="#ff8fab" opacity=".85"/><ellipse cx="84" cy="72" rx="7" ry="4.5" fill="#ff8fab" opacity=".85"/>
<path d="M51 74Q60 87 69 74Z" fill="#b8405c"/><ellipse cx="60" cy="80" rx="4" ry="2.4" fill="#ff8fab"/></svg>`;
  }

  // ═══════════════════════════════════════════════════════════
  //  2. POPULATE ALL CONTENT FROM CONFIG
  // ═══════════════════════════════════════════════════════════

  function populate() {
    const C = CONFIG;

    // Page 1 — Countdown
    $('#hero-name').textContent = C.herName;
    $('#bday-text').textContent = C.countdown.birthdayArrived;
    $('#skip-btn').textContent = C.countdown.skipButtonText;

    // Page 2 — Welcome
    $('.welcome-page__line1').textContent = C.welcome.line1;
    $('.welcome-page__line2').textContent = C.welcome.line2;
    $('.welcome-page__line3').textContent = C.welcome.line3;
    $('.welcome-page__subtitle').textContent = C.welcome.subtitle;
    $('[data-page="2"] .nav-next').textContent = C.welcome.buttonText;

    // Page 3 — Story
    $('.story-page__title').textContent = C.story.title;
    $('.story-page__subtitle').textContent = C.story.subtitle;
    const storyBox = $('#story-paras');
    C.story.paragraphs.forEach(p => {
      const div = document.createElement('div');
      div.className = 'story-page__para';
      div.textContent = p;
      storyBox.appendChild(div);
    });
    $('[data-page="3"] .nav-next').textContent = C.story.buttonText;

    // Page 4 — Love Things
    const lt = C.lovethings;
    $('[data-page="4"] .section-title').textContent = lt.title;
    $('[data-page="4"] .section-subtitle').textContent = lt.subtitle;
    const loveGrid = $('#love-grid');
    lt.items.forEach(item => {
      const card = document.createElement('div');
      card.className = 'love-card';
      card.innerHTML = `
        <div class="love-card__emoji">${item.emoji}</div>
        <div class="love-card__title">${item.title}</div>
        <div class="love-card__desc">${item.desc}</div>
      `;
      card.addEventListener('click', () => card.classList.toggle('love-card--open'));
      loveGrid.appendChild(card);
    });
    $('[data-page="4"] .nav-next').textContent = lt.buttonText;

    // Page 5 — Memories
    const mem = C.memories;
    $('[data-page="5"] .section-title').textContent = mem.title;
    $('[data-page="5"] .section-subtitle').textContent = mem.subtitle;
    const timeline = $('#timeline');
    if (timeline) {
      timeline.innerHTML = '';
      mem.items.forEach((m, idx) => {
        const entry = document.createElement('div');
        entry.className = 'mem-entry';
        entry.innerHTML = `
          <span class="mem-entry__date">${m.date}</span>
          <h3 class="mem-entry__title">${m.title}</h3>
          <p class="mem-entry__desc">${m.desc}</p>
          ${m.image ? `
            <div class="mem-entry__img-wrap" role="button" tabindex="0" data-idx="${idx}" aria-label="Open photo: ${m.title}">
              <div class="mem-entry__blur-bg" style="background-image: url('${m.image}');"></div>
              <img class="mem-entry__img" src="${m.image}" alt="${m.title}" loading="lazy">
              <span class="mem-entry__zoom-hint">🔍 Touch to view full</span>
            </div>` : ''}
        `;
        timeline.appendChild(entry);
      });

      $$('.mem-entry__img-wrap', timeline).forEach(wrap => {
        const idx = parseInt(wrap.getAttribute('data-idx'), 10);
        addTapListener(wrap, () => openLightbox(idx, 'memories'));
      });
    }
    $('[data-page="5"] .nav-next').textContent = mem.buttonText;

    // Page 6 — Gallery
    const gal = C.gallery;
    $('[data-page="6"] .section-title').textContent = gal.title;
    $('[data-page="6"] .section-subtitle').textContent = gal.subtitle;
    const galGrid = $('#gallery-grid');
    if (galGrid) {
      galGrid.innerHTML = '';
      gal.photos.forEach((p, i) => {
        const item = document.createElement('div');
        item.className = 'gal-item';
        item.setAttribute('role', 'button');
        item.setAttribute('tabindex', '0');
        item.setAttribute('aria-label', p.caption || 'Open photo');
        item.innerHTML = `
          <div class="gal-item__blur-bg" style="background-image: url('${p.src}');"></div>
          <img class="gal-item__img" src="${p.src}" alt="${p.caption}" loading="lazy">
          <div class="gal-item__overlay">
            <span class="gal-item__cap">${p.caption}</span>
          </div>
          <span class="gal-item__zoom-icon">🔍</span>
        `;
        addTapListener(item, () => openLightbox(i, 'gallery'));
        galGrid.appendChild(item);
      });
    }
    $('[data-page="6"] .nav-next').textContent = gal.buttonText;

    // Page 8 — Letter
    $('#letter-title').textContent = C.letter.title;
    $('#open-letter-btn').textContent = C.letter.openBtnText;
    const letterText = $('#letter-text');
    const paras = C.letter.content.split('\n\n');
    letterText.innerHTML = paras.map((p, idx) => {
      if (idx === 0) return `<p class="letter-first-para">${p.replace(/\n/g, '<br>')}</p>`;
      return `<p>${p.replace(/\n/g, '<br>')}</p>`;
    }).join('');
    $('#sig-text').textContent = C.letter.signature;
    $('#sig-name').textContent = C.letter.signatureName;
    $('#letter-nav-next').textContent = C.letter.buttonText;

    // Page 9 — Cake
    $('#cake-title').textContent = C.cake.title;
    $('#cake-subtitle').textContent = C.cake.subtitle;
    $('#blow-btn').textContent = C.cake.blowBtnText || 'Wish Karo & Phoonk Maaro 🎂💨';
    $('#cut-btn').textContent = C.cake.cutBtnText || 'Cake Kaato Guddu 🔪🍰';
    $('#wish-text').textContent = C.cake.wishMsg;
    $('#wish-hidden').textContent = C.cake.hiddenMsg;
    $('#slice-title').textContent = C.cake.sliceTitle || 'Ye Pehla Bite Meli Pyaali Guddu Ke Liye... 🍰💛';
    $('#slice-msg').textContent = C.cake.sliceMsg || 'Aapke liye hi banaya hai madam ji... khao na! 🙈💛';
    $('#cake-nav-btn').textContent = C.cake.nextButtonText || 'Last Surprise Guddu 🤗💋 →';
    const candleRow = $('#candle-row');
    if (candleRow) {
      candleRow.innerHTML = '';
      for (let i = 0; i < (C.cake.candleCount || 5); i++) {
        const c = document.createElement('div');
        c.className = 'candle';
        c.innerHTML = `<div class="candle__flame" style="animation-delay:${i * 0.08}s"></div><div class="candle__stick"></div>`;
        candleRow.appendChild(c);
      }
    }

    // Page 10 — Hug & Kiss (Final)
    const hk = C.hugKiss;
    $('#hug-title').textContent = hk.title;
    $('#hug-subtitle').textContent = hk.subtitle;
    $('#hug-message').textContent = hk.message;
    $('#hug-wish').textContent = hk.wish;
    $('#hug-subtext').textContent = hk.subText;
    $('#hug-final').textContent = hk.finalLine;
    $('#replay-btn').textContent = hk.replayText || 'Replay the hug 💋';

    // Floating hearts on hug page
    const heartsBox = $('#hug-hearts');
    const heartEmojis = ['❤️', '💛', '💕', '💗', '💖', '🧡', '💘'];
    for (let i = 0; i < 20; i++) {
      const h = document.createElement('span');
      h.className = 'f-heart';
      h.textContent = heartEmojis[i % heartEmojis.length];
      h.style.left = rand(3, 95) + '%';
      h.style.animationDelay = rand(0, 5) + 's';
      h.style.animationDuration = rand(5, 9) + 's';
      h.style.fontSize = rand(0.9, 1.6) + 'rem';
      heartsBox.appendChild(h);
    }

    // Music
    const audio = $('#bg-music');
    if (audio && C.music.src) audio.src = C.music.src;
  }

  // ═══════════════════════════════════════════════════════════
  //  3. PAGE NAVIGATION
  // ═══════════════════════════════════════════════════════════

  function goToPage(num) {
    const current = $(`[data-page="${currentPage}"]`);
    const next = $(`[data-page="${num}"]`);
    if (!next || num === currentPage) return;

    if (current) {
      current.classList.remove('page--active');
      current.classList.add('page--exit');
      setTimeout(() => current.classList.remove('page--exit'), 700);
    }

    // Close letter modal if navigating away
    const letterModal = $('#letter-modal');
    if (letterModal && letterModal.classList.contains('letter-modal--open')) {
      letterModal.classList.remove('letter-modal--open');
      letterModal.setAttribute('aria-hidden', 'true');
    }

    // Close cake slice modal if navigating away
    const cakeSliceModal = $('#cake-slice-modal');
    if (cakeSliceModal && cakeSliceModal.classList.contains('open')) {
      cakeSliceModal.classList.remove('open');
      setTimeout(() => { cakeSliceModal.hidden = true; }, 300);
    }

    setTimeout(() => {
      next.classList.add('page--active');
      next.scrollTop = 0;
      const content = $('.page__content', next);
      if (content) content.scrollTop = 0;
    }, 150);

    currentPage = num;

    const footer = $('#footer');
    if (footer) footer.hidden = (num !== 10);

    document.body.style.overflow = 'hidden';
  }

  $$('.nav-next').forEach(btn => {
    btn.addEventListener('click', () => {
      const nextPage = parseInt(btn.getAttribute('data-next'));
      if (nextPage) goToPage(nextPage);
    });
  });

  // ═══════════════════════════════════════════════════════════
  //  4. STARFIELD CANVAS
  // ═══════════════════════════════════════════════════════════

  function initStarfield(canvasEl) {
    if (!canvasEl) return { stop() {} };
    const ctx = canvasEl.getContext('2d');
    let stars = [];
    let running = true;
    let animId;

    function resize() {
      canvasEl.width = window.innerWidth;
      canvasEl.height = window.innerHeight;
    }

    function create() {
      stars = [];
      for (let i = 0; i < 200; i++) {
        stars.push({
          x: Math.random() * canvasEl.width,
          y: Math.random() * canvasEl.height,
          r: rand(0.3, 2.2),
          baseOp: rand(0.2, 0.85),
          op: 0,
          speed: rand(0.005, 0.018),
          phase: Math.random() * Math.PI * 2,
          dx: rand(-0.04, 0.04),
          dy: rand(-0.02, 0.02),
        });
      }
    }

    function draw() {
      if (!running) return;
      ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);

      stars.forEach(s => {
        s.phase += s.speed;
        s.op = s.baseOp * (0.5 + 0.5 * Math.sin(s.phase));
        s.x += s.dx;
        s.y += s.dy;
        if (s.x < 0) s.x = canvasEl.width;
        if (s.x > canvasEl.width) s.x = 0;
        if (s.y < 0) s.y = canvasEl.height;
        if (s.y > canvasEl.height) s.y = 0;

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${s.op})`;
        ctx.fill();

        if (s.r > 1.4) {
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(200,168,233,${s.op * 0.12})`;
          ctx.fill();
        }
      });

      if (Math.random() < 0.003) {
        const sx = rand(0, canvasEl.width * 0.7);
        const sy = rand(0, canvasEl.height * 0.3);
        const angle = rand(0.3, 0.7);
        const len = rand(50, 100);
        const ex = sx + Math.cos(angle) * len;
        const ey = sy + Math.sin(angle) * len;
        const grad = ctx.createLinearGradient(sx, sy, ex, ey);
        grad.addColorStop(0, 'rgba(255,255,255,0)');
        grad.addColorStop(1, 'rgba(255,255,255,0.8)');
        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.lineTo(ex, ey);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }

      animId = requestAnimationFrame(draw);
    }

    resize();
    create();
    draw();
    window.addEventListener('resize', resize);

    return {
      stop() {
        running = false;
        if (animId) cancelAnimationFrame(animId);
      }
    };
  }

  // ═══════════════════════════════════════════════════════════
  //  5. COUNTDOWN TIMER
  // ═══════════════════════════════════════════════════════════

  function initCountdown() {
    const target = new Date(CONFIG.birthdayDate).getTime();
    const dEl = $('#cd-days'), hEl = $('#cd-hours'), mEl = $('#cd-mins'), sEl = $('#cd-secs');
    const timerBox = $('#timer-container');
    const bdayBox = $('#bday-arrived');
    const enterBtn = $('#enter-btn');
    const skipBtn = $('#skip-btn');

    if (!dEl) return;

    let msgInterval;

    const msgs = CONFIG.countdown.waitingMessages;
    let msgIdx = 0;
    const msgEl = $('#waiting-msg');

    function cycleMessage() {
      if (!msgEl) return;
      msgEl.style.opacity = '0';
      setTimeout(() => {
        msgEl.textContent = msgs[msgIdx % msgs.length];
        msgEl.style.opacity = '1';
        msgIdx++;
      }, 400);
    }

    cycleMessage();
    msgInterval = setInterval(cycleMessage, 4000);

    function setNum(el, val) {
      const s = String(val).padStart(2, '0');
      if (el.textContent !== s) {
        el.textContent = s;
        el.classList.add('tick');
        setTimeout(() => el.classList.remove('tick'), 250);
      }
    }

    function tick() {
      const diff = target - Date.now();
      if (diff <= 0) { birthdayReached(); return; }
      setNum(dEl, Math.floor(diff / 864e5));
      setNum(hEl, Math.floor((diff % 864e5) / 36e5));
      setNum(mEl, Math.floor((diff % 36e5) / 6e4));
      setNum(sEl, Math.floor((diff % 6e4) / 1e3));
    }

    function birthdayReached() {
      if (timerBox) timerBox.style.display = 'none';
      if (bdayBox) bdayBox.hidden = false;
      if (skipBtn) skipBtn.style.display = 'none';
      if (enterBtn) { enterBtn.hidden = false; enterBtn.textContent = 'Enter Your Universe 💛'; }
      clearInterval(msgInterval);
      if (msgEl) msgEl.textContent = 'Aaj ka din sirf tumhara hai Guddu 💛';
    }

    if (target - Date.now() <= 0) {
      birthdayReached();
    } else {
      tick();
      setInterval(tick, 1000);
    }

    if (skipBtn) {
      skipBtn.addEventListener('click', () => {
        if (timerBox) timerBox.style.display = 'none';
        if (skipBtn) skipBtn.style.display = 'none';
        if (enterBtn) { enterBtn.hidden = false; enterBtn.textContent = 'Enter Your Universe 💛'; }
        clearInterval(msgInterval);
        if (msgEl) msgEl.textContent = 'Timer skip kar diya... chalo andar 😏';
      });
    }

    if (enterBtn) {
      enterBtn.addEventListener('click', () => {
        musicPlayer.play();
        const mc = $('#music-control');
        if (mc) mc.classList.add('music-ctrl--show');
        goToPage(2);
      });
    }
  }

  // ═══════════════════════════════════════════════════════════
  //  6. MUSIC PLAYER
  // ═══════════════════════════════════════════════════════════

  const musicPlayer = (() => {
    const audio = $('#bg-music');
    const toggleBtn = $('#music-toggle');
    const volSlider = $('#volume-slider');
    const iconEl = $('#music-icon');
    let playing = false;
    let vol = CONFIG.music ? CONFIG.music.volume : 0.4;

    function fadeIn(dur) {
      if (!audio) return;
      audio.volume = 0;
      const step = vol / ((dur || 2000) / 50);
      const iv = setInterval(() => {
        if (audio.volume + step >= vol) { audio.volume = vol; clearInterval(iv); }
        else audio.volume = Math.min(audio.volume + step, 1);
      }, 50);
    }

    function fadeOut(dur) {
      if (!audio) return;
      const step = audio.volume / ((dur || 1500) / 50);
      const iv = setInterval(() => {
        if (audio.volume - step <= 0) { audio.volume = 0; audio.pause(); clearInterval(iv); }
        else audio.volume = Math.max(audio.volume - step, 0);
      }, 50);
    }

    function updateIcon() {
      if (iconEl) iconEl.textContent = '♪';
      if (iconEl) iconEl.style.opacity = playing ? '1' : '0.5';
    }

    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        if (playing) { fadeOut(1500); playing = false; }
        else {
          if (audio) audio.play().then(() => { fadeIn(2000); playing = true; updateIcon(); }).catch(() => {});
        }
        updateIcon();
      });
    }

    if (volSlider) {
      volSlider.addEventListener('input', e => {
        vol = parseFloat(e.target.value);
        if (audio) audio.volume = vol;
      });
    }

    if (audio) audio.addEventListener('error', () => console.log('Music file not found. Add MP3 to assets/music/'));

    return {
      play() {
        if (!audio || !audio.src) return;
        audio.play().then(() => { playing = true; fadeIn(2000); updateIcon(); }).catch(() => {});
      },
      pause() { fadeOut(1500); playing = false; updateIcon(); }
    };
  })();

  // ═══════════════════════════════════════════════════════════
  //  7. LOVE LETTER ENVELOPE & PARCHMENT MODAL
  // ═══════════════════════════════════════════════════════════

  function initLetter() {
    const envelope = $('#envelope');
    const openBtn = $('#open-letter-btn');
    const closeBtn = $('#close-letter');
    const closeX = $('#close-letter-x');
    const backdrop = $('#letter-backdrop');
    const modal = $('#letter-modal');
    const proceedBtn = $('#letter-proceed-btn');

    function openModal() {
      if (!envelope || !modal) return;
      envelope.classList.add('letter-page__envelope--open');
      if (openBtn) openBtn.textContent = 'Khat Phir Se Kholo 💌';
      blip(520, 0.2);

      setTimeout(() => {
        modal.classList.add('letter-modal--open');
        modal.setAttribute('aria-hidden', 'false');
        const inner = $('#letter-inner');
        if (inner) inner.scrollTop = 0;
      }, 420);
    }

    function closeModal() {
      if (!modal) return;
      modal.classList.remove('letter-modal--open');
      modal.setAttribute('aria-hidden', 'true');
    }

    if (openBtn) {
      openBtn.addEventListener('click', openModal);
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', closeModal);
    }

    if (closeX) {
      closeX.addEventListener('click', closeModal);
    }

    if (backdrop) {
      backdrop.addEventListener('click', closeModal);
    }

    if (proceedBtn) {
      proceedBtn.addEventListener('click', () => {
        closeModal();
        goToPage(9);
      });
    }
  }

  // ═══════════════════════════════════════════════════════════
  //  8. LIGHTBOX
  // ═══════════════════════════════════════════════════════════

  let lbIndex = 0;
  let lbPhotos = [];

  function openLightbox(i, type = 'gallery') {
    if (type === 'memories') {
      lbPhotos = (CONFIG.memories && CONFIG.memories.items) ? CONFIG.memories.items.map(m => ({
        src: m.image,
        caption: `${m.title} 💛 (${m.date})`
      })) : [];
    } else {
      lbPhotos = (CONFIG.gallery && CONFIG.gallery.photos) ? CONFIG.gallery.photos : [];
    }
    if (!lbPhotos.length) return;
    lbIndex = Math.max(0, Math.min(i, lbPhotos.length - 1));

    const lb = $('#lightbox');
    if (!lb) return;
    lb.removeAttribute('hidden');
    lb.style.display = 'flex';
    void lb.offsetHeight;
    lb.classList.add('lightbox--show');
    updateLightbox();
  }

  function closeLightbox() {
    const lb = $('#lightbox');
    if (!lb) return;
    lb.classList.remove('lightbox--show');
    setTimeout(() => {
      lb.setAttribute('hidden', '');
      lb.style.display = 'none';
    }, 280);
  }

  function updateLightbox() {
    if (!lbPhotos.length) return;
    const p = lbPhotos[lbIndex];
    if (!p) return;
    const img = $('#lb-img');
    const cap = $('#lb-caption');
    const cnt = $('#lb-counter');
    if (img) {
      img.src = p.src;
      img.alt = p.caption || '';
    }
    if (cap) cap.textContent = p.caption || '';
    if (cnt) cnt.textContent = `${lbIndex + 1} / ${lbPhotos.length}`;
  }

  const lbClose = $('#lb-close');
  const lbPrev = $('#lb-prev');
  const lbNext = $('#lb-next');
  const lbBg = $('#lb-bg') || $('.lightbox__bg');

  if (lbClose) addTapListener(lbClose, closeLightbox);
  if (lbBg) addTapListener(lbBg, closeLightbox);

  if (lbPrev) {
    addTapListener(lbPrev, () => {
      if (!lbPhotos.length) return;
      lbIndex = (lbIndex - 1 + lbPhotos.length) % lbPhotos.length;
      updateLightbox();
    });
  }

  if (lbNext) {
    addTapListener(lbNext, () => {
      if (!lbPhotos.length) return;
      lbIndex = (lbIndex + 1) % lbPhotos.length;
      updateLightbox();
    });
  }

  document.addEventListener('keydown', e => {
    const lb = $('#lightbox');
    if (!lb || lb.hidden || !lb.classList.contains('lightbox--show')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') {
      if (!lbPhotos.length) return;
      lbIndex = (lbIndex - 1 + lbPhotos.length) % lbPhotos.length;
      updateLightbox();
    }
    if (e.key === 'ArrowRight') {
      if (!lbPhotos.length) return;
      lbIndex = (lbIndex + 1) % lbPhotos.length;
      updateLightbox();
    }
  });

  let touchStartX = 0;
  let touchStartY = 0;
  const lbEl = $('#lightbox');
  if (lbEl) {
    lbEl.addEventListener('touchstart', e => {
      if (e.touches.length === 1) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      }
    }, { passive: true });

    lbEl.addEventListener('touchend', e => {
      if (e.changedTouches.length === 1) {
        const diffX = e.changedTouches[0].clientX - touchStartX;
        const diffY = e.changedTouches[0].clientY - touchStartY;
        if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY)) {
          if (!lbPhotos.length) return;
          if (diffX > 0) {
            lbIndex = (lbIndex - 1 + lbPhotos.length) % lbPhotos.length;
          } else {
            lbIndex = (lbIndex + 1) % lbPhotos.length;
          }
          updateLightbox();
        }
      }
    }, { passive: true });
  }

  // ═══════════════════════════════════════════════════════════
  //  9. AUDIO SYNTHESIS & REALISTIC BIRTHDAY CAKE EXPERIENCE
  // ═══════════════════════════════════════════════════════════

  let sharedAC = null;
  function getAudioContext() {
    try {
      if (!sharedAC) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) sharedAC = new AudioCtx();
      }
      if (sharedAC && sharedAC.state === 'suspended') {
        sharedAC.resume();
      }
      return sharedAC;
    } catch (e) {
      return null;
    }
  }

  // Realistic Breath Wind Sound (White noise low-pass filtered with natural swell and taper)
  function playBreathSound() {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const sampleRate = ctx.sampleRate;
      const duration = 1.35;
      const buffer = ctx.createBuffer(1, Math.floor(sampleRate * duration), sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < buffer.length; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.45;
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      const t = ctx.currentTime;
      filter.frequency.setValueAtTime(260, t);
      filter.frequency.exponentialRampToValueAtTime(680, t + 0.35);
      filter.frequency.exponentialRampToValueAtTime(200, t + duration);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.18, t + 0.3);
      gain.gain.linearRampToValueAtTime(0.12, t + 0.75);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + duration);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      noise.start(t);
    } catch (e) {}
  }

  // Realistic Knife Slice Sound (Smooth glide through cream and sponge + gentle plate contact)
  function playSliceSound() {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const t = ctx.currentTime;

      // Slice glide
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(650, t);
      osc.frequency.exponentialRampToValueAtTime(180, t + 0.42);

      gain.gain.setValueAtTime(0.08, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.42);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 0.44);

      // Plate contact sound
      setTimeout(() => {
        try {
          const tapOsc = ctx.createOscillator();
          const tapGain = ctx.createGain();
          const t2 = ctx.currentTime;
          tapOsc.type = 'triangle';
          tapOsc.frequency.setValueAtTime(220, t2);
          tapOsc.frequency.exponentialRampToValueAtTime(70, t2 + 0.14);
          tapGain.gain.setValueAtTime(0.09, t2);
          tapGain.gain.exponentialRampToValueAtTime(0.001, t2 + 0.14);
          tapOsc.connect(tapGain);
          tapGain.connect(ctx.destination);
          tapOsc.start(t2);
          tapOsc.stop(t2 + 0.15);
        } catch (e) {}
      }, 320);
    } catch (e) {}
  }

  // Ascending Celestial Chime Sound (When delicious cake slice zooms to screen)
  function playChimeSound() {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const t = ctx.currentTime + idx * 0.09;
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = 'sine';
        o.frequency.setValueAtTime(freq, t);
        g.gain.setValueAtTime(0.08, t);
        g.gain.exponentialRampToValueAtTime(0.0001, t + 0.7);
        o.connect(g);
        g.connect(ctx.destination);
        o.start(t);
        o.stop(t + 0.7);
      });
    } catch (e) {}
  }

  function blip(f, d) {
    try {
      const ac = getAudioContext();
      if (!ac) return;
      const o = ac.createOscillator(), g = ac.createGain(), t = ac.currentTime;
      d = d || 0.25;
      o.frequency.setValueAtTime(f, t);
      o.frequency.exponentialRampToValueAtTime(f * 1.6, t + d);
      g.gain.setValueAtTime(0.07, t);
      g.gain.exponentialRampToValueAtTime(0.0001, t + d);
      o.connect(g).connect(ac.destination);
      o.start(t);
      o.stop(t + d);
    } catch (e) {}
  }

  function initCake() {
    const blowBtn = $('#blow-btn');
    const cutBtn = $('#cut-btn');
    const knifeSvg = $('#cake-knife-svg');
    const cutInterior = $('#cake-cut-interior');
    const sliceModal = $('#cake-slice-modal');
    const confettiBox = $('#confetti-box');
    const wishBox = $('#wish-box');
    const hiddenMsg = $('#wish-hidden');
    const cakeNavBtn = $('#cake-nav-btn');
    let blown = false;
    let cut = false;

    // 1. Blow candles
    function triggerBlowCandles() {
      if (blown) return;
      blown = true;
      if (blowBtn) blowBtn.disabled = true;

      // Play realistic breath blowing sound
      playBreathSound();

      const flames = $$('.candle-flame-element');
      const smokes = $$('.smoke-trail');

      // Step 1: Flames bend realistically with the wind
      flames.forEach(f => f.classList.add('bending'));

      // Step 2: Flames extinguish progressively from left to right with smoke trails curling up
      flames.forEach((f, i) => {
        setTimeout(() => {
          f.classList.remove('bending');
          f.classList.add('out');
          if (smokes[i]) {
            smokes[i].classList.add('rise');
          }
        }, 320 + i * 160);
      });

      const totalExtinguishDelay = 320 + flames.length * 160 + 200;

      // Step 3: Big confetti celebration
      setTimeout(() => {
        spawnConfetti(confettiBox, 90);
      }, totalExtinguishDelay);

      // Step 4: Show heartfelt wish text
      setTimeout(() => {
        if (wishBox) wishBox.hidden = false;
      }, totalExtinguishDelay + 400);

      // Step 5: Show sweet hidden whisper
      setTimeout(() => {
        if (hiddenMsg) hiddenMsg.classList.add('vis');
      }, totalExtinguishDelay + 1800);

      // Step 6: Reveal the floating knife and enable Cake Cutting button
      setTimeout(() => {
        if (blowBtn) blowBtn.style.display = 'none';
        if (knifeSvg) {
          knifeSvg.setAttribute('opacity', '1');
          knifeSvg.classList.add('knife-revealed');
        }
        if (cutBtn) {
          cutBtn.hidden = false;
        }
      }, totalExtinguishDelay + 2100);
    }

    if (blowBtn) {
      blowBtn.addEventListener('click', triggerBlowCandles);
    }
    const candlesGroup = $('#candles-group');
    if (candlesGroup) {
      candlesGroup.addEventListener('click', triggerBlowCandles);
    }

    // 2. Cut cake
    if (cutBtn) {
      cutBtn.addEventListener('click', () => {
        if (cut) return;
        cut = true;
        cutBtn.disabled = true;

        // Play authentic knife slice sound
        playSliceSound();

        // Animate knife slicing down through the cake
        if (knifeSvg) {
          knifeSvg.classList.remove('knife-revealed');
          knifeSvg.classList.add('knife-slicing');
        }

        // Reveal the delicious sponge and jam layers
        setTimeout(() => {
          if (cutInterior) {
            cutInterior.classList.add('cut-revealed');
            cutInterior.setAttribute('opacity', '1');
          }
          spawnConfetti(confettiBox, 40);
        }, 450);

        // After cut, zoom the delicious severed slice forward onto screen!
        setTimeout(() => {
          if (sliceModal) {
            sliceModal.hidden = false;
            void sliceModal.offsetWidth;
            sliceModal.classList.add('open');
            playChimeSound();
            spawnConfetti(confettiBox, 60);
          }
        }, 900);
      });
    }

    // 3. Last surprise navigation (Directly transition to Page 10)
    if (cakeNavBtn) {
      cakeNavBtn.addEventListener('click', () => {
        if (sliceModal) {
          sliceModal.classList.remove('open');
          setTimeout(() => { sliceModal.hidden = true; }, 350);
        }
        goToPage(10);
      });
    }
  }

  function spawnConfetti(container, count) {
    if (!container) return;
    const colors = ['#e8a0bf', '#c8a8e9', '#d4a574', '#f5e6d3', '#ff6b9d', '#ffd700', '#c27ba0'];
    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      p.className = 'confetti-p';
      const color = colors[randInt(0, colors.length - 1)];
      const size = rand(6, 11);
      const left = rand(5, 95);
      const drift = rand(-80, 80);
      const delay = rand(0, 1.2);
      const dur = rand(2, 3.5);
      const isCircle = Math.random() > 0.5;
      p.style.cssText = `left:${left}%;width:${size}px;height:${isCircle ? size : size * 1.4}px;background:${color};border-radius:${isCircle ? '50%' : '2px'};--drift:${drift}px;animation-delay:${delay}s;animation-duration:${dur}s;`;
      container.appendChild(p);
      setTimeout(() => p.remove(), (delay + dur) * 1000 + 500);
    }
  }

  // ═══════════════════════════════════════════════════════════
  //  10. HUG & KISS — SVG DOLL ANIMATION
  // ═══════════════════════════════════════════════════════════

  const ST = $('#hug-stage');
  let hugTimers = [];

  function initHugStage() {
    if (!ST) return;
    ST.innerHTML =
      dollSVG('boy') + dollSVG('girl') +
      dollSVG('boy', true) + dollSVG('girl', true) +
      '<svg class="lips" viewBox="0 0 64 40"><use href="#lip" width="64" height="40"/></svg>' +
      frontDollSVG('boy', 'fl') + frontDollSVG('girl', 'fr') +
      '<svg class="bigheart" viewBox="0 0 100 90"><path d="M50 86C10 56 4 30 22 14C34 4 46 10 50 22C54 10 66 4 78 14C96 30 90 56 50 86Z" fill="url(#hg)"/></svg>';
  }

  const hugPal = ['#f06292', '#ff80ab', '#f7c453', '#c2185b', '#e57fb0'];

  function hugReset() {
    hugTimers.forEach(clearTimeout);
    hugTimers = [];
    if (ST) ST.className = 'stage rst';
    $$('#kl .k, #kl .pf').forEach(e => e.remove());
    const w = $('#wiper');
    if (w) w.style.transform = 'translateX(-40vw)';
    // Reset text reveals
    $$('[data-page="10"] .rv').forEach(e => e.classList.remove('in'));
  }

  function hat(ms, f) { hugTimers.push(setTimeout(f, ms)); }

  function hugPuff() {
    const lipsEl = $('[data-page="10"] .lips') || $('.lips', ST);
    if (!lipsEl) return;
    const r = lipsEl.getBoundingClientRect();
    for (let i = 0; i < 7; i++) {
      const p = document.createElement('span');
      p.className = 'pf';
      p.textContent = '♥';
      p.style.cssText = `left:${r.left + r.width / 2}px;top:${r.top}px;--x:${rand(-70, 70)}px;animation-delay:${i * 90}ms;color:${hugPal[i % 5]}`;
      $('#kl').append(p);
      setTimeout(() => p.remove(), 2200);
    }
  }

  function hugBurst() {
    const lipsEl = $('[data-page="10"] .lips') || $('.lips', ST);
    if (!lipsEl) return 0;
    const r = lipsEl.getBoundingClientRect();
    const ox = r.left + r.width / 2, oy = r.top + r.height / 2;
    const W = innerWidth, H = innerHeight;
    const cs = Math.ceil(W / 150), rs = Math.ceil(H / 150);
    const cw = W / cs, ch = H / rs;
    const a = [];

    const minY = 140; // keep top title area completely clear of lips
    for (let i = 0; i < cs; i++) {
      for (let j = 0; j < rs; j++) {
        const rawY = (j + 0.1 + Math.random() * 0.8) * ch;
        const y = Math.max(minY, rawY);
        a.push([(i + 0.1 + Math.random() * 0.8) * cw, y]);
      }
    }

    a.sort((p, q) => Math.hypot(p[0] - ox, p[1] - oy) - Math.hypot(q[0] - ox, q[1] - oy));

    a.forEach(([x, y], i) => {
      const w = rand(46, 88);
      const k = document.createElement('div');
      k.className = 'k';
      k.innerHTML = '<svg viewBox="0 0 64 40"><use href="#lip" width="64" height="40"/></svg>';
      k.style.cssText = `left:${x - w / 2}px;top:${y - w * 0.3}px;--w:${w}px;--dx:${ox - x}px;--dy:${oy - y}px;--r:${rand(-35, 35)}deg;transition-delay:${i * 22}ms`;
      k._x = x;
      $('#kl').append(k);
      requestAnimationFrame(() => requestAnimationFrame(() => k.classList.add('fly')));
    });
    return a.length;
  }

  function hugWipe(done) {
    const w = $('#wiper');
    const W = innerWidth;
    const bar = w ? w.offsetWidth : 0;
    const ks = $$('#kl .k');
    const t0 = performance.now();
    const D = 1800;
    ks.forEach(k => k.style.transitionDelay = '0s');
    blip(300, 0.6);

    function f(t) {
      const p = Math.min(1, (t - t0) / D);
      const e = 0.5 - 0.5 * Math.cos(Math.PI * p);
      const x = -bar + e * (W + bar * 1.3);
      if (w) w.style.transform = `translateX(${x}px)`;
      ks.forEach(k => {
        if (!k.w && k._x < x + bar * 0.9) { k.w = 1; k.classList.add('wiped'); }
      });
      if (p < 1) {
        requestAnimationFrame(f);
      } else {
        if (w) w.style.transform = 'translateX(-60vw)';
        setTimeout(() => ks.forEach(k => k.remove()), 600);
        if (done) done();
      }
    }
    requestAnimationFrame(f);
  }

  function hugRun() {
    hugReset();
    void ST.offsetWidth; // force reflow

    // Step 1: Dolls walk in + show title/subtitle
    hat(80, () => {
      ST.classList.remove('rst');
      ST.classList.add('go');
      $$('[data-page="10"] .rv.i1').forEach((e, i) => setTimeout(() => e.classList.add('in'), i * 400));
    });

    // Step 2: Hug
    hat(3700, () => ST.classList.add('hug'));

    // Step 3: Kiss
    hat(5000, () => { ST.classList.add('kiss'); blip(520); hugPuff(); });

    // Step 4: Burst kisses across screen
    hat(5900, () => {
      const n = hugBurst();
      blip(700, 0.35);

      // After burst settles, wipe → reveal front-facing dolls + text
      hat(n * 22 + 900 + 1300, () => {
        hugWipe(() => {
          ST.classList.add('front');
          blip(880, 0.5);
          // Reveal text elements one by one
          $$('[data-page="10"] .rv.late').forEach((e, i) => {
            hat(1700 + i * 900, () => e.classList.add('in'));
          });
        });
      });
    });

    // Step 5: After kiss, transition to cuddle with continuous puffs
    hat(7300, () => {
      ST.classList.remove('kiss');
      ST.classList.add('cuddle');
      const puffIv = setInterval(() => hugPuff(), 1300);
      hugTimers.push(puffIv);
    });
  }

  function initHugAnimation() {
    initHugStage();

    // Wire replay button
    const replayBtn = $('#replay-btn');
    if (replayBtn) replayBtn.addEventListener('click', hugRun);

    // Watch for page 10 becoming active
    const hugPage = $('[data-page="10"]');
    if (hugPage) {
      const obs = new MutationObserver(() => {
        if (hugPage.classList.contains('page--active')) {
          hugRun();
        }
      });
      obs.observe(hugPage, { attributes: true, attributeFilter: ['class'] });
    }
  }

  // ═══════════════════════════════════════════════════════════
  //  11. IMAGE ERROR FALLBACK
  // ═══════════════════════════════════════════════════════════

  function initImageFallbacks() {
    document.addEventListener('error', e => {
      if (e.target.tagName === 'IMG') {
        const src = e.target.getAttribute('src');
        // Only fallback to SVG for assets/images placeholder paths, not real photos
        if (src && src.startsWith('assets/images/') && !src.endsWith('.svg')) {
          e.target.src = src.replace(/\.(jpg|jpeg|png|gif|webp)$/i, '.svg');
        }
      }
    }, true);
  }

  // ═══════════════════════════════════════════════════════════
  //  INIT EVERYTHING
  // ═══════════════════════════════════════════════════════════

  populate();
  initStarfield($('#star-canvas'));
  initCountdown();
  initLetter();
  initCake();
  initHugAnimation();
  initImageFallbacks();

  console.log('💛 A Little Universe — loaded with love for Guddu');
});
