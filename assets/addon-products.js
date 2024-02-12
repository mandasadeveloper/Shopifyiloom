document.addEventListener('DOMContentLoaded', () => {
  const checkAndDispatchEvent = () => {
    const pointerCoarseElements = document.querySelectorAll('[data-quick-button]');

    pointerCoarseElements.forEach((element) => {
      const buttonAriaExpanded = element.querySelector('.button');
      buttonAriaExpanded.addEventListener('click', () => {
        const customEvent = new Event('customConditionMet');
        document.dispatchEvent(customEvent);
      });
    });
  };

  const handleCustomEvent = () => {
    observeQuickBuyDrawer();
  };

  checkAndDispatchEvent();
  document.addEventListener('customConditionMet', handleCustomEvent);

  const observeQuickBuyDrawer = () => {
    const targetNode = document.body;
    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
          if (mutation.addedNodes && mutation.addedNodes.length > 0) {
            for (let i = 0; i < mutation.addedNodes.length; i++) {
              const addedNode = mutation.addedNodes[i];
              if (addedNode.nodeName.toLowerCase() === 'quick-buy-drawer') {
                checkVariants(addedNode); // Pass 'quick-buy-drawer' as a parameter
                observer.disconnect();
                return;
              }
            }
          }
        }
      }
    });

    const config = { childList: true, subtree: true };
    observer.observe(targetNode, config);
  };

  const formatPrice = (price) => {
    const formattedPrice = Math.floor(price);
    return `<span class="price"><span class="nt-dollar">NT$</span> ${formattedPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</span>`;
  }

  const checkVariants = (quickBuyDrawer) => {
    let activePriceFinal = "";
    function updateVariantDifference() {
    //flags for variant options
    let flagColor = false;
    let flagSize = false;
    let flagOptions = false;
    // array for checked values
    let checkedValuesAddon = [];

    // color inputs
    let colorSwatches = quickBuyDrawer.querySelectorAll('.quick-buy-drawer__info [data-variant-option-name="color"]');
    if(colorSwatches.length > 0) {
      for(var i = 0; i < colorSwatches.length; i++) {
        let quickBuyCheck = colorSwatches[i].closest('quick-buy-drawer');
        if (quickBuyCheck != null) {
          if (colorSwatches[i].checked) {
            checkedValuesAddon.push(colorSwatches[i].value);
          }
        }
    }
      flagColor = true;
    }

    // size input
    let sizeSwatches = quickBuyDrawer.querySelectorAll('.quick-buy-drawer__info [data-variant-option-name="size"]');
    if(sizeSwatches.length > 0) {
      for(var i = 0; i < sizeSwatches.length; i++) {
        let quickBuyCheck = sizeSwatches[i].closest('quick-buy-drawer');
        if (quickBuyCheck != null) {
          if (sizeSwatches[i].checked) {
            checkedValuesAddon.push(sizeSwatches[i].value);
          }
        }
      }
      flagSize = true;
    }

    // options input
    let optionsSwatches = quickBuyDrawer.querySelectorAll('.quick-buy-drawer__info [data-variant-option-name="customOptions"]');
    if(optionsSwatches.length > 0) {
      for(var i = 0; i < optionsSwatches.length; i++) {
        let quickBuyCheck = optionsSwatches[i].closest('quick-buy-drawer');
        if (quickBuyCheck != null) {
          if (optionsSwatches[i].checked) {
            checkedValuesAddon.push(optionsSwatches[i].value);
          }
        }
      }
      flagOptions = true;
    }

    // selected input values in object
    let resultSelectedObjectAddon = {};
    if(flagOptions == true && flagSize == true && flagColor == true) {
      resultSelectedObjectAddon.color = checkedValuesAddon[0];
      resultSelectedObjectAddon.size = checkedValuesAddon[1];
      resultSelectedObjectAddon.options = checkedValuesAddon[2];
    }
    else if(flagOptions == false && flagSize == true && flagColor == true) {
      resultSelectedObjectAddon.color = checkedValuesAddon[0];
      resultSelectedObjectAddon.size = checkedValuesAddon[1];
    }
    else if(flagOptions == true && flagSize == false && flagColor == true) {
      resultSelectedObjectAddon.color = checkedValuesAddon[0];
      resultSelectedObjectAddon.options = checkedValuesAddon[1];
    }
    else if(flagOptions == true && flagSize == true && flagColor == false) {
      resultSelectedObjectAddon.size = checkedValuesAddon[0];
      resultSelectedObjectAddon.options = checkedValuesAddon[1];
    }
    else if(flagOptions == false && flagSize == true && flagColor == false) {
      resultSelectedObjectAddon.size = checkedValuesAddon[0];
    }
    else if(flagOptions == true && flagSize == false && flagColor == false) {
      resultSelectedObjectAddon.options = checkedValuesAddon[0];
    }
    else if(flagOptions == false && flagSize == false && flagColor == true) {
      resultSelectedObjectAddon.color = checkedValuesAddon[0];
    }

    // select array objects with all values and prices variants[all]
    let selectMainAddon = quickBuyDrawer.querySelector('.quick-buy-drawer__info [data-variant-select]');
    let optionsDataAddon = [];
    for (var i = 0; i < selectMainAddon.options.length; i++) {
      let option = selectMainAddon.options[i];
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
      else if(flagOptions == false && flagSize == false && flagColor == color) {
        optionData = {
          color: color,
          price: dataPrice
        };
      }
      optionsDataAddon.push(optionData);
    }

    //getting price
    let activePrice = "";

    // apend value for checked 
    function checkedValueAppend(resultSelectedObjectAddon, optionsDataAddon) {
      let matchingOption = {};
      let { color, size, options } = resultSelectedObjectAddon;
      if (flagOptions == true && flagSize == true && flagColor == true) {
        matchingOption = optionsDataAddon.find((option) => {
          return option.color === color && option.size === size && option.options === options;
        });
      } 
      else if (flagOptions == false && flagSize == true && flagColor == true) {
        matchingOption = optionsDataAddon.find((option) => {
          return option.color === color && option.size === size;
        });
      } 
      else if(flagOptions == true && flagSize == false && flagColor == true) {
        matchingOption = optionsDataAddon.find((option) => {
          return option.color === color && option.options === options;
        });
      }
      else if(flagOptions == true && flagSize == true && flagColor == false) {
        matchingOption = optionsDataAddon.find((option) => {
          return option.size === size && option.options === options;
        });
      }
      else if(flagOptions == false && flagSize == true && flagColor == false) {
        matchingOption = optionsDataAddon.find((option) => {
          return option.size === size;
        });
      }
      else if(flagOptions == true && flagSize == false && flagColor == false) {
        matchingOption = optionsDataAddon.find((option) => {
          return option.options === options;
        });
      }
      else if(flagOptions == false && flagSize == false && flagColor == true) {
        matchingOption = optionsDataAddon.find((option) => {
          return option.color === color;
        });
      }
      
      if (matchingOption) {
        let price = matchingOption.price;
        activePrice = price;
        activePriceFinal = price;
        let priceInnerHtmlZero =  `<span class="price"><span class="nt-dollar">+NT$</span> 0</span>`;

        // size actual price
        if (flagSize == true) {
          let sizeSwatchesPrice = quickBuyDrawer.querySelectorAll('.quick-buy-drawer__info [data-variant-option-name="size"]');
          for(var i = 0; i < sizeSwatchesPrice.length; i++) {
            if (sizeSwatchesPrice[i].checked) {
              sizeSwatchesPrice[i].nextElementSibling.querySelector('[data-price-difference]').innerHTML = priceInnerHtmlZero;
            }
          }
        }

        // options actual price
        if (flagOptions == true) {
          let optionsSwatchesPrice = quickBuyDrawer.querySelectorAll('.quick-buy-drawer__info [data-variant-option-name="customOptions"]');
          for(var i = 0; i < optionsSwatchesPrice.length; i++) {
            if (optionsSwatchesPrice[i].checked) {
              optionsSwatchesPrice[i].nextElementSibling.querySelector('[data-price-difference]').innerHTML = priceInnerHtmlZero;
            }
          }
        }
      } else {
        console.log("No matching option found in optionsDataAddon");
      }
    }
    checkedValueAppend(resultSelectedObjectAddon, optionsDataAddon);

    if (flagSize == true) {
      function sizeDifference(resultSelectedObjectAddon, optionsDataAddon) {
        let { color, size, options } = resultSelectedObjectAddon;
        let matchingOptions = optionsDataAddon.filter((option) => {
          return option.color === color && option.options === options;
        });
        if (matchingOptions.length > 0) {
          // size price Difference
          let sizeSwatchesDiffernce = quickBuyDrawer.querySelectorAll('.quick-buy-drawer__info [data-variant-option-name="size"]');
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
              sizeSwatchesDiffernce[i].nextElementSibling.querySelector('.quick-buy-drawer__info [data-price-difference]').innerHTML = `<span class="price"><span class="nt-dollar">${sign}NT$</span> ${deductedPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</span>`;
            }
          }
        } else {
          console.log("No matching options found in optionsDataAddon");
        }
      }
      sizeDifference(resultSelectedObjectAddon, optionsDataAddon);
    }

    if (flagOptions == true) {
      function optionsDifference(resultSelectedObjectAddon, optionsDataAddon) {
        let { color, size, options } = resultSelectedObjectAddon;
        let matchingOptions = optionsDataAddon.filter((option) => {
          return option.color === color && option.size === size;
        });
        if (matchingOptions.length > 0) {
          // options price Difference
          let optionsSwatchesDiffernce = quickBuyDrawer.querySelectorAll('.quick-buy-drawer__info [data-variant-option-name="customOptions"]');
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
          console.log("No matching options found in optionsDataAddon");
        }
      }
      optionsDifference(resultSelectedObjectAddon, optionsDataAddon);
    }

    }
//variant difference
    updateVariantDifference();
    let swatchInputs = quickBuyDrawer.querySelectorAll('.quick-buy-drawer__info [swatch-input]');
    swatchInputs.forEach(swatchInput => {
      swatchInput.addEventListener('change', updateVariantDifference);
    });

  };
});
