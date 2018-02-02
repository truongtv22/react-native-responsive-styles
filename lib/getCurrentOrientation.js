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

Orientation.getOrientation((orientation) => {
  // workaround for API inconsistency
  // https://github.com/walmartlabs/react-native-orientation-listener/issues/10
  if (typeof orientation === 'object' && 'orientation' in orientation) {
    updateCurrentOrientation(orientation.orientation);
  } else {
    updateCurrentOrientation(orientation);
  }
});

Orientation.addOrientationListener(updateCurrentOrientation);
