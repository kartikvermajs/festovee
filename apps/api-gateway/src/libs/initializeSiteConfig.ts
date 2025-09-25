import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const initializeSiteConfig = async () => {
  try {
    const existingConfig = await prisma.site_config.findFirst();
    if (!existingConfig) {
      await prisma.site_config.create({
        data: {
          categories: [
            "Electronics",
            "Mobile",
            "Home",
            "Furniture",
            "Fashion",
            "Footwear",
            "Beauty",
            "Health",
            "Sports",
            "Toys",
            "Stationary",
            "Automobile Spare Parts",
            "Hardware Tools",
            "Lightings",
            "Grocery",
          ],
          subCategories: {
            "Electronics": ["TV", "Laptop", "Camera", "Speakers"],
            "Mobile": ["Smartphones", "Feature Phones", "Accessories"],
            "Home": ["Decor", "Kitchen", "Cleaning Supplies"],
            "Furniture": ["Sofas", "Beds", "Tables", "Chairs"],
            "Fashion": ["Men's Clothing", "Women's Clothing", "Kids' Clothing"],
            "Footwear": ["Men's Shoes", "Women's Shoes", "Sports Shoes"],
            "Beauty": ["Skincare", "Makeup", "Haircare"],
            "Health": ["Supplements", "Medical Equipment", "Personal Care"],
            "Sports": ["Fitness Equipment", "Outdoor", "Indoor Games"],
            "Toys": ["Action Figures", "Educational Toys", "Board Games"],
            "Stationary": ["Pens", "Notebooks", "Art Supplies"],
            "Automobile Spare Parts": ["Engine Parts", "Tyres", "Batteries"],
            "Hardware Tools": ["Power Tools", "Hand Tools", "Safety Gear"],
            "Lightings": ["LED", "Bulbs", "Lamps"],
            "Grocery": ["Fruits", "Vegetables", "Staples", "Beverages"],
          },
        },
      });
    }
  } catch (error) {
    console.log("Error initializing site config",error);
  }
};

export default initializeSiteConfig;
