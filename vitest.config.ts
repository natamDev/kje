import { getViteConfig } from 'astro/config';

const astroViteConfigFn = getViteConfig({
  test: {
    include: ['tests/**/*.test.ts'],
  },
});

async function configWrapper(env) {
  try {
    const result = await astroViteConfigFn(env);

    // This async wrapper is empirically required: removing it (i.e. using a plain
    // `export default astroViteConfigFn;`, or even a bare async passthrough with
    // no plugin remapping) reproducibly breaks `npm test` with an opaque,
    // cross-process-swallowed error (an AggregateError containing the string
    // '[object Object]', traced to tinypool's error propagation, which runs
    // before Vitest's own error serialization). The plugin remapping below does
    // NOT explain why this works: it executes after `astroViteConfigFn(env)` has
    // already fully resolved, so it cannot retroactively fix an async
    // initialization race inside that call. The true root cause is unidentified.
    // Treat this as a load-bearing but unexplained workaround — do not remove
    // it without first reproducing the failure above, and do not reuse this
    // shape elsewhere assuming the stated mechanism is real.
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
