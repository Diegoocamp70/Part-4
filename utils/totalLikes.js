const totalLikes = (blogs) => {
    return blogs.reduce((acumulator, blogs ) => acumulator + blogs.likes, 0) 

};

module.exports = {
    totalLikes
}
