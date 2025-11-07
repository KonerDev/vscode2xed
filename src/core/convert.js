import * as utils from '../utils/utils.js';
import { ColorUtils } from '../utils/colorUtils.js';
import config from '../config.js';

export function convertThemes(packageJson, themeLight, themeDark) {
    console.log('Converting theme to Xed-Editor format...');

    return {
        id: packageJson.name,
        name: packageJson.displayName,
        targetVersion: config.TARGET_VERSION,
        inheritBase: config.INHERIT_BASE,
        light: convertThemePalette(themeLight, false),
        dark: convertThemePalette(themeDark, true, false), // Disable warnings for second conversion to prevent duplicates
    };
}

export function convertThemePalette(theme, isDark, showWarnings = true) {
    if (!theme.colors) {
        utils.printErrorLine('The theme does not contain any colors.');
        process.exit(1);
    }

    if (!theme.tokenColors) {
        utils.printErrorLine('The theme does not contain any token colors.');
        process.exit(1);
    }

    const colorUtils = new ColorUtils(showWarnings);
    const getColor = colorUtils.getColor.bind(colorUtils, theme);

    const primaryColor = colorUtils.getMostSaturated(
        getColor('button.background'),
        getColor('tab.activeBorder'),
        getColor('tab.activeBorderTop')
    );
    const surfaceColor = getColor('panel.background', getColor('activityBar.background'));
    const generatedColors = colorUtils.generateSchemeColors(primaryColor, surfaceColor, isDark);

    return {
        baseColors: {
            primary: colorUtils.clampThemeTone(primaryColor, true),
            onPrimary: getColor('button.foreground'),

            primaryContainer: getColor('button.hoverBackground'),
            onPrimaryContainer: getColor('button.foreground'),

            secondary: generatedColors.secondary,
            onSecondary: generatedColors.onSecondary,

            secondaryContainer: generatedColors.secondaryContainer,
            onSecondaryContainer: generatedColors.onSecondaryContainer,

            tertiary: generatedColors.tertiary,
            onTertiary: generatedColors.onTertiary,

            tertiaryContainer: generatedColors.tertiaryContainer,
            onTertiaryContainer: generatedColors.onTertiaryContainer,

            error: getColor('inputValidation.errorBackground'),
            onError: getColor('inputValidation.errorForeground'),

            errorContainer: getColor('inputValidation.errorBackground'),
            onErrorContainer: getColor('inputValidation.errorForeground'),

            background: surfaceColor,
            onBackground: getColor('foreground'),

            surface: surfaceColor,
            onSurface: getColor('foreground'),

            surfaceVariant: generatedColors.surfaceVariant,
            onSurfaceVariant: generatedColors.onSurfaceVariant,

            outline: getColor('contrastActiveBorder'),
            outlineVariant: getColor('contrastActiveBorder'),
            scrim: generatedColors.scrim,

            inverseSurface: generatedColors.inverseSurface,
            inverseOnSurface: generatedColors.inverseOnSurface,
            inversePrimary: generatedColors.inversePrimary,

            surfaceTint: generatedColors.surfaceTint,
            surfaceDim: generatedColors.surfaceDim,
            surfaceBright: generatedColors.surfaceBright,

            surfaceContainerLowest: generatedColors.surfaceContainerLowest,
            surfaceContainerLow: generatedColors.surfaceContainerLow,
            surfaceContainer: generatedColors.surfaceContainer,
            surfaceContainerHigh: generatedColors.surfaceContainerHigh,
            surfaceContainerHighest: generatedColors.surfaceContainerHighest,
        },
        terminalColors: {
            foreground: getColor('terminal.foreground'),
            background: getColor('terminal.background', surfaceColor),
            cursor: getColor('terminalCursor.background'),
            color0: getColor('terminal.ansiBlack'),
            color1: getColor('terminal.ansiRed'),
            color2: getColor('terminal.ansiGreen'),
            color3: getColor('terminal.ansiYellow'),
            color4: getColor('terminal.ansiBlue'),
            color5: getColor('terminal.ansiMagenta'),
            color6: getColor('terminal.ansiCyan'),
            color7: getColor('terminal.ansiWhite'),
            color8: getColor('terminal.ansiBrightBlack'),
            color9: getColor('terminal.ansiBrightRed'),
            color10: getColor('terminal.ansiBrightGreen'),
            color11: getColor('terminal.ansiBrightYellow'),
            color12: getColor('terminal.ansiBrightBlue'),
            color13: getColor('terminal.ansiBrightMagenta'),
            color14: getColor('terminal.ansiBrightCyan'),
            color15: getColor('terminal.ansiBrightWhite'),
            color16: getColor('terminal.ansiWhite'),
            color17: getColor('terminal.ansiBrightWhite'),
            color18: getColor('terminal.ansiBrightBlack'),
            color19: getColor('terminal.ansiBrightBlack'),
            color20: getColor('terminal.ansiBrightBlack'),
            color21: getColor('terminal.ansiBrightBlack'),
        },
        editorColors: {
            block_line: getColor('editorIndentGuide.background'),
            block_line_current: getColor('editorIndentGuide.activeBackground'),
            completion_wnd_background: getColor('editorSuggestWidget.background'),
            completion_wnd_corner: getColor('editorSuggestWidget.border'),
            completion_wnd_item_current: getColor('editorSuggestWidget.selectedBackground'),
            completion_wnd_text_matched: getColor('editorSuggestWidget.highlightForeground'),
            completion_wnd_text_primary: getColor('editorSuggestWidget.foreground'),
            completion_wnd_text_secondary: getColor('descriptionForeground'),
            current_line: getColor('editor.lineHighlightBackground'),
            diagnostic_tooltip_action: getColor('textLink.foreground'),
            diagnostic_tooltip_background: getColor('editorHoverWidget.background'),
            diagnostic_tooltip_brief_msg: getColor('editorHoverWidget.foreground'),
            diagnostic_tooltip_detailed_msg: getColor('editorHoverWidget.foreground'),
            function_char_background_stroke: undefined,
            hard_wrap_marker: undefined,
            highlighted_delimiters_background: colorUtils.TRANSPARENT,
            highlighted_delimiters_foreground: getColor('editorBracketMatch.border'),
            highlighted_delimiters_underline: colorUtils.TRANSPARENT,
            hover_background: getColor('editorHoverWidget.background'),
            hover_border: getColor('editorHoverWidget.border'),
            hover_text_highlighted: getColor('editorHoverWidget.highlightForeground'),
            hover_text_normal: getColor('editorHoverWidget.foreground'),
            line_divider: getColor('editor.background'),
            line_number: getColor('editorLineNumber.foreground'),
            line_number_background: getColor('editor.background'),
            line_number_current: getColor('editorLineNumber.activeForeground'),
            line_number_panel: undefined,
            line_number_panel_text: undefined,
            matched_text_background: getColor('searchEditor.findMatchBackground'),
            non_printable_char: getColor('editorWhitespace.foreground'),
            problem_error: getColor('editorError.foreground'),
            problem_typo: undefined,
            problem_warning: getColor('editorWarning.foreground'),
            scroll_bar_thumb: getColor('scrollbarSlider.background'),
            scroll_bar_thumb_pressed: getColor('scrollbarSlider.activeBackground'),
            scroll_bar_track: colorUtils.TRANSPARENT,
            selected_text_background: getColor('editor.selectionBackground'),
            selection_handle: getColor('editor.selectionForeground'),
            selection_insert: getColor('editor.selectionForeground'),
            side_block_line: undefined,
            signature_background: getColor('editorSuggestWidget.background'),
            signature_border: getColor('editorSuggestWidget.border'),
            signature_text_highlighted_parameter: getColor('editorSuggestWidget.highlightForeground'),
            signature_text_normal: getColor('editorSuggestWidget.foreground'),
            snippet_background_editing: getColor('editor.snippetTabstopHighlightBackground'),
            snippet_background_inactive: getColor('editor.snippetTabstopHighlightBackground'),
            snippet_background_related: getColor('editor.snippetTabstopHighlightBackground'),
            static_span_background: getColor('editorWhitespace.background'),
            static_span_foreground: getColor('editorWhitespace.foreground'),
            sticky_scroll_divider: getColor('editorStickyScroll.border'),
            strikethrough: 0,
            text_action_window_background: getColor('editorSuggestWidget.background'),
            text_action_window_icon_color: getColor('editorSuggestWidget.foreground'),
            text_inlay_hint_background: getColor('editorInlayHint.background'),
            text_inlay_hint_foreground: getColor('editorInlayHint.foreground'),
            text_normal: getColor('editor.foreground'),
            text_selected: getColor('editor.selectionForeground'),
            underline: 0,
            whole_background: getColor('editor.background'),
        },
        tokenColors: theme.tokenColors,
    };
}
