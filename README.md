LSP Specific for [TOP](https://www.theodinproject.com)

# Installation

### VSCode

TOP LSP Can be found in the marketplace of VSCode.

### Nvim

1. Clone the repo `git clone git@github.com:Mclilzee/toplsp.git`
2. Install packages `npm run install-dependencies`
3. Build `npm run esbuild`
4. Put the path of `./server/out/main.js` to be launched from Nvim, in config autcommand:
   Make sure to replace `rootPath` with the real path of the directory.

```lua
vim.api.nvim_create_autocmd('FileType', {
  pattern = 'markdown',
  callback = function(ev)
    vim.lsp.start {
      name = 'toplsp',
      cmd = { 'node', 'rootPath/toplsp/server/out/main.js' },
      root_dir = vim.fs.root(ev.buf, { 'project.markdownlint-cli2.jsonc', 'lesson.markdownlint-cli2.jsonc' }),
    }
  end,
})
```
