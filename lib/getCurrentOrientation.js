// @flow

import Orientation from 'react-native-orientation';

let _currentOrientation = Orientation.getInitialOrientation() || 'portrait';

export default function getCurrentOrientation(): string {
  return _currentOrientation;
}

export const parseOrientation = (orientation: string): string => {
  switch (orientation) {
    case 'LANDSCAPE':
    case 'LANDSCAPE-LEFT':
    case 'LANDSCAPE-RIGHT':
      return 'landscape';
    default:
      return 'portrait';
  }
};

const updateCurrentOrientation = (orientation: string): void => {
  _currentOrientation = parseOrientation(orientation);
};

Orientation.getOrientation((error, orientation) => {
  if (error) {
    // ERROR
  } else if (orientation) {
    updateCurrentOrientation(orientation);
  }
});

Orientation.addOrientationListener(updateCurrentOrientation);
