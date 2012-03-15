# encoding: utf-8

module CleditorWithPicture
  class EditorPicturesController < ApplicationController
    def create
      picture = EditorPicture.new(:image => params[:imageName])
      picture.save
      render :text => "<div id='picture_url'>#{picture.image_url(:default)}</div><div id='picture_id'>#{picture.id}</div>"
    end
  end
end