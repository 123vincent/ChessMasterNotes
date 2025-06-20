# ChessMasterNotes

## Arborescence
```lua
├─ src/
│  └─ *.ts
├─ package.json
├─ tsconfig.json
├─ vite.config.ts     ← config
├─ manifest.json
└─ dist/              ← build output
```

## manifest.json
```json
{
  "id": "chessmasternotes",
  "name": "ChessMasterNotes",
  "version": "0.1.0",
  "minAppVersion": "1.0.0",
  "description": "Study and annotate chess games interactively in Obsidian using PGN and FEN.",
  "author": "Vincent B.",
  "authorUrl": "https://github.com/123vincent",
  "main": "main.js",
  "css":  "styles.css"
}
```

## package.json
```json
{
  "name": "chessmasternotes",
  "version": "0.1.0",
  "description": "Study and annotate chess games interactively in Obsidian using PGN and FEN.",
  "main": "dist/main.js",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint \"src/**/*.ts\"",
    "format": "prettier --write ."
  },
  "author": "Votre Nom",
  "license": "MIT",
  "devDependencies": {},
  "dependencies": {}
}
```

## Installer les dépendances
```bash
npm install --save-dev vite rollup-plugin-copy @types/node
```

## package.json
```json
{
  // ...
  "devDependencies": {
    "@types/node": "^24.0.3",
    "rollup-plugin-copy": "^3.5.0",
    "vite": "^6.3.5"
  },
  // ...
}
```

## tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ES2020",                // version JS générée
    "module": "ESNext",                // module system
    "lib": ["ES2020", "DOM"],          // API JS et browser
    "declaration": false,              // génère .d.ts
    "outDir": "dist",                  // dossier de sortie
    "strict": true,                    // vérifications TS strictes
    "esModuleInterop": true,           // compatibilité import
    "moduleResolution": "node",
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "types": ["node", "vite/client"]
  },
  "include": [
    "src",
    "vite.config.ts"
  ],
  "exclude": ["node_modules", ".vscode"]
}
```

## vite.config.ts
```js
import { defineConfig } from 'vite';
import path from 'path';
import copy from 'rollup-plugin-copy';

export default defineConfig({
  // racine du projet
  root: '.',
  build: {
    // dossier de sortie
    outDir: 'dist',
    emptyOutDir: true,
    // configuration de la librairie
    lib: {
      entry: path.resolve(__dirname, 'src/main.ts'),
      formats: ['es'],
    },
    rollupOptions: {
      // obsidian est fourni par l'environnement, on l'exclut
      external: ['obsidian'],
      output: {
        // nom du bundle JS principal
        entryFileNames: 'main.js',
        // regroupe toutes les feuilles CSS en styles.css
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith('.css')) {
            return 'styles.css';
          }
          return assetInfo.name!;
        },
      },
      plugins: [
        // copie du manifest dans dist/
        copy({
          targets: [
            { src: 'manifest.json', dest: 'dist' }
          ],
          hook: 'writeBundle'
        })
      ]
    }
  },
  resolve: {
    alias: {
      // alias pour import depuis src/
      '@': path.resolve(__dirname, './src')
    }
  }
});

// Pour que ce config fonctionne, installez d'abord :
// npm install --save-dev rollup-plugin-copy
```

## main.ts
```js
// vide
```

## Lancer les scripts NPM
```bash
npm run dev   # hot-reload via Vite
npm run build # build final dans dist/
```


