import fs from 'fs';
import path from 'path';

const srcDir = './src';

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else {
            if (file.endsWith('.jsx') || file.endsWith('.js')) {
                results.push(file);
            }
        }
    });
    return results;
}

const files = walk(srcDir);
let hasError = false;

files.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    const importRegex = /import\s+.*?from\s+['"]([^'"]+)['"]/g;
    let match;
    while ((match = importRegex.exec(content)) !== null) {
        const importPath = match[1];
        if (importPath.startsWith('.')) {
            const absoluteImportDir = path.dirname(file);
            const targetPath = path.resolve(absoluteImportDir, importPath);
            
            // Check if exact file exists, considering extensions (.js, .jsx, .css, etc)
            const dir = path.dirname(targetPath);
            const base = path.basename(targetPath);
            
            if (fs.existsSync(dir)) {
                const filesInDir = fs.readdirSync(dir);
                // Need to match base exactly. Sometimes importPath omits extension.
                const matched = filesInDir.find(f => {
                    return f === base || f.startsWith(base + '.');
                });
                if (!matched) {
                    console.error(`Case mismatch or missing in ${file}: ${importPath} (Looking for ${base} in ${dir})`);
                    hasError = true;
                }
            } else {
                console.error(`Directory missing for import in ${file}: ${importPath}`);
                hasError = true;
            }
        }
    }
});

if (!hasError) {
    console.log("No case mismatches found.");
}
