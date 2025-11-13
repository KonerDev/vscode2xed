<div align="center">
    <img src="https://raw.githubusercontent.com/Xed-Editor/Xed-Editor/refs/heads/main/fastlane/metadata/android/en-US/images/icon.png" alt="vscode2xed Logo" width="100"/>
    <h1>vscode2xed</h1>
</div>

Convert Visual Studio Code themes into [Xed-Editor](https://github.com/Xed-Editor/Xed-Editor) compatible themes. This tool downloads a VS Code theme from the marketplace, extracts its color palette and token colors, and converts it into a format that Xed-Editor can understand.

## Features

-   Download VS Code theme `.vsix` packages directly from the [marketplace](https://marketplace.visualstudio.com/search?target=VSCode&category=Themes&sortBy=Installs).
-   Extract light and dark theme variants from the extension.
-   Convert full theme palettes, terminal colors, and editor token colors.
-   Automatically export converted themes to an installable JSON theme.

## Screenshots

Demonstration images of the themes _GitHub Theme_, _One Dark Pro_ and _Monokai Pro_

<div>
    <a href="https://marketplace.visualstudio.com/items?itemName=GitHub.github-vscode-theme">
        <img src="./assets/GitHub%20Theme.jpg" width="30%" alt="GitHub Theme">
    </a>
    <a href="https://marketplace.visualstudio.com/items?itemName=zhuangtongfa.Material-theme">
        <img src="./assets/One%20Dark%20Pro.jpg" width="30%" alt="One Dark Pro">
    </a>
    <a href="https://marketplace.visualstudio.com/items?itemName=monokai.theme-monokai-pro-vscode">
        <img src="./assets/Monokai%20Pro.jpg" width="30%" alt="Monokai Pro">
    </a>
</div>

## Requirements

-   Git
-   Node.js 21.7.0+

## Installation

1. Clone the repository:

```bash
git clone https://github.com/KonerDev/vscode2xed.git
cd vscode2xed
```

2. Install dependencies

```bash
npm install
```

## Usage

Run the converter:

```bash
npm run start
```

Steps:

1. Enter the Visual Studio Code theme URL from the [marketplace](https://marketplace.visualstudio.com/search?target=VSCode&category=Themes&sortBy=Installs).
2. Select the light and dark theme variants that you want to combine.
3. Wait for the converter to download, extract, and convert the theme.
4. Find the converted theme in the `./out` folder.

## Update

To update `vscode2xed` to the latest version:

1. Pull the latest changes from the GitHub repository:

```bash
git pull origin main
```

2. Update dependencies to ensure compatibility with the latest Node.js:

```bash
npm install
```

3. If you previously built themes, you may want to clear the output folder before generating new ones:

```bash
rm -rf ./out
```

## Contributing

Contributions are welcome! Feel free to improve the project's color conversion algorithm or fix bugs and edge cases. You can open a pull request or create an issue for suggestions.

## License

This project is licensed under the MIT License.
See the [LICENSE](LICENSE) file for more details.

Not affiliated with Microsoft or Visual Studio Code in any way.
Screenshots and converted themes are shown for demonstration purposes only.
