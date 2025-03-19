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

    // **Tambah Produk ke Keranjang (Bukan ke WhatsApp Langsung)**
    document.querySelectorAll(".buy-button").forEach(button => {
        button.addEventListener("click", function() {
            const name = this.dataset.name;
            const price = this.dataset.price;

            cart.push({ name, price });
            updateCartUI();
            alert(`${name} telah ditambahkan ke keranjang!`);
        });
    });

    // **Tampilkan Modal Keranjang**
    cartButton.addEventListener("click", () => {
        cartModal.style.display = "flex";
        updateCartUI();
    });

    // **Tutup Modal**
    closeModal.addEventListener("click", () => {
        cartModal.style.display = "none";
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

        // Kosongkan keranjang setelah checkout
        cart = [];
        updateCartUI();
    });

    updateCartUI();
});