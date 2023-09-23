
# 李誌軒

# 景點熱門度&時間
# ? 用在第一次?
# todo 1. 從random, similarity獲取推薦景點
# todo 2. sort這些景點評論數，並取前幾名(Ex: 100)
    # ? 有必要時將時間也納入考量

# todo 3. 取前4~6名(取決於使用者旅遊時間)

class popular_pick():
    def __init__(self, all_spot_info, spots_name):
        self.all_spot_info, self.spots_name = all_spot_info, spots_name

    def pick(self, interest_top, top_n, classification_top, havebeen2):
        if classification_top != None:
            interest_top = list(set(interest_top+classification_top))
        
        interest_top = [x for x in interest_top if x in self.spots_name]

        TOPReviews = [self.all_spot_info[self.spots_name.index(spot)]["s_Reviews"] for spot in interest_top]
        TOPStars = [self.all_spot_info[self.spots_name.index(spot)]["s_Stars"] for spot in interest_top]
        TOPs_id = [self.all_spot_info[self.spots_name.index(spot)]["s_Id"] for spot in interest_top]
        
        sorted_data = sorted(zip(TOPReviews, TOPStars, interest_top, TOPs_id), key=lambda x: x[0])
        sorted_data = [item for item in sorted_data if item[-1] not in havebeen2]
        
        num_items_per_level = len(sorted_data) // 10
        levels = [sorted_data[i:i+num_items_per_level] for i in range(0, len(sorted_data), num_items_per_level)]

        top_per_level = []
        for level in levels:
            top = sorted(level, key=lambda x: x[1], reverse=True)[:2]
            top_per_level.extend(top)

        final_top = sorted(top_per_level, key=lambda x: x[0], reverse=True)[:top_n]

        top_spots_names = [item[2] for item in final_top]
        top_spots_id = [item[3] for item in final_top]
        
        return top_spots_names, top_spots_id
