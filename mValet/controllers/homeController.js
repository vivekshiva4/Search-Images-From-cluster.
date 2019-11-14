import HomeDAL from '../db/homeDAL'

class HomeController {

    static getAllPicsByName(keyword) {
        return new Promise((resolve, reject) => {
            HomeDAL.getAllPicsByName(keyword).then(picObj => {
                return resolve(picObj)
            }).catch(err => {
                return reject(err)
            })
        })
    }

}

export default HomeController
