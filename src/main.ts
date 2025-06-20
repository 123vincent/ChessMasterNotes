// File: src/main.ts
import { App, Plugin } from 'obsidian';
import { ChesserSettings, DEFAULT_SETTINGS, ChessMasterNotesSettingTab } from './ChesserSettings';
import { drawChessBoard } from './Chesser';

export default class ChessMasterNotesPlugin extends Plugin {
  settings!: ChesserSettings;

  async onload() {
    console.log('ChessMasterNotesPlugin: onload start');
    await this.loadSettings();
    console.log('ChessMasterNotesPlugin: settings loaded', this.settings);
    this.addSettingTab(new ChessMasterNotesSettingTab(this.app, this));

    this.registerMarkdownCodeBlockProcessor('chess', (source, el) => {
      console.log('Processor chess called, source:', source);
      drawChessBoard(this.app, this.settings, source, el);
    });
    this.registerMarkdownCodeBlockProcessor('chesser', (source, el) => {
      console.log('Processor chesser called, source:', source);
      drawChessBoard(this.app, this.settings, source, el);
    });
    console.log('ChessMasterNotesPlugin: processors registered');
  }

  async loadSettings() {
    console.log('ChessMasterNotesPlugin: loadSettings');
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    console.log('ChessMasterNotesPlugin: saveSettings', this.settings);
    await this.saveData(this.settings);
  }
}