import time
import csv
from selenium import webdriver
from selenium.webdriver.firefox.options import Options
from PIL import Image
from io import BytesIO

CSV = "Results_Group1+2.csv"
with open(CSV, "r", encoding="utf-8") as f:
    next(f)
    csvr = csv.reader(f, delimiter="|")
    for row in csvr:
        ID, PID, WIDTH, HEIGHT = row[0], row[1], row[7], row[8]
        if row[3]:
            url1, url2 = f"https://vanderschoot.net/heatmap/1/raw/{ID}", f"https://vanderschoot.net/heatmap/2/tool/{ID}"
            img1, img2 = f"heatmaps/{PID}_Heatmap_1_Raw.png", f"heatmaps/{PID}_Heatmap_2_Tool.png"
        else:
            url1, url2 = f"https://vanderschoot.net/heatmap/1/tool/{ID}", f"https://vanderschoot.net/heatmap/2/raw/{ID}"
            img1, img2 = f"heatmaps/{PID}_Heatmap_1_Tool.png", f"heatmaps/{PID}_Heatmap_2_Raw.png"
        
        for c, url in enumerate([url1, url2]):

            options = Options()
            options.add_argument(f"--width={WIDTH}")
            options.add_argument(f"--height={HEIGHT}")
            driver = webdriver.Firefox(options=options)
            
            driver.get(url)
            time.sleep(3)

            total_height = driver.execute_script("return document.body.scrollHeight")
            # Set the window size to the entire page height
            driver.set_window_size(WIDTH, total_height)
            # Take a screenshot of the entire page
            screenshot = driver.get_screenshot_as_png()
            # Close the browser
            driver.quit()
            # Save the screenshot as an image
            image = Image.open(BytesIO(screenshot))
            if c == 0:
                image.save(img1)
            else:
                image.save(img2)
            print(f"Saved {url}")
