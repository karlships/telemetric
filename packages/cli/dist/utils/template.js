import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
export async function copyTemplate(framework) {
    const templateDir = path.join(path.dirname(fileURLToPath(import.meta.url)), '../../templates', framework);
    // Create providers directory
    const providersDir = path.join(process.cwd(), 'src', 'providers');
    await fs.mkdir(providersDir, { recursive: true });
    // Copy provider template
    const templateContent = await fs.readFile(path.join(templateDir, 'provider.tsx'), 'utf-8');
    await fs.writeFile(path.join(providersDir, 'TelemetricProvider.tsx'), templateContent);
}
