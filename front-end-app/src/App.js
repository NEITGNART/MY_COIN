import './App.scss';
import {
  Switch,
  Route
} from "react-router-dom";

import { Navbar } from '../src/containers/navbar/navbar';
import { Footer } from '../src/containers/footer/footer';
import { Home } from '../src/containers/page/home/home';
import { CreateWallet } from '../src/containers/page/createWallet/createWallet';
import {AccessWallet} from '../src/containers/page/accessWallet/accessWallet';
import {Interface} from '../src/containers/page/interface/interface';
  
import {AuthProvider} from '../src/contexts/authContext';

function App() {
  return (
    <div className="App">
            <AuthProvider>
        <Navbar></Navbar>
        <div className='App__content'>
          <Switch>
            <Route exact path='/'>
              <Home></Home>
            </Route>
            <Route path='/create-wallet'>
              <CreateWallet></CreateWallet>
            </Route>
              <Route path='/access-wallet'>
                <AccessWallet></AccessWallet>
              </Route>
              <Route path='/interface'>
                <Interface></Interface>
              </Route>
            
          </Switch>
        </div>
            </AuthProvider>
        <Footer></Footer>
      </div>
  );
}

export default App;
