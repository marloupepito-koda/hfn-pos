<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Hollywood Fight Nights</title>

        
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <script src="https://unpkg.com/@popperjs/core@2/dist/umd/popper.min.js"></script>
        <script src="https://unpkg.com/tippy.js@6/dist/tippy-bundle.umd.js"></script>
<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet">
            <link href="{{ asset('css/app.css') }}" rel="stylesheet">
        <script src="{{ asset('js/app.js') }}" defer></script>
            <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@100;200;400;700&display=swap" rel="stylesheet">
            <link href="css/bootstrap.min.css" rel="stylesheet">
            <link href="css/bootstrap-icons.css" rel="stylesheet">
            <link href="css/templatemo-festava-live.css" rel="stylesheet">

            @viteReactRefresh
            @vite(['resources/css/app.css', 'resources/js/app.js'])
    </head>

  <style
   type="text/css">

 
  /* .taken {
    fill: #cccccc !important;
}
@media only screen and (max-width: 600px) {
    #svg {
        margin: -222px 0 0 -450px !important;
    }
}

.swal2-confirm.btn.btn-success {
    margin-left: 15px !important;
}
.st0 {
    font-family: "ArialMT";
}
.st1 {
    font-size: 20px;
}
.st2 {
    font-size: 17px;
}
.st3 {
    font-size: 12px;
}
.st4 {
    opacity: 0;
    fill: #ffffff;
}
.st5 {
    fill: none;
    stroke: #b2b2b2;
    stroke-miterlimit: 10;
}
.st6 {
    fill: #ffffff;
    z-index: -1 !important;
    cursor: pointer;
}

.st7 {
    fill: none;
    stroke: #000100;
    stroke-width: 0.4306;
    stroke-miterlimit: 10;
}
.st8 {
    font-size: 18px;
}
.st9 {
    fill: none;
    stroke: #000100;
    stroke-width: 0.8349;
    stroke-miterlimit: 10;
}
.st10 {
    fill: none;
    stroke: #000100;
    stroke-width: 0.1797;
    stroke-miterlimit: 10;
}
.st11 {
    fill: none;
    stroke: #000100;
    stroke-width: 0.7773;
    stroke-miterlimit: 10;
}
.st12 {
    fill: none;
    stroke: #000100;
    stroke-width: 0.1673;
    stroke-miterlimit: 10;
}
.st13 {
    fill: none;
    stroke: #111111;
    stroke-width: 6.557094e-2;
    stroke-miterlimit: 10;
}
.st14 {
    fill: none;
    stroke: #111111;
    stroke-width: 0.1083;
    stroke-miterlimit: 10;
}
.st15 {
    fill: none;
    stroke: #000100;
    stroke-width: 0.5;
    stroke-miterlimit: 10;
}
.st16 {
    fill: none;
    stroke: #ffffff;
    stroke-width: 0;
    stroke-miterlimit: 10;
}
.st17 {
    fill: none;
    stroke: #000100;
    stroke-width: 0.2153;
    stroke-miterlimit: 10;
}
.st18 {
    fill: none;
    stroke: #cccccc;
    stroke-miterlimit: 10;
    stroke-dasharray: 6, 4;
}
.st19 {
    fill: none;
    stroke: #111111;
    stroke-width: 0.4283;
    stroke-miterlimit: 10;
}
.st20 {
    fill: none;
    stroke: #000100;
    stroke-width: 0.2141;
    stroke-miterlimit: 10;
}
.st21 {
    fill: none;
    stroke: #111111;
    stroke-width: 0.9999;
    stroke-miterlimit: 10;
}
.st22 {
    font-family: "Arial-BoldMT";
}
.st23 {
    font-size: 11px;
}
.st24 {
    fill: none;
    stroke: #ff0001;
    stroke-width: 0.601;
    stroke-miterlimit: 10;
}
.st25 {
    fill: #ff0001;
}
.st26 {
    font-size: 11.6251px;
}
.st27 {
    fill: none;
}

.svg {
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.controls-button {
    font-weight: 700;
}

.selected {
    fill: yellow !important;
    cursor: pointer !important;
}

.booth.preferred-seating .booth-fill {
    fill: rgb(14, 122, 0);
}
.booth.reserved-seating .booth-fill {
    fill: rgb(253, 177, 0);
}
.booth.vip-ringside .booth-fill {
    fill: rgb(168, 0, 255);
}

#rotateMode {
    border-radius: 50%;
    width: 125px;
    height: 125px;
    background-color: gray;
    color: white;
    position: relative;
}

#rotateMode2 {
    border-radius: 50%;
    width: 125px;
    height: 125px;
    background-color: gray;
    color: white;
    position: relative;
}

#left {
    position: absolute;
    top: 50%;
    left: 0px;
    transform: translateY(-50%);
}

#right {
    position: absolute;
    top: 50%;
    right: 0px;
    transform: translateY(-50%);
}

#up {
    position: absolute;
    top: 0px;
    left: 50%;
    transform: translateX(-50%);
}

#down {
    position: absolute;
    bottom: 0px;
    left: 50%;
    transform: translateX(-50%);
}

#up1 {
    position: absolute;
    top: 0px;
    left: 50%;
    transform: translateX(-50%);
}

#down1 {
    position: absolute;
    bottom: 0px;
    left: 50%;
    transform: translateX(-50%);
} */
</style>

    <body>
        <div id="app" />
    </body>
</html>