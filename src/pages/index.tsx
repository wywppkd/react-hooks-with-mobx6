import { useRootStore } from '@/stores';
import request from '@/utils/request';
import { observer } from 'mobx-react';
import React from 'react';
import Apple from './components/Apple';

const Index = () => {
  const { countStore, userStore } = useRootStore();

  return (
    <div>
      {/* countStore */}
      <button onClick={() => countStore.setCount(Date.now())}>count:{countStore?.count}</button>
      <Apple />
      <hr />

      {/* userStore */}
      <button
        onClick={() => {
          userStore.setUserInfo({
            name: 'Lisa',
            id: Date.now(),
          });
        }}
      >
        修改用户ID
      </button>
      <ul>
        <li>name:{userStore.user?.name}</li>
        <li>id:{userStore.user?.id}</li>
      </ul>

      <hr />
      {/* 普通js中读取store */}
      <button
        onClick={() => {
          request();
        }}
      >
        发送
      </button>
    </div>
  );
};

export default observer(Index);
