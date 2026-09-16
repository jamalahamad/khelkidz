import {ViewStyle} from 'react-native';

export const shadows = {
  soft: {
    shadowColor: '#24304A',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 4,
  } satisfies ViewStyle,
  lifted: {
    shadowColor: '#24304A',
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.16,
    shadowRadius: 18,
    elevation: 7,
  } satisfies ViewStyle,
};
