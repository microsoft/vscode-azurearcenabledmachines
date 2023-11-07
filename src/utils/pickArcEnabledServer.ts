// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureResourceQuickPickWizardContext, AzureWizardPromptStep, IActionContext, QuickPickAzureResourceStep, QuickPickAzureSubscriptionStep, QuickPickGroupStep, QuickPickWizardContext, runQuickPickWizard } from "@microsoft/vscode-azext-utils";
import { AzExtResourceType } from "@microsoft/vscode-azureresources-api";
import { ArcEnabledServersResourceModel } from "../ArcEnabledServersBranchDataProvider";
import { ext } from "../extensionVariables";

function getPickArcEnabledServerPromptSteps(): AzureWizardPromptStep<AzureResourceQuickPickWizardContext>[] {
    const treeDataProvider = ext.rgApiV2.resources.azureResourceTreeDataProvider;
    const types = [AzExtResourceType.ArcEnabledServers];
    return [
        new QuickPickAzureSubscriptionStep(treeDataProvider),
        new QuickPickGroupStep(treeDataProvider, { groupType: types }),
        new QuickPickAzureResourceStep(
            treeDataProvider,
            {
                // TODO: Somehow filter to only running servers?
                resourceTypes: types,
                skipIfOne: true,
            },
            { placeHolder: "Pick an Arc-enabled Server" }),
    ];
}

export async function pickArcEnabledServer(context: IActionContext): Promise<ArcEnabledServersResourceModel> {
    const promptSteps: AzureWizardPromptStep<QuickPickWizardContext>[] = [
        ...getPickArcEnabledServerPromptSteps()
    ];

    return await runQuickPickWizard(context, { promptSteps, title: "Pick an Arc-enabled Server" });
}
