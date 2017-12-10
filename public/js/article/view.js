$(()=>{
  $.get(
    "../../routes/articles/viewArticle.php",
    {_id:location.search.split("=")[1]}
  ).then(art=>{
    $("#detail").html(
      `<h3>
        <ul id="btns" class="status">
          <li class="btn btn-default">
            <a href="edit.html?_id=${location.search.split("=")[1]}">修改</a>
          </li>
          <li>&nbsp;|&nbsp;</li>
          <li class="btn btn-default">
            <a href="javascript:;" data-toggle="delete">删除</a>
          </li>
        </ul>
      </h3>
      <h2 style="clear:both">${art.title}</h2>
      <h4>作者: ${art.author.uname} | 创建时间: ${new Date(art.createdDate).toLocaleString()}</h4>
      <h3>${art.content}</h3>`
    );
    $.get(
      "../../routes/articles/isAuthor.php",
      {_id:location.search.split("=")[1]}
    ).then(result=>{
      if(result=="true"){
        $("#btns").show();
        $("[data-toggle=delete]").click(e=>{
          if(confirm("是否继续删除?"))
            $.get(
              "../../routes/articles/removeArticle.php",
              {_id:location.search.split("=")[1]}
            ).then(()=>{
              alert("删除成功!");
              location="../index.html";
            })
        })
      }else $("#btns").hide();
    })
  })
})