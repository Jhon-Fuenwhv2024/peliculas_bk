const mongoose = require('mongoose');

const getConnection = async () => {

    try {

        const url = process.env.URI
    
        await mongoose.connect(url);

        console.log('Conectado a la base de datos')

    } catch(error) {
        console.log(error)
    }

}


module.exports = {
    getConnection
}