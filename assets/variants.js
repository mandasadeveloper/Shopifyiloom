//Product variant price difference functionality
// case 1: all options type true
// case 2: color and size only
// case 3: color and options only
// case 4: size and options only
// case 5: size only
// case 6: option only

//getting price globally
let activePriceFinal = "";

function updateVariantDifference() {
//flags for variant options
let flagColor = false;
let flagSize = false;
let flagOptions = false;

// array for checked values
let checkedValues = [];

// color inputs
let colorSwatches = document.querySelectorAll('[data-variant-option-name="color"]');
if(colorSwatches.length > 0) {
  for(var i = 0; i < colorSwatches.length; i++) {
    let quickBuyCheck = colorSwatches[i].closest('quick-buy-drawer');
    if (quickBuyCheck == null) {
      if (colorSwatches[i].checked) {
        checkedValues.push(colorSwatches[i].value);
      }
    }
    
}
  flagColor = true;
}

// size input
let sizeSwatches = document.querySelectorAll('[data-variant-option-name="size"]');
if(sizeSwatches.length > 0) {
  for(var i = 0; i < sizeSwatches.length; i++) {
    let quickBuyCheck = sizeSwatches[i].closest('quick-buy-drawer');
    if (quickBuyCheck == null) {
      if (sizeSwatches[i].checked) {
        checkedValues.push(sizeSwatches[i].value);
      }
    }
  }
  flagSize = true;
}

// options input
let optionsSwatches = document.querySelectorAll('[data-variant-option-name="customOptions"]');
if(optionsSwatches.length > 0) {
  for(var i = 0; i < optionsSwatches.length; i++) {
    let quickBuyCheck = optionsSwatches[i].closest('quick-buy-drawer');
    if (quickBuyCheck == null) {
      if (optionsSwatches[i].checked) {
        checkedValues.push(optionsSwatches[i].value);
      }
    }
  }
  flagOptions = true;
}

// selected input values in object
let resultSelectedObject = {};
if(flagOptions == true && flagSize == true && flagColor == true) {
  resultSelectedObject.color = checkedValues[0];
  resultSelectedObject.size = checkedValues[1];
  resultSelectedObject.options = checkedValues[2];
}
else if(flagOptions == false && flagSize == true && flagColor == true) {
  resultSelectedObject.color = checkedValues[0];
  resultSelectedObject.size = checkedValues[1];
}
else if(flagOptions == true && flagSize == false && flagColor == true) {
  resultSelectedObject.color = checkedValues[0];
  resultSelectedObject.options = checkedValues[1];
}
else if(flagOptions == true && flagSize == true && flagColor == false) {
  resultSelectedObject.size = checkedValues[0];
  resultSelectedObject.options = checkedValues[1];
}
else if(flagOptions == false && flagSize == true && flagColor == false) {
  resultSelectedObject.size = checkedValues[0];
}
else if(flagOptions == true && flagSize == false && flagColor == false) {
  resultSelectedObject.options = checkedValues[0];
}
else if(flagOptions == false && flagSize == false && flagColor == true) {
  resultSelectedObject.color = checkedValues[0];
}
// console.log("resultSelectedObject",resultSelectedObject)
// select array objects with all values and prices variants[all]
let selectMain = document.querySelector('[data-variant-select]');
let optionsData = [];
for (var i = 0; i < selectMain.options.length; i++) {
  let option = selectMain.options[i];
  let dataOptions = option.getAttribute('data-options');
  let sizeAndOptions = dataOptions.split(',');
  let color = "";
  let size = "";
  let options =""
  if(flagOptions == true && flagSize == true && flagColor == true) {
    color = sizeAndOptions[0].trim();
    size = sizeAndOptions[1].trim();
    options = sizeAndOptions[2].trim();
  }
  else if(flagOptions == false && flagSize == true && flagColor == true) {
    color = sizeAndOptions[0].trim();
    size = sizeAndOptions[1].trim();
  }
  else if(flagOptions == true && flagSize == false && flagColor == true) {
    color = sizeAndOptions[0].trim();
    options = sizeAndOptions[1].trim();
  }
  else if(flagOptions == true && flagSize == true && flagColor == false) {
    size = sizeAndOptions[0].trim();
    options = sizeAndOptions[1].trim();
  }
  else if(flagOptions == false && flagSize == true && flagColor == false) {
    size = sizeAndOptions[0].trim();
  }
  else if(flagOptions == true && flagSize == false && flagColor == false) {
    options = sizeAndOptions[0].trim();
  }
  else if(flagOptions == false && flagSize == false && flagColor == true) {
    color = sizeAndOptions[0].trim();
  }
  
  let dataPrice = option.getAttribute('data-price');
  let optionData = {}
  if(flagOptions == true && flagSize == true && flagColor == true) {
    optionData = {
      color: color,
      size: size,
      options: options,
      price: dataPrice
    };
  }
  else if(flagOptions == false && flagSize == true && flagColor == true) {
    optionData = {
      color: color,
      size: size,
      price: dataPrice
    };
  }
  else if(flagOptions == true && flagSize == false && flagColor == true) {
    optionData = {
      color: color,
      options: options,
      price: dataPrice
    };
  }
  else if(flagOptions == true && flagSize == true && flagColor == false) {
    optionData = {
      size: size,
      options: options,
      price: dataPrice
    };
  }
  else if(flagOptions == false && flagSize == true && flagColor == false) {
    optionData = {
      size: size,
      price: dataPrice
    };
  }
  else if(flagOptions == true && flagSize == false && flagColor == false) {
    optionData = {
      options: options,
      price: dataPrice
    };
  }
  else if(flagOptions == false && flagSize == false && flagColor == true) {
    optionData = {
      color: color,
      price: dataPrice
    };
  }
  optionsData.push(optionData);
}


//getting price globally
let activePrice = "";
// apend value for checked 
checkedValueAppend(resultSelectedObject, optionsData);
function checkedValueAppend(resultSelectedObject, optionsData) {
  let matchingOption = {};
  let { color, size, options } = resultSelectedObject;
  if (flagOptions == true && flagSize == true && flagColor == true) {
    matchingOption = optionsData.find((option) => {
      return option.color === color && option.size === size && option.options === options;
    });
  } 
  else if (flagOptions == false && flagSize == true && flagColor == true) {
    matchingOption = optionsData.find((option) => {
      return option.color === color && option.size === size;
    });
  } 
  else if(flagOptions == true && flagSize == false && flagColor == true) {
    matchingOption = optionsData.find((option) => {
      return option.color === color && option.options === options;
    });
  }
  else if(flagOptions == true && flagSize == true && flagColor == false) {
    matchingOption = optionsData.find((option) => {
      return option.size === size && option.options === options;
    });
  }
  else if(flagOptions == false && flagSize == true && flagColor == false) {
    matchingOption = optionsData.find((option) => {
      return option.size === size;
    });
  }
  else if(flagOptions == true && flagSize == false && flagColor == false) {
    matchingOption = optionsData.find((option) => {
      return option.options === options;
    });
  }
  else if(flagOptions == false && flagSize == false && flagColor == true) {
    // console.log("color")
    matchingOption = optionsData.find((option) => {
      return option.color === color;
    });
  }
  // console.log("matchingOption", matchingOption)
  if (matchingOption) { 
    let price = matchingOption.price;
    activePrice = price;
    activePriceFinal = price;
    let priceInnerHtml = `<span class="price"><span class="nt-dollar">NT$</span> ${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</span>`;
    let priceInnerHtmlZero =  `<span class="price"><span class="nt-dollar">+NT$</span> 0</span>`;
    let totalDataPrice = document.querySelector('[data-total-price]');
    totalDataPrice.innerHTML = priceInnerHtml;

    // size actual price
    if (flagSize == true) {
      let sizeSwatchesPrice = document.querySelectorAll('[data-variant-option-name="size"]');
      for(var i = 0; i < sizeSwatchesPrice.length; i++) {
        if (sizeSwatchesPrice[i].checked) {
          sizeSwatchesPrice[i].nextElementSibling.querySelector('[data-price-difference]').innerHTML = priceInnerHtmlZero;
        }
      }
    }

    // options actual price
    if (flagOptions == true) {
      let optionsSwatchesPrice = document.querySelectorAll('[data-variant-option-name="customOptions"]');
      for(var i = 0; i < optionsSwatchesPrice.length; i++) {
        if (optionsSwatchesPrice[i].checked) {
          optionsSwatchesPrice[i].nextElementSibling.querySelector('[data-price-difference]').innerHTML = priceInnerHtmlZero;
        }
      }
    }
  } else {
    console.warn("No matching option found in optionsData");
  }
}


if (flagSize == true) {
  function sizeDifference(resultSelectedObject, optionsData) {
    let { color, size, options } = resultSelectedObject;
    let matchingOptions = optionsData.filter((option) => {
      return option.color === color && option.options === options;
    });
    if (matchingOptions.length > 0) {
      // size price Difference
      let sizeSwatchesDiffernce = document.querySelectorAll('[data-variant-option-name="size"]');
      for (let i = 0; i < sizeSwatchesDiffernce.length; i++) {
        if (!sizeSwatchesDiffernce[i].checked) {
          let inputValuesSize = sizeSwatchesDiffernce[i].value;
          let matchingOptionsSize = matchingOptions.filter((option) => {
            return option.size === inputValuesSize;
          });
          let pricesSize = matchingOptionsSize.map((matchingOption) => matchingOption.price);
          let deductedPrice = pricesSize - activePrice;
          let sign;
          if (deductedPrice > 0) {
            sign = '+';
          } else if (deductedPrice < 0) {
            sign = '-';
          }
          else if (deductedPrice == 0) {
            sign = '+';
          }
          if (deductedPrice < 0) {
            deductedPrice = Math.abs(deductedPrice);
          }
          sizeSwatchesDiffernce[i].nextElementSibling.querySelector('[data-price-difference]').innerHTML = `<span class="price"><span class="nt-dollar">${sign}NT$</span> ${deductedPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</span>`;
        }
      }
    } else {
      console.warn("No matching options found in optionsData");
    }
  }
  sizeDifference(resultSelectedObject, optionsData);
}

if (flagOptions == true) {
  function optionsDifference(resultSelectedObject, optionsData) {
    let { color, size, options } = resultSelectedObject;
    let matchingOptions = optionsData.filter((option) => {
      return option.color === color && option.size === size;
    });
    if (matchingOptions.length > 0) {
      // options price Difference
      let optionsSwatchesDiffernce = document.querySelectorAll('[data-variant-option-name="customOptions"]');
      for (let i = 0; i < optionsSwatchesDiffernce.length; i++) {
        if (!optionsSwatchesDiffernce[i].checked) {
          let inputValuesOptions = optionsSwatchesDiffernce[i].value;
          let matchingOptionsSize = matchingOptions.filter((option) => {
            return option.options === inputValuesOptions;
          });
          let pricesOptions = matchingOptionsSize.map((matchingOption) => matchingOption.price);
          let deductedPriceOptions = pricesOptions - activePrice;
          let sign;
          if (deductedPriceOptions > 0) {
            sign = '+';
          } 
          else if (deductedPriceOptions < 0) {
            sign = '-';
          }
          else if (deductedPriceOptions == 0) {
            sign = '+';
          }
          if (deductedPriceOptions < 0) {
            deductedPriceOptions = Math.abs(deductedPriceOptions);
          }
          optionsSwatchesDiffernce[i].nextElementSibling.querySelector('[data-price-difference]').innerHTML = `<span class="price"><span class="nt-dollar">${sign}NT$</span> ${deductedPriceOptions.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</span>`;
        }
      }
    } else {
      console.warn("No matching options found in optionsData");
    }
  }
  optionsDifference(resultSelectedObject, optionsData);
}


let quantityInput = document.querySelector('[data-quantity-input]');
quantityInput.value = 1;
}

updateVariantDifference();
let swatchInputs = document.querySelectorAll('[swatch-input]');
swatchInputs.forEach(swatchInput => {
  swatchInput.addEventListener('change', updateVariantDifference);
});

// quantity change total price calculation
function quantityPrice() {
  let finalPrice = document.querySelector('[data-total-price]');
  let quantityInput = document.querySelector('[data-quantity-input]');
  let quantityMnus = document.querySelector('[data-quantity-minus]');
  let quantityPlus = document.querySelector('[data-quantity-plus]');
  function quantityChangeAction() {
    let quantityValue = quantityInput.value;
    let variantPriceChanged = activePriceFinal * quantityValue;
    finalPrice.innerHTML = `<span class="price"><span class="nt-dollar">NT$</span> ${variantPriceChanged.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</span>`;
  }

  quantityMnus.addEventListener('click', function() {
    quantityChangeAction()
  });
  quantityPlus.addEventListener('click', function() {
    quantityChangeAction()
  });
  quantityInput.addEventListener('input', function() {
    quantityChangeAction()
  });
}
quantityPrice();


