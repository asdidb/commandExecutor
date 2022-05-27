import { ChildProcessWithoutNullStreams } from "child_process";
import { CommandExecutor } from "../../core/executor/command.executor";
import { FileService } from "../../core/files/files.servise";
import { IStreamLogger } from "../../core/handler/stream-logger.interface";
import { PromptService } from "../../core/prompt/prompt.service";
import { FfmegBuilder } from "./ffmpeg.builder";
import { ICommandExecFfmpeg, IFfmpegInput } from "./ffmpeg.types";
import { spawn } from 'child_process';
import { StreamHandler } from "../../core/handler/stream.handler";

export class FfmpegExecutor extends CommandExecutor<IFfmpegInput>{
    private fileService: FileService = new FileService();
    private promptService: PromptService = new PromptService();

    constructor(logger: IStreamLogger) {
        super(logger);
    }
    protected async prompt(): Promise<IFfmpegInput> {
        const width = await this.promptService.input<number>('Ширина', 'number');
        const height = await this.promptService.input<number>('Высота', 'number');
        const path = await this.promptService.input<string>('Путь к файлу', 'input');
        const name = await this.promptService.input<string>('Имя', 'input');
        return { width, height, path, name };
    }
    protected build({ width, height, path, name }: IFfmpegInput): ICommandExecFfmpeg {
        const output = this.fileService.getFilePath(path, name, 'mp4');
        const args = (new FfmegBuilder)
            .input(path)
            .setVideoSize(width, height)
            .output(output)
        return { command: 'ffmpeg', args, output };
    }
    protected spawn({ output, command, args }: ICommandExecFfmpeg): ChildProcessWithoutNullStreams {
        this.fileService.deleteFileIfExist(output);
        return spawn(command, args);
    }
    protected processStream(stream: ChildProcessWithoutNullStreams, logger: IStreamLogger): void {
        const handler = new StreamHandler(logger);
        handler.processOutput(stream);
    }
}