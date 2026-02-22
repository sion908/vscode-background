import uglifyjs from 'uglify-js';

import { _ } from '../../utils';
import { ChecksumsPatchGenerator } from './PatchGenerator.checksums';
import { FullscreenPatchGenerator, FullscreenPatchGeneratorConfig } from './PatchGenerator.fullscreen';

export type TPatchGeneratorConfig = {
    enabled: boolean;
    fullscreen: FullscreenPatchGeneratorConfig;
};

export class PatchGenerator {
    public static create(options: TPatchGeneratorConfig) {
        const script = [
            new ChecksumsPatchGenerator().create(),
            new FullscreenPatchGenerator(options.fullscreen).create() // fullscreen
        ]
            .filter(n => !!n.length)
            .map(n => _.withIIFE(n))
            .join(';');

        // return script;
        return uglifyjs.minify(script).code;
    }
}
