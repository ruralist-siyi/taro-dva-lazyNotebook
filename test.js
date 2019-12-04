// 事件循环是 Node.js 处理非阻塞 I/O 操作的机制——尽管 JavaScript 是单线程处理的——当有可能的时候，它们会把操作转移到系统内核中去。

// 当 Node.js 启动后，它就会初始化事件轮询；

// node 事件循环分为追加在本轮循环与追加在次轮次轮循环（记住本轮循环一定早于次轮循环执行即可，代码执行顺序：同步任务-> 本轮循环->次轮循环）

// node规定，process.nextTick和Promise的回调函数追加在本轮循环，即*同步任务一旦执行完成，就开始执行它们*。。而setTimeout、setInterval、setImmediate的回调函数，追加在次轮循环。

// node事件循环的6个阶段

// 定时器(timers)：本阶段执行已经被 setTimeout() 和 setInterval() 的调度回调函数。
// 待定回调(pending callbacks)：执行延迟到下一个循环迭代的 I/O 回调。
// idle, prepare：仅系统内部使用。
// 轮询(poll)：检索新的 I/O 事件;执行与 I/O 相关的回调（几乎所有情况下，除了关闭的回调函数，那些由计时器和 setImmediate() 调度的之外），其余情况 node 将在适当的时候在此阻塞。
// 检测(check)：setImmediate() 回调函数在这里执行。
// 关闭的回调函数(close callbacks)：一些关闭的回调函数，如：socket.on('close', ...)。

// 轮询(poll)：
// 1. 计算应该阻塞和轮询 I/O 的时间。 2. 然后，处理 轮询 队列里的事件。（轮询阶段控制何时定时器执行）
// 为了防止 轮询 阶段饿死事件循环（估计是官网翻译的问题，也就是说一直处于poll但没有任务进来），libuv（实现 Node.js 事件循环和平台的所有异步行为的 C 函数库），在停止轮询以获得更多事件之前，还有一个硬性最大值（依赖于系统）。
// 如果poll阶段且没有被调度的计时器时，会发生以下两种情况：
// 1. 如果执行到setImmediate()，poll结束，进入check阶段执行； 2. 如果没有setImmediate()，则事件循环将等待回调被添加到队列中，然后立即执行。

// 宏任务(macrotask)：
// setTimeOut 、 setInterval 、 setImmediate 、 I/O 、 各种callback、UI渲染等
// 优先级： 主代码块 > setImmediate > MessageChannel > setTimeOut/setInterval

// 微任务(microtask):
// process.nextTick 、Promise 、MutationObserver 、async(实质上也是promise)
// 优先级： process.nextTick > Promise > MutationOberser

// // 输出：1 3 2 4
// process.nextTick(() => console.log(1));
// Promise.resolve().then(() => console.log(2));
// process.nextTick(() => console.log(3));
// Promise.resolve().then(() => console.log(4));

// // 这里的输出可能是1 2也可能是2 1
// // 正常逻辑来说：由于setTimeout在 timers 阶段执行，而setImmediate在 check 阶段执行。所以，setTimeout会早于setImmediate完成。
// // 实际执行的时候，进入事件循环以后，有可能到了1毫秒，也可能还没到1毫秒，取决于系统当时的状况。如果没到1毫秒，那么 timers 阶段就会跳过，进入 check 阶段，先执行setImmediate的回调函数。
// setTimeout(() => console.log(1));
// setImmediate(() => console.log(2));

// // 这段代码如果在node v11之前：setTimeout 理想情况下，先进入timers阶段，先输出timer1 timer2 然后再输出promise1 promise2；
// // node v11之前先将宏任务队列中的任务执行完之后再去查看微任务队列并执行。而浏览器只要执行了一个宏任务就会执行微任务队列(node v11+ 也相同了)；
// // 为什么要这么改？ 为了和浏览器EventLoop趋同；
// setTimeout(() => {
//     console.log('timer1');
//     Promise.resolve().then(function() {
//       console.log('promise1');
//     });
//   }, 0);
//   setTimeout(() => {
//     console.log('timer2');
//     Promise.resolve().then(function() {
//       console.log('promise2');
//     });
//   }, 0);

// // 先输出 immediate 再输出 timer
// // 因为fs.readFile进入poll阶段，然后就到了check阶段，timers阶段要到下一个循环
// fs.readFile('./main.js',()=>{
//     setTimeout(()=>{
//         console.log('timer')
//     })
//     setImmediate(()=>{
//         console.log('immediate')
//     })
// })

// // 输入 1 2 promise 3
// console.log(1);
// setTimeout(function() {
//     console.log(2);
//     Promise.resolve(1).then(function() {
//         console.log('promise');
//     })
// })
// setTimeout(function(){
//     console.log(3);
// })

// // script start => async1 start => async2 =>promise1 => promise2 => script end => nextTick => async1 end => promise3 => setTimeout0 => setImmediate => setTimeout3
// async function async1(){
//     console.log('async1 start')
//     await async2()
//     console.log('async1 end')
//   }
// async function async2(){
//     console.log('async2')
// }
// console.log('script start')
// setTimeout(function(){
//     console.log('setTimeout0')
// },0)
// setTimeout(function(){
//     console.log('setTimeout3')
// },3)
// setImmediate(() => console.log('setImmediate'));
// process.nextTick(() => console.log('nextTick'));
// async1();
// new Promise(function(resolve){
//     console.log('promise1')
//     resolve();
//     console.log('promise2')
// }).then(function(){
//     console.log('promise3')
// })
// console.log('script end')

// const sleep = ms =>
//   new Promise(res => {
//     setTimeout(res, ms);
//   });

// const doTask1 = workerId => sleep(1000).then(() => console.log(`[${workerId}] Completed Task 1`));
// const doTask2 = workerId => sleep(5000).then(() => console.log(`[${workerId}] Completed Task 2`));

// const worker = async workerId => {
//   console.log(`[${workerId}] Starting work`);
//   await doTask1(workerId);
//   await doTask2(workerId);
//   console.log(`[${workerId}] Completed all tasks`);
// };

// worker("A");
// worker("B");

function getUserInfo() {
    return new Promise((r) => {
        setTimeout(() => {
            r(1)
        }, 3000)
    })
}
function test () {
    return new Promise(resolve => {
      setTimeout(() => {
        console.log('test')
        resolve()
      }, 1000)
    })
  }
async function getResult() {
    const a = await getUserInfo();
    return a;
}
getResult().then((r) => console.log(22222,r));
