import fs from 'node:fs/promises';
import { styleText } from 'node:util';
import { printErrorLine } from '../utils/utils.js';
import config from '../config.js';

export function parseVsCodeUrl(url) {
    let match = url.match(/https:\/\/marketplace\.visualstudio\.com\/items\?itemName=([^&.]+).([^&.]+)/);
    if (!match) {
        printErrorLine('Please provide a valid Visual Studio Code theme URL from the marketplace.');
        process.exit(1);
    }

    return {
        publisher: match[1],
        themeId: match[2],
    };
}

export async function downloadVSIX(publisher, themeId) {
    console.log('\nExtension information:');
    console.log(styleText(['bold', 'green'], 'Publisher:'), publisher);
    console.log(styleText(['bold', 'green'], 'Theme ID:'), themeId);
    console.log();

    const vsixUrl = `https://github.gallery.vsassets.io/_apis/public/gallery/publisher/${publisher}/extension/${themeId}/latest/assetbyname/Microsoft.VisualStudio.Services.VSIXPackage`;
    console.log('Downloading VSIX package from ' + styleText(['blue'], vsixUrl) + '...');
    const vsixResponse = await fetch(vsixUrl);
    if (!vsixResponse.ok) {
        printErrorLine('Failed to download the VSIX package. Please check the URL and try again.');
        process.exit(1);
    }

    const vsixBuffer = await vsixResponse.arrayBuffer();
    await fs.writeFile(config.VSIX_NAME, Buffer.from(vsixBuffer));
    console.log('VSIX package downloaded to', config.VSIX_NAME);
    return config.VSIX_NAME;
}
