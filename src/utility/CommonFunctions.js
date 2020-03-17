import React from 'react';
import AsyncStorage from '@react-native-community/async-storage'

/** @author Money Jain
 * @param  key - name of the data to be stored in the async store
 * @param  value - value of the data to be stored in the async store
 * @description stores the data in the async storage in form of key-value pairs
 */
export const setItemInAsyncStore = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
      // alert(key+"   "+value)
    }
    catch (error) {
      console.log(error);
    }
  };
  
  /** @author Money Jain
   * @param  key - name of the data to be fetched from the async store
   * @description fetches the data from the async storage in form of key-value pairs
   */
  export const getItemFromAsyncStore = async key => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        return value;
      }
    }
    catch (error) {
      console.log(error);
    }
  };