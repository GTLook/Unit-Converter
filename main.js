//global variables
let unitType = '';
let leftNumber = '';
let leftUnit = '';
let rightNumber = '';
let rightUnit = '';

//converter button
const convertButton = document.querySelector('#convertButton');
convertButton.addEventListener('click', function() {
  if(unitType == ''){
    console.log('error UnitType')
  }
  else if(leftUnit == '' || rightUnit == ''){
    console.log('error unit')
  }
  else{
    rightNumber==''?rightNumber=convert():leftNumber=convert()
    render()
  }
})

//convert function
const convert = function (){
  if(leftNumber==''){
    let convertMath=parseInt(rightNumber)/data[unitType][rightUnit]*data[unitType][leftUnit]
    return convertMath.toString()
  }
  else if(rightNumber==''){
    let convertMath=parseInt(leftNumber)/data[unitType][leftUnit]*data[unitType][rightUnit]
    return convertMath.toString()
  }else{
    console.log('double number error')
  }
}

//display the unit type keys, takes 'left'||'right' arugments
const units = function(LeftRight) {
  const InputMenu = document.querySelector(`#${LeftRight}InputMenu`)
  for (let index in Object.keys(data)) {
    //create anchor elements for every data type
    let anchor = document.createElement('a')
    InputMenu.appendChild(anchor)
    anchor.innerHTML = Object.keys(data)[index]
    //add an event listener for every entry
    anchor.addEventListener('click', function() {
      unitType = Object.keys(data)[index]
      //show unit types in boxes
      //could cause more problems than would solve
      reset()
      displayConvert(LeftRight, unitType)
    })
    anchor.classList.add('dropdown-item')
  }
}

// display the keys in a unit type, takes 'left'||'right' and 'unitType'
const displayConvert = function(LeftRight, unitType) {
  const InputMenu = document.querySelector(`#${LeftRight}InputMenu`)
  for (let index in Object.keys(data[unitType])) {
    let anchor = document.createElement('a')
    InputMenu.appendChild(anchor)
    anchor.innerHTML = Object.keys(data[unitType])[index]
    anchor.addEventListener('click', function() {
      //assign correct object key to global scope
      if(LeftRight == 'left'){
        //assign to correct variable
        leftUnit = Object.keys(data[unitType])[index]
        //remove input box
        leftInputMenu.classList.remove('show')
      } else {
        //assign to correct variable
        rightUnit = Object.keys(data[unitType])[index];
        //remove input box
        rightInputMenu.classList.remove('show')
      }
        //display number fields
        const leftNumber=document.querySelector('#leftNumber')
        leftNumber.parentElement.classList.remove('d-none')
        const rightNumber=document.querySelector('#rightNumber')
        rightNumber.parentElement.classList.remove('d-none')
        //show it
        render()
    })
    anchor.classList.add('dropdown-item')
  }
}

//cleans out the dropdowns
const reset = function() {
  let left = document.querySelector(`#leftInputMenu`)
  let right = document.querySelector(`#rightInputMenu`)
  while (left.firstChild) {
    left.removeChild(left.firstChild);
  }
  while (right.firstChild) {
    right.removeChild(right.firstChild);
  }
}

//left input
const leftInput = document.querySelector('#leftInput');
const leftInputMenu = document.querySelector('#leftInputMenu')
leftInput.addEventListener('focus', function() {
  //remove current
  reset()
  //decide if left||right and asign unit type
  unitType == '' ? units('left') : displayConvert('left', unitType)
  //show the other box if switching
  leftInputMenu.classList.add('show')
  rightInputMenu.classList.remove('show')
  //show it
  render()
})

//right input
const rightInput = document.querySelector('#rightInput');
const rightInputMenu = document.querySelector('#rightInputMenu')
rightInput.addEventListener('focus', function() {
  reset()
  unitType == '' ? units('right') : displayConvert('right', unitType)
  rightInputMenu.classList.add('show')
  leftInputMenu.classList.remove('show')
  render()
})

//render
const render = function() {
  const left=document.querySelector('#leftNumber')
  left.value=leftNumber
  const leftInput=document.querySelector('#leftInput')
  leftInput.value = leftUnit
  const right=document.querySelector('#rightNumber')
  right.value=rightNumber
  const rightInput=document.querySelector('#rightInput')
  rightInput.value = rightUnit
}

//reset
const resetAll = function() {
  //reset global variables
  unitType = '';
  leftNumber = '';
  leftUnit = '';
  rightNumber = '';
  rightUnit = '';
  //update fields
  render()
  //remove input boxes
  leftInputMenu.classList.remove('show')
  rightInputMenu.classList.remove('show')
  //remove number fields
  const leftNumber=document.querySelector('#leftNumber')
  leftNumber.parentElement.classList.add('d-none')
  const rightNumber=document.querySelector('#rightNumber')
  rightNumber.parentElement.classList.add('d-none')
}

//resetButton
const resetButton = document.querySelector('#resetButton')
resetButton.addEventListener('click',function(){
  resetAll()
})
