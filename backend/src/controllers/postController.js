const postModel = require('../models/postModel');

const { selectPostByAutorId, insertPost, selectPostById, selectAllPosts } = require("../models/postModel")

const getPostByAutorId = async (req, res, next) => {
    const { autorId } = req.params;
    try {
        const posts = await selectPostByAutorId(autorId);
        res.json(posts);
    } catch (error) {
        next(error);
    }
};

const getAllPosts = async (req, res, next) => {
    try {
        const posts = await selectAllPosts();
        res.json(posts);
    } catch (error) {
        next(error);
    }
};

const newPost = async (req, res, next) => {
    try {
        const insertId = await insertPost(req.body);
        const autor = await selectPostById(insertId);
        res.json(autor);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getPostByAutorId,
    newPost,
    getAllPosts
};
