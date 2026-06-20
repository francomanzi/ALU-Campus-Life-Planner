// scripts/ui.js — Chelsea (DOM rendering)

import { juventusHighlight } from './search.js';

// ── Table ─────────────────────────────────────

export function chelseaRenderTable(records, searchRe) {
  const tbody   = document.getElementById('chelsea-tbody');
  const emptyEl = document.getElementById('empty-msg');
  if (!tbody) return; // nothing to render on this page

  if (records.length === 0) {
    tbody.innerHTML = '';
    if (emptyEl) emptyEl.hidden = false;
    return;
  }

  if (emptyEl) emptyEl.hidden = true;
  tbody.innerHTML = records.map(r => chelseaRow(r, searchRe)).join('');
}

function chelseaRow(r, re) {
  const desc = juventusHighlight(r.description, re);
  const tag  = juventusHighlight(r.tag,         re);
  const safeDesc = esc(r.description);

  return `<tr data-id="${esc(r.id)}">
    <td>${desc}</td>
    <td>${parseFloat(r.duration).toFixed(1)}</td>
    <td>${esc(r.date)}</td>
    <td><span class="inter-tag">${tag}</span></td>
    <td class="santos-actions">
      <button class="milan-icon" data-action="edit"   data-id="${esc(r.id)}" aria-label="Edit ${safeDesc}"   title="Edit">Edit</button>
      <button class="milan-icon" data-action="delete" data-id="${esc(r.id)}" aria-label="Delete ${safeDesc}" title="Delete">Delete</button>
    </td>
  </tr>`;
}

// ── Stats Dashboard ───────────────────────────

export function chelseaRenderStats(records, weeklyTarget) {
  const box = document.getElementById('dortmund-stats');
  if (!box) return; // dashboard not present on this page

  const total    = records.length;
  const hours    = records.reduce((s, r) => s + parseFloat(r.duration || 0), 0);
  const topTag   = getTopTag(records);

  box.innerHTML = `
    <div class="madrid-card">
      <span class="madrid-label">Total Records</span>
      <span class="madrid-value">${total}</span>
    </div>
    <div class="madrid-card">
      <span class="madrid-label">Total Hours</span>
      <span class="madrid-value">${hours.toFixed(1)}</span>
    </div>
    <div class="madrid-card">
      <span class="madrid-label">Top Tag</span>
      <span class="madrid-value">${topTag || '—'}</span>
    </div>`;

  chelseaUpdateCap(records, weeklyTarget);
  // chart removed per user request
}

function getTopTag(records) {
  const counts = {};
  records.forEach(r => { counts[r.tag] = (counts[r.tag] || 0) + 1; });
  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  return sorted.length ? sorted[0][0] : null;
}

// ── Weekly Cap ────────────────────────────────

export function chelseaUpdateCap(records, target) {
  const msg = document.getElementById('milan-cap-msg');
  if (!msg) return; // not on dashboard

  if (!target) {
    msg.textContent = '';
    msg.className   = '';
    return;
  }

  const cutoff   = new Date();
  cutoff.setDate(cutoff.getDate() - 7);
  const weekHours = records
    .filter(r => new Date(r.date) >= cutoff)
    .reduce((s, r) => s + parseFloat(r.duration || 0), 0);

  const diff = target - weekHours;

  if (diff < 0) {
    msg.textContent = `Over target by ${Math.abs(diff).toFixed(1)}h`;
    msg.className   = 'over';
    chelseaAnnounce(`Warning: you are ${Math.abs(diff).toFixed(1)} hours over your weekly target.`, 'alert');
  } else {
    msg.textContent = `${diff.toFixed(1)}h remaining this week`;
    msg.className   = 'under';
  }
}

// ── Bar Chart ─────────────────────────────────



// ── Upcoming / Activity / Tags ─────────────────────────────

export function chelseaRenderUpcoming(records) {
  const el = document.getElementById('upcoming-list');
  if (!el) return;
  const today = new Date().toISOString().slice(0,10);
  const upcoming = records
    .filter(r => r.date >= today)
    .sort((a,b) => a.date.localeCompare(b.date))
    .slice(0,5);

  if (upcoming.length === 0) {
    el.innerHTML = '<li>No upcoming events.</li>';
    return;
  }

  el.innerHTML = upcoming.map(r => `
    <li data-id="${esc(r.id)}">
      <strong>${esc(r.description)}</strong>
      <div class="muted">${esc(r.date)} — ${parseFloat(r.duration).toFixed(1)}h • ${esc(r.tag)}</div>
    </li>
  `).join('');
}

export function chelseaRenderActivity(records) {
  const el = document.getElementById('activity-list');
  if (!el) return;
  const sorted = [...records].sort((a,b) => (b.updatedAt || b.createdAt).localeCompare(a.updatedAt || a.createdAt)).slice(0,6);
  if (sorted.length === 0) { el.innerHTML = '<li>No recent activity.</li>'; return; }
  el.innerHTML = sorted.map(r => {
    const when = r.updatedAt && r.updatedAt !== r.createdAt ? 'Updated' : 'Added';
    const ts = (r.updatedAt || r.createdAt).slice(0,19).replace('T',' ');
    return `<li><span class="muted">${when} ${ts}</span><div>${esc(r.description)} — ${parseFloat(r.duration).toFixed(1)}h</div></li>`;
  }).join('');
}

export function chelseaRenderTagBreakdown(records) {
  const el = document.getElementById('tags-list');
  if (!el) return;
  const totals = {};
  records.forEach(r => { totals[r.tag] = (totals[r.tag] || 0) + parseFloat(r.duration || 0); });
  const entries = Object.entries(totals).sort((a,b) => b[1] - a[1]);
  if (entries.length === 0) { el.innerHTML = '<div>No tags yet.</div>'; return; }
  el.innerHTML = entries.map(([tag,hrs]) => `<div class="tag-break"><strong>${esc(tag)}</strong> <span class="muted">${hrs.toFixed(1)}h</span></div>`).join('');
}

// ── Form helpers ──────────────────────────────

export function chelseaShowEditForm(record) {
  document.getElementById('barcelona-title').textContent = 'Edit Event / Task';
  document.getElementById('edit-id').value               = record.id;
  document.getElementById('f-desc').value                = record.description;
  document.getElementById('f-duration').value            = record.duration;
  document.getElementById('f-date').value                = record.date;
  document.getElementById('f-tag').value                 = record.tag;
  document.getElementById('submit-btn').textContent      = 'Update Record';
  document.getElementById('cancel-btn').hidden           = false;
  document.getElementById('f-desc').focus();
}

export function chelseaResetForm() {
  document.getElementById('barcelona-title').textContent = 'Add Event / Task';
  document.getElementById('barcelona-form').reset();
  document.getElementById('edit-id').value          = '';
  document.getElementById('submit-btn').textContent = 'Add Record';
  document.getElementById('cancel-btn').hidden      = true;

  ['desc', 'duration', 'date', 'tag'].forEach(name => {
    document.getElementById(`e-${name}`).textContent = '';
    document.getElementById(`f-${name}`).removeAttribute('aria-invalid');
  });
}

// ── Announce (ARIA live) ──────────────────────

export function chelseaAnnounce(msg, type = 'status') {
  const el = document.getElementById(type === 'alert' ? 'global-alert' : 'global-status');
  if (!el) {
    // Live region not present on this page (e.g., Settings). Fallback to console.
    // Keep behavior non-throwing so callers need not guard.
    console.log(`${type.toUpperCase()}: ${msg}`);
    return;
  }

  el.textContent = '';
  // Small delay so screen readers pick up the change
  setTimeout(() => { el.textContent = msg; }, 60);
}

// ── Tiny HTML escape ──────────────────────────

function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

