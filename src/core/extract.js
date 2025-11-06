import unzipper from 'unzipper';
import JSON5 from 'json5';
import { styleText } from 'node:util';
import { printErrorLine } from '../utils/utils.js';

export class VsixExtractor {
    constructor(vsixFile) {
        this.vsixFile = vsixFile;
        this.directory = null;
    }

    async init() {
        this.directory = await unzipper.Open.file(this.vsixFile);
    }

    async extractPackageJson() {
        console.log('Extracting theme information...');
        const packageJsonFile = this.directory.files.find((file) => file.path === 'extension/package.json');
        if (!packageJsonFile) {
            printErrorLine('package.json not found in the VSIX package.');
            process.exit(1);
        }

        const packageJsonBuffer = await packageJsonFile.buffer();
        const packageJson = JSON5.parse(packageJsonBuffer.toString());
        console.log('\nPackage information:');
        console.log(styleText(['bold', 'green'], 'Name:'), packageJson.displayName);
        console.log(styleText(['bold', 'green'], 'Description:'), packageJson.description);
        console.log(styleText(['bold', 'green'], 'Version:'), packageJson.version);
        console.log();

        return packageJson;
    }

    async extractThemeFile(theme) {
        console.log(
            'Extracting theme ' + styleText(['blue'], theme.label) + ' from ' + styleText(['blue'], theme.path) + '...'
        );

        if (theme.path.toLowerCase().endsWith('.tmtheme')) {
            printErrorLine('TM Theme format is not supported yet: ' + theme.path);
            process.exit(1);
        }

        const normalizedPath = theme.path.replace(/^.\//, '');
        const themeFile = this.directory.files.find((file) => file.path === `extension/${normalizedPath}`);
        if (!themeFile) {
            printErrorLine(`Theme file not found: ${normalizedPath}`);
            process.exit(1);
        }

        console.log('Parsing theme...');

        const themeBuffer = await themeFile.buffer();
        const parsedTheme = JSON5.parse(themeBuffer.toString());

        return parsedTheme;
    }
}
