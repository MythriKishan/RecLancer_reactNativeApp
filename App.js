import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import AppLoading from 'expo-app-loading';
import { PaperProvider } from 'react-native-paper';
import * as Font from 'expo-font';
import { useFonts } from 'expo-font';
import dropdown from './screens/Freelancer/dropdown';
import 'react-native-gesture-handler';


import combinedreducer from './screens/combinedreducer';

//import { configureStore } from '@reduxjs/toolkit'
import { legacy_createStore as createStore, combineReducers,applyMiddleware } from 'redux';

import { Provider } from 'react-redux'
const store = createStore(combinedreducer);


import Home from './screens/Home';
import FreeLogin from './screens/FreeLogin';
import FreeReg from './screens/FreeReg';
import RecLogin from './screens/RecLogin';
import RecReg from './screens/RecReg';
import FreePostAd from './screens/Freelancer/FreePostAd';
import FreeHome from './screens/Freelancer/FreeHome';
import RecSearch from './screens/Freelancer/RecSearch';
import RecHome from './screens/Recruiter/RecHome';
import RecPostAd from './screens/Recruiter/RecPostAd';
import RPostad from './screens/Recruiter/RPostad';
import FreeSearch from './screens/Recruiter/FreeSearch';
import RecResults from './screens/Freelancer/RecResults';
import Success from './screens/Freelancer/Success';
import MainScreen from './screens/Freelancer/MainScreen';
import RecDetails from './screens/Freelancer/RecDetails';
import ManageAds from './screens/Freelancer/ManageAds';
import FStatusAd from './screens/Freelancer/FStatusAd';
import Fedit_ad from './screens/Freelancer/Fedit_ad';
import FreeResults from './screens/Recruiter/FreeResults';
import FreeDetails from './screens/Recruiter/FreeDetails';
import SuccessPage from './screens/Recruiter/SuccessPage';
import RStatusAd from './screens/Recruiter/RStatusAd';
import Redit_ad from './screens/Recruiter/Redit_ad';
import DashBoard from './screens/Recruiter/DashBoard';
import Details from './screens/Freelancer/Details';
import FLogout from './screens/Freelancer/FLogout';
import RLogout from './screens/Recruiter/RLogout';
import UploadImages from './screens/Freelancer/UploadImages';
import FUploadImages from './screens/Freelancer/FUploadImages';
import EditImage from './screens/Freelancer/EditImage';
import FreeMLogin from './screens/FreeMLogin';
import RDetails from './screens/Freelancer/RDetails';
import FDetails from './screens/Recruiter/FDetails';
import REditImages from './screens/Recruiter/REditImages';
import FreePost from './screens/Freelancer/FreePost';
import Fuploads from './screens/Freelancer/Fuploads';
import RecAd from './screens/Freelancer/RecAd';
import ImageZoom from './screens/Freelancer/ImageZoom';
import Faccount from './screens/Freelancer/Faccount';
import Hide from './screens/Freelancer/Hide';
import Fdelete from './screens/Freelancer/Fdelete';
import Raccount from './screens/Recruiter/Raccount';
import RHide from './screens/Recruiter/RHide';
import Rdelete from './screens/Recruiter/Rdelete';
import RUploads from './screens/Recruiter/RUploads';
import RecMLogin from './screens/RecMLogin';
import Fpostscreen1 from './screens/Freelancer/Fpostscreen1';
import Fpostscreen2 from './screens/Freelancer/Fpostscreen2';


const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Drawar =  createDrawerNavigator();

function DrawerNavigate(){
  return (
    <Drawar.Navigator    
    screenOptions={{       
      headerStyle: { backgroundColor: '#413C69' },
      headerTintColor: 'white',     
      sceneContainerStyle: { backgroundColor: '#C5DFF8F' },
      drawerContentStyle: { backgroundColor: '#413C69' },       
      drawerInactiveTintColor: 'white',
      drawerActiveTintColor: '#351401',
      drawerActiveBackgroundColor: '#E0F4FF',
    }}
  >
       <Drawar.Screen 
        name="Recruiter Home"
        component={RecHome}
        options={{
          title: 'Recruiter Home',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="list" color={color} size={size} />
          ),
        }}
       />

<Drawar.Screen 
        name="Recruiter Post Ad"
        component={RecPostAd}
        options={{
          title: 'Recruiter Post Ad',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="list" color={color} size={size} />
          ),
        }}
       />

<Drawer.Screen
        name="Uploads"
        component={RUploads}
        options={{
          title: 'Upload Images',
          drawerItemStyle: { display: 'none' },
          drawerIcon: ({ color, size }) => (
            <Ionicons name="list" color={color} size={size} />
          ),
        }}
      />

<Drawar.Screen 
        name="Success"
        component={SuccessPage}
        options={{
          title: 'Success',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="list" color={color} size={size} />
          ),
          drawerItemStyle: { display: 'none' }
        }}
       />

<Drawar.Screen 
        name="Freelancer Search"
        component={FreeSearch}
        options={{
          title: 'Freelancer Search',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="list" color={color} size={size} />
          ),
        }}
       />

<Drawar.Screen 
        name="Manage Ads"
        component={DashBoard}
        options={{
          title: 'Manage Ads',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="list" color={color} size={size} />
          ),
        }}
       />

<Drawar.Screen 
        name="Account"
        component={Raccount}
        options={{
          title: 'Account',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="list" color={color} size={size} />
          ),
        }}
       />

<Drawar.Screen
        name="Recruiter Hide Profile"        
        component={RHide}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="list" color={color} size={size} />
          ),          
          drawerItemStyle: { display: 'none' }
  
        }}
      />

<Drawar.Screen
        name="Recruiter Delete Account"        
        component={Rdelete}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="list" color={color} size={size} />
          ),          
          drawerItemStyle: { display: 'none' }
  
        }}
      />

<Drawar.Screen
        name="Recruiter Logout"        
        component={RLogout}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="list" color={color} size={size} />
          ),          
         
        }}
      />

     
    </Drawar.Navigator>
  );

}

function DrawerNavigator() {
  return (
    <Drawer.Navigator
    screenOptions={{       
      headerStyle: { backgroundColor: '#413C69' },
      headerTintColor: 'white',     
      sceneContainerStyle: { backgroundColor: '#C5DFF8F' },
      drawerContentStyle: { backgroundColor: '#413C69' },       
      drawerInactiveTintColor: 'white',
      drawerActiveTintColor: '#351401',
      drawerActiveBackgroundColor: '#E0F4FF',
    }}
    >

       <Drawer.Screen
        name="Freelancer Home"
        component={FreeHome}
        options={{
          title: 'Freelancer Home',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="list" color={color} size={size} />
          ),
        }}
       />
     
      <Drawer.Screen
        name="Freelancer PostAd"
        component={FreePost}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="list" color={color} size={size} />
          ),
        }}
      />

   {/*<Drawer.Screen
        name="Freelancer PostAd"
        component={Fpostscreen1}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="list" color={color} size={size} />
          ),
        }}
      />*/}

      {/*<Drawer.Screen
        name="Freelancer PostAd Screen 2"
        component={Fpostscreen2}       
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="list" color={color} size={size} />
          ),
          drawerItemStyle: { display: 'none' },
        }}
      />*/}



<Drawer.Screen
        name="Uploads"
        component={Fuploads}
        options={{
          title: 'Upload Images',
          drawerItemStyle: { display: 'none' },
          drawerIcon: ({ color, size }) => (
            <Ionicons name="list" color={color} size={size} />
          ),
        }}
      />
      

      <Drawer.Screen
        name="Recruiter Search"
        component={RecSearch}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="list" color={color} size={size} />
          ),
        }}
      />

    {/*<Drawer.Screen
        name="Recruiter Result"        
        component={RecResults}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="list" color={color} size={size} />
          ),          
          drawerItemStyle: { display: 'none' }
  
        }}
      />*/}

    <Drawer.Screen
        name="Manage Ads"        
        component={ManageAds}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="list" color={color} size={size} />
          ), 
          
        
        }}
      />


<Drawer.Screen
        name="Success Page"        
        component={Success}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="list" color={color} size={size} />
          ),          
          drawerItemStyle: { display: 'none' }
  
        }}
      />

    <Drawer.Screen
        name="Account"        
        component={Faccount}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="list" color={color} size={size} />
          ),          
       
        }}
      />


{/*<Drawer.Screen
        name="Hide Profile"        
        component={Hide}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="list" color={color} size={size} />
          ),          
          drawerItemStyle: { display: 'none' }
  
        }}
      />*/}

{/*<Drawer.Screen
        name="Delete Account"        
        component={Fdelete}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="list" color={color} size={size} />
          ),          
          drawerItemStyle: { display: 'none' }
  
        }}
      />*/}
      

      {/*<Drawer.Screen
        name="Rec Ad Details"        
        component={RecDetails}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="list" color={color} size={size} />
          ),          
          drawerItemStyle: { display: 'none' }
  
        }}
      />*/}


     {/* <Drawer.Screen
        name="Freelancer Ad Status"        
        component={FStatusAd}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="list" color={color} size={size} />
          ),          
          drawerItemStyle: { display: 'none' }
  
        }}
      />

      <Drawer.Screen
        name="Freelancer Edit Ad"        
        component={Fedit_ad}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="list" color={color} size={size} />
          ),          
          drawerItemStyle: { display: 'none' }
  
        }}
      />*/}

      <Drawer.Screen
        name="Freelancer Logout"        
        component={FLogout}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="list" color={color} size={size} />
          ),          
         
        }}
      />



    </Drawer.Navigator>
  );
}



export default function App() {
  let [fontsLoaded] = useFonts({
    'OpenSans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'OpenSans-bold':require('./assets/fonts/OpenSans-Bold.ttf')
});

if (!fontsLoaded) {
    return <AppLoading />;
}
else{
  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>
      <PaperProvider>
       <Provider store={store}>
       <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: '#413C69' },            
            headerTintColor: 'white',         
            contentStyle:{backgroundColor:'#C5DFF8F'}
           
          }}
        >
          <Stack.Screen name="Home" component={Home} /> 
          <Stack.Screen name="Freelancer Login" component={FreeLogin} /> 
          <Stack.Screen name="Freelancer Register" component={FreeReg}/>          
          <Stack.Screen name="Recruiter Login" component={RecLogin} /> 
          <Stack.Screen name="Recruiter Register" component={RecReg}/>
          <Stack.Screen name="Freelancer Mobile Login" component={FreeMLogin}/>
          <Stack.Screen name="Recruiter Mobile Login" component={RecMLogin}/>
         
          <Stack.Screen
            name="Drawer"
            component={DrawerNavigator}
            options={{
              headerShown: false,
            }}  
 
          />


          <Stack.Screen
          name="Drawar"
          component={DrawerNavigate}
          options={{
            headerShown: false,
          }}  
          />

    <Stack.Screen name="Freelancer PostAd Screen 2" component={Fpostscreen2}/>
    <Stack.Screen name="Freelancer Result" component={FreeResults} />
    <Stack.Screen name="Freelancer Details" component={FDetails} />
    <Stack.Screen name="Recruiter Edit Ad" component={Redit_ad} />
    <Stack.Screen name="Recruiter Ad Status" component={RStatusAd} />
    <Stack.Screen name="Recruiter Result" component={RecResults} />
    <Stack.Screen name="Rec Ad Details" component={RecAd} />
    <Stack.Screen name="Freelancer Edit Ad" component={Fedit_ad} />
    <Stack.Screen name="Freelancer Ad Status" component={FStatusAd} />
    <Stack.Screen name="Freelancer Edit Image" component={EditImage} />
    <Stack.Screen name="Recruiter Edit Image" component={REditImages} />
    <Stack.Screen name="ImageZoom" component={(ImageZoom)}/>
    <Stack.Screen name="Hide Profile" component={Hide} />
    <Stack.Screen name="Delete Account" component={Fdelete}/>
    

        </Stack.Navigator>
        </Provider>
        </PaperProvider>
      </NavigationContainer>
    </>
  );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
