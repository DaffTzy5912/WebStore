document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll(".buy-button").forEach(button => {
        button.addEventListener("click", function() {
            const productName = this.dataset.name;
            const productPrice = this.dataset.price;
            buyProduct(productName, productPrice);
        });
    });

    function buyProduct(productName, productPrice) {
        const phoneNumber = "6285736486023";
        const message = `Halo, saya ingin membeli produk *${productName}* seharga *Rp ${parseInt(productPrice).toLocaleString()}*.`;
        window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, "_blank");
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const cartButton = document.getElementById("cart-button");
    const cartModal = document.getElementById("cart-modal");
    const closeModal = document.querySelector(".close-modal");
    const cartItemsList = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    const checkoutButton = document.getElementById("checkout-button");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // **Update UI Keranjang**
    function updateCartUI() {
        cartItemsList.innerHTML = "";
        let total = 0;

        cart.forEach((item, index) => {
            const li = document.createElement("li");
            li.innerHTML = `
                ${item.name} - Rp ${parseInt(item.price).toLocaleString()}
                <button class="remove-item" data-index="${index}">Hapus</button>
            `;
            cartItemsList.appendChild(li);
            total += parseInt(item.price);
        });

        cartTotal.textContent = `Rp ${total.toLocaleString()}`;
        document.getElementById("cart-count").textContent = cart.length;
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    // **Tambah Produk ke Keranjang**
    document.querySelectorAll(".buy-button").forEach(button => {
        button.addEventListener("click", function() {
            const name = this.dataset.name;
            const price = this.dataset.price;

            cart.push({ name, price });
            updateCartUI();
        });
    });

    // **Tampilkan Modal Keranjang**
    cartButton.addEventListener("click", () => {
        cartModal.style.display = "flex";
        updateCartUI();
    });

    // **Tutup Modal Saat Klik Tombol "×"**
    closeModal.addEventListener("click", () => {
        cartModal.style.display = "none";
    });

    // **Tutup Modal Jika Klik di Luar Kotak Modal**
    window.addEventListener("click", function(event) {
        if (event.target === cartModal) {
            cartModal.style.display = "none";
        }
    });

    // **Hapus Produk dari Keranjang**
    cartItemsList.addEventListener("click", function(event) {
        if (event.target.classList.contains("remove-item")) {
            const index = event.target.dataset.index;
            cart.splice(index, 1);
            updateCartUI();
        }
    });

    // **Checkout via WhatsApp**
    checkoutButton.addEventListener("click", () => {
        if (cart.length === 0) {
            alert("Keranjang masih kosong!");
            return;
        }

        const phoneNumber = "6285736486023";
        let message = "Halo, saya ingin membeli:\n\n";
        let total = 0;

        cart.forEach(item => {
            message += `- ${item.name} seharga Rp ${parseInt(item.price).toLocaleString()}\n`;
            total += parseInt(item.price);
        });

        message += `\nTotal: Rp ${total.toLocaleString()}`;
        window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, "_blank");

        cart = [];
        updateCartUI();
    });

    updateCartUI();
});

function toggleCartModal(show) {
    const cartModal = document.getElementById("cart-modal");
    if (show) {
        cartModal.style.display = "flex";
        document.body.style.overflow = "hidden"; // Mencegah scroll
    } else {
        cartModal.style.display = "none";
        document.body.style.overflow = "auto"; // Mengembalikan scroll
    }
}

document.getElementById("cart-button").addEventListener("click", () => {
    toggleCartModal(true);
});

document.querySelector(".close-modal").addEventListener("click", () => {
    toggleCartModal(false);
});

window.addEventListener("click", function(event) {
    if (event.target === document.getElementById("cart-modal")) {
        toggleCartModal(false);
    }
});