function bodyLoad(){
  LoadCategories();
  LoadProducts("https://fakestoreapi.com/products");
  categoryChange();
  document.getElementById('login').addEventListener('shown.bs.modal', function () {
  document.querySelector('input[name="username"]').focus();
});
}


 function LoadCategories(){
            fetch("https://fakestoreapi.com/products/categories")
            .then(function(response){
                return response.json();
            })
            .then(function(categories){
                categories.unshift("all");
                categories.map(function(category){
                    var option=document.createElement("option");
                    option.text=category.toUpperCase();
                    option.value=category;
                    document.getElementById("lstCategories").appendChild(option);
                })
            })
        }

        function LoadProducts(url="https://fakestoreapi.com/products"){
    document.getElementById("spinner").style.display = "flex";
    document.getElementById("products").innerHTML = "";
    fetch(url)
    .then(function(response){
        if(!response.ok) throw new Error("Network response was not ok");
        return response.json();
    })
    .then(function(products){
         document.getElementById("spinner").style.display = "none";
        products.map(function(product){
            var div = document.createElement("div");
            div.className = "card p-2 m-2";
            div.style.width = "200px";
            div.innerHTML = `
                <img src=${product.image} height="140" class="card-img-top">
                <div class="card-header" style="height:140px;">
                    <div>${product.title}</div>
                </div>
                <div class="card-body">
                    <dl>
                        <dt>Price</dt>
                        <dd>${product.price}</dd>
                        <dt>Rating</dt>
                        <dd>${product.rating.rate} <span class="bi bi-star-fill text-success"></span> [${product.rating.count}]</dd>
                    </dl>
                </div>
                <div class="card-footer">
                    <button onclick="AddClick(${product.id})" class="btn btn-danger w-100">
                        <span class="bi bi-cart4"></span>
                        Add to Cart
                    </button>
                </div>
            `;
            document.getElementById("products").appendChild(div);
        });
        document.getElementById("spinner").style.display = "none";
    })
    .catch(function(error){
        document.getElementById("spinner").style.display = "none";
        console.error(error);
    });
}



         function categoryChange(){
            var categoryName=document.getElementById("lstCategories").value;
            if(categoryName=="all"){
                LoadProducts('https://fakestoreapi.com/products');
            }else{
                LoadProducts(`https://fakestoreapi.com/products/category/${categoryName}`);
            }
        }

        var cartItems=[];
        
        function GetCartCount(){
            document.getElementById("lblCount").innerText=cartItems.length;    
        }
        function AddClick(id){
            fetch(`https://fakestoreapi.com/products/${id}`)
            .then(function(response){
                return response.json();
            })
            .then(function(product){
                cartItems.push(product);
                alert(`${product.title} \n Added to Cart`);
                GetCartCount();
            })

        }

          function ShowCart(){
            document.querySelector("tbody").innerHTML="";
            cartItems.map(function(item){
                var tr=document.createElement("tr");
                var tdTitle=document.createElement("td");
                var tdImage=document.createElement("td");
                var tdPrice=document.createElement("td");

                tdTitle.innerHTML=item.title;
                tdImage.innerHTML=`<img src=${item.image} width="50" height="50">`;
                tdPrice.innerHTML=item.price;
              
                tr.appendChild(tdTitle);
                tr.appendChild(tdImage);
                tr.appendChild(tdPrice);

                document.querySelector("tbody").appendChild(tr);

        
             })
        }

        document.addEventListener('DOMContentLoaded', function() {
  const btn = document.getElementById('backToTop');
  window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
      btn.style.display = 'block';
    } else {
      btn.style.display = 'none';
    }
  });
  btn.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});
 
 
document.addEventListener('DOMContentLoaded', function() {
    const patterns = {
        IN: "^\\d{10}$",
        US: "^\\d{10}$",
        UK: "^\\d{10}$",
        RUS: "^\\d{10}$",
        AUS: "^\\d{9}$"
    };

    const countrySelect = document.getElementById('countryCode');
    const mobileInput = document.getElementById('mobileInput');

    if (countrySelect && mobileInput) {
        countrySelect.addEventListener('change', function() {
            const country = this.value;
            mobileInput.pattern = patterns[country] || "\\d+";
            switch(country) {
                case 'IN':
                    mobileInput.title = "Indian mobile number must be exactly 10 digits.";
                    break;
                case 'US':
                    mobileInput.title = "US mobile number must be exactly 10 digits.";
                    break;
                case 'UK':
                    mobileInput.title = "UK mobile number must be exactly 10 digits.";
                    break;
                case 'RUS':
                    mobileInput.title = "Russian mobile number must be exactly 10 digits.";
                    break;
                case 'AUS':
                    mobileInput.title = "Australian mobile number must be exactly 9 digits.";
                    break;
                default:
                    mobileInput.title = "Enter a valid mobile number.";
            }
        });
    }
});


