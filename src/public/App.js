import { NextUIProvider } from '@nextui-org/react';
import { MainMenu, TopMenu } from './pages/Navigation';

import Home from './pages/Home';

const App = () => {
    return (
        <NextUIProvider>
            <TopMenu />
            <MainMenu />

            <Home />

        </NextUIProvider>
    )
}

export default App