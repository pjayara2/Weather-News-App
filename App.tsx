import RootNavigation from "./src/navigation";
import ReduxProvider from "./src/redux-store/ReduxProvider";

const App = () => {

    return (
        <ReduxProvider>
            <RootNavigation />
        </ReduxProvider>
    );
}

export default App;