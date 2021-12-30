import { createContext, useContext } from 'react';
import CountStore from './CountStore';
import UserStore from './UserStore';

// 汇总store
export const stores = {
  userStore: new UserStore(),
  countStore: new CountStore(),
};

// 创建 context 对象: 值为 mobx 的 stores
export const StoreContext = createContext(stores);

// 自定义 hook(方便复用): 获取 context对象的 value 值
export const useRootStore = () => {
  return useContext(StoreContext);
};
