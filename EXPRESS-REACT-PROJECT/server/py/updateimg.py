import os
import requests

def uploadImgs(dir, url):
    for root, dirs, files in os.walk(dir):
        for fileName in files:
            if fileName.endswith(('.jpg', '.png', '.gif', '.jpeg')):
                filePath = os.path.abspath(os.path.join(root, fileName))
                with open(filePath, 'rb') as image_file:
                    files = {'image': image_file}
                    response = requests.post(url, files=files)
                    print(response.json())

uploadImgs(r"C:\vitastuff\photo\CAMERA", "http://3.214.65.190/api/upload")
