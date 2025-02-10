import Toast from 'react-native-toast-message';

export const successToast = (title, message) => {
    Toast.show({
      type: 'success',
      text1: title,
      text2: message
    });
}

export const errorToast = (title, message) => {
    Toast.show({
      type: 'error',
      text1: title,
      text2: message
    });
}