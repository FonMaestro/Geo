class CreateLocations < ActiveRecord::Migration
  def self.up
    create_table :locations do |t|
      t.string :addres
      t.float :latitude
      t.float :longitude
      t.string :country
      t.string :country_code
      t.timestamps
    end
  end

  def self.down
    drop_table :locations
  end
end
