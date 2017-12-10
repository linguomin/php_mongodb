$(()=>{
  var $form=$("#register"),
      $txtName=$("[name=uname]"),
      $txtPwd=$("[name=upwd]");
  $txtName.keyup(valiName);
  function valiName(){
    return new Promise(resolve=>{
      var val=$txtName.val().trim(),
          $label=$txtName.next("label");
      if(val!="")
        $.get(
          "../../routes/users/valiName.php",
          "uname="+val
        ).then(result=>{
          if(result=="true"){
            $label.hide();
            resolve();
          }else{
            $label.text("用户名已被占用!").show();
          }
        })
      else $label.hide();
    })
  }
  $form.submit(e=>{
    e.preventDefault();
    if($txtName.val().trim()=="")
      $txtName.next("label").text("用户名不能为空!").show();
    else{
      $txtName.next("label").hide;
      valiName().then(()=>{
        if($txtPwd.val().trim()=="")
          $txtPwd.next("label").text("密码不能为空!").show();
        else{
          $txtPwd.next("label").hide();
          $.post(
            "../../routes/users/register.php",
            $form.serialize()
          ).then(()=>{
            alert("注册成功!");
            location="../index.html";
          })
        }
      })
    }
  })
})