# ChessMasterNotes – Obsidian Plugin for Chess Study

**ChessMasterNotes** is a custom Obsidian plugin designed to enhance the experience of studying, annotating, and memorizing chess games directly inside Markdown notes. It provides an interactive chessboard rendered via a code block, YAML configuration, and persistent data storage, fully compatible with GitHub-based sync.

---

## Objectives

- Embed fully interactive chessboards in Obsidian notes using a custom code block.
- Replay, analyze, and annotate games using PGN/FEN.
- Study tactics and key positions.
- Sync analysis and board states across devices (desktop/mobile) via GitHub.
- Provide a multilingual interface and mobile-friendly touch controls.

---

## Features

### Code Block Syntax
Use a custom code block to insert a chessboard:

````markdown
```chess
fen: rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1
pgn: 1. e4 e6 2. d4 d5
orientation: white
drawable: true
id: abc123ef
lang: fr
```
````

### YAML Options
| Key           | Description                                                  |
|----------------|--------------------------------------------------------------|
| `fen`         | Starting position in FEN notation                             |
| `pgn`         | Move sequence in PGN format                                   |
| `orientation` | `white` or `black` orientation                                |
| `drawable`    | Enable arrows, circles, annotations (!, !!, ??, etc.)         |
| `id`          | Unique identifier used to persist board state and annotations |
| `lang`        | Language of UI (e.g., `fr`, `en`, `de`)                       |

---

## Architecture

- **Language**: TypeScript
- **Engine**: [`chess.js`](https://github.com/jhlywa/chess.js)
- **Renderer**: Custom chessboard using HTML/CSS (mobile-first design)
- **Storage**: JSON files in `.ChessStorage/` (e.g., `.ChessStorage/abc123ef.json`)
- **Compatibility**: Desktop + mobile (via CSS), GitHub sync

---

## Interface Elements

### Under the board:
- **Toolbar buttons**:
  - Flip Board
  - Home (start of PGN or FEN)
  - Init (end position)
  - Copy FEN / Copy PGN
  - Undo / Redo
- **Captured pieces display** (icons)
- **Turn indicator**: "White to move" / "Black to move" with icon

---

## Planned Enhancements

- Puzzle mode with solution validation
- Thematic tagging system (openings, tactics, strategy)
- Templater integration for automatic game notes
- Export to image/GIF
- (Optional) Stockfish engine integration for analysis

---

## Example of Saved State (JSON)
```json
{
  "currentMoveIdx": 3,
  "moves": [
    { "color": "w", "from": "e2", "to": "e4", "san": "e4" },
    { "color": "b", "from": "e7", "to": "e6", "san": "e6" },
    { "color": "w", "from": "d2", "to": "d4", "san": "d4" },
    { "color": "b", "from": "d7", "to": "d5", "san": "d5" }
  ],
  "pgn": "1. e4 e6 2. d4 d5"
}
```

---

## Localization (i18n)
- All interface strings will be loaded from a translation file.
- Language can be set via `lang` key or automatically detected.

---