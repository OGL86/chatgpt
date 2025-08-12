import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuidv4 } from 'uuid';

export async function getDeviceId() {
  let deviceId = await AsyncStorage.getItem('deviceId');
  if (!deviceId) {
    deviceId = uuidv4();
    await AsyncStorage.setItem('deviceId', deviceId);
  }
  return deviceId;
}

export async function fetchWithDeviceId(url, options = {}) {
  const deviceId = await getDeviceId();
  const headers = { ...(options.headers || {}), 'X-Device-Id': deviceId };
  return fetch(url, { ...options, headers });
}
