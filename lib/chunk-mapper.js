"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeManifest = exports.addChunk = exports.mapDependencies = exports.addEntry = exports.mapToObject = exports.chunksMap = exports.entriesMap = void 0;
exports.entriesMap = new Map();
exports.chunksMap = new Map();
const mapToObject = (map) => Array.from(map.entries())
    .reduce((obj, [k, v]) => {
    obj[String(k)] = v;
    return obj;
}, {});
exports.mapToObject = mapToObject;
function addEntry({ name, chunks }) {
    if (exports.entriesMap.has(name)) {
        return;
    }
    exports.entriesMap.set(name, {
        deps: mapDependencies(name, chunks),
    });
}
exports.addEntry = addEntry;
function mapDependencies(name, chunks) {
    return chunks
        .filter(chunk => {
        addChunk(chunk);
        return chunk.name !== name;
    })
        .filter(chunk => chunk)
        .map(c => c.name || c.id + '');
}
exports.mapDependencies = mapDependencies;
function addChunk({ id, name, hash, files }) {
    const chunkName = name || id;
    if (exports.chunksMap.has(chunkName)) {
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
        exports.chunksMap.set(chunkName, {
            file: fileToAdd,
            hash,
        });
    }
}
exports.addChunk = addChunk;
function makeManifest(comp) {
    // Reset global entriesMap and chunksMap to default state before each run
    exports.entriesMap = new Map();
    exports.chunksMap = new Map();
    comp.chunkGroups.forEach(group => addEntry(group));
    return {
        chunks: exports.mapToObject(exports.chunksMap),
        entries: exports.mapToObject(exports.entriesMap),
    };
}
exports.makeManifest = makeManifest;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmstbWFwcGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NodW5rLW1hcHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFTVyxRQUFBLFVBQVUsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO0FBQ3ZCLFFBQUEsU0FBUyxHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7QUFFMUIsTUFBTSxXQUFXLEdBQUcsQ0FBSSxHQUFrQixFQUFVLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztLQUNsRixNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBRSxDQUFDLEVBQUUsQ0FBQyxDQUFFLEVBQUUsRUFBRTtJQUN0QixHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ25CLE9BQU8sR0FBRyxDQUFDO0FBQ2YsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBSkUsUUFBQSxXQUFXLGVBSWI7QUFFWCxTQUFnQixRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFjO0lBQ2pELElBQUksa0JBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDdEIsT0FBTztLQUNWO0lBQ0Qsa0JBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFO1FBQ2pCLElBQUksRUFBRSxlQUFlLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQztLQUN0QyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBUEQsNEJBT0M7QUFFRCxTQUFnQixlQUFlLENBQUMsSUFBWSxFQUFFLE1BQWU7SUFDekQsT0FBTyxNQUFNO1NBQ1IsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBQ1osUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2hCLE9BQU8sS0FBSyxDQUFDLElBQUksS0FBSyxJQUFJLENBQUM7SUFDL0IsQ0FBQyxDQUFDO1NBQ0QsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO1NBQ3RCLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztBQUN2QyxDQUFDO0FBUkQsMENBUUM7QUFFRCxTQUFnQixRQUFRLENBQUMsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQVM7SUFDckQsTUFBTSxTQUFTLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztJQUU3QixJQUFJLGlCQUFTLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxFQUFFO1FBQzFCLE9BQU87S0FDVjtJQUVELE1BQU0sWUFBWSxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUVwQyxJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUM7SUFDdkIsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDO0lBRXJCLEtBQUssTUFBTSxJQUFJLElBQUksWUFBWSxFQUFFO1FBQzdCLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDWixTQUFTLEdBQUcsSUFBSSxDQUFDLENBQUMsa0RBQWtEO1NBQ3ZFO1FBQ0QsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3RCLFdBQVcsR0FBRyxJQUFJLENBQUMsQ0FBQyxrQ0FBa0M7WUFDdEQsTUFBTTtTQUNUO0tBQ0o7SUFFRCxNQUFNLFNBQVMsR0FBRyxXQUFXLElBQUksU0FBUyxDQUFDLENBQUMsZ0VBQWdFO0lBRTVHLElBQUksU0FBUyxFQUFFO1FBQ1gsaUJBQVMsQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFO1lBQ3JCLElBQUksRUFBRSxTQUFTO1lBQ2YsSUFBSTtTQUNQLENBQUMsQ0FBQztLQUNOO0FBQ0wsQ0FBQztBQTlCRCw0QkE4QkM7QUFFRCxTQUFnQixZQUFZLENBQUMsSUFBaUI7SUFDMUMseUVBQXlFO0lBQ3pFLGtCQUFVLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQztJQUN2QixpQkFBUyxHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7SUFDdEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUNuRCxPQUFPO1FBQ0gsTUFBTSxFQUFFLG1CQUFXLENBQVMsaUJBQVMsQ0FBQztRQUN0QyxPQUFPLEVBQUUsbUJBQVcsQ0FBVSxrQkFBVSxDQUFDO0tBQzVDLENBQUM7QUFDTixDQUFDO0FBVEQsb0NBU0MifQ==