# React Hooks + Mobx6 最佳实践

> 自从用了 Mobx 再也回不去了! 从 Redux 到 Dva, 再到 Mobx, 我发现 Mobx 比 Redux 简单方便太多了, 尤其是我参与的项目需要用到全局状态的场景并不多, Mobx 已经完全足够了。但是看过 Mobx 文档后发现并没有一个直接明了的 example 告诉我怎么用, 于是有了这篇文章, 当前 mobx 最新版本是 v6, 所以下面介绍 v6 推荐的方式去使用 mobx, 应该也是目前最简洁的上手教程了

> 鉴于目前主流开发用都是用的函数组件, 本文不考虑类组件场景

## 1. 了解 Mobx 的核心概念

> Mobx 核心与开发模式与 Vue 相似, API 也是类似的

1. observable state: 被观察的 state
2. actions: 用来更新 state 的方法
3. computed: 计算属性, 类似 vuex 的 getter
4. Reactive React components: 让 React 组件具有响应性(当 state 改变时, 自动更新 react 组件)

## 2. 简单上手

> 架构: Umi3 + React Hooks + Mobx6 + TypeScript

```bash
npm i mobx@6

npm i mobx-react@7 # 支持函数组件和类组件
# or
npm i mobx-react-lite@3 # 轻量级 mobx-react, 仅支持函数组件
```

### 2.1 创建 stores

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

### 3.2 借助 React Context 将 stores 传递下去

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

```ts
// src/app.tsx
import React from 'react';
import { stores, StoreContext } from '@/stores';

export function rootContainer(container: React.ReactNode) {
  // 通过根组件将 context 对象传递给所有组件
  return React.createElement(StoreContext.Provider, { value: stores }, container);
}
```

### 3.3 任意组件读取 stores

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

// observer: 将 React Component 变为 Reactive React components, 方便重新渲染
export default observer(Index);
```

## 4. 常用 API

- makeAutoObservable

  - 将属性变为 observable state
  - 将方法变为 action
  - 将 get xx 方法变为 computed
  - ...

- observer: 高阶组件, 将 React components 变为 Reactive React components, 也就是当 observable state 变化时自动重新渲染
- autorun: 监听 state 变化并执行副作用, 类似 useEffect, 无需手动管理 deps

## 4. Q & A

- 为什么不用 @observable 等装饰器
  - 装饰器处于提案阶段, 最终版尚不确定, 详见官方文档(https://mobx.js.org/enabling-decorators.html)
- 为什么使用 React Context 引入 store, 而不是直接引入 store
  - 直接引入 store 不利于单元测试(https://mobx.js.org/react-integration.html#using-external-state-in-observer-components)
