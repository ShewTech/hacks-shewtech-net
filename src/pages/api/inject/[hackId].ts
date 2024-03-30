import { readFileSync } from 'fs';
import type { NextApiRequest, NextApiResponse } from 'next';
import UglifyJS from 'uglify-js';
import { hacks } from '~/hacks';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.status(405).end();
    return;
  }

  const { hackId } = req.query;

  const hack = hacks.find((hack) => hack.id === hackId);

  console.log(hackId, hack);

  if (!hack) {
    console.log('not found');
    res.status(404).end();
    return;
  }

  const loadHack = (hackId: string) => {
    const hack = hacks.find((hack) => hack.id === hackId);
    if (!hack) {
      return '';
    }
    return hack.scripts
      .map((script) => {
        return readFileSync(
          `${process.cwd()}/src/hacks/${hackId}/${script}`,
          'utf-8'
        );
      })
      .join('\n');
  };

  const loadDependencies = (hackId: string) => {
    const hack = hacks.find((hack) => hack.id === hackId);
    if (!hack) {
      return '';
    }
    return hack.dependencies
      .map((dependency) => {
        return loadHack(dependency);
      })
      .join('\n');
  };

  const mainHack = loadHack(hackId as string);

  const dependencies = loadDependencies(hackId as string);

  const payload = dependencies + mainHack;

  const minifiedPayload = UglifyJS.minify(payload, {
    mangle: {
      toplevel: false,
    },
    keep_fnames: true,
  }).code;

  res.setHeader('Content-Type', 'text/javascript');
  res.status(200).send(minifiedPayload);

  return;
}
