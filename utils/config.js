require('dotenv').config({ path: './Entorno.env' });


const PORT=process.env.PORT;
const MONGODB_URI = process.env.NODE_ENV === 'test' 
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI

  const MONGODB_2 = process.env.MONGODB_URI_2

module.exports = {
    MONGODB_URI,
    PORT,
    MONGODB_2
}
