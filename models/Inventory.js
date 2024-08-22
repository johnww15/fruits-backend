const { Schema, model } = require("mongoose");

const inventorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      default: 0,
      min: [0, "Quantity must be positive"],
    },
    price: {
      type: Number,
      required: true,
      default: 0,
      min: [0, "Price must be positive"],
      set: (value) => parseFloat(value.toFixed(2)),
      get: (value) => value.toFixed(2),
    },
    sold: {
      type: Number,
      default: 0,
      min: [0, "Quantity must be positive"],
      validate: {
        validator: function (value) {
          return value <= this.quantity;
        },
        message: "Sold quantity cannot be greater than quantity available",
      },
    },
    //userid with isOwner: true
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { getters: true },
    toObject: { getters: true },
  }
);

// inventorySchema.pre("updateOne", async function (next) {
//   const update = this.getUpdate();
//   console.log("middleware activated");
//   if (update.$inc && update.$inc.sold) {
//     const inventory = await this.model.findById(this.getQuery()._id);
//     if (inventory.sold + update.$inc.sold > inventory.quantity) {
//       return next(new Error("Sold quantity cannot exceed available quantity."));
//     }
//   }
//   next();
// });

module.exports = model("Inventory", inventorySchema);
