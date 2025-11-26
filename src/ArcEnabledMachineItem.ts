// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.


import { join } from "path";
import { tmpdir } from "os";
import type { Machine } from "@azure/arm-hybridcompute";
import type { AzureResource, AzureSubscription, ViewPropertiesModel } from "@microsoft/vscode-azureresources-api";
import { TreeItem, TreeItemCollapsibleState, Uri } from "vscode";
import { createPortalUri, getResourceGroupFromId } from "@microsoft/vscode-azext-azureutils";
import { type IActionContext, createSubscriptionContext, nonNullProp } from "@microsoft/vscode-azext-utils";
import { getIconPath } from "./utils/treeUtils";
import { createHybridComputeClient } from "./utils/azureClients";
import type { ArcEnabledMachinesResourceModel } from "./ArcEnabledMachinesBranchDataProvider";
import { ext } from "./extensionVariables";

export interface ArcEnabledMachineModel extends Machine {
    id: string;
    name: string;
    resourceGroup: string;
}

export class ArcEnabledMachineItem implements ArcEnabledMachinesResourceModel {
    azureResourceId?: string | undefined;
    portalUrl?: Uri | undefined;
    viewProperties?: ViewPropertiesModel | undefined;
    id?: string | undefined;

    // Used to manage the SSH connection with the Az CLI.
    sshHostName: string;
    sshConfigFile: string;
    sshConfigFolder: string;

    constructor(
        public readonly subscription: AzureSubscription,
        public readonly resource: AzureResource,
        public readonly arcEnabledMachine: ArcEnabledMachineModel) {

        this.id = this.resource.id;
        this.portalUrl = createPortalUri(subscription, this.id);

        // While it's possible this is not unique...it is what the Az CLI SSH extension uses.
        this.sshHostName = `${arcEnabledMachine.resourceGroup}-${arcEnabledMachine.name}`;
        this.sshConfigFile = join(tmpdir(), `vscode-${ext.prefix}-${this.sshHostName}.config`);
        this.sshConfigFolder = join(tmpdir(), "az_ssh_config", this.sshHostName);
    }

    getTreeItem(): TreeItem {
        return {
            label: this.arcEnabledMachine.name,
            id: this.id,
            iconPath: getIconPath("ArcEnabledMachine"),
            collapsibleState: TreeItemCollapsibleState.None,
            contextValue: "arcEnabledMachineItem",
        };
    }

    static async Get(
        context: IActionContext,
        subscription: AzureSubscription,
        resourceGroup: string,
        name: string): Promise<ArcEnabledMachineModel> {

        const subContext = createSubscriptionContext(subscription);
        const client = await createHybridComputeClient([context, subContext]);
        const machine = await client.machines.get(resourceGroup, name, { expand: "instanceView" });
        return ArcEnabledMachineItem.CreateArcEnabledMachineModel(machine);
    }

    private static CreateArcEnabledMachineModel(machine: Machine): ArcEnabledMachineModel {
        const id = nonNullProp(machine, "id");
        return {
            id,
            name: nonNullProp(machine, "name"),
            resourceGroup: getResourceGroupFromId(id),
            ...machine
        };
    }
}
