// File: src/ChesserSettings.ts
import { PluginSettingTab, App, Setting } from 'obsidian';
import type ChessMasterNotesPlugin from './main';

export interface ChesserSettings {
  pieceStyle: string;
  theme: 'light' | 'dark';
  enablePuzzleMode: boolean;
  stockfishPath?: string;
}

export const DEFAULT_SETTINGS: ChesserSettings = {
  pieceStyle: 'merida',
  theme: 'light',
  enablePuzzleMode: false,
};

export class ChessMasterNotesSettingTab extends PluginSettingTab {
  plugin: ChessMasterNotesPlugin;
  constructor(app: App, plugin: ChessMasterNotesPlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const { containerEl } = this;
    containerEl.empty();
    containerEl.createEl('h2', { text: 'Chess Master Notes Settings' });

    new Setting(containerEl)
      .setName('Piece Style')
      .setDesc('Choose board style')
      .addText(text =>
        text
          .setPlaceholder('e.g. merida')
          .setValue(this.plugin.settings.pieceStyle)
          .onChange(async value => {
            console.log('SettingTab: pieceStyle changed to', value);
            this.plugin.settings.pieceStyle = value;
            await this.plugin.saveSettings();
          })
      );
  }
}