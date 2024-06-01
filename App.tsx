import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

import Record from "./src/screens/Record";
import Calendar from "./src/screens/calendar";

const Tab = createBottomTabNavigator();

const App:React.FC = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Voice to Text" component={Record} />
        <Tab.Screen name="Calendar" component={Calendar} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;