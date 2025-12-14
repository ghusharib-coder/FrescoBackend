import User from './UserSchema.js';
import Cart from './model.js';
export const SignUpUser = async (req, res) => {
  try {
    const { name, password} = req.body;
    const userExist = await User.findOne({name});
    if (userExist) {
      return res.status(400).json({ message: "User already exists" });
    }
    const user = await User.create({ name, password });
    res.status(201).json({ message: "User registered successfully ✅", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const loginUser = async (req, res) => {
  try {
    const { name, password } = req.body;

    const user = await User.findOne({ name, password });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials ❌" });
    }

    res.json({ message: "Login successful ✅", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const addToCart = async (req, res) => {
  console.log("🧾 Received from frontend:", req.body);
  try {
    const { userId, productId, name, description, price, image } = req.body;

    // Step 1: Find the user's cart
    let cart = await Cart.findOne({ userId });

    // Step 2: Create new cart if not exist
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    // Step 3: Check for duplicates safely
    const existingItem = cart.items.find(
      (item) => item.productId.toString() === productId.toString()
    );

    if (existingItem) {
      console.log("⚠️ Duplicate item detected");
      return res
        .status(400)
        .json({ message: "This product is already in your cart." });
    }

    // Step 4: Add new item
    cart.items.push({ productId, name, description, price, image, quantity: 1 });

    await cart.save();
    console.log("✅ Item added successfully");
    res.status(200).json({ message: "Item added to cart ✅", cart });
  } catch (err) {
    console.error("🔥 Error in addToCart:", err);
    res.status(500).json({ message: "Failed to add item to cart" });
  }
};

export const getCart = async (req, res) => {
  try {
    const { userId } = req.params;
    const cart = await Cart.findOne({ userId });
    res.status(200).json(cart || { items: [] });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch cart" });
  }
};

// ❌ Remove item
export const removeFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter((item) => item.productId !== productId);
    await cart.save();
    res.status(200).json({ message: "Item removed from cart ❌", cart });
  } catch (err) {
    res.status(500).json({ error: "Failed to remove item" });
  }
  
};