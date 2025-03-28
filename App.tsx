import { SnackbarProvider } from "@src/contexts/SnackbarProvider";
import ReduxProvider from "@src/redux-store/ReduxProvider";
import RootNavigation from "@src/navigation";

const App = () => {

    return (
        <ReduxProvider>
            <SnackbarProvider>
                <RootNavigation />
            </SnackbarProvider>
        </ReduxProvider>
    );
}

export default App;