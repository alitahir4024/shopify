const top_items_count = document.querySelector('.items-count'),
    bottom_items_count = document.querySelector('.bottom-items-count'),
    exit = document.querySelector('.exit'),
    bucket = document.querySelector('.cart').style;

var items = document.querySelectorAll('.items');

top_items_count.innerHTML = count;
bottom_items_count.innerHTML = count;

function openBucket() {
    bucket.visibility = "visible";
    bucket.opacity = "1";
    bucket.zIndex = "9";
    bucket.transition = "all 0.5s";
}

exit.addEventListener('click', () => {
    bucket.visibility = "hidden";
    bucket.opacity = "0";
    bucket.zIndex = "-9";
    bucket.transition = "all 0.5s";
});

var cloth_cart = [];

() => {

    if (localStorage.cloth_cart) {
        cloth_cart = JSON.parse(localStorage.cloth_cart);
        showCart();
    }

}

var qty=1;

for (i = 0; i <= items.length - 1; i++) {
    var count=0;
    items[i].onclick = e => {
        count=count+1
        var itemName = e.target.dataset.item;
        var price = e.target.dataset.price;
        addToCart(itemName, price, qty);
        top_items_count.innerHTML = count;
        bottom_items_count.innerHTML = count;
    }
}

function addToCart(itemName, price,qty) {

    for (var i in cloth_cart) {
        if (cloth_cart[i].Product == itemName) {
            cloth_cart[i].Qty += qty;
            showCart();
            saveCart();
            return;
        }
    }

    var itemArray = {
        Product: itemName,
        Price: price,
        Qty: qty
    }

    cloth_cart.push(itemArray)
    saveCart();
    showCart();
}

function saveCart() {
    if (window.localStorage) {
        localStorage.cloth_cart = JSON.stringify(cloth_cart);
    }
}

function deleteItem(index) {
    cloth_cart.splice(index, 1);
    showCart();
    saveCart();
}

function showCart() {
    if (cloth_cart.length == 0) {
        var _ul = document.querySelector('#ul');
        _ul.innerHTML = "";
        return;
    }

    var _ul = document.querySelector('#ul');
    _ul.innerHTML = "";
    for (var i in cloth_cart) {
        var item = cloth_cart[i];
        var li = document.createElement("li")
        var row = `<span>${item.Product}</span><span onclick='deleteItem(" + i + ")'><i class='fas fa-trash'></i></span><span>${item.Qty}</span><span>${item.Qty * item.Price}</span>`;
        li.innerHTML += row;
        var _ul = document.querySelector('#ul');
        _ul.appendChild(li);
    }
}
