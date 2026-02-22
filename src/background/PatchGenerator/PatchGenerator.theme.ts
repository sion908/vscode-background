import { css, WithoutImagesPatchGenerator } from './PatchGenerator.base';

export class ThemePatchGenerator extends WithoutImagesPatchGenerator {
    /**
     * 混合模式使用 css variable
     *
     * @static
     * @memberof ThemePatchGenerator
     */
    static readonly cssMixBlendMode = '--background-css-mix-blend-mode';

    protected getStyle(): string {
        return css`
            // 浅色主题（默认）
            body {
                // 不使用混合模式
                ${ThemePatchGenerator.cssMixBlendMode}: unset;
            }

            // 深色主题 (覆盖)
            // NOTE: :has() は環境によって無効化されることがあるため使わない
            .monaco-workbench.vs-dark {
                ${ThemePatchGenerator.cssMixBlendMode}: screen;
            }
        `;
    }
}
