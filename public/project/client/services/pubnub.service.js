(function(){
    angular
        .module("ProjectApp")
        .factory("PubNubService", PubNubService);

    function PubNubService($rootScope, PubNub) {

        var api = {
            subscribe:subscribe,
            publish: publish
        };

        PubNub.init({
            publish_key: 'pub-c-00a8cdf5-f3aa-4d9a-a5fe-cf37cae97c2e',
            subscribe_key: 'sub-c-f8ea00fe-f55e-11e5-8916-0619f8945a4f'
        });

        return api;

        function subscribe(channelId, callback) {
            PubNub.ngSubscribe({ channel: channelId });

            $rootScope.$on(PubNub.ngMsgEv(channelId), function(event, payload) {
                callback(payload);
            });
        }

        function publish(text, channelId) {
            PubNub.ngPublish({
                channel: channelId,
                message: text
            });
        }
    }
})();