import fs from 'node:fs/promises';
import config from '../config.js';
import { styleText } from 'node:util';
import { printSuccessLine } from '../utils/utils.js';

export async function exportTheme(packageName, convertedTheme) {
    const convertedThemeBuffer = JSON.stringify(convertedTheme, null, 4);
    const themeFileName = packageName + '-xed-converted.json';
    const themePath = config.OUTPUT_DIR + '/' + themeFileName;
    await fs.writeFile(themePath, convertedThemeBuffer);

    await cleanup();
    printSuccessLine('\nTheme converted successfully.');
    console.log('You can find the converted theme at ' + styleText(['blue'], themePath));
}

export async function cleanup() {
    await fs.unlink(config.VSIX_NAME);
}
