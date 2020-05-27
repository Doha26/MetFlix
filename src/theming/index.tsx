import React from 'react';
import {useSelector} from 'react-redux';

interface ThemingType {
  theme: any;
}
export function withTheme<P>(
  WrappedComponent: React.ComponentType<P & ThemingType>
) {
  const ComponentWithExtraInfo = (props: P) => {
    const { theme } = useSelector(({ uiReducer }) => uiReducer);
    return <WrappedComponent {...props} theme={theme} />;
  };
  return ComponentWithExtraInfo;
}

