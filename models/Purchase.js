const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

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
      set: (value) => parseFloat(value.toFixed(2)),
      get: (value) => value.toFixed(2),
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
    buyerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    //userid with isOwner: true
    sellerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    //inventoryid referenced
    inventoryId: {
      type: Schema.Types.ObjectId,
      ref: "Inventory",
      // required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { getters: true },
    toObject: { getters: true },
  }
);

// Middleware to update 'paidAt' and 'fulfilledAt' fields
purchaseSchema.pre("save", async function (next) {
  const purchase = this;

  // Check if isPaid is modified
  if (purchase.isModified("isPaid")) {
    if (purchase.isPaid && !purchase.paidAt) {
      purchase.paidAt = new Date();
      if (purchase.isPaid && purchase.inventoryId) {
        try {
          await mongoose
            .model("Inventory")
            .updateOne(
              { _id: purchase.inventoryId },
              { $inc: { sold: purchase.quantity } }
            );
        } catch (error) {
          console.error("Error updating Inventory:", error);
        }
      }
    } else if (!purchase.isPaid) {
      purchase.paidAt = null; // resets if necessary
    }
  }

  // Check if isFulfilled is modified
  if (purchase.isModified("isFulfilled")) {
    if (purchase.isFulfilled && !purchase.fulfilledAt) {
      purchase.fulfilledAt = new Date();
    } else if (!purchase.isFulfilled) {
      purchase.fulfilledAt = null; // resets if necessary
    }
  }

  next();
});

module.exports = model("Purchase", purchaseSchema);
