docker build -t open-hockey-$1 .
docker run -d -p 4000:4040 open-hockey-$1