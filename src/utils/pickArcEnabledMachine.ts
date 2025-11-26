// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
    type IActionContext,
    QuickPickAzureResourceStep,
    QuickPickAzureSubscriptionStep,
    QuickPickGroupStep,
    runQuickPickWizard,
} from "@microsoft/vscode-azext-utils";
import { AzExtResourceType } from "@microsoft/vscode-azureresources-api";
import { ArcEnabledMachineItem } from "../ArcEnabledMachineItem";
import { ext } from "../extensionVariables";

export async function pickArcEnabledMachine(
    context: IActionContext,
): Promise<ArcEnabledMachineItem> {
    const treeDataProvider =
        ext.rgApiV2.resources.azureResourceTreeDataProvider;
    const types = [AzExtResourceType.ArcEnabledMachines];
    const promptSteps = [
        new QuickPickAzureSubscriptionStep(treeDataProvider),
        new QuickPickGroupStep(treeDataProvider, { groupType: types }),
        new QuickPickAzureResourceStep(
            treeDataProvider,
            { resourceTypes: types, skipIfOne: false },
            { placeHolder: "Pick an Azure Arc-enabled machine" },
        ),
    ];

    return await runQuickPickWizard(context, {
        promptSteps,
        title: "Pick an Azure Arc-enabled machine",
    });
}
