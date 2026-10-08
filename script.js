// ========================================
// CAMPUS KART
// ========================================


// Default products
const defaultProducts = [

    {
        id: 1,
        name: "Engineering Drawing Kit",
        price: 450,
        category: "Engineering",
        seller: "Rahul",
        contact: "9876543210",
        location: "CGC Campus",
        description:
            "Good condition engineering drawing instruments. Useful for first-year students.",
        icon: "📐"
    },

    {
        id: 2,
        name: "Data Structures Book",
        price: 250,
        category: "CSE",
        seller: "Aman",
        contact: "9876543211",
        location: "CGC Campus",
        description:
            "DSA reference book with important concepts and practice questions.",
        icon: "📘"
    },

    {
        id: 3,
        name: "Scientific Calculator",
        price: 500,
        category: "Engineering",
        seller: "Priya",
        contact: "9876543212",
        location: "Jhanjeri Campus",
        description:
            "Scientific calculator in working condition.",
        icon: "🧮"
    },

    {
        id: 4,
        name: "DBMS Notes",
        price: 100,
        category: "CSE",
        seller: "Arjun",
        contact: "9876543213",
        location: "CGC Campus",
        description:
            "Semester notes covering important DBMS topics.",
        icon: "📚"
    },

    {
        id: 5,
        name: "MBA Management Book",
        price: 300,
        category: "MBA",
        seller: "Neha",
        contact: "9876543214",
        location: "CGC Campus",
        description:
            "Useful management textbook for MBA students.",
        icon: "📖"
    }

];


// Load products
let products =
    JSON.parse(localStorage.getItem("campusKartProducts"))
    || defaultProducts;


// DOM elements
const productContainer =
    document.getElementById("productContainer");

const searchInput =
    document.getElementById("searchInput");

const categoryFilter =
    document.getElementById("categoryFilter");

const itemCount =
    document.getElementById("itemCount");

const noProducts =
    document.getElementById("noProducts");

const sellForm =
    document.getElementById("sellForm");


// ========================================
// DISPLAY PRODUCTS
// ========================================

function displayProducts() {

    const searchValue =
        searchInput.value.toLowerCase().trim();

    const selectedCategory =
        categoryFilter.value;


    const filteredProducts =
        products.filter(product => {

            const matchesSearch =
                product.name
                    .toLowerCase()
                    .includes(searchValue)
                ||
                product.description
                    .toLowerCase()
                    .includes(searchValue);

            const matchesCategory =
                selectedCategory === "all"
                ||
                product.category === selectedCategory;

            return matchesSearch && matchesCategory;

        });


    productContainer.innerHTML = "";


    itemCount.textContent =
        `${filteredProducts.length} Items`;


    if (filteredProducts.length === 0) {

        noProducts.style.display = "block";

        return;

    }


    noProducts.style.display = "none";


    filteredProducts.forEach(product => {

        const card =
            document.createElement("div");

        card.className = "product-card";


        card.innerHTML = `

            <div class="product-image">
                ${product.icon}
            </div>

            <div class="product-content">

                <span class="category">
                    ${product.category}
                </span>

                <h3>
                    ${product.name}
                </h3>

                <p class="product-description">
                    ${product.description}
                </p>

                <div class="price">
                    ₹${product.price}
                </div>

                <div class="seller">

                    👤 ${product.seller}
                    <br>

                    📍 ${product.location}

                </div>

                <button
                    class="contact-btn"
                    onclick="contactSeller('${product.contact}')">

                    Contact Seller

                </button>

            </div>

        `;


        productContainer.appendChild(card);

    });

}


// ========================================
// CONTACT SELLER
// ========================================

function contactSeller(contact) {

    alert(
        "Seller Contact Number: " + contact
    );

}


// ========================================
// ADD NEW PRODUCT
// ========================================

sellForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const name =
            document.getElementById(
                "itemName"
            ).value;


        const price =
            document.getElementById(
                "itemPrice"
            ).value;


        const category =
            document.getElementById(
                "itemCategory"
            ).value;


        const seller =
            document.getElementById(
                "sellerName"
            ).value;


        const contact =
            document.getElementById(
                "sellerContact"
            ).value;


        const location =
            document.getElementById(
                "itemLocation"
            ).value;


        const description =
            document.getElementById(
                "itemDescription"
            ).value;


        const newProduct = {

            id: Date.now(),

            name: name,

            price: Number(price),

            category: category,

            seller: seller,

            contact: contact,

            location: location,

            description: description,

            icon: getCategoryIcon(category)

        };


        products.push(newProduct);


        saveProducts();


        displayProducts();


        sellForm.reset();


        alert(
            "🎉 Your item has been successfully listed on Campus Kart!"
        );


        document
            .getElementById("marketplace")
            .scrollIntoView({
                behavior: "smooth"
            });

    }
);


// ========================================
// CATEGORY ICON
// ========================================

function getCategoryIcon(category) {

    const icons = {

        Engineering: "📐",

        CSE: "💻",

        BCA: "🖥️",

        MBA: "💼",

        Books: "📚",

        Stationery: "✏️",

        Other: "📦"

    };


    return icons[category] || "📦";

}


// ========================================
// SAVE PRODUCTS
// ========================================

function saveProducts() {

    localStorage.setItem(
        "campusKartProducts",
        JSON.stringify(products)
    );

}


// ========================================
// SEARCH
// ========================================

searchInput.addEventListener(
    "input",
    displayProducts
);


categoryFilter.addEventListener(
    "change",
    displayProducts
);


// ========================================
// INITIAL LOAD
// ========================================

displayProducts();
