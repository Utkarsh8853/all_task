function asyncOperation1(callback) {
    setTimeout(() => {
      console.log("Async operation 1 completed");
      callback();
    }, 2000);
  }
  
  function asyncOperation2(callback) {
    setTimeout(() => {
      console.log("Async operation 2 completed");
      callback();
    }, 1000);
  }
  
  function asyncOperation3(callback) {
    setTimeout(() => {
      console.log("Async operation 3 completed");
      callback();
    }, 3000);
  }
  
  function finalCallback() {
    console.log("All async operations completed");
  }
  
  asyncOperation1(() => {
    asyncOperation2(() => {
      asyncOperation3(() => {
        finalCallback();
      });
    });
  });