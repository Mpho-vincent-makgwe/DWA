const provinces = ['Western Cape', 'Gauteng', 'Northern Cape', 'Eastern Cape', 'KwaZulu-Natal', 'Free State']
const names = ['Ashwin', 'Sibongile', 'Jan-Hendrik', 'Sifso', 'Shailen', 'Frikkie']

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


// const sortedProvinces = provinces.toSort(provinces);

// console.log(sortedProvinces);

// const sortedNames = names.toSort(names);

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

//Second Exercise

const products = [
    { product: 'banana', price: "2" },
    { product: 'mango', price: 6 },
    { product: 'potato', price: ' ' },
    { product: 'avocado', price: "8" },
    { product: 'coffee', price: 10 },
    { product: 'tea', price: '' },
  ];
console.log(
    // Your code here
    products.forEach(product => {
        console.log(product.product);
      }),

      

    );