#!/bin/bash
HTTP_CODE=`curl -sL -w "%{http_code}" "127.0.0.1:8000" -o /dev/null`
echo $HTTP_CODE
EXPECTED="200"
if [ $HTTP_CODE -eq $EXPECTED ];
then
	echo "The server is up and running!"
	exit 0
fi

echo "Uh, oh... Coudn't get a 200 from the server."
exit 1