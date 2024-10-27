import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { Provider as StyletronProvider } from 'styletron-react';
import { LightTheme, BaseProvider } from 'baseui';
import { Client as Styletron } from 'styletron-engine-monolithic';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

const engine = new Styletron();

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.tsx`,
            import.meta.glob('./Pages/**/*.tsx'),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <StyletronProvider value={engine}>
                <BaseProvider theme={LightTheme}>
                    <App {...props} />
                </BaseProvider>
            </StyletronProvider>
        );
    },
    progress: {
        color: '#4B5563',
    },
});
