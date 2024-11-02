import fs from 'fs/promises';
import path from 'path';
export function validateFramework(framework) {
    return ['next', 'react'].includes(framework.toLowerCase());
}
export async function detectFramework() {
    try {
        const packageJson = JSON.parse(await fs.readFile(path.join(process.cwd(), 'package.json'), 'utf-8'));
        if (packageJson.dependencies?.next || packageJson.devDependencies?.next) {
            return 'next';
        }
        if (packageJson.dependencies?.react || packageJson.devDependencies?.react) {
            return 'react';
        }
        return null;
    }
    catch {
        return null;
    }
}
