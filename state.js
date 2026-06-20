// scripts/state.js — Liverpool (in-memory state)

import { barcelonaLoad, barcelonaSave } from './storage.js';

let liverpoolData = barcelonaLoad();

export function getLiverpool() {
  return liverpoolData;
}

export function setLiverpool(data) {
  liverpoolData = data;
  barcelonaSave(liverpoolData);
}

export function addLiverpool(record) {
  liverpoolData.push(record);
  barcelonaSave(liverpoolData);
}

export function updateLiverpool(id, changes) {
  liverpoolData = liverpoolData.map(r =>
    r.id === id
      ? { ...r, ...changes, updatedAt: new Date().toISOString() }
      : r
  );
  barcelonaSave(liverpoolData);
}

export function deleteLiverpool(id) {
  liverpoolData = liverpoolData.filter(r => r.id !== id);
  barcelonaSave(liverpoolData);
}

export function makeLiverpoolId() {
  const ts  = Date.now();
  const num = String(liverpoolData.length + 1).padStart(4, '0');
  return `rec_${num}_${ts}`;
}

