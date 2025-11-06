import { printHeader } from './utils/utils.js';
import { convertThemes } from './core/convert.js';
import { askThemeIndices, askThemeUrl } from './cli/cli.js';
import { downloadVSIX, parseVsCodeUrl } from './core/download.js';
import { VsixExtractor } from './core/extract.js';
import { exportTheme } from './core/export.js';

printHeader();

const url = await askThemeUrl();
const { publisher, themeId } = await parseVsCodeUrl(url);

const vsixFile = await downloadVSIX(publisher, themeId);

const extractor = new VsixExtractor(vsixFile);
await extractor.init();
const packageJson = await extractor.extractPackageJson();

const themes = packageJson.contributes?.themes ?? [];
const { light: lightThemeIndex, dark: darkThemeIndex } = await askThemeIndices(themes);

let selectedThemeLight = themes[parseInt(lightThemeIndex) - 1];
let selectedThemeDark = themes[parseInt(darkThemeIndex) - 1];

let themeLight = await extractor.extractThemeFile(selectedThemeLight);
let themeDark = await extractor.extractThemeFile(selectedThemeDark);

const convertedTheme = convertThemes(packageJson, themeLight, themeDark);
await exportTheme(packageJson.name, convertedTheme);
