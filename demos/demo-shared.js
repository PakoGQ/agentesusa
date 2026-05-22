// demo-shared.js — Shared nav, language toggle, and toast for all Nexus demo pages

(function () {

  // ─── Pages manifest ───
  const PAGES = [
    { id: 'dashboard', url: 'dashboard-home.html', en: 'Dashboard',  es: 'Dashboard' },
    { id: 'clients',   url: 'client-detail.html',  en: 'Clients',    es: 'Clientes' },
    { id: 'documents', url: 'document-search.html', en: 'Documents', es: 'Documentos' },
    { id: 'calendar',  url: 'calendar.html',        en: 'Calendar',  es: 'Calendario' },
    { id: 'reports',   url: 'reports.html',         en: 'Reports',   es: 'Reportes' },
  ];

  // ─── Toast system ───
  window.showToast = function (message, color) {
    color = color || 'blue';
    const colors = { blue: 'bg-blue-600', green: 'bg-green-600', red: 'bg-red-600', amber: 'bg-amber-500' };
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'fixed top-6 right-6 z-50 space-y-2';
      document.body.appendChild(container);
    }
    const div = document.createElement('div');
    div.className = (colors[color] || colors.blue) + ' text-white text-sm px-5 py-3 rounded-xl shadow-xl max-w-sm font-medium';
    div.style.cssText = 'animation: toastIn 0.35s ease';
    div.textContent = message;
    container.prepend(div);
    setTimeout(function () {
      div.style.animation = 'toastOut 0.35s ease forwards';
      setTimeout(function () { div.remove(); }, 350);
    }, 3500);
  };
  // Alias for backwards compat
  window.toast = window.showToast;

  // ─── Language system ───
  var _lang = localStorage.getItem('nexus-demo-lang') || 'en';

  window.setDemoLang = function (lang) {
    _lang = lang;
    localStorage.setItem('nexus-demo-lang', lang);
    _applyLang(lang);
  };

  window.getDemoLang = function () { return _lang; };

  function _applyLang(lang) {
    // Show/hide .en-text and .es-text elements
    document.querySelectorAll('.en-text').forEach(function (el) {
      el.style.display = (lang === 'en') ? '' : 'none';
    });
    document.querySelectorAll('.es-text').forEach(function (el) {
      el.style.display = (lang === 'es') ? '' : 'none';
    });
    // Update toggle buttons
    var btnEn = document.getElementById('lang-btn-en');
    var btnEs = document.getElementById('lang-btn-es');
    if (btnEn) { btnEn.className = btnEn.className.replace(/\bactive\b/, ''); }
    if (btnEs) { btnEs.className = btnEs.className.replace(/\bactive\b/, ''); }
    var active = document.getElementById('lang-btn-' + lang);
    if (active) { active.classList.add('active'); }
    // Rebuild nav labels
    _renderNav();
  }

  // ─── Nav renderer ───
  window.initDemoNav = function (activePage, userName) {
    _activePage = activePage || 'dashboard';
    _userName = userName || 'Carlos';
    _renderNav();
    // Inject shared CSS for animations if not present
    if (!document.getElementById('demo-shared-css')) {
      var style = document.createElement('style');
      style.id = 'demo-shared-css';
      style.textContent = [
        '@keyframes toastIn { from { transform: translateX(120%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }',
        '@keyframes toastOut { from { opacity: 1; } to { opacity: 0; transform: translateX(120%); } }',
      ].join('');
      document.head.appendChild(style);
    }
  };

  var _activePage = 'dashboard';
  var _userName = 'Carlos';

  function _renderNav() {
    var container = document.getElementById('demo-nav-links');
    if (!container) return;
    var lang = _lang;
    container.innerHTML = PAGES.map(function (p) {
      var isActive = (p.id === _activePage);
      var label = p[lang] || p.en;
      var cls = isActive
        ? 'px-4 py-1.5 text-sm font-semibold text-slate-900 bg-slate-100 rounded-lg'
        : 'px-4 py-1.5 text-sm text-slate-600 hover:bg-slate-100 rounded-lg transition';
      return '<a href="' + p.url + '" class="' + cls + '">' + label + '</a>';
    }).join('');

    // Update language toggle buttons if they exist
    var btnEn = document.getElementById('lang-btn-en');
    var btnEs = document.getElementById('lang-btn-es');
    if (btnEn && btnEs) {
      var baseClass = 'px-3 py-1 rounded font-bold text-xs transition lang-btn';
      btnEn.className = baseClass + (lang === 'en' ? ' text-white bg-slate-700 active' : ' text-slate-400 hover:text-white');
      btnEs.className = baseClass + (lang === 'es' ? ' text-white bg-slate-700 active' : ' text-slate-400 hover:text-white');
    }
  }

  // ─── Auto-init on DOM ready ───
  document.addEventListener('DOMContentLoaded', function () {
    _applyLang(_lang);
  });

})();
