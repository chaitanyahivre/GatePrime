import './style.css'

const examDate = new Date('2029-02-10T09:30:00+05:30')
const streams = {
  cseit: {
    label: 'CSE / IT',
    eyebrow: 'Computer Science & Information Technology',
    intro: 'Turn concepts into compounding confidence. Build the fundamentals, then make problem-solving your unfair advantage.',
    color: 'coral',
    modules: [
      ['01', 'Engineering Mathematics', 'Discrete math · Linear algebra · Probability · Calculus', '12 weeks'],
      ['02', 'Digital Logic', 'Boolean algebra · Combinational & sequential circuits', '5 weeks'],
      ['03', 'Computer Organization', 'Machine instructions · Memory hierarchy · I/O systems', '6 weeks'],
      ['04', 'Programming & Data Structures', 'C programming · Arrays · Trees · Graphs · Algorithms', '10 weeks'],
      ['05', 'Algorithms', 'Complexity · Sorting · Greedy · Dynamic programming', '8 weeks'],
      ['06', 'Theory of Computation', 'Automata · Regular languages · Computability', '6 weeks'],
      ['07', 'Compiler Design', 'Lexical analysis · Parsing · Runtime environments', '4 weeks'],
      ['08', 'Operating Systems', 'Processes · Threads · Deadlocks · File systems', '7 weeks'],
      ['09', 'Databases', 'Relational model · SQL · Transactions · Indexing', '5 weeks'],
      ['10', 'Computer Networks', 'Protocols · Routing · Transport · Application layer', '6 weeks'],
    ],
  },
  eceda: {
    label: 'ECE / DA',
    eyebrow: 'Electronics & Communication / Data Science & AI',
    intro: 'Make your preparation measurable. Master the core ideas, practice with intent, and let your score follow the system.',
    color: 'blue',
    modules: [
      ['01', 'Engineering Mathematics', 'Linear algebra · Calculus · Probability · Numerical methods', '12 weeks'],
      ['02', 'General Aptitude', 'Verbal ability · Quantitative aptitude · Logic', 'Ongoing'],
      ['03', 'Signals & Systems', 'Fourier transforms · LTI systems · Sampling', '7 weeks'],
      ['04', 'Electronic Devices & Circuits', 'Semiconductors · Diodes · Amplifiers · Feedback', '8 weeks'],
      ['05', 'Digital Circuits', 'Logic families · Sequential circuits · Converters', '5 weeks'],
      ['06', 'Control Systems', 'Block diagrams · Stability · Time and frequency response', '5 weeks'],
      ['07', 'Data Science & AI', 'Probability · ML algorithms · AI fundamentals · Data prep', '10 weeks'],
      ['08', 'Programming & Data Structures', 'Python · Complexity · Trees · Graphs · Algorithms', '8 weeks'],
      ['09', 'Machine Learning', 'Regression · Classification · Clustering · Model evaluation', '7 weeks'],
      ['10', 'Communication & Networks', 'Analog/digital communication · Information theory', '6 weeks'],
    ],
  },
}

let activeStream = 'cseit'
let activePlan = 'Foundation'
let quoteIndex = 0
const dailyStorageKey = `gate2029-daily-${new Date().toLocaleDateString('en-CA')}`
const starterTargets = [
  { id: 'learn', title: 'Learn one focused concept', detail: '90 minutes · no multitasking' },
  { id: 'solve', title: 'Solve a timed problem set', detail: '60 minutes · review every miss' },
  { id: 'review', title: 'Review your error log', detail: '30 minutes · write one takeaway' },
]

function loadDailyPlan() {
  try {
    const saved = JSON.parse(localStorage.getItem(dailyStorageKey))
    if (saved && Array.isArray(saved.targets)) return saved
  } catch (error) {
    // Use the starter plan when browser storage is unavailable or malformed.
  }
  return { targets: starterTargets.map((target) => ({ ...target, completed: false })), notes: '' }
}

let dailyPlan = loadDailyPlan()

function saveDailyPlan() {
  localStorage.setItem(dailyStorageKey, JSON.stringify(dailyPlan))
}

function escapeHTML(value) {
  return String(value).replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[character])
}

const quotes = [
  ['Your rank is built in the ordinary hours you choose to protect.', 'Gate 2029/30'],
  ['You do not need a perfect day. You need a repeatable one.', 'Gate 2029/30'],
  ['Every question you review today becomes confidence you carry into the exam.', 'Gate 2029/30'],
]

const campuses = [
  ['IIT Bombay', 'Mumbai · Maharashtra', 'https://upload.wikimedia.org/wikipedia/commons/6/6a/Python%2C_IIT_Bombay.JPG?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original'],
  ['IIT Delhi', 'New Delhi · Delhi', 'https://upload.wikimedia.org/wikipedia/commons/e/e6/Iit_delhi_campus_garden.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original'],
  ['IIT Madras', 'Chennai · Tamil Nadu', 'https://upload.wikimedia.org/wikipedia/commons/1/14/Monkeys_at_IIT_Madras_campus_2.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original'],
  ['IIT Kanpur', 'Kanpur · Uttar Pradesh', 'https://upload.wikimedia.org/wikipedia/commons/f/fd/IIT_Kanpur_4.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original'],
  ['IIT Kharagpur', 'Kharagpur · West Bengal', 'https://upload.wikimedia.org/wikipedia/commons/d/df/IIT_Kharagpur_Campus_-_West_Midnapore_2015-09-28_4522.JPG?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original'],
  ['IIT Roorkee', 'Roorkee · Uttarakhand', 'https://upload.wikimedia.org/wikipedia/commons/f/f6/Eastern_cattle_egret_at_IIT-Roorkee.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original'],
  ['IIT Guwahati', 'Guwahati · Assam', 'https://upload.wikimedia.org/wikipedia/commons/3/3e/SE_New_Guest_House_IIT_Guwahati_Oct24_A7CR_03204.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original'],
  ['IISc Bengaluru', 'Bengaluru · Karnataka', 'https://upload.wikimedia.org/wikipedia/commons/5/52/IISC_Bangalore_Campus.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original'],
]

function getCountdown() {
  const difference = Math.max(0, examDate.getTime() - Date.now())
  const days = Math.floor(difference / 86400000)
  const hours = Math.floor((difference % 86400000) / 3600000)
  const minutes = Math.floor((difference % 3600000) / 60000)
  return { days, hours, minutes }
}

function countdownMarkup() {
  const { days, hours, minutes } = getCountdown()
  return `<div class="countdown-values"><strong>${days.toLocaleString('en-IN')}</strong><span>days</span><i>/</i><strong>${String(hours).padStart(2, '0')}</strong><span>hrs</span><i>/</i><strong>${String(minutes).padStart(2, '0')}</strong><span>min</span></div>`
}

function render() {
  const stream = streams[activeStream]
  document.querySelector('#app').innerHTML = `
    <header class="site-header">
      <a class="brand" href="#top" aria-label="Gate 2029 home"><span class="brand-mark">G</span><span>Gate<span class="brand-year">2029/30</span></span></a>
      <nav class="nav-links" aria-label="Main navigation"><a href="#syllabus">Syllabus</a><a href="#daily">Daily plan</a><a href="#strategy">Strategy</a><a href="#rhythm">Rhythm</a></nav>
      <a class="header-cta" href="#strategy">Start preparing <span>↗</span></a>
    </header>

    <main id="top">
      <section class="hero section-shell">
        <div class="hero-copy reveal"><p class="kicker"><span class="pulse-dot"></span> The long game starts today</p><h1>Make your<br /><em>future</em> inevitable.</h1><p class="hero-intro">A calm, clear preparation system for GATE 2029/30. You bring the ambition. We’ll help you turn it into a rank.</p><a class="primary-button" href="#syllabus">Explore your syllabus <span>↓</span></a></div>
        <div class="countdown-card reveal delay-one"><div class="card-label">GATE 2029 · Sunday, 10 February</div><div class="countdown-title">Time is on your side.</div><div id="countdown">${countdownMarkup()}</div><p>Every focused session compounds.<br />What will you do with today?</p><div class="card-line"></div><span class="mono-label">01 / 04 · YOUR ADVANTAGE</span></div>
      </section>

      <section class="quote-band"><div class="section-shell quote-inner"><span class="quote-number">0${quoteIndex + 1} / 03</span><blockquote>“${quotes[quoteIndex][0]}”</blockquote><div class="quote-meta"><span class="quote-source">— ${quotes[quoteIndex][1]}</span><div class="quote-controls"><button class="quote-control" data-quote="previous" aria-label="Previous quote">←</button><button class="quote-control" data-quote="next" aria-label="Next quote">→</button></div></div></div></section>

      <section class="campus-section section-shell"><div class="campus-heading"><div><p class="kicker">Keep the destination visible</p><h2>Learn with purpose.<br /><em>Arrive with proof.</em></h2></div><p class="section-note">Eight institutions.<br />One focused direction.</p></div><div class="campus-grid">${campuses.map(([name, location, image], index) => `<figure class="campus-card ${index < 2 ? 'campus-feature' : ''}"><img src="${image}" alt="${name} campus in ${location.split(' · ')[0]}" loading="lazy" /><figcaption><span>0${index + 1}</span><strong>${name}</strong><small>${location}</small></figcaption></figure>`).join('')}</div><p class="image-credit">Campus images via Wikimedia Commons · Institution names are used for inspiration</p></section>

      <section class="syllabus section-shell" id="syllabus"><div class="section-heading"><div><p class="kicker">Choose your path</p><h2>Know the terrain.<br /><em>Own the journey.</em></h2></div><p class="section-note">Your syllabus isn’t a wall to climb.<br />It’s a map to follow.</p></div><div class="stream-tabs" role="tablist"><button class="stream-tab ${activeStream === 'cseit' ? 'active coral' : ''}" data-stream="cseit" role="tab"><span>CSE / IT</span><small>Computer Science</small></button><button class="stream-tab ${activeStream === 'eceda' ? 'active blue' : ''}" data-stream="eceda" role="tab"><span>ECE / DA</span><small>Electronics & Data Science</small></button></div><div class="syllabus-intro"><p>${stream.intro}</p><span class="mono-label">${stream.eyebrow}</span></div><div class="module-grid">${stream.modules.map(([number, title, details, duration]) => `<article class="module-card"><span class="module-number">${number}</span><div><h3>${title}</h3><p>${details}</p></div><span class="module-time">${duration}</span></article>`).join('')}</div></section>

      <section class="daily-section section-shell" id="daily"><div class="daily-heading section-heading"><div><p class="kicker">Make today count</p><h2>One day.<br /><em>Fully yours.</em></h2></div><div class="daily-progress"><strong>${dailyPlan.targets.filter((target) => target.completed).length}/${dailyPlan.targets.length}</strong><span>targets complete</span><div class="progress-track"><i style="width: ${dailyPlan.targets.length ? (dailyPlan.targets.filter((target) => target.completed).length / dailyPlan.targets.length) * 100 : 0}%"></i></div></div></div><div class="daily-grid"><div class="target-panel"><div class="panel-topline"><span class="mono-label">TODAY'S TARGETS</span><button class="clear-targets" data-clear-completed type="button">Clear completed</button></div><ul class="target-list">${dailyPlan.targets.map((target) => `<li class="target-item ${target.completed ? 'is-complete' : ''}"><label><input type="checkbox" data-target-toggle="${escapeHTML(target.id)}" ${target.completed ? 'checked' : ''} /><span class="target-check"></span><span class="target-copy"><strong>${escapeHTML(target.title)}</strong><small>${escapeHTML(target.detail || 'Personal target')}</small></span></label></li>`).join('')}</ul><form class="target-form" data-target-form><input name="target" type="text" maxlength="80" placeholder="Add a target for today" aria-label="Add a target for today" required /><button type="submit" aria-label="Add target">+</button></form></div><aside class="notes-panel"><label for="daily-notes"><span class="mono-label">YOUR NOTES</span><strong>Leave a note for tomorrow-you.</strong></label><textarea id="daily-notes" maxlength="1000" placeholder="What did you learn? What needs another look?">${escapeHTML(dailyPlan.notes || '')}</textarea><span class="notes-hint">Saved automatically in this browser</span></aside></div></section>

      <section class="strategy-section" id="strategy"><div class="section-shell"><div class="section-heading strategy-heading"><div><p class="kicker">A strategy that lasts</p><h2>Small steps.<br /><em>Serious momentum.</em></h2></div><p class="section-note">There is no magic shortcut.<br />There is a reliable rhythm.</p></div><div class="plan-tabs" role="tablist">${['Foundation', 'Acceleration', 'Peak'].map((plan, index) => `<button class="plan-tab ${activePlan === plan ? 'active' : ''}" data-plan="${plan}"><span>0${index + 1}</span>${plan}</button>`).join('')}</div><div class="plan-content"><div class="plan-main"><span class="phase-label">PHASE 0${['Foundation', 'Acceleration', 'Peak'].indexOf(activePlan) + 1}</span><h3>${activePlan === 'Foundation' ? 'Build the base.' : activePlan === 'Acceleration' ? 'Turn knowledge into speed.' : 'Perform like it matters.'}</h3><p>${activePlan === 'Foundation' ? 'Complete one deliberate pass through every concept. Make your notes short, your understanding deep, and your doubts visible.' : activePlan === 'Acceleration' ? 'Shift from learning to solving. Mix subjects, increase question volume, and use every test to expose the next gap.' : 'Simulate the real thing. Revise from your error log, protect your energy, and make accuracy your final advantage.'}</p></div><ol class="plan-steps">${(activePlan === 'Foundation' ? ['Set a weekly subject target', 'Learn concepts before shortcuts', 'Solve 20–30 questions daily'] : activePlan === 'Acceleration' ? ['Take one sectional test each week', 'Build and revisit an error log', 'Practice mixed-topic problem sets'] : ['Take two full mocks each week', 'Revise formulas and weak areas', 'Sleep well and trust the process']).map((item, index) => `<li><span>0${index + 1}</span>${item}</li>`).join('')}</ol></div></div></section>

      <section class="rhythm section-shell" id="rhythm"><div class="rhythm-card"><div><p class="kicker">The daily rhythm</p><h2>Consistency beats<br /><em>intensity.</em></h2></div><div class="rhythm-items"><div><span>01</span><strong>Learn</strong><p>90 min of one focused concept</p></div><div><span>02</span><strong>Solve</strong><p>60 min of timed questions</p></div><div><span>03</span><strong>Review</strong><p>30 min with your error log</p></div></div><a class="circle-arrow" href="#top" aria-label="Back to top">↑</a></div></section>
    </main>
    <footer class="site-footer section-shell"><span>GATE 2029/30</span><span>Build your edge, one day at a time.</span><span class="mono-label">Made for the determined</span></footer>
  `
  document.querySelectorAll('[data-stream]').forEach((button) => button.addEventListener('click', () => { activeStream = button.dataset.stream; render() }))
  document.querySelectorAll('[data-plan]').forEach((button) => button.addEventListener('click', () => { activePlan = button.dataset.plan; render() }))
  document.querySelectorAll('[data-quote]').forEach((button) => button.addEventListener('click', () => { quoteIndex = button.dataset.quote === 'next' ? (quoteIndex + 1) % quotes.length : (quoteIndex - 1 + quotes.length) % quotes.length; render() }))
  document.querySelectorAll('[data-target-toggle]').forEach((checkbox) => checkbox.addEventListener('change', () => { const target = dailyPlan.targets.find((item) => item.id === checkbox.dataset.targetToggle); if (target) target.completed = checkbox.checked; saveDailyPlan(); render() }))
  document.querySelector('[data-target-form]').addEventListener('submit', (event) => { event.preventDefault(); const input = event.currentTarget.elements.target; const title = input.value.trim(); if (!title) return; dailyPlan.targets.push({ id: `custom-${Date.now()}`, title, detail: 'Personal target', completed: false }); saveDailyPlan(); render() })
  document.querySelector('[data-clear-completed]').addEventListener('click', () => { dailyPlan.targets = dailyPlan.targets.filter((target) => !target.completed); saveDailyPlan(); render() })
  document.querySelector('#daily-notes').addEventListener('input', (event) => { dailyPlan.notes = event.target.value; saveDailyPlan() })
}

render()
setInterval(() => { const countdown = document.querySelector('#countdown'); if (countdown) countdown.innerHTML = countdownMarkup() }, 60000)
