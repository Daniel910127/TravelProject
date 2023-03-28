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
from ..models import Task, Account, Spot, Member, s_Interest,Hotel, Food, Travel_List, Travel_List_Detail, Question, s_Picture, m_Picture,f_Picture,h_Picture

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
    url = 'https://www.google.com/maps?q='+' '+address+keyword+'&tbm=isch'
    # 存圖位置
    
    #return list
    stre_list = []
    
    # 紀錄下載過的圖片網址，避免重複下載
    
    # 瀏覽器打開爬取頁面
    driver.get(url)
    stars = driver.find_element(
        By.CSS_SELECTOR, "#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div.TIHn2 > div > div.lMbq3e > div.LBgpqf > div > div.fontBodyMedium.dmRWX > div.F7nice > span:nth-child(1) > span:nth-child(1)").text

    # stars = str(ar.find(class_ = "fontBodyMedium dmRWX").get('aria-label').strip().strip("顆星")
   
    Food.objects.filter(f_Name = keyword).update(f_Summary=float(stars))
    reviews = driver.find_element(
        By.CSS_SELECTOR, "#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div.TIHn2 > div > div.lMbq3e > div.LBgpqf > div > div.fontBodyMedium.dmRWX > div.F7nice > span:nth-child(2) > span > span").text
    reviews = reviews.replace("(", "").replace(",", "").replace(")", "")
    Food.objects.filter(f_Name = keyword).update(f_Introduction=float(reviews))
    return 0



# driver = init_browser()
# data = get_attraction_data()
# for m in range(len(data)):  # title
#     crawler(data[m]['name'],driver=driver)
    


# driver.close()
