/** @jsxImportSource frog/jsx */
import { Button, Frog, TextInput } from 'frog'
import { handle } from 'frog/next'
import { devtools } from 'frog/dev'
import { serveStatic } from 'frog/serve-static'
import { someVar } from "../middleware/openAi/royCall"
const app = new Frog({
    basePath: '/api',
})




app.frame('/', someVar, async (c) => {
    const { buttonValue, status } = c;

    return c.res({
        image: (
            <div style={{ color: 'white', display: 'flex', fontSize: 60 }}>
                {status === 'initial' ? (
                    'Select your fruit or enter a haiku!'
                ) : (
                    `Selected: ${buttonValue}`
                )}
                <span>{c.var.text}</span>
            </div>
        ),
        intents: [
            <Button value="apple">Apple</Button>,
            <Button value="banana">Banana</Button>,
            <Button value="mango">Mango</Button>
        ]
    });
});

devtools(app, { serveStatic });

export const GET = handle(app);
export const POST = handle(app);
