import { Compilation, Chunk } from "webpack";

import {
    ChunkGroup,
    Chunks,
    Entries,
    Manifest,
} from './type';

export const entriesMap = new Map();
export const chunksMap = new Map();

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
    // Although the type definitions say that name is a string, we have experienced that some dynamically generated
    // chunks will have a name of undefined, but have a valid id, so we will try to use the name, but fallback to id
    // here to make sure, we always have a valid name.
    const chunkName = name || id;

    if (chunksMap.has(chunkName)) {
        return;
    }
    chunksMap.set(chunkName, {
        file: files[0],
        hash,
    });
}

export function makeManifest(comp: Compilation): Manifest {
    comp.chunkGroups.forEach(group => addEntry(group));
    return {
        chunks: mapToObject<Chunks>(chunksMap),
        entries: mapToObject<Entries>(entriesMap),
    };
}
