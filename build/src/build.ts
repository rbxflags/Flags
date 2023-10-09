import * as TJS from 'typescript-json-schema';
import * as fs from 'fs-extra';
import * as path from 'path';
import * as crypto from 'crypto';
import * as json5 from 'json5';
import type { IFlagList } from './flaglist';

// create schema:
fs.ensureDirSync('dist');
const settings: TJS.PartialArgs = {
  required: true,
};
const compilerOptions: TJS.CompilerOptions = {
  strictNullChecks: true,
};
const basePath = '.';
const program = TJS.getProgramFromFiles(
  [path.resolve('src/flaglist.ts')],
  compilerOptions,
  basePath,
);
const schema = TJS.generateSchema(program, 'IFlagList', settings);
fs.writeFileSync('dist/schema.json', JSON.stringify(schema, null, 2));
fs.writeFileSync('dist/schema.min.json', JSON.stringify(schema));

// hash files
const flagList = json5.parse(fs.readFileSync(path.resolve(__dirname, '..', '..', 'flaglists.json5'), 'utf8')) as IFlagList;
const algo = 'SHA-512';
Object.entries(flagList).forEach(([key, flag]) => {
  flag.base.forEach((file) => {
    const hash = crypto.createHash(algo);
    hash.update(fs.readFileSync(path.resolve(__dirname, '..', '..', flag.gitpath ?? '.', file.f)));
    file.h = {
      algorithm: algo,
      digest: hash.digest('hex'),
    };
  });
  flag.features.forEach((feature) => {
    Object.entries(feature.options).forEach(([_, files]) => {
      files.forEach((file) => {
        const hash = crypto.createHash(algo);
        hash.update(fs.readFileSync(path.resolve(__dirname, '..', '..', flag.gitpath ?? '.', file.f)));
        file.h = {
          algorithm: algo,
          digest: hash.digest('hex'),
        };
      });
    });
  });
});
fs.writeFileSync(path.resolve(__dirname, '..', 'dist', 'flaglists.json5'), json5.stringify(flagList, null, 2));
fs.writeFileSync(path.resolve(__dirname, '..', 'dist', 'flaglists.min.json5'), json5.stringify(flagList));
fs.writeFileSync(path.resolve(__dirname, '..', 'dist', 'flaglists.json'), JSON.stringify(flagList));
