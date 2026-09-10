import { describe, expect, it } from 'vitest';
import { readDistHtml } from '../helpers/dist';

describe('page le dojo', () => {
  it('présente les deux styles pratiqués', () => {
    const html = readDistHtml('/dojo');
    expect(html).toContain('Kyokushin');
    expect(html).toContain('Jujutsu Eskrima');
  });
});
