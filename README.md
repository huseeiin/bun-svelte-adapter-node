# bun-svelte-adapter-node

`svelte-adapter-bun` no longer works. It was already very poor.

Benchmarks:

**adapter-node with bun: 2800 req/s**

**adapter-node with node: 1400 req/s**

However, the tiny bun adapter i built (`bun-adapter.js`) is _slightly_ faster and gives me hope that we can make bun + sveltekit even faster: it's at **7200 req/s**

additional information:

[@calle.wester/svelte-adapter-bun](https://github.com/calle/svelte-adapter-bun) is a working fork of [svelte-adapter-bun](https://github.com/gornostay25/svelte-adapter-bun) and its at **~4600 req/s**
