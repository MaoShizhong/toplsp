LSP Specific for [TOP](https://www.theodinproject.com)

# Installation

### VSCode

TOP LSP Can be found in the marketplace of VSCode.

### Nvim

1. Clone the repo `git clone git@github:Mclilzee/toplsp.git`
2. Install packages `npm run install-dependencies`
3. Build `npm run esbuild`
4. Put the path of `./server/out/main.js` to be launched from Nvim, in config autcommand:
   Make sure to replace `rootPath` with the real path of the directory.

```lua
local client = vim.lsp.start_client({
  name = "toplsp",
  cmd = { "node", "rootPath/toplsp/server/out/main.js" },
})

if not client then
  return
end
```
