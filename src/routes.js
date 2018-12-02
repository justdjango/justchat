import React from "react";
import { Route } from "react-router-dom";
import Hoc from "./hoc/hoc";

import Chat from "./containers/Chat";

const BaseRouter = () => (
  <Hoc>
    <Route exact path="/:chatID/" component={Chat} />
  </Hoc>
);

export default BaseRouter;
