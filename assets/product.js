document.addEventListener('DOMContentLoaded', () => {
  var colorOptionElement = document.querySelector('.color-option');
  var skuElement = document.querySelector('.product-info__sku');
  var reactStoreElement = document.getElementById('react-store');
  var previousColorValue = colorOptionElement.textContent.trim();
  var previousSkuValue = skuElement.textContent.trim();
  previousSkuValue = previousSkuValue.replace(/\s+/g, '').replace('品號', '');

  if (colorOptionElement && skuElement && reactStoreElement) {
    // Set initial values to data attributes
    reactStoreElement.setAttribute('data-color', previousColorValue);
    reactStoreElement.setAttribute('data-item', previousSkuValue);

    // Create MutationObservers for color option and SKU
    var colorObserver = new MutationObserver(updateDataColorAttribute);
    var skuObserver = new MutationObserver(updateDataItemAttribute);

    // Configure and start the observers
    var observerConfig = { childList: true, subtree: true };
    colorObserver.observe(colorOptionElement, observerConfig);
    skuObserver.observe(skuElement, observerConfig);

    // Function to update the data-color attribute
    function updateDataColorAttribute() {
      var colorValue = colorOptionElement.textContent.trim();

      // Check if the value has changed
      if (colorValue !== previousColorValue) {
        // Update the data-color attribute
        reactStoreElement.setAttribute('data-color', colorValue);

        // Update the previousColorValue
        previousColorValue = colorValue;
      }
    }

    // Function to update the data-item attribute
    function updateDataItemAttribute() {
      var skuValue = skuElement.textContent.trim();
      skuValue = skuValue.replace(/\s+/g, '').replace('品號', '');

      // Check if the value has changed
      if (skuValue !== previousSkuValue) {
        // Update the data-item attribute
        reactStoreElement.setAttribute('data-item', skuValue);

        // Update the previousSkuValue
        previousSkuValue = skuValue;
      }
    }
  }

  const shareBtns = document.querySelectorAll('[data-share-btn]');

  shareBtns.forEach(function (shareBtn) {
    const toggleContainer = shareBtn.closest('[data-toggle-container]');
    const shareButtons = toggleContainer.querySelector('[data-toggle-container-inner]');
    const closeContainer = toggleContainer.querySelector('[data-share-btn-close]');

    shareBtn.addEventListener('click', function () {
      shareButtons.style.display = (shareButtons.style.display === 'flex') ? 'none' : 'flex';
      document.body.style.overflowY = 'hidden';
      document.querySelector('.shopify-section--header').style.zIndex = '0';
    });

    if (closeContainer) {
      closeContainer.addEventListener('click', function () {
        shareButtons.style.display = 'none';
        document.body.style.overflowY = 'initial';
        document.querySelector('.shopify-section--header').style.zIndex = '10';
      });
    }
  });

  const shareLinks = document.querySelectorAll('[data-share-link]');
  shareLinks.forEach(function (shareLink) {
    shareLink.addEventListener('click', function (event) {
      copyURL(shareLink);
    });
  });
});

const encodeCurrentURL = encodeURIComponent(window.location.href);
function shareLine() {
  const lineURL = `https://social-plugins.line.me/lineit/share?url=${encodeCurrentURL}`;
  window.open(lineURL, '_blank');
}

function shareFacebook() {
  const facebookURL = `https://www.facebook.com/sharer.php?u=${encodeCurrentURL}`;
  window.open(facebookURL, '_blank');
}

function shareWhatsapp() {
  const whatsappURL = `https://api.whatsapp.com/send/?text=${encodeCurrentURL}`;
  window.open(whatsappURL, '_blank');
}

function copyURL(shareLink) {
  const currentURL = window.location.href;
  navigator.clipboard.writeText(currentURL);

  const toast = shareLink.nextElementSibling;
  if (toast) {
    toast.style.display = 'block';
    setTimeout(() => {
      toast.style.display = 'none';
    }, 2000);
  }
}
