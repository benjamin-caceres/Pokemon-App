const axios = require('axios');
const express = require('express')
const router = express.Router()


router.get('/', async (req, res, next) => {
    try {
        const types = await axios.get('https://pokeapi.co/api/v2/type');
        return res.json(types.data.results);
    } catch (error) {
        next(error)
    }

})

module.exports = router