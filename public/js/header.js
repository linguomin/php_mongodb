$(()=>$("#header").load("http://localhost/php_mongodb/public/header.html",()=>{
  var $listLogin=$("#listLogin"),
      $listWelcome=$("#listWelcome");
  $.get("http://localhost/php_mongodb/routes/users/isLogin.php").then(data=>{
    if(data.ok){
      $listLogin.hide();
      $listWelcome.show().find("#uname").text(data.uname);
    }else{
      $listLogin.show();
      $listWelcome.hide();
    }
  });
  $("[data-trigger=logout]").click(()=>
    $.get("http://localhost/php_mongodb/routes/users/logout.php").then(()=>{
      location="http://localhost/php_mongodb/public/index.html";
    })
  );
}))