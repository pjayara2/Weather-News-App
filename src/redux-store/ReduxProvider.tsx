// React Imports
import type { ReactNode } from 'react';

// Third-party Imports
import { Provider } from 'react-redux';
import { PersistGate } from "redux-persist/es/integration/react";
import { persistStore } from "redux-persist";

// Store Import
import { store } from ".";

const ReduxProvider = ({ children }: { children: ReactNode }) => {

    const persistor = persistStore(store);

    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                {children}
            </PersistGate>
        </Provider>
    );
}

export default ReduxProvider;