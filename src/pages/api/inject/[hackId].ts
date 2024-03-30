import { readFileSync } from 'fs';
import type { NextApiRequest, NextApiResponse } from 'next'
import { hacks } from '~/hacks';
import UglifyJS from 'uglify-js';
 
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    if (req.method !== 'GET') {
        res.status(405).end();
        return;
    }

    const { hackId } = req.query;

    const hack = hacks.find(hack => hack.id === hackId);

    console.log(hackId, hack);

    if (!hack) {
        console.log('not found');
        res.status(404).end();
        return;
    }

    // hack files are stored in src/hacks/{hackId}

    // to import a module the following process is performed:
    // load hack using id, get the scripts array
    // we want to grab all the scripts, concatenate them, and return them
    // as a single javascript file
    // scripts are loaded in the order they are listed in the scripts array

    // to load the main hack, we first check and load all the dependencies as described above
    // then, we concatenate the main hack file's scripts with all the dependencies
    // dependencies are loaded in the order they are listed in the dependencies array
    // the main hack file is loaded last

    const loadHack = (hackId: string) => {
        const hack = hacks.find(hack => hack.id === hackId);
        if (!hack) {
            return '';
        }
        return hack.scripts.map(script => {
            // use fs.readFileSync to read the file
            return readFileSync(`src/hacks/${hackId}/${script}`, 'utf-8');
        }).join('\n');
    }

    const loadDependencies = (hackId: string) => {
        const hack = hacks.find(hack => hack.id === hackId);
        if (!hack) {
            return '';
        }
        return hack.dependencies.map(dependency => {
            return loadHack(dependency);
        }).join('\n');
    }

    const mainHack = loadHack(hackId as string);

    const dependencies = loadDependencies(hackId as string);

    const payload = dependencies + mainHack;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const minifiedPayload = UglifyJS.minify(payload, {
        mangle: {
            toplevel: false
        },
        keep_fnames: true,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    }).code;

    res.setHeader('Content-Type', 'text/javascript');
    res.status(200).send(minifiedPayload);

    return;
}