const axios = require('axios');
const express = require('express')
const router = express.Router()
const { Types } = require('../db')


router.get('/', async (req, res, next) => {
    try {
        let typesDB = await Types.findAll({ limit: 20 });

        if (typesDB.length < 20) {
            try {
                let { data } = await axios(`https://pokeapi.co/api/v2/type`);
                for (let i = 0; i < 20; i++) {
                    const typeResults = data.results[i].name;
                    await Types.findOrCreate({
                        where: {
                            name: typeResults,
                        }
                    });
                }
                return res.redirect('/types');
            }
            catch (error) {
                console.log(error);
                res.status(500).send('Internal Server Error');
            }
        }
        return res.status(200).json(typesDB);

    } catch (error) {
        next(error)
    }

})

module.exports = router