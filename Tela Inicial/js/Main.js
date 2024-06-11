let cartIcon = document.querySelector('#cart-icon');
let cart = document.querySelector('.cart')
let closeCart = document.querySelector('#close-cart')

cartIcon.onclick = () => {
  cart.classList.add("active");
};

closeCart.onclick = () => {
  cart.classList.remove("active");
};

if(document.readyState == 'loading'){
  document.addEventListener("DOMContentLoaded",ready);
} else{
  ready();
}

function ready(){
  var removeCartButtons = document.getElementsByClassName('cart-remove')
  console.log(removeCartButtons)
  for (var i = 0; i < removeCartButtons.length; i++){
    var button = removeCartButtons[i]
    button.addEventListener('click', removeCartItem)
  }
}

var quantityInputs = document.getElementsByClassName("cart-quantity");
for (var i = 0; i <quantityInputs.length; i++){
  var input = quantityInputs[i];
  input.addEventListener("change",quantityChanged);
}

var addCart = document.getElementsByClassName ("cart-add");
for (var i = 0; i < addCart.length; i++) {
 var button = addCart[i];
button.addEventListener ("click", addCartClicked);
}



function removeCartItem(event){
  var buttonCliked = event.target
  buttonCliked.parentElement.remove()
  updatetotal();
  
}

function quantityChanged(event){
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
   updatetotal();
}

function addCartClicked (event){
var button = event. target;
var shopProducts = button.parentElement;
var titleElement = shopProducts.getElementsByClassName("product-title")[0];
var title = titleElement ? titleElement.innerText : '';
var priceElement = shopProducts.getElementsByClassName("price")[0];
var price = priceElement ? priceElement.innerText : '';
var productImgElement = shopProducts.getElementsByClassName("product-img")[0];
var productImg = productImgElement ? productImgElement.src : '';
addProductTocart(title, price,productImg);
updateCartIcon();
}

function addProductTocart(title, price, productImg) {
  var cartShopBox = document.createElement('div');
  cartShopBox.classList.add('cart-box')
  var cartItems = document.getElementsByClassName('cart-content')[0]
  var cartItemsNames = cartItems.getElementsByClassName('cart-product-title')
  for (var i = 0; i< cartItemsNames.length; i++) {
    if (cartItemsNames[i].innerText == title){
      alert('333')
      return;
    }
  }

  var cartBoxContent = `
          <img src="${productImg}" alt="" class="cart-img">
          <div class="detail-box">
            <div class="cart-product-title">${title}</div>
            <div class="cart-price">${price}</div>
            <input 
            type="number" 
            name=""
            id=""
            value="1" 
            class="cart-quantity">
          </div>

          <i class='bx bx-trash cart-remove'></i>`;
          cartShopBox.innerHTML = cartBoxContent;
          cartItems.append(cartShopBox);
          cartShopBox.getElementsByTagName(removeCartItem)[0]
          var removeButton = cartShopBox.getElementsByClassName('cart-remove')[0];
            if (removeButton) {
              removeButton.addEventListener('click', removeCartItem);
              } else {
                console.log('Não foi possível encontrar o botão de remover');
    }
          var quantityInput = cartShopBox.getElementsByClassName('cart-quantity')[0];
            if (quantityInput) {
              quantityInput.addEventListener('change', quantityChanged);
             } else {
              console.log('Não foi possível encontrar o input de quantidade');
               }
               
    

}

function updatetotal(){
  var cartContent = document.getElementsByClassName("cart-content")[0];
  var cartBoxes = cartContent.getElementsByClassName("cart-box");
  var total = 0;
  for (var i = 0; i < cartBoxes.length; i++){
    var cartBox = cartBoxes[i];
    var priceElement = cartBox.getElementsByClassName("cart-price")[0];
    var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
    var price = parseFloat(priceElement.innerText.replace("R$",""));
    var quantity = quantityElement.value;
    total = total +(price * quantity);

    document.getElementsByClassName("total-price")[0].innerText = "R$" + total;
  }
  
}

