import {createRoot} from "react-dom/client";
// import {MusicPads} from './MusicPads/Pads.jsx'
// import {Jokes} from "./index.jsx";
// import {HeaderApp} from "./TravelJournal/header.jsx";
// import {ChefClaude} from "./ChefClaude/Header.jsx";
// import {Counter} from "./Counter/Counter.jsx";
// import {App} from './MemGenerator/App.jsx'
import {AIApp} from "./OpenAIAPI/AIApp.jsx";


const root = createRoot(document.getElementById('root'))
root.render(
    <>
        <AIApp/>
        {/*<App/>*/}
        {/*<Counter/>*/}
        {/*<Jokes/>*/}
        {/*<HeaderApp/>*/}
        {/*<Validation/>*/}
        {/*<MusicPads />*/}
        {/*<Ijoistro/>*/}
        {/*<ChefClaude/>*/}
        {/*<HeaderApp/>*/}
        {/*<App/>*/}
        {/*<Challenge/>*/}
        {/*{<NinjaTurtle/>}*/}
    </>
)