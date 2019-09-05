(function () {


    let Scanner = {

        create: function (dev) {
            if (dev) {
                return new DevScanner();
            } else {
                return new AndroidScanner();
            }
        }
    };


    let DevScanner = function () {
        this.subs = [];
        this.scanning = false;
    };

    DevScanner.prototype = {

        subscribe: function (sub) {
            this.subs.push(sub);
        },

        startScan: function () {


            if (!this.interval) {
                let self = this;
                this.scanning = true;
                this.interval = setInterval(function () {

                    let epcs = [];
                    for (let i = 0; i < 10; i++) {
                        epcs.push(String(Math.random()).substr(1));
                    }

                    for (let i = 0; i < self.subs.length; i++) {
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
        }

    };


    let AndroidScanner = function () {
        this.subs = [];
        this.scanning = false;
    };

    AndroidScanner.prototype = {

        subscribe: function () {
        },

        startScan: function () {
        },

        stopScan: function () {
        }

    };

    window.Scanner = Scanner;


})();