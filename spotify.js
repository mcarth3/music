 $("#search-button").click(function(e){
             var artist_name = $('#artist').val();
              
              
             
              var found = false;
              $.ajax({
                    url: 'https://api.spotify.com/v1/search',
                    data: {
                        q: artist_name,
                        type: 'artist'
                    },
                    success: function (response) {
                        
                        var artist_id = '';
                        $('#artist').val('');
                                  
                                  
                                  
                        var artists = response['artists']['items'];
                        $.each(artists,function(key) {
                            $('#artist-name').text(artist);
                            var artist = artists[key];
                            
                            var followers = artist['followers']['total'];
                            artist_id = artist['id'];
                            var artist_name = artist['name'];
                            
                            
                            $('#artist-name').text(artist_name);
                            $('#followers').text(followers + ' followers');
                            
                            var images_list = artist['images'];
                            
                            
                            var image = '';
                            
                            $.each(images_list,function(key) {
                                image = images_list[key];
                                
                                if(image['height'] >= 200) {
                                    $('#artist-image').attr('src',image['url']);
                                    $('#google-link').attr('href','http://www.google.com/search?q=' + artist_name);
                                }
                                
                                
                                
                            });
                            found = true;
                            
                            getTracks(artist_id);
                            
                            
                            if(image === '') {
                                $('#artist-image').attr('src','');
                                alert('The singer ' + artist_name + ' does not have an image available');
                            }
                            
                            return false;
                        });
                        
                        
                        if(found === false) {
                            alert('Sorry. The singer ' + artist_name + ' could not be found');
                        }
                    }
                    
                });
              
              
              
              
             e.preventDefault();
            });
            
            
            
            
            
      
            var getTracks = function(id) {
               
                
                
                var myurl = 'https://api.spotify.com/v1/artists/' + id + '/top-tracks?country=US';
                $('#top-tracks-list').html('');
                
                
                 $.ajax({
                    url: myurl,
                    dataType: "json",
                    success: function (response) {
                        
                       
                        var tracks = response['tracks'];
                        
                      
                        
                      $.each(tracks,function(key) {
                         track = tracks[key];
                         track_uri = track['uri'];
                       
                        
                        var play_button = '<iframe src="https://embed.spotify.com/?uri='+track_uri+'" width="300" height="80" frameborder="0" allowtransparency="true"></iframe><br>'
                        $('#top-tracks-list').append(play_button);
                        
                      });
                       
                    }
                    
                });

                
            }
            