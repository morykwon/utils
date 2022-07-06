import mock from 'mock-fs';
import getAllFilesRecursively from './getAllFilesRecursively';

describe('test', () => {
  const dummyFilePaths = {
    'test1.txt': 'This is TEXT',
    mdx: {
      'test.mdx': 'This is MDX',
      'test1.mdx': 'This is MDX1',
      'test2.mdx': 'This is MDX2',
    },
    dept1: {
      dept2: {
        'test.md': 'This is MD',
      },
    },
  };

  beforeEach(() => {
    mock({
      'src/dummy': dummyFilePaths,
    });
  });

  afterEach(() => {
    mock.restore();
  });

  context('with Folder(with Files)', () => {
    it('return FileList', () => {
      const fileList = getAllFilesRecursively(`${process.cwd()}/src/dummy`);

      const files = [
        'dept1/dept2/test.md',
        'mdx/test.mdx',
        'mdx/test1.mdx',
        'mdx/test2.mdx',
        'test1.txt',
      ].map((f) => `${process.cwd()}/src/dummy/${f}`);

      expect(fileList).toEqual(files);
    });
  });
});
