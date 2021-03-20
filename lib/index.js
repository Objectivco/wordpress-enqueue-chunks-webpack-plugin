"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chunk_mapper_1 = require("./chunk-mapper");
const TemplateProcessor = require("./template-utils");
class default_1 {
    constructor(opts) {
        const defaults = {
            assetsDir: process.cwd(),
            context: 'plugin',
            delimiter: '-',
            namespace: '',
            phpScriptDir: process.cwd(),
        };
        this.opts = Object.assign({}, defaults, opts);
    }
    apply(compiler) {
        compiler.hooks.done.tap('WordpressEnqueueChunksPlugin', this.onHook.bind(this));
    }
    onHook({ compilation }) {
        const manifest = chunk_mapper_1.makeManifest(compilation);
        this.makePhpScript(manifest);
    }
    makePhpScript(manifest) {
        const { readTemplate, writeTemplate, injectProps } = TemplateProcessor;
        const { namespace, delimiter, phpScriptDir } = this.opts;
        const prefix = namespace ? `${namespace}${delimiter}` : '';
        const template = readTemplate('wordpressEnqueueChunksPlugin.php');
        const processed = injectProps(template, Object.assign(Object.assign({}, this.opts), { manifest, prefix }));
        writeTemplate(processed, phpScriptDir, 'wordpressEnqueueChunksPlugin.php');
    }
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSxpREFBOEM7QUFDOUMsc0RBQXNEO0FBR3REO0lBQ0ksWUFBWSxJQUFhO1FBQ3JCLE1BQU0sUUFBUSxHQUFHO1lBQ2IsU0FBUyxFQUFFLE9BQU8sQ0FBQyxHQUFHLEVBQUU7WUFDeEIsT0FBTyxFQUFFLFFBQVE7WUFDakIsU0FBUyxFQUFFLEdBQUc7WUFDZCxTQUFTLEVBQUUsRUFBRTtZQUNiLFlBQVksRUFBRSxPQUFPLENBQUMsR0FBRyxFQUFFO1NBQzlCLENBQUM7UUFDRixJQUFJLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBSU0sS0FBSyxDQUFDLFFBQWtCO1FBQzNCLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FDbkIsOEJBQThCLEVBQzlCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUN6QixDQUFDO0lBQ04sQ0FBQztJQUVNLE1BQU0sQ0FBQyxFQUFFLFdBQVcsRUFBUztRQUNoQyxNQUFNLFFBQVEsR0FBRywyQkFBWSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzNDLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUVTLGFBQWEsQ0FBQyxRQUFrQjtRQUN0QyxNQUFNLEVBQUUsWUFBWSxFQUFFLGFBQWEsRUFBRSxXQUFXLEVBQUUsR0FBRyxpQkFBaUIsQ0FBQztRQUN2RSxNQUFNLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ3pELE1BQU0sTUFBTSxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxTQUFTLEdBQUcsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUMzRCxNQUFNLFFBQVEsR0FBRyxZQUFZLENBQUMsa0NBQWtDLENBQUMsQ0FBQztRQUNsRSxNQUFNLFNBQVMsR0FBRyxXQUFXLENBQUMsUUFBUSxrQ0FBTyxJQUFJLENBQUMsSUFBSSxLQUFFLFFBQVEsRUFBRSxNQUFNLElBQUcsQ0FBQztRQUM1RSxhQUFhLENBQUMsU0FBUyxFQUFFLFlBQVksRUFBRSxrQ0FBa0MsQ0FBQyxDQUFDO0lBQy9FLENBQUM7Q0FDSjtBQWxDRCw0QkFrQ0MifQ==