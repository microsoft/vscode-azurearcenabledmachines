// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
    type IActionContext,
    callWithTelemetryAndErrorHandling,
    nonNullProp,
} from "@microsoft/vscode-azext-utils";
import type {
    AzureResource,
    AzureResourceBranchDataProvider,
    AzureResourceModel,
    AzureSubscription,
} from "@microsoft/vscode-azureresources-api";
import { TreeItem } from "vscode";
import {
    ArcEnabledMachineItem,
    type ArcEnabledMachineModel,
} from "./ArcEnabledMachineItem";

export interface ArcEnabledMachinesResourceModel extends AzureResourceModel {
    subscription: AzureSubscription;
    arcEnabledMachine: ArcEnabledMachineModel;
    getTreeItem(): TreeItem;
}

export class ArcEnabledMachinesBranchDataProvider
    implements AzureResourceBranchDataProvider<ArcEnabledMachinesResourceModel>
{
    getChildren(
        _element: ArcEnabledMachinesResourceModel,
    ): ArcEnabledMachinesResourceModel[] {
        // Arc-enabled machines have no children.
        return [];
    }

    async getResourceItem(
        element: AzureResource,
    ): Promise<ArcEnabledMachinesResourceModel> {
        // This returns the "starting branch item" for each resource (in our case, just Arc-enabled machines as leaves).
        const resourceItem = await callWithTelemetryAndErrorHandling(
            "getResourceItem",
            async (context: IActionContext) => {
                context.errorHandling.rethrow = true;
                const arcEnabledMachine = await ArcEnabledMachineItem.Get(
                    context,
                    element.subscription,
                    nonNullProp(element, "resourceGroup"),
                    element.name,
                );
                return new ArcEnabledMachineItem(
                    element.subscription,
                    element,
                    arcEnabledMachine,
                );
            },
        );

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return resourceItem!;
    }

    getTreeItem(element: ArcEnabledMachinesResourceModel): TreeItem {
        return element.getTreeItem();
    }
}
