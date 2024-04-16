const dependencies = {
    "@react-native-firebase/storage": "^17.3.1",
    "@react-native-picker/picker": "^2.4.8",
    "@react-navigation/native": "^6.1.6",
    "@react-navigation/native-stack": "^6.9.12",
    "@rneui/themed": "^4.0.0-rc.7",
    "axios": "^1.6.2",
    "base-64": "^1.0.0",
    "expo": "~48.0.4",
    "expo-image-picker": "^14.1.1",
    "expo-status-bar": "~1.4.4",
    "firebase": "^9.17.1",
    "firebase-admin": "^11.11.0",
    "firebase-functions": "^4.5.0",
    "react": "18.2.0",
    "react-native": "0.71.3",
    "react-native-alert-input": "^2.0.1",
    "react-native-dialog": "^9.3.0",
    "react-native-dropdown-picker": "^5.4.4",
    "react-native-gesture-handler": "^2.9.0",
    "react-native-image-crop-picker": "^0.39.0",
    "react-native-image-picker": "^5.1.0",
    "react-native-item-select": "^0.4.2",
    "react-native-keyboard-aware-scroll-view": "^0.9.5",
    "react-native-searchable-dropdown": "^1.1.3",
    "react-native-super-grid": "^5.0.0"
  };
  
  // Filter keys based on your requirements, here I'm filtering keys starting with "react-native"
  const filteredKeys = Object.keys(dependencies).filter(key => key.startsWith("react-native"));
  
  // Generate the command
  const command = `npx expo install ${filteredKeys.join(" ")}`;
  
  console.log(command);