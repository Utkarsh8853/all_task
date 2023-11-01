function asyncFunction() {
  setTimeout(() => {
    console.log('Async function completed');
  }, 2000);
}

console.log('Start');
asyncFunction();
console.log('End');