$(document).ready(function() {

    var percent = .85,
        speed = 10,
        props = {
            x: 0
        };

    startCircularProgress(percent, speed);

    function startCircularProgress(percentage, speed) {
        TweenMax.to(props, speed, {
            x: percentage,
            ease: Power3.easeOut,
            onUpdate: function() {
                console.log(props.x);
                drawProgress(props.x);
            }
        });
    }

    function clamp(n, min, max) {
        return Math.max(min, Math.min(max, n));
    };

    function drawProgress(percent) {

        if (isNaN(percent)) {
            return;
        }

        percent = clamp(parseFloat(percent), 0, 1);

        // 360 loops back to 0, so keep it within 0 to < 360
        var angle = clamp(percent * 360, 0, 359.99999);
        var paddedRadius = 49 + 1;
        var radians = (angle * Math.PI / 180);
        var x = Math.sin(radians) * paddedRadius;
        var y = Math.cos(radians) * -paddedRadius;
        var mid = (angle > 180) ? 1 : 0;
        var pathData = 'M 0 0 v -%@ A %@ %@ 1 '.replace(/%@/gi, paddedRadius) +
            mid + ' 1 ' +
            x + ' ' +
            y + ' z';

        var bar = document.getElementsByClassName('progress-radial-bar')[0];
        bar.setAttribute('d', pathData);
    };

});