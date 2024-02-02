// import adapter from "@sveltejs/adapter-node";
// import adapter from "svelte-adapter-bun";
// import adapter from "@calle.wester/svelte-adapter-bun";
import adapter from "./bun-adapter.js";

/**
 * @type {import('@sveltejs/kit').Config}
 */
const config = {
  kit: {
    adapter: adapter(),
  },
};

export default config;
