// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { IActionContext } from "@microsoft/vscode-azext-utils";
import { extensions } from "vscode";
import { remoteSshExtensionId } from "../constants";
import { ext } from "../extensionVariables";

export async function verifyRemoteSshExtension(
    context: IActionContext,
): Promise<void> {
    const extension = extensions.getExtension(remoteSshExtensionId);
    if (extension) {
        if (!extension.isActive) {
            await extension.activate();
        }
    } else {
        void context.ui.showWarningMessage(
            `You must have the ["Remote - SSH" extension](command:${ext.prefix}.showRemoteSshExtension) installed to perform this operation.`,
        );
        context.errorHandling.suppressDisplay = true;
        throw new Error(`${remoteSshExtensionId} extension is not installed.`);
    }
}
