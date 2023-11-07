// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureResource, AzureResourceBranchDataProvider, AzureResourceModel, AzureSubscription } from "@microsoft/vscode-azureresources-api";
import { TreeItem } from "vscode";
import { IActionContext, callWithTelemetryAndErrorHandling, nonNullProp } from "@microsoft/vscode-azext-utils";
import { ArcEnabledServerItem, ArcEnabledServerModel } from "./ArcEnabledServerItem";

export interface ArcEnabledServersResourceModel extends AzureResourceModel {
    subscription: AzureSubscription;
    arcEnabledServer: ArcEnabledServerModel;
    getTreeItem(): TreeItem;
}

export class ArcEnabledServersBranchDataProvider implements AzureResourceBranchDataProvider<ArcEnabledServersResourceModel> {
    getChildren(_element: ArcEnabledServersResourceModel): ArcEnabledServersResourceModel[] {
        // Arc-enabled servers have no children.
        return [];
    }

    async getResourceItem(element: AzureResource): Promise<ArcEnabledServersResourceModel> {
        // This returns the "starting branch item" for each resource (in our case, just Arc-enabled servers as leaves).
        const resourceItem = await callWithTelemetryAndErrorHandling(
            "getResourceItem",
            async (context: IActionContext) => {
                context.errorHandling.rethrow = true;
                const arcEnabledServer = await ArcEnabledServerItem.Get(
                    context,
                    element.subscription,
                    nonNullProp(element, "resourceGroup"),
                    element.name);
                return new ArcEnabledServerItem(element.subscription, element, arcEnabledServer);
            });

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return resourceItem!;
    }

    getTreeItem(element: ArcEnabledServersResourceModel): TreeItem {
        return element.getTreeItem();
    }
}
