import { login, register } from "../utils/api";

const handleLogin = async () => {
  if (!email || !password) {
    Alert.alert("Error", "Please fill in all fields");
    return;
  }

  try {
    const data = await login(email, password);
    if (data.token) {
      // Store token securely
      await AsyncStorage.setItem("userToken", data.token);
      navigation.replace("Home");
    } else {
      Alert.alert("Error", data.message || "Login failed");
    }
  } catch (error) {
    Alert.alert("Error", "An error occurred during login");
  }
};

const testRegistration = async () => {
  try {
    const result = await register("Test", "User", "test@example.com", "password123");
    console.log("Registration result:", result);
    if (result.token) {
      Alert.alert("Success", "Test user registered successfully!");
    } else {
      Alert.alert("Error", result.message || "Registration failed");
    }
  } catch (error) {
    console.error("Registration error:", error);
    Alert.alert("Error", "Failed to register test user");
  }
}; 