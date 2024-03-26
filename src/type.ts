import { Compilation, Chunk } from 'webpack';

export interface Options {
    context?: 'plugin' | 'theme';
    namespace?: string;
    delimiter?: string;
    assetsDir: string;
    phpScriptDir: string;
    configName?: string;
}

export interface EntryMeta {
    deps: string[];
}

export interface ChunkMeta {
    hash: string;
    file: string;
}

export type Entries = Record<string, EntryMeta>;
export type Chunks = Record<string, ChunkMeta>;

export interface Manifest {
    entries: Entries;
    chunks: Chunks;
}

export interface ChunkGroup {
    name?: string;
    chunks: Chunk[];
}
