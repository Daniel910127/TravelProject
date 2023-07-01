import os
import urllib
import time
# from selenium.webdriver.support import expected_conditions as EC
# from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.common.by import By
import json
import requests
from selenium import webdriver
# options = webdriver.ChromeOptions()
# options.add_argument('--headless')
# options.add_argument('--no-sandbox')
# options.add_argument('--disable-dev-shm-usage')
# driver = webdriver.Chrome('chromedriver', options=options)
# driver.implicitly_wait(10)
import re
from ..models import  Food

img_url_dic = {}
local_path = 'stre'

def get_food_list():
    
    url = "https://www.twtainan.net/data/shops_zh-tw.json"
    response = requests.get(url)
    decoded_data = response.text.encode().decode('utf-8-sig')
    data = json.loads(decoded_data)

    return data



def init_browser():  
    # 啟動chrome瀏覽器
    chromeDriver = r'./chromedriver'  # chromedriver檔案放的位置
    driver = webdriver.Chrome(chromeDriver)
    # 最大化窗口，因為每一次爬取只能看到視窗内的圖片
    driver.maximize_window() 
    return driver
    
    


def crawler(keyword,address,driver):
    url = 'https://www.google.com/maps?q='+address+keyword+'&tbm=isch'
    # 存圖位置
    
    #return list
    stre_list = []
    
    # 紀錄下載過的圖片網址，避免重複下載
    
    # 瀏覽器打開爬取頁面
    driver.get(url)
    time.sleep(1.5)
    try:
        stars = driver.find_element(
        By.CSS_SELECTOR, "#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div.TIHn2 > div > div.lMbq3e > div.LBgpqf > div > div.fontBodyMedium.dmRWX > div.F7nice > span:nth-child(1) > span:nth-child(1)").text
    except:
        try:
            stars = driver.find_element(
            By.CSS_SELECTOR, "#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div.m6QErb.DxyBCb.kA9KIf.dS8AEf.ecceSd > div.m6QErb.DxyBCb.kA9KIf.dS8AEf.ecceSd > div:nth-child(3) > div > div > div.lI9IFe > div.y7PRA > div > div > div.UaQhfb.fontBodyMedium > div:nth-child(3) > div > span.fontBodyMedium > span > span.MW4etd").text
        except:
            stars = 0
       
    Food.objects.filter(f_Name = keyword).update(f_Stars=float(stars))
    try:
        reviews = driver.find_element(
            By.CSS_SELECTOR, "#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div.TIHn2 > div > div.lMbq3e > div.LBgpqf > div > div.fontBodyMedium.dmRWX > div.F7nice > span:nth-child(2) > span > span").text
    except:
        try:
            reviews = driver.find_element(
            By.CSS_SELECTOR, "#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div.m6QErb.DxyBCb.kA9KIf.dS8AEf.ecceSd > div.m6QErb.DxyBCb.kA9KIf.dS8AEf.ecceSd > div:nth-child(3) > div > div > div.lI9IFe > div.y7PRA > div > div > div.UaQhfb.fontBodyMedium > div:nth-child(3) > div > span.fontBodyMedium > span > span.UY7F9").text
        except:
            reviews = '0'
    
        
    reviews = reviews.replace("(", "").replace(",", "").replace(")", "")
    Food.objects.filter(f_Name = keyword).update(f_Reviews=int(reviews))
    return 0



# driver = init_browser()
# data = get_attraction_data()
# for m in range(len(data)):  # title
#     crawler(data[m]['name'],driver=driver)
    


# driver.close()
