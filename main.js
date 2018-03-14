// declare global variables
let unitType = '';
let leftNumberString = '';
let leftUnitString = '';
let rightNumberString = '';
let rightUnitString = '';
let toggle = true;

//pull stored user defined variables and merge with data.js
if(localStorage.getItem('user')){
  data=JSON.parse(localStorage.getItem('user'))
}

//message select
const message = document.querySelector('#message')

//left number field event listeners
const leftNumber = document.querySelector('#leftNumber')
leftNumber.addEventListener('keyup', function() {
  leftNumberString = leftNumber.value
})
leftNumber.addEventListener('keydown', function(key) {
  if (key.keyCode == 13) {
    rightNumberString=''
    convert()
  }
})
leftNumber.addEventListener('focus', function() {
  //remove input boxes
  leftInputMenu.classList.remove('show')
  rightInputMenu.classList.remove('show')
})

//right number field event listeners
const rightNumber = document.querySelector('#rightNumber')
rightNumber.addEventListener('keyup', function() {
  rightNumberString = rightNumber.value
})
rightNumber.addEventListener('keydown', function(key) {
  if (key.keyCode == 13) {
    leftNumberString=''
    convert()
  }
})
rightNumber.addEventListener('focus', function() {
  //remove input boxes
  leftInputMenu.classList.remove('show')
  rightInputMenu.classList.remove('show')
})

//left unit input box
const leftUnit = document.querySelector('#leftInput')
leftUnit.addEventListener('keyup', function() {
  if(unitType!=''){leftUnitString = leftUnit.value}
})
leftUnit.addEventListener('blur', function(){
    if(checkLeftKeys()&& unitType!=''&&leftUnitString!='') {
      message.innerHTML = '<span><strong>Oh,</strong> I dont recognize that unit,<br> compare it to a known unit and enter both number fields and click the convert icon!</span>'
    }
    //leftInputMenu.classList.remove('show')
})

//right unit input box
const rightUnit = document.querySelector('#rightInput')
rightUnit.addEventListener('keyup', function() {
  if(unitType!=''){rightUnitString = rightUnit.value}
})
rightUnit.addEventListener('blur', function(){
    if(checkRightKeys() && unitType!=''&&rightUnitString!=''){
      message.innerHTML = '<span><strong>Oh,</strong> I dont recognize that unit,<br> compare it to a known unit and enter both number fields and click the convert icon!</span>'
    }
    //rightInputMenu.classList.remove('show')
})

//check functions for user entered variables
const checkLeftKeys = function(){
  if(unitType!=''){
  for(let index in Object.keys(data[unitType])) {
    if(leftUnitString == Object.keys(data[unitType])[index]) {return false;}
    }
  }
  return true
}
const checkRightKeys = function(){
  if(unitType!=''){
  for(let index in Object.keys(data[unitType])) {
    if(rightUnitString == Object.keys(data[unitType])[index]) {return false;}
    }
  }
  return true
}

//converter button
const convertButton = document.querySelector('#convertButton');
convertButton.addEventListener('click', function() {
  if(leftNumberString === '0' || rightNumberString === '0'){
    message.innerHTML='<span><strong>No.</strong></span>'
  }
  if(checkLeftKeys() && checkRightKeys()){
    message.innerHTML='<span><strong>Woah! </strong>One new variable at a time!</span><br>'
  } else if(checkLeftKeys() || checkRightKeys()){
    message.innerHTML='<span><strong>Got it. </strong>I\'ll remeber that.</span><br>'
    if(checkLeftKeys()){data[unitType][leftUnitString]= parseInt(rightNumberString)/parseInt(leftNumberString)*data[unitType][rightUnitString]
    localStorage.setItem('user',JSON.stringify(data))
    }
    else{ data[unitType][rightUnitString]= parseInt(leftNumberString)/parseInt(rightNumberString)*data[unitType][leftUnitString]
    localStorage.setItem('user',JSON.stringify(data))
    }
  }
  else{convert()}
})

//convert function
const convert = function() {
  if (unitType == '') {
    //user must select unit type prior to converting, show error
    message.innerHTML='<span><strong>Oops! </strong>Something went wrong, Select a unit type or reset to try again.</span><br>'
    return
  } else if (leftUnitString == '' || rightUnitString == '') {
    //user must select both unit types prior to converting
    //may split into two seperate errors
    message.innerHTML='<span><strong>Oops! </strong>Something went wrong, Select a unit, Enter your own unit, or Reset to try again.</span><br>'
    return
  } else if (leftNumberString == '' && rightNumberString == ''){
    message.innerHTML='<span><strong>Oops! </strong>Something went wrong, enter a number or reset to try again.</span><br>'
    return// data[unitType] = sortUnit(leftUnitString)}
  } else {
    //User Message sucess
    message.innerHTML='<span><strong>Converted!</strong> Enter another number, select another unit, or reset to try again.</span><br>'
    //convert if leftnumber is empty
    if (leftNumberString == '') {
      leftNumberString = round(parseInt(rightNumberString) * data[unitType][rightUnitString] / data[unitType][leftUnitString]).toString()
      render()
      return
    }
    //convert if rightnumber is empty
    else if (rightNumberString == '') {
      rightNumberString = round(parseInt(leftNumberString) * data[unitType][leftUnitString] / data[unitType][rightUnitString]).toString()
      render()
      return
    } else {
      message.innerHTML='<span><strong>Oops! </strong>Something went wrong, Looks like your trying to convert two known units.</span><br>'
      return
    }
  }
}

//rounding function, rounds to two decimals
const round = function(number){
  let decimal = 1000
  return Math.round(number*decimal)/decimal
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

//sort function for unit input fields
// function filterUnit(input) {
//   return Object.keys(data[unitType]).filter(function (element){
//     return element.toLowerCase().indexOf(input.toLowerCase()) > -1;
//   })
// }

// display the keys in a unit type, takes 'left'||'right' and 'unitType'
const displayConvert = function(LeftRight) {
  //select left or right box based on LeftRight Callback
  let InputMenu = document.querySelector(`#${LeftRight}InputMenu`)

  // broken sort function for dropdowns, to be added later
  // let Input = document.querySelector(`#${LeftRight}Input`)
  // let unitTypeArray = Object.keys(data[unitType])
  // if(Input.value!=''){unitTypeArray=unitTypeArray.filterUnit(Input.value)}
  // console.log(unitTypeArray)// }

  for (let index in Object.keys(data[unitType])) {
    let anchor = document.createElement('a')
    InputMenu.appendChild(anchor)
    anchor.innerHTML = Object.keys(data[unitType])[index]
    anchor.addEventListener('click', function() {
      //assign correct object key to global scope
      if (LeftRight == 'left') {
        //assign to correct variable
        leftUnitString = Object.keys(data[unitType])[index]
        //remove input box
        leftInputMenu.classList.remove('show')
        if (rightUnitString == '') {
          rightInputMenu.classList.add('show')
        }
      } else {
        //assign to correct variable
        rightUnitString = Object.keys(data[unitType])[index];
        //remove input box
        rightInputMenu.classList.remove('show')
        if (leftUnitString == '') {
          leftInputMenu.classList.add('show')
        }
      }
      if (leftUnitString != '' && rightUnitString != '') {
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

//render visual fields function
const render = function() {
  leftNumber.value = leftNumberString
  leftInput.value = leftUnitString
  rightNumber.value = rightNumberString
  rightInput.value = rightUnitString
}

//reset fucntion
const resetAll = function() {
  //toggle messages on and off
  if(unitType==''){
    toggle?message.classList.add('d-none'):message.classList.remove('d-none')
    toggle?toggle=false:toggle=true
  }
  //reset user message
  message.innerHTML='<span><strong>Hi!</strong> Welcome to the Unit Converter.<br>Select a unit type from the dropdown to get started.</span>'
  //reset global variables
  unitType = '';
  leftNumberString = '';
  leftUnitString = '';
  rightNumberString = '';
  rightUnitString = '';
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
  console.log('reset')
  resetAll()
})
