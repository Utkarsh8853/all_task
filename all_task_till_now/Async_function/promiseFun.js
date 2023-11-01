function asyncOperation() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const result = Math.random() * 100;
        if (result > 50) {
          resolve(result);
        } else {
          reject('Error: Result is less than 50');
        }
      }, 2000);
    });
  }
  
  asyncOperation()
    .then(result => {
      console.log(`Result: ${result}`);
    })
    .catch(error => {
      console.log(error);
    });