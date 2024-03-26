/** @jsxImportSource frog/jsx */
import { Button, Frog, TextInput } from 'frog'
import { handle } from 'frog/next'
import { devtools } from 'frog/dev'
import { serveStatic } from 'frog/serve-static'
import { Haikipu, hAIku, someVar } from "../middleware/openAi/royCall"
const app = new Frog({
    basePath: '/api',
})

const systemPrompt = "Write a haiku about a the subject"

const assistantPrompt = "fruit = good"

// Frame to capture user's favorite fruit.
app.frame('/', (c) => {
    return c.res({
        action: '/submit',
        image: (
            <div style={{ color: 'white', display: 'flex', fontSize: 60 }}>
                Write the subject of your haiku
            </div>
        ),
        intents: [
            <TextInput placeholder="Enter a subject" />,
            <Button >Send</Button>
        ]
    })
})

// Frame to display user's response.
app.frame('/submit', async (c) => {
    const { frameData, buttonValue, status, inputText } = c;
    const haikipu: Haikipu = {
        title: inputText || '',
        id: frameData?.messageHash.toString() || '',
        address: frameData?.address || '',
        timestamp: Date.now().toString(),
        type: "frame",
        contextSummary: "You write haikus and weave them coherently",
        haiku: "",
        explainer: "",
    };
    const userPrompt = `Subject: ${inputText}`
    const result = await hAIku(haikipu, systemPrompt, assistantPrompt, userPrompt)

    let text = result.haiku
    return c.res({
        action: '/',
        image: (
            <div style={{ color: 'white', display: 'flex', fontSize: 60 }}>
                Haiku: {text}
            </div>
        ),
        intents: [
            <Button >Back</Button>
        ]
    })
})

devtools(app, { serveStatic });

export const GET = handle(app);
export const POST = handle(app);
