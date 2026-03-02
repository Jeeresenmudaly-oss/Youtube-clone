// ===== VIDEO DATA =====
const VIDEOS = [
  { ytId:'dQw4w9WgXcQ', title:'Speak Richer Prompts to ChatGPT. Flow Formats Them Perfectly for Better Results.', channel:'Wispr Flow', avatar:'https://i.pravatar.cc/36?img=10', views:'Sponsored', time:'', dur:'12:34', cats:['ai','podcasts'], verified:false, sponsored:true },
  { ytId:'LqK3bUjMqS0', title:'I Trained My Own AI... It beat ChatGPT', channel:'PewDiePie', avatar:'https://i.pravatar.cc/36?img=11', views:'1.4m views', time:'2 days ago', dur:'25:35', cats:['ai','trending'], verified:true },
  { ytId:'6FbhCBF8UXE', title:"I Investigated South Africa's Most Controversial Movement", channel:'Wide Awake Podcast', avatar:'https://i.pravatar.cc/36?img=12', views:'332k views', time:'5 days ago', dur:'35:36', cats:['podcasts','news'], verified:true },
  { ytId:'vfhzo499OeA', title:'Full interview: Anthropic CEO responds to Trump order, Pentagon clash', channel:'CBS News', avatar:'https://i.pravatar.cc/36?img=13', views:'2.1m views', time:'3 days ago', dur:'27:44', cats:['news','ai'], verified:true },
  { ytId:'Ks-_Mh1QhMc', title:'I Took the Longest Bus Ride in America', channel:'Ryan Trahan', avatar:'https://i.pravatar.cc/36?img=14', views:'8.9m views', time:'1 week ago', dur:'27:19', cats:['trending','uploaded'], verified:true },
  { ytId:'N3bZGvhm5w0', title:'LIVE: Israel and Iran exchange fresh attacks | BBC News', channel:'BBC News', avatar:'https://i.pravatar.cc/36?img=15', views:'', time:'', dur:'LIVE', cats:['news','live'], verified:true, live:true },
  { ytId:'rfscVS0vtbw', title:'Learn Python - Full Course for Beginners', channel:'freeCodeCamp', avatar:'https://i.pravatar.cc/36?img=16', views:'45m views', time:'4 years ago', dur:'4:26:51', cats:['coding','trending'], verified:true },
  { ytId:'ysz5S6PUM-U', title:'The History of the Internet in 100 Seconds', channel:'Fireship', avatar:'https://i.pravatar.cc/36?img=17', views:'4.2m views', time:'2 years ago', dur:'1:48', cats:['coding','ai'], verified:true },
  { ytId:'W6NZfCO5SIk', title:'JavaScript Tutorial for Beginners – Full Course in 12 Hours', channel:'Programming with Mosh', avatar:'https://i.pravatar.cc/36?img=18', views:'12m views', time:'3 years ago', dur:'12:01:42', cats:['coding'], verified:true },
  { ytId:'Wjy9QMm9fjA', title:'I Built My Dream PC Setup for 2025 (Budget Edition)', channel:'Linus Tech Tips', avatar:'https://i.pravatar.cc/36?img=19', views:'3.8m views', time:'2 weeks ago', dur:'18:22', cats:['trending','ideas'], verified:true },
  { ytId:'kJQP7kiw5Fk', title:'Luis Fonsi – Despacito ft. Daddy Yankee', channel:'Luis Fonsi', avatar:'https://i.pravatar.cc/36?img=20', views:'8.2b views', time:'7 years ago', dur:'4:42', cats:['music'], verified:true },
  { ytId:'2Vv-BfVoq4g', title:'Ed Sheeran – Perfect (Official Music Video)', channel:'Ed Sheeran', avatar:'https://i.pravatar.cc/36?img=21', views:'3.4b views', time:'6 years ago', dur:'4:40', cats:['music'], verified:true },
  { ytId:'YQHsXMglC9A', title:'Adele – Hello', channel:'Adele', avatar:'https://i.pravatar.cc/36?img=22', views:'3.2b views', time:'8 years ago', dur:'6:07', cats:['music'], verified:true },
  { ytId:'9bZkp7q19f0', title:'PSY – GANGNAM STYLE M/V', channel:'officialpsy', avatar:'https://i.pravatar.cc/36?img=23', views:'5.1b views', time:'12 years ago', dur:'4:13', cats:['music','comedy'], verified:true },
  { ytId:'oHg5SJYRHA0', title:"RickRoll'd", channel:'cotter548', avatar:'https://i.pravatar.cc/36?img=24', views:'163m views', time:'16 years ago', dur:'3:33', cats:['comedy'], verified:false },
  { ytId:'fHsa9DqmId8', title:"Supercar Blondie – Testing the World's Most Expensive Cars", channel:'Supercar Blondie', avatar:'https://i.pravatar.cc/36?img=25', views:'9.4m views', time:'3 months ago', dur:'22:17', cats:['supercar'], verified:true },
  { ytId:'t8jnHIUTWQQ', title:'Top 10 Supercars of 2025 – Full Review', channel:'CarWow', avatar:'https://i.pravatar.cc/36?img=26', views:'5.6m views', time:'1 month ago', dur:'31:05', cats:['supercar'], verified:true },
  { ytId:'pBy1zgt0XPc', title:'CSS Grid in 100 Seconds', channel:'Fireship', avatar:'https://i.pravatar.cc/36?img=27', views:'1.1m views', time:'3 years ago', dur:'1:54', cats:['coding'], verified:true }
];

const SUGGESTIONS = [
  'ai tutorial 2025','how to build a portfolio','e-commerce website',
  'supercar review 2025','live news stream','javascript crash course',
  'python for beginners','dark mode css','react full course'
];

var currentCat = 'all';
var darkMode = localStorage.getItem('yt-dark') === '1';
var sidebarVisible = true;
var toastTimer = null;

document.addEventListener('DOMContentLoaded', function () {
  applyTheme();
  renderGrid('all');
  setupSearch();
  setupSidebar();
  setupDotsMenu();
  setupChips();
  setupSidebarItems();
  document.getElementById('overlay').addEventListener('click', closeAllMenus);
});

// ===== RENDER =====
function renderGrid(cat) {
  var grid = document.getElementById('videoGrid');
  var list = cat === 'all' ? VIDEOS : VIDEOS.filter(function(v) { return v.cats.includes(cat); });
  if (list.length === 0) {
    grid.innerHTML = '<p style="padding:60px;color:var(--text2)">No videos found.</p>';
    return;
  }
  grid.innerHTML = list.map(buildCard).join('');
}

function buildCard(v) {
  var thumb   = 'https://img.youtube.com/vi/' + v.ytId + '/maxresdefault.jpg';
  var fallback = 'https://img.youtube.com/vi/' + v.ytId + '/hqdefault.jpg';
  var check   = v.verified ? '<svg class="vchannel-check" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>' : '';
  var badge   = v.live ? '<span class="live-badge">🔴 LIVE</span>' : '<span class="dur-badge">' + v.dur + '</span>';
  var stats   = v.sponsored
    ? '<div class="vstats"><strong>Sponsored</strong> · ' + v.channel + '</div><div class="ad-btns"><button class="btn-watch" data-action="watch">Watch</button><button class="btn-visit" data-action="visit">Visit site</button></div>'
    : '<div class="vstats">' + v.views + (v.time ? ' • ' + v.time : '') + '</div>';

  return '<div class="vcard" data-ytid="' + v.ytId + '">'
    + '<div class="thumb-wrap">'
    +   '<img src="' + thumb + '" alt="' + v.title + '" loading="lazy" onerror="this.onerror=null;this.src=\'' + fallback + '\'">'
    +   badge
    + '</div>'
    + '<div class="vinfo">'
    +   '<img class="avatar" src="' + v.avatar + '" alt="' + v.channel + '" loading="lazy">'
    +   '<div class="vmeta">'
    +     '<div class="vtitle">' + v.title + '</div>'
    +     '<div class="vchannel">' + v.channel + check + '</div>'
    +     stats
    +   '</div>'
    +   '<div class="card-dots" data-ytid="' + v.ytId + '">'
    +     '<svg class="icon-md" viewBox="0 0 24 24"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>'
    +     '<div class="card-menu" id="cm-' + v.ytId + '">'
    +       '<div class="card-menu-item" data-action="watchlater"><svg class="icon-md" viewBox="0 0 24 24"><path d="M22 3H2C.9 3 0 3.9 0 5v14c0 1.1.9 2 2 2h20c1.1 0 1.99-.9 1.99-2L24 5c0-1.1-.9-2-2-2zm-1 16H3V6h18v12zM9 10v8l7-4z"/></svg> Save to Watch Later</div>'
    +       '<div class="card-menu-item" data-action="playlist"><svg class="icon-md" viewBox="0 0 24 24"><path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/></svg> Save to playlist</div>'
    +       '<div class="card-menu-item" data-action="share"><svg class="icon-md" viewBox="0 0 24 24"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"/></svg> Share</div>'
    +       '<div class="card-menu-item" data-action="notinterested"><svg class="icon-md" viewBox="0 0 24 24"><path d="M15 2H9c-1.1 0-2 .9-2 2v2H3v2h2v12c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V8h2V6h-4V4c0-1.1-.9-2-2-2zm-3 14c-.55 0-1-.45-1-1v-4c0-.55.45-1 1-1s1 .45 1 1v4c0 .55-.45 1-1 1zm3-14v2H9V4h6z"/></svg> Not interested</div>'
    +     '</div>'
    +   '</div>'
    + '</div>'
    + '</div>';
}

// ===== CLICK HANDLING =====
document.addEventListener('click', function(e) {
  var dots = e.target.closest('.card-dots');
  if (dots) {
    e.stopPropagation();
    closeAllMenus();
    var menu = document.getElementById('cm-' + dots.dataset.ytid);
    if (menu) { menu.classList.add('open'); document.getElementById('overlay').classList.add('show'); }
    return;
  }
  var mi = e.target.closest('.card-menu-item');
  if (mi) {
    e.stopPropagation();
    var a = mi.dataset.action;
    if (a === 'watchlater')    showToast('🕐 Saved to Watch Later');
    if (a === 'playlist')      showToast('📂 Saved to playlist');
    if (a === 'share')         showToast('🔗 Link copied!');
    if (a === 'notinterested') showToast('🚫 Got it – less like this');
    closeAllMenus();
    return;
  }
  var adBtn = e.target.closest('[data-action="watch"],[data-action="visit"]');
  if (adBtn) {
    e.stopPropagation();
    showToast(adBtn.dataset.action === 'watch' ? '▶ Watching...' : '🌐 Visiting site...');
    return;
  }
  var card = e.target.closest('.vcard');
  if (card && !e.target.closest('.card-dots')) {
    window.open('https://www.youtube.com/watch?v=' + card.dataset.ytid, '_blank');
  }
});

// ===== CHIPS =====
function setupChips() {
  document.querySelectorAll('.chip').forEach(function(chip) {
    chip.addEventListener('click', function() {
      document.querySelectorAll('.chip').forEach(function(c) { c.classList.remove('active'); });
      chip.classList.add('active');
      currentCat = chip.dataset.cat;
      renderGrid(currentCat);
    });
  });
}

// ===== SIDEBAR =====
function setupSidebar() {
  document.getElementById('menuBtn').addEventListener('click', function() {
    var sb   = document.getElementById('sidebar');
    var main = document.getElementById('mainEl');
    if (window.innerWidth <= 960) {
      sb.classList.toggle('mobile-open');
    } else {
      sidebarVisible = !sidebarVisible;
      sb.classList.toggle('collapsed', !sidebarVisible);
      main.classList.toggle('expanded', !sidebarVisible);
    }
  });
}

function setupSidebarItems() {
  var sbMap = { sbHome:'all', sbShorts:'shorts', sbTrending:'trending', sbMusic:'music', sbGaming:'gaming', sbNews:'news' };
  Object.keys(sbMap).forEach(function(id) {
    var el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('click', function() {
      document.querySelectorAll('.sb-item').forEach(function(i) { i.classList.remove('active'); });
      el.classList.add('active');
      currentCat = sbMap[id];
      renderGrid(currentCat);
      document.querySelectorAll('.chip').forEach(function(c) { c.classList.toggle('active', c.dataset.cat === currentCat); });
      if (window.innerWidth <= 960) { document.getElementById('sidebar').classList.remove('mobile-open'); document.getElementById('overlay').classList.remove('show'); }
    });
  });

  var toastMap = { sbSubs:'📺 Subscriptions coming soon', sbYou:'👤 Your channel', sbHistory:'📜 History', sbMore:'▼ Show more sections', sbPremium:'▶ YouTube Premium', sbYTMusic:'🎵 YouTube Music', sbKids:'👶 YouTube Kids', sbSettings:'⚙️ Settings', sbHelp:'❓ Help', sbFeedback:'💬 Send feedback' };
  Object.keys(toastMap).forEach(function(id) {
    var el = document.getElementById(id);
    if (el) el.addEventListener('click', function() { showToast(toastMap[id]); });
  });

  document.getElementById('signInBtn').addEventListener('click', function() { showToast('🔑 Sign in coming soon!'); });
  document.getElementById('sbSignInBtn').addEventListener('click', function() { showToast('🔑 Sign in coming soon!'); });
  document.getElementById('notifBtn').addEventListener('click', function() { showToast('🔔 3 new notifications'); });
}

// ===== DOTS MENU =====
function setupDotsMenu() {
  document.getElementById('dotsBtn').addEventListener('click', function(e) {
    e.stopPropagation();
    var menu = document.getElementById('dotsMenu');
    var open = menu.classList.toggle('open');
    document.getElementById('overlay').classList.toggle('show', open);
  });
  document.getElementById('darkRow').addEventListener('click', toggleDark);
  document.getElementById('menuSettings').addEventListener('click', function() { closeAllMenus(); showToast('⚙️ Settings coming soon'); });
  document.getElementById('menuLocation').addEventListener('click', function() { closeAllMenus(); showToast('🌍 Location: South Africa'); });
  document.getElementById('menuLang').addEventListener('click', function() { closeAllMenus(); showToast('🌐 Language: English'); });
  document.getElementById('menuHelp').addEventListener('click', function() { closeAllMenus(); showToast('❓ Help coming soon'); });
  document.getElementById('menuFeedback').addEventListener('click', function() { closeAllMenus(); showToast('💬 Feedback sent!'); });
}

function closeAllMenus() {
  document.getElementById('dotsMenu').classList.remove('open');
  document.getElementById('suggestions').classList.remove('open');
  document.getElementById('overlay').classList.remove('show');
  document.querySelectorAll('.card-menu.open').forEach(function(m) { m.classList.remove('open'); });
  if (window.innerWidth <= 960) document.getElementById('sidebar').classList.remove('mobile-open');
}

// ===== SEARCH =====
function setupSearch() {
  var input   = document.getElementById('searchInput');
  var clearBtn = document.getElementById('clearBtn');
  var sugBox  = document.getElementById('suggestions');

  input.addEventListener('input', function() {
    var q = input.value.trim();
    clearBtn.classList.toggle('show', q.length > 0);
    if (!q) { sugBox.classList.remove('open'); return; }
    var ql = q.toLowerCase();
    var hits = SUGGESTIONS.filter(function(s) { return s.includes(ql); })
      .concat(VIDEOS.filter(function(v) { return v.title.toLowerCase().includes(ql); }).slice(0,3).map(function(v) { return v.title; }))
      .slice(0, 8);
    if (!hits.length) { sugBox.classList.remove('open'); return; }
    sugBox.innerHTML = hits.map(function(h) {
      return '<div class="sug-item" data-query="' + h + '"><svg class="icon-sm" viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>' + h + '</div>';
    }).join('');
    sugBox.classList.add('open');
    document.getElementById('overlay').classList.add('show');
  });

  sugBox.addEventListener('click', function(e) {
    var item = e.target.closest('.sug-item');
    if (item) doSearch(item.dataset.query);
  });

  clearBtn.addEventListener('click', function() {
    input.value = ''; clearBtn.classList.remove('show'); sugBox.classList.remove('open');
    document.getElementById('overlay').classList.remove('show');
    renderGrid(currentCat);
  });

  document.getElementById('searchBtn').addEventListener('click', function() { doSearch(input.value); });
  input.addEventListener('keydown', function(e) { if (e.key === 'Enter') doSearch(input.value); });
}

function doSearch(q) {
  q = q.trim();
  if (!q) return;
  document.getElementById('searchInput').value = q;
  document.getElementById('clearBtn').classList.add('show');
  closeAllMenus();
  var ql = q.toLowerCase();
  var results = VIDEOS.filter(function(v) {
    return v.title.toLowerCase().includes(ql) || v.channel.toLowerCase().includes(ql) || v.cats.some(function(c) { return c.includes(ql); });
  });
  var grid = document.getElementById('videoGrid');
  if (!results.length) { grid.innerHTML = '<p style="padding:60px;color:var(--text2)">No results for "' + q + '"</p>'; showToast('🔍 No results found'); return; }
  grid.innerHTML = results.map(buildCard).join('');
  document.querySelectorAll('.chip').forEach(function(c) { c.classList.remove('active'); });
  showToast('🔍 ' + results.length + ' result' + (results.length > 1 ? 's' : '') + ' for "' + q + '"');
}

// ===== DARK MODE =====
function applyTheme() {
  document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
  var pill = document.getElementById('darkPill');
  if (pill) pill.classList.toggle('on', darkMode);
}

function toggleDark() {
  darkMode = !darkMode;
  localStorage.setItem('yt-dark', darkMode ? '1' : '0');
  applyTheme();
  showToast(darkMode ? '🌙 Dark theme on' : '☀️ Light theme on');
}

// ===== TOAST =====
function showToast(msg) {
  var el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(function() { el.classList.remove('show'); }, 2800);
}
