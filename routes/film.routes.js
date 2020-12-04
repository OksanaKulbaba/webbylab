const {Router} = require('express')
const Film = require('../models/Film')
const Actor = require('../models/Actor')
const {check, validationResult} = require('express-validator')
const config = require('config')
const router = Router()



// add new film
router.post('/add',
    async (req, res) => {
        try {
            const {name, format, stars, release} = req.body
            const filmFuture = await Film.findOne({name})
            if (filmFuture) {
             return res.status(400).json({message: "Такой фильм уже есть"})
            }
            const film = new Film({name, format, release, stars: []})
            const films = [];

            films.push(film)
            const starsParse = stars.split(', ').map((actor)=>{
                const splitActor = actor.split(' ')
                return {firstName: splitActor[0], lastName: splitActor[1]}
            })
           const actorsFromDB = []
            for(let actor of starsParse ) {
                let actorFromDb = await Actor.findOne({firstName: actor.firstName, lastName: actor.lastName})
                if(!actorFromDb) {
                    let actorNew = new Actor({firstName: actor.firstName, lastName: actor.lastName, films: films })
                    actorFromDb = await actorNew.save()
                }
            else{
                    actorFromDb =  await Actor.findOneAndUpdate({firstName: actor.firstName,
                        lastName: actor.lastName},
                        {$addToSet: {films: film}},
                        {new: true, useFindAndModify: false})
                }
                actorsFromDB.push(actorFromDb)
               }
            film.stars = actorsFromDB

            let filmSaved = await film.save((err, res) =>{
                if (err) return console.log('error saving', err)
            })
            return res.status(201).json({message: "Фильм создан"})


        } catch (e) {
            res.status(500).json({message: "Что то пошло не так!!!!"})
        }
    })
// get all films
router.get('/all',
    async (req, res) => {
        try {
            let films = await Film.find()

            res.json(films)

        } catch (e) {
            res.status(500).json({message: "Что то пошло не так!!!!"})
        }
    }
    )

router.get('/filter/:id',
    async (req, res) => {
        try {
            let films = await Film.find()
            const filter = req.params.id
            if(filter==='1') {
              await  films.sort(compareToName)
            }
            else if (filter==='2') {
                await  films.sort(compareToYears)
            }
            res.json(films)
        } catch (e) {
            res.status(500).json({message: "Что то пошло не так!!!!"})
        }
    }
)


// get filmByName
router.get('/:name',
    async (req, res) => {
        try {
            const film =  await Film.findOne({name: req.params.name})
            const actors = await Actor.find({films: film._id})
            film.stars = actors
            res.json(film)

        } catch (e) {
            res.status(500).json({message: "Что то пошло не так!!!!"})
        }
    }
)

// update Film
router.put('/:name',
    async (req, res) => {
        try {
        //    const actor = await Actor.findOneAndUpdate({firstName: req.params.name},
          //      {firstName:'NewName'}, {new: true})
          //  res.json(actor)


        } catch (e) {
            res.status(500).json({message: "Что то пошло не так!!!!"})
        }
    }
)

//delete filmByName
router.delete('/:name',
    async (req, res) => {
        try {
            const film = await Film.findOne({name: req.params.name})
            if(!film){
                return  res.status(204).json({message: "Такого фильма нет"})
            }
            await Film.deleteOne({name: req.params.name})
            return  res.status(200).json({message: "Фильм удален"})

        } catch (e) {
            res.status(500).json({message: "Что то пошло не так!!!!"})
        }
    }
)

router.get('/actor/:id',async (req, res) => {

    try{
        const actor = await  Actor.findOne({_id: req.params.id})
        const filmsId = actor.films
        const films = await Film.find({_id:filmsId})
        res.json(films)
    }
    catch (e){

    }

} )

// get filmByActorName
router.get('/actor/n/:name',
    async (req, res) => {
        try {
            const name = req.params.name.split(' ')
            const actor = await Actor.findOne({firstName: name[0],
                lastName:name[1]})
            const filmsId = actor.films
            const films = await Film.find({_id:filmsId})
            res.json(films)

        } catch (e) {
            res.status(500).json({message: "Что то пошло не так!!!!"})
        }
    }
)

function compareToName(a,b){

    if(a.name.toLowerCase() >b.name.toLowerCase()){
        return 1
    }
    else if (a.name.toLowerCase() < b.name.toLowerCase()){
        return -1
    }
    else {
        return 0
    }
}
function compareToYears(a,b){

    if(a.release >b.release){
        return 1
    }
    else if (a.release < b.release){
        return -1
    }
    else {
        return 0
    }
}

module.exports = router
