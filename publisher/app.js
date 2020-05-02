//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var _ = require('lodash');
const mongoose = require("mongoose");

const homeStartingContent = " Artificial intelligence (AI) refers to the simulation of human intelligence in machines that are programmed to think like humans and mimic their actions. The term may also be applied to any machine that exhibits traits associated with a human mind such as learning and problem-solving";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";


const app = express();

mongoose.connect("mongodb://localhost:27017/blogDB", {useNewUrlParser: true, useUnifiedTopology: true});

const postSchema = {

 title: String,

 content: String

};
const Post = mongoose.model("Post", postSchema);
//let posts=[];
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/",function(req,res)
{
  Post.find({}, function(err, posts){
   console.log(posts);
   res.render("home", {

     startingContent: homeStartingContent,

     posts: posts

     });

 });
//  res.render("home",{startingContent: homeStartingContent,posts : posts});
}
);

app.get("/contact",function(req,res)
{
  res.render("contact",{contact: contactContent});
}
);

app.get("/about",function(req,res)
{
  res.render("about",{about: aboutContent});
}
);


app.get("/compose",function(req,res)
{
  res.render("compose");
}
);

app.post("/compose",function(req,res){
  /*let post = {
    title : req.body.title,
    postc : req.body.post
  };
  posts.push(post);
  console.log(posts);*/
  const post = new Post ({

   title: req.body.title,

   content: req.body.post

 });
 post.save();
  res.redirect("/");

});

app.get("/posts/:postname",function(req,res){
  const t1= _.lowerCase(req.params.postname);
  /*posts.forEach(function(post){
    const t2= _.lowerCase(post.title);
    if(t1 === t2){
      res.render("post",{title : post.title, postc : post.postc});
    }
  });*/
  Post.findOne({title: req.params.postname}, function(err, post){
    if(!err)
    {
      res.render("post", {

        title: post.title,

        content: post.content

      });


    }
    else
    {
      console.log(err);
    }


 });
});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
