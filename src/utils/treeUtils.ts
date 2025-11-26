// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { TreeItemIconPath } from "@microsoft/vscode-azext-utils";
import { Uri } from "vscode";
import { ext } from "../extensionVariables";

export function getIconPath(iconName: string): TreeItemIconPath {
    return Uri.joinPath(getResourcesUri(), `${iconName}.svg`);
}

function getResourcesUri(): Uri {
    return Uri.joinPath(ext.context.extensionUri, "resources");
}
