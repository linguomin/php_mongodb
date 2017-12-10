$(()=>{
  Promise.all([
    $.get("http://localhost/php_mongodb/routes/users/isLogin.php"),
    $.get(
      "../../routes/articles/isAuthor.php",
      {_id:location.search.split("=")[1]}
    )
  ]).then(arr=>{
    if(arr[0].ok==0||arr[1]=="false")
      location="../user/login.html";

    $.get(
      "../../routes/articles/viewArticle.php",
      {_id:location.search.split("=")[1]}
    ).then(art=>{
      $("#formUpdate").html(
        `<input type="hidden" name="_id" value="${art._id.$id}"><br>
        标题: <input name="title" value="${art.title}">
              <label class="vali-fail">标题不能为空</label><br>
        内容: <br>
        <textarea name="content" cols="30" rows="10">${art.content}</textarea>
              <label class="vali-fail">内容不能为空</label><br>
        <input type="submit" value="保存">`
      ).submit(e=>{
        e.preventDefault();
        var $txtTitle=$("[name=title]"),
            $txtContent=$("[name=content]");
        if($txtTitle.val().trim()=="")
          $txtTitle.next("label").show();
        else{
          $txtTitle.next("label").hide();
          if($txtContent.val().trim()=="")
            $txtContent.next("label").show();
          else{
            $txtContent.next("label").hide();
            if(confirm("是否继续保存?"))
              $.post(
                "../../routes/articles/editArticle.php",
                $(e.target).serialize()
              ).then(()=>{
                alert("保存成功!");
              })
          }
        }
      })
    })
  })
})