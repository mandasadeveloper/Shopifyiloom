{% comment %} Load More Button {% endcomment %}

  var m_article = $('.m--blog-posts__container').attr('show-mobile-m');
  console.log(m_article);
  $(".content1").slice(0, m_article).show();
  $("#m-loadMore").on("click", function(e){
    e.preventDefault();
    $(".content1:hidden").slice(0, m_article).slideDown();
    if($(".content1:hidden").length == 0) {
      $("#m-loadMore").hide();
    }
  });
    var m_articleee = $('.m_blog-news .m--blog-posts__container').attr('show-mobile-mm');
  console.log(m_articleee);
  $(".content11").slice(0, m_articleee).show();
  $("#m-loadMore-news").on("click", function(e){
    e.preventDefault();
    $(".content11:hidden").slice(0, m_articleee).slideDown();
    if($(".content11:hidden").length == 0) {
      $("#m-loadMore-news").hide();
    }
  });

  var m_article_event = $('.event_blog .mm--blog-posts__container').attr('show-mobile-event');
  console.log(m_article_event);
  $(".content-cus").slice(0, m_article_event).show();
  $("#m-loadMore-event").on("click", function(e){
    e.preventDefault();
    $(".content-cus:hidden").slice(0, m_article_event).slideDown();
    if($(".content-cus:hidden").length == 0) {
      $("#m-loadMore-event").hide();
    }
  });


 var m_article_search = $('.m-search-contain .collection__results').attr('show-mobile-search');
  console.log(m_article_search);
  $(".product-card11").slice(0, m_article_search).show();
  $("#m-loadMore-search").on("click", function(e){
    e.preventDefault();
    $(".product-card11:hidden").slice(0, m_article_search).slideDown();
    if($(".product-card11:hidden").length == 0) {
      $("#m-loadMore-search").hide();
    }
  });



document.addEventListener('DOMContentLoaded', function() {
    var sortForm = document.getElementById('sort-form');
    var selectElement = document.querySelector('.sort-options');
    var mSortButton = document.querySelector('.m-sort');

    if (sortForm && selectElement && mSortButton) {
      selectElement.addEventListener('change', function(event) {
        event.preventDefault();
        mSortButton.click();
      });
    }
  });
var newWindowWidth = $(window).width();
        if (newWindowWidth < 768) {

  var $carousel1 = $('.product-list-m');

var settings = {
    slidesToShow:1,
    slidesToScroll: 1,
    arrows: false,
    speed:300,
    infinite: true,
    slide: '.product-card--blends',
    centerMode: true,
    centerPadding: '127px',
   dots: true,
};

          
function setSlideVisibility1() {
  var visibleSlides1 = $carousel1.find('.slick-slideshow__slide[aria-hidden="false"]');
  $(visibleSlides1).each(function() {
    $(this).css('opacity', 1);
    
  });

  $(visibleSlides1).first().prev().css('opacity', 0);
}

$carousel1.slick(settings);
$carousel1.slick('slickGoTo', 0);
setSlideVisibility1();

$carousel1.on('afterChange', function() {
  setSlideVisibility1();
});




          
var $carousel = $('.m-blog-posts-related');

var settings = {
   slidesToShow:1,
        slidesToScroll: 1,
        arrows: false,
        dots: false,
        speed:300,
        infinite: true,
        slide: '.blog-post-card-related',
       centerMode: true,
      centerPadding: '60px',
};

          
function setSlideVisibility() {
      var visibleSlides = $carousel.find('.slick-slideshow__slide[aria-hidden="false"]');
      $(visibleSlides).each(function() {
      $(this).css('opacity', 1);
      });
      
      $(visibleSlides).first().prev().css('opacity', 0);
      }
      
      $carousel.slick(settings);
      $carousel.slick('slickGoTo', 1);
      setSlideVisibility();
      
      $carousel.on('afterChange', function() {
      setSlideVisibility();
});

      }
      
var $temp = $("<input>");
var $url = $(location).attr('href');

$('.clipboard').on('click', function() {
  $("body").append($temp);
  $temp.val($url).select();
  document.execCommand("copy");
  $temp.remove();
  $("#copy-notification").css('visibility', 'visible');
  $("#copy-notificationn").css('visibility', 'visible');
  $("#copy-notificationn").text("地址已複製");
  var svgMarkup = '<svg class="copy-close" width="18" height="18" viewBox="0 0 23 25" fill="none" xmlns="http://www.w3.org/2000/svg">' +
    '<path d="M1 1L22 24" stroke="#F4F4F4"/>' +
    '<path d="M1 24L22 0.999999" stroke="#F4F4F4"/>' +
    '</svg>';
 var svgMarkupp = '<svg class="copy-close" width="11" height="11" viewBox="0 0 23 25" fill="none" xmlns="http://www.w3.org/2000/svg">' +
    '<path d="M1 1L22 24" stroke="#F4F4F4"/>' +
    '<path d="M1 24L22 0.999999" stroke="#F4F4F4"/>' +
    '</svg>';

    $("#copy-notificationn").append(svgMarkupp);
    $("#copy-notification").text("地址已複製");
    $("#copy-notification").append(svgMarkup);
    $(".copy-close").on("click", function() {
    $("#copy-notificationn").css('visibility', 'hidden');
    $("#copy-notification").css('visibility', 'hidden');
    });
    // Automatically hide the notification after 10 seconds
    setTimeout(function() {
    $("#copy-notification").css('visibility', 'hidden');
    $("#copy-notificationn").css('visibility', 'hidden');
    }, 2500);
})

$(".eye-closed, .fa-eye-slash").click(function() {
  var icon = $('.form-control').find('.fa-eye-slash');
  var iconn = $('.form-control').find('.eye-closed');
  var input = $($(this).attr("toggle"));

  if (input.attr("type") == "password") {
    input.attr("type", "text");
    icon.css('display', 'none');
    iconn.css('display', 'block');
  } else {
    input.attr("type", "password");
    icon.css('display', 'block');
    iconn.css('display', 'none');
  }
});

// Cart Page select all product 
var selectAllItems = ".select-all";
var checkboxItem = ":checkbox";

$(selectAllItems).click(function() {
  
  if (this.checked) {
    $(checkboxItem).each(function() {
      this.checked = true;
      console.log('check');
    });
  } else {
    $(checkboxItem).each(function() {
      this.checked = false;
      $(selectAllItems).removeAttr( "checked" );
    });
  }
  
});

//  mk-mds check box update
let priceupdate = [];
$(".order-summary__body .cart__row").each(function() {
    var item_id = $(this).attr('data-prd-id');
    priceupdate.push(item_id);
});
console.log("data---" , priceupdate);

// $(".checkbox-item").on("click", function(){
//     var updates = {};
//     var item_id1 = $(this).closest('.cart__row').attr('data-prd-id');
//     var qty = $(this).closest('.cart__row').find('.cart__qty-input').val();
//     var selectedItemPrice =  $(this).closest('.cart__row').find(".price-m-cart11 .price").text().trim();
//     console.log("Price1:", selectedItemPrice);
//     // console.log("selectedItemPrice1:", selectedItemPrice);
//     if(!priceupdate.includes(item_id1)) addItem(item_id1,qty,selectedItemPrice);
//     else removeItem(item_id1,qty,selectedItemPrice);
// });
function addItem(id,qty,selectedItemPrice){
  fetch(window.Shopify.routes.root + 'cart/add.js', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
     body: JSON.stringify({ item:[
      {
        id,quantity:qty
      }
    ]})
    
    })
    .then(response => {
      return response.json();
    })
    .then((state) => {
      console.log("stateadd" ,state);
      updateCartCounter();
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

function removeItem(id,qty,selectedItemPrice){
    let updates = {};
  fetch(window.Shopify.routes.root + 'cart/update.js', {
    method: 'POST',
    headers: {
     'Content-Type': 'application/json'
    },
    body: JSON.stringify({ update:{
          id,quantity:0
        }
      })
      // body: JSON.stringify({updates})
    })
    
    .then(response => {
      return response.json();
    })
    
    .then((state) => {
      console.log("stateremove" ,state);
      updateCartCounter();
    let total = state.items_subtotal_price;
        // const totalPrice = $(state).find('.total-price').text(); // Adjust selector as needed
        // const formattedPrice = "{{ " + total + " | money }}"; // Adjust the Liquid syntax as needed
        // var totalPrice = state.total_price;

        // Update the total price display on the page
        // const formattedPrice =   $('.total-price').html(Shopify.formatMoney(totalPrice));
        // console.log("formattedPrice",formattedPrice);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

// document.addEventListener('theme:variant:change', function(event) {
//     var variant = event.detail.variant;
//     var container = event.target;
//     if (variant) {
//       console.log('Container ———————— ↓');
//       console.log(container);
//       console.log('Variant —————————— ↓');
//       console.log(variant);
//     }
//   });

//   document.addEventListener('theme:cart:change', function(event) {
//     var cart = event.detail.cart;
//     if (cart) {
//       console.log('Cart ———————————— ↓');
//       console.log(cart);
//     }
//   });

// function updateCartCounterdata(selectedItemPrice) {
// fetch('/cart.js')
//         .then(response => response.json())
//           .then(data => {
//             // Calculate subtotal of selected item
//             let subtotal = selectedItemPrice * data.items[0].quantity; // Assuming only one item is selected
//             alert(subtotal);
//             // Calculate new total price
//             let totalPrice = parseFloat(data.total_price) - subtotal;
            
//             // Update UI
//             document.querySelector('.total-price').innerText = totalPrice.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
//         })
//         .catch(error => {
//             console.error('Error fetching cart data:', error);
//         });
// }

//remove checked items
$(".delete-product").on("click", function(e) {
  e.preventDefault();
  let updates = {};
  $(".cart__row input:checked").each(function() {
      var item_id = $(this).parents('.cart__row').attr('data-prd-id');
       console.log(item_id);
        updates[item_id] = 0;
        console.log(updates);
        });
    fetch(window.Shopify.routes.root + 'cart/update.js', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({ updates })
        
        })
        .then(response => {
        return response.json();
        })
        .then((state) => {
          // updateCartCounter();
          // location.reload();
        })
        .catch((error) => {
        console.error('Error:', error);
        });
});

//remove checked items

// Cart update
$(document).on("click", ".qty-btn-plus, .qty-btn-minus" , function()
 {
  var $n = $(this)
    .closest(".m-quantity-cus")
    .find(".quantity-input");

  if ($(this).hasClass("qty-btn-plus")) {
    $n.val(Number($n.val()) + 1);
  } else {
    var amount = Number($n.val());
    if (amount > 0) {
      $n.val(amount - 1);
    }
  }

  var updatedQuantity = $(this).parent('.m-quantity-cus').find('input').val();
  console.log(updatedQuantity);
  var variantId = $(this).parents('.cart__row').attr('data-prd-id');
  console.log(variantId);
  var updates = {};

  // Add the updated quantity for the specific variant
  updates[variantId] = updatedQuantity;

  // Make the AJAX request to update the cart
  
  fetch(window.Shopify.routes.root + 'cart/update.js', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json'
       },
       body: JSON.stringify({updates})
     })
     .then((response) => {
      return response.text();
    })
    .then((state) => {
      const parsedState = JSON.parse(state);
        if (window.location.href.indexOf("cart") > -1) {
        $.ajax({
         url:'/cart',
         type:'GET',
         success: function(data){
           let parser = new DOMParser();
           const doc = parser.parseFromString(data, 'text/html');
           console.log(doc.querySelector(".order-summary__body"));
           $(".update_cart_items").html('');
           $(".update_cart_items").append(doc.querySelector(".order-summary__body"));
             updateCartCounter();
          }
         });
        }
     })
     .catch((error) => {
       console.error('Error:', error);
     });
  
});
// Cart update

// check event
$( ".checkbox-item" ).on( "change", function() {
 var isChecked = $(this).prop("checked");
  
  // Do something based on the checkbox state
  if (isChecked) {
    $('.checkbox-item').each(function() {
      this.checked = true;
      console.log('check-ghvjjhewdw');
      $('.select-all').attr('checked' , true);
    });
    console.log("Checkbox is checked");
    var updatedQuantity = $(this).parents('.cart__row').find('.m-quantity-cus').find('input').val();
    console.log(updatedQuantity);
    var variantId = $(this).parents('.cart__row').attr('data-prd-id');
    console.log(variantId);
    var updates = {};
    // Add the updated quantity for the specific variant
  updates[variantId] = updatedQuantity;

  // Make the AJAX request to update the cart
  
  fetch(window.Shopify.routes.root + 'cart/update.js', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json'
       },
       body: JSON.stringify({updates})
     })
     .then((response) => {
      return response.text();
    })
    .then((responseText) => {
      const data = JSON.parse(responseText);
      const counterEl = document.querySelectorAll('.count-bubble');
       console.log(data.items_subtotal_price);
      counterEl.forEach((element) => {
        element.innerHTML = data.item_count;
      });
      if (window.location.href.indexOf("cart") > -1) {
        $.ajax({
         url:'/cart',
         type:'GET',
         success: function(data){
         let parser1 = new DOMParser();
         const doc1 = parser1.parseFromString(data, 'text/html');
         console.log(doc1.querySelector(".m-total-price"));
         $(".total_cus").html('');
         $(".total_cus").append(doc1.querySelector(".m-total-price"));
         // updateCartCounter();
        }
         });
        }
    })
     .catch((error) => {
       console.error('Error:', error);
     });
   
    
  } else {
    console.log("Checkbox is unchecked");
    $('.select-all').removeAttr( "checked" );
    var updatedQuantity = 0;
    console.log(updatedQuantity);
    var variantId = $(this).parents('.cart__row').attr('data-prd-id');
    console.log(variantId);
    var updates = {};
    // Add the updated quantity for the specific variant
  updates[variantId] = updatedQuantity;

  // Make the AJAX request to update the cart
  
  fetch(window.Shopify.routes.root + 'cart/update.js', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json'
       },
       body: JSON.stringify({updates})
     })
     .then((response) => {
      return response.text();
    })
    .then((responseText) => {
      const data = JSON.parse(responseText);
      const counterEl = document.querySelectorAll('.count-bubble');
       console.log(data.items_subtotal_price);
      counterEl.forEach((element) => {
        element.innerHTML = data.item_count;
      });
      if (window.location.href.indexOf("cart") > -1) {
        $.ajax({
         url:'/cart',
         type:'GET',
         success: function(data){
         let parser1 = new DOMParser();
         const doc1 = parser1.parseFromString(data, 'text/html');
         console.log(doc1.querySelector(".m-total-price"));
         $(".total_cus").html('');
         $(".total_cus").append(doc1.querySelector(".m-total-price"));
         // updateCartCounter();
        }
         });
        }
    })
     .catch((error) => {
       console.error('Error:', error);
     });
    
  }
} );



// all select
$( ".select-all" ).on( "change", function() {
  var isChecked_all = $(this).prop("checked");
  // Do something based on the checkbox state
  if (isChecked_all) {
    console.log("Checkbox is checked all");

     let updates = {};
    $(".cart__row input").each(function() {
      var item_id = $(this).parents('.cart__row').attr('data-prd-id');
      var item_qty = $(this).parents('.order-summary').find('.cart__row').find('.m-quantity-cus').find('input').val();
      console.log(item_qty);
        updates[item_id] = item_qty;
        console.log(updates);
        });
    fetch(window.Shopify.routes.root + 'cart/update.js', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({ updates })
        
        })
        .then((response) => {
      return response.text();
    })
    .then((responseText) => {
      const data = JSON.parse(responseText);
      const counterEl = document.querySelectorAll('.count-bubble');
       console.log(data.items_subtotal_price);
      counterEl.forEach((element) => {
        element.innerHTML = data.item_count;
      });
      if (window.location.href.indexOf("cart") > -1) {
        $.ajax({
         url:'/cart',
         type:'GET',
         success: function(data){
         let parser1 = new DOMParser();
         const doc1 = parser1.parseFromString(data, 'text/html');
         console.log(doc1.querySelector(".m-total-price"));
         $(".total_cus").html('');
         $(".total_cus").append(doc1.querySelector(".m-total-price"));
         // updateCartCounter();
        }
         });
        }
    })
        .catch((error) => {
        console.error('Error:', error);
        });
     




  } else {
    console.log("Checkbox is unchecked all");
    let updates = {};
    $(".cart__row input").each(function() {
      var item_id = $(this).parents('.cart__row').attr('data-prd-id');
        updates[item_id] = 0;
        console.log(updates);
        });
    fetch(window.Shopify.routes.root + 'cart/update.js', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({ updates })
        
        })
        .then((response) => {
      return response.text();
    })
    .then((responseText) => {
      const data = JSON.parse(responseText);
      const counterEl = document.querySelectorAll('.count-bubble');
       console.log(data.items_subtotal_price);
      counterEl.forEach((element) => {
        element.innerHTML = data.item_count;
      });
      if (window.location.href.indexOf("cart") > -1) {
        $.ajax({
         url:'/cart',
         type:'GET',
         success: function(data){
         let parser1 = new DOMParser();
         const doc1 = parser1.parseFromString(data, 'text/html');
         console.log(doc1.querySelector(".m-total-price"));
         $(".total_cus").html('');
         $(".total_cus").append(doc1.querySelector(".m-total-price"));
         // updateCartCounter();
        }
         });
        }
    })
        .catch((error) => {
        console.error('Error:', error);
        });
  }
});
// all select


// check event


// Bubble update

function updateCartCounter() {
  fetch('/cart.js')
    .then(response => response.text())
    
    .then((responseText) => {
      const data = JSON.parse(responseText);
      const counterEl = document.querySelectorAll('.count-bubble');
       console.log(data.items_subtotal_price);
      counterEl.forEach((element) => {
        element.innerHTML = data.item_count;
      });
      if (window.location.href.indexOf("cart") > -1) {
        $.ajax({
         url:'/cart',
         type:'GET',
         success: function(data){
         let parser1 = new DOMParser();
         const doc1 = parser1.parseFromString(data, 'text/html');
         console.log(doc1.querySelector(".m-total-price"));
         $(".total_cus").html('');
         $(".total_cus").append(doc1.querySelector(".m-total-price"));
         // updateCartCounter();
        }
         });
        }
    })
}

// Bubble update


// Search icon
// $(window).on('load', function() {
//    $(".m-text-subduedd").css({"display": "none"});
//   $(".m-close-btn").css({"display": "none"});
//   document.getElementsByClassName("search-input input").blur();
// });
//  $(".search-input input").focus(function() {
//         $(".m-text-subduedd").css({"display": "block"});
//      $(".m-close-btn").css({"display": "block"});
//      $(".m-search-icon").css({"display": "none"});
// });
// Search icon