import { describe, expect, it } from 'vitest';
import { readDistHtml } from '../helpers/dist';

describe('page contact', () => {
  it('affiche un lien mailto pour contacter le dojo', () => {
    const html = readDistHtml('/contact');
    expect(html).toMatch(/href="mailto:[^"]+"/);
  });
});
