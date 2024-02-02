export const load = () => ({
  version: typeof Bun !== "undefined" ? Bun.version : ":(",
});
