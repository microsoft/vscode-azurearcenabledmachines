# Azure Arc-enabled machines for Visual Studio Code (Preview)

Please note that this extension is in preview, and is very much a work-in-progress with this first release. Please give it a try and file issues in our GitHub repository for any bugs, feature requests and questions!

## Overview

This Visual Studio Code (VS Code) extension provides a seamless experience for managing and working with Azure Arc-enabled machines directly from VS Code.

Azure Arc-enabled machines allows you to manage your Windows and Linux physical servers and virtual machines hosted outside of Azure, on your corporate network, or other cloud provider.

## Features

- **View Azure Arc-enabled machines**: Easily view all your Azure Arc-enabled machines in the VS Code sidebar.
- **Connect to Azure Arc-enabled machines**: Quickly connect to your Azure Arc-enabled machines via SSH without a public IP address.

## Getting Started

1. **Install the extension**: Download the extension from the VS Code marketplace.
2. **Sign in to Azure**: Use the Azure: Sign In command from the command palette (`F1` > `Azure: Sign In`).
3. **Select your subscription**: Select the Azure subscription you want to use for your Azure Arc-enabled machines.

## SSH Connection Requirements

To connect to your Azure Arc-enabled machines via SSH, you need to have the SSH extension for Azure CLI installed on your machine. Here are the steps to install it:

1. **Install Azure CLI**: If you haven't installed Azure CLI, please follow [these instructions](https://aka.ms/GetTheAzureCLI).

2. **Sign in to Azure CLI**: Since Azure CLI is used to generate the SSH connection, run the following command in your terminal to [sign in](https://learn.microsoft.com/en-us/cli/azure/authenticate-azure-cli-interactively):

    `az login`

> **NOTE**: For the v0.0.1 release, only remote Linux machines are supported.

## Contributing

This project welcomes contributions and suggestions.  Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit <https://cla.opensource.microsoft.com>.

When you submit a pull request, a CLA bot will automatically determine whether you need to provide
a CLA and decorate the PR appropriately (e.g., status check, comment). Simply follow the instructions
provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.

## Trademarks

This project may contain trademarks or logos for projects, products, or services. Authorized use of Microsoft
trademarks or logos is subject to and must follow
[Microsoft's Trademark & Brand Guidelines](https://www.microsoft.com/en-us/legal/intellectualproperty/trademarks/usage/general).
Use of Microsoft trademarks or logos in modified versions of this project must not cause confusion or imply Microsoft sponsorship.
Any use of third-party trademarks or logos are subject to those third-party's policies.
