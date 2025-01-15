const _ = require('lodash');
const dummy = (blogs) => {
    return 1
  }

  const totalLikes = (blogs) => {
    return blogs.reduce((acumulator, blogs ) => acumulator + blogs.likes, 0) 

};
 
  const favoriteBlog = (blogs) =>{
    return blogs.reduce((acumulator, blogs)=> acumulator.likes > blogs.likes ? acumulator : blogs, 0)
  }


  const mostBlogs = (blogs) => {
    const authorCounts = _.countBy(blogs, 'author');
    const maxAuthor = _.maxBy(_.keys(authorCounts), (author) => authorCounts[author]);
  
    return {
      author: maxAuthor,
      blogs: authorCounts[maxAuthor]
    };
  };

  const mostLikes =(blogs) =>{
   const authorLikes =_.groupBy(blogs, 'author');
   const authorLikesArray= _.map(authorLikes, (blogs, author) =>{
    return{
      author: author,
      likes: _.sumBy(blogs, 'likes')
    };
  
    
   });
   const maxAuthor = _.maxBy(authorLikesArray, 'likes');
    return{
      author: maxAuthor.author,
      likes: maxAuthor.likes

       

    };
  };

  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
  }