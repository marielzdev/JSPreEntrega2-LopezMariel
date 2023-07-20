// Alerta de Ingreso a la pagina de Cursos de idioma y Guias de Viaje / acceses alert of de ecommerce

alert(
  "Desde aquí podrás adquirir mis cursos de idioma y más! Are you ready to join us to tripping?"
);

// cart array
const cart = [];

//sort by minor prices to major prices
const sortMinorMajor = () => {
  products.sort((a, b) => a.price - b.price);
  //console.log(products);
  showListSort();
};

//sort by major prices to minor prices
const sortMajorMinor = () => {
  products.sort((a, b) => b.price - a.price);
  // console.log(products);
  showListSort();
};
//show the list of products
const showListSort = () => {
  const listSort = products.map((product) => {
    return " ~ " + id + product.name + " $ " + product.price;
  });

  alert("Lista de precios:" + "\n\n" + listSort.join("\n"));
  buyProducts(listSort);
};

const buyProducts = (listOfProducts) => {
  let otherProduct = false;
  let productName = "";
  let productQuantity = 0;

  do {
    productName = prompt(
      "¿Qué Curso de idioma o guía de viaje desea comprar?" +
        "\n\n" +
        listOfProducts.join("\n")
    );
    productQuantity = parseInt(prompt("¿Cuántos quieres comprar?"));

    const product = products.find(
      (product) => product.name.toLowerCase() === productName.toLowerCase()
    );

    if (product) {
      addToCart(product, product.id, productQuantity);
    } else {
      alert("El producto no se encuentra en el catálogo.");
    }

    otherProduct = confirm("Desea agregar otro producto?");
  } while (otherProduct);

  confirmBuy();
};
// add to cart
const addToCart = (product, productId, productQuantity) => {
  const productRepeated = cart.find((product) => product.id === productId);
  if (!productRepeated) {
    product.quantity += productQuantity;
    cart.push(product);
  } else {
    productRepeated.quantity += productQuantity;
  }
};
// delete from cart
const deleteCartProduct = (productName) => {
  cart.forEach((product, index) => {
    if (product.name.toLowerCase() === productName) {
      if (product.quantity > 1) {
        product.quantity--;
      } else {
        cart.splice(index, 1);
      }
    }
  });
  confirmBuy();
};
// confirm buy
const confirmBuy = () => {
  const listOfProducts = cart.map((product) => {
    return "- " + product.name + " | Cantidad: " + product.quantity;
  });

  const confirmar = confirm(
    "Checkout: " +
      "\n\n" +
      listOfProducts.join("\n") +
      '\n\nPara continuar haga click "Aceptar" si quiere eliminar haga click en "Cancelar". "'
  );

  if (confirmar) {
    endShipping(listOfProducts);
  } else {
    const productDelete = prompt(
      "Por favor ingrese el nombre del producto a eliminar:"
    );
    deleteCartProduct(productDelete);
  }
};

const endShipping = (listOfProducts) => {
  const quantityTotal = cart.reduce(
    (acc, element) => acc + element.quantity,
    0
  );
  const totalPrice = cart.reduce(
    (acc, element) => acc + element.price * element.quantity,
    0
  );
  alert(
    "Detalle de su compra: " +
      "\n\n" +
      listOfProducts.join("\n") +
      "\n\n" +
      " Total de productos: " +
      quantityTotal +
      "\n\n" +
      "El total de la compra es: $" +
      totalPrice +
      "\n\n" +
      "Gracias por su compra!"
  );
};
