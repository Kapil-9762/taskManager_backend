import { Router } from "express";
import User from '../models/user.js';
import List from '../models/list.js';
const router = Router();

// add task
router.post("/addTask", async (req, res) => {
    try {
        const { title, body, userId } = req.body;
        const existingUser = await User.findById(userId);
        if (!existingUser) {
            return res.status(200).json({ message: "user not found." });
        }
        const list = new List({ title, body, user: existingUser })
        await list.save().then(() => res.status(200).json({ list }))
        existingUser.list.push(list);
        existingUser.save();
    } catch (error) {
        res.status(400).json({ message: "some server issues" });
    }
});

// update task
router.put("/updateTask/:id", async (req, res) => {
    try {
       const { title, body } = req.body;
        const list = await List.findByIdAndUpdate(req.params.id, { title, body });
        list.save().then(()=>res.status(200).json({message:"task updated"}));
    } catch (error) {
        res.status(400).json({ message: "some server issues" });
    }
});

// task delete
router.delete("/deleteTask/:id", async (req, res) => {
    try {
        const { userId } = req.body;
        const { id } = req.params;

        if (!userId || !id) {
         return res.status(400).json({ error: "userId or id missing" });
        }
        const existingUser = await User.findByIdAndUpdate(
            userId ,
            { $pull: { list:id} }
        );
        if (!existingUser) {
            return res.status(200).json({ message: "user not found" })
        }
        if (existingUser) {
            await List.findByIdAndDelete(id)
                .then(() => res.status(200).json({ message: "Task Deleted" }));
        }
    } catch (error) {
        res.status(400).json({ message: "some server issues" });
    }
});

// get task
router.get("/getTask/:userId", async (req, res) => {
    try {
        const list = await List.find({ user: req.params.userId }).sort({ createdAt: -1 });
        if (list.length !==0) {
            res.status(200).json({ list: list });
        }
        else {
            res.status(200).json({message:"No task available"})
        }
    } catch (error) {
        res.status(400).json({message:"something gone wrong"})
    }
});
export default router;