import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import 'font-awesome/css/font-awesome.min.css';
import './index.css'
import {DevSupport} from "@react-buddy/ide-toolbox";
import {ComponentPreviews, useInitial} from "./dev";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <DevSupport ComponentPreviews={ComponentPreviews}
                useInitialHook={useInitial}
    >
        <App/>
    </DevSupport>
)
