console.log("working");

  if (sessionStorage['username']) {
    console.log('You are logged in');
  } else {
    console.log('Please login');
  }


$(document).ready(function(){

  $('#adminPage').hide();
  $('#loginForm').hide();
  $('#inputIdDiv').hide();
  $('#adminBtn').click(function(){
    $('#adminPage').show();
    $('#homePage').hide();
  });
  $('#homeBtn').click(function(){
    $('#adminPage').hide();
    $('#homePage').show();
  });


//get url and port from config.json
  $.ajax({
    url : 'config.json',
    type : 'GET',
    dataType : 'json',
    success : function(configData){
      console.log(configData);
      url = `${configData.SERVER_URL}:${configData.SERVER_PORT}`;
      console.log(url);
    },
    error : function(){
      console.log("error: cannot call the api");
    }
  });//ajax


//VIEW ALL USERS
  $('#viewUserBtn').click(function(){
    $.ajax({
      url :`${url}/allUsers`,
      type :'GET',
      dataType :'json',
      success : function(users){
        console.log(users);
        for (var i = 0; i < users.length; i++) {
          document.getElementById('userResult').innerHTML += users[i].username + '<br>';
        }

      },//success
      error:function(){
        console.log('error: cannot call api');
      }//error


    });//ajax
  });//viewUser button


//VIEW ALL PRODUCTS
  $('#viewProductBtn').click(function(){
    $.ajax({
      url :`${url}/allProductsFromDB`,
      type :'GET',
      dataType :'json',
      success : function(products){
        console.log(products);

        for (let i = 0; i <products.length; i++) {
        document.getElementById('productResult').innerHTML +=
        `${products[i].name}` + "  " + `${products[i].last_name}` + "<br>"
        }

      },//success
      error:function(){
        console.log('error: cannot call api');
      }//error


    });//ajax
  });//viewProduct button



  // UPDATE PRODUCT
  $('#updateProductBtn').click(function(){
    $('#inputIdDiv').toggle();
  })

  $('#productForm').submit(function(){
    event.preventDefault();
    let  productId = $('#productId').val();
    let  productName = $('#productName').val();
    let  productLastName = $('#productLastName').val();
    let  productPrice = $('#productPrice').val();
    let  userId = $('#userId').val();

    console.log(productId, productName, productPrice, userId);
    $.ajax({
      url :`${url}/updateProduct/${productId}`,
      type :'PATCH',
      data:{
        name : productName,
        last_name : productLastName,
        price : productPrice,
        userId : userId
        },
      success : function(data){
        console.log(data);
      },//success
      error:function(){
        console.log('error: cannot call api');
      }//error


    });//ajax

  });//submit function for login loginForm





//LOGIN
  $('#loginBtn').click(function(){
    $('#loginForm').toggle();
  })

  $('#loginSubmit').click(function(){
    let username = $('#username').val();
    let password = $('#password').val();
    console.log(username, password);
    $.ajax({
      url :`${url}/loginUser`,
      type :'POST',
      data : {
        username : username,
        password : password
      },
      success : function(login){
        console.log(login);
        if (login === 'user not found. Please register') {
          alert('please register');
        } else {
          sessionStorage.setItem('userId',login['_id']);
          sessionStorage.setItem('userName',login['username']);
          sessionStorage.setItem('userEmail',login['email']);
          console.log(sessionStorage);
        }
      },//success
      error:function(){
        console.log('error: cannot call api');
      }//error


    });//ajax
  });//viewUser button






  //Logout
  $('#logoutBtn').click(function(){
    sessionStorage.clear();
    console.log(sessionStorage);
  })


});//document.ready
