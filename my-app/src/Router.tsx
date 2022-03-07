import { BrowserRouter, Switch, Route } from "react-router-dom";

function Router() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route path="/:coinId"></Route>
        <Route path="/"></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
