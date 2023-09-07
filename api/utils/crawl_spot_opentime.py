import os
import urllib
import time
# from selenium.webdriver.support import expected_conditions as EC
# from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.common.by import By
import json
import requests
from selenium import webdriver

import re
from ..models import  Spot

img_url_dic = {}
local_path = 'stre'

def crawler(keyword,address,driver):
    url = 'https://www.google.com/maps?q='+keyword+'&tbm=isch'
    # 存圖位置
    
    #return list
    Ot_list = []
    
    # 紀錄下載過的圖片網址，避免重複下載
    
    # 瀏覽器打開爬取頁面
    driver.get(url)
    time.sleep(2)
    w1 = '0'
    w2 ='0'
    w3 = '0'
    # try:
    #     w1 = driver.find_element(
    #     By.CSS_SELECTOR, "#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div:nth-child(11) > div.OqCZI.fontBodyMedium.WVXvdc > div.t39EBf.GUrTXd").get_attribute('aria-label')
        

    # except:
    #     # try:
    #     #     stars = driver.find_element(
    #     #     By.CSS_SELECTOR, "#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div.m6QErb.DxyBCb.kA9KIf.dS8AEf.ecceSd > div.m6QErb.DxyBCb.kA9KIf.dS8AEf.ecceSd > div:nth-child(3) > div > div > div.lI9IFe > div.y7PRA > div > div > div.UaQhfb.fontBodyMedium > div:nth-child(3) > div > span.fontBodyMedium > span > span.MW4etd").text
    #     # except:
    #     w1 = 'null1'

    try:
        
        
        w2 = driver.find_element(
        By.CSS_SELECTOR, "#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div:nth-child(7) > div.OqCZI.fontBodyMedium.VrynGf.WVXvdc > div.t39EBf.GUrTXd > div > table > tbody > tr:nth-child(2) > td.mxowUb > ul").text

       

    except:
        # try:
        #     stars = driver.find_element(
        #     By.CSS_SELECTOR, "#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div.m6QErb.DxyBCb.kA9KIf.dS8AEf.ecceSd > div.m6QErb.DxyBCb.kA9KIf.dS8AEf.ecceSd > div:nth-child(3) > div > div > div.lI9IFe > div.y7PRA > div > div > div.UaQhfb.fontBodyMedium > div:nth-child(3) > div > span.fontBodyMedium > span > span.MW4etd").text
        # except:

        w2 = 'null1'


    try:
        
        
        

        w3 = driver.find_element(
        By.CSS_SELECTOR, "#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div:nth-child(7) > div.OqCZI.fontBodyMedium.VrynGf.WVXvdc > div.t39EBf.GUrTXd > div > table > tbody > tr:nth-child(2) > td.mxowUb").get_attribute('aria-label')

    except:
        # try:
        #     stars = driver.find_element(
        #     By.CSS_SELECTOR, "#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div.m6QErb.DxyBCb.kA9KIf.dS8AEf.ecceSd > div.m6QErb.DxyBCb.kA9KIf.dS8AEf.ecceSd > div:nth-child(3) > div > div > div.lI9IFe > div.y7PRA > div > div > div.UaQhfb.fontBodyMedium > div:nth-child(3) > div > span.fontBodyMedium > span > span.MW4etd").text
        # except:

        w3 = 'null1'
    # try:
    #     reviews = driver.find_element(
    #         By.CSS_SELECTOR, "#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div.TIHn2 > div > div.lMbq3e > div.LBgpqf > div > div.fontBodyMedium.dmRWX > div.F7nice > span:nth-child(2) > span > span").text
    # except:
    #     try:
    #         reviews = driver.find_element(
    #         By.CSS_SELECTOR, "#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div.m6QErb.DxyBCb.kA9KIf.dS8AEf.ecceSd > div.m6QErb.DxyBCb.kA9KIf.dS8AEf.ecceSd > div:nth-child(3) > div > div > div.lI9IFe > div.y7PRA > div > div > div.UaQhfb.fontBodyMedium > div:nth-child(3) > div > span.fontBodyMedium > span > span.UY7F9").text
    #     except:
    #         reviews = '0'
    
    
    

    # try:
    #     selector = "#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div:nth-child(11) > div.OqCZI.fontBodyMedium.WVXvdc > div.t39EBf.GUrTXd"
        
        
    #     element = driver.find_element(By.CSS_SELECTOR, selector).text
    #     aria_label = element.get_attribute('aria-label')
    #     print(keyword)
    #     print(aria_label)

    # except:
    #     # print("找不到对应的元素")
    #     aria_label = 'null'
    # print(w1)
    # reviews = reviews.replace("(", "").replace(",", "").replace(")", "")
    Spot.objects.filter(s_Name = keyword).update(s_OpenTime=w1+w2+w3+keyword)
    return 0



# driver = init_browser()
# data = get_attraction_data()
# for m in range(len(data)):  # title
#     crawler(data[m]['name'],driver=driver)
    


# driver.close()
