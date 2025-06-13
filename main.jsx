import {createRoot} from "react-dom/client";
import {AIApp} from "./OpenAIAPI/AIApp.jsx";


const root = createRoot(document.getElementById('root'))
root.render(
    <>
        <AIApp/>
    </>
)
