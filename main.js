//Run our jQuery
$(document).ready(function(){
  var following = [];
  $.ajax({
    type: "GET",
    url: "https://api.twitch.tv/kraken/streams/freecodecamp",
    headers:{
      'Client-ID': 'lpcfra5atdz9k7jtdldz5729cfh4zua'
    },
    success: function(data1){
      if (data1.stream === null){
        //FCC offline
        $("#fccStatus").html("Free Code Camp is currently offline");
      }else{
        //FCC online
        $("#fccStatus").html("Free Code Camp is currently broadcasting");
      }
    }
  });
  
  $.ajax({
    type: "GET",
    url: "https://api.twitch.tv/kraken/users/freecodecamp/follows/channels",
    headers:{
      'Client-ID': 'lpcfra5atdz9k7jtdldz5729cfh4zua'
    },
    success: function(data2){
      for (var i = 0; i < data2.follows.length; i++){
        //gets display name
        var displayName = data2.follows[i].channel.display_name;
        var logo = data2.follows[i].channel.logo;
        var status = data2.follows[i].channel.status;
        if(logo == null){
          logo="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeF9yiuuOJBNO8VpXsVp2VQIpBSTPdLKW6uB3AI-jmSX9G74bX1g";
        }
        
        $("#followerInfo").prepend("<div class = 'row'>" + "<div class = 'col-md-4'>" + "<img src='" + logo + "'>" + "</div>" + "<div class = 'col-md-4'>" + name + "</div>" + "<div class='col-md-4'>" + status + "</div></div>"); 
      }
    }
  });
  var deletedFollowers = ['brunofin', 'comster404'];
  for(var i = 0; i < deletedFollowers.length; i++){
    $.ajax({
      type: "GET",
      url: "https://api.twitch.tv/kraken/streams/" + deletedFollowers[i],
      headers:{
        'Client-ID': 'lpcfra5atdz9k7jtdldz5729cfh4zua'
      },
      error: function(data3){
        var logo = "https://https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeF9yiuuOJBNO8VpXsVp2VQIpBSTPdLKW6uB3AI-jmSX9G74bX1g"
        var displayName = data3.statusText;
        console.log(data3.statusText);
        var status = data3.status;
        $("#followerInfo").prepend("<div class = 'row'>" + "<div class = 'col-md-4'>" + status + "</div></div>");
      }
    })
  }
  //FreeCodeCamp stream info and status API call
  var url = "https://api.twitch.tv/kraken/streams/freecodecamp";
  $.getJSON(url, function(data1){
    if(data1.stream === null){
      $("#fccStatus").html("Free Code Camp is currently offline!");
    }
    else{
      $("#fccStatus").html("Free Code Camp is currently online!");
    }
  });
  var followerURL = "https://api.twitch.tv/kraken/users/freecodecamp/follows/channels/";
 $.getJSON(followerURL, function(data2){
   for (var i = 0; i < data2.follows.length; i++){
     var displayName = data2.follows[i].channel.display_name;
     following.push(displayName);
   }
   following.push('comster404');
   following.push('brunofin');
   following.push('ESL_SC2');
   
   for(var i = 0; i < following.length; i++){
     var url2= "https://api.twitch.tv/kraken/streams/" + following[i] + "/callback=?";
     
     $.getJSON(url2).done(function(data3){
       var logo;
       var status;
       var name;
       if(data3.error){
         logo = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeF9yiuuOJBNO8VpXsVp2VQIpBSTPdLKW6uB3AI-jmSX9G74bX1g";
         name = data3.message;
         status = data3.error;
         
          $("#followerInfo").prepend("<div class = 'row'>" + "<div class = 'col-md-4'>" + "<img src='" + logo + "'>" + "</div>" + "<div class = 'col-md-4'>" + name + "</div>" + "<div class='col-md-4'>" + status + "</div></div>"); 
       }
       if(data3.stream===null){
         $.getJSON(data3._links.channel,function(data5){
           status = "offline";
           logo = data5.logo;
           name = data3.display_name;
           if(logo===null){
             logo = "http://web.vmc3.com/projects/bufs/branch/marines/logos/NoLogo.jpg";
           }
           $("#followerInfo").prepend("<div class = 'row'>" + "<div class = 'col-md-4'>" + "<img src='" + logo + "'>" + "</div>" + "<div class = 'col-md-4'>" + name + "</div>" + "<div class='col-md-4'>" + status + "</div></div>"); 
         });
       }
     });
   }
   for(var i=0; i<following.length; i++){
     var onlineURL = "https://api.twitch.tv/kraken/streams/" + following[i];
     $.getJSON(url, function(data4){
         var logo = data4.stream.channel.logo;
         var status = data4.stream.channel.status;
         var name = data4.stream.channel.display_name;
         $("#followerInfo").prepend("<div class = 'row'>" + "<div class = 'col-md-4'>" + "<img src='" + logo + "'>" + "</div>" + "<div class = 'col-md-4'>" + name + "</div>" + "<div class='col-md-4'>" + status + "</div></div>"); 
       
     })
   }
 });
  
  
});
