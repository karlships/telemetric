import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "Telemetric",
        short_name: "Telemetric",
        description:
            "Privacy-focused analytics platform for your apps, websites and web apps. Open source and built with You.",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        icons: [
            {
                src: "/icons/manifest-icon-72.png",
                sizes: "72x72",
                type: "image/png",
            },
            {
                src: "/icons/manifest-icon-96.png",
                sizes: "96x96",
                type: "image/png",
            },
            {
                src: "/icons/manifest-icon-128.png",
                sizes: "128x128",
                type: "image/png",
            },
            {
                src: "/icons/manifest-icon-144.png",
                sizes: "144x144",
                type: "image/png",
            },
            {
                src: "/icons/manifest-icon-152.png",
                sizes: "152x152",
                type: "image/png",
            },
            {
                src: "/icons/manifest-icon-192.png",
                sizes: "192x192",
                type: "image/png",
            },
            {
                src: "/icons/manifest-icon-384.png",
                sizes: "384x384",
                type: "image/png",
            },
            {
                src: "/icons/manifest-icon-512.png",
                sizes: "512x512",
                type: "image/png",
            },
            {
                src: "/icons/manifest-icon-192.maskable.png",
                sizes: "192x192",
                type: "image/png",
                purpose: "maskable",
            },
            {
                src: "/icons/manifest-icon-512.maskable.png",
                sizes: "512x512",
                type: "image/png",
                purpose: "maskable",
            },
        ],
    };
}
