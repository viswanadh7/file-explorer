import { PermissionsAndroid, Platform } from "react-native";

export const requestStoragePermission = async () => {
  if (Platform.OS === "android") {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: "Storage Permission",
          message: "App needs access to your storage to list PDF files",
          buttonPositive: "OK",
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (error) {
      console.log("Something went wrong when requesting permission", error);
      return false;
    }
  }
  return true;
};
