import fs from 'fs';
import path from 'path';

const getAllFilesByLoop = (folder: string): string[] => {
  if (fs.statSync(folder).isFile()) return [folder];

  const allFiles: string[] = [];
  const folderQueue = [folder];

  while (folderQueue.length) {
    const currentFolder = folderQueue.shift() as string;
    const filesInDirectory = fs.readdirSync(currentFolder, {
      withFileTypes: true,
    });

    filesInDirectory.forEach((fileOrDirectory) => {
      const absoluteFilePath: string = path.join(
        currentFolder,
        fileOrDirectory.name,
      );

      if (fileOrDirectory.isFile()) {
        allFiles.push(absoluteFilePath);
      } else {
        folderQueue.push(absoluteFilePath);
      }
    });
  }

  return allFiles;
};

export default getAllFilesByLoop;
