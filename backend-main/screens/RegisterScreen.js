import { register } from "../utils/api";

const handleRegister = async () => {
  if (!firstName || !lastName || !email || !password) {
    Alert.alert("Error", "Please fill in all fields");
    return;
  }

  try {
    const data = await register(firstName, lastName, email, password);
    if (data.token) {
      // Store token securely
      await AsyncStorage.setItem("userToken", data.token);
      navigation.replace("Home");
    } else {
      Alert.alert("Error", data.message || "Registration failed");
    }
  } catch (error) {
    Alert.alert("Error", "An error occurred during registration");
  }
}; 