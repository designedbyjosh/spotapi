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
    <a href="https://hub.docker.com/repository/docker/jbwhitcombe/spotapi/general"><img src="https://github.com/designedbyjosh/spotapi/actions/workflows/docker-image.yml/badge.svg"></a>
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
docker run -e SPOTIFY_ID="a_good_secret" -e SPOTIFY_SECRET="an_even_better_secret" -e SPOTIFY_REDIRECT_URI="https://your.awesome.website" jbwhitcombe/spotapi:latest
```

You'll need to then either manually GET* the code to /code with:

```sh
curl --location --request GET 'localhost:80/code?code=$CODE'
```

Once you've completed the code transfer, you won't need to do this again until the service restarts.

* We're using a GET instead of a more traditional POST to enable browser-based sharing of the code as requests are defaulted to GET, rather than relying on the terminal or Curl.

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