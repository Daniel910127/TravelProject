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

img_url_dic = {}
local_path = 'imgs'

def get_spot_list():
    
    url = "https://www.twtainan.net/data/attractions_zh-tw.json"
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
    
    


def crawler(keyword,driver):
    url = 'https://www.google.com/search?q='+keyword+'&tbm=isch'
    # 存圖位置
    
    #return list
    img_list = []
    
    # 紀錄下載過的圖片網址，避免重複下載
    
    # 瀏覽器打開爬取頁面
    driver.get(url)

    elements = driver.find_elements(
        By.CSS_SELECTOR, "#islrg > div.islrc > div > a.wXeWr.islib.nfEiy > div.bRMDJf.islir > img")
    nowImg = -1
    i = 0
    while i < 3:
        nowImg += 1
        try:
            elements[nowImg].click()
            # img_url = element.get_attribute('src')
            time.sleep(1)

            img_element = driver.find_element(
                By.CSS_SELECTOR, "#Sva75c > div.DyeYj > div > div.dFMRD > div.pxAole > div.tvh9oe.BIB1wf > c-wiz > div > div.OUZ5W > div.zjoqD > div.qdnLaf.isv-id.b0vFpe > div > a > img")
            img_url = img_element.get_attribute('src')
            #print(img_url)
            # 保存圖片到指定路徑
            if img_url != None and img_url.lower().endswith(".jpg")  and not img_url in img_url_dic:
                img_url_dic[img_url] = ''
                filename = keyword + str(i) +'.jpeg' 
                filename = re.sub(r'[\\/:*?"<>|]', '',filename)
                #print(img_list)
                print(filename,img_url)
                urllib.request.urlretrieve(
                    img_url, os.path.join('media/images/spot', filename))
                
                img_list.append({
                    'name': keyword,
                    'img_url': 'images/spot/'+keyword+str(i)+'.jpeg'
                })
                #print(img_list)
                #保存圖片
                #print(os.listdir())
                

                print('saved')
                i = i+1

        except OSError:
            print(OSError)
            print('發生OSError!')
            # continue

        except:
            print("發生錯誤")
    print(img_list)
    return img_list



# driver = init_browser()
# data = get_attraction_data()
# for m in range(len(data)):  # title
#     crawler(data[m]['name'],driver=driver)
    


# driver.close()
