const {
  findCart,
  createCart,
  calculateSubTotal,
} = require("../helpers/cartHelpers");
const { findProduct } = require("../helpers/productHelpers");

async function getCart(req, res, next) {
  try {
    //get cart via params/userid/auth
    //findCart(id)

    const cart = await findCart();
    if (!cart) {
      return res.status(404).json({
        type: "invalid",
        message: "Cart not found",
      });
    }

    return res.status(200).json(cart);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      type: "invalid",
      message: "Something went wrong",
      error: error,
    });
  }
}

async function addToCart(req, res, next) {
  try {
    const productId = req.body.productId;
    const quantity = parseInt(req.body.quantity);

    //get cart via userid/auth
    //findCart(id)
    const cart = await findCart();
    const product = await findProduct(productId);

    //if dealing with out of stock product
    if (!product) {
      return res.status(500).json({
        type: "Product not Found",
        message: "Invalid request",
      });
    }

    if (cart) {
      //check for item in cart
      const index = cart.items.findIndex(
        (item) => item.productId === productId
      );

      //if item isn't found, push to cart
      if (index === -1) {
        cart.items.push({
          productId: productId,
          name: product.name,
          image: product.image,
          quantity: quantity,
          price: product.price,
          total: (product.price * quantity).toFixed(2),
        });

        //if found, update quantity
      } else {
        cart.items[index].quantity = cart.items[index].quantity + quantity;
        cart.items[index].total = (
          cart.items[index].quantity * product.price
        ).toFixed(2);
        cart.items[index].price = product.price;
      }
      //calculate subtotal
      await calculateSubTotal(cart);

      const data = await cart.save();
      return res.status(200).json(data);
    } else {
      //new cart
      const newCart = {
        items: [
          {
            productId: productId,
            name: product.name,
            image: product.image,
            quantity: quantity,
            price: product.price,
            total: (product.price * quantity).toFixed(2),
          },
        ],
        subTotal: (product.price * quantity).toFixed(2),
      };

      const data = await createCart(newCart);
      return res.status(201).json(data);
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      type: "invalid",
      message: "Something went wrong",
      error: error,
    });
  }
}

async function deleteFromCart(req, res, next) {
  try {
    const cart = await findCart();
    const productId = req.params.productId;
    if (cart) {
      cart.items = cart.items.filter((item) => item.productId !== productId);
      if (!cart.items.length) {
        //empty cart
        cart.subTotal = 0;
      } else {
        await calculateSubTotal(cart);
      }
      const data = await cart.save();

      return res.status(200).json(data);
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      type: "invalid",
      message: "Something went wrong",
      error: error,
    });
  }
}

async function updateCart(req, res, next) {
  try {
    const productId = req.body.productId;
    const quantity = parseInt(req.body.quantity);

    const product = await findProduct(productId);

    //if dealing with out of stock product
    if (!product) {
      return res.status(500).json({
        type: "Product not Found",
        message: "Invalid request",
      });
    }

    const cart = await findCart();
    if (cart) {
      const index = cart.items.findIndex(
        (item) => item.productId === productId
      );

      if (index !== -1) {
        if (quantity === 0) {
          cart.items = cart.items.filter(
            (item) => item.productId !== productId
          );
          if (!cart.items.length) {
            //empty cart
            cart.subTotal = 0;
          } else {
            await calculateSubTotal(cart);
          }

          const data = await cart.save();

          return res.status(200).json(data);
        } else {
          cart.items[index].quantity = cart.items[index].quantity = quantity;
          cart.items[index].total = (
            cart.items[index].quantity * product.price
          ).toFixed(2);
          cart.items[index].price = product.price;
        }

        await calculateSubTotal(cart);

        const data = await cart.save();

        return res.status(200).json(cart.items[index]);
      } else {
        return res.status(500).json({
          type: "Product not found",
          message: "Invalid request",
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      type: "invalid",
      message: "Something went wrong",
      error: error,
    });
  }
}

async function checkoutCart(req, res, next) {
  try {
    const cart = await findCart();
    if (cart) {
      cart.items = [];
      cart.subTotal = 0;
      const data = await cart.save();

      //process payment/save order in database (users)

      return res.status(200).json(data);
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      type: "invalid",
      message: "Something went wrong",
      error: error,
    });
  }
}

module.exports = {
  addToCart,
  getCart,
  deleteFromCart,
  updateCart,
  checkoutCart,
};
