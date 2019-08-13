import { configure } from '@storybook/react';

import { configureViewport, INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

configureViewport({
    ...INITIAL_VIEWPORTS,
    defaultViewport: "responsive",
});

// automatically import all files ending in *.stories.js
const req = require.context('../stories', true, /.stories.tsx?$/);
function loadStories() {
    req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
