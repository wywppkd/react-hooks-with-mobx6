import React from 'react';
import { stores, StoreContext } from './stores';

export function rootContainer(container: Element) {
  // 通过根组件将 context 对象传递给所有组件
  return React.createElement(StoreContext.Provider, { value: stores }, container);
}
