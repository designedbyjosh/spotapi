<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://josh.house/music">
    <img src="https://i.pinimg.com/originals/7a/ec/a5/7aeca525afa2209807c15da821b2f2c6.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Spotapi</h3>

  <p align="center">
    An API that connects to the Spotify API, tracks your personal listening habits and publishes them through WebSockets. Useful if you want to make your listening habits public, such as on a personal blog or on a dashboard.
    <br />
    <a href="https://josh.house/music"><strong>Check out my habits »</strong></a>
    <br />
    <br />
    <a href="https://github.com/designedbyjosh">My GitHub</a>
    ·
    <a href="https://spotify.com">My most-used app</a>
  </p>
</p>



<!-- TABLE OF CONTENTS -->
## Table of Contents

- [Installation](#installation)
- [Contributing](#contributing)
- [License](#license)

## Installation
Getting started is easy, run:

```sh
docker build . --tag spotapi:latest
```

And then to run the container you've built, run:

```sh
docker run -e SPOTIFY_ID="a_good_secret" -e SPOTIFY_SECRET="an_even_better_secret" -e SPOTIFY_REDIRECT_URI="https://your.awesome.website" spotapi:latest
```

You'll need to then either manually POST the code to /code with:

```sh
curl --location --request POST 'localhost:80/code?code=$CODE'
```

Once you've completed the code transfer, you won't need to do this again until the service restarts.

<!-- ABOUT THE PROJECT -->
## About The Project
The Spotify API is limited in that it can only show music statistics when you're logged in and authorised. Instead, this wrapper will provide you with a link, login and then expose endpoints that mirror the Spotify API so you can check out and publish your listening habits in real time on your own blog, such as mine.

<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated** because they'll help make me realise that my current approach is potentially garbage and make me a better engineer. I'm here to learn, so please, show me how it's done.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- LICENSE -->
## License

Distributed under the DWTFYW licence.