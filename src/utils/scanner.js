(function () {

    var instance;
    var Scanner = {

        create: function (dev) {

            if (instance) {
                return instance;
            }

            if (dev) {

                instance = new DevScanner();
            } else {
                instance = new AndroidScanner();
            }
            return instance;
        }
    };


    var DevScanner = function () {
        this.subs = [];
        this.scanning = false;
    };

    DevScanner.prototype = {

        subscribe: function (sub) {
            this.subs.push(sub);
        },

        startScan: function () {


            if (!this.interval) {
                var self = this;
                this.scanning = true;
                this.interval = setInterval(function () {

                    var epcs = [];
                    for (var i = 0; i < 10; i++) {
                        epcs.push(String(Math.random()).substr(1));
                    }

                    for (var i = 0; i < self.subs.length; i++) {
                        self.subs[i].onScan(epcs);
                    }

                }, 1000);
            }

        },

        stopScan: function () {
            if (this.interval) {
                this.scanning = false;
                clearInterval(this.interval);
                this.interval = undefined;
            }
        },

        destroy: function () {
            this.stopScan();
            this.subs = undefined;
            instance = undefined;
        }

    };


    var AndroidScanner = function () {
        this.subs = [];
        this.scanning = false;
    };

    window.updateEpcs = function (epcs) {

        if (instance) {
            instance.onScanned(epcs);
        }
    };


    AndroidScanner.prototype = {

        subscribe: function (sub) {
            this.subs.push(sub);
        },

        startScan: function () {
            VM_PAGE.startScan();
        },

        onScanned: function (epcs) {
            var self = this;
            for (var i = 0; i < self.subs.length; i++) {
                self.subs[i].onScan(epcs);
            }

        },

        stopScan: function () {

            VM_PAGE.stopScan();
        },
        destroy: function () {
            this.stopScan();
            this.subs = undefined;
            instance = undefined;
        }

    };

    window.Scanner = Scanner;


})();