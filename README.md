# SpreadSheet Reader

Now that you’ve created a Salesforce DX project, what’s next? Here are some documentation resources to get you started.

## Installing SpreadSheet Reader using a Scratch Org

1. Set up your environment. Follow the steps in the [Quick Start: Lightning Web Components](https://trailhead.salesforce.com/content/learn/projects/quick-start-lightning-web-components/) Trailhead project. The steps include:

    - Enable Dev Hub in your Trailhead Playground
    - Install Salesforce CLI
    - Install Visual Studio Code
    - Install the Visual Studio Code Salesforce extensions, including the Lightning Web Components extension

1. If you haven't already done so, authorize your hub org and provide it with an alias (**myhuborg** in the command below):

    ```
    sf org login web -d -a myhuborg
    ```

1. Clone this repository:

    ```
    git clone https://github.com/salesforce-labs/Spreadsheet-Reader-LWC
    cd Spreadsheet-Reader-LWC
    ```

1. Create a scratch org and provide it with an alias (**SpreadSheetReader** in the command below):

    ```
    sf org create scratch -d -f config/project-scratch-def.json -a SpreadSheetReader
    ```

1. Push the app to your scratch org:

    ```
    sf project deploy start
    ```

1. Assign the **SpreadSheetReader** permission set to the default user:

    ```
    sf org assign permset -n SpreadSheetReader
    ```

## Read All About It

- [Salesforce Extensions Documentation](https://developer.salesforce.com/tools/vscode/)
- [Salesforce CLI Setup Guide](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_setup_intro.htm)
- [Salesforce DX Developer Guide](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_intro.htm)
- [Salesforce CLI Command Reference](https://developer.salesforce.com/docs/atlas.en-us.sfdx_cli_reference.meta/sfdx_cli_reference/cli_reference.htm)