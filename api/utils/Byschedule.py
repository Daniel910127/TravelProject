
# 李誌軒
import re
import heapq
from math import radians, cos, sin, asin, sqrt

from ..utils import method #import getinfobyid
#! class schedual
    #input      1. rcm spot ids


    #           2. benchmark position
                    #? 2 length string
    #           3. user play time
                    #? idk

    #output     1. spot name(sort by schedule)
    #
    #            2. spot id(sort by schedule)

#! def byopentime()
    # todo1: spot open time(str) to 7 len list 

#! def byposition()
    # todo1: IP to dic
    # todo2: use Dijkstra's Algorithm 



class schedule():
    def __init__(self) -> None:
        pass

    def bytime(self, rcm_spot_id, user_play_time):
        opening_hours_list = []
        for spot in rcm_spot_id:
            # ifmorning = self.opentime2list(spot["spot_opentime"])
            # opening_hours_list.append(ifmorning)
            # opening_hours_list += [spot["spot_id"]]
            ifmorning = self.opentime2list(method.getspotbyid(-spot, "s_OpenTime"))
            opening_hours_list.append(ifmorning + [spot])
        #print("hello",opening_hours_list)
        filtered_spots = self.filter_opening_hours(opening_hours_list, user_play_time)
        
       
        morning_only_spots = []
        afternoon_only_spots = []
        allday_opening_spots = []
        for i in range(len(user_play_time)):
            morning_only_spots.append([spot[-1] for spot in filtered_spots if spot[user_play_time[i]] is True])
            afternoon_only_spots.append([spot[-1] for spot in filtered_spots if spot[user_play_time[i]] =="onlyafternoon" and spot[user_play_time[i]] is not None])
            allday_opening_spots.append([spot[-1] for spot in filtered_spots if spot[user_play_time[i]] =="openallday" and spot[user_play_time[i]] is not None])
        
        return morning_only_spots[-1], afternoon_only_spots[-1], allday_opening_spots[-1]
    
    def byposition(self, morning_only_spots, afternoon_only_spots, allday_opening_spots, benchmarkpos):
        ifhavemorning = (len(morning_only_spots) != 0)
        
        morn_sorted_locations = None
        if ifhavemorning:
            morning = {}
            morning["start_position"] = benchmarkpos
            for i in morning_only_spots:
                morning[i] = (method.getspotbyid(-i, "position"))
            
            graph = {}
            for location, coords in morning.items():
                graph[location] = {}
                for other_location, other_coords in morning.items():
                    if location != other_location:
                        distance = self.haversine(coords[0], coords[1], other_coords[0], other_coords[1])
                        graph[location][other_location] = distance

            # Dijkstra 
            shortest_distances = self.dijkstra(graph, "start_position")

            # 列出景點
            morn_sorted_locations = sorted(shortest_distances.items(), key=lambda x: x[1])
            other = {}
            lst, _ = morn_sorted_locations[-1]
            other["start_position"] = morning[lst]
            morn_sorted_locations = [item[0] for item in morn_sorted_locations[1:]]

        else:
            other = {}
            other["start_position"] = benchmarkpos

        for i in allday_opening_spots:
            other[i] = (method.getspotbyid(-i, "position"))

        graph = {}
        for location, coords in other.items():
            graph[location] = {}
            for other_location, other_coords in other.items():
                if location != other_location:
                    distance = self.haversine(coords[0], coords[1], other_coords[0], other_coords[1])
                    graph[location][other_location] = distance

        # Dijkstra 
        shortest_distances = self.dijkstra(graph, "start_position")

        # 列出景點
        other_sorted_locations = sorted(shortest_distances.items(), key=lambda x: x[1])

        ifhaveevening = (len(afternoon_only_spots) != 0)
        
        afternoon_sorted_locations = None
        if ifhaveevening:
            afternoon = {}
            lst, _ = other_sorted_locations[-1]
            afternoon["start_position"] = other[lst]
            for i in afternoon_only_spots:
                afternoon[i] = (method.getspotbyid(-i, "position"))
            
            graph = {}
            for location, coords in afternoon.items():
                graph[location] = {}
                for other_location, other_coords in afternoon.items():
                    if location != other_location:
                        distance = self.haversine(coords[0], coords[1], other_coords[0], other_coords[1])
                        graph[location][other_location] = distance

            # Dijkstra
            shortest_distances = self.dijkstra(graph, "start_position")

            # 列出景點
            afternoon_sorted_locations = sorted(shortest_distances.items(), key=lambda x: x[1])
            afternoon_sorted_locations = [item[0] for item in afternoon_sorted_locations[1:]]

        return morn_sorted_locations, [item[0] for item in other_sorted_locations[1:]], afternoon_sorted_locations
    
    def hotel(self, start_location, hotel_locations):
        distances = []

        for i, hotel_location in enumerate(hotel_locations):
            distance = self.haversine(start_location[0], start_location[1], hotel_location[0], hotel_location[1])
            distances.append((i, distance))

        # 根據距離排序，取最近的 num_hotels 家酒店
        distances.sort(key=lambda x: x[1])
        nearest_hotel_indices = [i for i, _ in distances[:5]]

        return nearest_hotel_indices
    
    def food(self, start_location, food_locations):
        distances = []

        for i, food_location in enumerate(food_locations):
            distance = self.haversine(start_location[0], start_location[1], food_location[0], food_location[1])
            distances.append((i, distance))

        # 根據距離排序，取最近的 num_hotels 家酒店
        distances.sort(key=lambda x: x[1])
        nearest_food_indices = [i for i, _ in distances[:5]]

        return nearest_food_indices

    def opentime2list(self, opentim):

        pattern = r'\“w\d+\”:\s?\[(.*?)\]'
        matches = re.findall(pattern, opentim)
        filtered_hours = []

        for day_hours in matches:
            if day_hours.strip() == 'null':
                filtered_hours.append(None)
                continue
            
            hours_pattern = r'(\d+:\d+)–(\d+:\d+)'
            hours_matches = re.findall(hours_pattern, day_hours)

            is_open = "openallday"
            for start_time, end_time in hours_matches:
                if start_time <= '12:00' and end_time <= '12:00':
                    is_open = True
                    break
                if start_time >= '12:00' and end_time >= '12:00':
                    is_open = "onlyafternoon"
                    break
            
            filtered_hours.append(is_open)

        return filtered_hours

    def filter_opening_hours(self, opening_hours_list, days_to_check):
        filtered_spots = []
        #print(opening_hours_list,days_to_check)

        for spot_hours in opening_hours_list:
            spot_opening_days = [i for i, is_open in enumerate(spot_hours) if is_open is not None]
            if any(day in days_to_check for day in spot_opening_days):
                filtered_spots.append(spot_hours)
        
        return filtered_spots
    
    def haversine(self, lat1, lon1, lat2, lon2):
        R = 6371  # 地球半徑（公里）
        lat1, lon1, lat2, lon2 = map(radians, [lat1, lon1, lat2, lon2])
        dlat = lat2 - lat1
        dlon = lon2 - lon1
        a = sin(dlat / 2) ** 2 + cos(lat1) * cos(lat2) * sin(dlon / 2) ** 2
        c = 2 * asin(sqrt(a))
        return R * c

    def dijkstra(self, graph, start):
        distances = {node: float('inf') for node in graph}
        distances[start] = 0
        pq = [(0, start)]

        while pq:
            current_distance, current_node = heapq.heappop(pq)

            if current_distance > distances[current_node]:
                continue

            for neighbor, weight in graph[current_node].items():
                distance = current_distance + weight
                if distance < distances[neighbor]:
                    distances[neighbor] = distance
                    heapq.heappush(pq, (distance, neighbor))

        return distances