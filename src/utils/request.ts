import { stores } from '@/stores';

// 在普通 js 中读取 store 示例
export default () => {
  console.log(stores.countStore.count);
};
