// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as vscode from "vscode";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext): void {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log("Congratulations, your extension \"vscode-azurearcenabledservers\" is now active!");

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    const disposable = vscode.commands.registerCommand("vscode-azurearcenabledservers.helloWorld", () => {
        // The code you place here will be executed every time your command is executed
        // Display a message box to the user
        void vscode.window.showInformationMessage("Hello World from Azure Arc-enabled Servers for Visual Studio Code!");
    });

    context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
// eslint-disable-next-line @typescript-eslint/no-empty-function
export function deactivate(): void { }
