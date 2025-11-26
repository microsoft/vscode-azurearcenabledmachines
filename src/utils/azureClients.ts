// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HybridComputeManagementClient } from "@azure/arm-hybridcompute";
import {
    type AzExtClientContext,
    createAzureClient,
} from "@microsoft/vscode-azext-azureutils";

// Lazy-load @azure packages to improve startup performance.
export async function createHybridComputeClient(
    context: AzExtClientContext,
): Promise<HybridComputeManagementClient> {
    return createAzureClient(
        context,
        (await import("@azure/arm-hybridcompute"))
            .HybridComputeManagementClient,
    );
}
