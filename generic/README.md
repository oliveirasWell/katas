Summary
Starting point for a new kata: TypeScript, Jest, one source folder, one test file.

Usage
```
cp -r generic <kata-name>
cd <kata-name>
pnpm install
pnpm test
pnpm test:watch
```
Rename `solution/` to whatever the kata is about, update `name` in package.json, and rewrite this README with the kata statement.

Interface
```
solve(input: string): string
```
