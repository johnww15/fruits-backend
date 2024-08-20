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

module.exports = model("Inventory", inventorySchema);
