import "@rainbow-me/rainbowkit/styles.css";
import { Metadata } from "next";
import { ScaffoldEthAppWithProviders } from "~~/components/ScaffoldEthAppWithProviders";
import { ThemeProvider } from "~~/components/ThemeProvider";
import "~~/styles/globals.css";
import { getFrameMetadata } from 'frog/next'

const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : `http://localhost:${process.env.PORT || 3000}`;
const imageUrl = `${baseUrl}/thumbnail.jpg`;

export async function generateMetadata(): Promise<Metadata> {
    const url = process.env.VERCEL_URL || 'http://localhost:3000'
    const frameMetadata = await getFrameMetadata(`${url}/api`)
    return {
        other: frameMetadata,
    }
}

const ScaffoldEthApp = ({ children }: { children: React.ReactNode }) => {
    return (
        <html suppressHydrationWarning>
            <body>
                <ThemeProvider enableSystem>
                    <ScaffoldEthAppWithProviders>{children}</ScaffoldEthAppWithProviders>
                </ThemeProvider>
            </body>
        </html>
    );
};

export default ScaffoldEthApp;
