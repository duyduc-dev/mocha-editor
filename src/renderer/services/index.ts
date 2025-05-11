import files, {
  IFilesNativeModule,
} from '@renderer/services/nativeModule/files';

export interface INativeModule {
  fileSystem: IFilesNativeModule;
}

export interface IAppServices {
  nativeModule: INativeModule;
}

const nativeModule: INativeModule = {
  fileSystem: files,
};

export default {
  nativeModule: nativeModule,
} as IAppServices;
