import { argbFromHex, DynamicScheme, Hct, hexFromArgb, TonalPalette } from '@material/material-color-utilities';
import { printWarningLine } from './utils.js';

export class ColorUtils {
    constructor(showWarnings) {
        this.showWarnings = showWarnings;
    }

    TRANSPARENT = '#00000000';

    getMostSaturated(a = '#000000', b = '#000000', c = '#000000') {
        return [a, b, c].reduce(
            (max, hex) => {
                const saturation = Hct.fromInt(argbFromHex(hex)).chroma;
                return saturation > max.s ? { hex, s: saturation } : max;
            },
            { hex: a, s: -1 }
        ).hex;
    }

    /**
     * Makes sure that hex color is not too light/dark to ensure sufficient contrast.
     */
    clampThemeTone(color, isDark) {
        const argb = argbFromHex(color);
        let hct = Hct.fromInt(argb);

        // Safe tone ranges
        const MIN_LIGHT = 40;
        const MAX_DARK = 80;

        if (isDark) {
            if (hct.tone < MIN_LIGHT) {
                hct = Hct.from(hct.hue, hct.chroma, MIN_LIGHT);
            }
        } else {
            if (hct.tone > MAX_DARK) {
                hct = Hct.from(hct.hue, hct.chroma, MAX_DARK);
            }
        }

        return hexFromArgb(hct.toInt());
    }

    generateSchemeColors(primary, surface, isDark) {
        const primaryArgb = argbFromHex(primary);
        const surfaceArgb = argbFromHex(surface);

        const primaryPalette = TonalPalette.fromInt(primaryArgb);
        const surfacePalette = TonalPalette.fromInt(surfaceArgb);
        const TONAL_SPOT = 2;

        const scheme = new DynamicScheme({
            sourceColorArgb: primaryArgb,
            variant: TONAL_SPOT,
            contrastLevel: 0,
            isDark: isDark,
            primaryPalette: primaryPalette,
            secondaryPalette: primaryPalette,
            tertiaryPalette: primaryPalette,
            neutralPalette: surfacePalette,
            neutralVariantPalette: surfacePalette,
        });

        const surfaceColors = {
            scrim: scheme.scrim,

            secondary: scheme.secondary,
            onSecondary: scheme.onSecondary,

            tertiary: scheme.tertiary,
            onTertiary: scheme.onTertiary,

            secondaryContainer: scheme.secondaryContainer,
            onSecondaryContainer: scheme.onSecondaryContainer,

            tertiaryContainer: scheme.tertiaryContainer,
            onTertiaryContainer: scheme.onTertiaryContainer,

            inverseSurface: scheme.inverseSurface,
            inverseOnSurface: scheme.inverseOnSurface,
            inversePrimary: scheme.inversePrimary,

            surfaceVariant: scheme.surfaceVariant,
            onSurfaceVariant: scheme.onSurfaceVariant,

            surfaceTint: scheme.surfaceTint,
            surfaceDim: scheme.surfaceDim,
            surfaceBright: scheme.surfaceBright,

            surfaceContainerLowest: scheme.surfaceContainerLowest,
            surfaceContainerLow: scheme.surfaceContainerLow,
            surfaceContainer: scheme.surfaceContainer,
            surfaceContainerHigh: scheme.surfaceContainerHigh,
            surfaceContainerHighest: scheme.surfaceContainerHighest,
        };

        return Object.fromEntries(
            Object.entries(surfaceColors).map(([key, argb]) => [key, '#' + argb.toString(16).slice(2)])
        );
    }

    getColor(theme, colorKey, fallbackValue) {
        let colorValue = theme.colors[colorKey];

        return this.normalizeHexColor(
            colorValue,
            fallbackValue,
            this.showWarnings ? `Color key not found or invalid: ${colorKey} -> ${colorValue}` : null
        );
    }

    normalizeHexColor(hex, fallback, warningMessage) {
        const VALID_HEX_LENGTHS = new Set([4, 7, 9]);

        if (!hex || typeof hex !== 'string' || !hex.startsWith('#') || !VALID_HEX_LENGTHS.has(hex.length)) {
            if (warningMessage) printWarningLine(warningMessage);
            return fallback;
        }

        // Convert #rgb to #rrggbb
        if (hex.length === 4) {
            const r = hex[1];
            const g = hex[2];
            const b = hex[3];
            return ('#' + r + r + g + g + b + b).toLowerCase();
        }

        // Convert #rrggbbaa to #aarrggbb
        if (hex.length === 9) {
            const r = hex[1];
            const g = hex[3];
            const b = hex[5];
            const a = hex[7];
            return ('#' + a + a + r + r + g + g + b + b).toLowerCase();
        }

        return hex.toLowerCase();
    }
}
