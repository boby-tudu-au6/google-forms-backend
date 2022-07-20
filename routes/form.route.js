const router = require('express').Router();
const Model = require('../models/form')
const User = require('../models/user')

router.get('/', async (req, res) => {
    try {
        const data = await Model.find()
        return res.status(200).json({ data })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
})

router.post('/', async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.body.user })
        console.log(user);
        if (user) {
            const data = await Model.create(req.body)
            return res.status(200).json({ data })
        }
        return res.status(404).json({ error: "Invalid user id" })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const data = await Model.find({ user: req.params.id })
        return res.status(200).json({ data })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
})

router.put('/:id', async (req, res) => {
    try {
        const data = await Model.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
        return res.status(200).json({ data })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const data = await Model.deleteOne({ _id: req.params.id })
        return res.status(200).json({ data })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
})

module.exports = router