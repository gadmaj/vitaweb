import os
import requests

def uploadImgs(dir, url):
    fileNames = os.listdir(dir)
    for fileName in fileNames:
        filePath = os.path.abspath(os.path.join(dir, fileName))
        with open(filePath, 'rb') as image_file:
            files = {'image': image_file}
            response = requests.post(url, files=files)
            print(response.json())

uploadImgs(r"C:\Users\gadym\Pictures\Screenshots", "http://localhost:5000/api/upload")
