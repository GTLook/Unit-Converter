// declare global variables
let unitType = '';
let leftNumberString = '';
let leftUnit = '';
let rightNumberString = '';
let rightUnit = '';
let toggle = true;

//message select
const message = document.querySelector('#message')

//left number field, updates number string on keypress, event listens for enter key
const leftNumber = document.querySelector('#leftNumber')
leftNumber.addEventListener('keyup', function() {
  leftNumberString = leftNumber.value
})
leftNumber.addEventListener('keydown', function(enter) {
  if (enter.keyCode == 13) {
    convert()
  }
})
leftNumber.addEventListener('focus', function() {
  //remove input boxes
  leftInputMenu.classList.remove('show')
  rightInputMenu.classList.remove('show')
})

//right number field, updates number string on keypress, event listens for enter key
const rightNumber = document.querySelector('#rightNumber')
rightNumber.addEventListener('keyup', function() {
  rightNumberString = rightNumber.value
})
rightNumber.addEventListener('keydown', function(enter) {
  if (enter.keyCode == 13) {
    convert()
  }
})
rightNumber.addEventListener('focus', function() {
  //remove input boxes
  leftInputMenu.classList.remove('show')
  rightInputMenu.classList.remove('show')
})

//converter button
const convertButton = document.querySelector('#convertButton');
convertButton.addEventListener('click', function() {
  convert()
})

//convert function
const convert = function() {
  if (unitType == '') {
    //user must select unit type prior to converting, show error
    message.innerHTML='<span><strong>Oops! </strong>Something went wrong, Select a unit type or reset to try again.</span><br>'
    return
  } else if (leftUnit == '' || rightUnit == '') {
    //user must select both unit types prior to converting
    //may split into two seperate errors
    message.innerHTML='<span><strong>Oops! </strong>Something went wrong, Select a unit, Enter your own unit, or Reset to try again.</span><br>'
    return
  } else if (leftNumberString == '' && rightNumberString == ''){
    message.innerHTML='<span><strong>Oops! </strong>Something went wrong, enter a number or reset to try again.</span><br>'
    return
  } else {
    //User Message sucess
    message.innerHTML='<span><strong>Converted!</strong> Select another unit to convert again or Reset.</span><br>'
    //convert if leftnumber is empty
    if (leftNumberString == '') {
      leftNumberString = round(parseInt(rightNumberString) * data[unitType][rightUnit] / data[unitType][leftUnit]).toString()
      render()
      return
    }
    //convert if rightnumber is empty
    else if (rightNumberString == '') {
      rightNumberString = round(parseInt(leftNumberString) * data[unitType][leftUnit] / data[unitType][rightUnit]).toString()
      render()
      return
    } else {
      message.innerHTML='<span><strong>Oops! </strong>Something went wrong, Looks like your trying to convert two known units.</span><br><span>Enter your own unique unit or reset to try again.</span>'
      return
    }
  }
}

//rounding function, rounds to two decimals
const round = function(number){
  return Math.round(number*100)/100
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
      //user message
      message.innerHTML ='<span>Now select the units to convert <strong>or</strong> type in your own unit.</span><br>'
      unitType = Object.keys(data)[index]
      reset()
      displayConvert(LeftRight)
    })
    anchor.classList.add('dropdown-item')
  }
}

// display the keys in a unit type, takes 'left'||'right' and 'unitType'
const displayConvert = function(LeftRight) {
  //select left or right box based on LeftRight Callback
  let InputMenu = document.querySelector(`#${LeftRight}InputMenu`)
  for (let index in Object.keys(data[unitType])) {
    let anchor = document.createElement('a')
    InputMenu.appendChild(anchor)
    anchor.innerHTML = Object.keys(data[unitType])[index]
    anchor.addEventListener('click', function() {
      //assign correct object key to global scope
      if (LeftRight == 'left') {
        //assign to correct variable
        leftUnit = Object.keys(data[unitType])[index]
        //remove input box
        leftInputMenu.classList.remove('show')
        if (rightUnit == '') {
          rightInputMenu.classList.add('show')
        }
      } else {
        //assign to correct variable
        rightUnit = Object.keys(data[unitType])[index];
        //remove input box
        rightInputMenu.classList.remove('show')
        if (leftUnit == '') {
          leftInputMenu.classList.add('show')
        }
      }
      if (leftUnit != '' && rightUnit != '') {
        //user message
        message.innerHTML = '<span>Now, enter the number to convert <strong>or</strong> both numbers if you\'re making your own unit.</span><br>'
        //display number fields
        leftNumber.parentElement.classList.remove('d-none')
        rightNumber.parentElement.classList.remove('d-none')
        //show it
        render()
      } else {
        LeftRight == 'left' ? displayConvert('right') : displayConvert('left')
        render()
      }
    })
    anchor.classList.add('dropdown-item')
  }
}

//cleans out the dropdowns
const reset = function() {
  while (leftInputMenu.firstChild) {
    leftInputMenu.removeChild(leftInputMenu.firstChild);
  }
  while (rightInputMenu.firstChild) {
    rightInputMenu.removeChild(rightInputMenu.firstChild);
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

//sort input fields
const sort = function(input) {
  //return unitType!='':Object.keys(data[unitType]).filter(char => char.str.match(/char/))
}

//render visual fields function
const render = function() {
  leftNumber.value = leftNumberString
  leftInput.value = leftUnit
  rightNumber.value = rightNumberString
  rightInput.value = rightUnit
}

//reset fucntion
const resetAll = function() {
  //toggle messages on and off
  if(unitType==''){
    toggle?message.classList.add('d-none'):message.classList.remove('d-none')
    toggle?toggle=false:toggle=true
  }
  //reset user message
  message.innerHTML='<span><strong>Hi!</strong> Welcome to the Unit Converter.</span><br><span>Select a data type from the dropdown to get started.</span>'
  //reset global variables
  unitType = '';
  leftNumberString = '';
  leftUnit = '';
  rightNumberString = '';
  rightUnit = '';
  //update fields
  render()
  //remove input boxes
  leftInputMenu.classList.remove('show')
  rightInputMenu.classList.remove('show')
  //remove number fields
  leftNumber.parentElement.classList.add('d-none')
  rightNumber.parentElement.classList.add('d-none')
}

//resetButton
const resetButton = document.querySelector('#resetButton')
resetButton.addEventListener('click', function() {
  resetAll()
})
