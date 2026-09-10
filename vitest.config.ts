import { getViteConfig } from 'astro/config';
import type { ConfigEnv, Plugin, UserConfig } from 'vite';
import type { InlineConfig } from 'vitest/node';

// astro (peer: vite ^6) and vitest 2.x (bundles its own private vite ^5
// internally) resolve to two physically different `vite` packages in
// node_modules. Vitest's ambient `declare module 'vite' { interface
// UserConfig { test?: ... } }` augmentation therefore attaches to *its*
// private vite copy, not the one astro's `ViteUserConfig` type extends, so
// TypeScript does not see `test` as a valid property of the object passed to
// `getViteConfig()`. Re-declaring the same augmentation locally, against the
// same `vite` module specifier astro resolves, fixes the type only (no
// runtime effect either way).
declare module 'vite' {
  interface UserConfig {
    test?: InlineConfig;
  }
}

const astroViteConfigFn = getViteConfig({
  test: {
    include: ['tests/**/*.test.ts'],
    globalSetup: ['./tests/global-setup.ts'],
  },
});

// This async wrapper's plugin remapping is empirically required: removing it
// (i.e. using a plain `export default astroViteConfigFn;`) reproducibly
// breaks `npm test` as soon as `test.globalSetup` is used, with:
//   TypeError: Cannot read properties of undefined (reading 'name')
//     at TransformPluginContext.transform astro/dist/vite-plugin-astro/index.js
// astro's vite-plugin-astro `transform` hook unconditionally reads
// `this.environment.name` for any non-`.astro` file. When Vitest loads the
// `globalSetup` file via vite-node's own plugin container (a different code
// path than the one used for normal test files), that container does not
// populate `this.environment`, so the hook throws. Rebuilding each plugin
// object with `{ ...plugin }` before handing the array back to Vitest avoids
// whatever internal caching/reuse causes that container to skip environment
// setup for the original plugin instances — reproduced directly by toggling
// this remapping on/off with `test.globalSetup` enabled. Do not remove
// without first reproducing the failure above.
async function configWrapper(env: ConfigEnv): Promise<UserConfig> {
  const result = await astroViteConfigFn(env);
  if (result.plugins && Array.isArray(result.plugins)) {
    result.plugins = result.plugins.map((plugin) => ({ ...(plugin as Plugin) }));
  }
  return result;
}

export default configWrapper;
