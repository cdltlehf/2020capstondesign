import requests
import time
from random import randint

for i in range(10):
    value = randint(0, 100)
    requests.get("https://api.thingspeak.com/update?api_key=5OHW5YWC37Y6VODR&field1=" + str(value))
    time.sleep(20)
