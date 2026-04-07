const vscode = require('vscode');

// Store marked items
let markedList = [];
let treeProvider;

// Helper to update VS Code context and UI
function updateContext() {
    vscode.commands.executeCommand('setContext', 'accumulator.hasItems', markedList.length > 0);
    if (treeProvider) {
        treeProvider.refresh();
    }
}

// Tree Data Provider for the Explorer View (Accessible UI)
class AccumulatorProvider {
    constructor() {
        this._onDidChangeTreeData = new vscode.EventEmitter();
        this.onDidChangeTreeData = this._onDidChangeTreeData.event;
    }

    refresh() {
        this._onDidChangeTreeData.fire();
    }

    getTreeItem(element) {
        const item = new vscode.TreeItem(element.preview, vscode.TreeItemCollapsibleState.None);
        item.contextValue = 'accumulatorItem';
        item.tooltip = element.text;
        item.description = `Line ${element.range.start.line + 1}`;
        
        // Essential for screen reader accessibility
        item.accessibilityInformation = {
            label: `Item: ${element.preview}, Line ${element.range.start.line + 1}`,
            role: 'listitem'
        };
        return item;
    }

    getChildren(element) {
        if (element) {
            return Promise.resolve([]);
        }
        return Promise.resolve(markedList);
    }
}

// Helper to read configuration settings using the updated camelCase namespace
function getSettings() {
    const config = vscode.workspace.getConfiguration('selectionAccumulator');
    return {
        maxItems: config.get('maxItems', 100),
        separatorType: config.get('separator', 'newline'),
        customSeparator: config.get('customSeparator', '')
    };
}

// Convert Setting into actual characters
function getSeparatorString(settings) {
    switch (settings.separatorType) {
        case 'space': return ' ';
        case 'comma': return ',';
        case 'pipe': return '|';
        case 'custom': return settings.customSeparator;
        case 'newline':
        default: return '\n';
    }
}

function activate(context) {
    // Initialize the Tree View Provider inside Explorer
    treeProvider = new AccumulatorProvider();
    vscode.window.registerTreeDataProvider('accumulatorList', treeProvider);

    // 1. Command to MARK text and store its position
    let markCmd = vscode.commands.registerCommand('accumulator.mark', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const selection = editor.selection;
            const rangeToMark = selection.isEmpty ? editor.document.lineAt(selection.active.line).rangeIncludingLineBreak : selection;
            const text = editor.document.getText(rangeToMark);
            
            if (text && text.trim() !== '') {
                // AVOID REPEATING items
                if (markedList.some(item => item.text === text)) {
                    vscode.window.showInformationMessage('This text is already in the accumulator list.');
                    return;
                }

                // Check Max Number Setting
                const settings = getSettings();
                if (markedList.length >= settings.maxItems) {
                    vscode.window.showWarningMessage(`Accumulator is full (Max: ${settings.maxItems}). Please clear or remove items.`);
                    return;
                }

                // Create accessible preview string for the UI view
                const preview = text.trim().replace(/\n/g, ' \\n ').substring(0, 40) + (text.length > 40 ? '...' : '');

                markedList.push({
                    id: Date.now().toString() + Math.random().toString(),
                    text: text,
                    range: rangeToMark,
                    preview: preview,
                    documentUri: editor.document.uri
                });

                updateContext();
                vscode.window.showInformationMessage(`Added to list. Total items: ${markedList.length}`);
            }
        }
    });

    // 2. Command to COPY accumulator
    let copyCmd = vscode.commands.registerCommand('accumulator.copy', async () => {
        if (markedList.length > 0) {
            const settings = getSettings();
            const sep = getSeparatorString(settings);
            
            // Combine all text using the chosen separator
            const textToCopy = markedList.map(item => item.text).join(sep);
            
            // Put it into the real Windows clipboard
            await vscode.env.clipboard.writeText(textToCopy);
            
            const count = markedList.length;
            markedList = []; // Clear list
            updateContext();
            vscode.window.showInformationMessage(`Copied ${count} items to clipboard and cleared list.`);
        } else {
            vscode.window.showInformationMessage('Accumulator list is empty.');
        }
    });

    // 3. Command to CUT accumulator
    let cutCmd = vscode.commands.registerCommand('accumulator.cut', async () => {
        const editor = vscode.window.activeTextEditor;
        if (editor && markedList.length > 0) {
            const settings = getSettings();
            const sep = getSeparatorString(settings);
            
            // Combine all text and put in Windows clipboard
            const textToCopy = markedList.map(item => item.text).join(sep);
            await vscode.env.clipboard.writeText(textToCopy);
            
            // Delete ranges for the ACTIVE document only
            const currentDocUri = editor.document.uri.toString();
            const itemsToCut = markedList.filter(item => item.documentUri.toString() === currentDocUri);

            await editor.edit(editBuilder => {
                // Sort from bottom to top before deleting to protect line numbers! 
                const sortedItems = [...itemsToCut].sort((a, b) => b.range.start.compareTo(a.range.start));
                for (const item of sortedItems) {
                    editBuilder.delete(item.range);
                }
            });

            if (itemsToCut.length < markedList.length) {
                vscode.window.showWarningMessage('Note: Only items from the current active document were removed from the text. All items were still copied to clipboard.');
            } else {
                vscode.window.showInformationMessage(`Cut ${markedList.length} items to clipboard and cleared list.`);
            }

            markedList = []; // Clear list
            updateContext();
        } else if (markedList.length === 0) {
            vscode.window.showInformationMessage('Accumulator list is empty.');
        }
    });

    // 4. Command to cancel/clear the list manually
    let clearCmd = vscode.commands.registerCommand('accumulator.clear', () => {
        markedList = [];
        updateContext();
        vscode.window.showInformationMessage('Accumulator cleared.');
    });

    // 5. Tree View Commands (Move Up, Move Down, Delete)
    let moveUpCmd = vscode.commands.registerCommand('accumulator.moveUp', (element) => {
        if (element) {
            const index = markedList.findIndex(i => i.id === element.id);
            if (index > 0) {
                // Swap array positions
                [markedList[index - 1], markedList[index]] = [markedList[index], markedList[index - 1]];
                updateContext();
            }
        }
    });

    let moveDownCmd = vscode.commands.registerCommand('accumulator.moveDown', (element) => {
        if (element) {
            const index = markedList.findIndex(i => i.id === element.id);
            if (index > -1 && index < markedList.length - 1) {
                // Swap array positions
                [markedList[index + 1], markedList[index]] = [markedList[index], markedList[index + 1]];
                updateContext();
            }
        }
    });

    let deleteItemCmd = vscode.commands.registerCommand('accumulator.deleteItem', (element) => {
        if (element) {
            markedList = markedList.filter(i => i.id !== element.id);
            updateContext();
        }
    });

    // 6. Command to focus the list view directly
    let focusCmd = vscode.commands.registerCommand('accumulator.focus', () => {
        vscode.commands.executeCommand('accumulatorList.focus');
    });

    context.subscriptions.push(
        markCmd, copyCmd, cutCmd, clearCmd, 
        moveUpCmd, moveDownCmd, deleteItemCmd, focusCmd
    );
}

function deactivate() {
    markedList = [];
}

module.exports = { activate, deactivate };