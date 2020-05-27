
// First we need to add a type to let us extend the incoming component.
import {useSelector} from 'react-redux';

type ThemingType = {
  theme: any;
};
export function withTheme<P>(WrappedComponent: React.ComponentType<P & ThemingType>) {
  const  theme  = useSelector(({ uiReducer }) => uiReducer);

  const ComponentwithTheme = (props: P) => {
    return <WrappedComponent {...props} theme={theme} />;
  };
  return ComponentwithTheme;
}

