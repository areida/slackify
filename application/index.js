require(['$api/models', '$api/models#Session'], function(models) {

    // Get the current user
    models.session.load('product','connection','device','user').done(
        function(sess)
        {
            sess.user.load('name', 'username', 'subscribed').done(
                function(user)
                {
                    window.app.start(user);

                    // Update current song
                    models.player.load('track').done(
                        function(event)
                        {
                            if (event.playing && event.track)
                            {
                                window.app.dispatcher.emit('updateStatus', event.track);
                            }
                        }
                    );

                    // Update on change
                    models.player.addEventListener(
                        'change',
                        function(event)
                        {
                            if (event.data.playing && event.data.position === 0 && event.data.track)
                            {
                                window.app.dispatcher.emit('updateStatus', event.data.track);
                            }
                        }
                    );
                }
            );
        }
    );

});
