// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureResource, AzureResourceBranchDataProvider, AzureResourceModel, AzureSubscription } from "@microsoft/vscode-azureresources-api";
import * as vscode from "vscode";
import { IActionContext, callWithTelemetryAndErrorHandling, nonNullProp } from "@microsoft/vscode-azext-utils";
import { ArcEnabledServerItem, ArcEnabledServerModel } from "./ArcEnabledServerItem";

export interface ArcEnabledServersResourceModel extends AzureResourceModel {
    subscription: AzureSubscription;
    arcEnabledServer: ArcEnabledServerModel;
}

export class ArcEnabledServersBranchDataProvider implements AzureResourceBranchDataProvider<ArcEnabledServersResourceModel> {
    getChildren(_element: ArcEnabledServersResourceModel): vscode.ProviderResult<ArcEnabledServersResourceModel[]> {
        throw new Error("Method not implemented.");
    }

    async getResourceItem(element: AzureResource): Promise<ArcEnabledServersResourceModel> {
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

    onDidChangeTreeData?: vscode.Event<ArcEnabledServersResourceModel | ArcEnabledServersResourceModel[] | null | undefined> | undefined;

    getTreeItem(_element: ArcEnabledServersResourceModel): vscode.TreeItem | Thenable<vscode.TreeItem> {
        throw new Error("Method not implemented.");
    }

    getParent?(_element: ArcEnabledServersResourceModel): vscode.ProviderResult<ArcEnabledServersResourceModel> {
        throw new Error("Method not implemented.");
    }

    resolveTreeItem?(_item: vscode.TreeItem, _element: ArcEnabledServersResourceModel, _token: vscode.CancellationToken): vscode.ProviderResult<vscode.TreeItem> {
        throw new Error("Method not implemented.");
    }
}
