const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");

dotenv.config();

const products = [
  {
    name: "Classic White T-Shirt",
    price: 499,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80",
    category: "T-Shirts"
  },
  {
    name: "Blue Denim Jeans",
    price: 1499,
    image: "https://lsco.scene7.com/is/image/lsco/001UP0002-alt4-pdp?fmt=jpeg&qlt=70&resMode=sharp2&fit=crop,1&op_usm=0.6,0.6,8&wid=2000&hei=2500",
    category: "Jeans"
  },
  {
    name: "Running Shoes",
    price: 2999,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
    category: "Shoes"
  },
  {
    name: "Black Hoodie",
    price: 1299,
    image: "https://i5.walmartimages.com/asr/06539a68-38fa-48f6-8643-d9ebc9fe0363.c3a7bd414f8fd1b5b3de17b8d4830649.jpeg",
    category: "Hoodies"
  },
  {
    name: "Smartphone",
    price: 15999,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80",
    category: "Phones"
  },
  {
    name: "Leather Watch",
    price: 3999,
    image: "https://cdn.tuebucketcache.com/uploader/aec9087a5fa3b6cb583ebd41c082a4ca53dde34f5f78a021f1fa94160f3c727c.jpg?x-oss-process=image/resize,m_lfit,w_718",
    category: "Watches"
  },
  {
    name: "Makeup Kit",
    price: 999,
    image: "https://png.pngtree.com/png-clipart/20250207/original/pngtree-luxury-makeup-kit-with-eyeshadow-and-lipstick-isolated-on-transparent-background-png-image_20375109.png",
    category: "Makeup"
  },
  {
    name: "Red Lipstick",
    price: 499,
    image: "https://tse4.mm.bing.net/th/id/OIP.4hqdnJDQT_H_Onwd1vifVQHaFW?pid=Api&h=220&P=0",
    category: "Lipsticks"
  },
  {
    name: "Travel Bag",
    price: 2199,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
    category: "Bags"
  },
  {
    name: "Sunglasses",
    price: 899,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=80",
    category: "Accessories"
  },
  {
    name: "Wireless Headphones",
    price: 2499,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
    category: "Electronics"
  },
  {
    name: "Gaming Laptop",
    price: 75999,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80",
    category: "Electronics"
  },
  {
    name: "Floral Perfume",
    price: 1999,
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80",
    category: "Fragrance"
  },
  {
    name: "Ceramic Coffee Mug",
    price: 799,
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=800&q=80",
    category: "Home"
  },
  {
    name: "Portable Blender",
    price: 1299,
    image: "https://images.unsplash.com/photo-1519096845289-8d75e0d469c2?auto=format&fit=crop&w=800&q=80",
    category: "Kitchen"
  }
];

const seed = async () => {
  try {
    const primaryMongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/shop-ease";
    const fallbackMongoUri = "mongodb://127.0.0.1:27017/shop-ease";

    const connectWithFallback = async (uri) => {
      try {
        await mongoose.connect(uri, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          serverSelectionTimeoutMS: 3000
        });
        return uri;
      } catch (err) {
        if (uri !== fallbackMongoUri) {
          return connectWithFallback(fallbackMongoUri);
        }
        throw err;
      }
    };

    await connectWithFallback(primaryMongoUri);
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log("Seeded products successfully.");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seed();
