const {Router} = require('express')
const Film = require('../models/Film')
const Actor = require('../models/Actor')
const router = Router()
const fs = require('fs')

router.post('/',
    async (req, res) => {
        try {
            // parsing date
            if (! req.file || ! req.file.path) {
                return res.status(400).json('Не верный формат файла');
            }
             await fs.readFile(req.file.path, 'UTF8',
                (err, data) => {
                    if (err) throw err;

                    // parsing file
                    let films = []
                    const parsDate = data.split(/(\r\n){2,}/)
                    parsDate.forEach( row => {
                        const newRow = row.split(/(\r\n)/);
                        let name;
                        let release;
                        let format;
                        let actors = []
                        newRow.map(row2 => {
                            if(row2 ==='\r\n'){return}
                            const targetRow = row2.split(/(: )/)
                            switch (targetRow[0]) {
                                case '':
                                    break
                                case 'Title':
                                    name = targetRow[2]
                                    break
                                case 'Release Year':
                                    release = targetRow[2]
                                    break
                                case 'Format':
                                    format = targetRow[2]
                                    break
                                case 'Stars':
                                    const stars = targetRow[2].split(', ')


                                   stars.map(star => {
                                            const names = star.split(' ');
                                            const actor = new Actor({firstName: names[0], lastName: names[1]})
                                        actors.push(actor)
                                        }
                                    )
                                    break
                            }
                        })
                        if(name && format && release)
                        {
                            let film = new Film({name, stars: actors, release, format})
                            films.push(film)
                        }
                    })
                    saveForDataBase(films, res)
                })
        }
        catch (err)
        {   console.log("error")
            res.status(500).json({message: "Что то пошло не так!!!!"})}

        res.status(200).json('Фильмы сохранены')


})


async function saveForDataBase(data, res){
   await data.map(async film =>{
        try{
        let films = []
        let filmFromDB = await Film.findOne({name: film.name})
        if(!filmFromDB)
        {let filmSaved = await film.save()
            films.push(filmSaved)
            let actors = filmSaved.stars
            for(let actor of actors){
                const actorFromDB = await Actor.findOne({firstName: actor.firstName, lastName: actor.lastName})
                    if(!actorFromDB) {
                        actor.films = films
                       await actor.save()
                    } else {
                      await Actor.findOneAndUpdate({_id: actorFromDB.id},
                            {$addToSet: {films: films}}, {new: true, useFindAndModify: false})
                    }
            }
        }
        }
        catch (e) {
            res.status(500).json({message: "Что то пошло не так!!!!"})
        }
    })

}


module.exports = router
