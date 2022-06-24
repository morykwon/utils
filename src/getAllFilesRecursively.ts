import fs from 'fs';
import path from 'path';

const concatFullPathInPrefix = (prefix: string) => (extraPath: string) =>
  path.join(prefix, extraPath);

const isFile = (path: string) => fs.statSync(path).isFile();

const getAllFilesRecursively = (folder: string) => {
  const fileNames = fs.readdirSync(folder);

  const fileWithFullPaths = fileNames.map(concatFullPathInPrefix(folder));

  return fileWithFullPaths.reduce((filePaths, fileWithFullPath) => {
    const otherFilePaths: string[] = isFile(fileWithFullPath)
      ? [fileWithFullPath]
      : getAllFilesRecursively(fileWithFullPath);

    return [...filePaths, ...otherFilePaths];
  }, [] as string[]);
};

export default getAllFilesRecursively;
