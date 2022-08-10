import { createContext, useContext } from 'react';
import CountStore from './CountStore';
import UserStore from './UserStore';

// 汇总store
export const stores = {
  userStore: new UserStore(),
  countStore: new CountStore(),
};

// 创建 React.Context
export const StoreContext = createContext(stores);

// 自定义 hook: 方便获取 React Context 的 value
export const useRootStore = () => {
  return useContext(StoreContext);
};
