"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.injectProps = exports.writeTemplate = exports.readTemplate = void 0;
const fs = require("fs");
const path = require("path");
function readTemplate(file) {
    const filepath = path.resolve(__dirname, `../templates/${file}`);
    return fs.readFileSync(filepath, 'utf8');
}
exports.readTemplate = readTemplate;
function writeTemplate(template, dir, file) {
    const outputPath = path.join(dir, file);
    fs.writeFileSync(outputPath, template, 'utf8');
}
exports.writeTemplate = writeTemplate;
function injectProps(template, props) {
    return template.replace('{% props %}', JSON.stringify(props));
}
exports.injectProps = injectProps;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVtcGxhdGUtdXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdGVtcGxhdGUtdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEseUJBQXlCO0FBQ3pCLDZCQUE2QjtBQUU3QixTQUFnQixZQUFZLENBQUMsSUFBWTtJQUNyQyxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxnQkFBZ0IsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUNqRSxPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQzdDLENBQUM7QUFIRCxvQ0FHQztBQUVELFNBQWdCLGFBQWEsQ0FBQyxRQUFnQixFQUFFLEdBQVcsRUFBRSxJQUFZO0lBQ3JFLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3hDLEVBQUUsQ0FBQyxhQUFhLENBQUMsVUFBVSxFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQztBQUNuRCxDQUFDO0FBSEQsc0NBR0M7QUFFRCxTQUFnQixXQUFXLENBQUMsUUFBZ0IsRUFBRSxLQUFhO0lBQ3ZELE9BQU8sUUFBUSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0FBQ2xFLENBQUM7QUFGRCxrQ0FFQyJ9