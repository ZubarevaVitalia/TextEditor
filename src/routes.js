import { Route, Switch, withRouter } from "react-router-dom";
//import App from "./App";
import EssayEditor from "./EssayEditor";
import View from "./ViewEssay";

const MainRouter = () => (
    <Switch>
        <Route exact path='/' Component={EssayEditor}/>
        <Route path='/view' Component={View}/>
    </Switch>
);

export default withRouter(MainRouter);