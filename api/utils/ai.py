interest_data = {}
playzone_data={}
custom = True


def process_interest_data(data):
    global interest_data
    interest_data = data
    for key, value in interest_data.items():
        print(f"Interest {key}: {value}")

def process_playzone_data(data):
    global playzone_data
    playzone_data = data
    for zone in playzone_data:
        print("Playzone:", zone)
    print(custom)

