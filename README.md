Selection Accumulator
# Selection Accumulator

Selection Accumulator is a highly accessible, keyboard-friendly VS Code extension that allows you to gather multiple text selections from your code and copy or cut them all at once.

Instead of jumping back and forth to copy and paste different lines, simply "mark" the items you want, and copy them all to your clipboard in one go!

Features
## Features

Mark Selections: Add highlighted text (or the current line if nothing is highlighted) to your accumulator list.
- **Mark Selections:** Add highlighted text (or the current line if nothing is highlighted) to your accumulator list.
- **Smart Filtering:** Automatically prevents adding duplicate snippets.
- **Bulk Copy / Cut:** Copy or cut all accumulated items to your clipboard simultaneously.
- **Explorer Tree View:** Easily manage your list from the VS Code sidebar.
- **Accessible Management:** Fully optimized for keyboard and screen reader users. Move items up, down, or delete them directly from the UI or via commands.
- **Custom Separators:** Choose how your items are joined when copied (New Line, Space, Comma, Pipe, or a Custom string).

Smart Filtering: Automatically prevents adding duplicate snippets.
## Shortcuts

Bulk Copy / Cut: Copy or cut all accumulated items to your clipboard simultaneously.
To avoid conflicting with your standard Copy (`Ctrl+C`) and Cut (`Ctrl+X`) commands, Selection Accumulator uses dedicated `Alt` bindings:

Explorer Tree View: Easily manage your list from the VS Code sidebar.
| Command | Shortcut | Description |
| --- | --- | --- |
| **Add Selection** | `Alt+A` | Adds the selected text to the accumulator. |
| **Copy All** | `Alt+C` | Copies all items to clipboard and clears the list. |
| **Cut All** | `Alt+X` | Cuts all items from the document to clipboard and clears the list. |
| **Clear List** | `Alt+Z` | Empties the accumulator without copying. |
| **Focus List** | `Alt+L` | Jumps directly to the Accumulator view in the sidebar. |

Accessible Management: Fully optimized for keyboard and screen reader users. Move items up, down, or delete them directly from the UI or via commands.
## Extension Settings

Custom Separators: Choose how your items are joined when copied (New Line, Space, Comma, Pipe, or a Custom string).
This extension contributes the following settings (Search for *Selection Accumulator* in VS Code settings):

Shortcuts
- `selection-accumulator.maxItems`: Maximum number of items allowed in the list (Default: 100).
- `selection-accumulator.separator`: Separator to use between items when copying/cutting (Default: newline).
- `selection-accumulator.customSeparator`: Custom text used if the separator is set to 'custom'.

To avoid conflicting with your standard Copy (Ctrl+C) and Cut (Ctrl+X) commands, Selection Accumulator uses dedicated Alt bindings:
## Accessibility

Command

Shortcut

Description

Add Selection

Alt+A

Adds the selected text to the accumulator.

Copy All

Alt+C

Copies all items to clipboard and clears the list.

Cut All

Alt+X

Cuts all items from the document to clipboard and clears the list.

Clear List

Alt+Z

Empties the accumulator without copying.

Focus List

Alt+L

Jumps directly to the Accumulator view in the sidebar.

Extension Settings

This extension contributes the following settings (Search for Selection Accumulator in VS Code settings):

selection-accumulator.maxItems: Maximum number of items allowed in the list (Default: 100).

selection-accumulator.separator: Separator to use between items when copying/cutting (Default: newline).

selection-accumulator.customSeparator: Custom text used if the separator is set to 'custom'.

Accessibility

Selection Accumulator was built with a "Keyboard First" approach. The Explorer Tree View utilizes proper ARIA labels, ensuring that screen readers announce the exact content and line numbers of your snippets as you navigate.
