# react hooks + mobx6(多个 store) 结合使用

- 架构: Umi + React Hooks + Mobx6 + TypeScript
- 简述:
  1. 创建 mobx stores
  2. 通过 context 对象将 stores 传递给所有组件
  3. 任意组件可通过 useContext 读取 stores

## 1. 创建 store

```ts
// src/stores/CountStore.ts
import { makeAutoObservable } from 'mobx';

type CountType = number | undefined;

export default class CountStore {
  count: CountType = undefined;
  constructor() {
    makeAutoObservable(this);
  }
  setCount(value: CountType) {
    this.count = value;
  }
}
```

```ts
// src/stores/UserStore.ts
import { makeAutoObservable } from 'mobx';

type UserType =
  | {
      name: string;
      id: number;
    }
  | undefined;

export default class UserStore {
  user: UserType = undefined;
  constructor() {
    makeAutoObservable(this);
  }
  setUserInfo(value: UserType) {
    this.user = value;
  }
}
```

## 2. 创建 context 对象(value 值为所有 store 的实例)

```ts
// src/stores/index.ts
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
```

## 3. 通过根组件将 context 对象传递给所有组件

```ts
// src/app.tsx
import React from 'react';
import { stores, StoreContext } from './stores';

export function rootContainer(container: Element) {
  // 通过根组件将 context 对象传递给所有组件
  return React.createElement(StoreContext.Provider, { value: stores }, container);
}
```

## 4. 任意组件读取 store

```tsx
// src/pages/index.tsx
import { useRootStore } from '@/stores';
import { observer } from 'mobx-react';
import React from 'react';

const Index = () => {
  // 通过自定义 hook 读取 stores
  const { countStore } = useRootStore();

  return (
    <div>
      {/* 使用 countStore */}
      <button onClick={() => countStore.setCount(Date.now())}>count:{countStore?.count}</button>
    </div>
  );
};

export default observer(Index);
```
