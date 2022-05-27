"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FfmegBuilder = void 0;
class FfmegBuilder {
    constructor() {
        this.inputPath = "";
        this.outputPath = "";
        this.options = new Map();
        this.options.set('-c:v', 'libx264');
    }
    input(inputPath) {
        this.inputPath = inputPath;
        return this;
    }
    setVideoSize(width, height) {
        this.options.set('-s', `${width}x${height}`);
        return this;
    }
    output(outputPath) {
        if (this.inputPath == "") {
            throw new Error('Не задан параметр input');
        }
        const args = ['-i', this.inputPath];
        this.options.forEach((value, key) => {
            args.push(key);
            args.push(value);
        });
        args.push(outputPath);
        return args;
    }
}
exports.FfmegBuilder = FfmegBuilder;
