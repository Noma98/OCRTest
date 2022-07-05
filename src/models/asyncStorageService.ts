import AsyncStorage from '@react-native-async-storage/async-storage';

import { ISignInResponse } from '@/types/api/user';

class AsyncStorageService {
  static getService() {
    return new AsyncStorageService();
  }

  async getStorageTokenInfo(): Promise<ISignInResponse | null> {
    const existedTokenInfo = await AsyncStorage.getItem('@userInfo');

    return existedTokenInfo ? JSON.parse(existedTokenInfo) : null;
  }

  async setStorageTokenInfo(data: ISignInResponse) {
    await AsyncStorage.setItem('@userInfo', JSON.stringify(data));
  }
}

export default AsyncStorageService;
