import { Provider } from "react-redux";
import Toast from 'react-native-toast-message';

import store from "./redux/store";
import Navigation from "./navigation/MainStackNav";


const Routes = () => {
  return <Provider store={store}>
      <Navigation />
      <Toast />
    </Provider>
};

export default Routes;
