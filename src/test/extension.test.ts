// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as assert from "assert";
import { ext } from "../extensionVariables";

describe("Azure Arc-enabled machines for VS Code", () => {
    it("Is named correctly", () => {
        // Two silly tests to ensure everything is wired up correctly.
        assert.strictEqual(ext.prefix, "azureArcEnabledMachines");
        assert.strictEqual(ext.name, "Azure Arc-enabled machines");
    });
});
