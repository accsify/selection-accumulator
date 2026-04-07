# Selection Accumulator

Selection Accumulator is a highly accessible, keyboard-friendly VS Code extension that allows you to gather multiple text selections from your code and copy or cut them all at once.

Instead of jumping back and forth to copy and paste different lines, simply "mark" the items you want, and copy them all to your clipboard in one go!

## What's New in 1.3.0

- **New Shortcut (Alt+D):** Delete all accumulated ranges directly from the document without copying them to the clipboard.
- **New Separator:** Added `Tab` as an option for joining snippets.
- **UI Improvements:** Copy, Cut, Delete, and Clear options are now prominently accessible from the View Toolbar, and dynamically show up only when the list has items.

## Features

- **Mark Selections:** Add highlighted text (or the current line if nothing is highlighted) to your accumulator list.
- **Smart Filtering:** Automatically prevents adding duplicate snippets.
- **Bulk Copy / Cut:** Copy or cut all accumulated items to your clipboard simultaneously.
- **Explorer Tree View:** Easily manage your list from the VS Code sidebar.
- **Accessible Management:** Fully optimized for keyboard and screen reader users. Move items up, down, or delete them directly from the UI or via commands.
- **Custom Separators:** Choose how your items are joined when copied (New Line, Space, Comma, Pipe, Tab, or a Custom string).

## Shortcuts

To avoid conflicting with your standard Copy (`Ctrl+C`) and Cut (`Ctrl+X`) commands, Selection Accumulator uses dedicated `Alt` bindings:

| Command | Shortcut | Description |
| --- | --- | --- |
| **Add Selection** | `Alt+A` | Adds the selected text to the accumulator. |
| **Copy All** | `Alt+C` | Copies all items to clipboard and clears the list. |
| **Cut All** | `Alt+X` | Cuts all items from the document to clipboard and clears the list. |
| **Delete All Ranges** | `Alt+D` | Removes all selected items from the document without copying them, then clears the list. |
| **Clear List** | `Alt+Z` | Empties the accumulator without copying. |
| **Focus List** | `Alt+L` | Jumps directly to the Accumulator view in the sidebar. |

## Extension Settings

This extension contributes the following settings (Search for *Selection Accumulator* in VS Code settings):

- `selection-accumulator.maxItems`: Maximum number of items allowed in the list (Default: 100).
- `selection-accumulator.separator`: Separator to use between items when copying/cutting (Options: New Line, Space, Comma, Pipe, Tab, Custom. Default: `newline`).
- `selection-accumulator.customSeparator`: Custom text used if the separator is set to 'custom'.

## Accessibility

Selection Accumulator was built with a "Keyboard First" approach. The Explorer Tree View utilizes proper ARIA labels, ensuring that screen readers announce the exact content and line numbers of your snippets as you navigate.
