// File: src/Chesser.ts
import { App, parseYaml } from 'obsidian';
import { Chess } from 'chess.js';
import { Chessground } from 'chessground';
import 'chessground/assets/chessground.base.css';
import 'chessground/assets/chessground.cburnett.css';
import type { ChesserSettings } from './ChesserSettings';

export function drawChessBoard(
  app: App,
  settings: ChesserSettings,
  source: string,
  el: HTMLElement
) {
  console.log('drawChessBoard: called with source:', source);
  let config;
  try {
    config = parseYaml(source) as {
      fen: string;
      pgn?: string;
      orientation?: 'white' | 'black';
      drawable?: boolean;
      id?: string;
    };
    console.log('drawChessBoard: parsed config', config);
  } catch (e) {
    console.error('drawChessBoard: parseYaml error', e);
    return;
  }

  const chess = new Chess(config.fen || undefined);
  console.log('drawChessBoard: initialized Chess with fen', chess.fen());

  const board = Chessground(el, {
    fen: chess.fen(),
    orientation: config.orientation || 'white',
    movable: {
      free: false,
      color: chess.turn() === 'w' ? 'white' : 'black',
    },
  });
  console.log('drawChessBoard: Chessground initialized');
}