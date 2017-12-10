$(()=>{
  $.get("../routes/articles/listArticle.php")
  .then(list=>{
    var $ul=$("#listArts");
    var html="";
    for(var art of list){
      html+=`<li><a href="article/view.html?_id=${art._id.$id}">${art.title}  | ${new Date(art.createdDate).toLocaleString()}</a></li>`;
    }
    $ul.html(html);
  });
})