// export declare global {
//   const __REDUX_DEVTOOLS_EXTENSION__: any;
// }

// 必须要有import或者export等字样 将声明文件转化为模块
export declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__: function | undefined;
  }

  const __REDUX_DEVTOOLS_EXTENSION__: function | undefined;
}
