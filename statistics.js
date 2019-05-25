var telegram = require('telegram-bot-api');
var fs = require("fs");
var api = new telegram({
    token: '898459116:AAE6ef0DLEDxqQSpANYkyiF7Tbe5TudlY4M',
    updates: {
        enabled: true
    }
});

api.on('message', function (a) {

    var des = a.text;
    var followers = require('github-followers');

    var opts = {
        'username': des
    };
    if (a.text != null) {
        followers(opts, onFollowers);
    }
    function onFollowers(error, results, info) {
        if (info) {
            console.error(info);
        }
        if (error) {
            console.log("error");
        }
        var followersList = "";
        for (var i = 0; i < results.length; i++) {

            var dup = results[i].login;
            followersList = followersList + dup + '\n'

        }
        api.sendMessage({
            chat_id: a.chat.id,
            text: "Your followers are: \n\n" + followersList
        })
        var followersdup = followersList.split("\n")
        var followerStat = ""
        var d =""
        console.log(followersdup)
        function appendD(item){
            contributions(item).then(res => {
                d = (res.result[res.result.length - 1].count)

                api.sendMessage({
                    chat_id: a.chat.id,
                    text: "contribution of "+ item + " : "+d
                })
            });

        }
        for (var j = 0; j < results.length; j++) {
            var dup2 = results[j].login;
            var contributions = require('@simonwep/github-contributions');

            appendD(dup2)


        }

        d = d.split(" ")
        console.log(d);

        api.sendMessage({
            chat_id: a.chat.id,
            text: "Top contributor of today: Vishwaak"
        })
    }



    var getPullRequests = require('github-pull-requests');

    getPullRequests("sh4nnu", 'merged')
        .then(pullRequests => pullRequests.map(pr => pr.url))
        .then(urls =>
            api.sendMessage({
                chat_id: a.chat.id,
                text: "Merged pull requests of sh4nnu: \n\n"+urls.join("\n")
            }));

        });