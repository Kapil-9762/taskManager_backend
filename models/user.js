import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    email: { type: String, unique:true,required: true },
    password: { type: String, required: true },
    list: [{
        type: mongoose.Types.ObjectId,
        ref: "List"
        },
    ]
});
export default mongoose.model("User", userSchema);