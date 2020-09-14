---
sidebar: auto
---

## React
### 事件处理
::: tip
回调中使用箭头函数：此语法问题在于每次渲染时都会创建不同的回调函数。在大多数情况下，这没什么问题，但如果该回调函数作为 prop 传入子组件时，这些组件可能会进行额外的重新渲染。我们通常建议在构造器中绑定或使用 class fields 语法来避免这类性能问题( public class fields *实验性* 语法)。
:::


### 鼠标和指针事件
::: tip
通过点击元素以外的地方来关闭已打开的弹出框<br />
通常实现这个功能的方法是在 window 对象中附上一个 click 事件以关闭弹窗
:::
注：Node.contains()返回的是一个布尔值，来表示传入的节点是否为该节点的后代节点
```
class OuterClickExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = { isOpen: false };
    this.toggleContainer = React.createRef();

    this.onClickHandler = this.onClickHandler.bind(this);
    this.onClickOutsideHandler = this.onClickOutsideHandler.bind(this);
  }

  componentDidMount() {
    window.addEventListener('click', this.onClickOutsideHandler);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.onClickOutsideHandler);
  }

  onClickHandler() {
    this.setState(currentState => ({
      isOpen: !currentState.isOpen
    }));
  }

  onClickOutsideHandler(event) {
    if (this.state.isOpen && !this.toggleContainer.current.contains(event.target)) {
      this.setState({ isOpen: false });
    }
  }

  render() {
    return (
      <div ref={this.toggleContainer}>
        <button onClick={this.onClickHandler}>Select an option</button>
        {this.state.isOpen && (
          <ul>
            <li>Option 1</li>
            <li>Option 2</li>
            <li>Option 3</li>
          </ul>
        )}
      </div>
    );
  }
}
```



## Redux

### redux上⼿
1. 需要⼀个store来存储数据
2. store里的reducer初始化state并**定义state修改规**
3. 通过dispatch一个action来提交对数据的修改
4. action提交到reducer函数⾥里里，根据传⼊入的action的type，返回新的state
```
import {createStore} from "redux";
function countReducer(state = 0, action) {
  switch (action.type) {
    case "ADD":
      return state + 1;
    case "MINUS":
      return state - 1;
    default:
      return state;
  }
}
const store = createStore(countReducer);
export default store;
```

```
 
import React, {Component} from "react";
import store from "../store/";

export default class ReduxPage extends Component {
  componentDidMount() {
    store.subscribe(() => {
      this.forceUpdate();
    }); 
  }
  add = () => {
    store.dispatch({type: "ADD"});
  };
  minus = () => {
    store.dispatch({type: "MINUS"});
  };
  render() {
    console.log("store", store); //sy-log
    return (
      <div>
        <h3>ReduxPage</h3>
        <p>{store.getState()}</p>
        <button onClick={this.add}>add</button>
        <button onClick={this.minus}>minus</button>
      </div>
    );
  }
}

```



### Reducer
::: tip
reducer 就是⼀个纯函数，接收旧的 state 和 action，返回新的 state。
:::

```
(previousState, action) => newState
```

思考:有如下函数， 聚合成⼀个函数，并把第一个函数的返回值传递给下一个函数，如何处理。
```
function f1(arg) {
  console.log("f1", arg);
  return arg;
}
function f2(arg) {
  console.log("f2", arg);
  return arg; 
}
function f3(arg) {
  console.log("f3", arg);
  return arg;
}
```

### compose
::: tip
其实 compose 函数做的事就是把 const res = fn1(fn2(fn3(fn4(x)))) 这种嵌套的调用方式改成<br/> 
const res = compose(fn1,fn2,fn3,fn4)(x) 的方式调用。
:::

```
export default function compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg
  }

  if (funcs.length === 1) {
    return funcs[0]
  }

  return funcs.reduce((a, b) => (...args) => a(b(...args)))
}
```

```
import {compose} from 'redux'
let x = 10
function fn1(x) {return x + 1}
function fn2(x) {return x + 2}
function fn3(x) {return x + 3}
function fn4(x) {return x + 4}

// 假设我这里想求得这样的值
let a = fn1(fn2(fn3(fn4(x)))) // 10 + 4 + 3 + 2 + 1 = 20

// 根据compose的功能，我们可以把上面的这条式子改成如下：
let composeFn = compose(fn1, fn2, fn3, fn4)
let b = composeFn(x) // 理论上也应该得到20
其实执行的就是: [fn1,fn2,fn3.fn4].reduce((a, b) => (...args) => a(b(...args)))
```


### 核心实现
+ 存储状态state 
+ 获取状态getState 
+ 更新状态dispatch 
+ 变更订阅subscribe

### createStore
```
export function createStore(reducer, enhancer) {
  if (enhancer) {
    return enhancer(createStore)(reducer);
  }

  let currentState;

  const currentListeners = [];
  
  function getState() {
    return currentState;
  }

  function dispatch(action) {
    currentState = reducer(currentState, action);
    currentListeners.map(v => v());

    return action;
  }

  function subscribe(listener) {
    currentListeners.push(listener);
    // 返回取消订阅的函数
    return () => {
      const index = currentListeners.indexOf(listener);
      currentListeners.splice(index, 1);
    };
  }

  // 手动执行一下dispatch，赋上初始值
  dispatch({type:'@@XXX-OOO-REDUX'});
  
  return {
    getState,
    dispatch,
    subscribe,
  };
}
```


### 异步
Redux只是个纯粹的状态管理器，默认只支持同步，实现异步任务 比如延迟，网络请求，需要中间件的 支持，比如我们使⽤最简单的redux-thunk和redux-logger 。<br>
中间件就是⼀个函数，对 store.dispatch ⽅法进行改造，在发出 Action 和执行 Reducer 这两步之 间，添加了其他功能。



### applyMiddleware
```
export function applyMiddleware(...middlewares) {
  return createStore => reducer => {
    const store = createStore(reducer);
    let dispatch = store.dispatch;
    
    const midApi = {
      getState: store.getState,
      dispatch: action => dispatch(action),
    };

    const middlewareChain = middlewares.map(middleware => middleware(midApi));

    // 加强dispatch，执行dispatch的时候将所有的中间件全都执行一遍
    dispatch = compose(...middlewareChain)(store.dispatch);

    // 返回store，同时加强dispatch
    return {
      ...store,
      dispatch,
    };
  }
}
```


### redux-thunk
```
function thunk({ dispatch, getState }) {
  // next 就是下一个中间件处理的结果---返回的一个新的(加强的)dispatch
  return next => action => {
    if (typeof action === 'function') {
      return action(dispatch, getState);
    }
    return next(action);
  }
}
```


### redux-logger
```
function logger({ dispatch, getState }) {
  // next 就是下一个中间件处理的结果---返回的一个新的(加强的)dispatch
  return next => action => {
    console.log('#############################');
    // prev state
    const prevState = getState();
    console.log('prev state: ', prevState);

    // next state
    const returnValue = next(action);
    const nextState = getState();
    console.log('next state: ', nextState);

    console.log('#############################');

    return returnValue;
  }
}
```


### redux-promise
`简版:`
```
function promise({ dispatch }) {
  return next => action => {
    return isPromise(action) ? action.then(dispatch) : next(action);
  };
}
```


### combineReducers
```
function combineReducers(reducers) {
  // 返回一个新的reducer
  return function combination(state = {}, action) {
    const nextState = {};
    let hasChanged = false;
    for(let key in reducers) {
      const reducer = reducers[key];
      nextState[key] = reducer(state[key], action)
      hasChanged = hasChanged || nextState[key] !== state[key];
    }

    hasChanged = hasChanged || Object.keys(nextState).length !== Object.keys(state).length;

    return hasChanged ? nextState : state;
  };
}
```



### koa-compose
```
function compose (middleware) {
  if (!Array.isArray(middleware)) throw new TypeError('Middleware stack must be an array!')
  for (const fn of middleware) {
    if (typeof fn !== 'function') throw new TypeError('Middleware must be composed of functions!')
  }

  return function (context, next) {
    // last called middleware #
    let index = -1
    return dispatch(0)
    function dispatch (i) {
      if (i <= index) return Promise.reject(new Error('next() called multiple times'))
      index = i
      let fn = middleware[i]
      if (i === middleware.length) fn = next
      if (!fn) return Promise.resolve()
      try {
        return Promise.resolve(fn(context, dispatch.bind(null, i + 1)));
      } catch (err) {
        return Promise.reject(err)
      }
    }
  }
}
```


## React-Redux

每次都重新调用render和getState太low了，想用更react的方式来写，需要react-redux的支持。
```
$ yarn add react-redux
```
提供了两个api
1. Provider 为后代组件提供store
2. connect 为组件提供数据和变更方法

全局提供store，index.js
```
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {Provider} from "react-redux";
import store from "./store/";
// 把Provider放在根组件外层，使子组件能获得store 
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
```

获取状态数据，ReactReduxPage.js
```
import React, { Component } from "react";
import { connect } from "react-redux";
class ReactReduxPage extends Component {
  render() {
    const { num, add, minus, asyAdd } = this.props;
    return (
      <div>
        <h1>ReactReduxPage</h1>
        <p>{num}</p>
        <button onClick={add}>add</button>
        <button onClick={minus}>minus</button>
      </div>
    ); 
  }
}

const mapStateToProps = state => {
  return {
    num: state,
  };
};

const mapDispatchToProps = {
  add: () => {
    return { type: "add" };
  },
  minus: () => {
    return { type: "minus" };
  }
}

// mapDispatchToProps也可以是一个函数
const mapDispatchToProps = (dispatch, ownProps) => {
    let creators = {
      add: payload => ({type: "ADD", payload}),
      minus: () => ({type: "MINUS"})
    };
    creators = bindActionCreators(creators, dispatch);
    return {dispatch, ...creators};
  }


export default connect(
  mapStateToProps, //状态映射 mapStateToProps 
  mapDispatchToProps, //派发事件映射
)(ReactReduxPage);
```
> connect中的参数:state映射和事件映射

```
import React, {useContext, useReducer, useLayoutEffect} from "react";
const Context = React.createContext();
export const connect = (
  mapStateToProps = state => state,
  mapDispatchToProps
) => WrappendComponent => props => {
  const store = useContext(Context);
  const {dispatch, getState, subscribe} = store;
  const stateProps = mapStateToProps(getState());
  let dispatchProps = {dispatch};
  
  // 函数组件中引起更新
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

  if (typeof mapDispatchToProps === "function") {
    dispatchProps = mapDispatchToProps(dispatch);
  } else if (typeof mapDispatchToProps === "object") {
    dispatchProps = bindActionCreators(mapDispatchToProps, dispatch);
  }

  // 这里不能用useEffect，因为useEffect有延迟，组件渲染完成之后才会延迟执行，在组件渲染完到延迟执行的, 
  // 这个间隙可能会有store state发生改变，但是，这个时候还没有订阅，就可能会丢失一些数据信息。
  useLayoutEffect(() => {
    const unsubscribe = store.subscribe(() => {
      // 执行组件更新
      forceUpdate();
    });
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [store]);

  return <WrappendComponent {...props} {...stateProps} {...dispatchProps} />;
};

export function Provider({store, children}) {
  return <Context.Provider value={store}>{children}</Context.Provider>;
}

function bindActionCreator(creator, dispatch) {
  return (...args) => dispatch(creator(...args));
}

// 这个方法在Redux里面
function bindActionCreators(creators, dispatch) {
  const obj = {};
  for (let key in creators) {
    obj[key] = bindActionCreator(creators[key], dispatch);
  }
  return obj; 
}
```










