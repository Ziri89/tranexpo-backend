<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>TranExpo</title>
    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/Swiper/3.4.2/css/swiper.min.css">
    <link rel="stylesheet" href="/css/app.css">
    <script
        src="https://www.paypal.com/sdk/js?client-id=AdLvp7gnB2nrjtBF6bQ0gMx3BsVoCwQnypT7V-3PK0iQIJ-GwOXSl_n-Gpmt4G_h0fFPUy4Q7xdyb1ac&currency=EUR">
    </script>

</head>

<body class="antialiased">
    <div id="root"></div>
    <script src="{{ asset('js/app.js') }}"></script>
</body>


</html>