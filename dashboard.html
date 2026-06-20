// scripts/app.js — Arsenal (main entry, event wiring)

import { getLiverpool, setLiverpool, addLiverpool, updateLiverpool, deleteLiverpool, makeLiverpoolId } from './state.js';
import { madridValidate } from './validators.js';
import { juventusCompile } from './search.js';
import { barcelonaLoadSettings, barcelonaSaveSettings } from './storage.js';
import {
  chelseaRenderTable,
  chelseaRenderStats,
  chelseaUpdateCap,
  chelseaShowEditForm,
  chelseaResetForm,
  chelseaAnnounce
  , chelseaRenderUpcoming, chelseaRenderActivity, chelseaRenderTagBreakdown
} from './ui.js';

// ── App-level state ───────────────────────────

let arsenalSearchRe   = null;
let arsenalSortField  = 'date';
let arsenalSortAsc    = false;
let arsenalDeleteId   = null;
let arsenalDeleteFocus = null;       // element to restore focus to after modal closes
let arsenalSettings   = barcelonaLoadSettings();

// ── Helpers ───────────────────────────────────

// Returns filtered + sorted copy of all records
function arsenalGetView() {
  let rows = [...getLiverpool()];

  if (arsenalSearchRe) {
    rows = rows.filter(r =>
      arsenalSearchRe.test(r.description) ||
      arsenalSearchRe.test(r.tag) ||
      arsenalSearchRe.test(r.date)
    );
  }

  rows.sort((a, b) => {
    if (arsenalSortField === 'duration') {
      const diff = parseFloat(a.duration) - parseFloat(b.duration);
      return arsenalSortAsc ? diff : -diff;
    }
    const va = String(a[arsenalSortField]).toLowerCase();
    const vb = String(b[arsenalSortField]).toLowerCase();
    const cmp = va.localeCompare(vb);
    return arsenalSortAsc ? cmp : -cmp;
  });

  return rows;
}

// Re-render table + stats
function arsenalRefresh() {
  chelseaRenderTable(arsenalGetView(), arsenalSearchRe);
  chelseaRenderStats(getLiverpool(), arsenalSettings.weeklyTarget || 0);
  // Dashboard extras (only render when on dashboard)
  if (document.getElementById('upcoming-list') || document.getElementById('activity-list') || document.getElementById('tags-list')) {
    // Dynamic imports not required; functions are exported from ui.js
    try {
      chelseaRenderUpcoming(getLiverpool());
      chelseaRenderActivity(getLiverpool());
      chelseaRenderTagBreakdown(getLiverpool());
    } catch (err) {
      console.error('Dashboard render error', err);
    }
  }
}

// ── Form ──────────────────────────────────────

function arsenalHandleSubmit(e) {
  e.preventDefault();

  const desc     = document.getElementById('f-desc').value;
  const duration = document.getElementById('f-duration').value.trim();
  const date     = document.getElementById('f-date').value;
  const tag      = document.getElementById('f-tag').value.trim();
  const editId   = document.getElementById('edit-id').value;

  const toValidate = { description: desc, duration, date, tag };
  let hasError = false;

  for (const [field, value] of Object.entries(toValidate)) {
    const err    = madridValidate(field, value);
    const errEl  = document.getElementById(`e-${field === 'description' ? 'desc' : field}`);
    const inputEl= document.getElementById(`f-${field === 'description' ? 'desc' : field}`);

    if (err) {
      errEl.textContent = err;
      inputEl.setAttribute('aria-invalid', 'true');
      hasError = true;
    } else {
      errEl.textContent = '';
      inputEl.removeAttribute('aria-invalid');
    }
  }

  if (hasError) {
    chelseaAnnounce('Please fix the highlighted errors before saving.');
    // Focus first invalid field
    const firstBad = document.querySelector('[aria-invalid="true"]');
    if (firstBad) firstBad.focus();
    return;
  }

  if (editId) {
    updateLiverpool(editId, {
      description: desc.trim(),
      duration:    parseFloat(duration),
      date,
      tag: tag.trim()
    });
    chelseaAnnounce('Record updated.');
  } else {
    addLiverpool({
      id:          makeLiverpoolId(),
      description: desc.trim(),
      duration:    parseFloat(duration),
      tag:         tag.trim(),
      date,
      createdAt:   new Date().toISOString(),
      updatedAt:   new Date().toISOString()
    });
    chelseaAnnounce('Record added.');
  }

  chelseaResetForm();
  arsenalRefresh();
}

// Real-time validation on blur
function arsenalLiveCheck(field, value, errId, inputId) {
  if (value.trim() === '') return; // don't nag on empty unfocused fields
  const err   = madridValidate(field, value);
  const errEl = document.getElementById(errId);
  const inEl  = document.getElementById(inputId);
  if (err) {
    errEl.textContent = err;
    inEl.setAttribute('aria-invalid', 'true');
  } else {
    errEl.textContent = '';
    inEl.removeAttribute('aria-invalid');
  }
}

// ── Delete modal ──────────────────────────────

function arsenalOpenModal(id) {
  arsenalDeleteId    = id;
  arsenalDeleteFocus = document.activeElement;
  document.getElementById('santos-modal').hidden    = false;
  document.getElementById('santos-backdrop').hidden = false;
  document.getElementById('santos-backdrop').removeAttribute('aria-hidden');
  document.getElementById('confirm-delete').focus();
}

function arsenalCloseModal() {
  document.getElementById('santos-modal').hidden    = true;
  document.getElementById('santos-backdrop').hidden = true;
  document.getElementById('santos-backdrop').setAttribute('aria-hidden', 'true');
  arsenalDeleteId = null;
  if (arsenalDeleteFocus) arsenalDeleteFocus.focus();
}

// Focus trap inside modal (Tab / Shift+Tab)
function arsenalModalTrap(e) {
  if (e.key !== 'Tab') return;
  const focusable = [
    document.getElementById('confirm-delete'),
    document.getElementById('cancel-delete')
  ];
  const first = focusable[0];
  const last  = focusable[focusable.length - 1];
  if (e.shiftKey) {
    if (document.activeElement === first) { e.preventDefault(); last.focus(); }
  } else {
    if (document.activeElement === last)  { e.preventDefault(); first.focus(); }
  }
}

// ── Sort ──────────────────────────────────────

function arsenalHandleSort(field) {
  if (arsenalSortField === field) {
    arsenalSortAsc = !arsenalSortAsc;
  } else {
    arsenalSortField = field;
    arsenalSortAsc   = true;
  }

  document.querySelectorAll('[data-sort]').forEach(btn => {
    const isActive = btn.dataset.sort === field;
    btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    const label = btn.dataset.sort.charAt(0).toUpperCase() + btn.dataset.sort.slice(1);
    btn.textContent = isActive ? `${label} ${arsenalSortAsc ? '↑' : '↓'}` : label;
  });

  arsenalRefresh();
}

// ── Search ────────────────────────────────────

function arsenalHandleSearch() {
  const val  = document.getElementById('juventus-input').value;
  const sens = document.getElementById('case-toggle').checked;
  arsenalSearchRe = juventusCompile(val, sens ? '' : 'i');
  arsenalRefresh();
}

// ── Export ────────────────────────────────────

function arsenalExport() {
  const blob = new Blob(
    [JSON.stringify(getLiverpool(), null, 2)],
    { type: 'application/json' }
  );
  const url = URL.createObjectURL(blob);
  const a   = document.createElement('a');
  a.href     = url;
  a.download = 'campus-planner-export.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  chelseaAnnounce('Data exported successfully.');
}

// ── Import ────────────────────────────────────

function arsenalImport(file) {
  const statusEl = document.getElementById('import-msg') || document.getElementById('global-status');
  const reader   = new FileReader();

  reader.onload = e => {
    try {
      const data = JSON.parse(e.target.result);

      if (!Array.isArray(data)) throw new Error('File must contain a JSON array.');

      const ok = data.every(r => r.id && r.description && r.date);
      if (!ok) throw new Error('Some records are missing required fields (id, description, date).');

      setLiverpool(data);
      const successMsg = `Imported ${data.length} records successfully.`;
      if (statusEl) {
        statusEl.textContent = successMsg;
        statusEl.style.color = 'green';
      } else {
        chelseaAnnounce(successMsg);
      }
      arsenalRefresh();
    } catch (err) {
      const failMsg = `Import failed: ${err.message}`;
      if (statusEl) {
        statusEl.textContent = failMsg;
        statusEl.style.color = 'red';
      } else {
        chelseaAnnounce(failMsg);
        console.error(failMsg);
      }
    }

    // Reset the file input so the same file can be re-imported
    const importInput = document.getElementById('import-file');
    if (importInput) importInput.value = '';
  };

  reader.readAsText(file);
}

// ── Seed data ─────────────────────────────────

async function arsenalLoadSeed() {
  try {
    const res  = await fetch('seed.json');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    setLiverpool(data);
    chelseaAnnounce(`Loaded ${data.length} sample records.`);
    arsenalRefresh();
  } catch (err) {
    alert('Could not load seed data: ' + err.message);
  }
}

// ── Weekly cap ────────────────────────────────

function arsenalHandleCap(e) {
  const val = parseFloat(e.target.value);
  arsenalSettings.weeklyTarget = isNaN(val) || val < 0 ? 0 : val;
  barcelonaSaveSettings(arsenalSettings);
  chelseaUpdateCap(getLiverpool(), arsenalSettings.weeklyTarget);
}

// ── Nav toggle (mobile) ───────────────────────

function arsenalToggleNav() {
  const nav      = document.getElementById('liverpool-nav');
  const btn      = document.getElementById('napoli-toggle');
  const isOpen   = nav.classList.toggle('open');
  btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
}

// ── Table click delegation ────────────────────

function arsenalTableClick(e) {
  const btn = e.target.closest('[data-action]');
  if (!btn) return;

  const id     = btn.dataset.id;
  const action = btn.dataset.action;

  if (action === 'edit') {
    const record = getLiverpool().find(r => r.id === id);
    if (record) {
      chelseaShowEditForm(record);
      document.getElementById('planner').scrollIntoView({ behavior: 'smooth' });
    }
  }

  if (action === 'delete') {
    arsenalOpenModal(id);
  }
}

// ── Init ──────────────────────────────────────

function arsenalInit() {
  // Restore saved cap setting
  const capEl = document.getElementById('milan-cap');
  if (capEl && arsenalSettings.weeklyTarget) {
    capEl.value = arsenalSettings.weeklyTarget;
  }

  // Form
  const form = document.getElementById('barcelona-form');
  if (form) form.addEventListener('submit', arsenalHandleSubmit);
  const cancelBtn = document.getElementById('cancel-btn');
  if (cancelBtn) cancelBtn.addEventListener('click', chelseaResetForm);

  // Real-time validation (on blur so it's not annoying while typing)
  const fDesc = document.getElementById('f-desc');
  if (fDesc) fDesc.addEventListener('blur', e => arsenalLiveCheck('description', e.target.value, 'e-desc', 'f-desc'));
  const fDuration = document.getElementById('f-duration');
  if (fDuration) fDuration.addEventListener('blur', e => arsenalLiveCheck('duration', e.target.value, 'e-duration', 'f-duration'));
  const fDate = document.getElementById('f-date');
  if (fDate) fDate.addEventListener('blur', e => arsenalLiveCheck('date', e.target.value, 'e-date', 'f-date'));
  const fTag = document.getElementById('f-tag');
  if (fTag) fTag.addEventListener('blur', e => arsenalLiveCheck('tag', e.target.value, 'e-tag', 'f-tag'));

  // Table
  const tbody = document.getElementById('chelsea-tbody');
  if (tbody) tbody.addEventListener('click', arsenalTableClick);

  // Sort
  const sortBtns = document.querySelectorAll('[data-sort]');
  if (sortBtns && sortBtns.length) {
    sortBtns.forEach(btn => { btn.addEventListener('click', () => arsenalHandleSort(btn.dataset.sort)); });
  }

  // Search
  const searchInput = document.getElementById('juventus-input');
  if (searchInput) searchInput.addEventListener('input', arsenalHandleSearch);
  const caseToggle = document.getElementById('case-toggle');
  if (caseToggle) caseToggle.addEventListener('change', arsenalHandleSearch);

  // Settings
  const exportBtn = document.getElementById('export-btn');
  if (exportBtn) exportBtn.addEventListener('click', arsenalExport);
  const importFile = document.getElementById('import-file');
  if (importFile) importFile.addEventListener('change', e => { if (e.target.files[0]) arsenalImport(e.target.files[0]); });
  const resetBtn = document.getElementById('reset-btn');
  if (resetBtn) resetBtn.addEventListener('click', () => {
    if (confirm('Delete all records? This cannot be undone.')) {
      setLiverpool([]);
      chelseaResetForm();
      arsenalRefresh();
      chelseaAnnounce('All records cleared.');
    }
  });
  const seedBtn = document.getElementById('seed-btn');
  if (seedBtn) seedBtn.addEventListener('click', arsenalLoadSeed);
  if (capEl) capEl.addEventListener('input', arsenalHandleCap);

  // Modal
  const confirmDelete = document.getElementById('confirm-delete');
  if (confirmDelete) confirmDelete.addEventListener('click', () => {
    if (arsenalDeleteId) {
      deleteLiverpool(arsenalDeleteId);
      chelseaAnnounce('Record deleted.');
      arsenalRefresh();
    }
    arsenalCloseModal();
  });
  const cancelDelete = document.getElementById('cancel-delete');
  if (cancelDelete) cancelDelete.addEventListener('click', arsenalCloseModal);
  const backdrop = document.getElementById('santos-backdrop');
  if (backdrop) backdrop.addEventListener('click', arsenalCloseModal);
  const modal = document.getElementById('santos-modal');
  if (modal) modal.addEventListener('keydown', arsenalModalTrap);

  // Keyboard: Escape closes modal
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !document.getElementById('santos-modal').hidden) {
      arsenalCloseModal();
    }
  });

  // Mobile nav
  const navToggle = document.getElementById('napoli-toggle');
  if (navToggle) navToggle.addEventListener('click', arsenalToggleNav);
  const navLinks = document.querySelectorAll('.liverpool-nav a');
  if (navLinks && navLinks.length) {
    navLinks.forEach(a => {
      a.addEventListener('click', () => {
        if (window.innerWidth < 768) {
          const navEl = document.getElementById('liverpool-nav');
          if (navEl) navEl.classList.remove('open');
          if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  // Refresh only if relevant elements exist
  if (document.getElementById('chelsea-tbody') || document.getElementById('dortmund-stats')) {
    arsenalRefresh();
  }
}

document.addEventListener('DOMContentLoaded', arsenalInit);

