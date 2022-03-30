import { isRef,ref,unref,watch} from "vue"
// cb 函数
//interval 间隔
//option 配置

export function useIntervalFn(cb: any, interval = 1000, options: any = {}): any {
  // 指定空对象默认值
  const { 
    // immediate 立即执行 【但是会有定时的timer】
    // immediateCallback // 立马执行函数 【timer为0】
    immediate = true, 
    immediateCallback = false,
  } = options
  // 定时器对象
  let timer: any = null
  // 控制是否暂停 false：暂停; true：继续
  const isActive = ref(false)
  // 删除
  function clean() {
    if(!timer)return
    clearInterval(timer) 
    timer = null
  }
  // 暂停
  function pause() {
    isActive.value = false
    clean()
  }
  // 恢复
  function resume() {
    if(interval<0) return
    isActive.value = true
    // 是否立马执行函数
    if (immediateCallback)cb()
    //确保只有一个定时器
    clean()
    timer = setInterval(cb,unref(interval))
  }
  //如果传入interval的是ref类型
  if (isRef(interval)) {
    if (isRef(interval)) {
      const stopWatch = watch(interval, () => {
       if (immediate) resume()
     })  
    //  getCurrentScope 
   }
  }
  //立即执行
  if (immediate ) resume()
  //出口
  return {
    isActive,
    pause,
    resume,
  }
}