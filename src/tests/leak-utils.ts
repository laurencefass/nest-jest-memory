export function mb(value: number) {
  return value / (1024 * 1024);
}

export let leakedArray: Array<number> = [];

const defaultLeakMb = undefined;

export function createMemoryLeak(leakMb = 1) {
  const bytes = defaultLeakMb ? defaultLeakMb : leakMb;
  const mBytes = bytes * 1024 * 1024;
  for (let i = 0; i < mBytes; i++) {
    leakedArray.push(i);
  }
}

export function garbageCollect() {
  if (global.gc) {
    console.log('garbage collecting');
    global.gc();
  }
}

export function freeMemoryLeak() {
  leakedArray = [];
}

export function trace(msg: string, cb = undefined) {
  // stats1 = v8.getHeapStatistics();
  // console.log(`initial heap allocation: ${mb(stats1.total_heap_size)} Mb`);
  console.log(
    `${msg} => process.memoryUsage ${mb(process.memoryUsage().heapTotal)} Mb`,
  );

  // execute any supplied callback
  if (cb) {
    cb();
  }
}
