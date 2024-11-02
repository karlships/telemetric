import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

// Add .js extensions to all local imports

export async function setup(framework: string) {
    try {
        // Validate framework
        if (!["next", "react"].includes(framework)) {
            console.error(
                'Unsupported framework. Please use "next" or "react"',
            );
            process.exit(1);
        }

        // Create providers directory
        const providersDir = path.join(process.cwd(), "src", "providers");
        await fs.mkdir(providersDir, { recursive: true });

        // Copy both the provider and telemetric core files
        const templateDir = path.join(
            path.dirname(fileURLToPath(import.meta.url)),
            "../../templates",
            framework,
        );

        // Copy provider
        const providerContent = await fs.readFile(
            path.join(templateDir, "provider.tsx"),
            "utf-8",
        );
        await fs.writeFile(
            path.join(providersDir, "TelemetricProvider.tsx"),
            providerContent,
        );

        // Copy telemetric core
        const telemetricContent = await fs.readFile(
            path.join(__dirname, "../core/telemetric.ts"),
            "utf-8",
        );
        await fs.writeFile(
            path.join(providersDir, "telemetric.ts"),
            telemetricContent,
        );

        console.log("✅ Telemetric has been added to your project!");
        console.log("\nNext steps:");
        console.log("1. Import the TelemetricProvider in your root app file:");
        console.log(`
import { TelemetricProvider } from './providers/TelemetricProvider';

2. Wrap your app with the provider:
<TelemetricProvider
  projectId="your-project-id"
  version="1.0.0"
  trackOnLocalhost={false}
>
  {/* Your app content */}
</TelemetricProvider>
    `);
    } catch (error) {
        console.error("Failed to setup Telemetric:", error);
        process.exit(1);
    }
}
