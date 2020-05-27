// eslint-disable-next-line, @typescript-eslint/explicit-function-return-type
export default ({ getState }: any) => (next: any) => (action: any) =>  {
  console.group();
  console.log('before', getState());
  console.log('action', action);
  const rs = next(action);
  console.log('after', getState());
  console.groupEnd();
  return rs;
};
