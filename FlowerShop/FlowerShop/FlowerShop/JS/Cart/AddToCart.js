import { storage } from "./Storage.js"

function showCartToast() {
    const cartToast = document.getElementById('cart-toast')
    const toast = new bootstrap.Toast(cartToast)
    toast.show();
}

function showCartToastError() {
    const cartToast = document.getElementById('cart-toast-error')
    const toast = new bootstrap.Toast(cartToast)
    toast.show();
}


async function addToDB(uid, ma, sl) {
    // Check duplicate -> update quantity
    let cart = await storage.get(uid);

    let isDuplicate = cart.some((it, indetd) => {
        if (it.ProductId == ma) {
            let res = storage.updateQuantity(uid, ma, sl)
            res ? showCartToast() : showCartToastError();
        }

        return it.ProductId == ma
    })

    if (!isDuplicate) {
        let res = await storage.set(uid, ma, sl)
        res ? showCartToast() : showCartToastError();
    }

}

function addToCart() {
    const uid = $("#user-info").attr("data-uid")
    const addBtn = document.querySelectorAll('.add-to-cart')
    const quantity = document.querySelector('.quantity-select-value')


    if (addBtn) {
        addBtn.forEach(btn => {
            btn.onclick = function () {
                if (uid) {
                    addToDB(uid, btn.dataset.id, quantity && quantity.innerHTML.trim() || 1)
                } else {
                    window.location.href = "/Account/Login"
                }
            }
        })
    }

}

export { addToCart }