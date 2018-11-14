import React from "react";
import { Route } from "react-router-dom";

import Chat from "./containers/Chat";
import Sidepanel from './containers/Sidepanel';

const BaseRouter = () => (
  <div>
    <Route exact path="/" component={Sidepanel} />
    <Route exact path="/chat/:chatID/" component={Chat} />
  </div>
);

export default BaseRouter;
