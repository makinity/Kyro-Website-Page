import { createInertiaApp } from '@inertiajs/react';
import createServer from '@inertiajs/react/server';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import ReactDOMServer from 'react-dom/server';
import { route } from '../../vendor/tightenco/ziggy';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createServer((page) =>
    createInertiaApp({
        page,
        render: ReactDOMServer.renderToString,
        title: (title) => `${title} - ${appName}`,
        resolve: (name) =>
            resolvePageComponent(
                `./Pages/${name}.tsx`,
                import.meta.glob('./Pages/**/*.tsx'),
            ),
        setup: ({ App, props }) => {
            // Expose route() globally for SSR.
            // Cast through `any` to avoid the generic lvalue syntax
            // `global.route<RouteName> = ...` that Rolldown (Vite 8) cannot parse.
            (global as any).route = (name: string, params?: unknown, absolute?: boolean) =>
                route(name, params as any, absolute, {
                    ...(page.props as any).ziggy,
                    location: new URL((page.props as any).ziggy.location),
                });

            return <App {...props} />;
        },
    }),
);
