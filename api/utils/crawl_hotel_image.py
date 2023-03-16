import os
import urllib
import time
# from selenium.webdriver.support import expected_conditions as EC
# from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.common.by import By
import xml.etree.ElementTree as ET
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

def get_hotel_list():

    url = "https://www.twtainan.net/data/accommodation_zh-tw.xml"
    response = requests.get(url)
    root = ET.fromstring(response.content)

    accommodation_data_list = []

    for item in root.iter('shop'):
        a_Name = item.find('name').text
        a_Summary = item.find('summary').text
        a_Introduction = item.find('introduction').text
        a_District = item.find('district').text
        a_Address = item.find('address').text
        a_Tel = item.find('tel').text
        a_Fax = item.find('fax').text
        a_Latitude = item.find('lat').text
        a_Longtitude = item.find('long').text
        a_OpenTime = item.find('opentime').text
        a_Category  = item.find('category').text
        a_UpdateTime = item.find('update_time').text
        accommodation_data_list.append({'name': a_Name, 'summary': a_Summary,
                                        'introduction': a_Introduction, 'district': a_District,
                                        'address': a_Address, 'tel': a_Tel, 'fax': a_Fax, 
                                        'latitude': a_Latitude, 'longtitude': a_Longtitude,'openTime': a_OpenTime,'category': a_Category,
                                        'updateTime': a_UpdateTime})

    return accommodation_data_list



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
                    img_url, os.path.join('media/images/hotel', filename))
                
                img_list.append({
                    'name': keyword,
                    'img_url': 'images/hotel/'+keyword+str(i)+'.jpeg'
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
