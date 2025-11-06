<div align="center">
    <img src="https://raw.githubusercontent.com/Xed-Editor/Xed-Editor/refs/heads/main/fastlane/metadata/android/en-US/images/icon.png" alt="vscode2xed Logo" width="100"/>
    <h1>vscode2xed</h1>
</div>

Convert Visual Studio Code themes into Xed-Editor compatible themes. This tool downloads a VS Code theme from the marketplace, extracts its color palette and token colors, and converts it into a format that Xed-Editor can understand.

## Features

-   Download VS Code theme `.vsix` packages directly from the marketplace.
-   Extract light and dark theme variants from the extension.
-   Convert full theme palettes, terminal colors, and editor token colors.
-   Automatically export converted themes to an installable JSON theme.

## Screenshots

<div align="center">
    <figure style="display: inline-block; width: 30%; margin: 0 1%;">
        <a href="https://marketplace.visualstudio.com/items?itemName=GitHub.github-vscode-theme">
            <img src="./assets/GitHub%20Theme.jpg" alt="GitHub Theme">
        </a>
        <figcaption>GitHub Theme</figcaption>
    </figure>
    <figure style="display: inline-block; width: 30%; margin: 0 1%;">
        <a href="https://marketplace.visualstudio.com/items?itemName=monokai.theme-monokai-pro-vscode">
            <img src="./assets/Monokai%20Pro.jpg" alt="Monokai Pro">
        </a>
        <figcaption>Monokai Pro</figcaption>
    </figure>
    <figure style="display: inline-block; width: 30%; margin: 0 1%;">
        <a href="https://marketplace.visualstudio.com/items?itemName=zhuangtongfa.Material-theme">
            <img src="./assets/One%20Dark%20Pro.jpg" alt="One Dark Pro">
        </a>
        <figcaption>One Dark Pro</figcaption>
    </figure>
</div>

## Requirements

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

## Contributing

Contributions are welcome! Feel free to improve the project's color conversion algorithm or fix bugs and edge cases. You can open a pull request or create an issue for suggestions.

## License

This project is licensed under the MIT License.
See the [LICENSE](LICENSE.md) file for more details.

Not affiliated with Microsoft or Visual Studio Code in any way.
Screenshots and converted themes are shown for demonstration purposes only.
