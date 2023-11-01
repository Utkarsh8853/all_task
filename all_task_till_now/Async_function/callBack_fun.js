function asyncOperation(callback) {
  setTimeout(() => {
    const result = Math.random() * 100;
    if (result > 50) {
      callback(null, result);
    } else {
      callback('Error: Result is less than 50', null);
    }
  }, 2000);
}

function handleResult(error, result) {
  if (error) {
    console.log(error);
  } else {
    console.log(`Result: ${result}`);
  }
}

asyncOperation(handleResult);