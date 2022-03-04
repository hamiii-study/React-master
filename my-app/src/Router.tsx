import { BrowserRouter, Switch, Route } from "react-router-dom";
import Coin from "./routers/Coin";
import Coins from "./routers/Coins";

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/:coinId">
          <Coin />
        </Route>
        <Route path="/">
          <Coins />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
