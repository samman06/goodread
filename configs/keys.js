if (process.env.NODE_ENV === 'production') {
    console.log(1);
    
    module.exports = require('./keys_prod');
} else {
    console.log(2);
    
    module.exports = require('./keys_dev');
}