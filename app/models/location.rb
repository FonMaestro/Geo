class Location < ActiveRecord::Base
  attr_accessible :addres, :latitude, :longitude, :city, :country, :country_code

  geocoded_by :addres
  after_validation :geocode ,  :if => lambda{ |obj| obj.addres_changed? || obj.latitude_changed? || obj.longitude_changed? }
  
end
