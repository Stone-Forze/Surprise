import test from 'node:test';
import assert from 'node:assert/strict';
import {
  CHAPTERS,
  SHAYARI_VERSES,
  TOTAL_CHAPTERS,
  clampChapterIndex,
  getNextChapterIndex,
  getPrevChapterIndex,
  getProgressPercent,
  formatChapterCounter,
  toggleEnvelopeState,
} from './storyData';

test('CHAPTERS has all 10 royal chapters in order', () => {
  assert.equal(CHAPTERS.length, 10);
  assert.equal(TOTAL_CHAPTERS, 10);
  assert.equal(CHAPTERS[0].headlineLines.join(' '), 'Happy Princess Day');
  assert.equal(CHAPTERS[2].headlineLines.join(' '), 'Khoobsurat Churail');
  assert.equal(CHAPTERS[9].isFinalEnvelope, true);
});

test('SHAYARI_VERSES preserves all 3 poetic verses for Chapter 10 reveal', () => {
  assert.equal(SHAYARI_VERSES.length, 3);
  assert.ok(SHAYARI_VERSES[0].lines[0].includes('Teri hansi se roshan'));
  assert.ok(SHAYARI_VERSES[1].lines[3].includes('Khoobsurat Churail'));
  assert.ok(SHAYARI_VERSES[2].lines[3].includes('Gojo Raze'));
});

test('getNextChapterIndex advances and wraps around at chapter 10', () => {
  assert.equal(getNextChapterIndex(0), 1);
  assert.equal(getNextChapterIndex(8), 9);
  assert.equal(getNextChapterIndex(9), 0);
});

test('getPrevChapterIndex decrements and clamps at 0', () => {
  assert.equal(getPrevChapterIndex(5), 4);
  assert.equal(getPrevChapterIndex(0), 0);
});

test('getProgressPercent and formatChapterCounter calculate accurately', () => {
  assert.equal(getProgressPercent(0), 10);
  assert.equal(getProgressPercent(4), 50);
  assert.equal(getProgressPercent(9), 100);
  assert.equal(formatChapterCounter(0), '01 / 10');
  assert.equal(formatChapterCounter(9), '10 / 10');
  assert.equal(clampChapterIndex(-3), 0);
  assert.equal(clampChapterIndex(99), 9);
});

test('toggleEnvelopeState flips open and closed states', () => {
  assert.equal(toggleEnvelopeState(false), true);
  assert.equal(toggleEnvelopeState(true), false);
});
