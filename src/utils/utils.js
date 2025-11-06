import { styleText } from 'node:util';

export function printHeader() {
    printHeaderLine('____  ___         .___        ___________    .___.__  __                ');
    printHeaderLine('\\   \\/  /____   __| _/        \\_   _____/  __| _/|__|/  |_  ___________ ');
    printHeaderLine(' \\     // __ \\ / __ |  ______  |    __)_  / __ | |  \\   __\\/  _ \\_  __ \\');
    printHeaderLine(' /     \\  ___// /_/ | /_____/  |        \\/ /_/ | |  ||  | (  <_> )  | \\/');
    printHeaderLine('/___/\\  \\___  >____ |         /_______  /\\____ | |__||__|  \\____/|__|   ');
    printHeaderLine('      \\_/   \\/     \\/                 \\/      \\/                        ');

    console.log(styleText('bold', '\nVSCode to Xed-Editor Theme Converter'));
}

export function printHeaderLine(string) {
    console.log(styleText(['bold', 'green'], string));
}

export function printErrorLine(string) {
    console.log(styleText(['bold', 'red'], string));
}

export function printWarningLine(string) {
    console.log(styleText(['bold', 'yellow'], string));
}

export function printSuccessLine(string) {
    console.log(styleText(['bold', 'green'], string));
}
