# Quick Start

## Run as Docker container

### Build Docker container

```bash
docker build -t repgen-frontend .
```

### Run Docker container

- Run the following command to find out the image id of repgen-frontend

```bash
docker images
```

- Run the docker container

```bash
docker run -p 3000:3000 IMAGE_ID 
```

## The non-Docker Approach

### Install project dependencies

```bash
npm Install
```

or

```bash
yarn
```

### Start the development server

```bash
npm run start
```

or

```bash
yarn start
```
