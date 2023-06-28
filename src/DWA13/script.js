import {provinces, names, products} from './data.js'


//Challenge 1
names.forEach(name => {
    console.log(name);
});
names.forEach((name, index) => {
    console.log(`${name} (${provinces[index]})`);
});

const uppercaseProvinces = provinces.map(province => province.toUpperCase());
console.log(uppercaseProvinces);
const lowercaseProvinces = provinces.map(province => province.toLowerCase());
console.log(lowercaseProvinces);

const nameLengths = names.map(name => name.length);

console.log(nameLengths);

const characterCountArrayProvince = provinces.map(province => province.length);

console.log(characterCountArrayProvince);


// const sortedProvinces = provinces.sort(provinces);

// console.log(sortedProvinces);

// const sortedNames = names.sort(names);

// console.log(sortedNames);

// Task 6: Use filter to remove provinces with the word "Cape" and return the count of remaining provinces
const filteredProvinces = provinces.filter(province => !province.includes('Cape'));
console.log(filteredProvinces.length);

// Task 7: Create a boolean array indicating whether a name contains the character 'S'
const hasSCharacterArray = names.map(name => name.includes('S'));
console.log(hasSCharacterArray);


// Task 8: Use reduce to create an object indicating the province of each individual
const provinceObject = names.reduce((acc, name, index) => {
    acc[name] = provinces[index];
return acc;
}, {});
console.log(provinceObject);






console.log(
    'Second Scenario:',
    // Your code here
// Task 1: Use forEach to console.log each product name
'Task 1:',
products.forEach(product => {
    console.log(product.product);
  }),

// Task 2: Use filter to filter out products with names longer than 5 characters
'Task 2:',
(() => {
const filteredProducts = products.filter(product => product.product.length <= 5);
return filteredProducts;
})(),

// Task 3: Use both filter and map to convert string prices to numbers and remove products without prices, then use reduce to calculate combined price
'Task 3:',
(() => {
const combinedPrice = products
.filter(product => product.price !== '' && !isNaN(product.price))
.map(product => Number(product.price))
.reduce((acc, price) => acc + price, 0);
return combinedPrice;
})(),

// Task 4: Use reduce to concatenate all product names
'Task 4:',
(() => {
const concatenatedNames = products.reduce((acc, product, index) => {
if (index === products.length - 1) {
    return acc + ' and ' + product.product;
} else {
    return acc + ', ' + product.product;
}
}, '');
return concatenatedNames;
})(),

// Task 5: Use reduce to calculate highest and lowest-priced items
'Task 5:',
(() => {
const { highest, lowest } = products.reduce((acc, product) => {
if (product.price !== '' && !isNaN(product.price)) {
    const price = Number(product.price);
    if (price > acc.highest.price) {
    acc.highest = { name: product.product, price };
    }
    if (price < acc.lowest.price) {
    acc.lowest = { name: product.product, price };
    }
}
return acc;
}, { highest: { name: '', price: -Infinity }, lowest: { name: '', price: Infinity } });

return `Highest: ${highest.name}. Lowest: ${lowest.name}.`;
})(),

// Task 6: Recreate the object with changed keys using Object.entries and reduce
'Task 6:',
(() => {
const recreatedArray = Object.entries(products).reduce((acc, [key, value]) => {
const { product, price } = value;
acc[key] = { name: product, cost: price };
return acc;
}, {});
return recreatedArray;
})()


    );