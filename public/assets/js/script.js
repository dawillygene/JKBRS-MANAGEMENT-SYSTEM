(function($) {
    "use strict";

    // Page Loading
    document.addEventListener('DOMContentLoaded', function() {
        const preloader = document.querySelector('.page-loading');

        function removePreloader() {
            preloader.classList.remove('active');
            setTimeout(function() {
                preloader.remove();
            }, 1500);
        }
        removePreloader();
    });



    // Back To Top
    var backButton = document.createElement("button");
    backButton.id = "back-to-top";
    backButton.title = "Go to top";
    backButton.textContent = "Top";
    document.body.appendChild(backButton);
    window.onscroll = function() {
        scrollFunction();
    };
    function scrollFunction() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            backButton.style.display = "block";
        } else {
            backButton.style.display = "none";
        }
    }
    backButton.onclick = function() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    };

    // AOS Animation
    AOS.init();
    AOS.refresh();

    // Tooltip
    $(function() {
        $('[data-bs-toggle="tooltip"]').tooltip();
    });

    // Quantity Button
    document.addEventListener('DOMContentLoaded', function() {
        const productRows = document.querySelectorAll('.product-row');
        productRows.forEach(function(row) {
            const quantityInput = row.querySelector('.quantity-input');
            const decrementBtn = row.querySelector('.decrement-btn');
            const incrementBtn = row.querySelector('.increment-btn');
            decrementBtn.addEventListener('click', function() {
                decrementQuantity(quantityInput);
            });
            incrementBtn.addEventListener('click', function() {
                incrementQuantity(quantityInput);
            });
        });

        function decrementQuantity(input) {
            let currentQuantity = parseInt(input.value, 10);
            if (currentQuantity > 1) {
                input.value = currentQuantity - 1;
            }
        }

        function incrementQuantity(input) {
            let currentQuantity = parseInt(input.value, 10);
            input.value = currentQuantity + 1;
        }
    });

})(window.jQuery);