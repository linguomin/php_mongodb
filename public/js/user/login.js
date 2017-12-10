$(()=>{
  var $form=$("#login");
  $form.submit(e=>{
    e.preventDefault();
    $.post(
      "../../routes/users/login.php",
      $form.serialize()
    ).then(data=>{
      if(data.ok){
        $form.children().last().hide();
        alert("登录成功!");
        location="../index.html";
      }else{
        $form.children().last().text(data.msg).show();
      }
    })
  })
})