import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import GetFile from './pages/GetFile';
import PostFile from './pages/PostFile';

export default function Routes(){
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={GetFile}></Route>
                <Route path="/post" component={PostFile}></Route>
            </Switch>
        </BrowserRouter>
    )
}