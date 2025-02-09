import AsyncStorage from "@react-native-async-storage/async-storage";
import { WebView } from "react-native-webview";

class Storage {
  constructor(private key: string) {
    this.key = key;
  }

  async get() {
    const value = await AsyncStorage.getItem(this.key);
    return value ? JSON.parse(value) : null;
  }

  async set<T>(value: T) {
    await AsyncStorage.setItem(this.key, JSON.stringify(value));
  }

  async remove() {
    await AsyncStorage.removeItem(this.key);
  }
}

export default Storage;

export const postMessage = (
  message: string,
  webViewRef: React.RefObject<WebView>
) => {
  webViewRef.current?.injectJavaScript(`
    window.postMessage('${message}');
  `);
};
