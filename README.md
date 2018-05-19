# React Native Auth App

This repository contains my implementation of the Auth app. This is a study project of the
Udemy's [The Complete React Native and Redux Course](https://www.udemy.com/the-complete-react-native-and-redux-course).
Auth consists of a simple login/signup app using Firebase web service.

<kbd><img src="https://github.com/computationalcore/react-native-auth/raw/assets/auth1.png" /></kbd>
<kbd><img src="https://github.com/computationalcore/react-native-auth/raw/assets/auth2.png" /></kbd>
<kbd><img src="https://github.com/computationalcore/react-native-auth/raw/assets/auth3.png" /></kbd>

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing
purposes.

### Prerequisites

The project can be built with npm or yarn, so choose one of the approach bellow in case you don't
have any installed on your system.

* npm is distributed with Node.js which means that when you download Node.js,
you automatically get npm installed on your computer. [Download Node.js](https://github.com/facebookincubator/create-react-app)

or

* Yarn is a package manager built by Facebook Team and seems to be faster than npm in general.  [Download Yarn](https://yarnpkg.com/en/docs/install)

Also you will have to create a Firebase app and enable e-mail authentication. For more details [check here](https://firebase.google.com/docs/auth/).

### Installing

To download the project follow the instructions bellow

```
git clone https://github.com/computationalcore/react-native-auth
cd react-native-auth
```

Install dependencies with:

npm
```
npm install
```
or

yarn
```
yarn install
```

Copy firebase config template
```
cp config/firebase.sample.json config/firebase.json
```
Open the firebase.json and paste with your firebase app credentials.

And run on

iOS simulator
```
react-native run-ios
```
or

Android simulator
```
react-native run-android
```

## Author
Vin Busquet
* [https://github.com/computationalcore](https://github.com/computationalcore)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Acknowledgments
* [Udemy](https://www.udemy.com)
* [Stephen Grider](https://twitter.com/ste_grider)
