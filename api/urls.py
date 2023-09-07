from django.urls import path

from .views import overview, spot, init_data, account, food, hotel, travel_list, like_record, interest, question
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.views import TokenRefreshView


urlpatterns = [
    path('', overview.apiOverview, name="api-overview"),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path('name-search/<str:search_term>/', travel_list.NameSearchView.as_view(), name='name-search'),

    path('account-list/', account.accountList, name="account-list"),
    path('account-change/', account.UpdateMemberView.as_view(),name="account-change"),
    path('account-create/', account.CreateAccountView.as_view(),name="account-create"),
    path('account-login/', account.LoginView.as_view(), name="account-login"),
    path('account/<int:id>/', account.UpdateAccountView.as_view(),name="account-update"),

    path('interest-list/', interest.InterestDetail.as_view(), name="interest-list"),
    path('account/<int:id>/interest-list/',interest.InterestListView.as_view(), name="interest-list"),
    path('account/<int:id>/interest-create/',interest.CreateInterestView.as_view(), name="interest-create"),
    path('interest-update/', interest.UpdateInterestView.as_view(),name="interest-update"),

    path('spot-list/', spot.spotList, name="spot-list"),
    path('spot-image-list/', spot.spotWithPictureList, name="spot-image-list"),
    path('spot/', spot.spotWithPictureList, name="spot"),
    path('spot/<int:s_Id>/', spot.spot_detail_view, name="spot-detail"),
    path('spot/hot/', spot.high_rating_spots, name="spot-hot"),

    path('food/', food.foodWithPictureList, name="food-image-list"),
    path('food/<int:f_Id>/', food.food_detail_view, name="food-detail"),
    path('food/hot/', food.high_rating_foods, name="food-hot"),
    path('spot/<int:s_Id>/food-recommend/', travel_list.FoodRecommendationView.as_view(), name="food-recommend"),
    path('spot/<int:s_Id>/hotel-recommend/', travel_list.HotelRecommendationView.as_view(), name="hotel-recommend"),

    path('hotel/', hotel.hotelWithPictureList, name="hotel-image-list"),
    path('hotel/<int:h_Id>/', hotel.hotel_detail_view, name="hotel-detail"),
    path('hotel/hot/', hotel.high_rating_hotels, name="hotel-hot"),


    path('account/<int:account_id>/like/',like_record.likeList, name="like_record_spot-create"),

    path('account/<int:account_id>/spot-like/', like_record.AccountSpotLikeView.as_view(), name='account-spot-like'),
    path('account/<int:account_id>/food-like/', like_record.AccountFoodLikeView.as_view(), name='account-food-like'),
    path('account/<int:account_id>/hotel-like/', like_record.AccountHotelLikeView.as_view(), name='account-hotel-like'),

    path('account/<int:account_id>/spot-like/<int:s_id>/', like_record.AccountSingleSpotLikeView.as_view(), name='account-single-spot-like'),
    path('account/<int:account_id>/food-like/<int:f_id>/', like_record.AccountSingleFoodLikeView.as_view(), name='account-single-food-like'),
    path('account/<int:account_id>/hotel-like/<int:h_id>/', like_record.AccountSingleHotelLikeView.as_view(), name='account-single-hotel-like'),


    path('account/<int:account_id>/likespot/<int:s_Id>/',like_record.LikeSpotCreateView.as_view(), name="like_record_spot-create"),
    path('account/<int:account_id>/likespot/<int:s_Id>/delete/',like_record.LikeSpotDeleteView.as_view(), name="like_record_spot-delete"),

    path('account/<int:account_id>/likefood/<int:f_Id>/',like_record.LikeFoodCreateView.as_view(), name="like_record_food-create"),
    path('account/<int:account_id>/likefood/<int:f_Id>/delete/',like_record.LikeFoodDeleteView.as_view(), name="like_record_food-delete"),

    path('account/<int:account_id>/likehotel/<int:h_Id>/',like_record.LikeHotelCreateView.as_view(), name="like_record_hotel-create"),
    path('account/<int:account_id>/likehotel/<int:h_Id>/delete/',like_record.LikeHotelDeleteView.as_view(), name="like_record_hotel-delete"),

    path('account/<int:account_id>/likeitinerary/<int:t_Id>/',like_record.LikeItineraryCreateView.as_view(), name="like_record_itinerary-create"),
    path('account/<int:account_id>/likeitinerary/<int:t_Id>/delete/',like_record.LikeItineraryDeleteView.as_view(), name="like_record_itinerary-delete"),


    path('question/<int:s_Id>/', question.question_detail_view, name="question-detail"),

    path('account/<int:id>/itinerary/',travel_list.travel_List_detail_view, name="itinerary"),
    path('itinerary/', travel_list.CreateTravelList, name="itinerary-create"),
    path('itinerary/<int:t_Id>/', travel_list.UpdateTravelList,name="itinerary-update"),
    path('itinerary/<int:t_Id>/delete/',travel_list.DeleteTravelList.as_view(), name="itinerary-delete"),

    path('itinerary/<int:t_Id>/detail/',travel_list.CreateTravelListDetail, name="itinerary-detail-create"),
    path('itinerary/<int:t_Id>/detail/<int:tl_Id>/',travel_list.UpdateTravelListDetail, name="itinerary-detail-update"),
    path('itinerary/<int:t_Id>/detail/<int:tl_Id>/delete/',travel_list.DeleteTravelListDetail.as_view(), name="itinerary-detail-delete"),

    path('itinerary/<int:t_Id>/starttime/',travel_list.CreateTravelListStartTime, name="itinerary-starttime-create"),
    path('itinerary/<int:t_Id>/starttime/<int:tls_Id>/',travel_list.UpdateTravelListStartTime, name="itinerary-starttime-update"),
    path('itinerary/<int:t_Id>/starttime/<int:tls_Id>/delete/',travel_list.DeleteTravelListStartTime.as_view(), name="itinerary-starttime-delete"),


    path('init-spotData/', init_data.spotInit, name="init-spotData"),
    path('init-spotPictureData/', init_data.spotPictureInit,name="init-spotPictureData"),
    path('init-spotStreData/', init_data.spotStreInit, name="init-spotlStreData"),

    path('init-foodData/', init_data.foodInit, name="init-foodData"),
    path('init-foodPictureData/', init_data.foodPictureInit,name="init-foodPictureData"),
    path('init-foodStreData/', init_data.foodStreInit, name="init-foodStreData"),

    path('init-hotelData/', init_data.hotelInit, name="init-hotelData"),
    path('init-hotelPictureData/', init_data.hotelPictureInit,name="init-hotelPictureData"),
    path('init-hotelStreData/', init_data.hotelStreInit, name="init-hotelStreData"),
]
