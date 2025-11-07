import readline from 'node:readline';
import fs from 'node:fs/promises';
import { styleText } from 'node:util';
import { printErrorLine } from '../utils/utils.js';
import { cleanup } from '../core/export.js';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

if (process.platform === 'win32') {
    rl.on('SIGINT', function () {
        process.emit('SIGINT');
    });
}

process.on('SIGINT', function () {
    cleanup();
    process.exit(0);
});

export async function askThemeUrl() {
    let url = await new Promise((resolve) => {
        rl.question('Please enter a Visual Studio Code theme URL from the marketplace: \n» ', (url) => {
            resolve(url);
        });
    });

    url = url.trim();
    if (!url) {
        printErrorLine('Please provide a URL.');
        process.exit(1);
    }

    return url;
}

export async function askThemeIndices(themes) {
    if (themes.length === 0) {
        printErrorLine('No themes found in the package.json.');
        process.exit(1);
    }

    const OUTPUT_DIR = `./out`;
    await fs.mkdir(OUTPUT_DIR, { recursive: true });

    let num = 1;
    console.log('Available themes:');
    for (const theme of themes) {
        const isDark = theme.uiTheme === 'vs-dark' || theme.uiTheme === 'hc-black';
        const themeInfo = '(' + (isDark ? 'Dark' : 'Light') + ')';
        console.log(`[${num++}] ${styleText(['blue'], theme.label)} ${styleText(['gray'], themeInfo)}`);
    }

    let themeIndexLight = await askThemeIndex('\nPlease enter the number of the light theme: \n» ');
    let themeIndexDark = await askThemeIndex('\nPlease enter the number of the dark theme: \n» ');
    rl.close();
    console.log();

    return { light: themeIndexLight, dark: themeIndexDark };
}

async function askThemeIndex(prompt) {
    let themeIndex = await new Promise((resolve) => {
        rl.question(prompt, (input) => {
            resolve(input);
        });
    });
    themeIndex = themeIndex.trim();

    if (!themeIndex) {
        printErrorLine('Please provide a valid theme number.');
        process.exit(1);
    }

    return themeIndex;
}
