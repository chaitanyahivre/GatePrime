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
let questionIndex = 0
let questionAnswerVisible = false
let solveSeconds = 0
let solveTimerRunning = false
let solveTimerId
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
  ['The hard question is not a verdict. It is a map to your next improvement.', 'Gate 2029/30'],
  ['Study until the pattern is familiar, then practise until the response is automatic.', 'Gate 2029/30'],
]

const questions = [
  { topic: 'Data Structures', prompt: 'What is the time complexity of searching for an element in a balanced binary search tree?', answer: 'O(log n), because each comparison eliminates roughly half of the remaining nodes.' },
  { topic: 'Operating Systems', prompt: 'Which scheduling algorithm can cause starvation when priorities are fixed?', answer: 'Priority scheduling. Low-priority processes may wait indefinitely unless aging is introduced.' },
  { topic: 'Computer Networks', prompt: 'How many usable host addresses are available in an IPv4 /26 subnet?', answer: '62 usable addresses: 2^6 total addresses minus the network and broadcast addresses.' },
  { topic: 'Engineering Mathematics', prompt: 'What is the derivative of ln(x) for x > 0?', answer: '1/x.' },
]

const campuses = [
  ['IIT Bombay', 'Mumbai · Maharashtra', 'https://commons.wikimedia.org/wiki/Special:FilePath/IITBMainBuildingCROP.jpg?width=1200'],
  ['IIT Delhi', 'New Delhi · Delhi', 'https://commons.wikimedia.org/wiki/Special:FilePath/IIT_Delhi_Main_Building.jpeg?width=1200'],
  ['IIT Madras', 'Chennai · Tamil Nadu', 'https://commons.wikimedia.org/wiki/Special:FilePath/IIT_Madras_Campus.jpg?width=1200'],
  ['IIT Kanpur', 'Kanpur · Uttar Pradesh', 'https://commons.wikimedia.org/wiki/Special:FilePath/IIT_Kanpur_3.jpg?width=1200'],
  ['IIT Kharagpur', 'Kharagpur · West Bengal', 'https://commons.wikimedia.org/wiki/Special:FilePath/Bubai_Manna_%28IIT_Kharagpur_main_building%29.jpg?width=1200'],
  ['IIT Roorkee', 'Roorkee · Uttarakhand', 'https://commons.wikimedia.org/wiki/Special:FilePath/Admin_Block_IIT-R.JPG?width=1200'],
  ['IIT Guwahati', 'Guwahati · Assam', 'https://upload.wikimedia.org/wikipedia/commons/3/3e/SE_New_Guest_House_IIT_Guwahati_Oct24_A7CR_03204.jpg'],
  ['IISc Bengaluru', 'Bengaluru · Karnataka', 'https://commons.wikimedia.org/wiki/Special:FilePath/IISc_Main_Building.jpg?width=1200'],
]

function getCountdown() {
  const difference = Math.max(0, examDate.getTime() - Date.now())
  const days = Math.floor(difference / 86400000)
  const hours = Math.floor((difference % 86400000) / 3600000)
  const minutes = Math.floor((difference % 3600000) / 60000)
  const seconds = Math.floor((difference % 60000) / 1000)
  return { days, hours, minutes, seconds }
}

function countdownMarkup() {
  const { days, hours, minutes, seconds } = getCountdown()
  return `<div class="countdown-values"><strong>${days.toLocaleString('en-IN')}</strong><span>days</span><i>/</i><strong>${String(hours).padStart(2, '0')}</strong><span>hrs</span><i>/</i><strong>${String(minutes).padStart(2, '0')}</strong><span>min</span><i>/</i><strong>${String(seconds).padStart(2, '0')}</strong><span>sec</span></div>`
}

function solveTimerMarkup() {
  const minutes = Math.floor(solveSeconds / 60)
  const seconds = solveSeconds % 60
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

function updateCountdown() {
  const countdown = document.querySelector('#countdown')
  if (!countdown) return
  const { days, hours, minutes, seconds } = getCountdown()
  const values = countdown.querySelectorAll('strong')
  ;[days.toLocaleString('en-IN'), hours, minutes, seconds].forEach((value, index) => {
    values[index].textContent = index === 0 ? value : String(value).padStart(2, '0')
  })
}

function render() {
  const stream = streams[activeStream]
  document.querySelector('#app').innerHTML = `
    <header class="site-header">
      <a class="brand" href="#top" aria-label="GatePrime home"><span class="brand-mark">G</span><span>GatePrime</span></a>
      <nav class="nav-links" aria-label="Main navigation"><a href="#syllabus">Syllabus</a><a href="#daily">Daily plan</a><a href="#practice">Practice</a><a href="#strategy">Strategy</a><a href="#rhythm">Rhythm</a></nav>
      <a class="header-cta" href="#strategy">Start preparing <span>↗</span></a>
    </header>

    <main id="top">
      <section class="hero section-shell">
        <div class="hero-copy reveal"><p class="kicker"><span class="pulse-dot"></span> The long game starts today</p><h1>Make your<br /><em>future</em> inevitable.</h1><p class="hero-intro">A calm, clear preparation system for GATE 2029/30. You bring the ambition. We’ll help you turn it into a rank.</p><a class="primary-button" href="#syllabus">Explore your syllabus <span>↓</span></a></div>
        <div class="countdown-card reveal delay-one"><div class="card-label">GATE 2029 · Sunday, 10 February</div><div class="countdown-title">Time is on your side.</div><div id="countdown">${countdownMarkup()}</div><p>Every focused session compounds.<br />What will you do with today?</p><div class="card-line"></div><span class="mono-label">01 / 04 · YOUR ADVANTAGE</span></div>
      </section>

      <section class="quote-band"><div class="section-shell quote-inner"><span class="quote-number">0${quoteIndex + 1} / 0${quotes.length}</span><blockquote>“${quotes[quoteIndex][0]}”</blockquote><div class="quote-meta"><span class="quote-source">— ${quotes[quoteIndex][1]}</span><div class="quote-controls"><button class="quote-control" data-quote="previous" aria-label="Previous quote">←</button><button class="quote-control" data-quote="next" aria-label="Next quote">→</button></div></div></div></section>

      <section class="campus-section section-shell"><div class="campus-heading"><div><p class="kicker">Keep the destination visible</p><h2>Learn with purpose.<br /><em>Arrive with proof.</em></h2></div><p class="section-note">Eight institutions.<br />One focused direction.</p></div><div class="campus-grid">${campuses.map(([name, location, image], index) => `<figure class="campus-card ${index < 2 ? 'campus-feature' : ''}"><img src="${image}" alt="${name} campus in ${location.split(' · ')[0]}" loading="lazy" decoding="async" width="800" height="500" /><figcaption><span>0${index + 1}</span><strong>${name}</strong><small>${location}</small></figcaption></figure>`).join('')}</div><p class="image-credit">Campus photographs via Wikimedia Commons · Institution names are used for inspiration</p></section>

      <section class="syllabus section-shell" id="syllabus"><div class="section-heading"><div><p class="kicker">Choose your path</p><h2>Know the terrain.<br /><em>Own the journey.</em></h2></div><p class="section-note">Your syllabus isn’t a wall to climb.<br />It’s a map to follow.</p></div><div class="stream-tabs" role="tablist"><button class="stream-tab ${activeStream === 'cseit' ? 'active coral' : ''}" data-stream="cseit" role="tab"><span>CSE / IT</span><small>Computer Science</small></button><button class="stream-tab ${activeStream === 'eceda' ? 'active blue' : ''}" data-stream="eceda" role="tab"><span>ECE / DA</span><small>Electronics & Data Science</small></button></div><div class="syllabus-intro"><p>${stream.intro}</p><span class="mono-label">${stream.eyebrow}</span></div><div class="module-grid">${stream.modules.map(([number, title, details, duration]) => `<article class="module-card"><span class="module-number">${number}</span><div><h3>${title}</h3><p>${details}</p></div><span class="module-time">${duration}</span></article>`).join('')}</div></section>

      <section class="daily-section section-shell" id="daily"><div class="daily-heading section-heading"><div><p class="kicker">Make today count</p><h2>One day.<br /><em>Fully yours.</em></h2></div><div class="daily-progress"><strong>${dailyPlan.targets.filter((target) => target.completed).length}/${dailyPlan.targets.length}</strong><span>targets complete</span><div class="progress-track"><i style="width: ${dailyPlan.targets.length ? (dailyPlan.targets.filter((target) => target.completed).length / dailyPlan.targets.length) * 100 : 0}%"></i></div></div></div><div class="daily-grid"><div class="target-panel"><div class="panel-topline"><span class="mono-label">TODAY'S TARGETS</span><button class="clear-targets" data-clear-completed type="button">Clear completed</button></div><ul class="target-list">${dailyPlan.targets.map((target) => `<li class="target-item ${target.completed ? 'is-complete' : ''}"><label><input type="checkbox" data-target-toggle="${escapeHTML(target.id)}" ${target.completed ? 'checked' : ''} /><span class="target-check"></span><span class="target-copy"><strong>${escapeHTML(target.title)}</strong><small>${escapeHTML(target.detail || 'Personal target')}</small></span></label></li>`).join('')}</ul><form class="target-form" data-target-form><input name="target" type="text" maxlength="80" placeholder="Add a target for today" aria-label="Add a target for today" required /><button type="submit" aria-label="Add target">+</button></form></div><aside class="notes-panel"><label for="daily-notes"><span class="mono-label">YOUR NOTES</span><strong>Leave a note for tomorrow-you.</strong></label><textarea id="daily-notes" maxlength="1000" placeholder="What did you learn? What needs another look?">${escapeHTML(dailyPlan.notes || '')}</textarea><span class="notes-hint">Saved automatically in this browser</span></aside></div></section>

      <section class="practice-section section-shell" id="practice"><div class="section-heading"><div><p class="kicker">Practise with intent</p><h2>Think clearly.<br /><em>Answer precisely.</em></h2></div><p class="section-note">One GATE-style prompt.<br />One focused attempt.</p></div><div class="practice-grid"><article class="question-card"><div class="question-topline"><span class="mono-label">${questions[questionIndex].topic}</span><span class="question-count">0${questionIndex + 1} / 0${questions.length}</span></div><h3>${questions[questionIndex].prompt}</h3><div class="answer-area ${questionAnswerVisible ? 'is-visible' : ''}"><span class="mono-label">ANSWER</span><p>${questionAnswerVisible ? questions[questionIndex].answer : 'Commit to an answer before revealing the explanation.'}</p></div><div class="question-actions"><button class="text-button" type="button" data-reveal-answer>${questionAnswerVisible ? 'Hide answer' : 'Reveal answer'}</button><button class="outline-button" type="button" data-next-question>Next question <span>→</span></button></div></article><aside class="solve-timer"><span class="mono-label">QUESTION TIMER</span><strong data-solve-display>${solveTimerMarkup()}</strong><p>Use a short sprint to build speed without sacrificing accuracy.</p><div class="timer-actions"><button class="timer-button" type="button" data-timer-toggle>${solveTimerRunning ? 'Pause' : 'Start'}</button><button class="timer-button secondary" type="button" data-timer-reset>Reset</button></div></aside></div></section>

      <section class="strategy-section" id="strategy"><div class="section-shell"><div class="section-heading strategy-heading"><div><p class="kicker">A strategy that lasts</p><h2>Small steps.<br /><em>Serious momentum.</em></h2></div><p class="section-note">There is no magic shortcut.<br />There is a reliable rhythm.</p></div><div class="plan-tabs" role="tablist">${['Foundation', 'Acceleration', 'Peak'].map((plan, index) => `<button class="plan-tab ${activePlan === plan ? 'active' : ''}" data-plan="${plan}"><span>0${index + 1}</span>${plan}</button>`).join('')}</div><div class="plan-content"><div class="plan-main"><span class="phase-label">PHASE 0${['Foundation', 'Acceleration', 'Peak'].indexOf(activePlan) + 1}</span><h3>${activePlan === 'Foundation' ? 'Build the base.' : activePlan === 'Acceleration' ? 'Turn knowledge into speed.' : 'Perform like it matters.'}</h3><p>${activePlan === 'Foundation' ? 'Complete one deliberate pass through every concept. Make your notes short, your understanding deep, and your doubts visible.' : activePlan === 'Acceleration' ? 'Shift from learning to solving. Mix subjects, increase question volume, and use every test to expose the next gap.' : 'Simulate the real thing. Revise from your error log, protect your energy, and make accuracy your final advantage.'}</p></div><ol class="plan-steps">${(activePlan === 'Foundation' ? ['Set a weekly subject target', 'Learn concepts before shortcuts', 'Solve 20–30 questions daily'] : activePlan === 'Acceleration' ? ['Take one sectional test each week', 'Build and revisit an error log', 'Practice mixed-topic problem sets'] : ['Take two full mocks each week', 'Revise formulas and weak areas', 'Sleep well and trust the process']).map((item, index) => `<li><span>0${index + 1}</span>${item}</li>`).join('')}</ol></div></div></section>

      <section class="rhythm section-shell" id="rhythm"><div class="rhythm-card"><div><p class="kicker">The daily rhythm</p><h2>Consistency beats<br /><em>intensity.</em></h2></div><div class="rhythm-items"><div><span>01</span><strong>Learn</strong><p>90 min of one focused concept</p></div><div><span>02</span><strong>Solve</strong><p>60 min of timed questions</p></div><div><span>03</span><strong>Review</strong><p>30 min with your error log</p></div></div><a class="circle-arrow" href="#top" aria-label="Back to top">↑</a></div></section>
    </main>
    <footer class="site-footer section-shell"><span>GATEPRIME</span><span>Build your edge, one day at a time.</span><span class="mono-label">Made for the determined</span></footer>
  `
  document.querySelectorAll('[data-stream]').forEach((button) => button.addEventListener('click', () => { activeStream = button.dataset.stream; render() }))
  document.querySelectorAll('[data-plan]').forEach((button) => button.addEventListener('click', () => { activePlan = button.dataset.plan; render() }))
  document.querySelectorAll('[data-quote]').forEach((button) => button.addEventListener('click', () => { quoteIndex = button.dataset.quote === 'next' ? (quoteIndex + 1) % quotes.length : (quoteIndex - 1 + quotes.length) % quotes.length; render() }))
  document.querySelector('[data-reveal-answer]').addEventListener('click', () => { questionAnswerVisible = !questionAnswerVisible; render() })
  document.querySelector('[data-next-question]').addEventListener('click', () => { questionIndex = (questionIndex + 1) % questions.length; questionAnswerVisible = false; solveSeconds = 0; stopSolveTimer(); render() })
  document.querySelector('[data-timer-toggle]').addEventListener('click', () => { if (solveTimerRunning) stopSolveTimer(); else startSolveTimer(); render() })
  document.querySelector('[data-timer-reset]').addEventListener('click', () => { solveSeconds = 0; stopSolveTimer(); render() })
  document.querySelectorAll('[data-target-toggle]').forEach((checkbox) => checkbox.addEventListener('change', () => { const target = dailyPlan.targets.find((item) => item.id === checkbox.dataset.targetToggle); if (!target) return; target.completed = checkbox.checked; saveDailyPlan(); checkbox.closest('.target-item').classList.toggle('is-complete', checkbox.checked); const completed = dailyPlan.targets.filter((item) => item.completed).length; const progress = document.querySelector('.daily-progress'); progress.querySelector('strong').textContent = `${completed}/${dailyPlan.targets.length}`; progress.querySelector('.progress-track i').style.width = `${dailyPlan.targets.length ? (completed / dailyPlan.targets.length) * 100 : 0}%` }))
  document.querySelector('[data-target-form]').addEventListener('submit', (event) => { event.preventDefault(); const input = event.currentTarget.elements.target; const title = input.value.trim(); if (!title) return; dailyPlan.targets.push({ id: `custom-${Date.now()}`, title, detail: 'Personal target', completed: false }); saveDailyPlan(); render() })
  document.querySelector('[data-clear-completed]').addEventListener('click', () => { dailyPlan.targets = dailyPlan.targets.filter((target) => !target.completed); saveDailyPlan(); render() })
  document.querySelector('#daily-notes').addEventListener('input', (event) => { dailyPlan.notes = event.target.value; saveDailyPlan() })
}

render()
function startSolveTimer() { if (solveTimerRunning) return; solveTimerRunning = true; solveTimerId = setInterval(() => { solveSeconds += 1; const display = document.querySelector('[data-solve-display]'); if (display) display.textContent = solveTimerMarkup() }, 1000) }
function stopSolveTimer() { solveTimerRunning = false; clearInterval(solveTimerId) }
setInterval(updateCountdown, 1000)
