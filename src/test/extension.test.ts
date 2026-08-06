// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
    AzureWizard,
    AzureWizardPromptStep,
    createTestActionContext,
    type IActionContext,
} from "@microsoft/vscode-azext-utils";
import * as assert from "assert";
import { ext } from "../extensionVariables";

class NoopPromptStep extends AzureWizardPromptStep<IActionContext> {
    public shouldPrompt(): boolean {
        return true;
    }

    public prompt(): Promise<void> {
        return Promise.resolve();
    }
}

describe("Azure Arc-enabled machines for VS Code", () => {
    it("Is named correctly", () => {
        // Two silly tests to ensure everything is wired up correctly.
        assert.strictEqual(ext.prefix, "azureArcEnabledMachines");
        assert.strictEqual(ext.name, "Azure Arc-enabled machines");
    });

    it("Runs an Azure wizard prompt", async () => {
        const context = await createTestActionContext();
        const wizard = new AzureWizard(context, {
            promptSteps: [new NoopPromptStep()],
        });

        await wizard.prompt();
    });
});
