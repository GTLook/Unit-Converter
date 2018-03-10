//link to data page
//let data = require('./data.js');
let leftUnitString = ''


const convert = document.querySelector('#convertButton');
convert.addEventListener('click',function(){
  console.log('convert!')
})

const leftInput = document.querySelector('#leftInput');
const leftInputMenu = document.querySelector('#leftInputMenu')
leftInput.addEventListener('mousedown',function(){
  leftInputMenu.classList.add('show')

})

const rightUnit = document.querySelector('#rightSelector');
convert.addEventListener('change',function(){

})
