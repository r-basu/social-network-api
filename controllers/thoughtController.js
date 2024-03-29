const { User, Thought } = require("../models");
const mongoose = require("mongoose");

module.exports = {
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.find({ _id: req.params.thoughtId });

      res.json(thought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({
        _id: req.params.thoughtId,
      });

      if (!thought) {
        res.status(404).json({ message: "No thought with that ID" });
      }

      res.json(thought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { new: true }
      );

      if (!thought) {
        res.status(404).json({ message: "No thought with that ID" });
      }

      res.json(thought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  async createThought(req, res) {
    try {
      const { thoughtText, username } = req.body;
      const user = await User.findOne({ username });

      if (user) {
        const thought = await Thought.create({ thoughtText, username });
        user.thoughts.push(thought);
        await user.save();
        res.status(201).json(thought);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  async addReaction(req, res) {
    try {
      const newReaction = {
        reactionBody: req.body.reactionBody,
        username: req.body.username,
      };

      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: newReaction } },
        { new: true }
      );

      if (!thought) {
        res.status(404).json({ message: "No thought with that ID" });
      }

      res.json(thought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  async deleteReaction(req, res) {
    try {
      const reactionId = new mongoose.Types.ObjectId(req.body.reactionId);
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: reactionId } } }
      );

      if (!thought) {
        res.status(404).json({ message: "No thought with that ID" });
      }

      res.json(thought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
};
