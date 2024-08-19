const { Schema, model } = require("mongoose");

const purchaseSchema = new Schema(
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
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    isFulfilled: {
      type: Boolean,
      default: false,
    },
    fulfilledAt: {
      type: Date,
    },
    //userid with isOwner: false
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    //inventoryid referenced
    inventoryId: {
      type: Schema.Types.ObjectId,
      ref: "Inventory",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

//potentially include middleware to update paidAt and fulfilledAt dates when toggled

module.exports = model("Purchase", purchaseSchema);
