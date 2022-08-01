# Setup prettier

This installed when creating codebase, so don't need execute it more.

```bash
git init
npx husky-init
yarn add --dev pretty-quick
yarn husky set .husky/pre-commit "npx pretty-quick --staged"
yarn add -D prettier
```
