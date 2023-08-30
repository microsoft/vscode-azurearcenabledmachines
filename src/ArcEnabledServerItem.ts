// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.


import { AzureResource, AzureSubscription, ViewPropertiesModel } from "@microsoft/vscode-azureresources-api";
import { IActionContext, createSubscriptionContext, nonNullProp } from "@microsoft/vscode-azext-utils";
import { createPortalUri, getResourceGroupFromId } from "@microsoft/vscode-azext-azureutils";
import { Machine } from "@azure/arm-hybridcompute";
import { Uri } from "vscode";
import { ArcEnabledServersResourceModel } from "./ArcEnabledServersBranchDataProvider";
import { createHybridComputeClient } from "./utils/azureClients";

export interface ArcEnabledServerModel extends Machine {
    id: string;
    name: string;
    resourceGroup: string;
}

export class ArcEnabledServerItem implements ArcEnabledServersResourceModel {
    azureResourceId?: string | undefined;
    portalUrl?: Uri | undefined;
    viewProperties?: ViewPropertiesModel | undefined;
    id?: string | undefined;

    constructor(
        public readonly subscription: AzureSubscription,
        public readonly resource: AzureResource,
        public readonly arcEnabledServer: ArcEnabledServerModel) {

        this.id = this.resource.id;
        this.portalUrl = createPortalUri(subscription, this.id);
    }

    static async Get(
        context: IActionContext,
        subscription: AzureSubscription,
        resourceGroup: string,
        name: string): Promise<ArcEnabledServerModel> {

        const subContext = createSubscriptionContext(subscription);
        const client = await createHybridComputeClient([context, subContext]);
        const machine = await client.machines.get(resourceGroup, name, { expand: "instanceView" });
        return ArcEnabledServerItem.CreateArcEnabledServerModel(machine);
    }

    private static CreateArcEnabledServerModel(machine: Machine): ArcEnabledServerModel {
        const id = nonNullProp(machine, "id");
        return {
            id,
            name: nonNullProp(machine, "name"),
            resourceGroup: getResourceGroupFromId(id),
            ...machine
        };
    }
}
