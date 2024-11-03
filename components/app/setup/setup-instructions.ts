export const frameworks = [
  {
    label: "Flutter",
    value: "flutter",
    logo: "images/frameworks/flutter.png",
    },
  {
    label: "Next.js",
    value: "nextjs",
    logo: "images/frameworks/nextjs.png",
  },
  {
    label: "Webflow",
    value: "webflow",
    logo: "images/frameworks/webflow.png",
  },
  {
    label: "JavaScript",
    value: "vanilla",
    logo: "images/frameworks/javascript.png",
  },
  {
    label: "Framer",
    value: "framer",
    logo: "images/frameworks/framer.png",
  }
  // ... rest of frameworks array
];

type CodeSnippet = {
  code: string;
  language: string;
  description: string;
};


export const getInstallSnippet = (projectId: string, framework: string): CodeSnippet | undefined => {
  switch (framework) {
    case "flutter":
      return {
        code: "flutter pub add telemetric",
        language: "bash",
        description: "1. Install the Telemetric package:"
      };
    case "nextjs":
      return {
        code: `import Script from 'next/script'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <head>
        <Script
          src="https://telemetric.app/t.js"
          strategy="beforeInteractive"
        />
        <Script id="telemetric-init" strategy="beforeInteractive">
          {\`
            window.addEventListener('load', async function() {
              await Telemetric.init('${projectId}', '1.0.0', true);
            });
          \`}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  )
}`,

        language: "bash",
        description: "2. Add script to your app/layout.tsx file. Your projectId has been included in this code snippet."
      };
    case "webflow":
      return {
        code: `<script src="https://telemetric.app/t.js"></script>
<script>
window.addEventListener('load', async function() {
await Telemetric.init('${projectId}', '1.0.0', false);
});
</script>`,
        language: "javascript",
        description: "2. Add this code snippet to your Webflow site via custom code - only support for pro users. Your projectId has been included in this code snippet."
      };
    case "javascript":
      return {
        code: `<script src="https://telemetric.app/t.js"></script>
<script>
window.addEventListener('load', async function() {
await Telemetric.init('${projectId}', '1.0.0', false);
});
</script>`,
        language: "javascript",
        description: "2. Add this code snippet in your head tag. Your projectId has been included in this code snippet."
      };
    case "framer":
      return {
        code: `<script src="https://telemetric.app/t.js"></script>
<script>
window.addEventListener('load', async function() {
await Telemetric.init('${projectId}', '1.0.0', false);
});
</script>`,
        language: "javascript",
        description: "2. Add this code snippet to the custom code \"start of <head>\" section of your Framer project. Your projectId has been included in this code snippet."
      };
    default:
      return undefined;
  }
};

export const getCodeSnippet = (projectId: string, framework: string): CodeSnippet | undefined => {
  switch (framework) {
    case "flutter":
      return {
        code: `import 'package:telemetric/telemetric.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Telemetric.initialize('${projectId}', trackInDebug: true);
}`,
        language: "dart",
        description:
          "2. Initialize Telemetric in your main.dart - make sure to await it and call WidgetsFlutterBinding.ensureInitialized() first. \nNote: Your projectId has been included in this code snippet.",
      };
    case "nextjs":
      return {
        code: `// telemetric.d.ts
  declare const Telemetric: {
  init(projectId: string, version: string, trackOnLocalhost?: boolean): Promise<void>;
  event(name: string): Promise<void>;
  revenue(total: number): Promise<void>;
}`,
        language: "typescript",
        description: "3. If you are using Typescript add create this d.ts file: telemetric.d.ts, else skip this step."
      };

    case "javascript":
      return {
        code: "npm install telemetric",
        language: "bash",
        description: "1. Install the Telemetric package using npm:"
      };

    default:
      return undefined;
  }
};


export const getVerificationSteps = (framework: string) => {
  // Move existing getVerificationSteps logic here
};

export const getTrackingSnippet = (projectId: string, framework: string): CodeSnippet | undefined => {
  switch (framework) {
    case "flutter":
      return {
        code: `// Track events
Telemetric.event('button_clicked');

// Track revenue
Telemetric.revenue(9.99);`,
        language: "dart",
        description: "3. Start tracking events and revenue in your app:"
      };
    case "nextjs":
      return {
        code: `// Track events
Telemetric.event('button_clicked');

// Track revenue
Telemetric.revenue(9.99);`,
        language: "typescript",
        description: "4. Start tracking events and revenue in your Next.js app. Note that using this function in useEffect can cause issues because the script may not be loaded yet. Check the browser console for errors."
      };

    default:
      return undefined;
  }
};

export const getFinishSteps = (framework: string): string | undefined => {
  switch (framework) {
    case "flutter":
          return "That's it! Now hot restart your app, wait a few seconds and then reload the dashboard. If this setup screen is gone everything is working! You can now set trackInDebug to false if you want to.";
      case "webflow":
        return "That's it! Now publish your site, visit it, wait a few seconds and then reload the dashboard. If this setup screen is gone everything is working! You can now set trackOnLocalhost to false if you want to. (The last boolean paramater in the script tag)";
      case "nextjs":
        return "That's it! Now reload if on localhost or publish your site, wait a few seconds and then reload the dashboard. If this setup screen is gone everything is working!";
    case "framer":
          return "That's it! Now publish your Framer project, visit it, wait a few seconds and then reload the dashboard. If this setup screen is gone everything is working!";
      case "javascript":
        return "That's it! Now reload if on localhost or publish your site, wait a few seconds and then reload the dashboard. If this setup screen is gone everything is working! You can now set trackOnLocalhost to false if you want to.";
    // ... other cases can have custom messages if needed
    default:
      return "That's it! Now hot restart your app, wait a few seconds and then reload the dashboard. If this setup screen is gone everything is working! You can now set trackInDebug to false if you want to.";
  }
};