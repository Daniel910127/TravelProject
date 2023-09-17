
# 李誌軒

#隨機推薦
# todo 1. 獲取該用戶之興趣矩陣
# todo 2. 計算各興趣所佔比例(total = 1)
# todo 3. 取比例前三高，並且根據實際比例做推薦(需有個基本門檻 ex: >= 0.33)
# ! return 依照實際比例隨機取

import random
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

    
class interest_pick():
    def __init__(self, user_interest, all_spot_name, all_spot_category) -> None:
        self.all_topics = ['溫泉度假', '風景區', '戶外運動', '在地藝文', '無障礙設施', '生態教育', '自然景觀', '休閒農漁', '公園綠地', '觀光工廠', '熱門景點', '歷史古蹟', '夜市夜遊', '主題園區', '消費娛樂', '宗教廟宇', '景觀吊橋', '地方展館']
        self.user_interest = user_interest
        self.spot_name = all_spot_name
        self.spot_category = all_spot_category

    def pick(self, top_n):
        sumofinterest = sum(self.user_interest)
        self.user_interest = np.array([i / sumofinterest for i in self.user_interest])


        # todo 3. 取比例前三高，並且根據實際比例做推薦(需有個基本門檻 ex: >= 0.33)
        sorted_indices = np.argsort(self.user_interest)[::-1]     #排序的index
        sorted_values = self.user_interest[sorted_indices]       #排序後的arr

        top3 = []
        top3_rate = []
        for i in range(3):
            top3.append(self.all_topics[sorted_indices[i]])
            top3_rate.append(sorted_values[i])
            
        user_interest_vector = np.zeros(len(self.spot_category[0]))
        for label, ratio in zip(top3, top3_rate):
            label_index = self.all_topics.index(label)
            user_interest_vector[label_index] = ratio

        similarities = cosine_similarity(self.spot_category, [user_interest_vector])

        num_similar_places = top_n
        top_indices = similarities.argsort(axis=0)[-num_similar_places:].flatten()

        return [self.spot_name[i] for i in list(top_indices)]

# 所有景點的category list
# spot_interest = {}
# interest = []
# place_names = []
# for i_batch, sample in enumerate(loader):
#     name = sample["Name"]
#     label = sample["category"]
#     spot_interest[name] = label
#     interest.append(label)
#     place_names.append(name)


# if __name__ == '__main__':
#     user_interest = [2, 9, 6, 8, 1, 3, 0, 5, 9, 4, 2, 7, 3, 8, 10, 6, 4, 2]
#     spot_picker = interest_pick(user_interest, place_names, interest).pick()
#     print(spot_picker)