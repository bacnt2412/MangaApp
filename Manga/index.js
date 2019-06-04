import { Navigation } from 'react-native-navigation';
import { Screens, StartApplication } from './src/screens';
Screens.forEach((ScreenComponent,key) => {
console.log('############## ScreenComponent',ScreenComponent)
console.log('############## key',key)

    Navigation.registerComponent(key,()=> ScreenComponent);
})

Navigation.events().registerAppLaunchedListener(()=> {
    StartApplication();
});