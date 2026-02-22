// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import vscode, { l10n } from 'vscode';

import { Background } from './background';
import { EXTENSION_ID } from './utils/constants';
import { vsHelp } from './utils/vsHelp';

export async function activate(context: vscode.ExtensionContext): Promise<void> {
    const background = new Background();

    context.subscriptions.push(background);
    const ok = await background.setup();
    if (ok === false) {
        return;
    }

    context.subscriptions.push(
        vscode.commands.registerCommand('extension.background.install', async () => {
            await background.config.update('enabled', true, true);
            await background.applyPatch();
            await vsHelp.reload();
        })
    );

    context.subscriptions.push(
        vscode.commands.registerCommand('extension.background.disable', async () => {
            await background.config.update('enabled', false, true);
            await background.uninstall();
            await vsHelp.reload();
        })
    );

    context.subscriptions.push(
        vscode.commands.registerCommand('extension.background.uninstall', async () => {
            await background.uninstall();
            await vscode.commands.executeCommand('workbench.extensions.uninstallExtension', EXTENSION_ID);
            vsHelp.reload({
                message: l10n.t('Background extension has been uninstalled. See you next time!')
            });
        })
    );
}

// this method is called when your extension is deactivated
export function deactivate(): void {}
