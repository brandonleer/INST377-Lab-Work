function getRandomIntInclusive(min, max) {
  const newMin = Math.ceil(min);
  const newMax = Math.floor(max);
  return Math.floor(
    Math.random() * (newMax - newMin + 1) + newMin
  );
}
function restoArrayMake(dataArray) {
  // console.log('fired dataHandler');
  // console.table(dataArray);
  const range = [...Array(15).keys()];
  const listItems = range.map((item, index) => {
    const restNum = getRandomIntInclusive(0, dataArray.length - 1);
    return dataArray[restNum];
  });
    // console.log(listItems);
  return listItems;
  // range.forEach((item) => {
  // console.log('range item', item);
  // });
}

function createHtmlList(collection) {
  // console.log('fired HTML creator');
  // console.log(collection);
  const targetList = document.querySelector('.resto-list');
  targetList.innerHTML = '';
  collection.forEach((item) => {
    const {name} = item;
    const displayName = name.toLowerCase();
    const injectThisItem = `<li>${displayName}</li>`;
    targetList.innerHTML += injectThisItem;
  });
}
async function mainEvent() { // the async keyword means we can make API requests
  const form = document.querySelector('.main_form');
  const submit = document.querySelector('.submit_button');
  const resto = document.querySelector('#resto_name');
  const zipcode = document.querySelector('#zipcode');
  submit.style.display = 'none';
  const results = await fetch('/api/foodServicesPG'); // This accesses some data from our API
  const arrayFromJson = await results.json(); // This changes it into data we can use - an object
  // console.log(arrayFromJson);

  if (arrayFromJson.data.length > 0) {
    submit.style.display = 'block';

    const currentArray = [];
    resto.addEventListener('input', async (event) => {
      if (currentArray === undefined) { return; }
      console.log(event.target.value);
      const matchResto = currentArray.filter((item) => item.name === event.target.value);
      console.log(matchResto);
    });

    form.addEventListener('submit', async (submitEvent) => { // async has to be declared all the way to get an await
      submitEvent.preventDefault(); // This prevents your page from refreshing!
      // console.log('form submission'); // this is substituting for a "breakpoint"
      submit.style.display = 'block'; // arrayFromJson.data - we're accessing a key called 'data' on the returned object
      // it contains all 1,000 records we need
      const restoArray = restoArrayMake(arrayFromJson.data);
      createHtmlList(restoArray);
    });
  }
}
// this actually runs first! It's calling the function above
document.addEventListener('DOMContentLoaded', async () => mainEvent());