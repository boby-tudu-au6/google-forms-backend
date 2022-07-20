const router = require('express').Router();
const Model = require('../models/user')
const jwt = require("jsonwebtoken");

router.get('/', async (req, res) => {
    try {
        const data = await Model.find()
        return res.status(200).json({ data })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
})

router.post('/register', async (req, res) => {
    try {
        const data = await Model.create(req.body)
        return res.status(200).json({ data })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
})

router.get('/all-user-list', async (req, res) => {
    try {
        const data = await Model.find().select("name email designation age")
        return res.status(200).json({ data })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
})


router.post('/login', async (req, res) => {
    try {
        const data = await Model.findOne(req.body)
        if (data) {
            const token = jwt.sign({
                name: data.name,
                email: data.email,
                _id: data._id
            }, 'secret')
            return res.status(200).json({ data: token })
        }
        return res.status(401).json({ error: "User not found! check your credentials" })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
});

router.post('/forgot-password', async (req, res) => {
    try {
        const user = await Model.findOne({ email: req.body.email })
        if (user) {
            const token = jwt.sign({ email: user.email }, 'secret')
            await Model.updateOne({ _id: user._id }, { token })
            return res.status(200).json({ data: token })
        }
        return res.status(401).json({ error: "Email is not registered" })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
})

router.post('/reset-password', async (req, res) => {
    try {
        const data = jwt.verify(req.body.token, 'secret')
        const user = await Model.findOne({ email: data.email })
        if (data && data.email && user.token === req.body.token) {
            await Model.updateOne({ email: data.email }, { password: req.body.newPassword, token: null })
            return res.status(201).json({ data: "password updated successfully" })
        }
        return res.status(404).json({ error: "Invalid link" })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
})

router.post('/verify-token', async (req, res) => {
    try {
        const data = jwt.verify(req.body.token, 'secret')
        const user = await Model.findOne({ email: data.email })
        console.log({ user, data })
        if (data && user && user.token === req.body.token) return res.json(data)
        return res.status(404).json({ error: "Invalid link" })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
})



router.get('/:id', async (req, res) => {
    try {
        const data = await Model.findOne({ _id: req.params.id })
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