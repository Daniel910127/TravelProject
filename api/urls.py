from django.urls import path

from .views import interest
from .views import overview,spot,init_data,account,food,hotel,travel_list,like_record,interest,member,question


urlpatterns = [
    path('', overview.apiOverview, name="api-overview"),

    
    path('account-list/', account.accountList, name="account-list"),
    path('account-create/', account.create_account, name="account-create"),
    path('account-login/', account.account_login, name="account-login"),

    path('member/', member.MemberDetail, name="memeber"),
    path('member-list/', member.MemberList, name="memeber-list"),
    path('member-update/', member.UpdateMember, name="member-update"),
    path('member-create/', member.CreateMember, name="member-create"),

    path('interest/', interest.InterestDetail, name="interest"),
    path('interest-list/', interest.InterestList, name="interest-list"),
    path('interest-update/', interest.UpdateInterest, name="interest-update"),

    path('spot-list/', spot.spotList, name="spot-list"),
    path('spot-image-list/', spot.spotWithPictureList, name="spot-image-list"),
    path('spot/', spot.spotWithPictureList, name="spot"),
    path('spot/<int:s_Id>/', spot.spot_detail_view, name="spot-detail"),
    path('spot/hot/', spot.high_rating_spots, name="spot-hot"),

    path('food-list/', food.foodList, name="food-list"),
    path('food-image-list/', food.foodWithPictureList, name="food-image-list"),
    path('food/<int:f_Id>/', food.food_detail_view, name="food-detail"),
    
    path('hotel-list/', hotel.hotelList, name="hotel-list"),
    path('hotel-image-list/', hotel.hotelWithPictureList, name="hotel-image-list"),
    path('hotel/<int:h_Id>/', hotel.hotel_detail_view, name="hotel-detail"),

    path('member/<int:m_Id>/like/<int:s_Id>/', like_record.LikeRecordAPIView.as_view(), name="like_record_spot"),
    path('member/<int:m_Id>/like/<int:s_Id>/', like_record.LikeRecordAPIView.as_view(), name="like_record_spot"),
    path('member/<int:m_Id>/like/<int:h_Id>/', like_record.LikeRecordAPIView.as_view(), name="like_record_hotel"),
    path('member/<int:m_Id>/like/<int:h_Id>/', like_record.LikeRecordAPIView.as_view(), name="like_record_hotel"),
    path('member/<int:m_Id>/like/<int:f_Id>/', like_record.LikeRecordAPIView.as_view(), name="like_record_food"),
    path('member/<int:m_Id>/like/<int:f_Id>/', like_record.LikeRecordAPIView.as_view(), name="like_record_food"),
  
    path('question/<int:s_Id>/', question.question_detail_view, name="question-detail"),

    
    path('member/<int:m_Id>/itinerary', travel_list.travel_List_detail_view, name="itinerary"),
    path('itinerary', travel_list.CreateTravelList, name="itinerary-create"),
    path('itinerary/<int:t_Id>', travel_list.UpdateTravelList, name="itinerary-update"),
    path('itinerary/<int:t_Id>/delete/', travel_list.DeleteTravelList, name="itinerary-delete"),

    path('itinerary/<int:t_Id>/detail', travel_list.CreateTravelListDetail, name="itinerary-detail-create"),
    path('itinerary/<int:t_Id>/detail/<int:tl_Id>', travel_list.UpdateTravelListDetail, name="itinerary-detail-update"),
    path('itinerary/<int:t_Id>/detail/<int:tl_Id>', travel_list.DeleteTravelListDetail, name="itinerary-detail-delete"),

    path('itinerary/<int:t_Id>/starttime/<int:tls_Day>', travel_list.CreateTravelListStartTime, name="itinerary-starttime-create"),
    path('itinerary/<int:t_Id>/starttime/<int:tls_Id>', travel_list.UpdateTravelListStartTime, name="itinerary-starttime-update"),
    path('itinerary/<int:t_Id>/starttime/<int:tls_Id>', travel_list.DeleteTravelListStartTime, name="itinerary-starttime-delete"),

  
    path('init-spotData/', init_data.spotInit, name="init-spotData"),
    path('init-spotPictureData/', init_data.spotPictureInit,
         name="init-spotPictureData"),
    path('init-spotStreData/', init_data.spotStreInit, name="init-spotlStreData"),

    path('init-foodData/', init_data.foodInit, name="init-foodData"),
    path('init-foodPictureData/', init_data.foodPictureInit,
         name="init-foodPictureData"),
    path('init-foodStreData/', init_data.foodStreInit, name="init-foodStreData"),

    path('init-hotelData/', init_data.hotelInit, name="init-hotelData"),
    path('init-hotelPictureData/', init_data.hotelPictureInit,
         name="init-hotelPictureData"),
    path('init-hotelStreData/', init_data.hotelStreInit, name="init-hotelStreData"),
]
