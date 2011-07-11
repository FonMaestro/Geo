class LocationsController < ApplicationController

  respond_to :html, :xml, :json


  def index

    per_page = params[:per_page].blank? ?  5 : params[:per_page]
    @locations = Location.paginate :all, :page => params[:page], :per_page => per_page

  end

  def show
    @location = Location.find(params[:id])
    @locations = Location.all 

    respond_with @location
  end

  def new
    @location = Location.new
  end

  def create
    @location = Location.new(params[:location])
    if @location.save
      redirect_to @location, :notice => "Successfully created location."
    else
      render :action => 'new'
    end
  end

  def edit
    @location = Location.find(params[:id])
  end

  def update
    @location = Location.find(params[:id])
    if @location.update_attributes(params[:location])
      redirect_to @location, :notice  => "Successfully updated location."
    else
      render :action => 'edit'
    end
  end

  def destroy
    @location = Location.find(params[:id])
    @location.destroy
    redirect_to locations_url, :notice => "Successfully destroyed location."
  end


  def calculate

    unless params[:location_id].blank? || params[:id].blank?
      @location   = Location.find params[:id]
      @location_2 = Location.find params[:location_id]
      @distance   = (Geocoder::Calculations.distance_between "#{@location.latitude},#{@location.longitude}",
                                                            "#{@location_2.latitude},#{@location_2.longitude}",
                                                            {:units => :km}).round(3)
    end

  end


  def ip
    puts "\n\n\n\n****************"
    if request.is_a?(Hash)
      puts "HASH"
    else
      puts "NO HASH"
    end
    puts "**************\n\n\n\n"

    puts "\n\n\n\n****************"
    @location = Location.find params[:id] if params[:id].present?
    location = request.location
    puts location.country
    puts Geocoder::Result::Freegeoip.response_attributes
    puts "**************\n\n\n\n"
  end


  def petition_ip

      render :text => "hola"

  end

end
