// scripts/storage.js — Barcelona (localStorage layer)

const BARCELONA_KEY  = 'campus:records';
const BARCELONA_CFG  = 'campus:settings';

export function barcelonaLoad() {
  try {
    return JSON.parse(localStorage.getItem(BARCELONA_KEY) || '[]');
  } catch {
    return [];
  }
}

export function barcelonaSave(data) {
  localStorage.setItem(BARCELONA_KEY, JSON.stringify(data));
}

export function barcelonaLoadSettings() {
  try {
    return JSON.parse(localStorage.getItem(BARCELONA_CFG) || '{}');
  } catch {
    return {};
  }
}

export function barcelonaSaveSettings(settings) {
  localStorage.setItem(BARCELONA_CFG, JSON.stringify(settings));
}

