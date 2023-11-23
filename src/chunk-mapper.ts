import { Compilation, Chunk } from "webpack";

import {
    ChunkGroup,
    Chunks,
    Entries,
    Manifest,
} from './type';

export let entriesMap = new Map();
export let chunksMap = new Map();

export const mapToObject = <T>(map: Map<any, any>): T | {} => Array.from(map.entries())
    .reduce((obj, [ k, v ]) => {
        obj[String(k)] = v;
        return obj;
    }, {});

export function addEntry({ name, chunks }: ChunkGroup) {
    if (entriesMap.has(name)) {
        return;
    }
    entriesMap.set(name, {
        deps: mapDependencies(name, chunks),
    });
}

export function mapDependencies(name: string, chunks: Chunk[]): string[] {
    return chunks
        .filter(chunk => {
            addChunk(chunk);
            return chunk.name !== name;
        })
        .filter(chunk => chunk)
        .map(c => c.name || c.id + '');
}

export function addChunk({ id, name, hash, files }: Chunk) {
    const chunkName = name || id;

    if (chunksMap.has(chunkName)) {
        return;
    }

    const fileIterator = files.values();

    let firstJsFile = null;
    let firstFile = null;

    for (const file of fileIterator) {
        if (!firstFile) {
            firstFile = file; // Keep track of the first file regardless of type
        }
        if (file.endsWith('.js')) {
            firstJsFile = file; // Keep track of the first JS file
            break;
        }
    }

    const fileToAdd = firstJsFile || firstFile; // Prefer JS file, fallback to first file if no JS file is found

    if (fileToAdd) {
        chunksMap.set(chunkName, {
            file: fileToAdd,
            hash,
        });
    }
}

export function makeManifest(comp: Compilation): Manifest {
    // Reset global entriesMap and chunksMap to default state before each run
    entriesMap = new Map();
    chunksMap = new Map();
    comp.chunkGroups.forEach(group => addEntry(group));
    return {
        chunks: mapToObject<Chunks>(chunksMap),
        entries: mapToObject<Entries>(entriesMap),
    };
}
