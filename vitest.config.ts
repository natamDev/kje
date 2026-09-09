import { getViteConfig } from 'astro/config';

const astroViteConfigFn = getViteConfig({
  test: {
    include: ['tests/**/*.test.ts'],
  },
});

async function configWrapper(env) {
  try {
    const result = await astroViteConfigFn(env);

    // Workaround for Astro 5.0 + Vitest 2.1.0 compatibility:
    // Vitest cannot properly initialize getViteConfig's async function without
    // triggering access to the plugins array. Simply accessing and re-mapping
    // the plugins triggers Vite's plugin system to properly initialize.
    // This appears to be a race condition or initialization order issue in how
    // Vitest loads and processes the config from an async function.
    if (result.plugins && Array.isArray(result.plugins)) {
      result.plugins = result.plugins.map((plugin, index) => {
        try {
          // Attempt to access plugin properties to ensure they are initialized
          const wrappedPlugin = { ...plugin };
          if (plugin.resolveId !== undefined) {
            wrappedPlugin.resolveId = plugin.resolveId;
          }
          if (plugin.load !== undefined) {
            wrappedPlugin.load = plugin.load;
          }
          return wrappedPlugin;
        } catch (e) {
          return plugin;
        }
      });
    }

    return result;
  } catch (error) {
    console.error('[vitest.config] Error:', error?.message);
    throw error;
  }
}

export default configWrapper;
