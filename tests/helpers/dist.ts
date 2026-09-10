import { readFileSync } from 'node:fs';
import path from 'node:path';

export function readDistHtml(routePath: string): string {
  const normalized = routePath.replace(/^\/+|\/+$/g, '');
  const filePath = normalized === ''
    ? path.join('dist', 'index.html')
    : path.join('dist', normalized, 'index.html');
  return readFileSync(filePath, 'utf-8');
}
